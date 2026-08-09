# Screen List

Version: 1.0

---

# 1. Overview

本ドキュメントは、Formlyにおける画面一覧と各画面の責務を定義する。

画面ごとの詳細なUI仕様・インタラクション・状態については、`docs/03_detail_design.md` を参照する。

本ドキュメントでは、以下を管理する。

- Screen ID
- Screen Name
- Route
- Authentication Requirement
- Purpose
- Main Features
- Primary Components
- Responsive Behavior
- Loading / Empty / Error State
- Related Documents

Formlyはログインを必要としないブラウザベースのForm Builderである。

現在のFormlyでは、FormデータはLocalStorageへ保存する。

---

# 2. Screen Architecture

Formlyの画面構成は以下とする。

```text
Formly
│
├── Landing
│   └── Home
│
└── Application
    │
    ├── Form Builder
    │   └── Builder Preview
    │
    ├── Form Preview
    │
    ├── Generated Code
    │
    └── Application Settings
```

基本的なユーザーフローは以下とする。

```text
Landing
   ↓
Builder
   ↓
Builder Preview
   ↓
Preview
   ↓
Generated Code
```

BuilderからPreviewおよびCodeへ直接移動することもできる。

---

# 3. Screen Summary

| ID      | Screen               | Route         | Auth | Priority | Status  |
| ------- | -------------------- | ------------- | ---- | -------- | ------- |
| SCR-001 | Landing / Home       | `/`           | No   | P0       | Implemented |
| SCR-002 | Form Builder         | `/builder`    | No   | P0       | Planned |
| SCR-003 | Form Preview         | `/preview`    | No   | P0       | Planned |
| SCR-004 | Generated Code       | `/code`       | No   | P0       | Planned |
| SCR-005 | Application Settings | `/settings`   | No   | P1       | Planned |
| SCR-006 | Responsive Layout    | Responsive UI | No   | P0       | Planned |
| SCR-007 | Form Templates       | `/templates`  | No   | P1       | Implemented |

---

# 4. Screen ID Convention

Screen IDは以下の形式とする。

```text
SCR-XXX
```

例:

```text
SCR-001
SCR-002
SCR-003
```

画面を新規追加する場合は既存IDを変更せず、新しいIDを採番する。

削除されたScreen IDは再利用しない。

---

# 5. Authentication

Formlyの現在のバージョンではAuthenticationを必要としない。

すべての画面をログインなしで利用できる。

```text
Authentication

Not Required
```

Formlyはユーザーアカウントを持たず、FormデータをLocalStorageに保存する。

将来的にAuthenticationやCloud Storageを導入する場合は、画面構成と本ドキュメントを改訂する。

---

# 6. Landing / Home

## SCR-001 — Landing / Home

### Route

```text
/
```

### Authentication

不要。

### Purpose

Formlyの概要を紹介し、ユーザーをForm Builderへ誘導する。

案件獲得を意識したPortfolio / Product Presentationの役割も持つ。

ユーザーが短時間で、

> 「Formlyで何ができるのか」

を理解できることを目的とする。

### Main Features

- Formly Introduction
- Product Value Proposition
- Start Building CTA
- Feature Overview
- Form Builder Introduction
- Preview Introduction
- Code Generation Introduction
- Responsive Design Introduction
- Accessibility Introduction
- Technology Overview
- Demo Introduction
- GitHub Link
- Language Switcher

### Primary UI

```text
Header
Hero Section
Product Introduction
Primary CTA
Feature Section
How It Works
Preview / Demo Section
Technology Section
Footer
```

### Primary CTA

ユーザーを以下へ誘導する。

```text
/builder
```

CTAの例:

```text
Start Building
```

### States

```text
Default
Loading
```

Landingは基本的に静的なコンテンツを中心とするため、複雑なLoading / Empty / Error Stateは必要としない。

### Responsive

Desktop / Tablet / Mobileに対応する。

DesktopではHeroおよびFeature Sectionを複数Columnで表示できる。

MobileではSingle Columnへ変更する。

### Related Design

```text
docs/03_detail_design.md
docs/06_ui-guideline.md
```

---

# 7. Form Builder

## SCR-002 — Form Builder

### Route

```text
/builder
```

### Authentication

不要。

### Purpose

Formlyの中心となる画面。

