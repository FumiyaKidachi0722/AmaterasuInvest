# data-processing/scripts/list_jpx_codes.py
import os
import pandas as pd

# CSVファイルのパス
data_dir = '../data-processing/data'
if not os.path.exists(data_dir):
    os.makedirs(data_dir)
file_name = 'jpx_code.csv'

# CSVファイルの読み込み
stock_data = pd.read_csv(f'{data_dir}/{file_name}')

# 株のコード列のみを抽出し、リストとして保存
stock_codes = stock_data['コード'].tolist()

# コードの一覧をファイルに保存
with open(f'{data_dir}/jpx_code_list.txt', 'w') as f:
    for code in stock_codes:
        f.write(f'{code}\n')

