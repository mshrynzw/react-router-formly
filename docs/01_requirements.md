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

Formlyは、フォームの作成・編集・プレビュー・コード生成だけでなく、生成されたフォームを実際に送信できる状態までを扱う。

Formlyの役割は、

```text
フォームを作る
    ↓
フォームを設定する
    ↓
フォームを確認する
    ↓
フォーム送信を設定する
    ↓
コードを生成する
    ↓
コードを持ち出す
    ↓
Webサイトへ組み込む
```

というワークフローを提供することである。

ただし、MVPではFormly自身が送信データを保存・管理するバックエンドサービスは提供しない。

---

# 2. 開発目的

## 主目的

- 実際に利用できるForm Builderを提供する
- Web制作におけるフォーム実装の手間を削減する
- HTML / CSS / JavaScriptを生成できる実用的なツールを作る
- ブラウザだけでフォームを作成できる体験を提供する
- フォームを実際に送信できる状態まで構築できるようにする
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
- Field Management
- Field Configuration
- Form Validation
- Form Submission Configuration
- Form Submission Preview
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
Configure Validation
   ↓
Configure Submission
   ↓
Builder Preview
   ↓
Full Preview
   ↓
Generated Code
   ↓
Copy / Export
   ↓
Web Site Integration
   ↓
Form Submission
```

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

を基本とする。

Form SubmissionはGenerated Formを実際に利用するための重要な機能として扱う。

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

Formly自身がSubmission Dataを保存・管理するBackend APIはMVPでは提供しない。

---

# 6. 基本プロダクト構成

Formlyは以下の構造を基本とする。

```text
                         Form Schema
                              │
               ┌──────────────┼──────────────┐
               ↓              ↓              ↓
            Builder         Preview       Generator
               │              │              │
               │              │         ┌────┼────┐
               │              │         ↓    ↓    ↓
               │              │       HTML CSS   JS
               │              │
               ↓              ↓
          LocalStorage    Form Renderer
                              │
                              ↓
                       Submission Logic
```

Form SchemaをCanonical Sourceとする。

Builder、Preview、Code Generator、Submission Logicがそれぞれ独自のFormデータを保持することは禁止する。

Form Submissionに必要な設定もForm Schemaに含める。

---

# 7. 機能一覧

| 機能                  | 概要                                               | Priority |
| --------------------- | -------------------------------------------------- | -------- |
| Landing               | Formlyの概要とBuilderへの導線                      | P0       |
| Form Builder          | フォームを視覚的に作成・編集                       | P0       |
| Field Management      | Fieldの追加・削除・並び替え                        | P0       |
| Field Configuration   | Fieldの各種設定                                    | P0       |
| Form Schema           | FormのCanonical Data Model                         | P0       |
| Form Validation       | Client-side Validation                             | P0       |
| Form Submission       | フォーム送信設定・送信処理                         | P0       |
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
- Formlyがフォーム送信まで扱えることを理解できる
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

ユーザーがフォームを視覚的に作成・編集し、ValidationおよびSubmission設定まで行えるようにする。

## 機能

- Form作成
- Field追加
- Field削除
- Field選択
- Field設定
- Field並び替え
- Field複製
- Form設定
- Validation設定
- Submission設定
- Submit Button設定
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

1280px以上では Canvas の右隣に Builder Preview を並べる。

```text
┌──────────┬──────────────┬──────────────┬────────────┐
│ Field    │ Form Canvas  │ Builder      │ Field      │
│ Palette  │              │ Preview      │ Settings   │
└──────────┴──────────────┴──────────────┴────────────┘
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
- Submission Preview
- Submission Success State
- Submission Error State
- Builderへの移動
- Codeへの移動

## 必須要件

- Form SchemaをSourceとして使用する
- BuilderとPreviewでForm構造が一致する
- Desktop / Tablet / Mobileを確認できる
- Validation動作を確認できる
- Submit操作を確認できる
- Submission Success / Error Stateを確認できる
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
- Form Submissionを実行できる
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