ユーザーがフォームを視覚的に作成・編集する。

以下の操作を一つの画面で完結できることを目的とする。

```text
Create
  ↓
Configure
  ↓
Reorder
  ↓
Preview
```

### Main Features

- Create Form
- Add Field
- Remove Field
- Select Field
- Configure Field
- Reorder Field
- Duplicate Field
- Form Settings
- Field Settings
- Builder Preview
- Undo / Redo where appropriate
- LocalStorage Save
- LocalStorage Restore
- New Form
- Reset Form
- Import Form Schema
- Export Form Schema
- Navigate to Preview
- Navigate to Generated Code

### Initial Field Types

初期バージョンでは、以下のField Typeを基本とする。

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

実際の対応Field Typeは`docs/01_requirements.md`で定義する。

### Primary UI

```text
┌─────────────────────────────────────────────────────────┐
│ Header                                                  │
├──────────────┬────────────────────────┬─────────────────┤
│              │                        │                 │
│ Field        │ Form Canvas            │ Field Settings │
│ Palette      │                        │                 │
│              │                        │                 │
│              │                        │                 │
├──────────────┴────────────────────────┴─────────────────┤
│ Builder Toolbar / Preview Controls                      │
└─────────────────────────────────────────────────────────┘
```

### Field Palette

Field Paletteには利用可能なField Typeを表示する。

ユーザーはFieldを選択してForm Canvasへ追加できる。

### Form Canvas

Form Canvasには現在のForm Schemaに基づいたFieldを表示する。

ユーザーはFieldを選択、並び替え、削除できる。

### Field Settings

選択したFieldの設定を編集する。

代表的な設定:

```text
Label
Placeholder
Required
Options
Validation
```

Field Typeによって設定可能な項目は異なる。

### Builder Preview

Builder画面内にPreview機能を提供する。

ユーザーはBuilderを離れずに、現在のFormがどのように表示されるか確認できる。

Builder Previewは独立した`/preview`とは異なり、編集作業を補助するためのPreviewとして扱う。

### Form Schema

BuilderはForm SchemaをCanonical Sourceとして使用する。

```text
Builder
   ↓
Form Schema
   ├── Preview
   ├── Generator
   └── LocalStorage
```

Builder専用の別Formデータを持たない。

### States

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

### Empty State

新規Formの場合、Form CanvasにFieldが存在しない。

以下のようなCTAを表示する。

```text
Start building your form
Add your first field
```

### Error State

Form Schemaが不正な場合やLocalStorageの読み込みに失敗した場合は、ユーザーが復旧方法を理解できるError Stateを表示する。

### Responsive

Desktop:

```text
Field Palette
+
Form Canvas
+
Field Settings
```

の3領域を基本とする。

Tabletでは各Panelの幅を調整する。

Mobileでは3領域を縦方向またはDrawer / Sheet等へ変更する。

MobileでField Settingsを常時表示する必要はない。

### Related Design

```text
docs/03_detail_design.md
docs/05_component_design.md
docs/06_ui-guideline.md
.cursor/rules/forms.mdc
.cursor/rules/state-management.mdc
```

---

# 8. Form Preview

## SCR-003 — Form Preview

### Route

```text
/preview
```

### Authentication

不要。

### Purpose

現在のForm Schemaから生成されるFormを、独立した画面で確認する。

Builder内Previewよりも広い表示領域を使用し、ユーザーが実際のWebサイト上での表示を確認しやすくする。

### Main Features

- Form Rendering
- Field Rendering
- Form Layout
- Responsive Preview
- Validation Preview
- Interaction Preview
- Device Size Preview
- Back to Builder
- Navigate to Generated Code

### Primary UI

```text
Header
Preview Toolbar
Device / Viewport Controls
Form Preview Canvas
Preview Actions
```

### Preview Canvas

Form SchemaからFormを描画する。

```text
Form Schema
     ↓
Form Renderer
     ↓
Preview
```

PreviewはBuilderと同じForm Schemaを使用する。

### Preview Modes

必要に応じて以下のViewportを確認できる。

```text
Desktop
Tablet
Mobile
```

### States

```text
Loading
Loaded
Empty
Invalid Schema
Error
```

### Empty State

Formが存在しない場合:

```text
No form to preview.

Create a form in the Builder.
```

