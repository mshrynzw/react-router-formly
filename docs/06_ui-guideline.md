# UI Guideline

Version: 1.0

---

# 1. Purpose

本ドキュメントはFormlyのデザインシステムおよびUI実装ルールを定義する。

目的:

- UIの一貫性を保つ
- プロダクトとしての品質を維持する
- Cursor・Claude・ChatGPTが同じルールでUIを生成できるようにする
- Componentの再利用性を向上させる
- Responsive Designを統一する
- Accessibilityを確保する
- Builderの操作性を高める
- Portfolioとして高いVisual Qualityを実現する

Formlyは単なるDemoではなく、

> Build forms visually. Export clean code.

という価値を持った実用的な小規模Web Applicationとして設計する。

---

# 2. Design Philosophy

Formlyは以下のDesign Philosophyを目指す。

- Premium
- Minimal
- Modern
- Professional
- Developer-friendly
- Productive
- Clean
- Approachable

参考にするDesign Language:

- Linear
- Vercel
- Stripe
- Raycast
- Notion
- GitHub
- Framer
- Figma

ただし、既存サービスのUIをそのままコピーしない。

Formly独自のVisual Identityを維持する。

---

# 3. Product Visual Identity

FormlyのUIは、

```text
Professional
     +
Simple
     +
Technical
     +
Friendly
```

````

を基本とする。

「開発者向けツール」の雰囲気を持ちながら、Webデザイナーや小規模事業者にも分かりやすいUIを目指す。

---

# 4. Core UI Principle

最も重要な原則:

> Content first.

UI Decorationよりも、Form Builderの操作性とCode Previewの可読性を優先する。

特にBuilderでは、

```text
Field Palette
      ↓
Form Canvas
      ↓
Field Settings
```

という操作フローを明確にする。

---

# 5. Color Tokens

すべてのColorはDesign Tokenとして管理する。

画面固有のColorを直接指定してはいけない。

基本Token:

```css
:root {
  /* Background */

  --background: #ffffff;
  --background-subtle: #f8fafc;
  --surface: #ffffff;
  --surface-muted: #f1f5f9;

  /* Foreground */

  --foreground: #0f172a;
  --foreground-secondary: #475569;
  --foreground-muted: #64748b;

  /* Border */

  --border: #e2e8f0;
  --border-hover: #cbd5e1;

  /* Primary */

  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-foreground: #ffffff;

  /* Success */

  --success: #16a34a;
  --success-foreground: #ffffff;

  /* Warning */

  --warning: #d97706;
  --warning-foreground: #ffffff;

  /* Danger */

  --danger: #dc2626;
  --danger-foreground: #ffffff;

  /* Focus */

  --focus: #6366f1;
}
```

実際のColor TokenはTailwind / shadcn/uiのTheme Systemへ統合する。

---

# 6. Dark Theme

Dark Modeをサポートする。

基本:

```text
Light
Dark
System
```

Dark ThemeではColor Tokenを切り替える。

例:

```css
.dark {
  --background: #09090b;
  --background-subtle: #111113;
  --surface: #18181b;
  --surface-muted: #27272a;

  --foreground: #fafafa;
  --foreground-secondary: #a1a1aa;
  --foreground-muted: #71717a;

  --border: #27272a;
  --border-hover: #3f3f46;
}
```

Light / DarkでColorを直接ComponentへHardcodeしない。

---

# 7. Accent Color

FormlyのPrimary AccentはIndigo / Violet系を基本とする。

目的:

- Primary CTA
- Selected Field
- Active Navigation
- Focus State
- Links
- Important Actions

Accentを画面ごとに変更しない。

---

# 8. Semantic Colors

Semantic Color:

```text
Success
Warning
Danger
Info
```

を使用する。

例:

```text
Success
Form saved.

Warning
Unsaved changes.

Danger
Delete field.

Info
Preview mode.
```

Colorだけで意味を伝えない。

必要に応じてIcon / Text / `sr-only`を併用する。

---

# 9. Typography

## Font Family

日本語・英語・中国語・韓国語を考慮し、System Font Stackを基本とする。

例:

