# 基本設計書

---

# 1. 目的

本書は「Formly」のシステム構成、画面構成、アーキテクチャおよび設計方針を定義する。

本設計書をもとに詳細設計書および実装を行う。

Formlyの基本設計では、以下を特に重視する。

- Form SchemaをCanonical Sourceとする
- Builder / Preview / Code Generatorで同一Schemaを利用する
- React Router v8をApplication Routingの中心とする
- ブラウザ上でコア機能を完結させる
- LocalStorageを現在の永続化手段とする
- サーバー側Databaseを使用しない
- Generated CodeをFormly本体から独立したOutputとして扱う
- シンプルで保守しやすいArchitectureを維持する

---

# 2. システム構成

FormlyはBrowser First Architectureを採用する。

基本的な構成は以下とする。

```text
┌─────────────────────────────┐
│           Browser           │
│                             │
│  ┌───────────────────────┐  │
│  │       React App       │  │
│  │                       │  │
│  │   React Router v8     │  │
│  │          │            │  │
│  │    ┌─────┼─────┐      │  │
│  │    ▼     ▼     ▼      │  │
│  │ Builder Preview Code  │  │
│  │    │     │     │      │  │
│  │    └─────┼─────┘      │  │
│  │          ▼            │  │
│  │     Form Schema       │  │
│  │          │            │  │
│  │          ▼            │  │
│  │      LocalStorage     │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
              │
              ▼
┌─────────────────────────────┐
│      Cloudflare Workers     │
│       Hosting / Runtime     │
└─────────────────────────────┘
```

````

Formlyのコア機能はBrowser内で実行する。

Cloudflare Workersは主にApplicationのHosting / Runtimeとして利用する。

---

# 3. 技術構成

## フロントエンド

- React
- React Router v8
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## ビルド

- Vite

## コード品質

- ESLint
- Prettier

## バリデーション

- TypeScript
- 必要に応じてSchema Validation Libraryを使用する

## 状態管理

Application全体の状態管理には、必要最小限のReact State / Contextを使用する。

Form Schemaを中心とした状態管理を行う。

必要以上にGlobal Stateを導入しない。

## 永続化

- Browser LocalStorage

## 認証

現在は使用しない。

## データベース

現在は使用しない。

## API

現在のCore Productでは使用しない。

## デプロイ

- Cloudflare Workers

## テスト

- Vitest
- Testing Library
- Playwright

---

# 4. 基本アーキテクチャ

FormlyはFeature Firstを基本としつつ、Form Builderというドメインを中心に構成する。

概念的な構造は以下とする。

```text
Application
│
├── routes
│
├── features
│   ├── builder
│   ├── preview
│   ├── code
│   └── settings
│
├── form-schema
│
├── generators
│   ├── html
│   ├── css
│   └── javascript
│
├── components
│
├── hooks
│
├── lib
│
├── i18n
│
├── styles
│
└── tests
```

画面固有のUIやロジックは、可能な限り各Feature配下に配置する。

---

# 5. Form Schema Architecture

Form SchemaはFormlyにおける最も重要なデータモデルである。

Form SchemaをCanonical Sourceとして扱う。

```text
                    Form Schema
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       Builder         Preview       Generator
          │                              │
          ▼                         ┌────┼────┐
     LocalStorage                   ▼    ▼    ▼
                                   HTML CSS   JS
```

## Principle

Builder、Preview、Generatorがそれぞれ独自のFormデータを保持してはいけない。

すべてのForm関連機能はForm Schemaを参照する。

## Form Schemaが表現するもの

- Form Metadata
- Form ID
- Form Name
- Schema Version
- Field ID
- Field Type
- Field Order
- Label
- Placeholder
- Required
- Options
- Validation Configuration
- Presentation Configuration

詳細なSchema仕様は `03_detail_design.md` で定義する。

---

# 6. Form Builder Architecture

Form BuilderはFormlyのCore Featureである。

BuilderはForm Schemaを編集するためのUIとして設計する。

```text
User Action
     │
     ▼
Builder UI
     │
     ▼
Form Schema Update
     │
     ├──────────────┐
     ▼              ▼
Preview         LocalStorage
     │
     ▼
Generator
```

## Builder Responsibilities

Builderは以下を担当する。

