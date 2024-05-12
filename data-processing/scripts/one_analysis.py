# data-processing/scripts/one_analysis.py

import yfinance as yf
import pandas as pd
from datetime import datetime

# 日本のティッカーシンボルを指定
ticker = '7203.T'  # トヨタ自動車の例

# yfinanceを使ってデータを取得
stock_data = yf.Ticker(ticker)

# 過去4年間の財務諸表を取得
income_statement = stock_data.financials

# 売上成長率を計算
revenue_growth = income_statement.loc['Total Revenue'].pct_change().infer_objects()

# 売上成長率の平均が20%以上かどうかをチェック
is_growth_over_20 = (revenue_growth.mean() >= 0.20)
print(f"過去4年間の平均成長率: {revenue_growth.mean() * 100:.2f}%")
print(f"成長率が20%以上ですか？ {'はい' if is_growth_over_20 else 'いいえ'}")

# 営業利益率を計算
operating_income = income_statement.loc['Operating Income']
total_revenue = income_statement.loc['Total Revenue']
operating_margin = operating_income / total_revenue

# 営業利益率が10%以上かをチェック
is_operating_margin_over_10 = (operating_margin.iloc[0] >= 0.10)
print(f"最新の営業利益率: {operating_margin.iloc[0] * 100:.2f}%")
print(f"営業利益率が10%以上ですか？ {'はい' if is_operating_margin_over_10 else 'いいえ'}")

# 上場日の取得(データの古い日付と比較)
historical_data = stock_data.history(period="max")
oldest_date = historical_data.index.min()
ipo_date = oldest_date.strftime('%Y-%m-%d')
print(f"上場日: {ipo_date}")
if ipo_date is None:
    print("IPO日付のデータが利用できません。")
    years_since_ipo = None  # IPO日付がない場合はNoneを設定する
    is_within_five_years = False  # 上場から5年以内ではないと仮定する
else:
    # IPO日付が正しく取得できた場合の処理
    try:
        # IPO日付を処理するコード
        years_since_ipo = (datetime.now() - datetime.strptime(ipo_date, '%Y-%m-%d')).days / 365
        print(f"上場からの年数: {years_since_ipo:.2f}年")
        is_within_five_years = (years_since_ipo <= 5)
        print(f"上場から5年以内ですか？ {'はい' if is_within_five_years else 'いいえ'}")
    except ValueError as e:
        print(f"上場日のデータ処理中にエラーが発生しました: {e}")
        years_since_ipo = None
        is_within_five_years = False

# 4. オーナー企業または社長が筆頭株主である（この情報は手動で確認が必要）
