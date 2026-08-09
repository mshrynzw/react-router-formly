# Formly

Build forms visually. Export clean code.

Formly はブラウザ上でフォームを視覚的に設計し、HTML / CSS / JavaScript を書き出せる Form Builder です。

## Stack

- React 19
- React Router v8
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui 基盤
- Cloudflare Workers
- Vitest / Testing Library / Playwright

## MVP Routes

```text
/
├── /builder
├── /preview
├── /code
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
pnpm deploy       # Cloudflare Workers へデプロイ
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

## Development Status

- Phase 1 — Foundation 完了
- Phase 2 — Core Form Builder 完了

次は Phase 3 — Preview。