- Field追加
- Field削除
- Field選択
- Field編集
- Field並び替え
- Field複製
- Form設定
- Form Schema更新

BuilderはHTML / CSS / JavaScriptを直接生成しない。

Code GenerationはGeneratorの責務とする。

---

# 7. Preview Architecture

PreviewはForm Schemaを入力としてFormを描画する。

```text
Form Schema
     │
     ▼
Form Renderer
     │
     ▼
Preview
```

Builder内PreviewとFull Previewは、原則として同じForm Schemaを使用する。

## Builder Preview

Builder操作中にFormの外観を確認するためのPreview。

## Full Preview

`/preview`で提供する独立したPreview。

より広い表示領域でFormを確認できる。

## Preview Responsibility

Previewは以下を担当する。

- Form Rendering
- Field Rendering
- Layout Rendering
- Responsive Preview
- Basic Interaction
- Validation-related Visual State

PreviewはForm Schemaを変更する責務を持たない。

---

# 8. Code Generator Architecture

Code GeneratorはForm SchemaからFrontend Codeを生成する。

```text
              Form Schema
                   │
                   ▼
             Code Generator
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
      HTML         CSS         JS
```

Generatorは以下の3つに分離する。

```text
generators/
├── html
├── css
└── javascript
```

## HTML Generator

Semantic HTMLを生成する。

## CSS Generator

FormのVisual StyleとResponsive Styleを生成する。

## JavaScript Generator

Client-side behaviorやValidation-related behaviorを生成する。

各Generatorは可能な限り独立させる。

---

# 9. Generated Code Boundary

Generated CodeはFormly Applicationの内部実装とは別のOutputとして扱う。

```text
Formly Application
       │
       ▼
   Form Schema
       │
       ▼
    Generator
       │
       ▼
Generated Code
       │
       └── HTML / CSS / JavaScript
```

Generated CodeはFormly本体に依存しないことを基本とする。

Generated JavaScriptをFormly Application内で直接実行しない。

PreviewではGenerated Codeそのものを無条件に実行するのではなく、Form Schemaから安全にFormを描画する方式を基本とする。

---

# 10. Persistence Architecture

現在のFormlyではServer-side Persistenceを使用しない。

Form SchemaはLocalStorageへ保存する。

```text
Form Schema
     │
     ▼
Persistence Layer
     │
     ▼
LocalStorage
```

Application CodeからLocalStorage APIを直接各所で呼び出すのではなく、Persistence Layerを介してアクセスする。

これにより、将来的にPersistence方式を変更しやすくする。

例えば将来的にCloud Storageを導入する場合でも、

```text
Builder
   ↓
Persistence Interface
   ↓
LocalStorage
```

から、

```text
Builder
   ↓
Persistence Interface
   ↓
Cloud Storage
```

へ変更できる構造を目指す。

---

# 11. Import / Export Architecture

Form Schema Import / Exportは、Form Schemaそのものを扱う。

## Export

```text
Form Schema
     ↓
Serializer
     ↓
JSON
```

## Import

```text
JSON
 ↓
Parser
 ↓
Schema Validation
 ↓
Form Schema
 ↓
Builder
```

Importされたデータは信頼せず、必ずValidationする。

Invalid SchemaはApplicationへ取り込まない。

Import / Exportは独立したRouteではなく、Builderの機能として提供する。

---

# 12. Routing Architecture

React Router v8をApplication Routingの中心として使用する。

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

## Route Design Principle

各Routeは明確な責務を持つ。

不要なRouteを作成しない。

Builder内で完結できる機能を無理に独立Routeへ分離しない。

詳細は `.cursor/rules/routing.mdc` に従う。

---

# 13. 画面遷移

基本的な画面遷移は以下とする。

```text
              Landing
                 │
                 │ Start Building
                 ▼
              Builder
              /builder
              │    │
        Preview│    │Code
              ▼    ▼
          Preview  Code
          /preview /code
              │    │
              └────┘
                 │
                 ▼
              Builder
```

Builder内にはPreview Panelを持つ。

```text
/builder
    │
    └── Builder Preview
```

SettingsはApplication全体からアクセスできる。

```text
Any Application Screen
          │
          ▼
      /settings
```

---

