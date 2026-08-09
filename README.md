# Formly

Build forms visually. Export clean code.

Formly はブラウザ上でフォームを視覚的に設計し、HTML / CSS / JavaScript を書き出せる Form Builder です。
ログイン不要。Form Schema は LocalStorage に保存されます。

<img width="1920" height="1412" alt="image" src="https://github.com/user-attachments/assets/4c063652-9936-4c08-9e5e-869601bfd989" />
<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/abed99a4-16af-4b59-99e8-e194de304206" />
<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/ee4a9c5b-d4dc-42f5-a3e3-dfa383ff8f83" />

## Demo

ローカル:

```bash
pnpm install
pnpm dev
```

主な導線:

```text
Landing (/)
  → Templates または Builder
  → Preview（バリデーション確認）
  → Code（HTML / CSS / JS 書き出し）
```

デプロイ済みの公開 URL がある場合はここに追記してください。

## Features

- Visual Form Builder（追加・編集・並び替え）
- Live Preview（同一 Form Schema）
- Clean Code Export（standalone HTML / CSS / JS）
- Form Schema Import / Export（`*.formly.json`）
- Templates（お問い合わせ、フィードバックなど）
- i18n（日本語 / English / 中文 / 한국어）
- Cloudflare Workers デプロイ

## Architecture (MVP)

```text
Form Schema (source of truth)
  ├── Builder
  ├── Preview
  ├── Code Generator
  └── LocalStorage (`formly.activeForm`)
```

- 単一フォーム体験（`/forms/:formId` は未導入）
- Feature First（`src/features/*`）
- React Router v8 によるルート構成

## Stack

- React 19
- React Router v8
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui 基盤
- Cloudflare Workers
- Vitest / Testing Library / Playwright

## Routes

```text
/
├── /builder
├── /preview
├── /code
├── /templates
└── /settings
```

## Scripts

```bash
pnpm dev          # ローカル開発
pnpm build        # 本番ビルド
pnpm lint         # ESLint
pnpm typecheck    # TypeScript
pnpm test         # Vitest (unit / integration)
pnpm test:e2e     # Playwright
pnpm run deploy   # Cloudflare Workers へデプロイ
```

## Documentation

- `docs/product.md`
- `docs/roadmap.md`
- `docs/screen-list.md`
- `docs/01_requirements.md`
- `docs/02_basic-design.md`
- `docs/03_detail_design.md`
- `docs/04_architecture.md`
- `docs/05_component_design.md`
- `docs/06_ui-guideline.md`
- `docs/development-log.md`

## Generated Code

生成物は Form Schema から導出されます。

- HTML: semantic labels / `aria-invalid` / エラー領域
- CSS: standalone、レスポンシブ、`prefers-reduced-motion`
- JavaScript: クライアントバリデーションと送信ハンドリング（外部送信は action URL 設定時）

Preview は React 描画のモック送信であり、生成 JS をアプリ本体では実行しません。

## Development Status

- Phase 1 — Foundation 完了
- Phase 2 — Core Form Builder 完了
- Phase 3 — Preview 完了
- Phase 4 — Code Generator 完了
- Phase 5 — Local Persistence 完了
- Phase 6 — Quality, Accessibility, Responsive Design, and i18n 完了
- Phase 7 — Form Schema Import / Export 完了
- Phase 8 — Form Templates 完了
- Phase 9 — Portfolio and Production Quality 完了
