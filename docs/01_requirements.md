# 要件定義書

---

# 1. プロジェクト概要

## プロジェクト名

Formly

## Tagline

> Build forms visually. Export clean code.

## 概要

Formlyは、ブラウザ上でフォームを視覚的に設計し、生成されたHTML、CSS、JavaScriptを自分のWebサイトへ組み込めるForm Builderである。

ユーザーは専門的なコーディング知識がなくても、フォームの構造や外観を視覚的に構築できる。

Formlyは、フォームの送信処理を提供するサービスではない。

Formlyの役割は、

```text
フォームを作る
    ↓
フォームを確認する
    ↓
コードを生成する
    ↓
コードを持ち出す
```

````

というワークフローを提供することである。

---

# 2. 開発目的

## 主目的

- 実際に利用できるForm Builderを提供する
- Web制作におけるフォーム実装の手間を削減する
- HTML / CSS / JavaScriptを生成できる実用的なツールを作る
- ブラウザだけでフォームを作成できる体験を提供する
- ポートフォリオとして実務レベルのFrontend Engineeringを示す
- React Router v8を利用した実践的なWebアプリケーションを構築する

## 開発コンセプト

> 「ブラウザでフォームを視覚的に作り、そのまま使えるコードとして持ち出せるForm Builder」

---

# 3. 対象ユーザー

Formlyの対象ユーザーは以下とする。

- Webデザイナー
- Web制作者
- フリーランス
- 小規模Web制作チーム
- 小規模事業者
- 個人サイト運営者
- 簡単なフォームをWebサイトへ設置したいユーザー
- フォームのFrontend実装を効率化したい開発者

## Primary User

特に以下をPrimary Userとする。

> Webデザイナー・Web制作者・小規模事業者など、簡単なフォームを作ってWebサイトに設置したい人。

---

# 4. システム概要

Formlyでは以下の機能を提供する。

- Landing Page
- Form Builder
- Form Preview
- Builder内Preview
- HTML生成
- CSS生成
- JavaScript生成
- Generated Code Viewer
- Code Copy
- Code Export
- LocalStorage保存
- Form Schema Import
- Form Schema Export
- Application Settings
- 多言語対応
- レスポンシブ対応
- アクセシビリティ対応

基本的なユーザーフローは以下とする。

```text
Landing
   ↓
Form Builder
   ↓
Add / Configure Fields
   ↓
Builder Preview
   ↓
Full Preview
   ↓
Generated Code
   ↓
Copy / Export
```

---

# 5. 開発環境

## Frontend

- React
- React Router v8
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Code Quality

- ESLint
- Prettier

## Testing

- Vitest
- Testing Library
- Playwright

## Deployment

- Cloudflare Workers

## Storage

- Browser LocalStorage

## Authentication

現在は使用しない。

## Database

現在は使用しない。

## Backend API

現在のコア機能では使用しない。

---

# 6. 基本プロダクト構成

Formlyは以下の構造を基本とする。

```text
                    Form Schema
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
       Builder         Preview       Generator
          │                              │
          ↓                         ┌────┼────┐
     LocalStorage                   ↓    ↓    ↓
                                   HTML CSS   JS
```

Form SchemaをCanonical Sourceとする。

Builder、Preview、Code Generatorがそれぞれ独自のFormデータを保持することは禁止する。

---

# 7. 機能一覧

