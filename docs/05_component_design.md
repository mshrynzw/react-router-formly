# Component Design

Version: 1.0

---

# 1. Purpose

本ドキュメントはFormlyで利用する共通ComponentおよびFeature Componentの設計方針を定義する。

目的:

- UIの統一
- Componentの再利用
- Feature間の責務分離
- Cursorによる一貫した実装
- 保守性の向上
- Accessibilityの確保
- Responsive Designの統一
- Form Builderの複雑化防止

Formlyでは、Componentを「見た目の部品」だけではなく、明確な責務を持ったUI単位として設計する。

---

# 2. Design Policy

すべてのComponentは以下を基本とする。

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Composition優先
- Feature First
- Accessibility
- Responsive
- 再利用可能なComponentを優先
- Atomic Designは採用しない

---

# 3. Component Architecture

FormlyではComponentを以下の3種類に分類する。

```text
Shared Components
       │
       ├── UI
       ├── Layout
       ├── Navigation
       └── Feedback

Feature Components
       │
       ├── Builder
       ├── Preview
       ├── Code
       └── Settings

Route Components
       │
       ├── Home
       ├── Builder
       ├── Preview
       ├── Code
       └── Settings
```

````

基本的な依存方向:

```text
Route
  ↓
Feature
  ↓
Shared Components
```

Shared ComponentがFeature Componentへ依存してはいけない。

---

# 4. Component Categories

## 4.1 UI

shadcn/uiをベースとした基本UI。

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Label
- Card
- Badge
- Tabs
- Separator
- ScrollArea

---

## 4.2 Layout

Application全体のLayoutを構成する。

- AppHeader
- PageContainer
- PageHeader
- ContentArea
- Panel
- PanelHeader
- PanelContent
- SplitPane

---

## 4.3 Navigation

Navigationに関するComponent。

- Navigation
- MobileNav
- Breadcrumb where necessary
- LanguageSwitcher
- ThemeSwitcher
- BackButton

---

## 4.4 Feedback

ユーザーへ状態を伝えるComponent。

- Dialog
- Alert
- Toast
- Tooltip
- Popover
- Skeleton
- EmptyState
- ErrorState
- LoadingState

---

## 4.5 Form

Formly自身のForm Builderで使用するForm関連Component。

- FormField
- FieldLabel
- FieldDescription
- FieldError
- FieldOption
- FieldSettings
- ValidationMessage

これらはGenerated FormのUIと混同しない。

---

# 5. Builder Components

BuilderはFormlyの最重要Featureである。

```text
features/builder/
└── components/
```

主要Component:

- BuilderLayout
- BuilderHeader
- BuilderToolbar
- FieldPalette
- FieldPaletteItem
- FormCanvas
- FormFieldItem
- FormFieldToolbar
- FieldSettings
- FormSettings
- BuilderPreview

---

# 6. BuilderLayout

## Responsibility

Builder画面全体のLayoutを担当する。

```text
BuilderLayout
├── BuilderHeader
├── FieldPalette
├── FormCanvas
└── FieldSettings
```

BuilderLayout自身がForm Schemaの編集処理を実装しない。

---

# 7. BuilderHeader

## Responsibility

Builder上部のNavigation / Actionを表示する。

表示候補:

- Form Name
- Save Status
- Undo
- Redo
- Import
- Export
- Preview
- Code

BuilderHeaderはForm Schemaを直接操作するのではなく、必要なActionをFeature Logicへ渡す。

---

# 8. BuilderToolbar

## Responsibility

Builderで利用する主要Actionをまとめる。

例:

```text
New
Undo
Redo
Import
Export
Preview
Code
```

ResponsiveではActionをOverflow Menuへ移動できる。

---

# 9. FieldPalette

## Responsibility

利用可能なField Typeを表示し、Fieldを追加する。

```text
FieldPalette
├── FieldPaletteItem
├── FieldPaletteItem
├── FieldPaletteItem
└── ...
```

初期Field Type:

```text
Text
Email
Number
Textarea
Select
Radio
Checkbox
Submit
```

FieldPaletteはForm Schemaの内部構造を直接管理しない。

---

# 10. FieldPaletteItem

## Responsibility

1種類のField Typeを表示する。

