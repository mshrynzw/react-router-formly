# Architecture Design

Version: 1.0

---

# 1. Overview

本ドキュメントは、Formlyのシステムアーキテクチャを定義する。

Formlyは、ブラウザ上でフォームを視覚的に作成し、HTML / CSS / JavaScriptとしてExportできるForm Builderである。

本アプリケーションは、ポートフォリオとして高いUI/UX品質と、実用的なWebアプリケーション設計の両立を目指す。

主な要件は以下とする。

- 高速な初回アクセス
- ブラウザだけで利用できること
- ログインを必要としないこと
- サーバー側Databaseを必要としないこと
- LocalStorageによるForm保存
- React Router v8を利用した明確なRouting
- Form SchemaをSingle Source of Truthとすること
- 型安全な開発
- テスト可能な設計
- 保守性・拡張性の高いコード
- UIとDomain Logicの責務分離
- Generated CodeとApplication Codeの責務分離
- Cloudflare WorkersへのDeployment
- Responsive / Accessibility / i18n対応

---

# 2. Architecture Goals

以下をアーキテクチャ上の重要な目標とする。

## 2.1 Simplicity

FormlyのCore Productは、

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

````

という単純なProduct Loopで成立する。

不要なBackend、Authentication、Database、APIを導入してArchitectureを複雑化しない。

---

## 2.2 Performance

初回アクセスとBuilder操作を高速にする。

FormlyのCore ProductはBrowser内で完結するため、Form編集のたびにServerへRequestする構成を避ける。

---

## 2.3 Cost

個人ポートフォリオとして運用できるよう、可能な限り低コストな構成とする。

現在はServer-side Databaseを使用しない。

Cloudflare WorkersをHosting / Runtimeとして利用する。

---

## 2.4 Maintainability

以下の責務を明確に分離する。

```text
UI
↓
Feature
↓
Form Schema
↓
Generator / Persistence
```

特定のComponentにApplication全体のLogicを集中させない。

---

## 2.5 Scalability

現在は小規模なBrowser-first Applicationとして設計する。

将来的に以下を追加できる構造を目指す。

- Form Templates
- Cloud Storage
- Authentication
- Form Hosting
- Submission Management
- Collaboration
- Team Features

ただし、Future FeatureのためにMVP Architectureを過度に複雑化しない。

---

# 3. High-Level Architecture

FormlyのHigh-Level Architectureは以下とする。

```text
┌───────────────────────────────────────────────────────────┐
│                         User Browser                       │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                  React Application                  │  │
│  │                                                     │  │
│  │  React Router v8                                    │  │
│  │        │                                            │  │
│  │   ┌────┼────────────┬─────────────┐                 │  │
│  │   ▼    ▼            ▼             ▼                 │  │
│  │ Builder Preview    Code         Settings             │  │
│  │   │       │          │                              │  │
│  │   └───────┼──────────┘                              │  │
│  │           ▼                                         │  │
│  │      Form Schema                                    │  │
│  │           │                                         │  │
│  │      ┌────┴──────────────┐                          │  │
│  │      ▼                   ▼                          │  │
│  │ LocalStorage        Code Generator                  │  │
│  │                          │                          │  │
│  │                     ┌────┼────┐                     │  │
│  │                     ▼    ▼    ▼                     │  │
│  │                    HTML CSS   JS                    │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────┬───────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────┐
│                    Cloudflare Workers                     │
│                  Hosting / Runtime                        │
└───────────────────────────────────────────────────────────┘
```

FormlyのCore ProductはBrowser内で実行する。

Cloudflare Workersは主としてApplicationのHosting / Runtimeとして利用する。

---

# 4. Technology Stack

## 4.1 Frontend

| Technology      | Purpose             |
| --------------- | ------------------- |
| React           | UI                  |
| React Router v8 | Routing             |
| TypeScript      | Type Safety         |
| Vite            | Build / Development |
| Tailwind CSS    | Styling             |
| shadcn/ui       | UI Components       |
| Lucide React    | Icons               |

---

## 4.2 Validation

Form SchemaやImport DataなどのValidationにはSchema Validationを使用する。

基本方針:

```text
Unknown Data
    ↓
Schema Validation
    ↓
Trusted Form Schema
```

Validation Libraryの採用は実装時の既存Dependencyと要件を確認して決定する。

---

## 4.3 State Management

基本:

- React useState
- React useReducer
- Context where necessary

Form Schema:

- Form Schemaを中心としたState Management

Persistence:

- LocalStorage

不要なGlobal State Management Libraryは導入しない。

---

## 4.4 Testing

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| Vitest          | Unit / Integration Test |
| Testing Library | UI Test                 |
| Playwright      | E2E Test                |

---

## 4.5 Infrastructure

| Technology         | Purpose                |
| ------------------ | ---------------------- |
| Cloudflare Workers | Hosting / Runtime      |
| GitHub             | Source Code Management |
| GitHub Actions     | CI/CD                  |

---

# 5. Hosting Strategy

Cloudflare WorkersをProduction Hostingとして利用する。

基本構成:

```text
GitHub
   ↓
Build
   ↓
Cloudflare Workers
   ↓
Browser
```

FormlyのApplication Logicは主としてClient-sideで実行する。

Server-side DatabaseやAPIは現在必要としない。

---

# 6. Frontend Architecture

React Router v8をApplication Routingの中心とする。

基本Route:

```text
/
├── /builder
├── /preview
├── /code
└── /settings
```

Landing:

```text
/
```

Builder:

```text
/builder
```

Preview:

```text
/preview
```

Code:

```text
/code
```

Settings:

```text
/settings
```

---

# 7. React Router Architecture

React Routerは単なるLink管理ではなく、ApplicationのScreen / Route Architectureとして使用する。

各Routeには明確な責務を持たせる。

```text
Route
  ↓
Screen
  ↓
Feature
  ↓
Domain / Form Schema
```

Route固有のLogicをRouter Configurationへ過度に集約しない。

---

# 8. Route Responsibility

## `/`

Landing / Home

責務:

- Product Introduction
- Feature Presentation
- CTA
- Technology Presentation
- BuilderへのNavigation

---

