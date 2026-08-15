# 詳細設計書

---

# 1. 概要

本書はFormlyの各画面・Featureにおける詳細仕様を定義する。

基本設計で定義されたArchitecture、Screen構成、Form Schemaを前提とし、実装時に必要となるUI、Component、Interaction、State、Responsive Behavior、Accessibilityなどを具体化する。

対象Screen:

```text
SCR-001 Landing / Home
SCR-002 Form Builder
SCR-003 Form Preview
SCR-004 Generated Code
SCR-005 Application Settings
```

````

FormlyのCore Product Loopは以下とする。

```text
Builder
   ↓
Configure
   ↓
Preview
   ↓
Generate
   ↓
Export
```

---

# 2. 設計原則

## 2.1 Form Schema First

Form SchemaをFormlyにおけるCanonical Sourceとする。

```text
Form Builder
     ↓
Form Schema
     ├── Preview
     ├── Generator
     └── LocalStorage
```

Builder、Preview、Generatorが独自のForm Dataを保持しない。

---

## 2.2 Feature First

画面固有のUIとロジックはFeature単位で管理する。

```text
features/
├── builder/
├── preview/
├── code/
└── settings/
```

---

## 2.3 Shared UI

複数Featureで利用するUIは共通Componentとして管理する。

```text
components/
```

Feature固有のComponentを無理に共通化しない。

---

## 2.4 Responsive First

Desktopだけを基準にしてMobileを後付けするのではなく、Desktop / Tablet / Mobileを設計段階から考慮する。

---

## 2.5 Accessibility First

Keyboard操作、Focus、Label、Contrast、Semantic HTMLなどを実装段階で考慮する。

---

# 3. 共通Layout

## 3.1 Landing Layout

```text
+------------------------------------------------+
| Header                                         |
+------------------------------------------------+
|                                                |
| Hero                                           |
|                                                |
+------------------------------------------------+
| Features                                       |
+------------------------------------------------+
| How It Works                                   |
+------------------------------------------------+
| Demo / Preview                                 |
+------------------------------------------------+
| Technology                                     |
+------------------------------------------------+
| Footer                                         |
+------------------------------------------------+
```

---

## 3.2 Application Layout

Builder / Preview / Code / Settingsでは共通Application Headerを使用する。

```text
+------------------------------------------------+
| Application Header                             |
+------------------------------------------------+
|                                                |
| Main Content                                   |
|                                                |
+------------------------------------------------+
```

Formlyでは常時表示Sidebarを必須としない。

画面幅を有効利用し、必要に応じてHeader Navigation、Drawer、Sheetなどを使用する。

---

# 4. 共通コンポーネント

## 4.1 Navigation

- Logo
- Navigation
- LanguageSwitcher
- ThemeToggle
- SettingsLink
- MobileMenu

---

## 4.2 Form Components

- Form
- FormField
- FormLabel
- FormDescription
- FormMessage
- Input
- Textarea
- Select
- Checkbox
- Radio
- Button
- SubmitButton

---

## 4.3 UI Components

- Button
- Card
- Badge
- Tabs
- Dialog
- Drawer
- Sheet
- DropdownMenu
- Tooltip
- Popover
- Alert
- Toast
- Skeleton
- EmptyState
- ErrorState

---

## 4.4 Builder Components

- FieldPalette
- FieldPaletteItem
- FormCanvas
- FormFieldItem
- FieldToolbar
- FieldSettings
- FormSettings
- BuilderToolbar
- BuilderPreview
- SortableFieldList

---

## 4.5 Preview Components

- PreviewToolbar
- PreviewCanvas
- PreviewViewport
- FormRenderer
- FormRendererField
- PreviewActions

---

## 4.6 Code Components

- CodeToolbar
- CodeTabs
- CodeViewer
- CopyCodeButton
- ExportCodeButton

---

# 5. SCR-001 Landing / Home

## 5.1 画面概要

### Screen ID

```text
SCR-001
```

### Screen Name

```text
Landing / Home
```

### URL

```text
/
```

### Purpose

Formlyの価値をユーザーへ伝え、Form Builderの利用へ誘導する。

Portfolioとして閲覧した場合にも、FormlyのProduct ConceptとEngineering Qualityが短時間で伝わることを目的とする。

---

# 6. Landing Layout

```text
+------------------------------------------------------------+
| Header                                                     |
+------------------------------------------------------------+
|                                                            |
| Hero                                                       |
|                                                            |
| Build forms visually.                                      |
| Export clean code.                                         |
|                                                            |
| [Start Building]                                           |
|                                                            |
+------------------------------------------------------------+
| Features                                                   |
|                                                            |
| Visual Builder | Live Preview | Clean Code                |
+------------------------------------------------------------+
| How It Works                                               |
|                                                            |
| Build → Preview → Export                                   |
+------------------------------------------------------------+
| Demo                                                       |
+------------------------------------------------------------+
| Technology                                                 |
+------------------------------------------------------------+
| Footer                                                     |
+------------------------------------------------------------+
```