```css
font-family:
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

特定のWeb Fontへ過度に依存しない。

---

# 10. Typography Scale

基本:

| Usage           |    Size | Weight |
| --------------- | ------: | -----: |
| Hero            | 48–64px |    700 |
| Page Heading    |    32px |    700 |
| Section Heading |    24px |    600 |
| Subheading      |    18px |    600 |
| Body            |    16px |    400 |
| Small           |    14px |    400 |
| Caption         |    12px |    400 |

ResponsiveではHero Headingなどを適切に縮小する。

---

# 11. Line Height

基本:

| Usage   | Line Height |
| ------- | ----------: |
| Hero    |     1.1–1.2 |
| Heading |         1.2 |
| Body    |     1.5–1.6 |
| Caption |     1.4–1.5 |

長い日本語文章では読みやすさを優先する。

---

# 12. Font Weight

基本:

```text
Regular
400

Medium
500

Semibold
600

Bold
700
```

900などの極端に太いWeightは原則として使用しない。

---

# 13. Spacing

8px Gridを基本とする。

使用可能な値:

```text
4
8
12
16
24
32
40
48
64
80
96
128
```

可能な限りこのSpacing Scaleを使用する。

画面ごとに独自のSpacingを作らない。

---

# 14. Layout

## Maximum Container

```text
1440px
```

## Content Width

```text
1280px
```

## Header

```text
64px
```

を基本とする。

LandingではContent Widthを必要に応じて縮小する。

---

# 15. Application Layout

Application画面では以下を基本とする。

```text
+------------------------------------------------+
| Header                                         |
+------------------------------------------------+
|                                                |
| Main Content                                   |
|                                                |
+------------------------------------------------+
```

Builderでは必要に応じて3 Panel Layoutを使用する。

```text
+-------------------------------------------------------------+
| Header                                                      |
+-------------+---------------------------+------------------+
| Field       | Form Canvas               | Field Settings   |
| Palette     |                           |                  |
+-------------+---------------------------+------------------+
```

---

# 16. Builder Layout

Desktop:

```text
Field Palette
      │
      ▼
Form Canvas
      │
      ▼
Field Settings
```

実際には3 Column Layoutとする。

```text
+-----------+----------------------+----------------+
| Palette   | Canvas               | Settings       |
|           |                      |                |
| Fields    | Form                 | Label          |
|           |                      | Placeholder    |
|           |                      | Required       |
+-----------+----------------------+----------------+
```

---

# 17. Builder Panel Width

Desktopでは以下を目安とする。

```text
Field Palette
240–280px

Field Settings
280–360px

Form Canvas
Remaining Space
```

固定値にしすぎず、Viewportに応じて調整する。

---

# 18. Grid

Responsive Grid:

```text
Desktop
12 Columns

Tablet
8 Columns

Mobile
4 Columns
```

Grid Gap:

```text
16px
24px
```

画面の密度に応じて使い分ける。

---

# 19. Card

Cardは情報を論理的にグループ化するために使用する。

基本:

```text
Padding
24px

Gap
16px

Radius
16px
```

BuilderではCardを過剰に使用しない。

BuilderのPanelはBorder / Backgroundによって明確に区切る。

---

# 20. Radius

統一する。

| Usage  | Radius |
| ------ | -----: |
| Button |   10px |
| Input  |   10px |
| Card   |   16px |
| Dialog |   16px |
| Panel  |   12px |
| Badge  |  999px |

画面ごとにRadiusを変更しない。

---

# 21. Border

Borderは情報の区切りとして使用する。

基本:

```text
1px solid var(--border)
```

Hover:

```text
var(--border-hover)
```

過剰なBorderを使用しない。

---

# 22. Shadow

ShadowはElevationを表現するために使用する。

基本:

```text
Card
0 4px 16px rgba(0, 0, 0, 0.06)

Hover
0 8px 24px rgba(0, 0, 0, 0.10)