| 機能                  | 概要                                               | Priority |
| --------------------- | -------------------------------------------------- | -------- |
| Landing               | Formlyの概要とBuilderへの導線                      | P0       |
| Form Builder          | フォームを視覚的に作成・編集                       | P0       |
| Field Management      | Fieldの追加・削除・並び替え                        | P0       |
| Field Configuration   | Fieldの各種設定                                    | P0       |
| Form Schema           | FormのCanonical Data Model                         | P0       |
| Builder Preview       | Builder内でフォームを確認                          | P0       |
| Form Preview          | 独立したPreview画面                                | P0       |
| HTML Generator        | HTMLを生成                                         | P0       |
| CSS Generator         | CSSを生成                                          | P0       |
| JavaScript Generator  | JavaScriptを生成                                   | P0       |
| Code Viewer           | Generated Codeを表示                               | P0       |
| Copy Code             | CodeをClipboardへコピー                            | P0       |
| Code Export           | Generated CodeをExport                             | P0       |
| LocalStorage          | Formをブラウザへ保存                               | P0       |
| Responsive            | Desktop / Tablet / Mobile対応                      | P0       |
| Accessibility         | Application / Generated Formのアクセシビリティ対応 | P0       |
| i18n                  | 日本語 / 英語 / 中国語 / 韓国語                    | P0       |
| Application Settings  | Application設定                                    | P1       |
| Form Schema Import    | Form Schemaを読み込む                              | P1       |
| Form Schema Export    | Form Schemaを書き出す                              | P1       |
| Templates             | Form Templateから作成                              | Future   |
| Cloud Storage         | サーバー側への保存                                 | Future   |
| Authentication        | ユーザーアカウント                                 | Future   |
| Form Hosting          | Formly上でフォーム公開                             | Future   |
| Submission Management | 送信データ管理                                     | Future   |
| Collaboration         | チーム共同編集                                     | Future   |

---

# 8. 画面一覧

| No  | Screen ID | 画面名               | Route       | Priority |
| --- | --------- | -------------------- | ----------- | -------- |
| 01  | SCR-001   | Landing / Home       | `/`         | P0       |
| 02  | SCR-002   | Form Builder         | `/builder`  | P0       |
| 03  | SCR-003   | Form Preview         | `/preview`  | P0       |
| 04  | SCR-004   | Generated Code       | `/code`     | P0       |
| 05  | SCR-005   | Application Settings | `/settings` | P1       |

Builder内には独立したPreview機能を提供する。

```text
/builder
    └── Builder Preview
```

Import / Exportは独立Screenではなく、Builderの機能として提供する。

---

# 9. 各画面の要件

# Landing / Home

## Route

```text
/
```

## 目的

Formlyの価値をユーザーへ伝え、Form Builderの利用へ誘導する。

案件獲得を意識したPortfolio / Product Presentationとしての役割も持つ。

## 機能

- Formly Introduction
- Product Value Proposition
- Start Building CTA
- Feature Overview
- How It Works
- Preview / Demo
- Technology Overview
- GitHub Link
- Language Switcher
- Footer

## 必須要件

- `/builder`への明確なCTAを提供する
- Formlyの用途を短時間で理解できる
- Desktop / Tablet / Mobileに対応する
- 多言語に対応する
- アクセシビリティを考慮する

---

# Form Builder

## Route

```text
/builder
```

## 目的

Formlyの中心機能。

ユーザーがフォームを視覚的に作成・編集できるようにする。

## 機能

- Form作成
- Field追加
- Field削除
- Field選択
- Field設定
- Field並び替え
- Field複製
- Form設定
- Builder Preview
- LocalStorage保存
- LocalStorage復元
- New Form
- Reset Form
- Import
- Export
- Previewへの移動
- Codeへの移動

## Initial Field Types

初期実装では以下を対象とする。

- Text
- Email
- Number
- Textarea
- Select
- Radio
- Checkbox
- Submit Button

追加Field TypeはRequirements / Detail Designで定義する。

## Builder Layout

Desktopでは以下を基本とする。

```text
┌──────────────┬────────────────────────┬─────────────────┐
│ Field        │ Form Canvas            │ Field Settings │
│ Palette      │                        │                 │
└──────────────┴────────────────────────┴─────────────────┘
```

MobileではPanelを縦方向に配置するか、Drawer / Sheetとして表示する。

---

# Form Preview

## Route

```text
/preview
```

## 目的

Builderで作成したFormを独立した画面で確認する。

## 機能

- Form Rendering
- Field Rendering
- Responsive Preview
- Desktop Preview
- Tablet Preview
- Mobile Preview
- Basic Interaction
- Validation Preview
- Builderへの移動
- Codeへの移動

## 必須要件

- Form SchemaをSourceとして使用する
- BuilderとPreviewでForm構造が一致する
- Desktop / Tablet / Mobileを確認できる
- 不正なForm Schemaを安全に処理する

---

# Generated Code

## Route

```text
/code
```

## 目的

Form Schemaから生成されたFrontend Codeを確認し、ユーザーが自分のWebサイトへ持ち出せるようにする。