などのメッセージとBuilderへのCTAを表示する。

### Error State

Form Schemaが不正な場合はPreviewを安全に停止し、エラー内容と復旧方法を表示する。

### Responsive

Preview自体をDesktop / Tablet / Mobileで利用できるようにする。

Preview対象のFormもResponsive behaviorを確認できるようにする。

### Security

Previewではユーザー入力や生成コードを信頼しない。

Generated JavaScriptをFormly本体の実行コンテキストで無制限に実行しない。

Previewのセキュリティ要件は:

```text
.cursor/rules/security.mdc
```

で定義する。

### Related Design

```text
docs/03_detail_design.md
docs/06_ui-guideline.md
.cursor/rules/security.mdc
.cursor/rules/performance.mdc
```

---

# 9. Generated Code

## SCR-004 — Generated Code

### Route

```text
/code
```

### Authentication

不要。

### Purpose

Form Schemaから生成されたHTML / CSS / JavaScriptを確認し、ユーザーが自分のWebサイトへ持ち出せるようにする。

### Main Features

- HTML Output
- CSS Output
- JavaScript Output
- Code Tabs
- Syntax Highlighting
- Copy to Clipboard
- Download / Export
- Code Preview
- Back to Builder
- Navigate to Preview

### Primary UI

```text
Header
Code Toolbar
Code Tabs
Code Editor / Viewer
Copy Button
Download Button
```

### Code Tabs

```text
HTML
CSS
JavaScript
```

### HTML

生成されたHTMLを表示する。

### CSS

生成されたCSSを表示する。

### JavaScript

生成されたJavaScriptを表示する。

### Code Quality

生成コードは、

- Readable
- Maintainable
- Semantic
- Responsive
- Accessible where practical

であることを目標とする。

### States

```text
Loading
Generated
Empty
Generation Error
Copy Success
Copy Error
Export Error
```

### Empty State

Formが存在しない場合:

```text
No code generated yet.

Create a form in the Builder.
```

などを表示する。

### Generated Code Security

Generated HTML / CSS / JavaScriptはユーザーへ提供するOutputであり、Formly本体のコードと同一の実行コンテキストで扱わない。

Generated JavaScriptをFormly本体で直接実行しない。

### Responsive

DesktopではCode Viewerを広く表示する。

Tablet / MobileではCode Viewerを横スクロール可能にする。

Code自体を無理に折り返して可読性を損なわない。

### Related Design

```text
docs/03_detail_design.md
docs/05_component_design.md
docs/06_ui-guideline.md
.cursor/rules/security.mdc
.cursor/rules/performance.mdc
```

---

# 10. Application Settings

## SCR-005 — Application Settings

### Route

```text
/settings
```

### Authentication

不要。

### Purpose

Formlyアプリケーション全体の設定を管理する。

現在はログインやアカウント管理を提供しないため、Settingsは必要最小限とする。

### Sections

```text
Appearance
Language
Editor / Builder
Local Data
About
```

### Appearance

- Theme
- Light / Dark / System
- UI Preferences

### Language

以下の言語を選択できる。

```text
日本語
English
中文
한국어
```

### Editor / Builder

将来的にBuilderに関するユーザー設定を追加できる。

現時点では必要な設定のみ提供する。

### Local Data

LocalStorageに保存されているFormデータに関する操作を提供する。

例:

```text
Clear Local Data
Reset Application Data
```

破壊的操作には確認UIを表示する。

### About

以下を表示する。

```text
Formly
Version
GitHub
Documentation
```

### States

```text
Loaded
Saving
Saved
Validation Error
Error
```

### Responsive

Desktop / Tablet / Mobileに対応する。

MobileではSettings Sectionを縦方向に配置する。

### Related Design

```text
docs/03_detail_design.md
docs/06_ui-guideline.md
.cursor/rules/i18n.mdc
```

---

# 11. Responsive Layout

## SCR-006 — Responsive Layout

### Type

Responsive Layout

### Route

すべてのApplication Screenに適用する。

### Purpose

Desktop UIを単純に縮小するのではなく、Tablet / Mobileでも適切な操作体系を提供する。

### Main Features

- Responsive Header
- Responsive Navigation
- Mobile Navigation
- Drawer
- Sheet
- Touch Interaction
- Horizontal Scroll
- Responsive Builder
- Responsive Preview
- Responsive Code Viewer