# 11. Form Validation Requirements

FormlyはGenerated Formで利用するValidation設定をBuilderから構成できる。

## 基本Validation

- Required
- Min Length
- Max Length
- Min
- Max
- Pattern

Field Typeに応じて適切なValidationを提供する。

## Client-side Validation

Generated Formでは、必要に応じてJavaScriptによるClient-side Validationを生成する。

HTML標準Validation Attributeを利用できる場合は、適切に利用する。

## Validation Error

Validation Errorはユーザーが理解できる形で表示する。

例:

```text
This field is required.
Please enter a valid email address.
```

Generated FormではError MessageとFieldの関係をAccessibleにする。

---

# 12. Form Submission Requirements

Formlyは、作成したフォームを実際に送信できるフォームとしてExportできなければならない。

## Submission Configuration

Form Builderから以下を設定できる。

- Form Action
- HTTP Method
- Submit Button Label

## HTTP Method

初期実装では以下を対象とする。

```text
GET
POST
```

Default:

```text
POST
```

とする。

詳細な仕様は`03_detail_design.md`で定義する。

## Form Action

Form ActionはGenerated Formの送信先として利用する。

例:

```html
<form action="https://example.com/contact" method="POST"></form>
```

Form Actionが未設定の場合は、Preview上で実際の外部送信を実行せず、設定不足をユーザーへ通知する。

## Submit Button

Submit ButtonをFormへ配置できる。

設定:

- Label
- Disabled State where necessary

Default Label:

```text
Submit
```

とする。

## Submission Processing

Generated Formでは、設定されたActionおよびMethodに従ってSubmitできる。

JavaScriptによるSubmission処理が必要な場合は、Generated JavaScriptへ反映する。

## Submission Success State

Submissionが成功した場合、ユーザーが成功を認識できるUIを提供する。

例:

```text
Your form has been submitted successfully.
```

## Submission Error State

Submissionが失敗した場合、ユーザーが再試行できるUIを提供する。

例:

```text
We couldn't submit the form.
Please try again.
```

## Preview Submission

PreviewではSubmit操作を確認できる。

ただし、Previewから意図しない外部Endpointへ実際のSubmissionを発生させないよう、安全に扱う。

Previewでは必要に応じてMock Submissionを使用する。

## Formlyの責務

Formlyが担当する:

- フォームの送信項目の定義
- RequiredなどのValidation設定
- Submit Buttonの設定
- 送信先に関する設定
- 送信方法に関する設定
- Generated Codeへの送信処理の反映
- Previewにおける送信動作の確認
- Submission Success State
- Submission Error State

## Formlyが担当しない

MVPでは以下を提供しない。

- Formly側での送信データ保存
- Formly側でのSubmission管理画面
- ユーザーアカウント
- サーバー側Database
- Formly Hosted Submission Endpoint
- メール配信基盤
- CRM Integration

---

# 13. Form Schema Requirements

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
- Submission Configuration
- Presentation-related Configuration

概念例:

```ts
type FormSubmission = {
  action: string;
  method: "GET" | "POST";
};
```

Form Schema:

```text
FormSchema
├── version
├── metadata
│   ├── id
│   └── name
├── fields
│   ├── id
│   ├── type
│   ├── label
│   ├── placeholder
│   ├── required
│   ├── options
│   └── validation
├── submission
│   ├── action
│   └── method
└── presentation
```

Submission設定はBuilderから編集でき、PreviewおよびCode Generatorで利用する。

Form Schemaの詳細仕様は:

```text
docs/02_basic-design.md
docs/03_detail_design.md
```

で定義する。

---

# 14. Preview Requirements

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
- Submission behavior
- Submission Success State
- Submission Error State

Previewでは、Form Actionが未設定の場合や外部Submissionを実行できない場合に、その状態を明確に表示する。

---

# 15. Code Generation Requirements

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
- `action`
- `method`