## 機能

- HTML表示
- CSS表示
- JavaScript表示
- Code Tabs
- Syntax Highlighting
- Copy to Clipboard
- Download / Export
- Builderへの移動
- Previewへの移動

## Generated Output

```text
HTML
CSS
JavaScript
```

## 必須要件

Generated Codeは以下を満たすこと。

- Readable
- Maintainable
- Semantic
- Responsive
- Accessible where practical
- Formly本体へ依存しない

Generated JavaScriptをFormly本体の実行コンテキストで直接実行しない。

---

# Application Settings

## Route

```text
/settings
```

## 目的

Formly Application全体の設定を管理する。

## 機能

### Appearance

- Theme
- Light
- Dark
- System

### Language

- 日本語
- English
- 中文
- 한국어

### Local Data

- LocalStorage確認
- Local Data Clear
- Application Data Reset

### About

- Formly
- Version
- GitHub
- Documentation

Settingsは必要最小限とし、不必要な設定項目を追加しない。

---

# 10. Form Builder Requirements

## Form Creation

ユーザーは新しいFormを作成できる。

## Field Addition

ユーザーはField PaletteからFieldを追加できる。

## Field Selection

Canvas上のFieldを選択できる。

選択されたFieldはVisual Stateによって明確に識別する。

## Field Configuration

選択中のFieldについて設定を変更できる。

代表的な設定:

- Label
- Placeholder
- Required
- Options
- Validation
- Field-specific configuration

## Field Reordering

ユーザーはFieldの順番を変更できる。

並び順はForm Schemaへ反映する。

## Field Deletion

ユーザーはFieldを削除できる。

破壊的操作には必要に応じて確認UIを使用する。

## Field Duplication

既存Fieldを複製できる。

複製時にはField IDが重複しないようにする。

---

# 11. Form Schema Requirements

Form SchemaはFormlyにおけるCanonical Sourceとする。

Form Schemaには以下の情報を保持する。

- Schema Version
- Form Metadata
- Form ID
- Form Name
- Field ID
- Field Type
- Field Order
- Label
- Placeholder
- Required
- Options
- Validation Configuration
- Presentation-related Configuration

Form Schemaの詳細仕様は:

```text
docs/02_basic-design.md
docs/03_detail_design.md
```

で定義する。

---

# 12. Preview Requirements

PreviewはForm Schemaから生成する。

```text
Form Schema
    ↓
Form Renderer
    ↓
Preview
```

Builder PreviewとFull Previewは同一のForm Schemaを参照する。

Previewでは以下を確認できる。

- Field layout
- Label
- Placeholder
- Required indicator
- Input appearance
- Button appearance
- Responsive behavior
- Basic validation behavior

---

# 13. Code Generation Requirements

## HTML

HTML GeneratorはSemantic HTMLを優先する。

以下を適切に生成する。

- `<form>`
- `<label>`
- Input elements
- Textarea
- Select
- Buttons
- Accessible relationships
- Appropriate attributes

## CSS

CSS GeneratorはFormの外観を再現する。

以下を考慮する。

- Layout
- Spacing
- Typography
- Form fields
- Buttons
- Responsive behavior
- States

## JavaScript

JavaScript GeneratorはFrontend behaviorを生成する。

必要に応じて:

- Client-side validation
- Interaction
- Form behavior

などを生成する。

Generated JavaScriptはFormly本体に依存しない。

---

# 14. Code Export Requirements

ユーザーはGenerated Codeを取得できる。

最低限以下を提供する。

- HTML Copy
- CSS Copy
- JavaScript Copy

可能であれば以下も提供する。

- HTML Download
- CSS Download
- JavaScript Download
- Combined Export

Export形式の詳細は`03_detail_design.md`で定義する。

---

# 15. LocalStorage Requirements

Formlyはユーザーアカウントを必要としない。

FormデータはLocalStorageへ保存する。

## 保存対象

基本的にForm Schemaを保存する。

```text
Form Schema
    ↓
LocalStorage
```

## 必須要件

- Form保存
- Form復元
- Page Reload後の復元
- Invalid Data Handling
- Storage Error Handling
- Clear Data