表示:

- Icon
- Label
- Description where necessary

操作:

```text
Click
```

でField追加Actionを実行する。

将来的にDrag & DropによるField追加を実装する場合も、Clickによる追加を完全に廃止しない。

---

# 11. FormCanvas

## Responsibility

現在のForm Schemaを編集可能な状態で表示する。

```text
FormCanvas
└── FormFieldItem[]
```

FormCanvasは以下を担当する。

- Field List表示
- Selected Field表示
- Field Selection
- Field Reordering
- Empty State

FormCanvasはGeneratorを直接呼び出さない。

---

# 12. FormFieldItem

## Responsibility

1つのFieldをBuilder上で表示する。

表示:

- Field Label
- Field Type
- Field Preview
- Selected State
- Field Toolbar

Actions:

- Select
- Duplicate
- Delete

---

# 13. FormFieldToolbar

## Responsibility

Selected Fieldに対する操作を提供する。

例:

```text
Edit
Duplicate
Delete
Move
```

操作対象のField IDを明確にする。

---

# 14. FieldSettings

## Responsibility

Selected Fieldの設定を編集する。

Common Settings:

```text
Label
Placeholder
Description
Required
```

Field-specific Settings:

```text
Options
Min
Max
Step
Min Length
Max Length
```

FieldSettingsはForm SchemaのUpdate Actionを利用する。

---

# 15. FormSettings

## Responsibility

Form全体の設定を編集する。

例:

```text
Form Name
Description
Submit Button Label
Layout
```

Appearance / Design は Form 全体の設定として別タブ（Design）で編集する。

```text
Colors
Radius
Typography
Spacing
Shadow
CSS flavor
Reset to defaults (does not reset Liquid Glass / page backdrop)
```

Liquid Glass（default off）と page backdrop（default on, independent of glass）も Form 全体の Appearance Tokens だが、編集 UI は Design タブではなく Builder Preview の「背景」ダイアログにある。

Field固有設定をFormSettingsへ持ち込まない。フィールド単位の独自 CSS は持たない。生成フォームの Liquid Glass は Appearance トークンから適用する。Formly 本体 chrome には使わない。

---

# 16. BuilderPreview

## Responsibility

Builder内にLive Previewを表示する。

```text
Form Schema
    ↓
BuilderPreview
    ↓
Form Renderer
```

BuilderPreview はフィールド構造を変更しない。

例外: 「背景」ダイアログは Form 全体の Appearance Tokens（Liquid Glass / page backdrop）のみを更新する。更新は Builder の `updateAppearance` 経由で行い、Preview は LocalStorage に直接書き込まない。

---

# 17. Preview Components

Preview Feature:

```text
features/preview/
└── components/
```

主要Component:

- PreviewLayout
- PreviewHeader
- PreviewToolbar
- PreviewCanvas
- PreviewViewport
- BuilderPreviewPanel
- BackdropSettingsDialog
- FormRenderer
- FormRendererField

---

# 18. PreviewLayout

## Responsibility

Preview画面全体を構成する。

```text
PreviewLayout
├── PreviewHeader
├── PreviewToolbar
└── PreviewCanvas
```

---

# 19. PreviewToolbar

## Responsibility

Previewの表示設定を操作する。

例:

```text
Desktop
Tablet
Mobile
```

Preview ToolbarはForm Schemaを変更しない。

---

# 20. PreviewCanvas

## Responsibility

Form Rendererを配置するPreview領域。

```text
PreviewCanvas
└── FormRenderer
```

Viewportサイズの変更をサポートする。

---

# 21. PreviewViewport

## Responsibility

Preview対象のViewportを表現する。

例:

```text
Desktop
Tablet
Mobile
```

PreviewViewportは実際のBrowser Viewportを変更するものではなく、Preview UI内で表示サイズを再現する。

---

# 22. FormRenderer

## Responsibility

Form Schemaを読み取り、Form UIを描画する。

```text
FormSchema
    ↓
FormRenderer
    ↓
FormRendererField[]
```

FormRendererはBuilder UIを知らない。

---

# 23. FormRendererField

## Responsibility

Field Typeに応じたForm Controlを描画する。