## `/builder`

Form Builder

責務:

- Form Editing
- Field Management
- Field Configuration
- Form Schema Update
- LocalStorage Persistence
- Import / Export
- Builder Preview

---

## `/preview`

Form Preview

責務:

- Form Rendering
- Responsive Preview
- Basic Interaction
- Validation State Preview

---

## `/code`

Generated Code

責務:

- HTML Display
- CSS Display
- JavaScript Display
- Copy
- Export

---

## `/settings`

Application Settings

責務:

- Theme
- Language
- Local Data
- About

---

# 9. Form Schema Architecture

Form SchemaはFormlyにおける最重要Domain Modelである。

Form SchemaをCanonical Source / Single Source of Truthとする。

```text
                         Form Schema
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
          Builder           Preview         Generator
             │                                  │
             ▼                             ┌────┼────┐
        LocalStorage                      ▼    ▼    ▼
                                         HTML CSS   JS
```

Builder、Preview、Generatorがそれぞれ独自のForm Dataを保持してはいけない。

---

# 10. Form Schema Responsibility

Form Schemaは以下を表現する。

- Schema Version
- Form ID
- Form Name
- Form Description
- Field List
- Field ID
- Field Type
- Field Order
- Label
- Placeholder
- Required
- Description
- Options
- Validation
- Presentation Configuration
- Form Settings

詳細なSchemaは `03_detail_design.md` および実装時のType Definitionで定義する。

---

# 11. Form Schema Boundary

Form SchemaはUI Componentから独立したDomain Modelとする。

例えばBuilderのComponentが直接、

```text
HTML
CSS
JavaScript
```

を管理してはいけない。

BuilderはForm Schemaを変更する。

```text
User Action
   ↓
Builder
   ↓
Form Schema
```

PreviewはForm Schemaを読む。

```text
Form Schema
   ↓
Renderer
   ↓
Preview
```

GeneratorもForm Schemaを読む。

```text
Form Schema
   ↓
Generator
   ↓
Code
```

---

# 12. Form Builder Architecture

BuilderはForm Schema Editorとして設計する。

```text
User
 ↓
Builder UI
 ↓
Command / Action
 ↓
Form Schema Update
 ↓
UI Update
 ↓
Persistence
```

Builderは以下を担当する。

- Field追加
- Field削除
- Field複製
- Field並び替え
- Field選択
- Field設定
- Form設定

BuilderはCode Generatorを直接実装しない。

---

# 13. Form Renderer Architecture

PreviewではForm SchemaからForm Rendererを通してUIを生成する。

```text
Form Schema
    ↓
Form Renderer
    ↓
Field Renderer
    ↓
Rendered Form
```

Field TypeによってRendererを切り替える。

```text
text
  ↓
Input

email
  ↓
Email Input

textarea
  ↓
Textarea

select
  ↓
Select

radio
  ↓
Radio Group

checkbox
  ↓
Checkbox

submit
  ↓
Button
```

RendererとGeneratorは別の責務として扱う。

---

# 14. Code Generator Architecture

Code GeneratorはForm Schemaから独立したFrontend Codeを生成する。

```text
Form Schema
     │
     ▼
Code Generator
     │
 ┌───┼────┐
 ▼   ▼    ▼
HTML CSS  JS
```

Generatorは以下に分離する。

```text
generators/
├── html/
├── css/
└── javascript/
```

---

# 15. HTML Generator

HTML GeneratorはSemantic HTMLを生成する。

基本:

```text
<form>
  <label>
  <input>
  <textarea>
  <select>
  <button>
</form>
```

LabelとInputのAssociationを適切に生成する。

User-generated Textは適切にEscapeする。

---

# 16. CSS Generator

CSS GeneratorはFormのVisual Styleを生成する。

対象:

- Layout
- Spacing
- Typography
- Input
- Textarea
- Select
- Radio
- Checkbox
- Button
- Focus State
- Error State
- Responsive Behavior

Generated CSSはFormly本体のCSSへ依存しない。

---

# 17. JavaScript Generator

JavaScript Generatorは必要なClient-side behaviorを生成する。

主な対象:

- Validation
- Interaction
- Form behavior

Generated JavaScriptはFormly本体のReact Runtimeに依存しない。

---

# 18. Generated Code Boundary

Generated CodeとFormly Application Codeを明確に分離する。

```text
Formly
  │
  ▼
Form Schema
  │
  ▼
Generator
  │
  ▼
Generated Code
```

Generated CodeをFormly ApplicationのInternal Runtimeとして扱わない。

特にGenerated JavaScriptをPreviewで無条件に実行しない。

---

# 19. Persistence Architecture

現在のPersistence LayerはLocalStorageとする。

```text
Builder
   ↓
Persistence Interface
   ↓
LocalStorage
```

Application ComponentからLocalStorage APIを直接呼び出さない。

Persistence Layerを介してアクセスする。

---

# 20. Persistence Interface

概念的なInterface:

```text
saveForm(schema)
loadForm()
deleteForm()
clearForms()
```

実際のFunction / Class構成は実装時に決定する。

将来的にCloud Storageへ変更する可能性を考慮し、UIとStorage APIを直接結合しない。

---

# 21. LocalStorage Architecture

保存対象はForm Schemaを基本とする。

```text
Form Schema
   ↓
Serialize
   ↓
LocalStorage
```

読み込み:

```text
LocalStorage
   ↓
Parse
   ↓
Validate
   ↓
Normalize
   ↓
Form Schema
```

LocalStorageから読み込んだデータを信頼してはいけない。

---

# 22. Import Architecture

Form Schema ImportはBuilderの機能として提供する。

```text
JSON File
   ↓
Parse
   ↓
Schema Validation
   ↓
Normalization
   ↓
Form Schema
   ↓
Builder
```

Validationに失敗した場合、Form Schemaとして使用しない。

---

# 23. Export Architecture

Form Schema Export:

```text
Form Schema
   ↓
Serialize
   ↓
JSON
   ↓
Download
```

ExportするJSONにはSchema Versionを含める。

---

# 24. State Management Architecture

FormlyではStateを以下に分類する。

```text
1. Form State
2. Local UI State
3. Persistent State
4. URL State
```

