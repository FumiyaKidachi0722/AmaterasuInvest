# python アプリ

```
# データ処理用のディレクトリに移動
cd data-processing
# Pythonの仮想環境を作成
python -m venv venv
# 仮想環境をアクティブにする
source venv/bin/activate
# requirements.txtから依存関係をインストール
pip install -r requirements.txt
# 仮想環境を非アクティブにする（必要な場合）
deactivate
# テスト
python scripts/analysis.py

```

# バックエンド

```
cd backend
pip install -r /root/AmaterasuInvest/data-processing/requirements.txt
yarn start:dev
```