```text
text
  → Input

email
  → Input

number
  → Input

textarea
  → Textarea

select
  → Select

radio
  → Radio Group

checkbox
  → Checkbox

submit
  → Button
```

FormRendererFieldはGenerated HTMLを使用しない。

React ComponentとしてPreviewを描画する。

---

# 24. Code Components

Code Feature:

```text
features/code/
└── components/
```

主要Component:

- CodeLayout
- CodeHeader
- CodeToolbar
- CodeTabs
- CodeViewer
- CopyCodeButton
- ExportCodeButton

---

# 25. CodeLayout

## Responsibility

Generated Code画面全体を構成する。

```text
CodeLayout
├── CodeHeader
├── CodeToolbar
├── CodeTabs
└── CodeViewer
```

---

# 26. CodeTabs

Tabs:

```text
HTML
CSS
JavaScript
```

選択中のCodeをCodeViewerへ渡す。

---

# 27. CodeViewer

## Responsibility

Generated Codeを読みやすく表示する。

機能:

- Syntax Highlighting
- Line Number where useful
- Horizontal Scroll
- Text Selection

CodeViewerはCode Generationを担当しない。

---

# 28. CopyCodeButton

## Responsibility

表示中のCodeをClipboardへコピーする。

Flow:

```text
CodeViewer
   ↓
CopyCodeButton
   ↓
Clipboard
```

成功:

```text
Copied to clipboard.
```

失敗:

```text
Failed to copy code.
```

---

# 29. ExportCodeButton

## Responsibility

Generated CodeをFileとしてExportする。

対象:

```text
HTML
CSS
JavaScript
```

Export処理そのものはComponentから分離する。

---

# 30. Settings Components

Settings Feature:

```text
features/settings/
└── components/
```

主要Component:

- SettingsLayout
- SettingsSection
- ThemeSettings
- LanguageSettings
- LocalDataSettings
- AboutSettings

---

# 31. SettingsLayout

## Responsibility

Application Settings画面全体を構成する。

```text
SettingsLayout
├── ThemeSettings
├── LanguageSettings
├── LocalDataSettings
└── AboutSettings
```

---

# 32. ThemeSettings

## Responsibility

Themeを変更する。

Options:

```text
Light
Dark
System
```

Theme Stateを直接LocalStorageへ保存するのではなく、Settings Logicを利用する。

---

# 33. LanguageSettings

## Responsibility

Application Languageを変更する。

対応Language:

```text
日本語
English
中文
한국어
```

User-generated Form Contentは変更しない。

---

# 34. LocalDataSettings

## Responsibility

LocalStorageに保存されているApplication Dataに関する操作を提供する。

例:

```text
Clear Local Data
Reset Application Data
```

破壊的操作にはConfirmation Dialogを使用する。

---

# 35. AboutSettings

## Responsibility

Application Informationを表示する。

表示候補:

```text
Formly
Version
GitHub
Documentation
```

---

# 36. Home Components

Landing / Home:

```text
features/home/
└── components/
```

主要Component:

- Hero
- HeroActions
- FeatureSection
- FeatureCard
- HowItWorks
- DemoSection
- TechnologySection
- Footer

---

# 37. Hero

## Responsibility

FormlyのProduct Valueを表示する。

Main Copy:

```text
Formly

Build forms visually.
Export clean code.
```

Primary CTA:

```text
Start Building
```

---

# 38. FeatureCard

## Responsibility

FormlyのFeatureを1つ表示する。

例:

```text
Visual Builder
Live Preview
Clean Code
No Login
Local First
Responsive
```

FeatureCardはProduct Logicを持たない。

---

# 39. HowItWorks

## Responsibility

FormlyのCore Product Loopを表示する。

```text
Build
  ↓
Preview
  ↓
Generate
  ↓
Export
```

---

# 40. DemoSection

## Responsibility

Formlyの実際のUI / Product Demoを表示する。

BuilderまたはPreviewへのNavigationを提供する。

---

# 41. TechnologySection

## Responsibility

Formlyで使用しているTechnologyを紹介する。

例:

```text
React
React Router v8
TypeScript
Vite
Tailwind CSS
shadcn/ui
Cloudflare Workers
Vitest
Playwright
```

---

# 42. Shared Components