---

# 7. Landing Header

## 表示項目

- Formly Logo
- Product Navigation
- Language Switcher
- Theme Switcher
- Start Building
- GitHub

## Navigation

必要に応じて以下へ移動する。

```text
Home
Builder
Preview
Code
Settings
```

LandingではBuilderへの導線を最優先する。

---

# 8. Landing Hero

## Main Copy

```text
Formly

Build forms visually.
Export clean code.
```

## Description

Formlyが、

> ブラウザ上でフォームを視覚的に作成し、HTML / CSS / JavaScriptとしてExportできるツール

であることを明確に説明する。

## Primary CTA

```text
Start Building
```

Route:

```text
/builder
```

## Secondary CTA

必要に応じて、

```text
View Demo
```

を提供する。

---

# 9. Landing Features

主要Featureを紹介する。

```text
Visual Builder
```

フォームを視覚的に作成できる。

```text
Live Preview
```

作成中のフォームをリアルタイムに確認できる。

```text
Clean Code
```

HTML / CSS / JavaScriptとして持ち出せる。

```text
No Login
```

ログインなしですぐに利用できる。

```text
Local First
```

Form Dataをブラウザへ保存する。

```text
Responsive
```

Desktop / Tablet / Mobileに対応する。

---

# 10. Landing How It Works

以下の3ステップを表示する。

```text
1. Build

2. Preview

3. Export
```

Visual Flow:

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

# 11. Landing Demo

Form BuilderまたはPreviewのUIをVisual Demoとして表示する。

Demoは実際のApplicationへ誘導できる。

```text
[Try Formly]
```

Route:

```text
/builder
```

---

# 12. Landing Technology

Portfolioとして技術力を示す。

表示候補:

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

Technology Sectionは単なるロゴ一覧ではなく、Formlyでどのように利用しているかを簡潔に説明する。

---

# 13. Landing States

Landingは基本的にStatic Contentを中心とする。

### Loading

不要なLoadingを表示しない。

### Error

External Resourceなどに依存する場合のみ必要に応じて表示する。

### Empty

基本的に存在しない。

---

# 14. Landing Animation

Animationは控えめにする。

使用候補:

- Fade In
- Slide Up
- Hover
- Button Interaction

過剰なAnimationは使用しない。

`prefers-reduced-motion`を尊重する。

---

# 15. Landing Responsive

### Desktop

HeroとFeatureを広く表示する。

### Tablet

2 Column程度へ調整する。

### Mobile

Single Columnを基本とする。

```text
Hero
 ↓
CTA
 ↓
Features
 ↓
How It Works
 ↓
Demo
 ↓
Technology
```

---

# 16. Landing Accessibility

- Semantic HTML
- Heading hierarchy
- Keyboard Navigation
- Focus Ring
- Accessible Link
- Accessible Button
- Color Contrast
- Reduced Motion

---

# 17. SCR-002 Form Builder

## 17.1 画面概要

### Screen ID

```text
SCR-002
```

### Screen Name

```text
Form Builder
```

### URL

```text
/builder
```

### Purpose

FormlyのCore Feature。

ユーザーがフォームを視覚的に作成・編集する。

---

# 18. Builder Layout

Desktop（1024px〜1279px）:

```text
+----------------------------------------------------------------+
| Header                                                         |
+----------------+-----------------------------+-----------------+
| Field Palette  | Form Canvas                 | Field Settings  |
|                |                             |                 |
| Text           | ┌─────────────────────────┐ | Label           |
| Email          | │ Name                    │ | Placeholder     |
| Number         | └─────────────────────────┘ | Required        |
| Textarea       |                             | Validation      |
| Select         | ┌─────────────────────────┐ |                 |
| Radio          | │ Email                   │ |                 |
| Checkbox       | └─────────────────────────┘ |                 |
| Submit         |                             |                 |
+----------------+-----------------------------+-----------------+
| Builder Preview                                                |
+----------------------------------------------------------------+
```

Wide Desktop（1280px〜）:

Canvas を左、Builder Preview を右に並べる。Field Palette と Field Settings の位置は変えない。

```text
+----------+--------------------+--------------------+-----------+
| Field    | Form Canvas        | Builder Preview    | Field     |
| Palette  |                    |                    | Settings  |
|          | ┌────────────────┐ | ┌────────────────┐ | Label     |
| Text     | │ Name           │ | │ Name           │ | Required  |
| Email    | └────────────────┘ | └────────────────┘ |           |
+----------+--------------------+--------------------+-----------+
```