---

## 24.1 Form State

Form Schemaを中心とする。

例:

- Fields
- Labels
- Placeholder
- Validation
- Options
- Form Settings

---

## 24.2 Local UI State

React `useState` / `useReducer`を使用する。

例:

- Selected Field
- Modal Open
- Drawer Open
- Selected Tab
- Preview Viewport
- Code Tab

---

## 24.3 Persistent State

LocalStorageに保存する。

対象:

- Form Schema
- Application Settings where appropriate

---

## 24.4 URL State

必要な場合のみURL Search Parametersを使用する。

例:

```text
/code?tab=html
```

ただし、UI内部状態をすべてURLへ保存しない。

---

# 25. State Ownership

Stateは最も近い適切なOwnerへ配置する。

例:

```text
Selected Field
```

はBuilder Feature内で管理する。

```text
Theme
```

はApplication-level Stateとして管理する。

```text
Form Schema
```

はForm DomainのStateとして管理する。

Global Stateへすべてを入れてはいけない。

---

# 26. Data Flow

基本的なData Flow:

```text
User
  ↓
UI
  ↓
Feature Logic
  ↓
Form Schema
  ├─────────────┐
  ▼             ▼
Preview      Persistence
  │             │
  ▼             ▼
Renderer     LocalStorage

Form Schema
  ↓
Generator
  ↓
HTML / CSS / JavaScript
```

UIからLocalStorageへ直接アクセスしない。

UIからGenerator内部へ直接依存しない。

---

# 27. Service Layer

FormlyではTask ManagerのようなServer-side Service Layerを必須としない。

Browser内のDomain Logicが複雑になった場合は、Feature / Domain Serviceとして分離する。

例:

```text
lib/
└── form/
```

または:

```text
features/builder/
└── services/
```

など、責務に応じて配置する。

Service Layerを形式だけのために作成しない。

---

# 28. Repository Layer

現在Databaseを使用しないため、Database Repository Layerは作成しない。

ただしPersistenceの抽象化が必要な場合は、

```text
Persistence Interface
        ↓
LocalStorage Adapter
```

という構造を採用できる。

将来的にCloud Storageを導入する場合:

```text
Persistence Interface
        │
   ┌────┴────┐
   ▼         ▼
Local      Cloud
Storage    Storage
```

へ拡張可能とする。

---

# 29. API Architecture

現在のCore ProductではServer APIを使用しない。

```text
Browser
   ↓
React Application
   ↓
LocalStorage
```

Form生成、Preview、Code GenerationをAPI経由にしない。

不要なNetwork Requestを発生させない。

---

# 30. Database Architecture

現在Databaseを使用しない。

```text
Database
   ↓
Not Required
```

Cloudflare D1などのDatabaseはMVPに導入しない。

将来的に以下を実現する場合に再検討する。

- Cloud Storage
- User Accounts
- Form Sharing
- Submission Management
- Collaboration

---

# 31. Authentication Architecture

現在Authenticationを使用しない。

```text
User
  ↓
Formly
```

Login / Signup / OAuth / Session ManagementはMVP Scope外とする。

これによりユーザーはApplicationへアクセスしてすぐBuilderを利用できる。

---

# 32. Authorization Architecture

Authenticationがないため、現在Authorizationも必要としない。

```text
User
   ↓
Local Browser Data
```

Form DataはユーザーのBrowser内に保存される。

将来的にCloud Storageを導入する場合は、

```text
Authentication
       ↓
Authorization
       ↓
Form Ownership
```

を再設計する。

---

# 33. Feature First Architecture

Feature Firstを採用する。

画面単位だけではなく、機能単位でコードを整理する。

例:

```text
features/
├── builder/
├── preview/
├── code/
└── settings/
```

LandingはApplication-level Featureとして扱うか、Route固有の構造として管理する。

---

# 34. Feature Structure

Featureは必要に応じて以下の構造を採用する。

```text
features/builder/
├── components/
├── hooks/
├── schemas/
├── types/
├── services/
└── utils/
```

ただし、すべてのFeatureで全ディレクトリを作成する必要はない。

必要なものだけ作成する。

---

# 35. Shared Components

共通UIは以下に配置する。

```text
components/
├── ui/
├── layout/
├── navigation/
└── feedback/
```

例:

```text
components/ui/
├── Button
├── Input
├── Dialog
├── Card
└── Tabs
```

Feature固有のComponentはFeature内へ配置する。

---

# 36. Component Boundary

以下の判断基準を使用する。

## Shared Component

複数Featureで利用される。

例:

```text
Button
Dialog
Card
Input
Badge
Tabs
```

---

## Feature Component

特定Featureに依存する。

例:

```text
FieldPalette
FormCanvas
FieldSettings
BuilderPreview
CodeViewer
```

---

## Page / Route Component

特定RouteのLayoutを組み立てる。

例:

```text
BuilderPage
PreviewPage
CodePage
SettingsPage
```

Page ComponentへDomain Logicを過度に集約しない。

---

# 37. UI Architecture

UI Designは `docs/08_ui-guideline.md` に定義されたDesign Tokenを使用する。

以下を画面ごとに独自定義してはいけない。

- Color
- Radius
- Shadow
- Spacing
- Typography
- Breakpoint

共通Design Systemを利用する。

---

# 38. UI Reference

UI Referenceは以下に保存する。

```text
docs/ui-reference/
```

Referenceには、

```text
index.html
style.css
script.js
```

を配置する。

ReferenceはDesign Specificationとして利用する。

ReferenceのHTML / CSS / JavaScriptをそのままProduction Codeへコピーしてはいけない。

ProductionではReact Component / Tailwind / shadcn/uiの設計へ変換する。

---

# 39. Responsive Architecture

Responsive Designを必須とする。

```text
Desktop
   ↓
Tablet
   ↓
Mobile
```

特にBuilderではResponsive behaviorを明確に定義する。

Desktop:

```text
Field Palette
Form Canvas
Field Settings
```

Mobile:

```text
Form Canvas
+
Drawer / Sheet
```

BreakpointはUI Guidelineに従う。

---

# 40. Animation Architecture