Application全体で利用するComponent。

```text
components/
├── ui/
├── layout/
├── navigation/
└── feedback/
```

---

# 43. UI Components

shadcn/uiをベースとする。

基本:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Switch
Label
Card
Badge
Tabs
Dialog
DropdownMenu
Tooltip
Popover
Separator
ScrollArea
```

必要なComponentだけ導入する。

使用しないComponentを大量に追加しない。

スクロール可能な Panel / Sheet / CodeViewer は native `overflow` を使い、見た目は `src/index.css` のグローバルScrollbarに従う。Radix `ScrollArea` は、ネイティブでは足りない場合に限って導入する。生成フォームのCSSにFormly本体のScrollbarスタイルを含めない。

---

# 44. Layout Components

```text
AppHeader
PageContainer
PageHeader
ContentArea
Panel
PanelHeader
PanelContent
SplitPane
```

Application全体で共通するLayoutのみShared Componentとする。

---

# 45. Navigation Components

```text
Navigation
MobileNav
LanguageSwitcher
ThemeSwitcher
BackButton
```

NavigationはReact Routerと連携する。

Navigation ComponentがRoute固有のBusiness Logicを持たないようにする。

---

# 46. Feedback Components

```text
Dialog
Toast
Tooltip
Popover
Alert
Skeleton
EmptyState
ErrorState
LoadingState
```

Feedback UIはApplication全体で統一する。

---

# 47. Component Rules

すべてのComponentは以下を意識する。

- Props定義
- State定義 where necessary
- Loading where necessary
- Error where necessary
- Empty where necessary
- Accessibility
- Responsive Behavior

ただし、すべてのComponentが必ずLoading / Error / Empty Stateを持つ必要はない。

例えば:

```text
Button
```

にEmpty Stateは不要。

```text
FormCanvas
```

にはEmpty Stateが必要。

Componentの責務に応じて適切に設計する。

---

# 48. Component State

## Button

```text
Default
Hover
Active
Focus
Disabled
Loading
```

---

## Input

```text
Default
Focus
Error
Disabled
```

---

## Card

```text
Default
Hover where necessary
Selected where necessary
Disabled where necessary
```

---

## Dialog

```text
Closed
Opening
Open
Closing
```

---

## Field

```text
Default
Hover
Selected
Dragging
Disabled
Error
```

---

## CodeViewer

```text
Loading
Loaded
Empty
Error
```

必要な場合のみStateを実装する。

---

# 49. Builder Component State

Builder Componentは以下の状態を考慮する。

```text
Initial
Loaded
Empty
Selected
Editing
Saving
Saved
Error
```

例えばFormCanvas:

```text
No Fields
   ↓
Add Field
   ↓
Field Selected
   ↓
Field Editing
   ↓
Saved
```

---

# 50. Accessibility Rules

すべてのInteractive ComponentはKeyboardで操作可能にする。

必須:

- Keyboard Navigation
- Focus Ring
- Accessible Label
- Semantic HTML
- Color Contrast
- Screen Reader Compatibility

---

# 51. Builder Accessibility

特にBuilderでは以下を必須とする。

- Field Selection via Keyboard
- Field Reordering via Keyboard
- Field Settings via Keyboard
- Accessible Drag & Drop Alternative
- Focus Management
- Clear Selected State

Drag & Dropのみを唯一の操作方法にしない。

---

# 52. Form Accessibility

Builder PreviewおよびGenerated Formでは以下を守る。

- LabelとInputのAssociation
- Keyboard Navigation
- Required State
- Error Message
- Accessible Description
- Focus State
- Semantic HTML

---

# 53. Responsive Component Rules

Component単位でResponsive Behaviorを考慮する。

Builder:

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
Field Palette Drawer
+
Field Settings Drawer
```

---

# 54. Naming Rules

## Components

```text
PascalCase
```

例:

```text
FormCanvas
FieldSettings
CodeViewer
```

---

## Hooks

```text
camelCase
```

例:

```text
useFormBuilder()
useFormSchema()
useClipboard()
```

---

## Props

```text
camelCase
```

例:

```text
selectedFieldId
onSelectField
onDeleteField
```

---

## Types

```text
PascalCase
```

例:

```text
FormSchema
FormField
FieldType
GeneratedCode
```

---

# 55. File Naming

React Component:

```text
PascalCase.tsx
```

例:

```text
FormCanvas.tsx
FieldSettings.tsx
CodeViewer.tsx
```

Utility:

```text
kebab-case.ts
```

例:

```text
generate-html.ts
serialize-form.ts
```

Test:

```text
*.test.ts
*.test.tsx
```

---

# 56. Folder Structure

基本構成:

```text
src/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   └── feedback/
│
├── features/
│   ├── home/
│   ├── builder/
│   ├── preview/
│   ├── code/
│   └── settings/
│
├── generators/
│   ├── html/
│   ├── css/
│   └── javascript/
│
├── form-schema/
│
├── routes/
│
└── lib/
```

---

# 57. Feature Component Structure

Builder:

```text
features/builder/
├── components/
├── hooks/
├── services/
├── types/
└── utils/
```

Preview:

```text
features/preview/
├── components/
├── hooks/
└── utils/
```

Code:

```text
features/code/
├── components/
├── hooks/
└── utils/
```

Settings:

```text
features/settings/
├── components/
├── hooks/
└── utils/
```

すべてのFeatureで全Directoryを作成する必要はない。

---

# 58. Shared vs Feature Component

## Shared

複数Featureで使用される。

例:

```text
Button
Card
Dialog
Toast
Input
Tabs
```

---

## Feature

特定Featureに依存する。

例:

```text
FieldPalette
FormCanvas
FieldSettings
BuilderPreview
CodeViewer
FormRenderer
```

Feature Componentを無理にSharedへ移動しない。

---

# 59. Reuse Policy

新しいComponentを作成する前に、既存Componentを確認する。

検索対象:

```text
components/
features/**/components/
```

既存Componentで要件を満たせる場合は再利用する。

---

# 60. Reuse Rules

以下のような重複Componentを作らない。

```text
Button
PrimaryButton
BuilderButton
SaveButton
```

ただし、明確な責務の違いがある場合はFeature Componentを作成してよい。

例えば:

```text
SaveButton
```

がForm Persistence Logicと強く結びつく場合は、Builder Feature内のComponentとして実装できる。

---

# 61. Composition Policy

Compositionを優先する。

悪い例:

```text
HugeBuilderComponent
```

に以下をすべて実装する。

```text
Field Palette
Form Canvas
Field Settings
Preview
Toolbar
Persistence
Generator
```

良い例:

```text
BuilderLayout
├── BuilderHeader
├── FieldPalette
├── FormCanvas
│   └── FormFieldItem
├── FieldSettings
└── BuilderPreview
```

---

# 62. Component Responsibility

ComponentはSingle Responsibilityを意識する。

例:

```text
FormCanvas
```

はFormの編集領域を担当する。

```text
FieldSettings
```

はField設定UIを担当する。

```text
FormSchema
```

はDomain Modelであり、UI Componentではない。

```text
generateHtml()
```

はGenerator Logicであり、UI Componentではない。

---

# 63. Props Design

Propsは必要最小限にする。

例:

```ts
type FormFieldItemProps = {
  field: FormField;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};
```

巨大なProps Objectを作らない。

例えば:

```ts
props: {
  form,
  settings,
  state,
  handlers,
  options,
  ...
}
```

のような過剰なProps集約は避ける。

---

# 64. Callback Design

Callback名は動作が明確になるようにする。

推奨:

```text
onSelectField
onDeleteField
onUpdateField
onAddField
onReorderFields
```

避ける:

```text
onAction
onChange
handleEverything
```

---

# 65. State Ownership

Component内部で管理できるUI StateはComponent内で管理する。

例:

```text
Dialog Open
Dropdown Open
Selected Tab
```

Feature全体で必要なState:

```text
Form Schema
Selected Field
```

はFeature / Domain Layerで管理する。

---

# 66. Form Schema Boundary

UI ComponentはForm Schemaを直接破壊的に変更しない。

基本:

```text
Component
   ↓
Callback / Action
   ↓
Form Schema Update
```

Form Schema Update Logicを適切なLayerへ集約する。

---

# 67. Generated Code Boundary

