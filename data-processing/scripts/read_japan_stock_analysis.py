import pandas as pd
import json
import os

# CSVファイルのパス設定と読み込み
data_dir = '../data-processing/data'
if not os.path.exists(data_dir):
    os.makedirs(data_dir)
file_name = 'japan_stock_analysis.csv'
file_path = f'{data_dir}/{file_name}'
data = pd.read_csv(file_path)

# NaN値を0に置換
data = data.fillna(value=0)  # NaNを0で置換

# DataFrameをリストに変換
data_list = data.values.tolist()

# カスタムコンバーター関数
def default_converter(obj):
    if pd.isna(obj):
        return None  # NaNをnullに変換
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

# JSON形式で出力
json_output = json.dumps(data_list, default=default_converter)
print(json_output)