## セキュリティ

LocalStorageをSecure Storageとして扱わない。

LocalStorageに保存されたデータはユーザー環境に存在するデータとして扱う。

---

# 16. Form Schema Import / Export Requirements

Import / ExportはMVP後のP1機能とする。

## Export

Form SchemaをJSONとしてExportできる。

```text
Form Schema
    ↓
JSON
```

## Import

JSONをFormlyへImportできる。

```text
JSON
    ↓
Validation
    ↓
Form Schema
    ↓
Builder
```

## Import Validation

Importされたデータは信頼せず、必ずValidationする。

不正なSchemaはBuilderへ反映しない。

## Versioning

Form SchemaにはSchema Versionを持たせる。

将来的なSchema変更に対応できる設計とする。

---

# 17. Internationalization Requirements

Formlyは以下の4言語に対応する。

- 日本語
- English
- 中文
- 한국어

## 対象

- Navigation
- Buttons
- Labels
- Messages
- Error Messages
- Empty States
- Loading States
- Settings
- Landing Page
- Builder UI
- Preview UI
- Code UI

## 非対象

ユーザーがForm Builderで入力した任意のLabelやPlaceholderなどを自動翻訳することは、現在の要件には含めない。

---

# 18. Responsive Requirements

Formlyは以下のViewportに対応する。

- Desktop
- Tablet
- Mobile

## Landing

Desktop:

Multi-column Layoutを利用できる。

Mobile:

Single-column Layoutを基本とする。

## Builder

Desktop:

```text
Field Palette
Form Canvas
Field Settings
```

の3領域を基本とする。

Mobile:

- Form Canvasを優先
- Field PaletteをDrawer / Sheet化
- Field SettingsをDrawer / Sheet化
- Touch操作に適したUI

## Preview

Desktop / Tablet / Mobileの表示を確認できる。

## Code

MobileではCodeを無理に折り返さず、Horizontal Scrollを許可する。

---

# 19. Accessibility Requirements

Formly ApplicationはAccessibilityを考慮する。

## Application

- Keyboard Navigation
- Focus Management
- Accessible Labels
- Semantic HTML
- Accessible Buttons
- Error Messages
- Focus Visibility
- Color Contrast
- Reduced Motion

## Generated Form

Generated HTMLも以下を優先する。

- Semantic HTML
- LabelとInputの適切な関連付け
- Accessible Attributes
- Keyboard操作
- Error Communication
- Focus Management where applicable

---

# 20. State Requirements

各画面では必要に応じて以下のStateを実装する。

```text
Initial
Loading
Loaded
Empty
Error
Success
```

## Builder

```text
Initial
Editing
Field Selected
Saving
Saved
Validation Error
Empty
Error
```

## Preview

```text
Loading
Loaded
Empty
Invalid Schema
Error
```

## Code

```text
Loading
Generated
Empty
Generation Error
Copy Success
Copy Error
Export Error
```

## Settings

```text
Loaded
Saving
Saved
Error
```

---

# 21. Error Handling Requirements

ユーザーが復旧可能なErrorについては、可能な限り復旧方法を提示する。

例えば:

```text
Invalid Form Schema
```

の場合、

- エラーの説明
- Builderへ戻る
- Resetする

などのActionを提示する。

ApplicationがErrorになった場合でも、ユーザーのFormデータを可能な限り失わない。

---

# 22. Security Requirements

Formlyでは以下をUntrusted Dataとして扱う。

- User-provided Form Schema
- LocalStorage Data
- Imported JSON
- User-defined Field Labels
- User-defined Placeholder
- Generated HTML
- Generated CSS
- Generated JavaScript

## 必須要件

- Imported SchemaをValidationする
- LocalStorage DataをValidationする
- HTMLを安全に扱う
- PreviewでGenerated JavaScriptを無制限に実行しない
- XSSを防止する
- Code Generation時に適切なEscapingを行う
- Clipboard APIのErrorを処理する

詳細なSecurity Ruleは:

```text
.cursor/rules/security.mdc
```

に従う。

---

# 23. Performance Requirements

Formlyは軽量で高速な操作感を目標とする。

特に以下を考慮する。

