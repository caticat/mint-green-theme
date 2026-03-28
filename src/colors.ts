// UI_COLOR_KEYS: maps mintGreenTheme config key -> workbench.colorCustomizations key
export const UI_COLOR_KEYS: Record<string, string> = {
  // Editor
  'mintGreenTheme.editor.background': 'editor.background',
  'mintGreenTheme.editor.foreground': 'editor.foreground',
  'mintGreenTheme.editor.findMatchBackground': 'editor.findMatchBackground',
  'mintGreenTheme.editor.findMatchHighlightBackground': 'editor.findMatchHighlightBackground',
  'mintGreenTheme.editor.findRangeHighlightBackground': 'editor.findRangeHighlightBackground',
  'mintGreenTheme.editor.selectionBackground': 'editor.selectionBackground',
  'mintGreenTheme.editor.selectionHighlightBackground': 'editor.selectionHighlightBackground',
  'mintGreenTheme.editor.lineHighlightBackground': 'editor.lineHighlightBackground',
  'mintGreenTheme.editorGutter.background': 'editorGutter.background',
  'mintGreenTheme.editorLineNumber.foreground': 'editorLineNumber.foreground',
  'mintGreenTheme.editorWidget.background': 'editorWidget.background',
  'mintGreenTheme.breadcrumb.background': 'breadcrumb.background',
  // Tabs
  'mintGreenTheme.editorGroupHeader.tabsBackground': 'editorGroupHeader.tabsBackground',
  'mintGreenTheme.tab.activeBackground': 'tab.activeBackground',
  'mintGreenTheme.tab.inactiveBackground': 'tab.inactiveBackground',
  'mintGreenTheme.tab.activeBorder': 'tab.activeBorder',
  // Side bar
  'mintGreenTheme.sideBar.background': 'sideBar.background',
  'mintGreenTheme.sideBarSectionHeader.background': 'sideBarSectionHeader.background',
  // Activity bar
  'mintGreenTheme.activityBar.background': 'activityBar.background',
  // Title bar
  'mintGreenTheme.titleBar.activeBackground': 'titleBar.activeBackground',
  // Status bar
  'mintGreenTheme.statusBar.background': 'statusBar.background',
  // Panel & terminal
  'mintGreenTheme.panel.background': 'panel.background',
  'mintGreenTheme.terminal.background': 'terminal.background',
  // Input & dropdown
  'mintGreenTheme.input.background': 'input.background',
  'mintGreenTheme.dropdown.background': 'dropdown.background',
  // List & tree
  'mintGreenTheme.list.hoverBackground': 'list.hoverBackground',
  'mintGreenTheme.list.activeSelectionBackground': 'list.activeSelectionBackground',
  'mintGreenTheme.list.inactiveSelectionBackground': 'list.inactiveSelectionBackground',
  // Scrollbar
  'mintGreenTheme.scrollbarSlider.background': 'scrollbarSlider.background',
  'mintGreenTheme.scrollbarSlider.hoverBackground': 'scrollbarSlider.hoverBackground',
};

// TOKEN_COLOR_KEYS: all token config keys
export const TOKEN_COLOR_KEYS = [
  'mintGreenTheme.token.comment',
  'mintGreenTheme.token.string',
  'mintGreenTheme.token.keyword',
  'mintGreenTheme.token.number',
  'mintGreenTheme.token.function',
  'mintGreenTheme.token.type',
  'mintGreenTheme.token.variable',
  'mintGreenTheme.token.parameter',
] as const;

// TOKEN_SCOPES: maps token config key -> TextMate scope(s)
export const TOKEN_SCOPES: Record<string, string[]> = {
  'mintGreenTheme.token.comment': ['comment'],
  'mintGreenTheme.token.string': ['string'],
  'mintGreenTheme.token.keyword': ['keyword', 'storage', 'storage.type'],
  'mintGreenTheme.token.number': ['constant.numeric'],
  'mintGreenTheme.token.function': ['entity.name.function', 'support.function'],
  'mintGreenTheme.token.type': ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
  'mintGreenTheme.token.variable': ['variable', 'variable.other'],
  'mintGreenTheme.token.parameter': ['variable.parameter'],
};