AnimationはUI体験を補助する目的で使用する。

過度なAnimationを使用しない。

禁止:

- 操作を妨げるAnimation
- 長時間のPage Loading Animation
- 意味のない装飾Animation
- Builder操作を遅くするAnimation

`prefers-reduced-motion`を尊重する。

Animation Libraryを導入する場合は既存Dependencyで代替できないか確認する。

---

# 41. Performance Architecture

Performanceを重要な設計要件とする。

優先事項:

1. Fast Initial Load
2. Minimal Client JavaScript
3. Fast Route Navigation
4. Efficient Builder Rendering
5. Efficient Form Schema Updates
6. Efficient LocalStorage Access
7. Lazy Loading where useful

---

# 42. Initial Load Strategy

FormlyはログインやServer Data Fetchingを必要としない。

そのため、初回アクセスは可能な限り単純にする。

```text
Browser
   ↓
Cloudflare Edge
   ↓
React Application
   ↓
Landing
```

初回アクセス時に不要なAPI / Database / Authentication Requestを発生させない。

---

# 43. Builder Performance

BuilderはFormlyで最もInteractiveな画面である。

以下を考慮する。

- 不要なRe-renderを避ける
- Selected Fieldのみ必要なUIを更新する
- Form Schema更新を適切に行う
- Preview更新を効率化する
- LocalStorageへのWriteを制御する
- Field数増加時のPerformanceを確認する

---

# 44. Code Generation Performance

Code GenerationはForm SchemaからDeterministicに生成する。

```text
Form Schema
   ↓
Generator
   ↓
Generated Code
```

不要な再生成を避ける。

GeneratorをUI Rendering Logicと混在させない。

---

# 45. LocalStorage Performance

LocalStorageへのWriteを頻繁に行いすぎない。

例えばFieldを1文字入力するたびに複雑なSerializationを実行する必要がある場合は、適切なDebounce / Batchingを検討する。

ただし、不要なOptimizationを先行して実装しない。

---

# 46. Caching Strategy

FormlyはServer Dataを基本的に持たないため、Server-side Data Cacheを必要としない。

Browser Cache:

- Static Assets
- JavaScript
- CSS
- Images

などをCloudflare / BrowserのCachingに任せる。

Local Form DataはLocalStorageを利用する。

---

# 47. Error Handling Architecture

Errorは責務に応じて適切なLayerで処理する。

```text
UI
 ↓
Feature
 ↓
Domain / Form Schema
 ↓
Persistence / Generator
```

例えば:

```text
Invalid JSON
```

はImport Layerで処理する。

```text
Invalid Form Schema
```

はSchema Validation Layerで処理する。

```text
Generator Error
```

はGenerator Layerで処理する。

ユーザーへ内部実装情報を公開しない。

---

# 48. Error Boundary

ReactのError Boundaryを使用する。

Application全体をクラッシュさせず、可能な限りFeature単位でErrorを隔離する。

特にBuilderでは、PreviewやSettingsのErrorによってForm Editing全体を失わない設計を目指す。

---

# 49. Loading Architecture

FormlyはServer-side Data Fetchingが少ないため、Loading Stateを必要以上に表示しない。

Loadingが必要な場合:

- Skeleton
- Spinner
- Progress Indicator

を使用する。

非常に高速な処理に無意味なLoading UIを表示しない。

---

# 50. Empty State

データが存在しない場合はEmpty Stateを表示する。

例:

```text
No form yet.

Start building your first form.

[Create Form]
```

Empty Stateでは、ユーザーが次に何をすればよいか分かるCTAを提供する。

---

# 51. Testing Architecture

テストコードはプロジェクト直下に配置する。

```text
tests/
├── unit/
├── integration/
└── e2e/
```

---

# 52. Unit Test

対象:

- Form Schema
- Schema Validation
- Serialization
- Normalization
- Generator
- Persistence
- Utility
- Business Logic

特にGeneratorは入力と出力が明確なため、Unit Testを充実させる。

---

# 53. Integration Test

対象:

- Builder + Form Schema
- Builder + Persistence
- Preview + Form Schema
- Generator + Form Schema
- Import + Validation
- Export + Serialization

---

# 54. E2E Test

主要User Flowをテストする。

最低限:

```text
Landing
   ↓
Builder
   ↓
Add Field
   ↓
Configure Field
   ↓
Preview
   ↓
Code
   ↓
Copy / Export
```

LocalStorageによるPersistenceも確認する。

---

# 55. Test Rule

新しいFeatureを追加する場合、テストも同時に追加する。

テストなしでFeatureを完成扱いにしてはいけない。

特に以下はテストを必須とする。

- Form Schema
- Generator
- Import
- Export
- LocalStorage
- Core Builder Interaction

---

# 56. Security Architecture

Formlyでは以下を基本的なSecurity Requirementとする。

- Input Validation
- XSS Protection
- Safe HTML Generation
- Safe JavaScript Generation
- Untrusted LocalStorage Data Handling
- Untrusted Import Data Handling
- Secure Clipboard Handling
- Safe Preview Rendering

Authentication / Authorization / SQL Injection / CSRFは現在のCore Productでは対象外とする。

ただし、将来Server Featureを導入した場合は再設計する。

---

# 57. Untrusted Data

以下はすべてUntrusted Dataとして扱う。

```text
Imported JSON
LocalStorage Data
Form Name
Form Label
Placeholder
Description
Options
Validation Configuration
```

Application内部で生成されたDataであっても、Persistenceから復元したDataはValidationする。

---

# 58. XSS Protection

特に以下を安全に扱う。

```text
Form Name
Label
Placeholder
Description
Options
```

User-provided HTMLをそのままDOMへInjectしない。

`dangerouslySetInnerHTML`は原則として使用しない。

使用が必要な場合はSecurity Reviewを行う。

---

# 59. Generated Code Security

Generated HTML / CSS / JavaScriptはユーザーが外部Webサイトへ持ち出すCodeである。

そのため、Generatorでは以下を考慮する。

- HTML Escaping
- Attribute Escaping
- JavaScript String Escaping
- CSS Value Escaping
- User-generated content validation

Generated CodeへFormly内部のSecretやEnvironment Variableを含めない。