Dialog
0 24px 64px rgba(0, 0, 0, 0.20)
```

Dark ModeではShadowよりBorder / Surface Contrastを優先する。

---

# 23. Icon

Lucide Reactを採用する。

基本Size:

| Usage   | Size |
| ------- | ---: |
| Small   | 16px |
| Default | 20px |
| Large   | 24px |
| Hero    | 32px |

Stroke:

```text
1.75
```

を基本とする。

Iconを装飾目的だけで大量に使用しない。

---

# 24. Icon-only Button

Icon-only Buttonには必ずAccessible Labelを設定する。

例:

```text
aria-label="Delete field"
```

Tooltipも必要に応じて表示する。

---

# 25. Button

Button Variant:

```text
Primary
Secondary
Outline
Ghost
Danger
```

---

# 26. Button Style

## Primary

重要なAction:

```text
Start Building
Save
Export
```

Filled Buttonを使用する。

---

## Secondary

Secondary Action:

```text
Preview
Import
```

---

## Outline

補助的なAction。

---

## Ghost

NavigationやToolbarなど、視覚的に目立たせる必要がないAction。

---

## Danger

破壊的操作:

```text
Delete
Clear Local Data
Reset
```

---

# 27. Button Size

| Size    | Height |
| ------- | -----: |
| Small   |   36px |
| Default |   44px |
| Large   |   52px |

Builder ToolbarではSmall / Defaultを基本とする。

Landing CTAではLargeを使用できる。

---

# 28. Input

基本:

```text
Height
44–48px

Padding
12–16px

Radius
10px
```

States:

```text
Default
Hover
Focus
Error
Disabled
```

---

# 29. Textarea

TextareaはInputとVisual Languageを統一する。

```text
Padding
12–16px

Radius
10px
```

Minimum Height:

```text
120px
```

を基本とする。

---

# 30. Select

Selectはshadcn/uiを基本とする。

States:

```text
Default
Hover
Focus
Open
Disabled
Error
```

---

# 31. Checkbox / Radio

Native semanticsを維持する。

Labelを必ず関連付ける。

Click Targetは十分な大きさを確保する。

---

# 32. Form Builder Field

Builder上のFieldは以下の状態を持つ。

```text
Default
Hover
Selected
Dragging
Drop Target
Error
Disabled
```

Selected FieldはAccent ColorとBorder / Backgroundによって明確にする。

---

# 33. Selected Field

Selected Field:

```text
Accent Border
Subtle Accent Background
```

などで表現する。

Colorだけに依存せず、BorderやFocus Ringも併用する。

---

# 34. Drag & Drop

Drag & Dropを実装する場合:

- Drag Handleを表示する
- Drop Targetを明確にする
- Keyboard操作を提供する
- Screen Readerへの状態通知を考慮する

Drag中のAnimationは短くする。

---

# 35. Field Settings

Field SettingsはBuilderの右Panelに表示する。

MobileではSheet / Drawerとして表示する。

設定項目はSectionで整理する。

例:

```text
General
Validation
Options
Advanced
```

ただし、設定項目が少ない場合はSectionを過剰に増やさない。

---

# 36. Preview

Previewは「実際に生成されるフォーム」をできるだけ分かりやすく表示する。

Preview UI自体がForm Builder UIと混同されないようにする。

---

# 37. Preview Viewport

Viewport Selector:

```text
Desktop
Tablet
Mobile
```

を使用する。

Device Frameを過剰に装飾しない。

---

# 38. Code Viewer

Code Viewerは読みやすさを最優先する。

必須:

- Monospace Font
- Syntax Highlighting
- Horizontal Scroll
- Copy Action
- Tab Navigation

Codeを無理にWrapして可読性を落とさない。

---

# 39. Code Typography

Code:

```text
Font Size
13–14px

Line Height
1.5–1.7
```

Monospace Fontを使用する。

---

# 40. Navigation

Navigationはシンプルにする。

基本:

```text
Home
Builder
Preview
Code
Settings
```

ただしLandingではBuilderへのCTAを最優先する。

---

# 41. Header

Header:

```text
Height
64px
```

表示:

```text
Formly Logo
Navigation
Language
Theme
```

BuilderではApplication Actionも表示できる。

---

# 42. Mobile Navigation

MobileではNavigationをDrawer / Sheetへ切り替える。

Header:

```text
Logo
Menu Button
```

Menu:

```text
Home
Builder
Preview
Code
Settings
```

Icon-only Menu Buttonには`aria-label`を付ける。

---

# 43. Language Switcher

対応Language:

```text
日本語
English
中文
한국어
```

Language SwitcherはHeaderまたはSettingsから利用できる。

言語切替によってLayoutが崩れないようにする。

---

# 44. Japanese UI

日本語では英語よりText Widthが変化する場合がある。

Buttonなどの固定Widthを避ける。

例:

```text
padding
min-width
```

を基本とする。

---

# 45. Internationalized Layout

以下のLanguageでLayoutが破綻しないことを確認する。

```text
日本語
English
中文
한국어
```

特に:

- Navigation
- Button
- Dialog
- Settings
- Builder Toolbar

を重点的に確認する。

---

# 46. Theme Switcher

Theme:

```text
Light
Dark
System
```

切替はInstantまたは短いTransitionとする。

Theme変更によってLayoutを変更しない。

---

# 47. Motion

MotionはUI理解を補助する目的で使用する。

Animation Duration:

```text
Fast
0.15–0.2s

