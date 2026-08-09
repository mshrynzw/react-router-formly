/* ==========================================================================
   Formly — Visual Form Builder
   Vanilla JS prototype (state → render pattern, structured for a future
   React port). Single script, no ES module import/export so it also runs
   directly from file://.
   ========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
     1. i18n
     ====================================================================== */
  var I18N = {
    ja: {
      'nav.workspace': 'Workspace', 'nav.dashboard': 'ダッシュボード', 'nav.forms': 'フォーム',
      'nav.templates': 'テンプレート', 'nav.resources': 'Resources', 'nav.shortcuts': 'キーボードショートカット',
      'nav.settings': '設定',
      'tabs.builder': 'ビルダー', 'tabs.preview': 'プレビュー', 'tabs.code': 'コード',
      'action.save': '保存', 'action.createForm': 'フォームを作成', 'action.export': 'エクスポート',
      'action.duplicate': '複製', 'action.delete': '削除', 'action.edit': '編集',
      'action.moveUp': '上へ移動', 'action.moveDown': '下へ移動', 'action.cancel': 'キャンセル',
      'action.confirm': '実行する', 'action.download': 'ダウンロード', 'action.copy': 'コピー',
      'action.close': '閉じる', 'action.addOption': '選択肢を追加', 'action.viewTemplates': 'テンプレートを見る',
      'action.create': '作成する', 'action.deleteConfirm': '削除する',
      'dash.quickCreate': 'クイック作成', 'dash.recent': '最近のフォーム', 'dash.viewAll': 'すべて表示',
      'dash.activity': 'アクティビティ', 'dash.greeting': 'おかえりなさい、Masahiroさん',
      'dash.greetingSub': '今日も素早く、美しいフォームを作りましょう。',
      'stat.totalForms': '作成したフォーム', 'stat.totalFields': '合計フィールド数',
      'stat.lastEdited': '最終編集', 'stat.thisWeek': '今週の編集',
      'quick.blank.title': '空白のフォーム', 'quick.blank.desc': 'ゼロから自由に作成',
      'quick.contact.title': 'お問い合わせフォーム', 'quick.contact.desc': '基本的な問い合わせ用',
      'quick.feedback.title': 'フィードバックフォーム', 'quick.feedback.desc': '満足度・感想の収集',
      'quick.registration.title': '申込フォーム', 'quick.registration.desc': 'イベント・会員登録用',
      'forms.search': 'フォームを検索', 'forms.empty.title': '最初のフォームを作成しましょう',
      'forms.empty.desc': 'コンポーネントを追加するだけで、実用的なフォームが数分で完成します。',
      'forms.empty.primary': 'フォームを作成', 'forms.empty.secondary': 'テンプレートを見る',
      'forms.updated': '更新',
      'templates.title': 'テンプレートから始める', 'templates.desc': '用途に合わせたテンプレートを選んで、すぐに編集を始められます。',
      'templates.use': 'このテンプレートを使う',
      'builder.components': 'コンポーネント', 'builder.properties': 'プロパティ',
      'builder.formTitlePlaceholder': 'フォームのタイトル', 'builder.formDescPlaceholder': '説明を追加（任意）',
      'builder.canvasEmpty.title': 'コンポーネントを追加してください',
      'builder.canvasEmpty.desc': '左のパネルからフィールドを選ぶと、ここにプレビューが表示されます。',
      'builder.submitDefault': '送信する',
      'field.text': 'テキスト', 'field.email': 'メール', 'field.phone': '電話番号', 'field.number': '数値',
      'field.select': 'セレクト', 'field.radio': 'ラジオ', 'field.checkbox': 'チェックボックス',
      'field.textarea': '複数行テキスト', 'field.date': '日付', 'field.file': 'ファイル',
      'field.divider': '区切り線', 'field.heading': '見出し', 'field.button': 'ボタン',
      'prop.label': 'ラベル', 'prop.name': 'フィールド名', 'prop.placeholder': 'プレースホルダー',
      'prop.description': '説明文', 'prop.required': '必須項目', 'prop.requiredDesc': '未入力の場合エラーを表示',
      'prop.defaultValue': '初期値', 'prop.width': '幅', 'prop.widthFull': '全幅', 'prop.widthHalf': '半分',
      'prop.helpText': 'ヘルプテキスト', 'prop.options': '選択肢', 'prop.fieldSettings': 'フィールド設定',
      'prop.formSettings': 'フォーム設定', 'prop.formTitle': 'タイトル', 'prop.formDescription': '説明',
      'prop.selectNote': 'フィールドを選択すると、ここに詳細設定が表示されます。',
      'prop.headingText': '見出しテキスト', 'prop.buttonText': 'ボタンテキスト', 'prop.deleteField': 'フィールドを削除',
      'preview.desktop': 'デスクトップ', 'preview.tablet': 'タブレット', 'preview.mobile': 'モバイル',
      'code.copied': 'コピーしました', 'code.copy': 'コピー', 'code.download': 'ダウンロード',
      'code.exportTitle': 'フォームをエクスポート', 'code.exportDesc': '生成されたコードをファイルとして書き出します。',
      'code.exportHtml': 'HTML をダウンロード', 'code.exportCss': 'CSS をダウンロード', 'code.exportJs': 'JavaScript をダウンロード',
      'code.exportHtmlDesc': 'フォームのマークアップ', 'code.exportCssDesc': 'スタイル定義',
      'code.exportJsDesc': '入力検証・送信処理',
      'settings.language': '言語', 'settings.languageDesc': 'アプリ全体の表示言語を切り替えます。',
      'settings.appearance': '外観', 'settings.appearanceDesc': 'テーマと表示密度を設定します。',
      'settings.theme.dark': 'ダーク', 'settings.theme.light': 'ライト',
      'settings.density': '表示密度', 'settings.densityDesc': 'コンポーネントの余白を調整します。',
      'settings.comfortable': '標準', 'settings.compact': 'コンパクト',
      'settings.editor': 'エディタ設定', 'settings.editorDesc': 'ビルダーとコード表示の挙動を設定します。',
      'settings.autosave': '自動保存', 'settings.autosaveDesc': '変更を自動的にブラウザへ保存します。',
      'settings.lineWrap': 'コードの折り返し', 'settings.lineWrapDesc': 'コード表示で長い行を折り返します。',
      'settings.shortcuts': 'キーボードショートカット', 'settings.shortcutsDesc': '主要な操作のショートカット一覧です。',
      'settings.profile': 'プロフィール', 'settings.profileDesc': 'ポートフォリオ表示用のアカウント情報です。',
      'cmdk.trigger': '検索またはコマンド実行', 'cmdk.placeholder': 'コマンドを入力または検索...',
      'cmdk.groupNavigate': 'Navigate', 'cmdk.groupActions': 'Actions', 'cmdk.groupLanguage': 'Language',
      'cmdk.empty': '一致するコマンドが見つかりません',
      'cmdk.cmd.dashboard': 'ダッシュボードを開く', 'cmdk.cmd.forms': 'フォーム一覧を開く',
      'cmdk.cmd.templates': 'テンプレートを開く', 'cmdk.cmd.settings': '設定を開く',
      'cmdk.cmd.builder': 'ビルダーを開く', 'cmdk.cmd.preview': 'プレビューを開く', 'cmdk.cmd.code': 'コードを開く',
      'cmdk.cmd.createForm': '新しいフォームを作成', 'cmdk.cmd.save': 'フォームを保存',
      'cmdk.cmd.toggleTheme': 'テーマを切り替え', 'cmdk.cmd.undo': '元に戻す', 'cmdk.cmd.redo': 'やり直す',
      'cmdk.cmd.copyCode': 'コードをコピー', 'cmdk.cmd.openShortcuts': 'ショートカット一覧を開く',
      'dialog.create.title': '新しいフォームを作成', 'dialog.create.desc': 'テンプレートを選ぶか、空白から始めます。',
      'dialog.create.titleLabel': 'フォームのタイトル', 'dialog.create.titlePlaceholder': '例: お問い合わせフォーム',
      'dialog.delete.title': 'フォームを削除しますか？',
      'dialog.delete.desc': '「{title}」を削除します。この操作は取り消せません。',
      'dialog.shortcuts.title': 'キーボードショートカット', 'dialog.shortcuts.desc': 'Mac / Windows どちらのキーにも対応しています。',
      'toast.saved': '変更を保存しました', 'toast.deleted': 'フォームを削除しました',
      'toast.duplicated': 'フォームを複製しました', 'toast.copied': 'コードをコピーしました',
      'toast.exported': 'ファイルをエクスポートしました', 'toast.langChanged': '言語を切り替えました',
      'toast.themeChanged': 'テーマを切り替えました', 'toast.fieldAdded': 'フィールドを追加しました',
      'toast.fieldDeleted': 'フィールドを削除しました', 'toast.fieldDuplicated': 'フィールドを複製しました',
      'toast.settingsSaved': '設定を保存しました', 'toast.submitted': '送信しました（デモ）',
      'toast.formCreated': 'フォームを作成しました',
      'activity.created': '「{title}」を作成しました', 'activity.updated': '「{title}」を更新しました',
      'activity.deleted': '「{title}」を削除しました',
      'shortcuts.commandPalette': 'コマンドパレット', 'shortcuts.save': '保存', 'shortcuts.undo': '元に戻す',
      'shortcuts.redo': 'やり直す', 'shortcuts.deleteField': '選択中フィールドを削除',
      'time.now': 'たった今', 'time.minutesAgo': '{n}分前', 'time.hoursAgo': '{n}時間前', 'time.daysAgo': '{n}日前'
    },
    en: {
      'nav.workspace': 'Workspace', 'nav.dashboard': 'Dashboard', 'nav.forms': 'Forms',
      'nav.templates': 'Templates', 'nav.resources': 'Resources', 'nav.shortcuts': 'Keyboard Shortcuts',
      'nav.settings': 'Settings',
      'tabs.builder': 'Builder', 'tabs.preview': 'Preview', 'tabs.code': 'Code',
      'action.save': 'Save', 'action.createForm': 'Create Form', 'action.export': 'Export',
      'action.duplicate': 'Duplicate', 'action.delete': 'Delete', 'action.edit': 'Edit',
      'action.moveUp': 'Move up', 'action.moveDown': 'Move down', 'action.cancel': 'Cancel',
      'action.confirm': 'Confirm', 'action.download': 'Download', 'action.copy': 'Copy',
      'action.close': 'Close', 'action.addOption': 'Add option', 'action.viewTemplates': 'View templates',
      'action.create': 'Create', 'action.deleteConfirm': 'Delete',
      'dash.quickCreate': 'Quick Create', 'dash.recent': 'Recent Forms', 'dash.viewAll': 'View all',
      'dash.activity': 'Activity', 'dash.greeting': 'Welcome back, Masahiro',
      'dash.greetingSub': "Let's build something beautiful today.",
      'stat.totalForms': 'Forms created', 'stat.totalFields': 'Total fields',
      'stat.lastEdited': 'Last edited', 'stat.thisWeek': 'Edited this week',
      'quick.blank.title': 'Blank Form', 'quick.blank.desc': 'Start from scratch',
      'quick.contact.title': 'Contact Form', 'quick.contact.desc': 'A simple contact form',
      'quick.feedback.title': 'Feedback Form', 'quick.feedback.desc': 'Collect ratings & comments',
      'quick.registration.title': 'Registration Form', 'quick.registration.desc': 'Events & memberships',
      'forms.search': 'Search forms', 'forms.empty.title': "Let's create your first form",
      'forms.empty.desc': 'Add components from the builder and have a working form in minutes.',
      'forms.empty.primary': 'Create Form', 'forms.empty.secondary': 'View templates',
      'forms.updated': 'Updated',
      'templates.title': 'Start from a template', 'templates.desc': 'Pick a template built for your use case and start editing right away.',
      'templates.use': 'Use this template',
      'builder.components': 'Components', 'builder.properties': 'Properties',
      'builder.formTitlePlaceholder': 'Form title', 'builder.formDescPlaceholder': 'Add a description (optional)',
      'builder.canvasEmpty.title': 'Add a component to get started',
      'builder.canvasEmpty.desc': 'Pick a field from the left panel and it will appear here instantly.',
      'builder.submitDefault': 'Submit',
      'field.text': 'Text', 'field.email': 'Email', 'field.phone': 'Phone', 'field.number': 'Number',
      'field.select': 'Select', 'field.radio': 'Radio', 'field.checkbox': 'Checkbox',
      'field.textarea': 'Textarea', 'field.date': 'Date', 'field.file': 'File',
      'field.divider': 'Divider', 'field.heading': 'Heading', 'field.button': 'Button',
      'prop.label': 'Label', 'prop.name': 'Field name', 'prop.placeholder': 'Placeholder',
      'prop.description': 'Description', 'prop.required': 'Required', 'prop.requiredDesc': 'Show an error when left empty',
      'prop.defaultValue': 'Default value', 'prop.width': 'Width', 'prop.widthFull': 'Full', 'prop.widthHalf': 'Half',
      'prop.helpText': 'Help text', 'prop.options': 'Options', 'prop.fieldSettings': 'Field Settings',
      'prop.formSettings': 'Form Settings', 'prop.formTitle': 'Title', 'prop.formDescription': 'Description',
      'prop.selectNote': 'Select a field to edit its properties here.',
      'prop.headingText': 'Heading text', 'prop.buttonText': 'Button text', 'prop.deleteField': 'Delete field',
      'preview.desktop': 'Desktop', 'preview.tablet': 'Tablet', 'preview.mobile': 'Mobile',
      'code.copied': 'Copied!', 'code.copy': 'Copy', 'code.download': 'Download',
      'code.exportTitle': 'Export form', 'code.exportDesc': 'Download the generated code as files.',
      'code.exportHtml': 'Download HTML', 'code.exportCss': 'Download CSS', 'code.exportJs': 'Download JavaScript',
      'code.exportHtmlDesc': 'Form markup', 'code.exportCssDesc': 'Style definitions',
      'code.exportJsDesc': 'Validation & submit logic',
      'settings.language': 'Language', 'settings.languageDesc': 'Switch the display language for the whole app.',
      'settings.appearance': 'Appearance', 'settings.appearanceDesc': 'Set the theme and display density.',
      'settings.theme.dark': 'Dark', 'settings.theme.light': 'Light',
      'settings.density': 'Density', 'settings.densityDesc': 'Adjust spacing across components.',
      'settings.comfortable': 'Comfortable', 'settings.compact': 'Compact',
      'settings.editor': 'Editor Preferences', 'settings.editorDesc': 'Configure how the builder and code view behave.',
      'settings.autosave': 'Autosave', 'settings.autosaveDesc': 'Automatically save changes to your browser.',
      'settings.lineWrap': 'Code line wrap', 'settings.lineWrapDesc': 'Wrap long lines in the code view.',
      'settings.shortcuts': 'Keyboard Shortcuts', 'settings.shortcutsDesc': 'A reference of the most useful shortcuts.',
      'settings.profile': 'Profile', 'settings.profileDesc': 'Account details for this portfolio demo.',
      'cmdk.trigger': 'Search or run a command', 'cmdk.placeholder': 'Type a command or search...',
      'cmdk.groupNavigate': 'Navigate', 'cmdk.groupActions': 'Actions', 'cmdk.groupLanguage': 'Language',
      'cmdk.empty': 'No matching commands',
      'cmdk.cmd.dashboard': 'Open Dashboard', 'cmdk.cmd.forms': 'Open Forms',
      'cmdk.cmd.templates': 'Open Templates', 'cmdk.cmd.settings': 'Open Settings',
      'cmdk.cmd.builder': 'Open Builder', 'cmdk.cmd.preview': 'Open Preview', 'cmdk.cmd.code': 'Open Code',
      'cmdk.cmd.createForm': 'Create new form', 'cmdk.cmd.save': 'Save form',
      'cmdk.cmd.toggleTheme': 'Toggle theme', 'cmdk.cmd.undo': 'Undo', 'cmdk.cmd.redo': 'Redo',
      'cmdk.cmd.copyCode': 'Copy code', 'cmdk.cmd.openShortcuts': 'Open shortcuts list',
      'dialog.create.title': 'Create a new form', 'dialog.create.desc': 'Choose a template or start from blank.',
      'dialog.create.titleLabel': 'Form title', 'dialog.create.titlePlaceholder': 'e.g. Contact Form',
      'dialog.delete.title': 'Delete this form?',
      'dialog.delete.desc': 'This will permanently delete "{title}". This action cannot be undone.',
      'dialog.shortcuts.title': 'Keyboard Shortcuts', 'dialog.shortcuts.desc': 'Works with both Mac and Windows keys.',
      'toast.saved': 'Changes saved', 'toast.deleted': 'Form deleted',
      'toast.duplicated': 'Form duplicated', 'toast.copied': 'Code copied to clipboard',
      'toast.exported': 'File exported', 'toast.langChanged': 'Language updated',
      'toast.themeChanged': 'Theme updated', 'toast.fieldAdded': 'Field added',
      'toast.fieldDeleted': 'Field deleted', 'toast.fieldDuplicated': 'Field duplicated',
      'toast.settingsSaved': 'Settings saved', 'toast.submitted': 'Submitted (demo)',
      'toast.formCreated': 'Form created',
      'activity.created': 'Created "{title}"', 'activity.updated': 'Updated "{title}"',
      'activity.deleted': 'Deleted "{title}"',
      'shortcuts.commandPalette': 'Command palette', 'shortcuts.save': 'Save', 'shortcuts.undo': 'Undo',
      'shortcuts.redo': 'Redo', 'shortcuts.deleteField': 'Delete selected field',
      'time.now': 'just now', 'time.minutesAgo': '{n}m ago', 'time.hoursAgo': '{n}h ago', 'time.daysAgo': '{n}d ago'
    },
    zh: {
      'nav.workspace': '工作区', 'nav.dashboard': '仪表盘', 'nav.forms': '表单',
      'nav.templates': '模板', 'nav.resources': '资源', 'nav.shortcuts': '键盘快捷键',
      'nav.settings': '设置',
      'tabs.builder': '构建器', 'tabs.preview': '预览', 'tabs.code': '代码',
      'action.save': '保存', 'action.createForm': '创建表单', 'action.export': '导出',
      'action.duplicate': '复制', 'action.delete': '删除', 'action.edit': '编辑',
      'action.moveUp': '上移', 'action.moveDown': '下移', 'action.cancel': '取消',
      'action.confirm': '确认', 'action.download': '下载', 'action.copy': '复制',
      'action.close': '关闭', 'action.addOption': '添加选项', 'action.viewTemplates': '查看模板',
      'action.create': '创建', 'action.deleteConfirm': '删除',
      'dash.quickCreate': '快速创建', 'dash.recent': '最近的表单', 'dash.viewAll': '查看全部',
      'dash.activity': '动态', 'dash.greeting': '欢迎回来，Masahiro',
      'dash.greetingSub': '今天也来创建漂亮的表单吧。',
      'stat.totalForms': '已创建表单', 'stat.totalFields': '字段总数',
      'stat.lastEdited': '最后编辑', 'stat.thisWeek': '本周编辑',
      'quick.blank.title': '空白表单', 'quick.blank.desc': '从零开始创建',
      'quick.contact.title': '联系表单', 'quick.contact.desc': '基础联系方式收集',
      'quick.feedback.title': '反馈表单', 'quick.feedback.desc': '收集满意度与意见',
      'quick.registration.title': '报名表单', 'quick.registration.desc': '活动与会员注册',
      'forms.search': '搜索表单', 'forms.empty.title': '创建您的第一个表单',
      'forms.empty.desc': '只需添加组件，几分钟即可完成一个可用的表单。',
      'forms.empty.primary': '创建表单', 'forms.empty.secondary': '查看模板',
      'forms.updated': '更新于',
      'templates.title': '从模板开始', 'templates.desc': '选择适合您场景的模板，立即开始编辑。',
      'templates.use': '使用此模板',
      'builder.components': '组件', 'builder.properties': '属性',
      'builder.formTitlePlaceholder': '表单标题', 'builder.formDescPlaceholder': '添加描述（可选）',
      'builder.canvasEmpty.title': '请添加组件开始创建',
      'builder.canvasEmpty.desc': '从左侧面板选择字段，即可在此实时预览。',
      'builder.submitDefault': '提交',
      'field.text': '文本', 'field.email': '邮箱', 'field.phone': '电话', 'field.number': '数字',
      'field.select': '下拉选择', 'field.radio': '单选', 'field.checkbox': '复选框',
      'field.textarea': '多行文本', 'field.date': '日期', 'field.file': '文件',
      'field.divider': '分隔线', 'field.heading': '标题', 'field.button': '按钮',
      'prop.label': '标签', 'prop.name': '字段名称', 'prop.placeholder': '占位提示',
      'prop.description': '说明', 'prop.required': '必填项', 'prop.requiredDesc': '留空时将显示错误提示',
      'prop.defaultValue': '默认值', 'prop.width': '宽度', 'prop.widthFull': '整行', 'prop.widthHalf': '半行',
      'prop.helpText': '帮助文本', 'prop.options': '选项', 'prop.fieldSettings': '字段设置',
      'prop.formSettings': '表单设置', 'prop.formTitle': '标题', 'prop.formDescription': '描述',
      'prop.selectNote': '选择一个字段以在此处编辑详细设置。',
      'prop.headingText': '标题文本', 'prop.buttonText': '按钮文本', 'prop.deleteField': '删除字段',
      'preview.desktop': '桌面端', 'preview.tablet': '平板', 'preview.mobile': '手机',
      'code.copied': '已复制！', 'code.copy': '复制', 'code.download': '下载',
      'code.exportTitle': '导出表单', 'code.exportDesc': '将生成的代码下载为文件。',
      'code.exportHtml': '下载 HTML', 'code.exportCss': '下载 CSS', 'code.exportJs': '下载 JavaScript',
      'code.exportHtmlDesc': '表单标记', 'code.exportCssDesc': '样式定义',
      'code.exportJsDesc': '校验与提交逻辑',
      'settings.language': '语言', 'settings.languageDesc': '切换整个应用的显示语言。',
      'settings.appearance': '外观', 'settings.appearanceDesc': '设置主题与显示密度。',
      'settings.theme.dark': '深色', 'settings.theme.light': '浅色',
      'settings.density': '显示密度', 'settings.densityDesc': '调整组件间距。',
      'settings.comfortable': '标准', 'settings.compact': '紧凑',
      'settings.editor': '编辑器偏好', 'settings.editorDesc': '配置构建器与代码视图的行为。',
      'settings.autosave': '自动保存', 'settings.autosaveDesc': '自动将更改保存到浏览器。',
      'settings.lineWrap': '代码自动换行', 'settings.lineWrapDesc': '在代码视图中折行显示长代码。',
      'settings.shortcuts': '键盘快捷键', 'settings.shortcutsDesc': '常用操作的快捷键参考。',
      'settings.profile': '个人资料', 'settings.profileDesc': '此作品集演示的账户信息。',
      'cmdk.trigger': '搜索或执行命令', 'cmdk.placeholder': '输入命令或搜索...',
      'cmdk.groupNavigate': '导航', 'cmdk.groupActions': '操作', 'cmdk.groupLanguage': '语言',
      'cmdk.empty': '未找到匹配的命令',
      'cmdk.cmd.dashboard': '打开仪表盘', 'cmdk.cmd.forms': '打开表单列表',
      'cmdk.cmd.templates': '打开模板', 'cmdk.cmd.settings': '打开设置',
      'cmdk.cmd.builder': '打开构建器', 'cmdk.cmd.preview': '打开预览', 'cmdk.cmd.code': '打开代码',
      'cmdk.cmd.createForm': '创建新表单', 'cmdk.cmd.save': '保存表单',
      'cmdk.cmd.toggleTheme': '切换主题', 'cmdk.cmd.undo': '撤销', 'cmdk.cmd.redo': '重做',
      'cmdk.cmd.copyCode': '复制代码', 'cmdk.cmd.openShortcuts': '打开快捷键列表',
      'dialog.create.title': '创建新表单', 'dialog.create.desc': '选择一个模板，或从空白开始。',
      'dialog.create.titleLabel': '表单标题', 'dialog.create.titlePlaceholder': '例如：联系表单',
      'dialog.delete.title': '删除此表单？',
      'dialog.delete.desc': '将永久删除「{title}」。此操作无法撤销。',
      'dialog.shortcuts.title': '键盘快捷键', 'dialog.shortcuts.desc': '同时支持 Mac 与 Windows 按键。',
      'toast.saved': '更改已保存', 'toast.deleted': '表单已删除',
      'toast.duplicated': '表单已复制', 'toast.copied': '代码已复制到剪贴板',
      'toast.exported': '文件已导出', 'toast.langChanged': '语言已切换',
      'toast.themeChanged': '主题已切换', 'toast.fieldAdded': '已添加字段',
      'toast.fieldDeleted': '已删除字段', 'toast.fieldDuplicated': '已复制字段',
      'toast.settingsSaved': '设置已保存', 'toast.submitted': '已提交（演示）',
      'toast.formCreated': '表单已创建',
      'activity.created': '已创建「{title}」', 'activity.updated': '已更新「{title}」',
      'activity.deleted': '已删除「{title}」',
      'shortcuts.commandPalette': '命令面板', 'shortcuts.save': '保存', 'shortcuts.undo': '撤销',
      'shortcuts.redo': '重做', 'shortcuts.deleteField': '删除所选字段',
      'time.now': '刚刚', 'time.minutesAgo': '{n}分钟前', 'time.hoursAgo': '{n}小时前', 'time.daysAgo': '{n}天前'
    },
    ko: {
      'nav.workspace': '워크스페이스', 'nav.dashboard': '대시보드', 'nav.forms': '폼',
      'nav.templates': '템플릿', 'nav.resources': '리소스', 'nav.shortcuts': '키보드 단축키',
      'nav.settings': '설정',
      'tabs.builder': '빌더', 'tabs.preview': '미리보기', 'tabs.code': '코드',
      'action.save': '저장', 'action.createForm': '폼 만들기', 'action.export': '내보내기',
      'action.duplicate': '복제', 'action.delete': '삭제', 'action.edit': '편집',
      'action.moveUp': '위로 이동', 'action.moveDown': '아래로 이동', 'action.cancel': '취소',
      'action.confirm': '확인', 'action.download': '다운로드', 'action.copy': '복사',
      'action.close': '닫기', 'action.addOption': '옵션 추가', 'action.viewTemplates': '템플릿 보기',
      'action.create': '만들기', 'action.deleteConfirm': '삭제',
      'dash.quickCreate': '빠른 생성', 'dash.recent': '최근 폼', 'dash.viewAll': '전체 보기',
      'dash.activity': '활동', 'dash.greeting': '다시 오신 것을 환영합니다, Masahiro님',
      'dash.greetingSub': '오늘도 멋진 폼을 빠르게 만들어보세요.',
      'stat.totalForms': '생성한 폼', 'stat.totalFields': '전체 필드 수',
      'stat.lastEdited': '마지막 편집', 'stat.thisWeek': '이번 주 편집',
      'quick.blank.title': '빈 폼', 'quick.blank.desc': '처음부터 시작하기',
      'quick.contact.title': '문의 폼', 'quick.contact.desc': '기본적인 문의용 폼',
      'quick.feedback.title': '피드백 폼', 'quick.feedback.desc': '만족도와 의견 수집',
      'quick.registration.title': '신청 폼', 'quick.registration.desc': '행사 및 회원 등록용',
      'forms.search': '폼 검색', 'forms.empty.title': '첫 번째 폼을 만들어보세요',
      'forms.empty.desc': '컴포넌트를 추가하기만 하면 몇 분 만에 실용적인 폼이 완성됩니다.',
      'forms.empty.primary': '폼 만들기', 'forms.empty.secondary': '템플릿 보기',
      'forms.updated': '업데이트',
      'templates.title': '템플릿으로 시작하기', 'templates.desc': '용도에 맞는 템플릿을 선택하고 바로 편집을 시작하세요.',
      'templates.use': '이 템플릿 사용',
      'builder.components': '컴포넌트', 'builder.properties': '속성',
      'builder.formTitlePlaceholder': '폼 제목', 'builder.formDescPlaceholder': '설명 추가 (선택 사항)',
      'builder.canvasEmpty.title': '컴포넌트를 추가해보세요',
      'builder.canvasEmpty.desc': '왼쪽 패널에서 필드를 선택하면 여기에 바로 표시됩니다.',
      'builder.submitDefault': '제출',
      'field.text': '텍스트', 'field.email': '이메일', 'field.phone': '전화번호', 'field.number': '숫자',
      'field.select': '선택', 'field.radio': '라디오', 'field.checkbox': '체크박스',
      'field.textarea': '여러 줄 텍스트', 'field.date': '날짜', 'field.file': '파일',
      'field.divider': '구분선', 'field.heading': '제목', 'field.button': '버튼',
      'prop.label': '라벨', 'prop.name': '필드 이름', 'prop.placeholder': '플레이스홀더',
      'prop.description': '설명', 'prop.required': '필수 항목', 'prop.requiredDesc': '비어 있으면 오류를 표시합니다',
      'prop.defaultValue': '기본값', 'prop.width': '너비', 'prop.widthFull': '전체', 'prop.widthHalf': '절반',
      'prop.helpText': '도움말 텍스트', 'prop.options': '옵션', 'prop.fieldSettings': '필드 설정',
      'prop.formSettings': '폼 설정', 'prop.formTitle': '제목', 'prop.formDescription': '설명',
      'prop.selectNote': '필드를 선택하면 여기에서 세부 설정을 편집할 수 있습니다.',
      'prop.headingText': '제목 텍스트', 'prop.buttonText': '버튼 텍스트', 'prop.deleteField': '필드 삭제',
      'preview.desktop': '데스크톱', 'preview.tablet': '태블릿', 'preview.mobile': '모바일',
      'code.copied': '복사됨!', 'code.copy': '복사', 'code.download': '다운로드',
      'code.exportTitle': '폼 내보내기', 'code.exportDesc': '생성된 코드를 파일로 다운로드합니다.',
      'code.exportHtml': 'HTML 다운로드', 'code.exportCss': 'CSS 다운로드', 'code.exportJs': 'JavaScript 다운로드',
      'code.exportHtmlDesc': '폼 마크업', 'code.exportCssDesc': '스타일 정의',
      'code.exportJsDesc': '유효성 검사 및 제출 로직',
      'settings.language': '언어', 'settings.languageDesc': '앱 전체의 표시 언어를 전환합니다.',
      'settings.appearance': '외관', 'settings.appearanceDesc': '테마와 표시 밀도를 설정합니다.',
      'settings.theme.dark': '다크', 'settings.theme.light': '라이트',
      'settings.density': '표시 밀도', 'settings.densityDesc': '컴포넌트 간격을 조정합니다.',
      'settings.comfortable': '보통', 'settings.compact': '컴팩트',
      'settings.editor': '편집기 환경설정', 'settings.editorDesc': '빌더와 코드 보기의 동작을 설정합니다.',
      'settings.autosave': '자동 저장', 'settings.autosaveDesc': '변경 사항을 브라우저에 자동으로 저장합니다.',
      'settings.lineWrap': '코드 줄바꿈', 'settings.lineWrapDesc': '코드 보기에서 긴 줄을 줄바꿈합니다.',
      'settings.shortcuts': '키보드 단축키', 'settings.shortcutsDesc': '주요 작업의 단축키 목록입니다.',
      'settings.profile': '프로필', 'settings.profileDesc': '포트폴리오 데모용 계정 정보입니다.',
      'cmdk.trigger': '검색 또는 명령 실행', 'cmdk.placeholder': '명령을 입력하거나 검색...',
      'cmdk.groupNavigate': '이동', 'cmdk.groupActions': '작업', 'cmdk.groupLanguage': '언어',
      'cmdk.empty': '일치하는 명령이 없습니다',
      'cmdk.cmd.dashboard': '대시보드 열기', 'cmdk.cmd.forms': '폼 목록 열기',
      'cmdk.cmd.templates': '템플릿 열기', 'cmdk.cmd.settings': '설정 열기',
      'cmdk.cmd.builder': '빌더 열기', 'cmdk.cmd.preview': '미리보기 열기', 'cmdk.cmd.code': '코드 열기',
      'cmdk.cmd.createForm': '새 폼 만들기', 'cmdk.cmd.save': '폼 저장',
      'cmdk.cmd.toggleTheme': '테마 전환', 'cmdk.cmd.undo': '실행 취소', 'cmdk.cmd.redo': '다시 실행',
      'cmdk.cmd.copyCode': '코드 복사', 'cmdk.cmd.openShortcuts': '단축키 목록 열기',
      'dialog.create.title': '새 폼 만들기', 'dialog.create.desc': '템플릿을 선택하거나 빈 폼에서 시작하세요.',
      'dialog.create.titleLabel': '폼 제목', 'dialog.create.titlePlaceholder': '예: 문의 폼',
      'dialog.delete.title': '이 폼을 삭제하시겠습니까?',
      'dialog.delete.desc': '"{title}"이(가) 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.',
      'dialog.shortcuts.title': '키보드 단축키', 'dialog.shortcuts.desc': 'Mac과 Windows 키를 모두 지원합니다.',
      'toast.saved': '변경 사항이 저장되었습니다', 'toast.deleted': '폼이 삭제되었습니다',
      'toast.duplicated': '폼이 복제되었습니다', 'toast.copied': '코드가 클립보드에 복사되었습니다',
      'toast.exported': '파일을 내보냈습니다', 'toast.langChanged': '언어가 변경되었습니다',
      'toast.themeChanged': '테마가 변경되었습니다', 'toast.fieldAdded': '필드가 추가되었습니다',
      'toast.fieldDeleted': '필드가 삭제되었습니다', 'toast.fieldDuplicated': '필드가 복제되었습니다',
      'toast.settingsSaved': '설정이 저장되었습니다', 'toast.submitted': '제출되었습니다 (데모)',
      'toast.formCreated': '폼이 생성되었습니다',
      'activity.created': '"{title}"을(를) 생성했습니다', 'activity.updated': '"{title}"을(를) 수정했습니다',
      'activity.deleted': '"{title}"을(를) 삭제했습니다',
      'shortcuts.commandPalette': '명령 팔레트', 'shortcuts.save': '저장', 'shortcuts.undo': '실행 취소',
      'shortcuts.redo': '다시 실행', 'shortcuts.deleteField': '선택한 필드 삭제',
      'time.now': '방금 전', 'time.minutesAgo': '{n}분 전', 'time.hoursAgo': '{n}시간 전', 'time.daysAgo': '{n}일 전'
    }
  };

  /* ======================================================================
     2. Constants
     ====================================================================== */
  var STORAGE_KEY = 'formly.v1.forms';
  var SETTINGS_KEY = 'formly.v1.settings';
  var ACTIVITY_KEY = 'formly.v1.activity';

  var FIELD_DEFS = [
    { type: 'text', icon: 'type' },
    { type: 'email', icon: 'mail' },
    { type: 'phone', icon: 'phone' },
    { type: 'number', icon: 'hash' },
    { type: 'select', icon: 'list' },
    { type: 'radio', icon: 'circle-dot' },
    { type: 'checkbox', icon: 'square-check' },
    { type: 'textarea', icon: 'align-left' },
    { type: 'date', icon: 'calendar' },
    { type: 'file', icon: 'upload' },
    { type: 'divider', icon: 'minus' },
    { type: 'heading', icon: 'heading' },
    { type: 'button', icon: 'mouse-pointer-click' }
  ];

  var QUICK_TEMPLATES = ['blank', 'contact', 'feedback', 'registration'];

  /* ======================================================================
     3. State
     ====================================================================== */
  var state = {
    forms: [],
    settings: { lang: 'ja', theme: 'dark', density: 'comfortable', autosave: true, lineWrap: false },
    activity: [],
    currentFormId: null,
    view: 'dashboard',
    selectedFieldId: null,
    previewDevice: 'desktop',
    codeTab: 'html',
    history: { past: [], future: [] },
    sidebarOpen: false,
    fieldsSheetOpen: false,
    propsSheetOpen: false
  };

  /* ======================================================================
     4. Utilities
     ====================================================================== */
  function uid(prefix) {
    return (prefix || 'id') + '_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function t(key, vars) {
    var dict = I18N[state.settings.lang] || I18N.ja;
    var str = dict[key] != null ? dict[key] : (I18N.ja[key] != null ? I18N.ja[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace('{' + k + '}', vars[k]);
      });
    }
    return str;
  }

  function relativeTime(ts) {
    var diff = Math.max(0, Date.now() - ts);
    var min = Math.floor(diff / 60000);
    if (min < 1) return t('time.now');
    if (min < 60) return t('time.minutesAgo', { n: min });
    var hr = Math.floor(min / 60);
    if (hr < 24) return t('time.hoursAgo', { n: hr });
    var day = Math.floor(hr / 24);
    return t('time.daysAgo', { n: day });
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function refreshIcons() {
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  }

  /* ======================================================================
     5. Persistence
     ====================================================================== */
  function loadState() {
    try {
      var f = localStorage.getItem(STORAGE_KEY);
      var s = localStorage.getItem(SETTINGS_KEY);
      var a = localStorage.getItem(ACTIVITY_KEY);
      if (f) state.forms = JSON.parse(f);
      if (s) state.settings = Object.assign({}, state.settings, JSON.parse(s));
      if (a) state.activity = JSON.parse(a);
    } catch (e) { /* ignore corrupt storage */ }
    if (!state.forms || !state.forms.length) seedDemoData();
  }

  function persistForms() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.forms)); } catch (e) {}
  }
  function persistSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings)); } catch (e) {}
  }
  function persistActivity() {
    try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(state.activity)); } catch (e) {}
  }

  function logActivity(type, title) {
    state.activity.unshift({ id: uid('act'), type: type, title: title, time: Date.now() });
    state.activity = state.activity.slice(0, 12);
    persistActivity();
  }

  /* ======================================================================
     6. Field / Form factories
     ====================================================================== */
  function makeField(type) {
    var base = {
      id: uid('field'), type: type, label: t('field.' + type), name: type + '_' + Math.random().toString(36).slice(2, 6),
      placeholder: '', description: '', required: false, defaultValue: '', width: 'full', helpText: '',
      options: ['select', 'radio', 'checkbox'].indexOf(type) > -1 ? ['Option 1', 'Option 2', 'Option 3'] : undefined
    };
    if (type === 'heading') base.label = 'Heading';
    if (type === 'button') base.label = t('builder.submitDefault');
    return base;
  }

  function buildTemplateFields(key) {
    switch (key) {
      case 'contact':
        return [
          fieldWith('text', 'お名前', 'name', true, '山田 太郎'),
          fieldWith('email', 'メールアドレス', 'email', true, 'you@example.com'),
          fieldWith('textarea', 'メッセージ', 'message', true, 'ご相談内容をご記入ください'),
          fieldWith('button', '送信する', 'submit')
        ];
      case 'feedback':
        return [
          fieldWith('text', 'お名前', 'name', false, ''),
          fieldWith('radio', 'サービスの満足度', 'satisfaction', true, '', ['とても満足', '満足', '普通', '不満']),
          fieldWith('textarea', 'ご意見・ご感想', 'comments', false, ''),
          fieldWith('button', '送信する', 'submit')
        ];
      case 'registration':
        return [
          fieldWith('text', 'お名前', 'name', true, ''),
          fieldWith('email', 'メールアドレス', 'email', true, ''),
          fieldWith('phone', '電話番号', 'phone', false, ''),
          fieldWith('select', '参加プラン', 'plan', true, '', ['一般', '学生', 'VIP']),
          fieldWith('date', '参加希望日', 'date', true, ''),
          fieldWith('checkbox', '規約に同意する', 'agree', true, '', ['利用規約に同意します']),
          fieldWith('button', '申し込む', 'submit')
        ];
      default:
        return [];
    }
  }

  function fieldWith(type, label, name, required, placeholder, options) {
    var f = makeField(type);
    f.label = label; f.name = name; f.required = !!required; f.placeholder = placeholder || '';
    if (options) f.options = options;
    return f;
  }

  function templateMeta(key) {
    return {
      blank: { title: t('quick.blank.title'), desc: t('quick.blank.desc'), icon: 'file-plus-2' },
      contact: { title: t('quick.contact.title'), desc: t('quick.contact.desc'), icon: 'mail' },
      feedback: { title: t('quick.feedback.title'), desc: t('quick.feedback.desc'), icon: 'star' },
      registration: { title: t('quick.registration.title'), desc: t('quick.registration.desc'), icon: 'clipboard-list' }
    }[key];
  }

  function makeForm(templateKey, customTitle) {
    var meta = templateMeta(templateKey);
    var now = Date.now();
    return {
      id: uid('form'),
      title: customTitle || meta.title,
      description: '',
      template: templateKey,
      fields: buildTemplateFields(templateKey),
      createdAt: now,
      updatedAt: now
    };
  }

  function seedDemoData() {
    var f1 = makeForm('contact', 'お問い合わせ');
    f1.description = 'サービスに関するご質問はこちらから。';
    var f2 = makeForm('registration', 'カンファレンス申込フォーム');
    f2.updatedAt = Date.now() - 3 * 3600 * 1000;
    f1.updatedAt = Date.now() - 20 * 60 * 1000;
    state.forms = [f2, f1];
    state.activity = [
      { id: uid('act'), type: 'created', title: f1.title, time: Date.now() - 18 * 60 * 1000 },
      { id: uid('act'), type: 'updated', title: f2.title, time: Date.now() - 3 * 3600 * 1000 },
      { id: uid('act'), type: 'created', title: f2.title, time: Date.now() - 26 * 3600 * 1000 }
    ];
    persistForms(); persistActivity();
  }

  function getCurrentForm() {
    var f = null;
    state.forms.forEach(function (x) { if (x.id === state.currentFormId) f = x; });
    return f;
  }

  function getFieldById(form, id) {
    var found = null;
    (form.fields || []).forEach(function (fld) { if (fld.id === id) found = fld; });
    return found;
  }

  /* ======================================================================
     7. Undo / Redo
     ====================================================================== */
  function snapshot() {
    var form = getCurrentForm();
    if (!form) return;
    state.history.past.push(JSON.stringify({ title: form.title, description: form.description, fields: form.fields }));
    if (state.history.past.length > 40) state.history.past.shift();
    state.history.future = [];
    updateHistoryButtons();
  }

  function undo() {
    var form = getCurrentForm();
    if (!form || !state.history.past.length) return;
    var cur = JSON.stringify({ title: form.title, description: form.description, fields: form.fields });
    var prev = JSON.parse(state.history.past.pop());
    state.history.future.push(cur);
    Object.assign(form, prev);
    form.updatedAt = Date.now();
    state.selectedFieldId = null;
    scheduleSave();
    renderCanvas(); renderPropertiesPanel(); invalidateCode();
    updateHistoryButtons();
  }

  function redo() {
    var form = getCurrentForm();
    if (!form || !state.history.future.length) return;
    var cur = JSON.stringify({ title: form.title, description: form.description, fields: form.fields });
    var next = JSON.parse(state.history.future.pop());
    state.history.past.push(cur);
    Object.assign(form, next);
    form.updatedAt = Date.now();
    state.selectedFieldId = null;
    scheduleSave();
    renderCanvas(); renderPropertiesPanel(); invalidateCode();
    updateHistoryButtons();
  }

  function updateHistoryButtons() {
    var u = $('#undoBtn'), r = $('#redoBtn');
    if (u) u.disabled = !state.history.past.length;
    if (r) r.disabled = !state.history.future.length;
  }

  /* ======================================================================
     8. Save
     ====================================================================== */
  var scheduleSave = debounce(function () {
    var form = getCurrentForm();
    if (form) form.updatedAt = Date.now();
    persistForms();
    setSaveStatus(true);
  }, 450);

  function setSaveStatus(saved) {
    var el = $('#saveStatus');
    if (!el) return;
    el.innerHTML = saved
      ? '<span class="dot-ok"></span>' + escapeHtml(saveStatusLabel())
      : '';
  }
  function saveStatusLabel() {
    var map = { ja: 'すべての変更が保存されました', en: 'All changes saved', zh: '所有更改已保存', ko: '모든 변경 사항이 저장됨' };
    return map[state.settings.lang] || map.ja;
  }

  function manualSave() {
    var form = getCurrentForm();
    if (form) { form.updatedAt = Date.now(); persistForms(); logActivity('updated', form.title); }
    persistSettings();
    setSaveStatus(true);
    showToast(t('toast.saved'), 'success');
  }

  /* ======================================================================
     9. i18n application
     ====================================================================== */
  function applyI18n() {
    document.documentElement.lang = state.settings.lang;
    $all('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $all('[data-i18n-placeholder]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'))); });
    $all('[data-lang]').forEach(function (el) { el.classList.toggle('is-active', el.getAttribute('data-lang') === state.settings.lang); el.setAttribute('aria-selected', el.getAttribute('data-lang') === state.settings.lang); });
  }

  /* ======================================================================
     10. View switching
     ====================================================================== */
  var VIEW_TITLES = {
    dashboard: ['nav.dashboard', 'dash.greetingSub'],
    forms: ['nav.forms', null],
    templates: ['templates.title', null],
    settings: ['nav.settings', null]
  };

  function switchView(view, opts) {
    opts = opts || {};
    var prevEl = $('.view:not([hidden])');
    state.view = view;
    if (view !== 'builder' && view !== 'preview' && view !== 'code') {
      state.currentFormId = opts.keepForm ? state.currentFormId : state.currentFormId;
    }

    $all('.view').forEach(function (v) { v.hidden = true; });
    var targetId = { dashboard: 'view-dashboard', forms: 'view-forms', templates: 'view-templates',
      builder: 'view-builder', preview: 'view-preview', code: 'view-code', settings: 'view-settings' }[view];
    var targetEl = $('#' + targetId);
    if (targetEl) targetEl.hidden = false;

    $all('.nav-item[data-view-target]').forEach(function (el) {
      var v = el.getAttribute('data-view-target');
      var active = v === view || (v === 'forms' && ['builder', 'preview', 'code'].indexOf(view) > -1 && false);
      el.classList.toggle('is-active', v === view);
    });

    var isBuilderGroup = ['builder', 'preview', 'code'].indexOf(view) > -1;
    $('#builderTabs').hidden = !isBuilderGroup;
    if (isBuilderGroup) {
      $all('.tab-btn').forEach(function (b) {
        var active = b.getAttribute('data-subview') === view;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active);
      });
      positionTabIndicator();
    }

    $('#createFormBtn').hidden = isBuilderGroup;
    $('#saveBtn').hidden = !isBuilderGroup;

    var titleEl = $('#topbarTitle'), subEl = $('#topbarSubtitle');
    if (isBuilderGroup) {
      var form = getCurrentForm();
      titleEl.textContent = form ? form.title : '';
      subEl.textContent = form ? t('forms.updated') + ' · ' + relativeTime(form.updatedAt) : '';
    } else {
      var cfg = VIEW_TITLES[view] || ['', null];
      titleEl.textContent = t(cfg[0]);
      subEl.textContent = cfg[1] ? t(cfg[1]) : '';
    }

    closeAllSheets();
    renderView(view);

    var newEl = targetEl;
    if (window.gsap && newEl) {
      gsap.fromTo(newEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' });
    }
    $('#viewContainer').scrollTop = 0;
    refreshIcons();
  }

  function positionTabIndicator() {
    var active = $('.tab-btn.is-active');
    var ind = $('.tab-indicator');
    if (!active || !ind) return;
    ind.style.width = active.offsetWidth + 'px';
    ind.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }

  function openForm(id, tab) {
    state.currentFormId = id;
    state.selectedFieldId = null;
    state.history = { past: [], future: [] };
    switchView(tab || 'builder', { keepForm: true });
  }

  function renderView(view) {
    if (view === 'dashboard') renderDashboard();
    else if (view === 'forms') renderFormsView();
    else if (view === 'templates') renderTemplatesView();
    else if (view === 'builder') { renderCanvas(); renderComponentsPanels(); renderPropertiesPanel(); updateHistoryButtons(); setSaveStatus(true); }
    else if (view === 'preview') renderPreview();
    else if (view === 'code') renderCode();
    else if (view === 'settings') renderSettingsView();
  }

  /* ======================================================================
     11. Dashboard
     ====================================================================== */
  function renderDashboard() {
    var totalFields = state.forms.reduce(function (n, f) { return n + f.fields.length; }, 0);
    var lastEdited = state.forms.reduce(function (max, f) { return Math.max(max, f.updatedAt); }, 0);
    var weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    var thisWeek = state.forms.filter(function (f) { return f.updatedAt >= weekAgo; }).length;

    $('#statRow').innerHTML = [
      statCard('file-stack', state.forms.length, 'stat.totalForms', 'accent'),
      statCard('layers', totalFields, 'stat.totalFields', ''),
      statCard('clock', lastEdited ? relativeTime(lastEdited) : '—', 'stat.lastEdited', 'gold'),
      statCard('trending-up', thisWeek, 'stat.thisWeek', 'success')
    ].join('');

    $('#quickActionsGrid').innerHTML = QUICK_TEMPLATES.map(function (key) {
      var m = templateMeta(key);
      return '<button class="quick-card" data-action="create-from-template" data-template="' + key + '">' +
        '<span class="quick-card__icon"><i data-lucide="' + m.icon + '"></i></span>' +
        '<span><span class="quick-card__title">' + escapeHtml(m.title) + '</span>' +
        '<div class="quick-card__desc">' + escapeHtml(m.desc) + '</div></span></button>';
    }).join('');

    var recent = clone(state.forms).sort(function (a, b) { return b.updatedAt - a.updatedAt; }).slice(0, 4);
    $('#recentFormsGrid').innerHTML = recent.length ? recent.map(formCardHtml).join('') : emptyStateHtml();

    $('#activityList').innerHTML = state.activity.length ? state.activity.slice(0, 7).map(activityItemHtml).join('')
      : '<li class="activity-item"><span class="activity-item__text" style="color:var(--text-muted)">—</span></li>';

    refreshIcons();
  }

  function statCard(icon, value, labelKey, tone) {
    return '<div class="stat-card"><div class="stat-card__top">' +
      '<span class="stat-card__icon ' + tone + '"><i data-lucide="' + icon + '"></i></span></div>' +
      '<div class="stat-card__value">' + value + '</div>' +
      '<div class="stat-card__label">' + t(labelKey) + '</div></div>';
  }

  function formCardHtml(form) {
    var count = form.fields.length;
    return '<div class="form-card" data-action="open-form" data-form-id="' + form.id + '" tabindex="0" role="button">' +
      '<div class="form-card__thumb">' +
      '<div class="thumb-line w60"></div><div class="thumb-line w80"></div><div class="thumb-line w40"></div>' +
      '<div class="thumb-block"></div></div>' +
      '<div><div class="form-card__title">' + escapeHtml(form.title) + '</div>' +
      '<div class="form-card__meta"><span>' + count + ' fields</span><span class="dot"></span><span>' + relativeTime(form.updatedAt) + '</span></div></div>' +
      '<button class="form-card__menu" data-action="form-menu" data-form-id="' + form.id + '" aria-label="menu"><i data-lucide="more-horizontal"></i></button>' +
      '</div>';
  }

  function activityItemHtml(item) {
    var iconMap = { created: 'plus-circle', updated: 'pencil', deleted: 'trash-2' };
    var text = t('activity.' + item.type, { title: item.title });
    var parts = text.split(item.title);
    return '<li class="activity-item"><span class="activity-item__icon"><i data-lucide="' + (iconMap[item.type] || 'circle') + '"></i></span>' +
      '<div><div class="activity-item__text">' + escapeHtml(parts[0]) + '<b>' + escapeHtml(item.title) + '</b>' + escapeHtml(parts[1] || '') + '</div>' +
      '<div class="activity-item__time">' + relativeTime(item.time) + '</div></div></li>';
  }

  function emptyStateHtml() {
    return '<div class="empty-state">' +
      '<div class="empty-state__icon"><i data-lucide="file-plus-2"></i></div>' +
      '<div class="empty-state__title">' + t('forms.empty.title') + '</div>' +
      '<div class="empty-state__desc">' + t('forms.empty.desc') + '</div>' +
      '<div class="empty-state__actions">' +
      '<button class="btn btn--primary" data-action="create-blank"><i data-lucide="plus"></i>' + t('forms.empty.primary') + '</button>' +
      '<button class="btn btn--ghost" data-view-target="templates">' + t('forms.empty.secondary') + '</button>' +
      '</div></div>';
  }

  /* ======================================================================
     12. Forms view
     ====================================================================== */
  function renderFormsView(filter) {
    var list = clone(state.forms).sort(function (a, b) { return b.updatedAt - a.updatedAt; });
    if (filter) {
      var q = filter.toLowerCase();
      list = list.filter(function (f) { return f.title.toLowerCase().indexOf(q) > -1; });
    }
    $('#allFormsGrid').innerHTML = list.length ? list.map(formCardHtml).join('') : emptyStateHtml();
    refreshIcons();
  }

  /* ======================================================================
     13. Templates view
     ====================================================================== */
  function renderTemplatesView() {
    var keys = QUICK_TEMPLATES;
    $('#templatesGrid').innerHTML = keys.map(function (key) {
      var m = templateMeta(key);
      var fields = buildTemplateFields(key);
      return '<button class="template-card" data-action="create-from-template" data-template="' + key + '">' +
        '<div class="template-card__preview">' +
        (fields.slice(0, 3).map(function (f) { return '<div class="thumb-line w' + (60 + Math.floor(Math.random() * 30)) + '" style="width:' + (50 + Math.random() * 40) + '%"></div>'; }).join('')) +
        '</div>' +
        '<div><div class="template-card__title">' + escapeHtml(m.title) + '</div>' +
        '<div class="template-card__desc">' + escapeHtml(m.desc) + '</div></div>' +
        '<div class="template-card__fields">' + (fields.slice(0, 4).map(function (f) { return '<span class="badge">' + t('field.' + f.type) + '</span>'; }).join('')) + '</div>' +
        '</button>';
    }).join('');
    refreshIcons();
  }

  /* ======================================================================
     14. Builder — components panel
     ====================================================================== */
  function componentsGridHtml() {
    return FIELD_DEFS.map(function (d) {
      return '<button class="component-btn" draggable="true" data-field-type="' + d.type + '" data-tooltip="' + escapeHtml(t('field.' + d.type)) + '">' +
        '<span class="component-btn__icon"><i data-lucide="' + d.icon + '"></i></span>' +
        '<span class="component-btn__label">' + t('field.' + d.type) + '</span></button>';
    }).join('');
  }

  function renderComponentsPanels() {
    var html = componentsGridHtml();
    $('#componentsGrid').innerHTML = html;
    $('#componentsGridMobile').innerHTML = html;
    refreshIcons();
  }

  /* ======================================================================
     15. Builder — canvas
     ====================================================================== */
  function renderCanvas() {
    var form = getCurrentForm();
    var canvas = $('#formCanvas');
    if (!form) { canvas.innerHTML = ''; return; }

    var fieldsHtml = form.fields.length
      ? form.fields.map(renderFieldRow).join('')
      : '<div class="empty-state" style="padding:44px 16px">' +
        '<div class="empty-state__icon"><i data-lucide="mouse-pointer-click"></i></div>' +
        '<div class="empty-state__title">' + t('builder.canvasEmpty.title') + '</div>' +
        '<div class="empty-state__desc">' + t('builder.canvasEmpty.desc') + '</div></div>';

    canvas.innerHTML =
      '<input class="canvas-title" id="canvasTitleInput" data-prop="__title" value="' + escapeHtml(form.title) + '" placeholder="' + t('builder.formTitlePlaceholder') + '" aria-label="' + t('prop.formTitle') + '">' +
      '<textarea class="canvas-desc" id="canvasDescInput" data-prop="__description" rows="1" placeholder="' + t('builder.formDescPlaceholder') + '" aria-label="' + t('prop.formDescription') + '">' + escapeHtml(form.description || '') + '</textarea>' +
      '<div id="fieldList">' + fieldsHtml + '</div>';

    refreshIcons();
    positionTabIndicator();
  }

  function renderFieldRow(field) {
    var selected = field.id === state.selectedFieldId;
    var inner = fieldPreviewHtml(field);
    var showLabel = field.type !== 'divider' && field.type !== 'heading' && field.type !== 'button';
    return '<div class="field-row' + (selected ? ' is-selected' : '') + '" data-field-id="' + field.id + '" draggable="true" role="button" tabindex="0" aria-selected="' + selected + '">' +
      (showLabel ? '<div class="field-row__label">' + escapeHtml(field.label) + (field.required ? ' <span class="field-row__required">*</span>' : '') + '</div>' : '') +
      inner +
      (field.helpText && showLabel ? '<div class="field-row__help">' + escapeHtml(field.helpText) + '</div>' : '') +
      '<div class="field-row__controls">' +
      '<button class="field-row__drag-handle" data-tooltip="Drag" aria-label="drag"><i data-lucide="grip-vertical"></i></button>' +
      '<button data-action="move-up" data-field-id="' + field.id + '" data-tooltip="' + t('action.moveUp') + '" aria-label="' + t('action.moveUp') + '"><i data-lucide="chevron-up"></i></button>' +
      '<button data-action="move-down" data-field-id="' + field.id + '" data-tooltip="' + t('action.moveDown') + '" aria-label="' + t('action.moveDown') + '"><i data-lucide="chevron-down"></i></button>' +
      '<button data-action="duplicate-field" data-field-id="' + field.id + '" data-tooltip="' + t('action.duplicate') + '" aria-label="' + t('action.duplicate') + '"><i data-lucide="copy"></i></button>' +
      '<button class="danger" data-action="delete-field" data-field-id="' + field.id + '" data-tooltip="' + t('action.delete') + '" aria-label="' + t('action.delete') + '"><i data-lucide="trash-2"></i></button>' +
      '</div></div>';
  }

  function fieldPreviewHtml(field) {
    switch (field.type) {
      case 'text': case 'email': case 'phone': case 'number': case 'date':
        return '<div class="field-fake-input">' + (field.placeholder || placeholderFor(field.type)) + '</div>';
      case 'textarea':
        return '<div class="field-fake-input textarea">' + (field.placeholder || placeholderFor(field.type)) + '</div>';
      case 'select':
        return '<div class="field-fake-input field-fake-select"><span>' + (field.placeholder || '選択してください') + '</span><i data-lucide="chevron-down" style="width:14px;height:14px"></i></div>';
      case 'radio':
        return '<div class="field-fake-radio-group">' + (field.options || []).map(function (o) { return '<span class="field-fake-option"><span class="field-fake-shape round"></span>' + escapeHtml(o) + '</span>'; }).join('') + '</div>';
      case 'checkbox':
        return '<div class="field-fake-checkbox-group">' + (field.options || []).map(function (o) { return '<span class="field-fake-option"><span class="field-fake-shape square"></span>' + escapeHtml(o) + '</span>'; }).join('') + '</div>';
      case 'file':
        return '<div class="field-fake-input"><i data-lucide="upload" style="width:14px;height:14px;display:inline;vertical-align:-2px;margin-right:6px"></i>Choose file...</div>';
      case 'divider':
        return '<div class="field-divider"></div>';
      case 'heading':
        return '<div class="field-heading">' + escapeHtml(field.label) + '</div>';
      case 'button':
        return '<div class="field-button-preview">' + escapeHtml(field.label) + '</div>';
      default: return '';
    }
  }

  function placeholderFor(type) {
    var map = { text: 'テキストを入力', email: 'you@example.com', phone: '090-1234-5678', number: '0', date: 'YYYY-MM-DD', textarea: 'テキストを入力' };
    return map[type] || '';
  }

  /* ---- field CRUD ---- */
  function addField(type, atIndex) {
    var form = getCurrentForm();
    if (!form) return;
    snapshot();
    var f = makeField(type);
    if (atIndex == null || atIndex > form.fields.length) form.fields.push(f);
    else form.fields.splice(atIndex, 0, f);
    state.selectedFieldId = f.id;
    scheduleSave();
    renderCanvas(); renderPropertiesPanel(); invalidateCode();
    animateFieldIn(f.id);
    showToast(t('toast.fieldAdded'), 'success');
  }

  function selectField(id) {
    state.selectedFieldId = id;
    renderCanvas(); renderPropertiesPanel();
    if (window.innerWidth <= 1080) openSheet('props');
  }

  function deleteField(id) {
    var form = getCurrentForm();
    if (!form) return;
    var row = $('.field-row[data-field-id="' + id + '"]');
    var doRemove = function () {
      snapshot();
      form.fields = form.fields.filter(function (f) { return f.id !== id; });
      if (state.selectedFieldId === id) state.selectedFieldId = null;
      scheduleSave();
      renderCanvas(); renderPropertiesPanel(); invalidateCode();
      showToast(t('toast.fieldDeleted'), 'error');
    };
    if (window.gsap && row) {
      gsap.to(row, { opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, duration: 0.22, ease: 'power2.in', onComplete: doRemove });
    } else doRemove();
  }

  function duplicateField(id) {
    var form = getCurrentForm();
    if (!form) return;
    var idx = -1; var src = null;
    form.fields.forEach(function (f, i) { if (f.id === id) { idx = i; src = f; } });
    if (!src) return;
    snapshot();
    var copy = clone(src);
    copy.id = uid('field');
    copy.name = copy.name + '_copy';
    form.fields.splice(idx + 1, 0, copy);
    state.selectedFieldId = copy.id;
    scheduleSave();
    renderCanvas(); renderPropertiesPanel(); invalidateCode();
    animateFieldIn(copy.id);
    showToast(t('toast.fieldDuplicated'), 'success');
  }

  function moveField(id, dir) {
    var form = getCurrentForm();
    if (!form) return;
    var idx = -1; form.fields.forEach(function (f, i) { if (f.id === id) idx = i; });
    var newIdx = idx + dir;
    if (idx < 0 || newIdx < 0 || newIdx >= form.fields.length) return;
    snapshot();
    var tmp = form.fields[idx]; form.fields[idx] = form.fields[newIdx]; form.fields[newIdx] = tmp;
    scheduleSave();
    renderCanvas(); invalidateCode();
  }

  function reorderField(dragId, targetId, before) {
    var form = getCurrentForm();
    if (!form || dragId === targetId) return;
    var fields = form.fields;
    var dragIdx = -1, targetIdx = -1;
    fields.forEach(function (f, i) { if (f.id === dragId) dragIdx = i; if (f.id === targetId) targetIdx = i; });
    if (dragIdx < 0 || targetIdx < 0) return;
    snapshot();
    var item = fields.splice(dragIdx, 1)[0];
    targetIdx = fields.indexOf(getFieldById(form, targetId));
    var insertAt = before ? targetIdx : targetIdx + 1;
    fields.splice(insertAt, 0, item);
    scheduleSave();
    renderCanvas(); invalidateCode();
  }

  function animateFieldIn(id) {
    var row = $('.field-row[data-field-id="' + id + '"]');
    if (row) {
      if (window.gsap) gsap.fromTo(row, { opacity: 0, y: -6, scale: .98 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'power2.out' });
      row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function updateFormMeta(prop, value) {
    var form = getCurrentForm();
    if (!form) return;
    if (prop === '__title') form.title = value;
    if (prop === '__description') form.description = value;
    scheduleSave();
    invalidateCode();
    if (state.view === 'builder') {
      var titleEl = $('#topbarTitle');
      if (titleEl && prop === '__title') titleEl.textContent = value;
    }
  }

  function updateFieldProp(id, prop, value) {
    var form = getCurrentForm();
    var field = form && getFieldById(form, id);
    if (!field) return;
    if (prop === 'required') field.required = value;
    else field[prop] = value;
    scheduleSave();
    invalidateCode();
    renderCanvas();
  }

  /* ======================================================================
     16. Properties panel
     ====================================================================== */
  function renderPropertiesPanel() {
    var form = getCurrentForm();
    var html;
    if (!form) html = '';
    else {
      var field = state.selectedFieldId ? getFieldById(form, state.selectedFieldId) : null;
      html = field ? fieldPropertiesHtml(field) : formPropertiesHtml(form);
    }
    $('#propertiesBody').innerHTML = html;
    $('#propertiesBodyMobile').innerHTML = html;
    var propsBtn = $('#openPropsSheet');
    if (propsBtn) propsBtn.disabled = !form;
    refreshIcons();
  }

  function formPropertiesHtml(form) {
    return '<div class="prop-group"><div class="prop-group__title">' + t('prop.formSettings') + '</div>' +
      '<div class="prop-empty" style="padding:8px 0 18px;text-align:left">' +
      '<div class="form-field"><label class="form-field__label">' + t('prop.formTitle') + '</label>' +
      '<input class="form-field__input" data-prop="__title" data-target="form" value="' + escapeHtml(form.title) + '"></div>' +
      '<div class="form-field"><label class="form-field__label">' + t('prop.formDescription') + '</label>' +
      '<textarea class="form-field__input" data-prop="__description" data-target="form" rows="3">' + escapeHtml(form.description || '') + '</textarea></div>' +
      '</div></div>' +
      '<div class="prop-group"><p style="font-size:11.5px;color:var(--text-muted);line-height:1.7">' + t('prop.selectNote') + '</p></div>';
  }

  function fieldPropertiesHtml(field) {
    var isChoice = ['select', 'radio', 'checkbox'].indexOf(field.type) > -1;
    var isSimpleContent = field.type === 'heading' || field.type === 'button' || field.type === 'divider';
    var out = '<div class="prop-group">';
    out += '<span class="field-type-chip"><i data-lucide="' + (FIELD_DEFS.filter(function (d) { return d.type === field.type; })[0] || {}).icon + '"></i>' + t('field.' + field.type) + '</span>';

    if (field.type === 'heading') {
      out += formField('text', t('prop.headingText'), field.id, 'label', field.label);
    } else if (field.type === 'button') {
      out += formField('text', t('prop.buttonText'), field.id, 'label', field.label);
    } else if (field.type !== 'divider') {
      out += formField('text', t('prop.label'), field.id, 'label', field.label);
      out += formField('text', t('prop.name'), field.id, 'name', field.name);
    }
    out += '</div>';

    if (!isSimpleContent) {
      out += '<div class="prop-group"><div class="prop-group__title">' + t('prop.fieldSettings') + '</div>';
      if (!isChoice) out += formField('text', t('prop.placeholder'), field.id, 'placeholder', field.placeholder);
      out += formField('textarea', t('prop.description'), field.id, 'description', field.description, 2);

      if (isChoice) {
        out += optionsEditorHtml(field);
      } else {
        out += formField('text', t('prop.defaultValue'), field.id, 'defaultValue', field.defaultValue);
      }

      out += formField('textarea', t('prop.helpText'), field.id, 'helpText', field.helpText, 2);

      out += '<div class="switch-row"><div><div class="switch-row__label">' + t('prop.required') + '</div>' +
        '<div class="switch-row__desc">' + t('prop.requiredDesc') + '</div></div>' +
        '<button class="switch' + (field.required ? ' is-on' : '') + '" data-action="toggle-required" data-field-id="' + field.id + '" role="switch" aria-checked="' + field.required + '" aria-label="' + t('prop.required') + '"></button></div>';

      out += '<div class="form-field"><label class="form-field__label">' + t('prop.width') + '</label>' +
        '<div class="width-toggle">' +
        '<button data-action="set-width" data-value="full" data-field-id="' + field.id + '" class="' + (field.width !== 'half' ? 'is-active' : '') + '">' + t('prop.widthFull') + '</button>' +
        '<button data-action="set-width" data-value="half" data-field-id="' + field.id + '" class="' + (field.width === 'half' ? 'is-active' : '') + '">' + t('prop.widthHalf') + '</button>' +
        '</div></div>';
      out += '</div>';
    }

    out += '<div class="prop-group"><button class="btn btn--danger" style="width:100%;justify-content:center" data-action="delete-field" data-field-id="' + field.id + '"><i data-lucide="trash-2"></i>' + t('prop.deleteField') + '</button></div>';
    return out;
  }

  function formField(type, label, fieldId, prop, value, rows) {
    var attrs = 'data-prop="' + prop + '" data-field-id="' + fieldId + '"';
    var input = type === 'textarea'
      ? '<textarea class="form-field__input" rows="' + (rows || 2) + '" ' + attrs + '>' + escapeHtml(value || '') + '</textarea>'
      : '<input class="form-field__input" type="text" ' + attrs + ' value="' + escapeHtml(value || '') + '">';
    return '<div class="form-field"><label class="form-field__label">' + label + '</label>' + input + '</div>';
  }

  function optionsEditorHtml(field) {
    var opts = field.options || [];
    var rows = opts.map(function (opt, i) {
      return '<div class="option-row"><input value="' + escapeHtml(opt) + '" data-action="option-input" data-field-id="' + field.id + '" data-index="' + i + '">' +
        '<button data-action="remove-option" data-field-id="' + field.id + '" data-index="' + i + '" aria-label="remove"><i data-lucide="x"></i></button></div>';
    }).join('');
    return '<div class="form-field"><label class="form-field__label">' + t('prop.options') + '</label>' + rows +
      '<button class="add-option-btn" data-action="add-option" data-field-id="' + field.id + '"><i data-lucide="plus" style="width:13px;height:13px"></i>' + t('action.addOption') + '</button></div>';
  }

  /* ======================================================================
     17. Code generation
     ====================================================================== */
  var codeCache = null;
  function invalidateCode() { codeCache = null; }

  function generateCode(form) {
    if (!form) return { html: '', css: '', js: '' };
    return { html: generateHTML(form), css: generateCSS(form), js: generateJS(form) };
  }

  function inputTypeFor(type) {
    return { text: 'text', email: 'email', phone: 'tel', number: 'number', date: 'date' }[type] || 'text';
  }

  function generateHTML(form) {
    var lines = [];
    lines.push('<form class="formly-form" id="' + slug(form.title) + '-form" novalidate>');
    lines.push('  <h2 class="formly-form__title">' + escapeHtml(form.title) + '</h2>');
    if (form.description) lines.push('  <p class="formly-form__desc">' + escapeHtml(form.description) + '</p>');
    form.fields.forEach(function (f) {
      lines.push(fieldToHTML(f));
    });
    lines.push('</form>');
    return lines.join('\n');
  }

  function fieldToHTML(f) {
    var req = f.required ? ' required' : '';
    var widthClass = f.width === 'half' ? ' formly-field--half' : '';
    switch (f.type) {
      case 'text': case 'email': case 'phone': case 'number': case 'date':
        return '  <div class="formly-field' + widthClass + '">\n' +
          '    <label for="' + f.name + '">' + escapeHtml(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</label>\n' +
          '    <input type="' + inputTypeFor(f.type) + '" id="' + f.name + '" name="' + f.name + '"' +
          (f.placeholder ? ' placeholder="' + escapeHtml(f.placeholder) + '"' : '') +
          (f.defaultValue ? ' value="' + escapeHtml(f.defaultValue) + '"' : '') + req + '>\n' +
          (f.helpText ? '    <p class="formly-help">' + escapeHtml(f.helpText) + '</p>\n' : '') +
          '  </div>';
      case 'textarea':
        return '  <div class="formly-field' + widthClass + '">\n' +
          '    <label for="' + f.name + '">' + escapeHtml(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</label>\n' +
          '    <textarea id="' + f.name + '" name="' + f.name + '" rows="4"' + (f.placeholder ? ' placeholder="' + escapeHtml(f.placeholder) + '"' : '') + req + '>' + escapeHtml(f.defaultValue || '') + '</textarea>\n' +
          (f.helpText ? '    <p class="formly-help">' + escapeHtml(f.helpText) + '</p>\n' : '') +
          '  </div>';
      case 'select':
        return '  <div class="formly-field' + widthClass + '">\n' +
          '    <label for="' + f.name + '">' + escapeHtml(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</label>\n' +
          '    <select id="' + f.name + '" name="' + f.name + '"' + req + '>\n' +
          '      <option value="" disabled selected>' + escapeHtml(f.placeholder || '選択してください') + '</option>\n' +
          (f.options || []).map(function (o) { return '      <option value="' + escapeHtml(o) + '">' + escapeHtml(o) + '</option>'; }).join('\n') + '\n' +
          '    </select>\n  </div>';
      case 'radio':
        return '  <fieldset class="formly-field' + widthClass + '">\n    <legend>' + escapeHtml(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</legend>\n' +
          (f.options || []).map(function (o, i) {
            var id = f.name + '_' + i;
            return '    <label class="formly-choice"><input type="radio" id="' + id + '" name="' + f.name + '" value="' + escapeHtml(o) + '"' + (i === 0 && f.required ? ' required' : '') + '> ' + escapeHtml(o) + '</label>';
          }).join('\n') + '\n  </fieldset>';
      case 'checkbox':
        return '  <fieldset class="formly-field' + widthClass + '">\n    <legend>' + escapeHtml(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</legend>\n' +
          (f.options || []).map(function (o, i) {
            var id = f.name + '_' + i;
            return '    <label class="formly-choice"><input type="checkbox" id="' + id + '" name="' + f.name + '[]" value="' + escapeHtml(o) + '"' + (f.required ? ' required' : '') + '> ' + escapeHtml(o) + '</label>';
          }).join('\n') + '\n  </fieldset>';
      case 'file':
        return '  <div class="formly-field' + widthClass + '">\n' +
          '    <label for="' + f.name + '">' + escapeHtml(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</label>\n' +
          '    <input type="file" id="' + f.name + '" name="' + f.name + '"' + req + '>\n  </div>';
      case 'divider':
        return '  <hr class="formly-divider">';
      case 'heading':
        return '  <h3 class="formly-heading">' + escapeHtml(f.label) + '</h3>';
      case 'button':
        return '  <button type="submit" class="formly-submit">' + escapeHtml(f.label) + '</button>';
      default: return '';
    }
  }

  function generateCSS(form) {
    return [
      '.formly-form{max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:18px;',
      '  font-family:-apple-system,"Segoe UI",Inter,sans-serif;color:#17171b;}',
      '.formly-form__title{font-size:20px;font-weight:800;margin:0;}',
      '.formly-form__desc{font-size:13px;color:#6b6b76;margin-top:-10px;}',
      '.formly-field{display:flex;flex-direction:column;gap:6px;}',
      '.formly-field--half{width:calc(50% - 9px);}',
      '.formly-field label,.formly-field legend{font-size:13px;font-weight:600;}',
      '.formly-field input,.formly-field select,.formly-field textarea{',
      '  padding:10px 12px;border:1px solid #d8d8de;border-radius:8px;font-size:14px;outline:none;',
      '  transition:border-color .15s ease;}',
      '.formly-field input:focus,.formly-field select:focus,.formly-field textarea:focus{border-color:#4d7fff;}',
      '.formly-choice{display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:400;}',
      '.formly-help{font-size:11.5px;color:#8b8b95;}',
      '.req{color:#f2555f;}',
      '.formly-divider{border:none;border-top:1px solid #e4e4ea;margin:4px 0;}',
      '.formly-heading{font-size:16px;font-weight:700;margin:6px 0 0;}',
      '.formly-submit{padding:11px 20px;background:#4d7fff;color:#fff;border:none;border-radius:8px;',
      '  font-size:14px;font-weight:700;cursor:pointer;transition:background .15s ease;}',
      '.formly-submit:hover{background:#6690ff;}',
      '.formly-form.is-submitted .formly-success{display:block;}'
    ].join('\n');
  }

  function generateJS(form) {
    var idName = slug(form.title) + '-form';
    var requiredNames = form.fields.filter(function (f) { return f.required && f.type !== 'button'; }).map(function (f) { return f.name; });
    return [
      "document.addEventListener('DOMContentLoaded', function () {",
      "  var form = document.getElementById('" + idName + "');",
      '  if (!form) return;',
      "  form.addEventListener('submit', function (e) {",
      '    e.preventDefault();',
      '    var valid = true;',
      '    var required = ' + JSON.stringify(requiredNames) + ';',
      '    required.forEach(function (name) {',
      '      var field = form.elements[name];',
      '      if (!field) return;',
      '      var value = field.value !== undefined ? field.value : "";',
      '      if (!value) { valid = false; field.style.borderColor = "#f2555f"; }',
      '      else { field.style.borderColor = ""; }',
      '    });',
      '    if (!valid) return;',
      '    console.log("Formly submit:", Object.fromEntries(new FormData(form)));',
      '    alert("送信されました（デモ）");',
      '    form.reset();',
      '  });',
      '});'
    ].join('\n');
  }

  function slug(str) {
    return (str || 'form').toLowerCase().replace(/[^a-z0-9぀-ヿ一-鿿]+/g, '-').replace(/^-+|-+$/g, '') || 'form';
  }

  function renderCode() {
    var form = getCurrentForm();
    if (!codeCache) codeCache = generateCode(form);
    var langMap = { html: 'markup', css: 'css', js: 'javascript' };
    var content = codeCache[state.codeTab];
    var codeEl = $('#codeContent');
    codeEl.className = 'language-' + langMap[state.codeTab];
    codeEl.textContent = content;
    if (window.Prism) Prism.highlightElement(codeEl);

    $all('.code-tab').forEach(function (b) {
      var active = b.getAttribute('data-code-tab') === state.codeTab;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active);
    });
  }

  /* ======================================================================
     18. Preview
     ====================================================================== */
  function renderPreview() {
    var form = getCurrentForm();
    var mount = $('#previewRender');
    if (!form) { mount.innerHTML = ''; return; }
    mount.innerHTML = buildLivePreviewHTML(form);
    $('#browserUrl').textContent = 'formly.app/f/' + slug(form.title);
    var formEl = mount.querySelector('form');
    if (formEl) {
      formEl.addEventListener('submit', function (e) {
        e.preventDefault();
        var missing = formEl.querySelectorAll('[required]:invalid');
        if (missing.length) { showToast(t('toast.submitted'), 'error'); return; }
        showToast(t('toast.submitted'), 'success');
        formEl.reset();
      });
    }
    refreshIcons();
  }

  function buildLivePreviewHTML(form) {
    var out = '<h2 style="font-size:19px;font-weight:800;margin-bottom:4px">' + escapeHtml(form.title) + '</h2>';
    if (form.description) out += '<p style="font-size:12.5px;color:var(--text-muted);margin-bottom:18px">' + escapeHtml(form.description) + '</p>';
    out += '<form style="display:flex;flex-direction:column;gap:16px">';
    form.fields.forEach(function (f) { out += livePreviewField(f); });
    out += '</form>';
    return out;
  }

  function livePreviewField(f) {
    var label = f.required ? escapeHtml(f.label) + ' <span style="color:var(--danger)">*</span>' : escapeHtml(f.label);
    var labelHtml = '<label style="display:block;font-size:12.5px;font-weight:600;margin-bottom:6px;color:var(--text-secondary)">' + label + '</label>';
    var reqAttr = f.required ? ' required' : '';
    var inputStyle = 'width:100%;padding:9px 11px;border-radius:8px;border:1px solid var(--border-default);background:var(--bg-input);color:var(--text-primary);font-size:13px';
    switch (f.type) {
      case 'text': case 'email': case 'phone': case 'number': case 'date':
        return '<div>' + labelHtml + '<input type="' + inputTypeFor(f.type) + '" style="' + inputStyle + '"' + (f.placeholder ? ' placeholder="' + escapeHtml(f.placeholder) + '"' : '') + reqAttr + '></div>';
      case 'textarea':
        return '<div>' + labelHtml + '<textarea rows="4" style="' + inputStyle + ';resize:vertical"' + (f.placeholder ? ' placeholder="' + escapeHtml(f.placeholder) + '"' : '') + reqAttr + '></textarea></div>';
      case 'select':
        return '<div>' + labelHtml + '<select style="' + inputStyle + '"' + reqAttr + '><option value="" disabled selected>' + escapeHtml(f.placeholder || '選択してください') + '</option>' +
          (f.options || []).map(function (o) { return '<option>' + escapeHtml(o) + '</option>'; }).join('') + '</select></div>';
      case 'radio':
        return '<div>' + labelHtml + '<div style="display:flex;flex-direction:column;gap:8px">' +
          (f.options || []).map(function (o, i) { return '<label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="radio" name="' + f.id + '"' + (i === 0 && f.required ? ' required' : '') + '>' + escapeHtml(o) + '</label>'; }).join('') + '</div></div>';
      case 'checkbox':
        return '<div>' + labelHtml + '<div style="display:flex;flex-direction:column;gap:8px">' +
          (f.options || []).map(function (o) { return '<label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox">' + escapeHtml(o) + '</label>'; }).join('') + '</div></div>';
      case 'file':
        return '<div>' + labelHtml + '<input type="file" style="' + inputStyle + '"></div>';
      case 'divider':
        return '<hr style="border:none;border-top:1px solid var(--border-subtle)">';
      case 'heading':
        return '<h3 style="font-size:15px;font-weight:700">' + escapeHtml(f.label) + '</h3>';
      case 'button':
        return '<button type="submit" style="padding:10px 18px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13.5px;cursor:pointer">' + escapeHtml(f.label) + '</button>';
      default: return '';
    }
  }

  /* ======================================================================
     19. Settings
     ====================================================================== */
  function renderSettingsView() {
    var s = state.settings;
    var langNames = { ja: '日本語', en: 'English', zh: '中文', ko: '한국어' };
    var html = '';

    html += '<div class="settings-card"><div class="settings-card__title">' + t('settings.profile') + '</div>' +
      '<div class="settings-card__desc">' + t('settings.profileDesc') + '</div>' +
      '<div class="settings-row"><div class="user-chip" style="padding:0"><span class="avatar">M</span>' +
      '<span class="user-chip__info"><span class="user-chip__name">Masahiro</span><span class="user-chip__plan">Freelance Plan</span></span></div></div></div>';

    html += '<div class="settings-card"><div class="settings-card__title">' + t('settings.language') + '</div>' +
      '<div class="settings-card__desc">' + t('settings.languageDesc') + '</div>' +
      '<div class="settings-row" style="border-top:none;padding-top:0"><div style="display:flex;gap:8px;flex-wrap:wrap">' +
      Object.keys(langNames).map(function (l) {
        return '<button class="btn ' + (s.lang === l ? 'btn--primary' : 'btn--ghost') + ' btn--sm" data-action="set-lang" data-lang="' + l + '">' + langNames[l] + '</button>';
      }).join('') + '</div></div></div>';

    html += '<div class="settings-card"><div class="settings-card__title">' + t('settings.appearance') + '</div>' +
      '<div class="settings-card__desc">' + t('settings.appearanceDesc') + '</div>' +
      '<div class="settings-row" style="border-top:none;padding-top:0">' +
      '<div><div class="settings-row__label">' + t('settings.theme.dark') + ' / ' + t('settings.theme.light') + '</div></div>' +
      '<div class="theme-options">' +
      '<button class="theme-opt theme-opt--dark' + (s.theme === 'dark' ? ' is-active' : '') + '" data-action="set-theme" data-theme="dark" aria-label="Dark"></button>' +
      '<button class="theme-opt theme-opt--light' + (s.theme === 'light' ? ' is-active' : '') + '" data-action="set-theme" data-theme="light" aria-label="Light"></button>' +
      '</div></div>' +
      '<div class="settings-row"><div><div class="settings-row__label">' + t('settings.density') + '</div><div class="settings-row__desc">' + t('settings.densityDesc') + '</div></div>' +
      '<div class="width-toggle" style="width:180px"><button data-action="set-density" data-value="comfortable" class="' + (s.density !== 'compact' ? 'is-active' : '') + '">' + t('settings.comfortable') + '</button>' +
      '<button data-action="set-density" data-value="compact" class="' + (s.density === 'compact' ? 'is-active' : '') + '">' + t('settings.compact') + '</button></div></div>' +
      '</div>';

    html += '<div class="settings-card"><div class="settings-card__title">' + t('settings.editor') + '</div>' +
      '<div class="settings-card__desc">' + t('settings.editorDesc') + '</div>' +
      '<div class="settings-row" style="border-top:none;padding-top:0"><div><div class="settings-row__label">' + t('settings.autosave') + '</div><div class="settings-row__desc">' + t('settings.autosaveDesc') + '</div></div>' +
      '<button class="switch' + (s.autosave ? ' is-on' : '') + '" data-action="toggle-autosave" role="switch" aria-checked="' + s.autosave + '"></button></div>' +
      '<div class="settings-row"><div><div class="settings-row__label">' + t('settings.lineWrap') + '</div><div class="settings-row__desc">' + t('settings.lineWrapDesc') + '</div></div>' +
      '<button class="switch' + (s.lineWrap ? ' is-on' : '') + '" data-action="toggle-linewrap" role="switch" aria-checked="' + s.lineWrap + '"></button></div>' +
      '</div>';

    html += '<div class="settings-card"><div class="settings-card__title">' + t('settings.shortcuts') + '</div>' +
      '<div class="settings-card__desc">' + t('settings.shortcutsDesc') + '</div>' +
      '<div class="shortcut-grid">' + shortcutRows() + '</div></div>';

    $('#settingsLayout').innerHTML = html;
    refreshIcons();
  }

  function shortcutRows() {
    var mac = navigator.platform && navigator.platform.toUpperCase().indexOf('MAC') > -1;
    var mod = mac ? '⌘' : 'Ctrl';
    var items = [
      [t('shortcuts.commandPalette'), [mod, 'K']],
      [t('shortcuts.save'), [mod, 'S']],
      [t('shortcuts.undo'), [mod, 'Z']],
      [t('shortcuts.redo'), [mod, '⇧', 'Z']],
      [t('shortcuts.deleteField'), ['Delete']]
    ];
    return items.map(function (it) {
      return '<div class="shortcut-item"><span>' + it[0] + '</span><span class="shortcut-item__keys">' + it[1].map(function (k) { return '<kbd>' + k + '</kbd>'; }).join('') + '</span></div>';
    }).join('');
  }

  function setLanguage(lang) {
    state.settings.lang = lang;
    persistSettings();
    applyI18n();
    invalidateCode();
    renderView(state.view);
    if (state.view === 'settings') renderSettingsView();
    var trigger = $('#topbarTitle');
    if (['builder', 'preview', 'code'].indexOf(state.view) === -1) {
      var cfg = VIEW_TITLES[state.view] || ['', null];
      trigger.textContent = t(cfg[0]);
    }
    showToast(t('toast.langChanged'), 'success');
  }

  function setTheme(theme) {
    state.settings.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    var icon = $('#themeToggle [data-lucide]');
    persistSettings();
    refreshIcons();
    if (state.view === 'settings') renderSettingsView();
    showToast(t('toast.themeChanged'), 'success');
  }

  function setDensity(val) {
    state.settings.density = val;
    document.body.classList.toggle('is-compact', val === 'compact');
    persistSettings();
    renderSettingsView();
  }

  /* ======================================================================
     20. Dialogs
     ====================================================================== */
  function openDialog(html, opts) {
    opts = opts || {};
    var overlay = $('#dialogOverlay');
    var root = $('#dialogRoot');
    root.className = 'dialog' + (opts.wide ? ' dialog--wide' : '');
    root.innerHTML = '<button class="icon-btn dialog__close" data-action="close-dialog" aria-label="' + t('action.close') + '"><i data-lucide="x"></i></button>' + html;
    overlay.hidden = false;
    refreshIcons();
    if (window.gsap) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.18 });
      gsap.fromTo(root, { opacity: 0, y: 14, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.24, ease: 'power2.out' });
    }
    var focusable = root.querySelector('input,button:not(.dialog__close)');
    if (focusable) setTimeout(function () { focusable.focus(); }, 50);
  }

  function closeDialog() {
    var overlay = $('#dialogOverlay');
    if (overlay.hidden) return;
    if (window.gsap) {
      gsap.to($('#dialogRoot'), { opacity: 0, y: 10, scale: .97, duration: 0.16, ease: 'power2.in' });
      gsap.to(overlay, { opacity: 0, duration: 0.16, onComplete: function () { overlay.hidden = true; } });
    } else overlay.hidden = true;
  }

  var pendingCreateTemplate = 'blank';

  function openCreateDialog() {
    pendingCreateTemplate = 'blank';
    var picks = QUICK_TEMPLATES.map(function (key) {
      var m = templateMeta(key);
      return '<button class="template-pick' + (key === 'blank' ? ' is-active' : '') + '" data-action="pick-template" data-template="' + key + '">' +
        '<div class="template-pick__title">' + escapeHtml(m.title) + '</div><div class="template-pick__desc">' + escapeHtml(m.desc) + '</div></button>';
    }).join('');
    var html = '<div class="dialog__title">' + t('dialog.create.title') + '</div>' +
      '<div class="dialog__desc">' + t('dialog.create.desc') + '</div>' +
      '<div class="dialog__body">' +
      '<div class="template-pick-grid">' + picks + '</div>' +
      '<div class="form-field"><label class="form-field__label">' + t('dialog.create.titleLabel') + '</label>' +
      '<input class="form-field__input" id="newFormTitleInput" placeholder="' + t('dialog.create.titlePlaceholder') + '"></div>' +
      '</div>' +
      '<div class="dialog__footer"><button class="btn btn--ghost" data-action="close-dialog">' + t('action.cancel') + '</button>' +
      '<button class="btn btn--primary" data-action="confirm-create">' + t('action.create') + '</button></div>';
    openDialog(html);
  }

  function openDeleteDialog(formId) {
    var form = null;
    state.forms.forEach(function (f) { if (f.id === formId) form = f; });
    if (!form) return;
    var html = '<div class="dialog__title">' + t('dialog.delete.title') + '</div>' +
      '<div class="dialog__desc">' + t('dialog.delete.desc', { title: form.title }) + '</div>' +
      '<div class="dialog__footer"><button class="btn btn--ghost" data-action="close-dialog">' + t('action.cancel') + '</button>' +
      '<button class="btn btn--danger" data-action="confirm-delete" data-form-id="' + formId + '">' + t('action.deleteConfirm') + '</button></div>';
    openDialog(html);
  }

  function openExportDialog() {
    var form = getCurrentForm();
    if (!codeCache) codeCache = generateCode(form);
    var opts = [
      ['html', 'file-code', t('code.exportHtml'), t('code.exportHtmlDesc')],
      ['css', 'palette', t('code.exportCss'), t('code.exportCssDesc')],
      ['js', 'braces', t('code.exportJs'), t('code.exportJsDesc')]
    ];
    var rows = opts.map(function (o) {
      return '<div class="export-option"><span class="export-option__icon"><i data-lucide="' + o[1] + '"></i></span>' +
        '<div class="export-option__body"><div class="export-option__title">' + o[2] + '</div><div class="export-option__desc">' + o[3] + '</div></div>' +
        '<button class="btn btn--ghost btn--sm" data-action="download-file" data-ext="' + o[0] + '"><i data-lucide="download"></i></button></div>';
    }).join('');
    var html = '<div class="dialog__title">' + t('code.exportTitle') + '</div>' +
      '<div class="dialog__desc">' + t('code.exportDesc') + '</div>' +
      '<div class="dialog__body">' + rows + '</div>' +
      '<div class="dialog__footer"><button class="btn btn--ghost" data-action="close-dialog">' + t('action.close') + '</button></div>';
    openDialog(html);
  }

  function openShortcutsDialog() {
    var html = '<div class="dialog__title">' + t('dialog.shortcuts.title') + '</div>' +
      '<div class="dialog__desc">' + t('dialog.shortcuts.desc') + '</div>' +
      '<div class="shortcut-grid">' + shortcutRows() + '</div>' +
      '<div class="dialog__footer" style="margin-top:18px"><button class="btn btn--primary" data-action="close-dialog">' + t('action.close') + '</button></div>';
    openDialog(html);
  }

  /* ======================================================================
     21. Toasts
     ====================================================================== */
  function showToast(message, tone) {
    var container = $('#toastContainer');
    var el = document.createElement('div');
    el.className = 'toast' + (tone === 'error' ? ' toast--error' : tone === 'info' ? ' toast--info' : '');
    var icon = tone === 'error' ? 'x' : tone === 'info' ? 'info' : 'check';
    el.innerHTML = '<span class="toast__icon"><i data-lucide="' + icon + '"></i></span><span>' + escapeHtml(message) + '</span>';
    container.appendChild(el);
    refreshIcons();
    if (window.gsap) {
      gsap.fromTo(el, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out' });
    }
    setTimeout(function () {
      if (window.gsap) gsap.to(el, { opacity: 0, x: 24, duration: 0.2, ease: 'power2.in', onComplete: function () { el.remove(); } });
      else el.remove();
    }, 3000);
  }

  /* ======================================================================
     22. Command palette
     ====================================================================== */
  var cmdkActiveIndex = 0;
  var cmdkFiltered = [];

  function getCommands() {
    var cmds = [];
    var group = t('cmdk.groupNavigate');
    cmds.push({ group: group, icon: 'layout-grid', label: t('cmdk.cmd.dashboard'), run: function () { switchView('dashboard'); } });
    cmds.push({ group: group, icon: 'file-stack', label: t('cmdk.cmd.forms'), run: function () { switchView('forms'); } });
    cmds.push({ group: group, icon: 'layout-template', label: t('cmdk.cmd.templates'), run: function () { switchView('templates'); } });
    cmds.push({ group: group, icon: 'settings', label: t('cmdk.cmd.settings'), run: function () { switchView('settings'); } });
    if (state.currentFormId) {
      cmds.push({ group: group, icon: 'layout-panel-left', label: t('cmdk.cmd.builder'), run: function () { switchView('builder'); } });
      cmds.push({ group: group, icon: 'monitor-play', label: t('cmdk.cmd.preview'), run: function () { switchView('preview'); } });
      cmds.push({ group: group, icon: 'code-2', label: t('cmdk.cmd.code'), run: function () { switchView('code'); } });
    }
    var group2 = t('cmdk.groupActions');
    cmds.push({ group: group2, icon: 'plus', label: t('cmdk.cmd.createForm'), run: openCreateDialog });
    if (['builder', 'preview', 'code'].indexOf(state.view) > -1) {
      cmds.push({ group: group2, icon: 'check', label: t('cmdk.cmd.save'), run: manualSave });
    }
    cmds.push({ group: group2, icon: 'moon', label: t('cmdk.cmd.toggleTheme'), run: function () { setTheme(state.settings.theme === 'dark' ? 'light' : 'dark'); } });
    if (state.view === 'builder') {
      cmds.push({ group: group2, icon: 'undo-2', label: t('cmdk.cmd.undo'), run: undo });
      cmds.push({ group: group2, icon: 'redo-2', label: t('cmdk.cmd.redo'), run: redo });
    }
    if (state.view === 'code') cmds.push({ group: group2, icon: 'copy', label: t('cmdk.cmd.copyCode'), run: copyCode });
    cmds.push({ group: group2, icon: 'keyboard', label: t('cmdk.cmd.openShortcuts'), run: openShortcutsDialog });

    var group3 = t('cmdk.groupLanguage');
    [['ja', 'cmdk.cmd.langJa', '日本語'], ['en', 'cmdk.cmd.langEn', 'English'], ['zh', 'cmdk.cmd.langZh', '中文'], ['ko', 'cmdk.cmd.langKo', '한국어']].forEach(function (l) {
      cmds.push({ group: group3, icon: 'globe', label: l[2], run: function () { setLanguage(l[0]); } });
    });
    return cmds;
  }

  function openCmdk() {
    $('#cmdkOverlay').hidden = false;
    var input = $('#cmdkInput');
    input.value = '';
    filterCmdk('');
    if (window.gsap) {
      gsap.fromTo('#cmdkOverlay', { opacity: 0 }, { opacity: 1, duration: 0.15 });
      gsap.fromTo('.cmdk', { opacity: 0, y: -10, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power2.out' });
    }
    setTimeout(function () { input.focus(); }, 30);
  }

  function closeCmdk() {
    var overlay = $('#cmdkOverlay');
    if (overlay.hidden) return;
    overlay.hidden = true;
  }

  function filterCmdk(query) {
    var all = getCommands();
    var q = query.trim().toLowerCase();
    cmdkFiltered = q ? all.filter(function (c) { return c.label.toLowerCase().indexOf(q) > -1; }) : all;
    cmdkActiveIndex = 0;
    renderCmdkList();
  }

  function renderCmdkList() {
    var list = $('#cmdkList');
    if (!cmdkFiltered.length) { list.innerHTML = '<div class="cmdk__empty">' + t('cmdk.empty') + '</div>'; return; }
    var lastGroup = null; var html = ''; var idx = 0;
    cmdkFiltered.forEach(function (c) {
      if (c.group !== lastGroup) { html += '<div class="cmdk__group-label">' + c.group + '</div>'; lastGroup = c.group; }
      html += '<div class="cmdk__item' + (idx === cmdkActiveIndex ? ' is-active' : '') + '" data-cmd-index="' + idx + '">' +
        '<i data-lucide="' + c.icon + '"></i><span>' + escapeHtml(c.label) + '</span></div>';
      idx++;
    });
    list.innerHTML = html;
    refreshIcons();
  }

  function moveCmdkActive(dir) {
    if (!cmdkFiltered.length) return;
    cmdkActiveIndex = (cmdkActiveIndex + dir + cmdkFiltered.length) % cmdkFiltered.length;
    renderCmdkList();
    var el = $('.cmdk__item.is-active');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  function runActiveCmdk() {
    var cmd = cmdkFiltered[cmdkActiveIndex];
    if (!cmd) return;
    closeCmdk();
    cmd.run();
  }

  /* ======================================================================
     23. Context menu
     ====================================================================== */
  function openContextMenu(x, y, items) {
    var menu = $('#contextMenu');
    menu.innerHTML = items.map(function (it, i) {
      if (it.sep) return '<div class="context-menu__sep"></div>';
      return '<button class="context-menu__item' + (it.danger ? ' danger' : '') + '" data-ctx-index="' + i + '">' +
        '<i data-lucide="' + it.icon + '"></i>' + it.label + '</button>';
    }).join('');
    menu._items = items;
    menu.hidden = false;
    refreshIcons();
    var w = menu.offsetWidth, h = menu.offsetHeight;
    var maxX = window.innerWidth - w - 8, maxY = window.innerHeight - h - 8;
    menu.style.left = Math.min(x, maxX) + 'px';
    menu.style.top = Math.min(y, maxY) + 'px';
  }
  function closeContextMenu() { $('#contextMenu').hidden = true; }

  /* ======================================================================
     24. Mobile sheets
     ====================================================================== */
  function openSheet(which) {
    var sheet = which === 'fields' ? $('#fieldsSheet') : $('#propsSheet');
    $('#sheetOverlay').hidden = false;
    sheet.hidden = false;
    if (window.gsap) {
      gsap.fromTo('#sheetOverlay', { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(sheet, { y: '100%' }, { y: '0%', duration: 0.3, ease: 'power3.out' });
    }
  }
  function closeAllSheets() {
    ['#fieldsSheet', '#propsSheet'].forEach(function (sel) {
      var el = $(sel);
      if (el && !el.hidden) el.hidden = true;
    });
    $('#sheetOverlay').hidden = true;
  }

  /* ======================================================================
     25. Copy / download
     ====================================================================== */
  function copyCode() {
    var form = getCurrentForm();
    if (!codeCache) codeCache = generateCode(form);
    var text = codeCache[state.codeTab];
    var flag = $('#copyFlag');
    var done = function () {
      flag.classList.add('is-visible');
      setTimeout(function () { flag.classList.remove('is-visible'); }, 1400);
      showToast(t('toast.copied'), 'success');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else done();
  }

  function downloadFile(ext) {
    var form = getCurrentForm();
    if (!codeCache) codeCache = generateCode(form);
    var map = { html: ['text/html', codeCache.html], css: ['text/css', codeCache.css], js: ['text/javascript', codeCache.js] };
    var pair = map[ext];
    var blob = new Blob([pair[1]], { type: pair[0] });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = slug(form.title) + '.' + ext;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    showToast(t('toast.exported'), 'success');
  }

  /* ======================================================================
     26. Global event delegation
     ====================================================================== */
  function bindEvents() {
    document.addEventListener('click', onDocClick);
    document.addEventListener('input', onDocInput);
    document.addEventListener('change', onDocChange);
    document.addEventListener('contextmenu', onDocContextMenu);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('dragleave', onDragLeave);
    document.addEventListener('drop', onDrop);
    document.addEventListener('dragend', onDragEnd);

    $('#formsSearch').addEventListener('input', debounce(function (e) { renderFormsView(e.target.value); }, 150));
    $('#cmdkInput').addEventListener('input', function (e) { filterCmdk(e.target.value); });

    window.addEventListener('resize', positionTabIndicator);
  }

  function onDocClick(e) {
    var target = e.target;

    // Sidebar toggle
    if (target.closest('#sidebarToggle')) { toggleSidebar(); return; }
    if (target.closest('#sidebarScrim')) { closeSidebar(); return; }

    // Nav / tabs
    var navBtn = target.closest('[data-view-target]');
    if (navBtn) { closeSidebar(); switchView(navBtn.getAttribute('data-view-target')); return; }
    var tabBtn = target.closest('.tab-btn');
    if (tabBtn) { switchView(tabBtn.getAttribute('data-subview')); return; }

    // Popovers
    var langTrigger = target.closest('#langTrigger');
    if (langTrigger) { togglePopover('#langPopover', langTrigger); return; }
    var langItem = target.closest('[data-lang]');
    if (langItem && langItem.closest('#langPopover')) { setLanguage(langItem.getAttribute('data-lang')); closeAllPopovers(); return; }
    if (!target.closest('.popover-wrap')) closeAllPopovers();

    if (target.closest('#themeToggle')) { setTheme(state.settings.theme === 'dark' ? 'light' : 'dark'); updateThemeIcon(); return; }

    if (target.closest('#cmdkTrigger')) { openCmdk(); return; }
    if (target.closest('.cmdk-overlay') && !target.closest('.cmdk')) { closeCmdk(); return; }
    var cmdItem = target.closest('.cmdk__item');
    if (cmdItem) { cmdkActiveIndex = parseInt(cmdItem.getAttribute('data-cmd-index'), 10); runActiveCmdk(); return; }

    if (target.closest('#createFormBtn') || target.closest('[data-action="create-blank"]')) { openCreateDialog(); return; }
    var tmplBtn = target.closest('[data-action="create-from-template"]');
    if (tmplBtn) { createAndOpen(tmplBtn.getAttribute('data-template')); return; }
    var pickBtn = target.closest('[data-action="pick-template"]');
    if (pickBtn) {
      pendingCreateTemplate = pickBtn.getAttribute('data-template');
      $all('.template-pick').forEach(function (p) { p.classList.toggle('is-active', p === pickBtn); });
      return;
    }
    if (target.closest('[data-action="confirm-create"]')) {
      var titleInput = $('#newFormTitleInput');
      createAndOpen(pendingCreateTemplate, titleInput ? titleInput.value.trim() : '');
      closeDialog();
      return;
    }
    if (target.closest('[data-action="close-dialog"]')) { closeDialog(); return; }
    var confirmDel = target.closest('[data-action="confirm-delete"]');
    if (confirmDel) { deleteForm(confirmDel.getAttribute('data-form-id')); closeDialog(); return; }

    var openFormEl = target.closest('[data-action="open-form"]');
    if (openFormEl && !target.closest('[data-action="form-menu"]')) { openForm(openFormEl.getAttribute('data-form-id'), 'builder'); return; }

    var menuBtn = target.closest('[data-action="form-menu"]');
    if (menuBtn) {
      e.stopPropagation();
      var fid = menuBtn.getAttribute('data-form-id');
      var rect = menuBtn.getBoundingClientRect();
      openContextMenu(rect.left, rect.bottom + 4, formContextItems(fid));
      return;
    }

    if (target.closest('#openFieldsSheet')) { openSheet('fields'); return; }
    if (target.closest('#openPropsSheet')) { openSheet('props'); return; }
    if (target.closest('[data-action="close-sheet"]')) { closeAllSheets(); return; }
    if (target.closest('#sheetOverlay')) { closeAllSheets(); return; }

    var compBtn = target.closest('[data-field-type]');
    if (compBtn) { addField(compBtn.getAttribute('data-field-type')); if (window.innerWidth <= 1080) closeAllSheets(); return; }

    var fieldRow = target.closest('.field-row');
    if (fieldRow && !target.closest('.field-row__controls')) { selectField(fieldRow.getAttribute('data-field-id')); return; }

    var moveUp = target.closest('[data-action="move-up"]');
    if (moveUp) { e.stopPropagation(); moveField(moveUp.getAttribute('data-field-id'), -1); return; }
    var moveDown = target.closest('[data-action="move-down"]');
    if (moveDown) { e.stopPropagation(); moveField(moveDown.getAttribute('data-field-id'), 1); return; }
    var dupBtn = target.closest('[data-action="duplicate-field"]');
    if (dupBtn) { e.stopPropagation(); duplicateField(dupBtn.getAttribute('data-field-id')); return; }
    var delBtn = target.closest('[data-action="delete-field"]');
    if (delBtn) { e.stopPropagation(); deleteField(delBtn.getAttribute('data-field-id')); return; }

    var reqToggle = target.closest('[data-action="toggle-required"]');
    if (reqToggle) { var fid2 = reqToggle.getAttribute('data-field-id'); var form = getCurrentForm(); var fld = getFieldById(form, fid2); updateFieldProp(fid2, 'required', !fld.required); renderPropertiesPanel(); return; }
    var widthBtn = target.closest('[data-action="set-width"]');
    if (widthBtn) { updateFieldProp(widthBtn.getAttribute('data-field-id'), 'width', widthBtn.getAttribute('data-value')); renderPropertiesPanel(); return; }

    var addOpt = target.closest('[data-action="add-option"]');
    if (addOpt) {
      var f = getFieldById(getCurrentForm(), addOpt.getAttribute('data-field-id'));
      f.options = f.options || [];
      f.options.push('Option ' + (f.options.length + 1));
      scheduleSave(); invalidateCode(); renderPropertiesPanel(); renderCanvas();
      return;
    }
    var rmOpt = target.closest('[data-action="remove-option"]');
    if (rmOpt) {
      var f2 = getFieldById(getCurrentForm(), rmOpt.getAttribute('data-field-id'));
      f2.options.splice(parseInt(rmOpt.getAttribute('data-index'), 10), 1);
      scheduleSave(); invalidateCode(); renderPropertiesPanel(); renderCanvas();
      return;
    }

    var codeTabBtn = target.closest('.code-tab');
    if (codeTabBtn) { state.codeTab = codeTabBtn.getAttribute('data-code-tab'); renderCode(); animateCodeSwitch(); return; }
    if (target.closest('#copyCodeBtn')) { copyCode(); return; }
    if (target.closest('#downloadCodeBtn')) { downloadFile(state.codeTab); return; }
    if (target.closest('#exportBtn')) { openExportDialog(); return; }
    var dlFileBtn = target.closest('[data-action="download-file"]');
    if (dlFileBtn) { downloadFile(dlFileBtn.getAttribute('data-ext')); return; }

    var deviceBtn = target.closest('.device-switch__btn');
    if (deviceBtn) {
      state.previewDevice = deviceBtn.getAttribute('data-device');
      $all('.device-switch__btn').forEach(function (b) { b.classList.toggle('is-active', b === deviceBtn); b.setAttribute('aria-pressed', b === deviceBtn); });
      var frame = $('#browserFrame');
      frame.setAttribute('data-device', state.previewDevice);
      if (window.gsap) gsap.fromTo(frame, { opacity: .6 }, { opacity: 1, duration: 0.3 });
      return;
    }

    if (target.closest('#saveBtn')) { manualSave(); return; }
    if (target.closest('[data-action="open-shortcuts"]')) { openShortcutsDialog(); return; }

    var setLang2 = target.closest('[data-action="set-lang"]');
    if (setLang2) { setLanguage(setLang2.getAttribute('data-lang')); return; }
    var setThemeBtn = target.closest('[data-action="set-theme"]');
    if (setThemeBtn) { setTheme(setThemeBtn.getAttribute('data-theme')); updateThemeIcon(); return; }
    var setDensityBtn = target.closest('[data-action="set-density"]');
    if (setDensityBtn) { setDensity(setDensityBtn.getAttribute('data-value')); return; }
    if (target.closest('[data-action="toggle-autosave"]')) { state.settings.autosave = !state.settings.autosave; persistSettings(); renderSettingsView(); showToast(t('toast.settingsSaved'), 'success'); return; }
    if (target.closest('[data-action="toggle-linewrap"]')) {
      state.settings.lineWrap = !state.settings.lineWrap;
      document.body.classList.toggle('is-linewrap', state.settings.lineWrap);
      persistSettings(); renderSettingsView(); showToast(t('toast.settingsSaved'), 'success'); return;
    }

    // context menu items
    var ctxItem = target.closest('[data-ctx-index]');
    if (ctxItem) {
      var menu = $('#contextMenu');
      var idx = parseInt(ctxItem.getAttribute('data-ctx-index'), 10);
      var item = menu._items && menu._items[idx];
      closeContextMenu();
      if (item && item.action) item.action();
      return;
    }
    if (!target.closest('#contextMenu')) closeContextMenu();
  }

  function updateThemeIcon() {
    var wrap = $('#themeToggle');
    if (!wrap) return;
    wrap.innerHTML = '<i data-lucide="' + (state.settings.theme === 'dark' ? 'moon' : 'sun') + '"></i>';
    refreshIcons();
  }

  function formContextItems(formId) {
    return [
      { icon: 'pencil', label: t('action.edit'), action: function () { openForm(formId, 'builder'); } },
      { icon: 'copy', label: t('action.duplicate'), action: function () { duplicateForm(formId); } },
      { sep: true },
      { icon: 'trash-2', label: t('action.delete'), danger: true, action: function () { openDeleteDialog(formId); } }
    ];
  }

  function createAndOpen(templateKey, customTitle) {
    var form = makeForm(templateKey, customTitle);
    state.forms.unshift(form);
    persistForms();
    logActivity('created', form.title);
    showToast(t('toast.formCreated'), 'success');
    openForm(form.id, 'builder');
  }

  function duplicateForm(formId) {
    var src = null;
    state.forms.forEach(function (f) { if (f.id === formId) src = f; });
    if (!src) return;
    var copy = clone(src);
    copy.id = uid('form');
    copy.title = src.title + ' Copy';
    copy.createdAt = copy.updatedAt = Date.now();
    state.forms.unshift(copy);
    persistForms();
    logActivity('created', copy.title);
    showToast(t('toast.duplicated'), 'success');
    renderView(state.view);
  }

  function deleteForm(formId) {
    var src = null;
    state.forms.forEach(function (f) { if (f.id === formId) src = f; });
    state.forms = state.forms.filter(function (f) { return f.id !== formId; });
    persistForms();
    if (src) logActivity('deleted', src.title);
    if (state.currentFormId === formId) { state.currentFormId = null; switchView('forms'); }
    else renderView(state.view);
    showToast(t('toast.deleted'), 'error');
  }

  function onDocInput(e) {
    var target = e.target;
    if (target.id === 'canvasTitleInput') { updateFormMeta('__title', target.value); return; }
    if (target.id === 'canvasDescInput') { updateFormMeta('__description', target.value); return; }
    var propEl = target.closest('[data-prop]');
    if (propEl) {
      var prop = propEl.getAttribute('data-prop');
      if (propEl.getAttribute('data-target') === 'form') { updateFormMeta(prop, propEl.value); return; }
      var fieldId = propEl.getAttribute('data-field-id');
      updateFieldProp(fieldId, prop, propEl.value);
      if (prop === 'label') {
        // reflect live in properties panel field-type chip title area not required; canvas already re-rendered
      }
      return;
    }
    var optInput = target.closest('[data-action="option-input"]');
    if (optInput) {
      var f = getFieldById(getCurrentForm(), optInput.getAttribute('data-field-id'));
      f.options[parseInt(optInput.getAttribute('data-index'), 10)] = optInput.value;
      scheduleSave(); invalidateCode(); renderCanvas();
      return;
    }
  }

  function onDocChange(e) {}

  function onDocContextMenu(e) {
    var row = e.target.closest('.field-row');
    if (row) {
      e.preventDefault();
      var fid = row.getAttribute('data-field-id');
      selectField(fid);
      openContextMenu(e.clientX, e.clientY, [
        { icon: 'pencil', label: t('action.edit'), action: function () { selectField(fid); } },
        { icon: 'copy', label: t('action.duplicate'), action: function () { duplicateField(fid); } },
        { icon: 'chevron-up', label: t('action.moveUp'), action: function () { moveField(fid, -1); } },
        { icon: 'chevron-down', label: t('action.moveDown'), action: function () { moveField(fid, 1); } },
        { sep: true },
        { icon: 'trash-2', label: t('action.delete'), danger: true, action: function () { deleteField(fid); } }
      ]);
      return;
    }
    var card = e.target.closest('.form-card');
    if (card) {
      e.preventDefault();
      var fid2 = card.getAttribute('data-form-id');
      openContextMenu(e.clientX, e.clientY, formContextItems(fid2));
    }
  }

  /* ---- Drag & drop reordering ---- */
  var dragFieldId = null;
  function onDragStart(e) {
    var row = e.target.closest('.field-row');
    if (row) {
      dragFieldId = row.getAttribute('data-field-id');
      row.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', dragFieldId); } catch (err) {}
      return;
    }
    var comp = e.target.closest('[data-field-type]');
    if (comp) { e.dataTransfer.effectAllowed = 'copy'; try { e.dataTransfer.setData('text/plain', 'new:' + comp.getAttribute('data-field-type')); } catch (err) {} }
  }
  function onDragOver(e) {
    var row = e.target.closest('.field-row');
    if (!row) return;
    e.preventDefault();
    var rect = row.getBoundingClientRect();
    var before = (e.clientY - rect.top) < rect.height / 2;
    $all('.field-row').forEach(function (r) { r.classList.remove('drag-over-top', 'drag-over-bottom'); });
    row.classList.add(before ? 'drag-over-top' : 'drag-over-bottom');
  }
  function onDragLeave(e) {}
  function onDrop(e) {
    var row = e.target.closest('.field-row');
    if (!row) return;
    e.preventDefault();
    var rect = row.getBoundingClientRect();
    var before = (e.clientY - rect.top) < rect.height / 2;
    var targetId = row.getAttribute('data-field-id');
    var data = 'text/plain';
    var payload = '';
    try { payload = e.dataTransfer.getData(data); } catch (err) {}
    if (payload && payload.indexOf('new:') === 0) {
      var type = payload.slice(4);
      var form = getCurrentForm();
      var idx = form.fields.findIndex(function (f) { return f.id === targetId; });
      addField(type, before ? idx : idx + 1);
    } else if (dragFieldId) {
      reorderField(dragFieldId, targetId, before);
    }
    $all('.field-row').forEach(function (r) { r.classList.remove('drag-over-top', 'drag-over-bottom'); });
  }
  function onDragEnd(e) {
    $all('.field-row').forEach(function (r) { r.classList.remove('is-dragging', 'drag-over-top', 'drag-over-bottom'); });
    dragFieldId = null;
  }

  /* ---- Popovers / sidebar helpers ---- */
  function togglePopover(sel, trigger) {
    var pop = $(sel);
    var isHidden = pop.hidden;
    closeAllPopovers();
    if (isHidden) {
      pop.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      if (window.gsap) gsap.fromTo(pop, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' });
    }
  }
  function closeAllPopovers() {
    $all('.popover').forEach(function (p) { p.hidden = true; });
    $all('[aria-haspopup]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function toggleSidebar() {
    var sidebar = $('#sidebar');
    if (window.innerWidth > 1080) {
      sidebar.classList.toggle('is-collapsed');
      return;
    }
    var open = !sidebar.classList.contains('is-open');
    sidebar.classList.toggle('is-open', open);
    $('#sidebarScrim').hidden = !open;
  }
  function closeSidebar() {
    $('#sidebar').classList.remove('is-open');
    $('#sidebarScrim').hidden = true;
  }

  function animateCodeSwitch() {
    var block = $('.code-block');
    if (window.gsap && block) gsap.fromTo(block, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
  }

  /* ======================================================================
     27. Keyboard shortcuts
     ====================================================================== */
  function isTypingTarget(el) {
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  }

  function onKeydown(e) {
    var mod = e.metaKey || e.ctrlKey;

    if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#cmdkOverlay').hidden ? openCmdk() : closeCmdk(); return; }

    if (!$('#cmdkOverlay').hidden) {
      if (e.key === 'Escape') { e.preventDefault(); closeCmdk(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); moveCmdkActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveCmdkActive(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); runActiveCmdk(); }
      return;
    }

    if (e.key === 'Escape') {
      if (!$('#dialogOverlay').hidden) closeDialog();
      else if (!$('#contextMenu').hidden) closeContextMenu();
      else if (!$('#fieldsSheet').hidden || !$('#propsSheet').hidden) closeAllSheets();
      else closeAllPopovers();
      return;
    }

    if (mod && e.key.toLowerCase() === 's') { e.preventDefault(); if (getCurrentForm()) manualSave(); return; }

    if (isTypingTarget(document.activeElement)) return;

    if (mod && e.key.toLowerCase() === 'z' && e.shiftKey) { e.preventDefault(); if (state.view === 'builder') redo(); return; }
    if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); if (state.view === 'builder') undo(); return; }

    if ((e.key === 'Delete' || e.key === 'Backspace') && state.view === 'builder' && state.selectedFieldId) {
      e.preventDefault(); deleteField(state.selectedFieldId); return;
    }
  }

  /* ======================================================================
     28. Init
     ====================================================================== */
  function initialLoadAnimation() {
    if (!window.gsap) return;
    gsap.set(['.sidebar', '.topbar', '.view#view-dashboard'], { clearProps: 'all' });
    var tl = gsap.timeline();
    tl.from('.sidebar', { opacity: 0, x: -16, duration: 0.4, ease: 'power2.out' })
      .from('.topbar', { opacity: 0, y: -8, duration: 0.35, ease: 'power2.out' }, '-=0.25')
      .from('.sidebar__brand, .nav-item, .user-chip', { opacity: 0, y: 6, duration: 0.3, stagger: 0.03, ease: 'power2.out' }, '-=0.2')
      .from('.stat-card', { opacity: 0, y: 10, duration: 0.35, stagger: 0.05, ease: 'power2.out' }, '-=0.15');
  }

  function init() {
    loadState();
    document.documentElement.setAttribute('data-theme', state.settings.theme);
    document.body.classList.toggle('is-compact', state.settings.density === 'compact');
    applyI18n();
    updateThemeIcon();
    bindEvents();
    switchView('dashboard');
    refreshIcons();
    setTimeout(initialLoadAnimation, 30);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
