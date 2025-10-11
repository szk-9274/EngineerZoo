# agent.md — Engineer Zoo 開発エージェント 手順とガードレール

> このリポジトリで **Codex（エージェント）** が作業するときの共通ルール・禁止事項・手順書。  
> 目的：**安全**（壊さない／秘密を漏らさない）かつ **効率的**（最小差分・再現可能）な開発を実現する。

---

## 0. リポジトリ情報（前提）

- フレームワーク：**Next.js (TypeScript, App Router, Tailwind, Turbopack)**  
- 開発起動：
  ```bash
  npm install
  npm run dev     # http://localhost:3000 （Codespacesは PORTS → 3000 → Open in Browser）
  ```
- 本番ビルド：
  ```bash
  npm run build
  npm run start
  ```
- エイリアス：`@/*`（`tsconfig.json` の `paths` 前提）  
- UI方針：Tailwind を基本に、軽量なコンポーネントを優先

---

## 1. セーフティガード（絶対ルール）

1. **main へ直接 push しない**。必ず **feature ブランチ** → **PR**。  
2. **Secrets/環境変数**（APIキー等）を**コミットしない**。  
   - `.env*` を追加する場合は **サンプル**（`example`）のみ。値は書かない。  
3. **破壊的変更**（既存のスクリプト・構成の削除／大規模リネーム）を勝手に行わない。  
   - 必要な場合は PR で意図と代替策を説明し、**ドラフトPR**で相談。  
4. **依存追加は最小限**。理由を PR 本文に明記。  
   - 重大脆弱性がある依存は追加禁止。代替案を提示。  
5. 著作権・商標に抵触する素材（公式ロゴの無断使用等）は不可。  
   - 動物アイコンは **絵文字/抽象SVG** で代替。出典がある場合は README に記載。  
6. 自動修正ツール（lint/format）は **差分を最小化**（必要な範囲のみ実行）。  
7. 実行コマンド・再現手順を **PR 本文に必ず記載**。

---

## 2. 作業手順（共通フロー）

1. **課題の読み込み**：ユーザー指示 or issue を要約（目的/入力/出力/完了条件）。  
2. **ブランチ作成**：`feature/<短い説明-yyyyMMdd>` 例）`feature/zoo-page-20251012`  
3. **最小差分で修正**：ファイルを限定。大規模化しそうなら分割PRを提案。  
4. **ローカル検証**：`npm run dev` で動作確認（エラーが出たら含意も PR に記載）。  
5. **自己レビュー**：チェックリスト（後述）を満たす。スクショ/ログを PR に添付可。  
6. **コミット**：Conventional Commits 準拠（例：`feat(zoo): add care actions (feed/clean/play)`）  
7. **ドラフトPR作成**：下記テンプレを使用。  
8. **レビューコメント対応**：差分は最小に。対話は PR コメントで。  
9. **マージは人間が実施**。**Codexは merge しない**。  
10. **（ユーザー側）Codespaces で pull → `npm run dev` 再起動で反映**。

---

## 3. 変更範囲の原則

- **OK**：
  - `app/**`, `data/**`, `public/**`, `styles/**`, `README.md`, `.github/workflows/**`
  - `package.json`（scripts/依存の**最小追加のみ**）
- **要相談（ドラフトPRで理由説明）**：
  - `tsconfig.json`, `next.config.ts`, `.eslintrc*`, `.prettierrc*`
- **禁止**：Secrets（`.env` 実値）、強制 `--force` push、main 直push

---

## 4. コーディング規約（簡易）

- TypeScript：`strict` を尊重。`any` は回避。  
- 変数・関数名：意味の分かる英語。  
- コンポーネント：小さく再利用可能に。副作用は hooks に隔離。  
- インポート順：標準 → 外部 → 内部（`@/…`）  
- スタイル：Tailwind を基本。複雑化するなら小さな CSS モジュール化。  
- コメント：**なぜ**そうしたか（意図）を書く。  
- Lint/Format：`npm run lint`/自動整形に準拠（差分は最小）。

---

## 5. PR テンプレ（コピーして使う）