---

# 60. Preview Security

PreviewではGenerated JavaScriptを無条件に実行しない。

基本:

```text
Form Schema
   ↓
Form Renderer
   ↓
Preview
```

Generated Codeを実行するArchitectureとはしない。

これによりPreviewを安全に保つ。

---

# 61. Import Security

Import Flow:

```text
File
 ↓
Parse
 ↓
Schema Validation
 ↓
Normalize
 ↓
Form Schema
```

Validationを通過していないDataをBuilderへ渡さない。

過度に大きなFileやMalformed JSONについても適切にError処理する。

---

# 62. Secrets

現在のFormlyはAuthentication / Database / External APIをCore Productに使用しないため、秘密情報は最小限である。

それでも以下をGitへCommitしてはいけない。

```text
API Key
Secret
Password
Token
Cloudflare Credential
Private Key
```

`.env.local`などのSecret FileはGit管理対象外とする。

---

# 63. Environment

基本的な環境:

```text
Development
Production
```

必要になった場合のみStagingを追加する。

---

# 64. Environment Variables

Clientへ公開してよい値とSecretを明確に分離する。

Public:

```text
VITE_*
```

など、ViteのApplicationで公開可能な値のみClientへExposeする。

SecretをClient-side Environment Variableへ配置しない。

Cloudflare CredentialsなどはDeployment Environmentで管理する。

---

# 65. Observability

現在は最小限とする。

将来的に以下を導入する可能性がある。

- Error Tracking
- Application Logging
- Performance Monitoring
- Analytics

ただし、Portfolio Applicationとして過剰なObservability基盤を早期導入しない。

---

# 66. Deployment Architecture

基本Flow:

```text
Developer
    │
    ▼
GitHub
    │
    ▼
CI
    │
    ├── Lint
    ├── Type Check
    ├── Unit Test
    ├── Integration Test
    └── Build
    │
    ▼
Cloudflare Workers
    │
    ▼
Production
```

---

# 67. Runtime

| Environment | Runtime            | Persistence          |
| ----------- | ------------------ | -------------------- |
| Development | Vite Dev Server    | Browser LocalStorage |
| Production  | Cloudflare Workers | Browser LocalStorage |

Server-side Databaseは使用しない。

---

# 68. Cloudflare Architecture

Cloudflare WorkersはApplication Hosting / Runtimeとして使用する。

```text
GitHub
   ↓
Build
   ↓
Cloudflare Workers
   ↓
Edge
   ↓
Browser
```

Cloudflare D1 / KV / R2などをCore Productのために導入しない。

必要性が明確になった場合のみ検討する。

---

# 69. CI/CD

GitHub Actionsを利用する。

基本CI:

```text
Lint
 ↓
Type Check
 ↓
Unit Test
 ↓
Integration Test
 ↓
Build
 ↓
E2E
```

すべて成功することをMerge / Deployの品質基準とする。

---

# 70. Deployment Rule

Production DeploymentはCI成功後に実行する。

候補:

```text
master/main
   ↓
CI
   ↓
Deploy
```

または手動Deploymentを利用する。

具体的なGitHub Actions構成は `workflow.mdc` と実際のRepository構成に従う。

---

# 71. Git Strategy

基本Branch:

```text
master
```

Feature開発:

```text
feature/*
```

例:

```text
feature/form-builder
feature/form-preview
feature/code-generator
feature/i18n
feature/local-storage
```

---

# 72. Commit Convention

Conventional Commitsを使用する。

例:

```text
feat: add form builder
fix: fix field configuration
refactor: extract form schema logic
test: add generator tests
docs: update architecture design
style: improve builder layout
```

Commit Messageは変更内容を明確にする。

---

# 73. Dependency Policy

依存Packageを追加する前に、既存Packageで代替できないか確認する。

新しいLibraryを導入する場合は以下を確認する。

- Bundle Size
- Maintenance Status
- License
- Security
- React Compatibility
- React Router Compatibility
- Vite Compatibility
- Cloudflare Compatibility

「便利そう」という理由だけでDependencyを増やさない。

---

# 74. Current Technology Status

現在のFormlyで使用する主要Technology:

```text
React
React Router v8
TypeScript
Vite
Tailwind CSS
shadcn/ui
Lucide React
ESLint
Prettier
Vitest
Testing Library
Playwright
Cloudflare Workers
```

FormlyではTask Managerで使用していた以下のTechnologyをCore Productへ持ち込まない。

```text
Next.js
D1
Drizzle ORM
Auth.js
Server Actions
TanStack Query
```

これは技術的な制約ではなく、FormlyのBrowser-first Architectureに基づく意図的な設計判断である。

---

# 75. React Router Architecture

React Router v8はFormlyにおける重要なTechnologyとして扱う。

単なるNavigation Libraryとしてではなく、以下に利用する。

- Route Definition
- Nested Route where necessary
- Route-level Layout
- Navigation State
- Route-based Error Handling
- Route-based Data Boundary where appropriate

ただし、FormlyのCore DataはLocalStorage / Form Schemaであるため、Server Data Fetchingを目的としたRouting Architectureは必要としない。

---

# 76. React Router Route Structure

概念:

```text
routes/
├── home
├── builder
├── preview
├── code
└── settings
```

実際のReact Router Configurationは実装時のRouter構成に合わせる。

Route ComponentとFeature Componentを分離する。

---

# 77. Route Boundary

RouteはApplicationのNavigation Boundaryとして扱う。

```text
Route
 ↓
Page / Screen
 ↓
Feature
 ↓
Domain
```

Route Componentに以下を大量に実装してはいけない。

- Form Schema Logic
- Generator Logic
- Persistence Logic
- Complex Validation Logic

これらは適切なLayerへ分離する。

---

# 78. Builder Feature Architecture

Builder Feature:

```text
features/builder/
├── components/
│   ├── field-palette/
│   ├── form-canvas/
│   ├── field-settings/
│   └── builder-preview/
├── hooks/
├── services/
├── types/
└── utils/
```

実装時には必要なDirectoryだけ作成する。

---

# 79. Preview Feature Architecture