Default
0.25–0.35s

Slow
0.5s
```

---

# 48. Motion Ease

基本:

```text
ease-out
ease-in-out
```

を使用する。

過剰に弾むAnimationは使用しない。

---

# 49. Motion禁止事項

禁止:

- Bounce
- Elastic
- 過度なRotation
- 過度なScale
- 長すぎるTransition
- UI操作を妨げるAnimation

---

# 50. Reduced Motion

`prefers-reduced-motion`を尊重する。

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}
```

非必須Animationは抑制する。

---

# 51. Hover

HoverはDesktop Pointer Deviceで利用する。

Card:

```text
Subtle Shadow
Border Change
```

Button:

```text
Background Change
```

Input:

```text
Border Change
```

過度なTransformを使用しない。

---

# 52. Focus

Focusは必ず視覚的に確認できるようにする。

基本:

```text
Focus Ring
```

を使用する。

例:

```text
focus-visible:ring-2
```

などTailwind Utilityを利用する。

---

# 53. Loading

LoadingにはSkeletonを優先する。

ただし、非常に短時間の処理ではLoading UIを表示しない。

Builder:

```text
Canvas Skeleton
Settings Skeleton
```

Code:

```text
Code Viewer Skeleton
```

など、実際のLayoutを反映したSkeletonを使用する。

SpinnerだけのLoading UIを基本としない。

---

# 54. Empty State

Empty Stateには以下を基本的に含める。

- Icon / Illustration
- Title
- Description
- CTA

例:

```text
No fields yet

Start building your form by adding your first field.

[Add Field]
```

文字だけのEmpty Stateを避ける。

---

# 55. Builder Empty State

```text
No fields yet

Add your first field from the Field Palette.

[Add Field]
```

Field Paletteからも操作できるため、CTAは状況に応じて省略できる。

---

# 56. Preview Empty State

```text
No form to preview

Create a form in Builder first.

[Go to Builder]
```

---

# 57. Code Empty State

```text
No code generated

Create a form to generate clean HTML, CSS and JavaScript.

[Go to Builder]
```

---

# 58. Error State

Error Stateには以下を含める。

- Icon
- Title
- Description
- Recovery Action

例:

```text
Unable to load the form

The saved form data could not be restored.

[Try Again]
[Reset Form]
```

---

# 59. Toast

Toastは短いFeedbackに使用する。

表示位置:

```text
Top Right
```

Auto Close:

```text
3 sec
```

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

重要な情報をToastだけで伝えない。

---

# 60. Dialog

Dialog:

```text
Maximum Width
640px
```

Padding:

```text
24–32px
```

Backdrop:

```text
rgba(0, 0, 0, 0.5)
```

必要に応じてBackdrop Blurを使用する。

DialogではFocus TrapとFocus Returnを実装する。

---

# 61. Confirmation Dialog

破壊的操作にはConfirmation Dialogを使用する。

例:

```text
Clear Local Data

This will permanently remove your locally saved forms.

[Cancel] [Clear Data]
```

Danger Actionは明確に区別する。

---

# 62. Tooltip

Tooltipは補助的な情報に使用する。

Icon-only Button:

```text
Delete
Copy
Export
Settings
```

などに使用する。

重要な情報をTooltipだけに置かない。

---

# 63. Accessibility

最低基準:

```text
WCAG AA
```

を目標とする。

---

# 64. Keyboard Navigation

すべてのInteractive ElementをKeyboardで操作可能にする。

対象:

- Navigation
- Button
- Input
- Select
- Dialog
- Drawer
- Tabs
- Field Palette
- Form Canvas
- Field Settings
- Code Viewer

---

# 65. Focus Management