# 14. ディレクトリ構成

基本的なディレクトリ構成は以下とする。

```text
src/
│
├── routes/
│
├── features/
│   ├── builder/
│   ├── preview/
│   ├── code/
│   └── settings/
│
├── form-schema/
│
├── generators/
│   ├── html/
│   ├── css/
│   └── javascript/
│
├── components/
│
├── hooks/
│
├── lib/
│
├── i18n/
│
├── styles/
│
└── types/
│
tests/
│
├── unit/
├── integration/
└── e2e/
│
docs/
│
public/
```

## Directory Roles

| Directory     | Role                              |
| ------------- | --------------------------------- |
| `routes`      | React RouterのRoute定義           |
| `features`    | Feature単位のUI・ロジック         |
| `form-schema` | Form Schemaと関連ロジック         |
| `generators`  | HTML / CSS / JavaScript Generator |
| `components`  | 共通UI Component                  |
| `hooks`       | Custom Hooks                      |
| `lib`         | Utility / Configuration           |
| `i18n`        | Internationalization              |
| `styles`      | Global Styles                     |
| `types`       | 共通Type Definition               |
| `tests`       | Test Code                         |
| `docs`        | Project Documentation             |
| `public`      | Static Assets                     |

実際の構成は実装時に必要に応じて調整する。

不要なディレクトリを先に大量に作成しない。

---

# 15. Feature First Architecture

画面固有のロジックはFeature配下に配置する。

例えばBuilderの場合:

```text
features/
└── builder/
    ├── components/
    ├── hooks/
    ├── utils/
    └── ...
```

Previewの場合:

```text
features/
└── preview/
    ├── components/
    ├── hooks/
    └── ...
```

共通UIは`components`へ配置する。

Domain Logicは可能な限りFeatureまたはDomain層に配置する。

---

# 16. Component Architecture

Componentは以下の考え方で分類する。

## Shared Components

複数Featureで利用するUI。

例:

```text
Button
Input
Textarea
Select
Checkbox
Dialog
Drawer
Sheet
Tabs
Tooltip
Toast
Skeleton
```

## Feature Components

特定Featureにのみ必要なUI。

例:

```text
BuilderFieldPalette
BuilderCanvas
FieldSettings
PreviewCanvas
CodeViewer
```

Feature固有Componentを無理にGlobal Componentへ配置しない。

---

# 17. State Management

FormlyではStateを必要最小限にする。

## Local State

Component内だけで必要なStateはReact Stateを利用する。

例:

- Dialog open state
- Selected UI tab
- Temporary UI state

## Form State

Formに関するStateはForm Schemaを中心とする。

## Shared State

複数Featureから参照する必要がある場合のみ、適切なContextなどを利用する。

## Persistent State

LocalStorageへ保存するStateはPersistence Layerを介して管理する。

## Principle

Global Stateを最初から導入しない。

必要性が明確になった場合のみ導入する。

---

# 18. Data Flow

Formlyの主要Data Flowは以下とする。

```text
User
 │
 ▼
Builder UI
 │
 ▼
Form Schema
 │
 ├───────────────┐
 ▼               ▼
Preview       Persistence
 │               │
 ▼               ▼
Renderer      LocalStorage
 │
 ▼
Generator
 │
 ├──────┬──────┐
 ▼      ▼      ▼
HTML    CSS     JS
```

Form SchemaがSingle Source of Truthとなる。

---

# 19. データ取得方針

FormlyのCore ProductではServer-side Data Fetchingを必要としない。

基本的なData Sourceは:

```text
User Input
Local Application State
LocalStorage
```

とする。

APIやDatabaseを導入する場合は、Product ScopeとArchitectureを改めて検討する。

現時点ではServer APIを前提とした設計を行わない。

---

# 20. API設計

現在のFormlyではCore ProductにServer APIを使用しない。

```text
Browser
   │
   └── Local Application
          │
          └── LocalStorage
```

そのため、現時点ではAPI Layerを作成しない。

将来的にCloud StorageやAuthenticationなどを導入する場合は、API Architectureを別途設計する。

---

# 21. Database設計

現在のFormlyではDatabaseを使用しない。

```text
Database
   ↓
Not Required
```

Form DataはLocalStorageへ保存する。