### Desktop

基本的に広い画面を活用する。

Builderでは、

```text
Field Palette
Form Canvas
Field Settings
```

の複数Column構成を基本とする。

### Tablet

DesktopとMobileの中間レイアウトとする。

必要に応じてPanelの幅や配置を変更する。

### Mobile

Mobileでは以下を優先する。

- Touch操作
- 縦方向レイアウト
- Drawer / Sheet
- Horizontal Scroll
- 大きめの操作領域
- 明確なNavigation

### Builder Mobile

Builderでは、以下のような構成を想定する。

```text
Header
    ↓
Form Canvas
    ↓
Field Palette / Add Field
    ↓
Field Settings
```

Field Settingsは必要に応じてSheet / Drawerとして表示する。

### Preview Mobile

PreviewではFormをMobile viewportで確認できる。

### Code Mobile

Code Viewerでは長いコードを横方向へスクロールできるようにする。

### Responsive Rule

```text
Desktop
    ↓
Tablet
    ↓
Mobile
```

各BreakpointでLayoutを適切に変更する。

単純なDesktop縮小を基本方針としない。

---

# 12. Global Layout

FormlyではLandingとApplicationでLayoutを分ける。

## Landing Layout

```text
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤
│                                         │
│ Main Content                            │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

LandingではProduct Presentationを優先する。

---

## Application Layout

Builder / Preview / Code / Settingsでは共通Application Layoutを使用する。

```text
┌─────────────────────────────────────────┐
│ Application Header                      │
├─────────────────────────────────────────┤
│                                         │
│ Main Content                            │
│                                         │
└─────────────────────────────────────────┘
```

FormlyはTask Managerのような常時表示Sidebarを必須としない。

画面幅とBuilderの操作性を優先し、必要に応じてHeader NavigationやMobile Navigationを使用する。

---

# 13. Global Header

Application Headerには、最低限以下を配置する。

```text
Formly Logo
Primary Navigation
Language Switcher
Theme / Appearance
Settings
```

Builderなど作業画面では、必要に応じて以下を追加する。

```text
Save Status
Preview
Code
Export
```

Headerは画面ごとに大きく異なるデザインを持たない。

---

# 14. Primary Navigation

Primary Navigationは主要画面へアクセスできるようにする。

基本構成:

```text
Home
Builder
Preview
Code
Settings
```

ただし、LandingからApplicationへ入る導線を明確にし、Builderを主要CTAとして扱う。

### Mobile Navigation

MobileではNavigationを簡略化する。

必要に応じて:

```text
Menu
Drawer
Sheet
Bottom Navigation
```

などを利用する。

---

# 15. Builder Navigation

Builderから以下の画面へ移動できる。

```text
Builder
   ├── Preview
   └── Code
```

また、Builder内にPreviewを表示できる。

### Builder Actions

代表的なAction:

```text
New
Save
Import
Export
Preview
Code
Settings
```

ただし、すべてを常時表示する必要はない。

UI上の優先順位を考慮して配置する。

---

# 16. Screen Relationships

主要な画面遷移は以下とする。

```text
                 ┌─────────────┐
                 │   Landing   │
                 │      /      │
                 └──────┬──────┘
                        │
                        │ Start Building
                        ↓
                 ┌─────────────┐
                 │   Builder   │
                 │   /builder  │
                 └──┬─────┬────┘
                    │     │
          Builder   │     │
          Preview   │     │ Code
                    ↓     ↓
             ┌───────┐ ┌────────┐
             │Preview│ │  Code  │
             │/preview│ │ /code │
             └───┬───┘ └───┬────┘
                 │         │
                 └────┬────┘
                      ↓
                  /builder
```

SettingsはApplication全体からアクセスできる。

```text
Any Application Screen
        ↓
    /settings
```

---

# 17. LocalStorage Relationship

FormlyのForm dataはLocalStorageへ保存する。

```text
                ┌─────────────┐
                │ Form Schema │
                └──────┬──────┘
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
     Builder         Preview       Generator
        │                             │
        ↓                             ↓
   LocalStorage                  HTML/CSS/JS