Form Validationに対応する適切なHTML Attributeも生成する。

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
- Validation Error State
- Submission State
- User-configured appearance tokens

ユーザーはフォーム全体の文字色・背景色・角丸・フォント・余白・影を Builder で設定できる。

生成コードのスタイル出力は次のいずれかである。

- 生の CSS（デフォルト）
- Tailwind CSS（HTML utility classes）

任意の生 CSS 文字列は受け付けない。色は `#RRGGBB` と透明度 0–100%、フォントは許可リスト、数値は範囲制限する。枠線の初期透明度は 10%、その他の色は 100% とする。

## JavaScript

JavaScript GeneratorはFrontend behaviorを生成する。

必要に応じて:

- Client-side validation
- Interaction
- Form behavior
- Submission handling
- Submission Error Handling
- Submission Success Handling

などを生成する。

Generated JavaScriptはFormly本体に依存しない。

## Submission Code Generation

Form Submission設定はGenerated Codeへ反映する。

基本:

```text
Form Schema
    ↓
Submission Configuration
    ↓
HTML Generator
    ↓
<form action="..." method="...">
```

必要な場合:

```text
Form Schema
    ↓
Submission Configuration
    ↓
JavaScript Generator
    ↓
Submission Handling
```

---

# 16. Code Export Requirements

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

# 17. LocalStorage Requirements

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

# 18. Form Schema Import / Export Requirements

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

# 19. Internationalization Requirements

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
- Success States
- Settings
- Landing Page
- Builder UI
- Preview UI
- Code UI
- Submission UI

## 非対象

ユーザーがForm Builderで入力した任意のLabelやPlaceholderなどを自動翻訳することは、現在の要件には含めない。

User-generated Form Contentはユーザーが指定した言語・内容を維持する。

---

# 20. Responsive Requirements

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

# 21. Accessibility Requirements

Formly ApplicationはAccessibilityを考慮する。

## Application

- Keyboard Navigation
- Focus Management
- Accessible Labels
- Semantic HTML
- Accessible Buttons
- Error Messages
- Success Messages
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
- Success Communication
- Focus Management where applicable

## Submission Accessibility

Submission状態はColorだけで表現しない。

Success / Errorの状態をTextまたはAccessible Statusとして伝える。

---

# 22. State Requirements

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
Submission Configuration Error
Empty
Error
```

## Preview

```text
Loading
Loaded
Empty
Invalid Schema
Validation Error
Submitting
Submission Success
Submission Error
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

# 23. Error Handling Requirements

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

Submission Errorの場合、

- エラーの説明
- Retry
- Builderへ戻る

など、状況に応じたRecovery Actionを提示する。

ApplicationがErrorになった場合でも、ユーザーのFormデータを可能な限り失わない。

---

# 24. Security Requirements

Formlyでは以下をUntrusted Dataとして扱う。

- User-provided Form Schema
- LocalStorage Data
- Imported JSON
- User-defined Field Labels
- User-defined Placeholder
- Form Action
- Generated HTML
- Generated CSS
- Generated JavaScript

## 必須要件

- Imported SchemaをValidationする
- LocalStorage DataをValidationする
- Form Actionを安全に扱う
- HTMLを安全に扱う
- PreviewでGenerated JavaScriptを無制限に実行しない
- XSSを防止する
- Code Generation時に適切なEscapingを行う
- Clipboard APIのErrorを処理する
- Submission Endpointを安全に扱う

詳細なSecurity Ruleは:

```text
.cursor/rules/security.mdc
```

に従う。

---

# 25. Performance Requirements

Formlyは軽量で高速な操作感を目標とする。

特に以下を考慮する。

- Initial Load
- Route Navigation
- Builder Rendering
- Field Editing
- Field Reordering
- Preview Rendering
- Code Generation
- Submission Preview
- LocalStorage Access

Field数が増加した場合でも、通常のForm Builder操作が著しく遅くならないことを目標とする。

詳細は:

```text
.cursor/rules/performance.mdc
```

に従う。

