# Development Log

Formly の重要な技術判断・アーキテクチャ変更を記録する。

些細な typo 修正や日常的な実装詳細は記録しない。

---

## 2026-08-15 — Global scrollbar styling

### Summary

Formly 本体のスクロールバーを、OS 標準から Design Token ベースの細い pill 型へ統一した。

### Decision

- 実装は `src/index.css` のグローバル Base Style のみ。Component ごとの再定義はしない
- Thumb は `--border-strong`、Hover は `--text-disabled`。Accent は使わない
- Firefox は `scrollbar-width: thin` / `scrollbar-color`
- Touch（coarse pointer）では OS 標準に戻す
- 生成フォーム CSS には含めない

---

## 2026-08-15 — Builder wide layout (canvas + preview)

### Summary

`/builder` の 1280px 以上で、Form Canvas と Builder Preview を横並びにした。Field Palette と Settings の位置は維持する。

### Decision

- 1024px〜1279px は従来どおり 3 カラム + Preview 全幅下段
- 1280px〜 は `Palette | Canvas | Preview | Settings`
- 4 カラム時は各パネルが独立スクロールし、ビューポート高さを使う
- ブレークポイントは UI ガイドラインの Content Width（1280px）に合わせる

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
```

---

## 2026-08-15 — Form appearance tokens and CSS flavor

### Summary

生成フォームの見た目を Form Schema の Appearance Tokens として保存し、Builder / Preview / Generator が同じトークンから派生するようにした。生成コードは生 CSS（デフォルト）または Tailwind CSS を選択できる。

### Decision

- 自由記述 CSS は採用しない（XSS / CSS injection）
- 色は `#RRGGBB`、フォントは許可リスト、半径・サイズは数値範囲
- `cssFlavor: "css" | "tailwind"` は Schema に保存する
- Tailwind モードでも `formly-*` class と `data-*` は残し、生成 JS のセレクタを壊さない
- Preview は生成 CSS を本体 DOM に注入せず、同じトークンを CSS 変数として適用する
- 既存 LocalStorage（appearance なし）はデフォルトトークンで補完する（schema version は 1 のまま）

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 9 Portfolio and Production Quality

### Summary

Phase 9（Portfolio / Production Quality）を実装した。公開デモ可能なランディング、SEO 基礎、クリティカル E2E、README 強化、生成コードの軽い品質改善を行った。

### Implemented

- Landing（Hero / Features / How it works / Demo / Technology / Footer）
- Document title（ルート別）と `index.html` OG / meta
- `public/robots.txt` / `public/sitemap.xml` / `public/favicon.svg`
- 生成コード: `formly-sr-only` required、`formly-page`、focus-visible、reduced-motion
- E2E: Landing → Builder → Preview validation → Code、Templates → Builder
- README（導線・アーキ・生成コード説明・Phase 完了）

### Notes

- 埋め込みインタラクティブデモは作らず、Templates / Preview へ誘導
- sitemap の `<loc>` は相対パス。本番ドメイン確定後に絶対 URL へ更新可能
- Lighthouse 本格スコア改善や大規模 code-splitting は follow-up

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

---

## 2026-08-09 — Phase 8 Form Templates

### Summary

Phase 8（Form Templates）を実装した。`/templates` で静的テンプレートギャラリーを提供し、適用時に単一の active Form Schema を置き換える。

### Implemented

- テンプレート定義（blank / contact / inquiry / feedback / newsletter / reservation）
- `createFormFromTemplate`（fresh IDs + Zod validate + normalize）
- Template gallery（カテゴリフィルタ、プレビュー、上書き確認）
- 適用後 LocalStorage 保存 → `/builder` へ遷移
- ナビ・ホーム CTA・i18n（ja/en/zh/ko）
- Unit / Integration / E2E（navigation）tests
- Canonical routes に `/templates` を追加

### Notes

- テンプレートはバンドル内の静的データ。ユーザー保存のテンプレートは対象外
- 適用は Import と同様に現在のフォームを置換する（確認ダイアログ必須）
- Schema に未対応の field type / presentation は含めない
- 表示名は適用時の UI locale で `name` / `description` に設定する

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 7 Form Schema Import / Export

### Summary

Phase 7（Form Schema Import / Export）を実装した。

### Implemented