Cloudflare D1などのServer-side Databaseは現時点では導入しない。

将来的にCloud Persistenceが必要になった場合は、Requirements / Architecture / Database Designを更新する。

---

# 22. 認証設計

現在のFormlyではAuthenticationを使用しない。

すべての画面をPublic Applicationとして扱う。

```text
Public
│
├── /
├── /builder
├── /preview
├── /code
└── /settings
```

ユーザーアカウントを必要としないことにより、Form Builderをすぐに利用できるようにする。

---

# 23. UI設計方針

Formlyは以下のDesign Conceptを基本とする。

## Design Keywords

- Modern
- Minimal
- Professional
- Clean
- Developer Tool
- Productivity
- Premium

## Design Principles

- 明確なInformation Hierarchy
- 十分な余白
- 一貫したSpacing
- 一貫したTypography
- 明確なVisual Feedback
- Accessible Interaction
- Responsive Layout
- 過剰な装飾を避ける

UI詳細は`docs/06_ui-guideline.md`で定義する。

---

# 24. 共通UI

共通UI Componentを優先して利用する。

主なComponent:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Switch
Badge
Card
Dialog
Drawer
Sheet
Dropdown Menu
Tooltip
Popover
Tabs
Toast
Skeleton
Alert
Empty State
```

必要に応じてshadcn/uiを利用する。

画面固有のUIは各Feature配下で管理する。

---

# 25. Builder UI

Builderは以下の3領域を基本とする。1280px以上では Builder Preview を Canvas の右隣へ移し、4領域とする。

```text
+--------------------------------------------------------+
| Header                                                 |
+-------------+----------------------+-------------------+
| Field       | Form Canvas          | Field Settings   |
| Palette     |                      |                   |
|             |                      |                   |
+-------------+----------------------+-------------------+
| Builder Preview                                        |
+--------------------------------------------------------+
```

```text
1280px〜
+----------+------------------+------------------+----------+
| Field    | Form Canvas      | Builder Preview  | Field    |
| Palette  |                  |                  | Settings |
+----------+------------------+------------------+----------+
```

## Field Palette

Field Typeを選択する。

## Form Canvas

現在のForm SchemaをVisualizeする。

## Field Settings

Selected Fieldの設定を編集する。

## Builder Preview

現在のFormをBuilder内で確認する。

---

# 26. Preview UI

Full Previewは以下を基本とする。

```text
+------------------------------------------------+
| Header                                          |
+------------------------------------------------+
| Preview Toolbar                                 |
+------------------------------------------------+
|                                                |
|              Form Preview                      |
|                                                |
+------------------------------------------------+
| Actions                                         |
+------------------------------------------------+
```

Viewportを変更してResponsive behaviorを確認できる。

---

# 27. Code UI

Generated Code画面では、以下を基本とする。

```text
+------------------------------------------------+
| Header                                          |
+------------------------------------------------+
| Code Toolbar                                    |
+------------------------------------------------+
| HTML | CSS | JavaScript                         |
+------------------------------------------------+
|                                                |
| Code Viewer                                     |
|                                                |
+------------------------------------------------+
| Copy / Export                                   |
+------------------------------------------------+
```

Codeは読みやすさを優先する。

MobileではHorizontal Scrollを許可する。

---

# 28. Error Handling

Formlyでは以下のErrorを考慮する。

- Invalid Form Schema
- LocalStorage Error
- Import Error
- Code Generation Error
- Clipboard Error
- Export Error
- Unexpected Application Error

## Error UI

ユーザーが復旧可能な場合は、可能な限りActionを提示する。

例:

```text
Invalid Form Schema

The form data could not be loaded.

[Reset Form]
[Back to Builder]
```

Application全体を停止させず、可能な範囲で復旧可能な設計とする。

---

# 29. Loading / Empty / Success State

必要な画面ではStateを明示する。

## Loading

データ読み込みやCode Generationなど、ユーザーが待つ必要がある処理に使用する。

## Empty

Formが存在しない場合などに表示する。

## Success

以下のような操作に使用する。

- Saved
- Copied
- Exported

## Error

ユーザーが理解可能なメッセージを表示する。

---

# 30. Responsive Design

対象デバイス:

| Device  | Support |
| ------- | ------- |
| Desktop | ○       |
| Tablet  | ○       |
| Mobile  | ○       |

## Desktop

広い画面を活用する。

Builderでは3Panel Layoutを基本とする。

## Tablet

Panel幅を調整する。

必要に応じてPanelをCollapseできる。

## Mobile

以下のようにLayoutを変更する。

```text
Field Palette
    ↓