CodeViewerなどのUI ComponentはGeneratorを直接実装しない。

```text
Form Schema
   ↓
Generator
   ↓
GeneratedCode
   ↓
CodeViewer
```

GeneratorとUIを分離する。

---

# 68. Renderer Boundary

FormRendererはGenerated HTMLを使用しない。

```text
Form Schema
   ↓
FormRenderer
   ↓
React UI
```

一方、Code Generator:

```text
Form Schema
   ↓
Generator
   ↓
HTML / CSS / JS
```

とする。

同じForm Schemaから2つの異なるOutputを生成する。

---

# 69. Loading Rules

Loading Stateは必要なComponentのみ実装する。

例:

```text
CodeViewer
```

にはCode Generationが非同期化された場合にLoadingを表示できる。

一方、

```text
Button
```

にはAction実行中のLoading Stateを提供する。

---

# 70. Empty State Rules

CollectionやDataを表示するComponentにはEmpty Stateを設ける。

例:

```text
FormCanvas
```

```text
No fields yet.

Add your first field.
```

一方、単純なUI ComponentにはEmpty Stateを作らない。

---

# 71. Error State Rules

Errorが発生する可能性があるComponentにはError Stateを設ける。

例:

```text
CodeViewer
```

```text
Unable to generate code.

[Try Again]
```

Error Messageには内部Stack Traceを表示しない。

---

# 72. Toast Rules

Toastは短いFeedbackに使用する。

例:

```text
Form saved.
Copied to clipboard.
Form schema exported.
Form schema imported.
```

重要な情報をToastだけに依存しない。

---

# 73. Dialog Rules

破壊的操作や重要な確認に使用する。

例:

```text
Clear Local Data
Reset Form
Discard Changes
```

必ず:

```text
Cancel
Confirm
```

を明確にする。

---

# 74. Component Testing

Component Testでは以下を確認する。

- Rendering
- User Interaction
- Accessibility
- State Change
- Error State
- Empty State
- Responsive Behavior where practical

---

# 75. Builder Component Testing

特に以下をTestする。

```text
FieldPalette
FormCanvas
FormFieldItem
FieldSettings
FormSettings
BuilderToolbar
```

Test対象:

- Add Field
- Select Field
- Update Field
- Delete Field
- Duplicate Field
- Reorder Field
- Required Toggle
- Option Editing

---

# 76. Preview Component Testing

Test:

```text
FormRenderer
FormRendererField
PreviewToolbar
PreviewViewport
```

対象:

- Field Rendering
- Field Type Switching
- Validation UI
- Empty Form
- Invalid Schema
- Responsive Preview Mode

---

# 77. Code Component Testing

Test:

```text
CodeTabs
CodeViewer
CopyCodeButton
ExportCodeButton
```

対象:

- Tab Switching
- Code Display
- Copy
- Copy Error
- Export
- Empty State
- Error State

---

# 78. Settings Component Testing

Test:

```text
ThemeSettings
LanguageSettings
LocalDataSettings
AboutSettings
```

対象:

- Theme Change
- Language Change
- Local Data Reset
- Confirmation Dialog
- About Information

---

# 79. Accessibility Testing

Component Testでは可能な範囲でAccessibilityを確認する。

重要Component:

```text
Form
Input
Dialog
Tabs
Drawer
Button
FieldSettings
FieldPalette
```

特にBuilderではKeyboard操作を重視する。

---

# 80. Responsive Component Testing

主要Breakpoint:

```text
Desktop
Tablet
Mobile
```

特に確認するComponent:

```text
BuilderLayout
FieldPalette
FieldSettings
FormCanvas
PreviewCanvas
CodeViewer
MobileNav
```

---

# 81. Cursor Rules

Cursorは新しいComponentを作成する前に、以下を検索する。

```text
components/
features/**/components/
```

既存Componentがある場合は再利用を検討する。

新規Componentを作成する場合は、既存Componentでは要件を満たせない理由を確認する。

---

# 82. Cursor Component Decision

Cursorは以下の順番でComponentの配置を判断する。

```text
1. 既存Shared Componentで解決できるか？
        ↓
2. Feature Componentとして再利用できるか？
        ↓
3. 新しいShared Componentが本当に必要か？
        ↓
4. 新規Componentを作成
```