---

# 19. Builder Header

表示項目:

- Form Name
- Save Status
- Undo / Redo where applicable
- New
- Import
- Export
- Preview
- Code
- Settings

## Save Status

例:

```text
Saved
Saving...
Unsaved changes
```

LocalStorageへの保存状態をユーザーへ明示する。

---

# 20. Field Palette

## Purpose

利用可能なField Typeを表示する。

## Initial Field Types

```text
Text
Email
Number
Textarea
Select
Radio
Checkbox
Submit Button
```

## Field Palette Item

表示:

- Icon
- Label
- Description where useful

操作:

```text
Click
```

でFieldをCanvasへ追加する。

---

# 21. Form Canvas

Form CanvasにはForm Schemaに定義されたFieldを表示する。

```text
Form Schema
     ↓
Form Canvas
```

## Field Item

表示:

- Field Label
- Field Type
- Preview
- Selection State
- Actions

Actions:

```text
Select
Duplicate
Delete
```

---

# 22. Field Selection

Fieldを選択すると、

```text
Field Settings
```

へ選択状態を反映する。

Selected Fieldには明確なVisual Indicatorを表示する。

例:

```text
Border
Focus Ring
Toolbar
```

---

# 23. Field Reordering

Fieldの順番を変更できる。

操作方法は以下を基本とする。

- Drag & Drop
- Keyboard Reordering

Reordering後はForm SchemaのField Orderを更新する。

```text
Before

Name
Email
Message

After

Email
Name
Message
```

---

# 24. Field Settings

選択したFieldの設定を編集する。

## Common Settings

```text
Label
Placeholder
Required
Description
```

## Field-specific Settings

Select / Radio / Checkbox:

```text
Options
```

Number:

```text
Min
Max
Step
```

Text / Email / Textarea:

```text
Min Length
Max Length
```

Field Typeによって表示する設定項目を変更する。

---

# 25. Form Settings

Form全体の設定を管理する。

例:

```text
Form Name
Form Description
Layout
Submit Button Label
```

デザイン設定（フォーム全体の Appearance Tokens。Design タブ）:

```text
Colors (page / form / input / text / muted / border / accent / submit / danger / success; each has hex + opacity 0–100; border default opacity 10, others 100)
Radius (form / control)
Typography (font preset / body size / title size)
Spacing (padding / field gap / max width)
Shadow
CSS flavor (css | tailwind, default css)
```

背景設定（同じ Appearance Tokens。Builder Preview の「背景」ダイアログ）:

```text
Liquid Glass (off | 12 presets, default off)
Page backdrop (visible default on, 6 allowlisted images)
```

Appearance は Form Schema に保存する。自由記述の CSS は受け入れない。Design タブのリセットは色・半径・タイポグラフィ・余白・影・CSS flavor のみを戻し、Liquid Glass / page backdrop は保持する。

Liquid Glass は生成フォームのカードにのみ適用する。屈折はカード背面の `backdrop-filter` と SVG フィルタ（`feTurbulence` → ノイズの `feGaussianBlur` → `feDisplacementMap`）で行う。入力テキストは歪めない。12 プリセットは歪み周波数・変位量・霜の強さを変える。背景画像はガラス種別と独立して選ぶ。ユーザー任意の画像 URL は受け入れない。

---

# 26. Builder Preview

Builder内にPreview Panelを表示する。

```text
Builder
   │
   └── Preview Panel
```

## Layout

```text
〜1023px
Canvas の下（縦積み）

1024px〜1279px
3 Column の下段に全幅

1280px〜
Canvas の右隣（Palette | Canvas | Preview | Settings）
```

## Purpose

編集途中のFormを確認する。

## Behavior

Form Schemaが変更されるとPreviewへ反映する。

```text
Field Change
   ↓
Form Schema Update
   ↓
Builder Preview Update
```

Builder Preview はフィールド構造を変更しない。

ヘッダーの「背景」は `role="dialog"` の背景設定ダイアログを開く（Escape / オーバーレイ / 閉じるで閉じる）。ダイアログから Liquid Glass と page backdrop を更新する。更新は Builder の appearance update を経由し、Preview は LocalStorage に直接書き込まない。

---

# 27. Builder Toolbar

主要Action:

```text
New
Undo
Redo
Import
Export
Preview
Code
```

優先度の低いActionはOverflow Menuへ配置できる。

---

# 28. New Form

New Formを実行すると新しいForm Schemaを作成する。

既存のUnsaved Changesがある場合は確認UIを表示する。

```text
You have unsaved changes.

Discard changes?
```

ただし、LocalStorageへのAuto Saveが有効な場合は、不要な確認を避ける。