---

# 26. Testing Requirements

新規機能にはテストを追加する。

## Unit Test

対象:

- Form Schema
- Schema Validation
- Field Logic
- Validation Logic
- Submission Configuration
- Generator
- LocalStorage
- Utility Functions

## Integration Test

対象:

- Builder + Form Schema
- Builder + LocalStorage
- Builder + Submission Configuration
- Preview + Form Schema
- Preview + Validation
- Preview + Submission
- Generator + Form Schema
- Generator + Submission Configuration

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
Configure Validation
   ↓
Configure Submission
   ↓
Preview
   ↓
Submit
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

# 27. Code Quality Requirements

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
- ComponentへのDomain Logicの過剰な混在

---

# 28. React Router Requirements

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

# 29. UI Requirements

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

Submission UIではSubmitting / Success / Errorを適切に表現する。

---

# 30. Portfolio Requirements

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
- Form Submission architecture

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

# 31. 非機能要件

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
- 効率的なSubmission Preview

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
- Submission Errorを処理する

---

# 32. デザインコンセプト

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

# 33. 対象外機能

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

MVPではFormly自身がSubmission Platformになる機能を対象外とする。

- Hosted Form Submission
- Formly Hosted Submission Endpoint
- Submission Data Storage
- Submission Dashboard
- Submission History
- Email Notification
- CRM Integration

ただし、**生成されたフォームが外部の送信先へ実際にSubmitできることはMVPの要件に含める。**

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

# 34. Future Features

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
- Hosted Submission Endpoint
- Submission Management
- Submission History
- Email Notification
- Webhook

## Collaboration

- Team Accounts
- Shared Forms
- Permissions
- Collaboration

Future機能は、Core Product Loopを損なわない範囲で検討する。

---

# 35. 成果物

本プロジェクトでは以下を成果物とする。

## Application

- Production-ready Web Application
- Cloudflare Workers deployment
- Responsive UI
- Accessible UI
- Multi-language UI

## Core Features

- Form Builder
- Form Validation
- Form Submission Configuration
- Form Preview
- Submission Preview
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
- Submission Architecture
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
- Component Design
- UI Guideline
- Development Log
- README

Database / APIの設計ドキュメントは、現在のFormlyではサーバー側Database / APIを使用しないため、必要最小限とする。

---

# 36. Requirements Traceability

主要な要件と関連ドキュメントの関係を以下とする。

| Requirement         | Related Document              |
| ------------------- | ----------------------------- |
| Product Definition  | `docs/product.md`             |
| Development Roadmap | `docs/roadmap.md`             |
| Screen Requirements | `docs/screen-list.md`         |
| Basic Design        | `docs/02_basic-design.md`     |
| Detailed Design     | `docs/03_detail_design.md`    |
| Architecture        | `docs/04_architecture.md`     |
| Component Design    | `docs/05_component_design.md` |
| UI Guideline        | `docs/06_ui-guideline.md`     |
| Development History | `docs/development-log.md`     |

Form Submissionの詳細仕様は、主に以下のDocumentで扱う。

```text
docs/01_requirements.md
docs/02_basic-design.md
docs/03_detail_design.md
docs/04_architecture.md
docs/05_component_design.md
docs/06_ui-guideline.md
```

---

# 37. Requirements and Cursor Rules

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

# 38. Implementation Priority

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
- Form Validation
- Form Submission Configuration
- Submit Button
- Builder Preview
- Full Preview
- Submission Preview
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
- Hosted Submission Endpoint
- Submission Management
- Submission History
- Email Notification
- Webhook
- Collaboration
- SaaS

---

# 39. MVP Requirements

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
Field Configuration
    ↓
Validation Configuration
    ↓
Submission Configuration
    ↓
Builder Preview
    ↓
Full Preview
    ↓
Form Submission Preview
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
    ↓
Web Site Integration
    ↓