```text
features/preview/
├── components/
│   ├── preview-toolbar/
│   ├── preview-canvas/
│   └── form-renderer/
├── hooks/
└── utils/
```

Preview FeatureはForm Schemaを読み取る。

PreviewからForm Schemaを直接変更しない。

---

# 80. Code Feature Architecture

```text
features/code/
├── components/
│   ├── code-tabs/
│   ├── code-viewer/
│   └── code-toolbar/
├── hooks/
└── utils/
```

GeneratorはFeature UIから独立する。

---

# 81. Settings Feature Architecture

```text
features/settings/
├── components/
├── hooks/
└── utils/
```

SettingsはApplication Configurationを管理する。

Form Schemaの編集LogicをSettingsへ持ち込まない。

---

# 82. Generator Architecture

GeneratorはApplication UIから独立したDomain Logicとして扱う。

```text
generators/
├── html/
│   ├── generate-html.ts
│   └── ...
├── css/
│   ├── generate-css.ts
│   └── ...
└── javascript/
    ├── generate-javascript.ts
    └── ...
```

Generatorは可能な限りPure Functionとして実装する。

---

# 83. Generator Contract

Generatorは以下のようなContractを基本とする。

```text
FormSchema
    ↓
Generator
    ↓
GeneratedCode
```

概念:

```ts
type GeneratedCode = {
  html: string;
  css: string;
  javascript: string;
};
```

実際のType Definitionは実装時に決定する。

---

# 84. Generator Determinism

同じForm Schemaからは原則として同じCodeを生成する。

```text
Schema A
   ↓
Generator
   ↓
Code A

Schema A
   ↓
Generator
   ↓
Code A
```

不要なRandomnessをGeneratorへ持ち込まない。

---

# 85. Persistence Boundary

Persistenceは以下の責務のみを担当する。

- Save
- Load
- Delete
- Clear

Persistence LayerはBuilder UIを知らない。

```text
Builder
   ↓
Persistence
   ↓
LocalStorage
```

Persistence LayerへUI Componentを依存させない。

---

# 86. Schema Validation Boundary

Schema ValidationはForm SchemaのBoundaryとして扱う。

```text
Unknown Data
     ↓
Validation
     ↓
FormSchema
```

Validation後のDataのみDomain Logicへ渡す。

---

# 87. Serialization Boundary

Form SchemaとJSONの変換を明確に分離する。

```text
Form Schema
    ↓
Serializer
    ↓
JSON
```

逆:

```text
JSON
 ↓
Parser
 ↓
Validator
 ↓
Normalizer
 ↓
Form Schema
```

---

# 88. Normalization

Import / LocalStorageから取得したSchemaは必要に応じてNormalizationする。

例:

- Missing optional property
- Legacy Schema
- Invalid default value
- Field order

などを正規化する。

Normalization後のDataをApplicationのCanonical Form Schemaとして扱う。

---

# 89. Schema Versioning

Form SchemaにはVersionを持たせる。

例:

```text
version: 1
```

将来的にSchemaが変更された場合:

```text
Old Schema
   ↓
Migration
   ↓
Current Schema
```

へ変換できる構造を目指す。

MVPでは複雑なMigration Systemを先行実装しない。

---

# 90. Accessibility Architecture

AccessibilityをApplication Architectureの一部として扱う。

## Application

- Keyboard Navigation
- Focus Management
- Semantic HTML
- Accessible Labels
- Visible Focus
- Color Contrast

## Builder

- Keyboard Field Selection
- Keyboard Reordering
- Accessible Field Settings

## Generated Form

- Label Association
- Keyboard Interaction
- Validation Feedback
- Focus Management

---

# 91. Internationalization Architecture

Formlyは以下のLanguageをサポートする。

```text
ja
en
zh
ko
```

Translation LayerをApplication UIから分離する。

```text
Component
   ↓
Translation Key
   ↓
i18n
   ↓
Localized Text
```

User-created Form contentは翻訳対象外とする。

---

# 92. Theme Architecture

ThemeはApplication-level Settingとする。

基本:

```text
Light
Dark
System
```

Theme TokenはUI Guidelineで定義する。

Componentごとに独自Themeを作成しない。

---

# 93. Error State Architecture

Error Stateはユーザーが理解できるMessageを表示する。

Internal Error:

```text
InvalidSchemaError
StorageError
GeneratorError
ImportError
ExportError
ClipboardError
```

UI:

```text
Something went wrong.

Please try again.
```

Internal Stack TraceやImplementation Detailをユーザーへ表示しない。

---

# 94. Error Recovery

可能な場合はRecovery Actionを提供する。

例:

```text
Invalid Schema

[Reset Form]
[Back to Builder]
```

Storage Error:

```text
Unable to save your form.

[Retry]
```

Generator Error:

```text
Unable to generate code.

[Back to Builder]
```

---

# 95. Feature Isolation

可能な限りFeature単位でErrorを隔離する。

例えばPreviewでErrorが発生しても、

```text
Builder
```

まで破壊しない。

BuilderのForm Schemaが失われないことを優先する。

---

# 96. Empty State Architecture

Empty Stateには次のActionを用意する。

Builder:

```text
No fields yet.

[Add Field]
```

Preview:

```text
No form to preview.

[Go to Builder]
```

Code:

```text
No code generated.

[Go to Builder]
```

---

# 97. Loading State Architecture

Loading Stateは必要な場合のみ使用する。

対象:

- Application initialization
- LocalStorage restore
- Large Code Generation
- Lazy-loaded Feature

基本的には高速なLocal OperationにSpinnerを表示しない。

---

# 98. Clipboard Architecture

Code Copyは専用Utility / Hookへ分離する。

```text
CodeViewer
   ↓
useClipboard()
   ↓
Clipboard API
```

成功:

```text
Copied to clipboard.
```

失敗:

```text
Failed to copy.
```

Clipboard APIが利用できない場合でもManual Copyを可能にする。

---

# 99. Export Architecture

Code ExportはUIとSerialization / File Generation Logicを分離する。

```text
Code UI
   ↓
Export Logic
   ↓
Blob / File
   ↓
Browser Download
```

Export対象:

```text
HTML
CSS
JavaScript
```