Focus Ringを必須とする。

Dialog:

```text
Open
 ↓
Focus Dialog
 ↓
Close
 ↓
Return Focus
```

Drawerも同様にFocusを管理する。

---

# 66. Skip Link

ApplicationにはSkip Linkを提供する。

```text
Skip to main content
```

Target:

```html
<main id="main-content"></main>
```

---

# 67. Landmark

Semantic HTMLを使用する。

基本:

```html
<header>
  <nav>
    <main>
      <section>
        <footer></footer>
      </section>
    </main>
  </nav>
</header>
```

主要コンテンツは`<main>`で囲む。

---

# 68. Form Accessibility

Form Field:

```text
Label
 ↓
Input
 ↓
Description
 ↓
Error
```

を適切に関連付ける。

Required Fieldは`aria-required`など適切なSemanticを使用する。

---

# 69. Color Accessibility

Colorだけで状態を表現しない。

例えばError:

```text
Red
+
Error Icon
+
Error Message
```

Selected:

```text
Accent
+
Border
+
Visual Indicator
```

とする。

---

# 70. Responsive

Breakpoints:

```text
Desktop
1440px〜

Tablet
768px〜1439px

Mobile
〜767px
```

---

# 71. Responsive Principle

MobileをDesktopの縮小版として設計しない。

情報優先度に応じてLayoutを変更する。

---

# 72. Builder Responsive

Desktop:

```text
Palette | Canvas | Settings
```

Tablet:

```text
Palette | Canvas
Settings → Drawer
```

Mobile:

```text
Canvas
```

Palette / Settings:

```text
Drawer / Sheet
```

---

# 73. Landing Responsive

Desktop:

```text
Hero
Feature Grid
How It Works
Demo
Technology
```

Mobile:

```text
Hero
CTA
Features
How It Works
Demo
Technology
```

Single Columnを基本とする。

---

# 74. Code Responsive

Desktop:

```text
Code Viewer
```

Mobile:

```text
Horizontal Scroll
```

Codeを無理にWrapしない。

---

# 75. Preview Responsive

Preview Viewport:

```text
Desktop
Tablet
Mobile
```

を切り替えられる。

MobileではFormをViewport幅に合わせる。

---

# 76. Dialog Responsive

Desktop:

```text
max-width: 640px
```

Mobile:

```text
width: calc(100% - 32px)
```

とする。

必要に応じてSheetへ変更する。

---

# 77. Touch Target

Mobile / Touch Deviceでは十分な操作領域を確保する。

Interactive Elementは原則として44px程度以上のTarget Sizeを目安とする。

---

# 78. Design Rules

## 必須

- 余白を十分に確保する
- Information Hierarchyを明確にする
- Shared Componentを再利用する
- Design Tokenを利用する
- Tailwind Utilityを優先する
- shadcn/uiを利用する
- Responsive対応する
- Accessibilityを考慮する
- FeatureごとのUI責務を明確にする
- ui-referenceを参考にする

---

# 79. Design Rules - Prohibited

以下は禁止する。

- Bootstrap風の画一的なUI
- ベタ書きColor
- 無秩序なSpacing
- 過剰なGradient
- 過剰なGlassmorphism
- 派手なAnimation
- 過剰なShadow
- 画面ごとの独自Design
- 不必要な装飾
- 巨大なButton
- Colorだけによる状態表現

---

# 80. Portfolio Design Principle

FormlyはPortfolioとしても利用する。

そのため、

```text
Visual Quality
+
UX Quality
+
Technical Quality
```

を同時に見せる。

ただし、Portfolioであることを強調するためにUIを過度に装飾しない。

実際に使えるProductとして自然に見えることを優先する。

---

# 81. Product-first Design

Portfolioとしての見栄えよりProduct Experienceを優先する。

例えば、

```text
派手なHero Animation
```

より、

```text
Builderの操作性
```

を優先する。

```text
装飾的なCard
```

より、

```text
Field Settingsの分かりやすさ
```

を優先する。

---

# 82. Builder UX Priority

Builderでは以下のPriorityを持つ。

```text
1. Field追加
2. Field選択
3. Field設定
4. Field並び替え
5. Preview
6. Save
7. Import / Export
```

操作の中心が常にForm Canvasにあることを意識する。

---