---

# 29. Import

ImportはJSON Form Schemaを読み込む。

Flow:

```text
File
 ↓
Parse
 ↓
Validate
 ↓
Normalize
 ↓
Form Schema
 ↓
Builder
```

Invalid Schema:

```text
Import failed.
The selected file is not a valid Formly schema.
```

---

# 30. Export

Form SchemaをJSONとしてExportする。

Flow:

```text
Form Schema
 ↓
Serialize
 ↓
JSON
 ↓
Download
```

ExportにはSchema Versionを含める。

---

# 31. Builder Empty State

FormにFieldがない場合:

```text
Start building your form

Add your first field from the Field Palette.
```

CTA:

```text
Add Field
```

またはField Paletteから直接追加できる。

---

# 32. Builder Loading State

初期状態でLocalStorageからFormを復元する場合に表示する。

Skeleton対象:

- Form Canvas
- Field Settings

ただし、復元処理が非常に高速な場合は不要なSkeletonを表示しない。

---

# 33. Builder Error State

対象:

- Invalid LocalStorage Data
- Invalid Form Schema
- Storage Error

Error UI:

```text
Unable to load this form.

[Try Again]
[Reset Form]
```

---

# 34. Builder Toast

Success:

```text
Form saved.
```

```text
Form schema exported.
```

```text
Form schema imported.
```

```text
Code copied.
```

Error:

```text
Failed to save the form.
```

```text
Failed to import the form schema.
```

---

# 35. Builder Responsive

## Wide Desktop（1280px〜）

4 Panel Layout:

```text
Field Palette | Form Canvas | Builder Preview | Field Settings
```

## Desktop（1024px〜1279px）

3 Panel Layout + Preview below:

```text
Field Palette
Form Canvas
Field Settings
Builder Preview（full width）
```

## Tablet

Field PaletteとField Settingsの幅を縮小する。

必要に応じてPanelをCollapseする。

## Mobile

Form Canvasを中心にする。

```text
Header
 ↓
Form Canvas
 ↓
Actions
```

Field Palette:

```text
Drawer / Sheet
```

Field Settings:

```text
Drawer / Sheet
```

---

# 36. Builder Accessibility

- Keyboard Navigation
- Keyboard Field Selection
- Keyboard Reordering
- Focus Management
- Visible Focus
- Accessible Labels
- Accessible Buttons
- Screen Reader friendly Field Type
- Drag & DropのKeyboard Alternative

Drag & Dropだけを唯一の操作方法にしない。

---

# 37. Builder Animation

控えめなAnimationを使用する。

対象:

- Field Add
- Field Remove
- Field Selection
- Drawer Open
- Toast
- Panel Transition

Reorderingでは過剰なAnimationを避ける。

---

# 38. SCR-003 Form Preview

## 38.1 画面概要

### Screen ID

```text
SCR-003
```

### Screen Name

```text
Form Preview
```

### URL

```text
/preview
```

### Purpose

Form Schemaから生成されるFormを独立した画面で確認する。

---

# 39. Preview Layout

```text
+------------------------------------------------------------+
| Header                                                     |
+------------------------------------------------------------+
| Preview Toolbar                                            |
+------------------------------------------------------------+
|                                                            |
|                Preview Canvas                              |
|                                                            |
|                ┌────────────────────┐                      |
|                │                    │                      |
|                │      Form         │                      |
|                │                    │                      |
|                └────────────────────┘                      |
|                                                            |
+------------------------------------------------------------+
| Actions                                                    |
+------------------------------------------------------------+
```

---

# 40. Preview Header

表示:

- Formly Logo
- Back to Builder
- Code
- Settings

---

# 41. Preview Toolbar

表示:

```text
Desktop
Tablet
Mobile
```

Viewport切替を提供する。

必要に応じてPreview Widthを表示する。

---

# 42. Preview Canvas

Form SchemaをForm Rendererへ渡す。

```text
Form Schema
     ↓
Form Renderer
     ↓
Preview Canvas
```

PreviewはForm Schemaを変更しない。

---

# 43. Form Renderer

Form RendererはField Typeに応じて適切なUIを描画する。

```text
Text
   ↓
Input

Textarea
   ↓
Textarea

Select
   ↓
Select

Radio
   ↓
Radio Group
```

RendererはGeneratorとは独立する。

---

# 44. Preview Interaction

Previewでは基本的なForm Interactionを確認できる。

対象:

- Input
- Textarea
- Select
- Radio
- Checkbox
- Submit Button

必要に応じてValidation Stateを確認できる。

---

# 45. Preview Submit

PreviewでのSubmitは、実際の外部Serverへデータを送信しない。

FormlyはForm Submission Serviceではない。