- Portable JSON 形式（`*.formly.json`、`version: 1`、submission 含む）
- Export: serialize + download
- Import: parse → version check → Zod validate → normalize → Builder 置換 + 即時 LocalStorage 保存
- 不正 JSON / 未対応 version / 検証失敗 / サイズ超過の拒否
- Builder ヘッダーの Import / Export UI（確認ダイアログ付き）
- Unit / Integration tests
- `docs/04_architecture.md` に portable format を追記

### Notes

- Import は untrusted input。検証通過前のデータを Builder に渡さない
- ファイル上限 1 MiB、フィールド上限 100
- Code Export（HTML/CSS/JS）とは別機能。Schema portability 専用

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 6 Quality / A11y / Responsive / i18n

### Summary

Phase 6（品質・アクセシビリティ・レスポンシブ・i18n）を実装した。

### Implemented

- Skip link とモバイル Navigation Sheet
- Builder のデスクトップ 3 カラム / モバイル Sheet（Palette・Settings）切替（`useMediaQuery`）
- ConfirmDialog の focus trap / scroll lock / focus restore
- Settings の Theme 切替（dark / light / system）
- タッチ向けボタン最小サイズ、roving tabindex なタブ操作
- 生成 JS の `aria-invalid` / `role="alert|status"` 強化
- 翻訳キー同期テストと a11y / theme integration tests

### Notes

- Toast ライブラリは導入せず、既存の `role="status"` / `role="alert"` インラインフィードバックで統一
- 生成フォームの検証メッセージはスタンドアロン出力のため英語フォールバックを維持（アプリ UI の i18n とは分離）
- レスポンシブ切替は CSS-only の `hidden` に頼らず JS media query でマウントを分け、アクセシビリティツリーの重複を避ける

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 5 Local Persistence

### Summary

Phase 5（Local Persistence）を実装・硬化した。

### Implemented

- LocalStorage 形式の明確化（key: `formly.activeForm`、value: validated `FormSchema` JSON）
- Persistence API の強化（`save` / `load` / `clear` / `hasStoredForm`、quota エラー分類）
- Builder の debounce autosave（300ms）と `beforeunload` / unmount flush
- Reset Form 確認ダイアログ
- Invalid LocalStorage 時の再読み込み / リセット UI
- Settings からのローカルフォームデータ削除
- Persistence unit / integration tests

### Notes

- 認証は不要。単一フォームのブラウザ永続化のみ
- locale / theme の LocalStorage はフォーム削除の対象外
- Phase 2 で導入した autosave を正式な Persistence Layer として拡張

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 4 Code Generator

### Summary

Phase 4（Code Generator）を実装した。

### Implemented

- HTML / CSS / JavaScript Generator（Form Schema 駆動）
- `/code` Code Viewer（タブ切替・行番号・Copy / Export）
- Combined HTML Export（CSS/JS 埋め込み）
- Submission（action / method）と Validation 設定の反映
- User content の HTML / JS エスケープ
- Unit / Integration tests（malicious input 含む）

### Notes

- 生成コードは Formly Runtime に依存しない
- `/code` 画面では生成 JavaScript を実行しない
- Syntax highlighting は重いライブラリを入れず、読みやすい行番号付き Viewer で対応
- action 未設定時は生成 JS が native submit を抑止し、ローカル成功メッセージを表示

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 3 Preview

### Summary

Phase 3（Preview）を実装した。

### Implemented

- `/preview` の Full Preview（LocalStorage の Form Schema を読み込み）
- Builder 統合 Preview パネル（編集中 Schema を即座に反映）
- 共有 `FormRenderer`（全 supported field types）
- クライアント側バリデーション（required / length / min-max / pattern / email）
- Mock Submission（`preventDefault`、外部エンドポイントへは送信しない）
- Submission Success / Error State（エラーはツールバーで模擬可能）
- Responsive viewport（Desktop / Tablet / Mobile）
- Empty / invalid schema 状態
- Unit / Integration tests

### Security Notes

- Preview は生成 HTML/JS を実行しない
- React コンポーネントとして Form Schema を描画する
- `eval` / `new Function` / 危険な `dangerouslySetInnerHTML` は使用しない
- Mock submit のみ。`submission.action` への実送信は行わない

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 2 Core Form Builder

### Summary

Phase 2（Core Form Builder）を実装した。