- Initial Load
- Route Navigation
- Builder Rendering
- Field Editing
- Field Reordering
- Preview Rendering
- Code Generation
- LocalStorage Access

Field数が増加した場合でも、通常のForm Builder操作が著しく遅くならないことを目標とする。

詳細は:

```text
.cursor/rules/performance.mdc
```

に従う。

---

# 24. Testing Requirements

新規機能にはテストを追加する。

## Unit Test

対象:

- Form Schema
- Schema Validation
- Field Logic
- Generator
- LocalStorage
- Utility Functions

## Integration Test

対象:

- Builder + Form Schema
- Builder + LocalStorage
- Preview + Form Schema
- Generator + Form Schema

## E2E Test

重要なUser Journeyをテストする。

最低限:

```text
Landing
   ↓
Builder
   ↓
Add Field
   ↓
Configure
   ↓
Preview
   ↓
Code
   ↓
Copy / Export
```

を検証する。

使用するTesting Tools:

- Vitest
- Testing Library
- Playwright

詳細は:

```text
.cursor/rules/testing.mdc
```

に従う。

---

# 25. Code Quality Requirements

FormlyはProduction-orientedなコード品質を目標とする。

## 必須

- TypeScript
- ESLint
- Prettier
- 型安全
- Reusable Components
- Single Responsibility
- 適切なSeparation of Concerns

## 禁止

- `any`の使用
- 不必要な重複コード
- 不必要な抽象化
- 不必要な依存関係
- Form Schemaの重複管理

---

# 26. React Router Requirements

FormlyではReact Router v8をApplication Routingの中心として使用する。

基本Route:

```text
/
├── /builder
├── /preview
├── /code
└── /settings
```

## Route Responsibility

### `/`

Landing / Home

### `/builder`

Form Builder

### `/preview`

Full Form Preview

### `/code`

Generated Code

### `/settings`

Application Settings

Route設計の詳細は:

```text
.cursor/rules/routing.mdc
```

に従う。

---

# 27. UI Requirements

FormlyのUIは以下を基本とする。

- Modern
- Minimal
- Professional
- Clean
- Accessible
- Responsive
- Consistent

## UI Components

可能な限り既存のUI Componentを再利用する。

使用するUI基盤:

- Tailwind CSS
- shadcn/ui
- Lucide Icons

## UI States

必要に応じて:

- Loading
- Skeleton
- Empty
- Error
- Success

を提供する。

---

# 28. Portfolio Requirements

Formlyは案件獲得を目的としたPortfolio Projectとしても開発する。

そのため、単に動作するだけでなく以下を重視する。

- UI品質
- UX品質
- Architecture
- Type Safety
- Testing
- Accessibility
- Performance
- Responsive Design
- Internationalization
- Documentation
- Cloudflare Deployment
- React Router usage
- Code Generator architecture

## Portfolio Presentation

Production環境で実際に操作できることを重視する。

GitHub Repositoryでは以下を明確にする。

- Product Concept
- Features
- Technology Stack
- Architecture
- Testing Strategy
- Deployment
- Screenshots / Demo
- Development Documentation

---

# 29. 非機能要件

## Design

- Modern UI
- Minimal UI
- Professional appearance
- Consistent spacing
- Consistent typography
- Responsive
- Accessibility
- Light / Dark / System theme

## Performance

- 高速な初回表示
- スムーズなRoute Navigation
- Builder操作の低遅延
- 効率的なPreview Rendering
- 効率的なCode Generation

## Maintainability

- TypeScript
- ESLint
- Prettier
- Reusable Components
- Clear Architecture
- Form SchemaのSingle Source of Truth
- Automated Tests
- Documentation

## Reliability

- Invalid Schemaを安全に処理する
- LocalStorage Errorを処理する
- Import Errorを処理する
- Generator Errorを処理する
- Clipboard Errorを処理する

---

# 30. デザインコンセプト

FormlyのUIは、以下の方向性を基本とする。

## Keywords

- Modern
- Minimal
- Professional
- Clean
- Developer Tool
- Productivity
- Premium
- Accessible

## Design Goals

ユーザーが、

> 「フォームを作るためのツール」

だと直感的に理解できることを優先する。

過剰な装飾よりも、