Previewでは必要に応じて、

```text
Preview submission
```

としてUI上の動作だけを確認する。

ユーザーデータを外部へ送信しない。

---

# 46. Preview Empty State

Formが存在しない場合:

```text
No form to preview.

Create a form in the Builder.
```

CTA:

```text
Go to Builder
```

---

# 47. Preview Error State

Invalid Schemaの場合:

```text
Unable to render this form.

The form schema is invalid.
```

Action:

```text
Back to Builder
Reset Form
```

---

# 48. Preview Loading

Form Schemaを復元する必要がある場合のみ表示する。

Skeleton:

```text
Form Container
Form Field
Button
```

---

# 49. Preview Responsive

## Desktop

中央にFormを配置する。

## Tablet

Form WidthをViewportに合わせて調整する。

## Mobile

Form Width:

```text
100%
```

ただし左右Paddingを確保する。

---

# 50. Preview Accessibility

- Semantic Form
- Label association
- Keyboard Navigation
- Focus State
- Error Message
- Color Contrast
- Accessible Button
- Accessible Input

Generated FormのAccessibility要件も確認できるようにする。

---

# 51. Preview Animation

基本的に控えめにする。

- Device Preview Transition
- Form Field Focus
- Validation Feedback
- Toast

フォーム操作そのものを妨げるAnimationは禁止する。

---

# 52. SCR-004 Generated Code

## 52.1 画面概要

### Screen ID

```text
SCR-004
```

### Screen Name

```text
Generated Code
```

### URL

```text
/code
```

### Purpose

Form Schemaから生成されたHTML / CSS / JavaScriptを確認し、Copy / Exportする。

---

# 53. Code Layout

```text
+------------------------------------------------------------+
| Header                                                     |
+------------------------------------------------------------+
| Code Toolbar                                               |
+------------------------------------------------------------+
| HTML | CSS | JavaScript                                    |
+------------------------------------------------------------+
|                                                            |
| Code Viewer                                                |
|                                                            |
|                                                            |
+------------------------------------------------------------+
| Copy                         Export                        |
+------------------------------------------------------------+
```

---

# 54. Code Header

表示:

- Back to Builder
- Preview
- Settings

---

# 55. Code Toolbar

Action:

```text
Copy
Export
```

必要に応じて:

```text
Download
```

を提供する。

---

# 56. Code Tabs

Tabs:

```text
HTML
CSS
JavaScript
```

選択されたTabのみCode Viewerへ表示する。

---

# 57. HTML Output

HTML Generatorから生成されたHTMLを表示する。

目標:

- Semantic
- Readable
- Accessible
- Standalone

---

# 58. CSS Output

CSS Generatorから生成されたCSSを表示する。

対象:

- Layout
- Typography
- Field Style
- Button
- State
- Responsive
- Configured appearance tokens

出力形式:

```text
css       スタンドアロン CSS（デフォルト）
tailwind  HTML に Tailwind utility。CSS タブは JS 用の companion stylesheet
```

Code 画面で切り替え可能。値は Form Schema の `appearance.cssFlavor` に保存する。

Liquid Glass と page backdrop も Appearance Tokens から同じ CSS / HTML に出力する。生成 CSS が backdrop 画像を参照する場合、ホスト側に `backdrops/{id}.avif` を置く。

---

# 59. JavaScript Output

JavaScript Generatorから生成されたJavaScriptを表示する。

対象:

- Validation
- Interaction
- Form behavior

Generated JavaScriptはFormly本体へ依存しない。

---

# 60. Code Viewer

Code Viewerは読みやすさを優先する。

機能:

- Syntax Highlighting
- Line Number where useful
- Copy
- Horizontal Scroll
- Selectable Text

MobileではHorizontal Scrollを許可する。

---

# 61. Copy Code

Copyボタンを押すとClipboardへCodeをコピーする。

Success:

```text
Copied to clipboard.
```

Error:

```text
Failed to copy code.
```

Clipboard APIが利用できない場合でも、ユーザーが手動Copyできるようにする。

---

# 62. Export Code

Export対象:

```text
HTML
CSS
JavaScript
```

可能であればCombined Exportも提供する。

Export方式の詳細は実装時に決定する。

---

# 63. Code Empty State

Formが存在しない場合:

```text
No code generated yet.

Create a form in the Builder.
```

CTA:

```text
Go to Builder
```

---

# 64. Code Error State

Generator Error:

```text
Unable to generate code.

Please check your form configuration.
```

Action:

```text
Back to Builder
```

---

# 65. Code Loading

Code Generationが同期処理で十分高速な場合はLoading UIを表示しない。

処理時間が長くなった場合のみSkeleton / Progressを表示する。

---