Form Submission
```

MVPでフォーム送信に必要な設定:

```text
Form Action
HTTP Method
Submit Button
Client-side Validation
Submission Success State
Submission Error State
```

MVPでは以下を必要としない。

- Login
- Account
- Cloud Database
- Formly Server API
- Cloud Storage
- Formly Hosted Submission Endpoint
- Submission Data Storage
- Submission Management
- Submission History
- Email Notification
- Webhook
- Team Collaboration

---

# 40. Definition of Done

Featureは以下を満たした場合に完了とする。

- Requirementsを満たしている
- TypeScriptの型エラーがない
- ESLintが通過する
- Prettierが適用されている
- Unit / Integration / E2Eの必要なTestsがある
- Responsive対応されている
- Accessibilityを確認している
- Loading / Empty / Error Stateを必要に応じて実装している
- Success Stateを必要に応じて実装している
- i18nを確認している
- Security上の問題を確認している
- Performance上の問題を確認している
- 関連ドキュメントが更新されている

Form Submission Featureについては、追加で以下を確認する。

- Submit Buttonが正しく動作する
- Form ActionがGenerated Codeへ反映される
- HTTP MethodがGenerated Codeへ反映される
- Client-side Validationが動作する
- Submission Success Stateが表示される
- Submission Error Stateが表示される
- Previewで意図しない外部Submissionが発生しない
- Generated CodeがFormly本体へ依存しない

---

# 41. Product Success Criteria

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
5. Validationを設定する
       ↓
6. Submissionを設定する
       ↓
7. Fieldを並べ替える
       ↓
8. Previewする
       ↓
9. Submit動作を確認する
       ↓
10. HTML / CSS / JavaScriptを生成する
       ↓
11. Codeをコピー / Exportする
       ↓
12. 自分のWebサイトへ組み込む
       ↓
13. 実際にFormをSubmitする
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

# 42. 今後の設計ドキュメント

本要件定義書を基準として、以下の設計ドキュメントを作成・更新する。

```text
docs/product.md
docs/roadmap.md
docs/screen-list.md
docs/01_requirements.md
docs/02_basic-design.md
docs/03_detail_design.md
docs/04_architecture.md
docs/05_component_design.md
docs/06_ui-guideline.md
docs/development-log.md
```

現在のFormlyではサーバー側Database / APIを使用しない。

そのため、Database DesignやAPI Designを独立した必須Documentとして作成する必要はない。

Form Submissionについては、以下の設計Documentで詳細化する。

```text
docs/02_basic-design.md
docs/03_detail_design.md
docs/04_architecture.md
```

設計上の新しい決定が発生した場合は、関連ドキュメントを更新する。

---

# 43. Requirement Principles

FormlyのRequirementsは以下の原則に従う。

### Simple

コア機能をシンプルに保つ。

### Visual

フォーム作成を視覚的に理解できるようにする。

### Practical

生成されたコードを実際のWebサイトで利用できるようにする。

### Functional

フォームを作成するだけでなく、実際にSubmitできる状態まで扱う。

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

# 44. Final Requirement Statement

Formlyは、Webデザイナー、Web制作者、小規模事業者などが、ブラウザ上でフォームを視覚的に作成し、ValidationやSubmission設定を行ったうえで、そのフォームをHTML、CSS、JavaScriptとして自分のWebサイトへ組み込めるようにするForm Builderである。

FormlyのCore Product Loopは、

```text
Build
  ↓
Configure
  ↓
Validate
  ↓
Preview
  ↓
Generate
  ↓
Export
  ↓
Submit
```

である。

Formlyは、フォーム作成・Validation・Submission Configuration・Preview・Code Generationを提供する。

一方、Formly自身がフォーム送信データを保存・管理するSubmission Platform機能はMVPには含めない。

FormlyはこのCore Product Loopを中心に設計し、不要なBackend、Authentication、Cloud Storage、SaaS機能を早期に導入しない。

最終的なプロダクトとしては、

> **Build forms visually. Export clean code.**

を実現する、軽量で実用的なForm Builderを目指す。
