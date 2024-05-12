import os
import requests
import pandas as pd

# データソースのURL
url = "https://www.jpx.co.jp/markets/statistics-equities/misc/tvdivq0000001vg2-att/data_j.xls"

# ディレクトリの存在を確認し、存在しない場合は作成
data_dir = '../data-processing/data'
if not os.path.exists(data_dir):
    os.makedirs(data_dir)

# データのダウンロード
try:
    response = requests.get(url)
    response.raise_for_status()  # ステータスコードをチェック
except requests.exceptions.RequestException as e:
    print(f"データのダウンロード中にエラーが発生しました: {e}")
else:
    # ファイルへの保存
    with open(os.path.join(data_dir, 'data_j.xls'), 'wb') as file:  # パスの結合
        file.write(response.content)

    # データの読み込み
    stocklist = pd.read_excel(os.path.join(data_dir, 'data_j.xls'))  # パスの結合

    # 条件に基づくデータの選択
    selected_stocks = stocklist.loc[stocklist["市場・商品区分"]=="市場第一部（内国株）",
                                    ["コード","銘柄名","33業種コード","33業種区分","規模コード","規模区分"]]

    # ETF等を除く
    codes = stocklist[stocklist['市場・商品区分'].isin(['プライム（内国株式）', 'スタンダード（内国株式）', 'グロース（内国株式）'])]
    print(f"選択された株式の数: {len(codes)}")

    # CSVファイルとして保存
    codes.to_csv(os.path.join(data_dir, 'jpx_code.csv'), index=False)  # パスの結合
