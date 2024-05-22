# Python アプリケーションのセットアップ

この README は、Python アプリケーションとバックエンドのセットアップ手順を説明します。

## Python アプリのセットアップ

```bash
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
python scripts/all_analysis.py
```

## バックエンドのセットアップ

```bash
# バックエンドのディレクトリに移動
cd backend

# 依存関係をインストール
pip install -r /root/AmaterasuInvest/data-processing/requirements.txt

# 開発サーバーを起動
yarn start:dev
```

## SSH キーの設定

```bash
# SSHキーをssh-agentに追加
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_celestiphony_rsa
```

## データ処理の手順

1. データ処理用のディレクトリに移動

   ```bash
   cd data-processing
   ```

1. 仮想環境をアクティブにする

   ```bash
   source venv/bin/activate
   ```

1. データを最新化する

   ```bash
   python scripts/download_csv.py
   ```

   ```bash
   python scripts/list_jpx_codes.py
   ```

1. データを正規化する

   ```bash
   python scripts/all_analysis.py
   ```
