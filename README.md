# Engineer Zoo（Next.js / TypeScript）

これは **Next.js（TypeScript）** で作成した Web アプリのプロジェクトです。  
まずはローカルで動かしながら、ページの文言を変えたり UI を増やしたりして育てていきます。

---

## ✅ 前提（環境）

- **Node.js**：LTS（例：20 以上）  
  確認：
  ```bash
  node -v
  npm -v

エディタ：VS Code 推奨

🚀 はじめの起動（開発サーバー）
# プロジェクトの場所へ
cd C:\00_mycode\my-app   # ←あなたの環境に合わせて

# 開発サーバーを起動
npm run dev

ブラウザで http://localhost:3000 を開く

ファイルを保存すると 自動リロード されます

最初に文言を変えるなら：app/page.tsx の <main>...</main> を書き換えて保存

🛠 環境セットアップ（初回のみ必要な場合）
（※ create-next-app で必要な依存は入っています。もしクリーンから始め直した時や node_modules を消した場合は下を実行）

bash
コードをコピーする
# 依存の再インストール
npm install
📦 本番ビルド & 実行
bash
コードをコピーする
npm run build
npm run start
npm run start は本番モードで起動します（開発時は npm run dev を使う）

🧭 開発の方針（シンプル版）
Next.js + TypeScript（App Router） を採用

Tailwind CSS で素早く見た目を整える

状態管理はまず useState で十分（必要になったら検討）

コード品質は ESLint / Prettier を使って維持

📂 プロジェクト構成（初期）
perl
コードをコピーする
my-app/
  app/
    page.tsx        # トップページ（最初にここを編集）
    globals.css     # 全体スタイル
  public/           # 画像などの静的ファイル
  package.json
  tsconfig.json
  .eslintrc* / .prettierrc*（導入済み/自動生成）
🧩 VS Code で入れておくと良い拡張
ESLint（必須）

Prettier – Code formatter（必須）

Tailwind CSS IntelliSense（Tailwind 補完）

GitLens（Git 履歴の可視化）

🔁 いつもの作業サイクル
bash
コードをコピーする
# 1. 変更して動作確認
npm run dev

# 2. 変更を Git にコミットして GitHub へ
git add .
git commit -m "更新内容を書く"
git push
すでに .git/ と .gitignore はプロジェクト作成時に自動生成されています。
初回だけリモート接続が必要な場合：

bash
コードをコピーする
git remote add origin https://github.com/szk-9274/EngineerZoo.git
git branch -M main
git push -u origin main
🧪 よくあるトラブルと対処
npm run dev が動かない / 依存エラー
→ npm install を実行してから再度 npm run dev

ポートが使われている（EADDRINUSE）
→ 既存の dev サーバーを停止（ターミナルで Ctrl + C）して再起動

ブラウザが更新されない
→ ファイル保存（Ctrl/Cmd + S）→ 自動リロード、それでもダメなら手動リロード

📌 今日の進め方（チェックリスト）
Node.js LTS を用意してバージョン確認

bash
コードをコピーする
node -v
npm -v
開発サーバー起動

bash
コードをコピーする
npm run dev
app/page.tsx のテキストを1行変更 → ブラウザで反映確認

Tailwind のクラス（例：text-xl, font-bold, p-4）で見た目を少し整える

変更を GitHub に push

bash
コードをコピーする
git add .
git commit -m "トップのテキストを変更"
git push
🔮 次の一歩（必要になったら）
コンポーネントを app/components/ に分割して再利用

画像は next/image、フォントは next/font を使う

公開するなら Vercel が超簡単（GitHub 連携だけで自動デプロイ）

必要に応じて、**UIの雛形（カード、ボタン、2カラムレイアウト）**や
よく使う Tailwind クラスのチートシートも渡せます。
まずはこのREADME通りに npm run dev → page.tsx 編集 → push まで回してみてください！

yaml
コードをコピーする

---

✅ これを保存してコミットすれば、GitHubのトップページでも日本語READMEがすぐ反映されます。  
やるなら次のコマンドだけでOK👇

```bash
git add README.md
git commit -m "READMEを日本語版に更新"
git push