# 66. Code Responsive

## Desktop

Code Viewerを広く表示する。

## Tablet

Viewer Widthを調整する。

## Mobile

Horizontal Scrollを使用する。

Codeを無理に折り返して可読性を低下させない。

---

# 67. Code Accessibility

- Keyboard Tab
- Accessible Tabs
- Accessible Buttons
- Focus Ring
- Copy Status announcement
- Sufficient Contrast

Copy成功などのStatusは必要に応じてScreen Readerへ通知する。

---

# 68. Code Animation

Animationは最小限とする。

- Tab transition
- Toast
- Copy feedback

Code Viewer自体には不要なAnimationを追加しない。

---

# 69. SCR-005 Application Settings

## 69.1 画面概要

### Screen ID

```text
SCR-005
```

### Screen Name

```text
Application Settings
```

### URL

```text
/settings
```

### Purpose

Application全体の設定を管理する。

ログインやAccount管理は提供しない。

---

# 70. Settings Layout

```text
+------------------------------------------------------------+
| Header                                                     |
+------------------------------------------------------------+
|                                                            |
| Application Settings                                       |
|                                                            |
| Appearance                                                 |
| Language                                                   |
| Local Data                                                 |
| About                                                      |
|                                                            |
+------------------------------------------------------------+
```

---

# 71. Appearance

設定項目:

```text
Theme
```

選択:

```text
Light
Dark
System
```

---

# 72. Language

選択:

```text
日本語
English
中文
한국어
```

変更時にApplication UIを更新する。

User-generated Form Contentは自動翻訳しない。

---

# 73. Local Data

操作:

```text
Clear Local Data
Reset Application Data
```

破壊的操作にはConfirmation Dialogを表示する。

```text
This will remove your locally saved forms.

Are you sure?
```

---

# 74. About

表示:

```text
Formly
Version
GitHub
Documentation
```

---

# 75. Settings States

### Loading

設定読み込みが必要な場合のみ。

### Saving

設定変更時。

### Success

```text
Settings saved.
```

### Error

```text
Failed to save settings.
```

---

# 76. Settings Responsive

## Desktop

Settings Sectionを広く表示する。

## Tablet

Content Widthを調整する。

## Mobile

Single Column。

各Sectionを縦方向へ配置する。

---

# 77. Settings Accessibility

- Semantic Heading
- Keyboard Navigation
- Accessible Labels
- Focus Ring
- Accessible Controls
- Confirmation Dialog Accessibility

---

# 78. Settings Animation

最小限とする。

- Dialog
- Drawer
- Toast

などのUI Transitionのみ使用する。

---

# 79. Form Schema Detail

Form Schemaの詳細構造は以下の概念を基本とする。

```text
FormSchema
├── version
├── id
├── name
├── description
├── fields[]
│   ├── id
│   ├── type
│   ├── label
│   ├── placeholder
│   ├── required
│   ├── options
│   └── validation
└── settings
```

実際のType DefinitionはArchitecture / Implementation段階で確定する。

---

# 80. Field Type Design

## Text

```text
type: text
```

設定:

- Label
- Placeholder
- Required
- Min Length
- Max Length

---

## Email

```text
type: email
```

設定:

- Label
- Placeholder
- Required

---

## Number

```text
type: number
```

設定:

- Label
- Placeholder
- Required
- Min
- Max
- Step

---

## Textarea

```text
type: textarea
```

設定:

- Label
- Placeholder
- Required
- Min Length
- Max Length

---

## Select

```text
type: select
```

設定:

- Label
- Placeholder
- Required
- Options

---

## Radio

```text
type: radio
```

設定:

- Label
- Required
- Options

---

## Checkbox

```text
type: checkbox
```

設定:

- Label
- Required
- Options where applicable

---

## Submit Button

```text
type: submit
```

設定:

- Label

---

# 81. Form Validation

ValidationはForm Schemaを基準とする。

```text
Form Schema
     ↓
Validation Rules
     ↓
Preview
     ↓
Generated JavaScript
```

Validation Rulesは可能な限り同じDefinitionから生成する。

Builder UIだけに存在するValidation Ruleを作らない。

---

# 82. LocalStorage Detail

Persistence Layerを介してアクセスする。

概念:

```text
saveForm(schema)
loadForm()
deleteForm()
clearForms()
```

Application Componentsから直接LocalStorage APIを呼び出さない。

---

# 83. Schema Validation

以下のタイミングでValidationする。

```text
Import
LocalStorage Load
Form Update
Generator Input
Preview Input
```

Invalid DataはApplicationへそのまま渡さない。

---

# 84. Generator Detail

## Generator Input

```text
FormSchema
```

## Generator Output

```text
{
  html: string,
  css: string,
  javascript: string
}
```