# 83. Visual Hierarchy

Primary Action:

```text
Start Building
Save
Export
```

Secondary:

```text
Preview
Import
Settings
```

Tertiary:

```text
Help
Documentation
```

すべてのButtonをPrimary Styleにしない。

---

# 84. Density

FormlyはProductivity Toolであるため、情報密度を適切に保つ。

Builder:

```text
Medium / High Density
```

Landing:

```text
Low / Medium Density
```

Preview:

```text
Low Density
```

Code:

```text
High Density
```

画面ごとに適切なDensityを選択する。

---

# 85. Whitespace

余白はDecorationではなくInformation Hierarchyとして使用する。

特にLandingでは十分なWhitespaceを確保する。

BuilderではWhitespaceを確保しつつ、操作可能な情報量を維持する。

---

# 86. Responsive Typography

Mobile:

```text
Hero
36–48px

Heading
28px

Body
16px
```

Desktop:

```text
Hero
48–64px

Heading
32px

Body
16px
```

極端に小さい文字を使用しない。

---

# 87. Image / Illustration

FormlyのUIでは不要なStock Imageを使用しない。

LandingでIllustrationを使用する場合は、

- Product UI
- Form
- Code
- Builder

などFormlyのConceptを表現するものを優先する。

---

# 88. Empty Illustration

Empty StateのIllustrationは意味のあるものにする。

例:

```text
Empty Form
→ Form / Plus Icon

No Code
→ Code Icon

No Preview
→ Monitor / Form Icon
```

過度に複雑なIllustrationを使用しない。

---

# 89. Animation Usage

Animationは以下に限定する。

- Navigation
- Dialog
- Drawer
- Toast
- Field Selection
- Field Reordering
- Button Feedback
- Landing Section Reveal

AnimationそのものをFeatureにしない。

---

# 90. Performance and UI

UI AnimationはPerformanceを阻害してはいけない。

Prefer:

```text
transform
opacity
```

Avoid:

```text
layout-heavy animation
```

Builderでは大量のFieldを操作してもUIが重くならないことを優先する。

---

# 91. Component Reuse

新しいUIを作成する前に既存Componentを確認する。

優先順位:

```text
shadcn/ui
   ↓
Shared Component
   ↓
Feature Component
   ↓
New Component
```

---

# 92. Tailwind Rules

Tailwind Utilityを優先する。

Custom CSSは以下の場合のみ使用する。

- Complex Animation
- Generated Code
- Third-party Integration
- Design Token Definition
- Tailwindでは表現しにくい特殊UI

---

# 93. CSS Variables

Color / ThemeなどのDesign TokenはCSS Variablesで管理する。

Componentごとに新しいColor Variableを作らない。

---

# 94. Hardcoded Values

以下のようなHardcodeを避ける。

```text
bg-[#123456]
mt-[37px]
rounded-[13px]
```

Design Token / Tailwind Scaleを優先する。

ただし、UI Referenceとの正確な一致が必要な場合など、明確な理由がある場合は例外とする。

---

# 95. UI Reference

UI Reference:

```text
docs/ui-reference/
```

Files:

```text
index.html
style.css
script.js
```

UI実装時にはReferenceをVisual Source of Truthとして確認する。

ただし、ReferenceのCodeをProductionへそのままコピーしない。

---

# 96. UI Reference Rules

Cursor / Claude / ChatGPTはUI実装前に必要に応じてReferenceを確認する。

確認対象:

- Layout
- Spacing
- Typography
- Color
- Border
- Radius
- Shadow
- Responsive
- Interaction

Production実装では、

```text
Reference
   ↓
React Component
   ↓
Tailwind / shadcn/ui
```

へ変換する。

---

# 97. Dark Mode Rules

Dark Modeでは単純にColorを反転しない。

優先順位:

```text
Background
Surface
Border
Text
Accent
```

のContrastを維持する。

Dark ModeでもInformation Hierarchyを維持する。

---

# 98. Formly Builder Dark Mode

BuilderではDark Modeでも、

```text
Field Palette
Canvas
Field Settings
```

のPanel境界を明確にする。

Surface Contrast / Borderを使用する。

---

# 99. Generated Form Preview

PreviewのForm UIはApplication UIと完全に同じThemeにする必要はない。

Previewでは、