```

LocalStorageはFormlyにおける永続化手段であり、サーバー側Databaseではない。

---

# 18. Form Schema as Source of Truth

Form Builder / Preview / Code Generatorは、同一のForm Schemaを使用する。

```text
                   Form Schema
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
     Builder         Preview       Generator
                                      │
                              ┌───────┼───────┐
                              ↓       ↓       ↓
                             HTML    CSS      JS
```

各画面が独自のForm data representationを持つことは禁止する。

---

# 19. Import / Export

Import / Exportは独立したScreenではない。

Builderの機能として提供する。

```text
/builder
    │
    ├── Import Form Schema
    │
    └── Export Form Schema
```

将来的にSchema管理が複雑になった場合は、専用画面を追加する可能性がある。

現在は独立Routeを作成しない。

---

# 20. Future Multi-Form Routes

現在の Canonical Routes（MVP）は単一 Form 前提とする。

```text
MVP
/
├── /builder
├── /preview
├── /code
└── /settings
```

将来、複数 Form の一覧・作成・編集が必要になった場合は、次の Route へ拡張する可能性がある。

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

制約:

- Future Route を MVP 実装時に導入しない
- Route 拡張時は `docs/04_architecture.md`・本ドキュメント・Cursor Rules を同時更新する

詳細は `docs/04_architecture.md` の「MVP Route Model vs Future Multi-Form Routes」を参照する。

---

# 21. Templates (SCR-007)

Route:

```text
/templates
```

Purpose:

- よく使う Form の雛形を閲覧する
- テンプレートをプレビューする
- テンプレートから単一の active Form Schema を作成する

Main Features:

- Template gallery（カテゴリフィルタ）
- Template preview（Form Schema の読み取りプレビュー）
- Create from template（確認後に LocalStorage の active form を置換し `/builder` へ遷移）

制約:

- テンプレート自体は永続化しない（静的バンドル）
- multi-form `/forms` は導入しない
- 適用後の編集は通常の Builder と同じ

初期テンプレート:

```text
Blank
Contact
Inquiry
Feedback
Newsletter
Reservation
```

Status: Implemented（Phase 8）

---

# 22. Authentication Boundary

現在のFormlyではAuthentication Boundaryを持たない。

```text
Public
│
├── /
├── /builder
├── /preview
├── /code
├── /templates
└── /settings
```

すべてPublic Application Screenとして扱う。

将来的にUser Accountを導入する場合は、本ドキュメントを更新する。

---

# 23. Error / Loading / Empty State Convention

各Screenでは、必要に応じて以下の状態を定義する。

```text
Initial
Loading
Loaded
Empty
Validation Error
Error
Success
```

データを必要としないScreenでは、不要なLoading Stateを無理に表示しない。

特にBuilder / Preview / Codeでは、Form Schemaの状態を考慮する。

---

# 24. Screen State Summary

| Screen   | Loading | Empty | Error   | Success |
| -------- | ------- | ----- | ------- | ------- |
| Landing  | Minimal | No    | Minimal | N/A     |
| Builder  | Yes     | Yes   | Yes     | Yes     |
| Preview  | Yes     | Yes   | Yes     | N/A     |
| Code     | Yes     | Yes   | Yes     | Yes     |
| Settings | Yes     | No    | Yes     | Yes     |

---

# 25. Responsive Screen Summary

| Screen   | Desktop          | Tablet             | Mobile            |
| -------- | ---------------- | ------------------ | ----------------- |
| Landing  | Multi-column     | Reduced columns    | Single column     |
| Builder  | 3-panel layout   | Reduced panels     | Stacked / Drawer  |
| Preview  | Full preview     | Responsive preview | Mobile preview    |
| Code     | Wide code viewer | Scrollable         | Horizontal scroll |
| Settings | Multi-section    | Reduced width      | Single column     |

---

# 26. Priority

Priorityは以下の基準とする。

```text
P0
Core Product
```

```text
P1
Important Product / UX
```

```text
P2
Future / Enhancement
```

現在の優先順位:

### P0

```text
SCR-001 Landing
SCR-002 Form Builder
SCR-003 Form Preview
SCR-004 Generated Code
SCR-006 Responsive Layout
```

### P1

```text
SCR-005 Application Settings
SCR-007 Form Templates
```

---

# 27. Current MVP Screen Scope

MVPでは以下のScreenを実装する。

```text
SCR-001
Landing

SCR-002
Form Builder

