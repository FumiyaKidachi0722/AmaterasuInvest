import pandas as pd
import yfinance as yf
from datetime import datetime

# ティッカーコードのリストをファイルから読み込む
data_dir = '../data-processing/data'
with open(f'{data_dir}/jpx_code_list.txt', 'r') as file:
    japan_tickers = [line.strip() for line in file]

# ティッカーコードと日本語の企業名を含むCSVファイルを読み込む
jpx_code_df = pd.read_csv(f'{data_dir}/jpx_code.csv')
ticker_name_map = dict(zip(jpx_code_df['コード'].astype(str), jpx_code_df['銘柄名']))

total_tickers = len(japan_tickers)
processed_tickers = 0

# yfinanceを使って各ティッカーの情報を取得
yf.pdr_override()

# 分析結果を格納するリストを初期化
analysis_results = []

# 各ティッカーについて分析を行う
for ticker in japan_tickers:
    try:
        stock_data = yf.Ticker(f'{ticker}.T')  # JPXのティッカーコードに.Tを付ける
        name = ticker_name_map.get(ticker, 'N/A')  # 事前に読み込んだ企業名を取得
        print(f'企業名: {name}')

        # 過去5年間の財務諸表を取得
        if 'Total Revenue' in stock_data.financials.index:
            income_statement = stock_data.financials

            # 売上成長率を計算（各期間）
            revenue_growth = income_statement.loc['Total Revenue'].pct_change(fill_method=None).dropna().infer_objects(copy=False)
            growth_rates = {
                '5年平均成長率': revenue_growth[-5:].mean() if len(revenue_growth) >= 5 else None,
                '4年平均成長率': revenue_growth[-4:].mean() if len(revenue_growth) >= 4 else None,
                '3年平均成長率': revenue_growth[-3:].mean() if len(revenue_growth) >= 3 else None,
                '2年平均成長率': revenue_growth[-2:].mean() if len(revenue_growth) >= 2 else None,
                '1年平均成長率': revenue_growth[-1:].mean() if len(revenue_growth) >= 1 else None,
            }
            
            # 営業利益率を計算（各期間）
            operating_income = income_statement.loc['Operating Income']
            total_revenue = income_statement.loc['Total Revenue']
            operating_margin = (operating_income / total_revenue).dropna()
            margin_rates = {
                '最新営業利益率': operating_margin.iloc[0] if not operating_margin.empty else None,
                '5年平均営業利益率': operating_margin[-5:].mean() if len(operating_margin) >= 5 else None,
                '4年平均営業利益率': operating_margin[-4:].mean() if len(operating_margin) >= 4 else None,
                '3年平均営業利益率': operating_margin[-3:].mean() if len(operating_margin) >= 3 else None,
                '2年平均営業利益率': operating_margin[-2:].mean() if len(operating_margin) >= 2 else None,
                '1年平均営業利益率': operating_margin[-1:].mean() if len(operating_margin) >= 1 else None,
            }

            # 上場日の取得と上場からの年数を計算
            historical_data = stock_data.history(period="max")
            oldest_date = historical_data.index.min()
            ipo_date = oldest_date.strftime('%Y-%m-%d')
            years_since_ipo = (datetime.now() - datetime.strptime(ipo_date, '%Y-%m-%d')).days / 365
            is_within_five_years = (years_since_ipo <= 5)

            # 結果をリストに追加
            analysis_result = {
                '企業名': name,
                'ティッカーシンボル': ticker,
                '上場日': ipo_date,
                '上場5年以内': is_within_five_years
            }
            analysis_result.update(growth_rates)
            analysis_result.update(margin_rates)
            analysis_results.append(analysis_result)
        else:
            print(f"No 'Total Revenue' data for {ticker}")

    except Exception as e:
        print(f"Error processing {ticker}: {e}")

    # 進捗状況の更新
    processed_tickers += 1
    print(f'Processed {processed_tickers}/{total_tickers} tickers ({(processed_tickers / total_tickers * 100):.2f}%)')

# 分析結果をDataFrameに変換し、CSVファイルとして保存
analysis_results_df = pd.DataFrame(analysis_results)
analysis_results_df.to_csv(f'{data_dir}/japan_stock_analysis.csv', index=False)