- Information Hierarchy
- 操作性
- Readability
- Visual Feedback
- Consistency

を重視する。

---

# 31. 対象外機能

現在のFormlyでは以下を対象外とする。

## Authentication

- Login
- Signup
- OAuth
- Account Management

## Cloud Storage

- Cloud Form Storage
- Cloud Synchronization
- Server-side Form Persistence

## Form Submission Platform

- Hosted Form Submission
- Submission Dashboard
- Submission History
- Email Notification
- CRM Integration

## Collaboration

- Team Management
- Real-time Collaboration
- Comments
- Permissions

## SaaS

- Subscription
- Billing
- Payment
- Usage-based Pricing

## Other

- Native Mobile Application
- General Website Builder
- CMS
- Full Page Builder

これらは将来的な可能性としてRoadmapに記載するが、現在のProduct Scopeには含めない。

---

# 32. Future Features

将来的に以下を検討する。

## Form Templates

- Contact Form
- Inquiry Form
- Reservation Form
- Application Form
- Newsletter Form
- Feedback Form

## Form Schema

- Advanced Import
- Advanced Export
- Schema Version Migration
- Template Sharing

## Cloud Features

- User Accounts
- Cloud Storage
- Cross-device Synchronization

## Hosted Forms

- Form Publishing
- Hosted Form URLs
- Submission Management

## Collaboration

- Team Accounts
- Shared Forms
- Permissions
- Collaboration

Future機能は、Core Product Loopを損なわない範囲で検討する。

---

# 33. 成果物

本プロジェクトでは以下を成果物とする。

## Application

- Production-ready Web Application
- Cloudflare Workers deployment
- Responsive UI
- Accessible UI
- Multi-language UI

## Core Features

- Form Builder
- Form Preview
- HTML Generator
- CSS Generator
- JavaScript Generator
- Code Export
- LocalStorage Persistence

## Engineering

- TypeScript
- React Router v8
- Component Architecture
- Form Schema Architecture
- Automated Tests
- ESLint
- Prettier

## Documentation

- Product Documentation
- Roadmap
- Requirements
- Basic Design
- Detailed Design
- Architecture
- Database Design
- API Design
- Component Design
- UI Guideline
- Development Log
- README

---

# 34. Requirements Traceability

主要な要件と関連ドキュメントの関係を以下とする。

| Requirement         | Related Document              |
| ------------------- | ----------------------------- |
| Product Definition  | `docs/product.md`             |
| Development Roadmap | `docs/roadmap.md`             |
| Screen Requirements | `docs/screen-list.md`         |
| Basic Design        | `docs/02_basic-design.md`     |
| Detailed Design     | `docs/03_detail_design.md`    |
| Architecture        | `docs/04_architecture.md`     |
| Database            | `docs/05_database.md`         |
| API                 | `docs/06_api.md`              |
| Component Design    | `docs/07_component_design.md` |
| UI Guideline        | `docs/08_ui-guideline.md`     |
| Development History | `docs/development-log.md`     |

---

# 35. Requirements and Cursor Rules

実装時には以下のCursor Rulesを参照する。

```text
.cursor/rules/architecture.mdc
.cursor/rules/coding.mdc
.cursor/rules/git.mdc
.cursor/rules/testing.mdc
.cursor/rules/ui.mdc
.cursor/rules/routing.mdc
.cursor/rules/i18n.mdc
.cursor/rules/forms.mdc
.cursor/rules/state-management.mdc
.cursor/rules/cloudflare.mdc
.cursor/rules/security.mdc
.cursor/rules/performance.mdc
.cursor/rules/workflow.mdc
```

RequirementsとCursor Rulesに矛盾がある場合は、Architecture / Product / Requirementsの意図を確認したうえで、必要なドキュメントを更新する。

---

# 36. Implementation Priority

実装優先順位は以下とする。

```text
P0
Core Product
```

```text
P1
Important UX / Product Features
```

```text
P2
Enhancement
```

```text
Future
Long-term Possibility
```

## P0

- Landing
- Form Builder
- Form Schema
- Field Management
- Field Configuration
- Builder Preview
- Full Preview
- HTML Generator
- CSS Generator
- JavaScript Generator
- Code Viewer
- Code Copy
- Code Export
- LocalStorage
- Responsive Design
- Accessibility
- i18n foundation