**Title**：`feat(scope): short summary` / `fix(scope): …` / `docs(scope): …`

**Body**：
- **目的**：  
  （何を・なぜ・ユーザー価値）
- **変更点**：  
  - [ ] ファイル/ディレクトリ一覧（要点）  
  - [ ] 依存追加（あれば理由）  
- **動作確認**：  
  ```bash
  npm install
  npm run dev   # http://localhost:3000
  ```
  （スクショやログ）
- **影響範囲**：  
  （他機能への影響・破壊的変更の有無）
- **セキュリティ**：  
  （Secrets不使用、商標配慮、脆弱ライブラリなし）
- **残課題/次の一歩**：  
  （小さなTODO箇条書き）

---

## 6. チェックリスト（セルフレビュー）

- [ ] main へ直接 push していない  
- [ ] 依存追加は必要最小限・理由明記  
- [ ] `.env` をコミットしていない（必要なら `*.example` を追加）  
- [ ] Lint/TypeCheck をパス  
- [ ] 実行手順と結果が PR 本文にある  
- [ ] 差分は必要箇所のみに限定  
- [ ] 商標・著作権配慮（公式ロゴ等を直接使用していない）

---

## 7. よくあるタスク別プレイブック

### 7.1 新規ページを追加（例：/zoo）
1. `app/zoo/page.tsx` を追加（Client/Serverを適切に選択）。  
2. データは `data/**` に切り出し、`@/data/...` で import。  
3. UIは Tailwind で構築、状態は `useState` から開始。  
4. ルーティングは App Router 準拠、リンクは `next/link` を忘れずに。  
5. `npm run dev` で表示確認 → PR。

### 7.2 UIの調整（Tailwind）
- 余白/サイズ/色はユーティリティで。CSSの**複雑な上書きは回避**。  
- アニメが必要ならまず CSS トランジション。大きい場合のみライブラリ検討。

### 7.3 画像/アイコン
- `public/**` に保存、パスは `/xxx.png`。  
- 商標ロゴは使わない。動物は絵文字 or 抽象SVG。

---

## 8. Codespaces 運用（人間側の想定手順）

- 起動：GitHub → **Code → Create codespace**  
- 実行：
  ```bash
  npm install
  npm run dev
  ```
- プレビュー：PORTS → `3000` → **Open in Browser**  
- PRがマージされたら：
  ```bash
  git checkout main
  git fetch origin
  git pull origin main
  npm install     # 依存が増えた場合
  npm run dev
  ```

---

## 9. 依存ポリシー

- 追加は**最小限**（目的と比較対象を PR 本文に記載）。  
- 既存更新は minor/patch のみ。major は別PRに分離して説明。  
- 既知の重大脆弱性がある依存は採用不可。

---

## 10. ログ・テレメトリ

- Next.js テレメトリは既定ON。必要に応じて README に opt-out 手順を追記。  
- デバッグログは最小限。`console.log` は PR 前に削除 or コメント化。

---

## 11. 失敗時のロールバック

- 動作不良の可能性がある大改修は **ドラフトPR** で事前共有。  
- 既存機能を壊した場合は **即時修正PR** を最優先。  
- 取り消しは `git revert` を使用（履歴を保持）。

---

## 12. 連絡と不明点

- 曖昧な仕様は **PR 本文**で質問として明記（想定の挙動と代替案を併記）。  
- 返答待ちの間は、**影響範囲の小さい部分から** 作業を進める。

---

### 付録A：ブランチ・コミット例

```text
feature/zoo-care-20251012
fix(zoo): clamp gauge values to [0,100]
docs(readme): add quick start (npm run dev)
```

### 付録B：よくあるエラー・対処

- `Link is not defined` → `import Link from "next/link";` を追加  
- `Module not found: '@/…/…/data/animals'` → `@/data/animals` に修正（`@` はルート）  
- HMRが効かない → dev再起動（Ctrl+C → `npm run dev`）  
- 3000が見えない → PORTSで `3000` を **Open in Browser**（必要なら可視性 Public）

---