Drawer / Sheet

Field Settings
    ↓
Drawer / Sheet
```

Form Canvasを最優先する。

## Code Viewer

MobileではHorizontal Scrollを許可する。

## Preview

Mobile ViewportでFormを確認できる。

---

# 31. Accessibility

Formly ApplicationはAccessibilityを基本要件とする。

## Application

- Keyboard Navigation
- Focus Management
- Visible Focus
- Semantic HTML
- Accessible Labels
- Accessible Buttons
- Appropriate ARIA Attributes
- Color Contrast
- Reduced Motion

## Generated Form

Generated HTMLでは以下を優先する。

- Semantic HTML
- Label / Input association
- Keyboard accessibility
- Appropriate attributes
- Error communication
- Focus behavior

---

# 32. Internationalization

Formlyは以下の言語をサポートする。

```text
日本語
English
中文
한국어
```

i18nはApplication UIに適用する。

```text
Header
Navigation
Builder
Preview
Code
Settings
Messages
Errors
Empty States
```

User-generated Form contentは自動翻訳しない。

言語切替によってLayoutが破綻しないようにする。

詳細は`.cursor/rules/i18n.mdc`に従う。

---

# 33. Performance Design

FormlyはClient-side Applicationとして高速な操作感を目標とする。

## Principles

- 不要なRenderを避ける
- 不要なGlobal Stateを作らない
- Form Schemaの更新範囲を最小化する
- Code Generationを効率化する
- LocalStorageへの不要なWriteを避ける
- 不要なDependencyを追加しない
- Code Splittingを必要に応じて利用する

Builder操作がField数の増加によって著しく遅くならないようにする。

詳細は`.cursor/rules/performance.mdc`に従う。

---

# 34. Security Design

Formlyでは以下をUntrusted Dataとして扱う。

- User Input
- Form Schema
- LocalStorage Data
- Imported JSON
- Generated HTML
- Generated CSS
- Generated JavaScript

## Principles

- Imported dataをValidationする
- LocalStorage dataをValidationする
- HTMLを適切にEscapeする
- PreviewでGenerated JavaScriptを無条件に実行しない
- XSSを防止する
- Generated CodeをApplication Runtimeから分離する

詳細は`.cursor/rules/security.mdc`に従う。

---

# 35. Testing Architecture

Testingは以下の3層を基本とする。

```text
tests/
│
├── unit/
├── integration/
└── e2e/
```

## Unit

対象:

- Form Schema
- Schema Validation
- Generator
- Persistence
- Utility

## Integration

対象:

- Builder + Form Schema
- Preview + Form Schema
- Generator + Form Schema
- LocalStorage + Form Schema

## E2E

主要User Journey:

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

Testing Tools:

- Vitest
- Testing Library
- Playwright

---

# 36. Cloudflare Architecture

Cloudflare WorkersはApplicationのDeployment / Runtimeとして使用する。

```text
Source Code
    ↓
Vite Build
    ↓
Cloudflare Workers
    ↓
Browser
```

FormlyのCore ProductはServer-side Databaseを必要としない。

そのため、Cloudflare Workers上でのServer-side Data Processingは最小限とする。

将来的にCloudflareサービスを追加する場合は、必要性を明確にしたうえで導入する。

---

# 37. Environment Design

Environment-specific Configurationは必要最小限とする。

SecretやCredentialをClient-side Codeへ直接埋め込まない。

Cloudflare固有設定はWrangler Configurationで管理する。

Development / Productionで異なる設定がある場合は明確に分離する。

---

# 38. Deployment Design

基本Deployment Flow:

```text
Developer
    ↓
Git
    ↓
Build
    ↓
Test
    ↓
Cloudflare Workers
    ↓