> 実際に生成されるフォーム

を確認することを優先する。

---

# 100. Generated Code UI

Code ViewerではApplication UIとGenerated Codeを明確に区別する。

```text
Application UI
```

と

```text
Generated Code
```

を同じVisual Layerに混在させない。

---

# 101. Accessibility Testing

主要ComponentについてAccessibilityを確認する。

対象:

```text
Button
Input
Dialog
Tabs
Drawer
FieldPalette
FormCanvas
FieldSettings
FormRenderer
CodeViewer
```

---

# 102. UI Testing

Visual UIだけでなくInteractionをTestする。

例:

```text
Fieldを追加できる
Fieldを選択できる
Field設定を変更できる
Fieldを削除できる
Previewを開ける
CodeをCopyできる
Languageを変更できる
Themeを変更できる
```

---

# 103. Cursor Rules

Cursorは以下を必ず守る。

- 新しいColorを勝手に追加しない
- Design Tokenを利用する
- Tailwind Utilityを優先する
- shadcn/uiを優先する
- Shared Componentを優先する
- 新しいUIを作る前に既存Componentを確認する
- 画面間でDesign Ruleを統一する
- Responsive対応する
- Accessibilityを考慮する
- `docs/ui-reference/`を必要に応じて確認する
- User-generated ContentとUI Textを区別する

---

# 104. Cursor Component Decision

新しいUIを作成する場合:

```text
1. shadcn/uiで解決できるか？
        ↓ No
2. 既存Shared Componentで解決できるか？
        ↓ No
3. Feature Componentとして作るべきか？
        ↓ No
4. 新しいShared Componentを作る
```

不要なComponentを増やさない。

---

# 105. Design Consistency

すべてのScreenで以下を統一する。

- Typography
- Color
- Radius
- Border
- Shadow
- Spacing
- Button
- Input
- Dialog
- Toast
- Focus
- Responsive Behavior

---

# 106. Screen-specific Design

Screen固有のUIが必要な場合でも、Design Tokenを使用する。

許可:

```text
Builder固有のPanel Layout
Code Viewer固有のMonospace Font
Preview固有のViewport
```

禁止:

```text
Builderだけ別Color
Previewだけ別Radius
Settingsだけ別Typography
```

---

# 107. UI Quality Checklist

新しいScreen / Componentを作成する場合、以下を確認する。

- [ ] Design Tokenを使用している
- [ ] Tailwindを使用している
- [ ] shadcn/uiを確認した
- [ ] Shared Componentを確認した
- [ ] Desktop対応
- [ ] Tablet対応
- [ ] Mobile対応
- [ ] Keyboard対応
- [ ] Focus State
- [ ] Error State
- [ ] Empty State
- [ ] Loading State where necessary
- [ ] Dark Mode
- [ ] i18n
- [ ] Reduced Motion
- [ ] Accessibility
- [ ] UI Referenceとの整合性

---

# 108. Definition of Done

UI Featureは以下を満たした場合に完成とする。

- Design Guidelineに準拠
- Responsive対応
- Dark Mode対応
- Accessibility対応
- i18n対応
- Loading State where necessary
- Empty State where necessary
- Error State where necessary
- Keyboard Navigation
- Focus State
- UI ReferenceとのVisual Consistency
- Tests
- ESLint
- TypeScript
- Prettier

---

# 109. Future

将来的にDesign Systemを以下へ拡張する可能性がある。

```text
Button Guideline
Card Guideline
Form Guideline
Builder Guideline
Field Guideline
Code Viewer Guideline
Preview Guideline
Navigation Guideline
Motion Guideline
Icon Guideline
Dark Theme Guideline
Accessibility Guideline
Responsive Guideline
```

ただし、MVPでは必要以上にDocumentを細分化しない。

---

# 110. Final Design Principle

FormlyのUIにおける最重要原則:

> **Simple enough to use. Professional enough to trust.**

ユーザーが初めてアクセスしても、

```text
何をするアプリなのか
↓
どこを押せばいいのか
↓
どうやってフォームを作るのか
↓
どうやってCodeを取得するのか
```

が自然に理解できるUIを目指す。

最終的には、

```text
Build
  ↓
Preview
  ↓
Generate
  ↓
Export
```

というCore Product LoopがUIだけで理解できることを目標とする。
````