---

# 83. Anti-Pattern

以下を避ける。

## 巨大Component

```text
BuilderPage.tsx
```

にすべてのBuilder Logicを記述する。

---

## 過剰なProps

```text
<Builder
  form={form}
  state={state}
  settings={settings}
  handlers={handlers}
  options={options}
  ...
/>
```

---

## UIとDomain Logicの混在

```text
FormCanvas
```

内部で、

- LocalStorage
- JSON Serialization
- Generator
- Routing

まで実装する。

---

## 重複Component

```text
BuilderButton
PreviewButton
CodeButton
```

をShared Buttonで代替できるのに個別作成する。

---

# 84. Component Documentation

複雑なComponentには必要に応じてDocumentationを追加する。

対象候補:

```text
FieldPalette
FormCanvas
FieldSettings
FormRenderer
CodeViewer
```

詳細仕様が必要になった場合:

```text
docs/component-design/
```

配下へ追加する。

---

# 85. Future Component Documents

将来的に以下の詳細Documentを作成できる。

```text
docs/component-design/
├── README.md
├── builder-layout.md
├── field-palette.md
├── form-canvas.md
├── form-field-item.md
├── field-settings.md
├── form-renderer.md
├── code-viewer.md
├── copy-code-button.md
├── settings.md
└── mobile-navigation.md
```

MVP開始時点では、必要になるまで個別Documentを作成しない。

---

# 86. Component List

## Shared UI

```text
Button
Input
Textarea
Select
Checkbox
Radio
Switch
Label
Card
Badge
Tabs
Dialog
DropdownMenu
Tooltip
Popover
Separator
ScrollArea
```

---

## Layout

```text
AppHeader
PageContainer
PageHeader
ContentArea
Panel
PanelHeader
PanelContent
SplitPane
```

---

## Navigation

```text
Navigation
MobileNav
LanguageSwitcher
ThemeSwitcher
BackButton
```

---

## Feedback

```text
Toast
Alert
Skeleton
EmptyState
ErrorState
LoadingState
```

---

## Home

```text
Hero
HeroActions
FeatureSection
FeatureCard
HowItWorks
DemoSection
TechnologySection
Footer
```

---

## Builder

```text
BuilderLayout
BuilderHeader
BuilderToolbar
FieldPalette
FieldPaletteItem
FormCanvas
FormFieldItem
FormFieldToolbar
FieldSettings
FormSettings
BuilderPreview
```

---

## Preview

```text
PreviewLayout
PreviewHeader
PreviewToolbar
PreviewCanvas
PreviewViewport
FormRenderer
FormRendererField
```

---

## Code

```text
CodeLayout
CodeHeader
CodeToolbar
CodeTabs
CodeViewer
CopyCodeButton
ExportCodeButton
```

---

## Settings

```text
SettingsLayout
SettingsSection
ThemeSettings
LanguageSettings
LocalDataSettings
AboutSettings
```

---

# 87. Component Dependency Direction

基本Dependency Direction:

```text
Route
  ↓
Feature
  ↓
Shared UI
```

Domain:

```text
Feature
  ↓
Form Schema
```

Generator:

```text
Form Schema
  ↓
Generator
```

Persistence:

```text
Form Schema
  ↓
Persistence
```

Shared UIが以下へ依存してはいけない。

```text
Feature
Form Schema
Generator
Persistence
Route
```

---

# 88. Component and Domain Separation

以下を明確に分離する。

```text
UI Component
    ↓
Feature Logic
    ↓
Domain Model
```

例:

```text
FieldSettings
    ↓
updateField()
    ↓
FormSchema
```

FieldSettingsがFormSchemaの内部構造を自由に変更しない。

---

# 89. Component and Routing Separation

ComponentはNavigation Actionを受け取れる。

例:

```text
onNavigateToBuilder
```

ただし、Reusable Componentが特定Routeへ直接依存することは避ける。

Route固有のNavigationはRoute / Feature Layerで管理する。

---

# 90. Component and Persistence Separation

Componentから直接:

```ts
localStorage.setItem(...)
```

を呼び出さない。

代わりに:

```text
Component
   ↓
Feature Logic
   ↓
Persistence
```