Combined Exportは必要に応じて実装する。

---

# 100. Browser Compatibility

FormlyはModern Browserを対象とする。

特に以下を確認する。

- LocalStorage
- Clipboard API
- File API
- Download API
- CSS Responsive Features

Browser APIが利用できない場合はGraceful Degradationする。

---

# 101. Offline / Network Dependency

Core Builder操作は可能な限りNetwork Dependencyを持たない。

```text
Builder
   ↓
Form Schema
   ↓
LocalStorage
```

Networkが一時的に利用できない場合でも、既にLoadedされたApplicationのBuilder操作は可能な限り継続できる設計とする。

---

# 102. Data Loss Prevention

FormlyではForm DataのLossを防ぐ。

基本:

```text
Form Edit
   ↓
Form Schema
   ↓
LocalStorage
```

Unsaved Changeが発生する場合は、必要に応じてWarningを表示する。

ただし、Auto SaveによってLoss Riskが十分低い場合は不要なConfirmationを表示しない。

---

# 103. Architecture Decision: No Database

Databaseを使用しない理由:

1. FormlyのCore ProductにServer Persistenceが不要
2. Login不要
3. Cloud Storage不要
4. Browserだけで利用できる
5. Architectureを軽量にできる
6. 運用コストを削減できる

そのため、MVPではD1を導入しない。

---

# 104. Architecture Decision: No Authentication

Authenticationを使用しない理由:

1. FormlyはAnonymous Toolとして利用できる
2. Account作成がUX上の障壁になる
3. Form DataをLocalStorageへ保存できる
4. Core Product LoopにAuthenticationが不要

将来Cloud Storageを導入する場合はAuthenticationを再検討する。

---

# 105. Architecture Decision: LocalStorage

LocalStorageを採用する理由:

- Browserだけで利用できる
- Backend不要
- Login不要
- 実装がシンプル
- Portfolio Applicationとして十分な実用性
- Offline-orientedなUXを実現しやすい

ただし、LocalStorageはSecure Storageではない。

---

# 106. Architecture Decision: Form Schema

Form SchemaをCanonical Sourceとする理由:

- BuilderとPreviewのDataを統一できる
- GeneratorをUIから分離できる
- LocalStorageへ保存しやすい
- Import / Exportしやすい
- 将来Cloud Storageへ移行しやすい
- Testしやすい
- Migrationを設計しやすい

Formlyでは最重要Architecture Decisionの一つとする。

---

# 107. Architecture Decision: React Router v8

React Router v8を採用する理由:

- 明確なRoute Architectureを構築できる
- ScreenとFeatureを分離できる
- Navigationを実践的に扱える
- PortfolioでReact Routerの技術力を示せる
- Route-based Architectureを学習・実践できる

FormlyではReact Routerを単なる`Link`用途だけにしない。

---

# 108. Architecture Decision: Cloudflare Workers

Cloudflare Workersを採用する理由:

- Edge Deployment
- Global Distribution
- Serverless Runtime
- PortfolioとしてのCloudflare Experience
- 低コストなHosting
- Cloudflare EcosystemとのIntegration

ただし、FormlyではWorkersへ不要なServer Logicを追加しない。

---

# 109. Architecture Decision: Feature First

Feature Firstを採用する理由:

- Featureの責務が明確
- Componentの再利用性が高い
- Builderのような複雑Featureを整理しやすい
- 将来Featureを追加しやすい
- Testingしやすい

---

# 110. Architecture Decision: No Overengineering

FormlyはPortfolio Projectであるが、Architecture Showcaseのために複雑化してはいけない。

例えば、

```text
Repository
Service
Controller
UseCase
Factory
Adapter
Provider
```

をすべて最初から作成することは禁止する。

必要な責務が発生したときに導入する。

---

# 111. Dependency Management

Dependency追加前に以下を確認する。

1. Existing dependencyで解決できないか
2. Native Browser APIで解決できないか
3. React / Vite / React RouterとのCompatibility
4. Cloudflare Compatibility
5. Bundle Size
6. Maintenance Status
7. Security
8. License

不要なDependencyを追加しない。

---

# 112. File Size Policy

1ファイルが過度に大きくなった場合は責務を分割する。

目安:

```text
300 lines以下を優先
```

ただし、単純に行数だけを理由として分割しない。

責務の明確化を優先する。

---

# 113. Type Safety

TypeScriptを使用する。

以下を禁止する。

```text
any
```

可能な限りDomain Modelを明確なTypeとして定義する。

特にForm Schemaは厳格なType Safetyを維持する。

---

# 114. Code Quality

以下を必須とする。

- ESLint
- Prettier
- TypeScript
- Tests

新しいFeatureにはTestsを追加する。

---

# 115. Documentation Architecture

Architectureに関する重要なDecisionはDocumentationへ反映する。

主要Documents:

```text
docs/
├── product.md
├── roadmap.md
├── screen-list.md
├── 01_requirements.md
├── 02_basic-design.md
├── 03_detail_design.md
├── 04_architecture.md
├── 05_database.md
├── 06_api.md
├── 07_component_design.md
├── 08_ui-guideline.md
└── development-log.md
```

---

# 116. Cursor Rules

Architecture実装時には以下のCursor Rulesを参照する。

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

Architecture DocumentとCursor Rulesに矛盾が発生した場合は、Implementation前に関連Documentationを更新する。

---

# 117. Testing Boundaries

TestingはArchitecture Boundaryに沿って行う。

```text
Form Schema
    ↓
Unit Test

Feature
    ↓
Integration Test

Application
    ↓
E2E Test
```

---

# 118. Unit Test Boundary

Unit Testでは外部依存を最小化する。

対象:

```text
Form Schema
Validation
Serialization
Normalization
Generator
Persistence Utility
```

Generatorは特にPure FunctionとしてTestしやすくする。

---

# 119. Integration Test Boundary

Integration Test:

```text
Builder
   ↓
Form Schema
   ↓
Persistence
```

または:

```text
Form Schema
   ↓
Generator
   ↓
Code Viewer
```

などFeature間のIntegrationを確認する。

---

# 120. E2E Boundary