## P1

- Application Settings
- Form Schema Import
- Form Schema Export
- Advanced Accessibility
- Performance Optimization
- Portfolio Presentation

## Future

- Templates
- Cloud Storage
- Authentication
- Form Hosting
- Submission Management
- Collaboration
- SaaS

---

# 37. MVP Requirements

MVPでは以下を必須とする。

```text
Landing
    ↓
Form Builder
    ↓
Field Management
    ↓
Form Schema
    ↓
Builder Preview
    ↓
Full Preview
    ↓
HTML Generator
    ↓
CSS Generator
    ↓
JavaScript Generator
    ↓
Code Viewer
    ↓
Copy / Export
    ↓
LocalStorage
```

MVPでは以下を必要としない。

- Login
- Account
- Cloud Database
- Server API
- Cloud Storage
- Form Hosting
- Submission Management
- Team Collaboration

---

# 38. Definition of Done

Featureは以下を満たした場合に完了とする。

- Requirementsを満たしている
- TypeScriptの型エラーがない
- ESLintが通過する
- Prettierが適用されている
- Unit / Integration / E2Eの必要なTestsがある
- Responsive対応されている
- Accessibilityを確認している
- Loading / Empty / Error Stateを必要に応じて実装している
- i18nを確認している
- Security上の問題を確認している
- Performance上の問題を確認している
- 関連ドキュメントが更新されている

---

# 39. Product Success Criteria

Formlyは、ユーザーが以下を実行できればCore Productとして成立する。

```text
1. Formlyを開く
       ↓
2. Builderを開く
       ↓
3. Fieldを追加する
       ↓
4. Fieldを設定する
       ↓
5. Fieldを並べ替える
       ↓
6. Previewする
       ↓
7. HTML / CSS / JavaScriptを生成する
       ↓
8. Codeをコピー / Exportする
       ↓
9. 自分のWebサイトへ組み込む
```

さらに、

```text
Page Reload
    ↓
LocalStorage
    ↓
Form Restore
```

によって、ログインなしでも作業を継続できることを必須とする。

---

# 40. 今後の設計ドキュメント

本要件定義書を基準として、以下の設計ドキュメントを順次作成・更新する。

```text
02_basic-design.md
03_detail_design.md
04_architecture.md
05_database.md
06_api.md
07_component_design.md
08_ui-guideline.md
development-log.md
```

Database / APIについては、現在のFormlyではサーバー側Database / APIを使用しないため、実装内容に合わせて必要最小限の設計とする。

設計上の新しい決定が発生した場合は、関連ドキュメントを更新する。

---

# 41. Requirement Principles

FormlyのRequirementsは以下の原則に従う。

### Simple

コア機能をシンプルに保つ。

### Visual

フォーム作成を視覚的に理解できるようにする。

### Practical

生成されたコードを実際のWebサイトで利用できるようにする。

### Lightweight

コア機能にアカウントやBackendを必要としない。

### Maintainable

Form SchemaとGenerated Codeを含め、保守しやすい構造にする。

### Accessible

ApplicationとGenerated FormのAccessibilityを考慮する。

### Responsive

Desktop / Tablet / Mobileをサポートする。

### Internationalized

日本語、英語、中国語、韓国語に対応する。

### Secure

User-provided dataとGenerated Codeを安全に扱う。

### Portfolio-ready

実用性とEngineering Qualityの両方を重視する。

---

# 42. Final Requirement Statement

Formlyは、Webデザイナー、Web制作者、小規模事業者などが、ブラウザ上でフォームを視覚的に作成し、そのフォームをHTML、CSS、JavaScriptとして自分のWebサイトへ組み込めるようにするForm Builderである。

FormlyのCore Product Loopは、

```text
Build
  ↓
Configure
  ↓
Preview
  ↓
Generate
  ↓
Export
```

である。

FormlyはこのCore Product Loopを中心に設計し、不要なBackend、Authentication、Cloud Storage、SaaS機能を早期に導入しない。

最終的なプロダクトとしては、

> **Build forms visually. Export clean code.**

を実現する、軽量で実用的なForm Builderを目指す。
````