### Implemented

- Canonical Form Schema（version / metadata / fields / validation / submission）
- Zod による Schema Validation
- Domain operations（add / remove / duplicate / reorder / update / options）
- Builder UI（Field Palette / Form Canvas / Form・Field・Submission Settings）
- LocalStorage への自動保存（`formly.activeForm`）
- Supported fields: text / email / number / textarea / select / radio / checkbox / submit
- i18n（ja / en / zh / ko）の Builder 文言
- Unit / Integration tests

### Notes

- Field reorder は Move Up / Move Down で実装（キーボード操作可能）
- Preview / Code Generator は Phase 3 / 4
- Submit フィールドは削除不可。通常フィールドは Submit の前に挿入される

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

---

## 2026-08-09 — Phase 1 Foundation

### Summary

Phase 1（Foundation）を実装した。

### Implemented

- React Router v8 による MVP ルート（`/`, `/builder`, `/preview`, `/code`, `/settings`）
- Feature First を見据えた `src/app`, `src/routes`, `src/components`, `src/i18n`, `src/lib` 構成
- Tailwind CSS v4（`@tailwindcss/vite`）と UI reference 準拠の Design Tokens
- shadcn/ui 基盤（`components.json`, `cn`, `Button`）
- i18n 基盤（`ja` / `en` / `zh` / `ko`、LocalStorage 永続化、デフォルト `ja`）
- Theme 基盤（Light / Dark / System、デフォルト Dark）
- Vitest + Testing Library + Playwright
- Prettier / ESLint 整合
- Cloudflare Workers + Vite 本番ビルド確認

### Intentionally Deferred

- Cloudflare 本番デプロイ確認（認証情報が必要なため）
- Form Builder / Preview / Code Generator 本体（Phase 2 以降）
- Zod を使った Form Schema Validation（依存関係は導入済み）

### Verification

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

---

## 2026-08-09 — Documentation / Rules Alignment

### Context

実装前の資料確認で、次の食い違いが判明した。

1. **Routing**
   - `docs/` は MVP として `/`, `/builder`, `/preview`, `/code`, `/settings` を定義
   - Cursor Rules の一部は `/forms/:formId/builder` など複数 Form リソースモデルを現行想定として記載

2. **Documentation paths**
   - `AGENTS.md` / 一部 rules / 一部 docs が `05_database.md`, `06_api.md`, `07_component_design.md`, `08_ui-guideline.md` などを参照
   - 実ファイルは `05_component_design.md`, `06_ui-guideline.md` など
   - MVP は Server-side Database / Backend API を使わないため、database / api 専用ドキュメントは存在しない

### Decision

#### Routing: MVP を docs 準拠、複数 Form は将来拡張

```text
MVP (Canonical)
/
├── /builder
├── /preview
├── /code
└── /settings
```

```text
Future (Not MVP)
/
├── /forms
├── /forms/new
├── /forms/:formId
│   ├── builder
│   ├── preview
│   └── code
├── /templates
└── /settings
```

- MVP 実装時に Future Route を先行導入しない
- Route 拡張時は `docs/04_architecture.md`, `docs/screen-list.md`, Cursor Rules を同時更新する

#### Documentation references: 実ファイルに合わせる

Canonical docs:

```text
docs/product.md
docs/roadmap.md
docs/screen-list.md
docs/development-log.md
docs/01_requirements.md
docs/02_basic-design.md
docs/03_detail_design.md
docs/04_architecture.md
docs/05_component_design.md
docs/06_ui-guideline.md
docs/ui-reference/
```

- `docs/05_database.md` / `docs/06_api.md` は MVP では作成しない
- Persistence は LocalStorage。方針は `docs/04_architecture.md` に記載する

### Changes

- `docs/04_architecture.md` — MVP vs Future Route 節を追加、docs 一覧を実ファイルに更新
- `docs/screen-list.md` — Future Multi-Form Routes 節を追加、docs パスを修正
- `docs/02_basic-design.md` / `docs/03_detail_design.md` — docs 参照を修正
- `AGENTS.md` — docs 構造・Database/API 節を MVP 方針に更新
- `.cursor/rules/*.mdc` — MVP ルートを現行とし、誤った docs パスを修正

### Scope Note

今回の作業は食い違い解消のみ。Phase 1 実装は含まない。