とする。

---

# 91. Component and Generator Separation

Componentから直接HTML / CSS / JavaScriptを組み立てない。

```text
Form Schema
   ↓
Generator
   ↓
GeneratedCode
   ↓
CodeViewer
```

GeneratorはUIから独立させる。

---

# 92. Component and i18n Separation

UI TextをComponentへ大量にHardcodeしない。

例:

```text
t("builder.addField")
t("builder.preview")
t("builder.export")
```

などTranslation Layerを利用する。

ただし、User-generated Form ContentはTranslation対象外とする。

---

# 93. Component and Theme Separation

Componentごとに独自のTheme管理をしない。

```text
Application Theme
      ↓
Design Tokens
      ↓
Shared Components
      ↓
Feature Components
```

---

# 94. Component Performance

Componentは不要なRe-renderを避ける。

特にBuilderでは:

```text
FormCanvas
FormFieldItem
FieldSettings
BuilderPreview
```

のRender範囲を意識する。

ただし、早期にMemoizationを乱用しない。

実際のPerformance問題が確認された場合に最適化する。

---

# 95. Component Composition Example

推奨:

```tsx
<BuilderLayout>
  <BuilderHeader />

  <BuilderContent>
    <FieldPalette />

    <FormCanvas>
      <FormFieldItem />
    </FormCanvas>

    <BuilderPreview />

    <FieldSettings />
  </BuilderContent>
</BuilderLayout>
```

1280px未満では `BuilderPreview` は Canvas / Settings の下段に全幅表示する。1280px以上では Canvas の右隣へ配置する。

各Componentが明確な責務を持つ。

---

# 96. Builder Component Relationship

```text
                    BuilderLayout
                          │
        ┌─────────┬───────┼────────┬──────────┐
        ▼         ▼       ▼        ▼          ▼
 BuilderHeader Palette Canvas  Preview   Settings
                          │        │
                          ▼        ▼
                   FormFieldItem  FormRenderer
                          │
                          ▼
                 FormFieldToolbar
```

---

# 97. Preview Component Relationship

```text
PreviewLayout
      │
 ┌────┼───────────────┐
 ▼    ▼               ▼
Header Toolbar   PreviewCanvas
                    │
                    ▼
               FormRenderer
                    │
                    ▼
            FormRendererField[]
```

---

# 98. Code Component Relationship

```text
CodeLayout
    │
 ├── CodeHeader
 │
 ├── CodeToolbar
 │
 ├── CodeTabs
 │
 └── CodeViewer
       │
       ├── CopyCodeButton
       └── ExportCodeButton
```

---

# 99. Settings Component Relationship

```text
SettingsLayout
      │
      ├── ThemeSettings
      ├── LanguageSettings
      ├── LocalDataSettings
      └── AboutSettings
```

---

# 100. Final Component Principles

FormlyのComponent設計では以下を最重要原則とする。

```text
1. Componentは明確な責務を持つ
2. Shared ComponentとFeature Componentを分離する
3. Form SchemaをUI Componentから分離する
4. GeneratorをUI Componentから分離する
5. PersistenceをUI Componentから分離する
6. React Routerへの依存を必要最小限にする
7. Compositionを優先する
8. 既存Componentを再利用する
9. Accessibilityを最初から考慮する
10. Responsiveを最初から考慮する
11. 巨大Componentを作らない
12. 過剰な抽象化をしない
```

---

# 101. Final Component Architecture

FormlyのComponent Architectureは以下を基本とする。

```text
                         Routes
                           │
                           ▼
                       Features
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Builder       Preview        Code
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                      Form Schema
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
             Persistence         Generator
                                      │
                                ┌─────┼─────┐
                                ▼     ▼     ▼
                               HTML  CSS   JS


Shared Components
       ↑
       │
Routes / Features
       │
       ▼
UI / Layout / Navigation / Feedback
```

FormlyではComponentを増やすこと自体を目的としない。

**既存Componentで解決できる場合は再利用し、必要になった場合のみ新しいComponentを作成する。**

最終的な目的は、

> **Build forms visually. Export clean code.**

というProduct Valueを、シンプルで保守しやすいComponent Architectureによって実現することである。
````