Production
```

Production Deployment前に以下を確認する。

- TypeScript
- ESLint
- Tests
- Build
- Production startup

---

# 39. 保守性

以下を保守性の基本方針とする。

- TypeScript Strict Mode
- ESLint
- Prettier
- Reusable Components
- Feature First
- Single Responsibility
- Form Schema Single Source of Truth
- Automated Tests
- Documentation

1ファイルが過度に大きくなった場合は責務を分割する。

不要な抽象化は避ける。

---

# 40. Architecture Boundaries

以下の責務を明確に分離する。

```text
Route
  ↓
Feature UI
  ↓
Domain / Form Schema
  ↓
Persistence / Generator
```

## Route

NavigationとScreen Compositionを担当する。

## Feature

User InteractionとFeature-specific UIを担当する。

## Form Schema

FormのCanonical Data Modelを担当する。

## Generator

Form SchemaからOutput Codeを生成する。

## Persistence

Form Schemaの保存・読み込みを担当する。

---

# 41. 禁止事項

以下を禁止する。

### Form Data Duplication

Builder / Preview / Generatorが別々のForm Dataを持つこと。

### Unnecessary Backend

Core ProductのためだけにServer APIやDatabaseを導入すること。

### Premature Authentication

必要になる前にUser Accountを導入すること。

### Generated Code Execution

Generated JavaScriptをFormly本体で無条件に実行すること。

### Global State Overuse

すべての状態をGlobal Stateへ入れること。

### Unnecessary Route

独立した画面が不要な機能をRouteとして追加すること。

### Overengineering

将来必要になるかもしれない機能のために現在のArchitectureを複雑化すること。

---

# 42. Architecture Decision Principles

新しい技術やArchitectureを導入する場合、以下を確認する。

1. Product Requirementに必要か
2. Current Roadmapに含まれているか
3. Existing Architectureで解決できないか
4. Complexityに見合うValueがあるか
5. Maintenance Costは許容できるか
6. Testingが可能か
7. Securityへの影響はないか
8. Performanceへの影響はないか

単に「技術的に面白い」という理由だけで導入しない。

---

# 43. Basic Design and Cursor Rules

本設計書と以下のCursor Rulesを併用する。

```text
.cursor/rules/
├── architecture.mdc
├── coding.mdc
├── git.mdc
├── testing.mdc
├── ui.mdc
├── routing.mdc
├── i18n.mdc
├── forms.mdc
├── state-management.mdc
├── cloudflare.mdc
├── security.mdc
├── performance.mdc
└── workflow.mdc
```

Architectureに関する判断では、`architecture.mdc`と本設計書を確認する。

---

# 44. 今後の設計

本基本設計書と連携する Canonical Documents は以下とする。

```text
03_detail_design.md
04_architecture.md
05_component_design.md
06_ui-guideline.md
development-log.md
product.md
roadmap.md
screen-list.md
```

## 03_detail_design.md

各ScreenおよびFeatureの詳細仕様を定義する。

## 04_architecture.md

実装レベルのArchitecture、Module Boundary、Data Flow、Dependencyなどを定義する。

## 05_component_design.md

Shared ComponentとFeature Componentの詳細を定義する。

## 06_ui-guideline.md

Design Token、Typography、Color、Spacing、Radius、Responsiveなどを定義する。

## development-log.md

Architecture Decisionや重要な実装判断を記録する。

## Database / API Documents

MVP では Server-side Database と Backend API を使用しない。

そのため `05_database.md` / `06_api.md` は作成しない。

将来導入する場合は、その時点で専用ドキュメントを追加する。

---

# 45. Basic Design Summary

Formlyの基本Architectureは以下とする。

```text
                       Browser
                          │
                          ▼
                  React Application
                          │
                  React Router v8
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
     Builder           Preview             Code
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ▼
                     Form Schema
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
        LocalStorage              Generator
                                      │
                            ┌─────────┼─────────┐
                            ▼         ▼         ▼
                           HTML      CSS        JS

                          │
                          ▼
                 Cloudflare Workers
```

Formlyの中心はForm Schemaである。

```text
Builder
   ↓
Form Schema
   ↓
Preview
   ↓
Generator
   ↓
HTML / CSS / JavaScript
```

この構造を維持することで、FormlyのCore Product Loopである、

> **Build forms visually. Export clean code.**

をシンプルかつ保守しやすいArchitectureで実現する。
````