## Generator Principle

GeneratorはPure Functionに近い構造を優先する。

```text
FormSchema
    ↓
Generator
    ↓
Output
```

外部Stateへ依存しないことを基本とする。

---

# 85. Generator Error

Generatorが不正なSchemaを受け取った場合は、生成を中止する。

```text
Invalid Form Schema
```

を返す。

ApplicationはError Stateを表示する。

---

# 86. Builder / Preview / Generator Relationship

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
          └───────┬──────┘
                  ↓
             LocalStorage
```

この関係を崩さない。

---

# 87. Error / Empty / Loading Convention

各Screenでは以下のStateを必要に応じて実装する。

```text
Initial
Loading
Loaded
Empty
Error
Success
```

## Empty State

単に「データがありません」と表示するだけではなく、可能な限り次のActionを提供する。

例:

```text
No form yet.

[Create a Form]
```

---

# 88. Toast Convention

Toastは短時間で消える補助的なFeedbackとして使用する。

Success:

```text
Form saved.
```

```text
Copied to clipboard.
```

Error:

```text
Failed to save.
```

Toastだけに重要な情報を依存しない。

---

# 89. Dialog Convention

破壊的操作や重要な確認に使用する。

対象:

```text
Reset Form
Clear Local Data
Delete Field where necessary
Discard Changes where necessary
```

Dialogには、

```text
Cancel
Confirm
```

を明確に表示する。

---

# 90. Mobile Navigation

MobileではApplication HeaderからNavigationを開けるようにする。

候補:

```text
Menu
Drawer
Sheet
```

Navigation:

```text
Home
Builder
Preview
Code
Settings
```

BuilderではNavigationよりも編集領域を優先する。

---

# 91. Keyboard Shortcuts

将来的な操作性向上のため、以下を候補とする。

```text
Ctrl / Cmd + S
Save

Ctrl / Cmd + Z
Undo

Ctrl / Cmd + Shift + Z
Redo

Ctrl / Cmd + Enter
Preview
```

実装時にBrowser標準ショートカットとの競合を確認する。

必須機能ではない。

---

# 92. Accessibility Detail

## Keyboard

すべてのInteractive ElementをKeyboardで操作可能にする。

## Focus

Focus状態をVisualに確認できる。

## Drag & Drop

Drag & Dropだけに依存しない。

## Form

LabelとInputを正しく関連付ける。

## Error

Error MessageとFieldの関連を明確にする。

## Status

Save / Copy / ExportなどのStatusを必要に応じてAssistive Technologyへ通知する。

---

# 93. Internationalization Detail

Translation KeyはUI Textと分離する。

例:

```text
builder.addField
builder.save
builder.preview
builder.export
builder.empty
builder.error
```

User-generated content:

```text
Label
Placeholder
Description
```

はTranslation Keyへ変換しない。

---

# 94. Responsive Breakpoint Design

具体的なBreakpoint値はUI Guidelineで定義する。

基本方針:

```text
Desktop
Tablet
Mobile
```

とする。

Component単位でもResponsive behaviorを考慮する。

---

# 95. Performance Detail

## Builder

Form Schema全体を毎回不要に再Renderしない。

## Preview

必要なFieldのみ更新する。

## Code

Generatorは必要なタイミングで実行する。

## LocalStorage

頻繁な操作ごとに無制限にWriteしない。

## Navigation

Route変更時に不要な処理を実行しない。

---

# 96. Security Detail

## Import

```text
File
 ↓
Parse
 ↓
Validate
 ↓
Normalize
```

## LocalStorage

読み込んだDataを信頼しない。

## Preview

Generated JavaScriptを直接実行しない。

## Generator

HTML / JavaScript生成時に必要なEscapingを行う。

## User Content

以下をUntrusted Dataとして扱う。

```text
Label
Placeholder
Description
Options
Form Name
```

---

# 97. Testing Detail

## Builder

Test:

- Add Field
- Delete Field
- Select Field
- Configure Field
- Reorder Field
- Duplicate Field
- Save
- Restore
- Import
- Export

## Preview

Test:

- Render Field
- Render Form
- Responsive Preview
- Invalid Schema

## Generator

Test:

- HTML Output
- CSS Output
- JavaScript Output
- Invalid Schema

## Code

Test:

- Copy
- Export
- Error Handling

## Settings

Test:

- Theme Change
- Language Change
- Clear Local Data

---

# 98. E2E User Journey

最重要E2E Flow:

```text
Landing
   ↓
Start Building
   ↓
Builder
   ↓
Add Text Field
   ↓
Configure Label
   ↓
Add Email Field
   ↓
Add Textarea
   ↓
Preview
   ↓
Code
   ↓