SCR-003
Form Preview

SCR-004
Generated Code

SCR-005
Application Settings

SCR-006
Responsive Layout

SCR-007
Form Templates
```

中心となるScreenは:

```text
SCR-002 Form Builder
```

である。

---

# 28. Core User Journey

Formlyの主要User Journeyは以下とする。

```text
1. Landing
      ↓
2. Start Building
      ↓
3. Form Builder
      ↓
4. Add Fields
      ↓
5. Configure Fields
      ↓
6. Builder Preview
      ↓
7. Full Preview
      ↓
8. Generated Code
      ↓
9. Copy / Export
```

途中でユーザーはBuilderへ戻り、Formを修正できる。

```text
Builder
   ↕
Preview
   ↕
Code
```

---

# 29. Definition of Done

Screenは以下を満たした場合に完成とする。

- Routeが実装されている。
- Screen責務が満たされている。
- Primary UIが実装されている。
- Loading Stateが必要な場合に実装されている。
- Empty Stateが必要な場合に実装されている。
- Error Stateが必要な場合に実装されている。
- Responsive behaviorが実装されている。
- Accessibilityが確認されている。
- i18nが確認されている。
- 関連するTestsが実装されている。
- 関連ドキュメントが更新されている。

---

# 30. Related Documents

Screen設計は以下のドキュメントと連携する。

```text
docs/product.md
docs/roadmap.md
docs/01_requirements.md
docs/02_basic-design.md
docs/03_detail_design.md
docs/04_architecture.md
docs/05_component_design.md
docs/06_ui-guideline.md
docs/development-log.md
```

関連するCursor Rules:

```text
.cursor/rules/architecture.mdc
.cursor/rules/routing.mdc
.cursor/rules/forms.mdc
.cursor/rules/state-management.mdc
.cursor/rules/ui.mdc
.cursor/rules/i18n.mdc
.cursor/rules/testing.mdc
.cursor/rules/security.mdc
.cursor/rules/performance.mdc
```

---

# 31. Screen Expansion Rules

新しいScreenを追加する場合:

1. Product requirementsを確認する。
2. Roadmapを確認する。
3. Screenの必要性を確認する。
4. Routeを決定する。
5. Screen IDを採番する。
6. Screen Summaryへ追加する。
7. Screen Architectureを更新する。
8. 関連する詳細設計を更新する。
9. React Routerの設計を更新する。
10. Testsを追加する。

単に機能を追加するためだけにScreenを増やさない。

既存Screen内で自然に提供できる機能は、独立Screenにしない。

---

# 32. Screen Design Principles

FormlyのScreen設計では以下を優先する。

### Focus

1つのScreenが明確な目的を持つこと。

### Simplicity

不要なScreenを作らないこと。

### Consistency

Navigation、Header、Button、StateなどのUIパターンを統一すること。

### Responsive

Desktopを単純に縮小するのではなく、Mobileに適した操作体系を提供すること。

### Accessibility

Keyboard、Focus、Label、Contrastなどを考慮すること。

### Internationalization

日本語、英語、中国語、韓国語でLayoutが破綻しないこと。

### Performance

Screen単位で不要なRenderingやNetwork Requestを発生させないこと。

### Product Focus

Form Builder → Preview → Generated CodeというCore Product Loopを中心にScreenを設計すること。

---

# 33. Final Screen Architecture

Formlyの現在のScreen Architectureは以下を正式な構成とする。

```text
Formly
│
├── Landing
│   └── /
│
└── Application
    │
    ├── Form Builder
    │   └── /builder
    │       └── Builder Preview
    │
    ├── Form Preview
    │   └── /preview
    │
    ├── Generated Code
    │   └── /code
    │
    └── Application Settings
        └── /settings
```

Core Product Loop:

```text
/builder
    ↓
/preview
    ↓
/code
```

Builder内Preview:

```text
/builder
    └── Preview Panel
```

LocalStorage:

```text
Form Schema
    ↓
LocalStorage
```

Import / Export:

```text
/builder
    ├── Import
    └── Export
```

Templates:

```text
Future
    └── /templates
```

Authentication:

```text
Not Required
```

Database:

```text
Not Required for Current Product
```

The current Formly product should remain lightweight and focused on:

> **Build forms visually. Export clean code.**
