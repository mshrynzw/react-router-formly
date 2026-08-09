# Development Log

Formly の重要な技術判断・アーキテクチャ変更を記録する。

些細な typo 修正や日常的な実装詳細は記録しない。

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
