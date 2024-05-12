import pandas as pd
import yfinance as yf
from datetime import datetime

# FutureWarningに対応するための設定
pd.set_option('future.no_silent_downcasting', True)

# ティッカーコードのリストをファイルから読み込む
data_dir = '../data-processing/data'
with open(f'{data_dir}/jpx_code_list.txt', 'r') as file:
    japan_tickers = [line.strip() for line in file]

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
        name = stock_data.info['longName']  # 企業名を取得

        # 過去4年間の財務諸表を取得
        if 'Total Revenue' in stock_data.financials.index:
            income_statement = stock_data.financials

            # 売上成長率を計算
            revenue_growth = income_statement.loc['Total Revenue'].pct_change(fill_method=None).dropna().infer_objects(copy=False)
            average_growth_rate = revenue_growth.mean()

            # 売上成長率が20%以上かどうかをチェック
            is_growth_over_20 = (average_growth_rate >= 0.20)

            # 営業利益率を計算
            operating_income = income_statement.loc['Operating Income']
            total_revenue = income_statement.loc['Total Revenue']
            operating_margin = (operating_income / total_revenue).dropna()

            # 営業利益率が10%以上かをチェック
            is_operating_margin_over_10 = (operating_margin.iloc[0] >= 0.10) if not operating_margin.empty else False

            # 上場日の取得と上場からの年数を計算
            historical_data = stock_data.history(period="max")
            oldest_date = historical_data.index.min()
            ipo_date = oldest_date.strftime('%Y-%m-%d')
            years_since_ipo = (datetime.now() - datetime.strptime(ipo_date, '%Y-%m-%d')).days / 365
            is_within_five_years = (years_since_ipo <= 5)

            # 結果をリストに追加
            # 解析結果をリストに追加する
            analysis_results.append({
                '企業名': name,
                'ティッカーシンボル': ticker,
                '平均成長率': average_growth_rate,
                '成長率20%超': is_growth_over_20,
                '最新営業利益率': operating_margin.iloc[0] if not operating_margin.empty else None,
                '営業利益率10%超': is_operating_margin_over_10,
                '上場日': ipo_date,
                '上場5年以内:': is_within_five_years
            })
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