E2EではImplementation DetailではなくUser JourneyをTestする。

例:

```text
User
 ↓
Landing
 ↓
Builder
 ↓
Create Form
 ↓
Preview
 ↓
Code
 ↓
Copy
```

---

# 121. CI Quality Gate

CIでは最低限以下を確認する。

```text
Lint
 ↓
Type Check
 ↓
Unit Test
 ↓
Integration Test
 ↓
Build
 ↓
E2E
```

失敗した状態でProduction Deployしない。

---

# 122. Production Build

Production Buildでは以下を確認する。

- TypeScript
- ESLint
- Tests
- Vite Build
- Cloudflare Workers Compatibility

Development Serverで動作するだけでは完成扱いにしない。

---

# 123. Deployment Environment

Production EnvironmentではSecretをGitへCommitしない。

Cloudflare側のEnvironment / Secret Managementを使用する。

FormlyのCore ProductではSecret自体を極力必要としない構成を維持する。

---

# 124. Runtime Error Handling

Production Runtime Errorが発生した場合:

1. Error Boundaryで捕捉
2. User-friendly Messageを表示
3. Recovery Actionを提供
4. Internal Detailを隠す

可能な場合はError Trackingを導入する。

---

# 125. Future Cloud Architecture

将来的にCloud Storageを導入する場合:

```text
Current

Browser
   ↓
LocalStorage
```

から、

```text
Future

Browser
   ↓
Persistence Interface
   ↓
Cloud Storage
```

へ拡張する。

Application UIが直接Storage Implementationへ依存しないことが重要。

---

# 126. Future Authentication Architecture

将来Authenticationを導入する場合:

```text
Browser
   ↓
Authentication
   ↓
Session
   ↓
User
   ↓
Form Ownership
```

へ拡張する。

現在はこのArchitectureを実装しない。

---

# 127. Future Form Hosting Architecture

将来的にForm Hostingを提供する場合:

```text
Form Schema
    ↓
Published Form
    ↓
Hosted URL
    ↓
Public User
```

Submission Architecture:

```text
Public Form
    ↓
Submission API
    ↓
Storage
```

となる可能性がある。

この段階ではSecurity / Rate Limiting / Validation / Authenticationなどを再設計する。

---

# 128. Future Submission Architecture

将来Submission Managementを追加する場合:

```text
Form
 ↓
Submission
 ↓
API
 ↓
Database
 ↓
Dashboard
```

となる。

現在のLocalStorage-only Architectureとは別のServer Architectureが必要になる。

---

# 129. Future Collaboration Architecture

将来的にCollaborationを追加する場合:

```text
User
 ↓
Workspace
 ↓
Form
 ↓
Member / Permission
```

というDomain Modelが必要になる。

現在は実装しない。

---

# 130. Architecture Constraints

以下をArchitecture Constraintとする。

## Must

- Form SchemaをCanonical Sourceとする
- React Router v8を使用する
- TypeScriptを使用する
- LocalStorageを現在のPersistenceとして使用する
- Cloudflare WorkersへDeploy可能にする
- Testsを実装する
- Responsive対応する
- Accessibilityを考慮する
- i18nを考慮する

## Must Not

- Core ProductのためだけにDatabaseを導入しない
- Core ProductのためだけにAuthenticationを導入しない
- UIから直接LocalStorageを操作しない
- Generated JavaScriptをPreviewで無条件に実行しない
- Form Dataを複数箇所で重複管理しない
- 不要なGlobal Stateを作らない
- 不要なDependencyを追加しない
- Architectureを過剰に抽象化しない

---

# 131. Architecture Decision Process

新しいArchitecture Decisionが必要になった場合、以下を確認する。

```text
1. Product Requirementに必要か？
        ↓
2. Existing Architectureで解決できないか？
        ↓
3. Complexityに見合うValueがあるか？
        ↓
4. Testing可能か？
        ↓
5. Securityへの影響は？
        ↓
6. Performanceへの影響は？
        ↓
7. Documentationを更新したか？
```

---

# 132. Architecture Change Rule

Architectureを変更する場合は、Implementationより先にDocumentationを更新する。

基本Flow:

```text
Requirement
   ↓
Architecture Decision
   ↓
Documentation Update
   ↓
Implementation
   ↓
Test
```

既存Architectureと矛盾するFeatureを、Documentationを更新せずに実装してはいけない。

---

# 133. Current Architecture Summary

現在のFormlyは以下のArchitectureを採用する。

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
      Builder           Preview            Code
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ▼
                     Form Schema
                     /         \
                    /           \
                   ▼             ▼
             LocalStorage     Generator
                                  │
                            ┌─────┼─────┐
                            ▼     ▼     ▼
                           HTML  CSS    JS
```

Cloudflare:

```text
GitHub
   ↓
CI
   ↓
Build
   ↓
Cloudflare Workers
   ↓
Browser
```

---

# 134. Core Architecture Principle

FormlyのArchitectureにおける最重要原則は以下である。

> **Form Schema is the source of truth.**

すべてのForm-related FeatureはForm Schemaを中心に構築する。

```text
                 Form Schema
                /     │      \
               /      │       \
              ▼       ▼        ▼
          Builder  Preview  Generator
             │                 │
             ▼            HTML/CSS/JS
        LocalStorage
```

これにより、

- Builder
- Preview
- Code Generator
- LocalStorage
- Import
- Export
- Testing

を一貫したData Modelで扱うことができる。

---

# 135. Final Architecture Principle

Formlyは、

> **Build forms visually. Export clean code.**

というProduct Valueを実現するために、可能な限りシンプルなArchitectureを維持する。

Core Architecture:

```text
Build
  ↓
Form Schema
  ↓
Preview
  ↓
Generate
  ↓
Export
```

Infrastructure:

```text
React
   +
React Router v8
   +
Vite
   +
TypeScript
   +
Cloudflare Workers
```

Persistence:

```text
LocalStorage
```

Database:

```text
None
```

Authentication:

```text
None
```

API:

```text
None
```

このシンプルさを維持しながら、将来的にCloud Storage、Authentication、Form Hosting、Submission Management、Collaborationなどへ拡張可能なBoundaryを確保する。
````