Copy HTML
```

このFlowが正常に動作することをCore Productの重要なAcceptance Criteriaとする。

---

# 99. Feature Structure

想定構成:

```text
features/
│
├── builder/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── ...
│
├── preview/
│   ├── components/
│   ├── hooks/
│   └── ...
│
├── code/
│   ├── components/
│   ├── hooks/
│   └── ...
│
└── settings/
    ├── components/
    ├── hooks/
    └── ...
```

---

# 100. Form Schema Structure

Form Schema関連:

```text
form-schema/
├── types.ts
├── schema.ts
├── validation.ts
├── serialization.ts
├── normalization.ts
└── persistence.ts
```

実装時に必要なファイルのみ作成する。

---

# 101. Generator Structure

```text
generators/
├── html/
│   └── generate-html.ts
│
├── css/
│   └── generate-css.ts
│
└── javascript/
    └── generate-javascript.ts
```

Generatorは互いに不要な依存関係を持たない。

---

# 102. Component Naming

Component名は役割が明確になるようにする。

例:

```text
FieldPalette
FormCanvas
FieldSettings
BuilderPreview
PreviewCanvas
CodeViewer
CodeTabs
ApplicationSettings
LanguageSwitcher
```

曖昧な名前:

```text
Manager
Container
Thing
Helper
```

などは可能な限り避ける。

---

# 103. Component Responsibility

Componentは単一の明確な責務を持つ。

例えば:

```text
FieldPalette
```

はField追加UIを担当する。

```text
FieldSettings
```

はSelected Fieldの設定UIを担当する。

```text
FormCanvas
```

はFormの編集領域を担当する。

Builder全体のLogicを1つの巨大Componentへ集約しない。

---

# 104. Hooks

Custom HookはUIとState / Behaviorを分離するために使用する。

候補:

```text
useFormBuilder()
useFormSchema()
useFormPersistence()
useFormPreview()
useCodeGeneration()
useClipboard()
useSettings()
useI18n()
```

ただし、必要になる前に作成しない。

---

# 105. Future Extensions

将来的に以下のFeatureを追加する可能性がある。

```text
Templates
Cloud Storage
Authentication
Form Hosting
Submission Management
Collaboration
```

追加時にはScreen / Route / Architecture / State / Security / Testingを再設計する。

---

# 106. Definition of Done

Screen / Featureは以下を満たした場合に完了とする。

- UIが実装されている
- Responsive対応されている
- Accessibilityを確認している
- Loading Stateを必要に応じて実装している
- Empty Stateを必要に応じて実装している
- Error Stateを必要に応じて実装している
- i18nを確認している
- Unit Testがある
- Integration Testが必要な場合に実装されている
- E2E Testが必要な場合に実装されている
- ESLintが通過する
- TypeScriptが通過する
- Prettierが適用されている
- 関連Documentationが更新されている

---

# 107. Design Consistency

すべてのScreenで以下を統一する。

- Header
- Navigation
- Typography
- Spacing
- Button
- Form Controls
- Toast
- Dialog
- Focus State
- Error State
- Empty State

詳細なVisual Designは:

```text
docs/06_ui-guideline.md
```

で定義する。

---

# 108. Related Documents

本詳細設計書は以下と連携する。

```text
docs/product.md
docs/roadmap.md
docs/screen-list.md
docs/01_requirements.md
docs/02_basic-design.md
docs/04_architecture.md
docs/05_component_design.md
docs/06_ui-guideline.md
docs/development-log.md
```

Cursor Rules:

```text
.cursor/rules/architecture.mdc
.cursor/rules/coding.mdc
.cursor/rules/testing.mdc
.cursor/rules/ui.mdc
.cursor/rules/routing.mdc
.cursor/rules/i18n.mdc
.cursor/rules/forms.mdc
.cursor/rules/state-management.mdc
.cursor/rules/security.mdc
.cursor/rules/performance.mdc
.cursor/rules/cloudflare.mdc
```

---

# 109. Final Detail Design

Formlyの詳細設計上の中心構造は以下とする。

```text
                         User
                          │
                          ▼
                       Builder
                          │
                          ▼
                     Form Schema
                    /     │      \
                   /      │       \
                  ▼       ▼        ▼
            LocalStorage Preview Generator
                             │        │
                             │    ┌───┼───┐
                             │    ▼   ▼   ▼
                             │   HTML CSS JS
                             │
                             ▼
                          Renderer
                             │
                             ▼
                          Preview
```

Core Product Loop:

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

このLoopを中心にUI、State、Component、Generator、Persistenceを設計する。

Formlyは、機能を増やすことよりも、

> **Build forms visually. Export clean code.**

というCore Valueを高品質に実現することを優先する。
````
