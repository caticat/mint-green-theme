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
  'mintGreenTheme.editor.wordHighlightBackground': 'editor.wordHighlightBackground',
  'mintGreenTheme.editor.wordHighlightStrongBackground': 'editor.wordHighlightStrongBackground',
  'mintGreenTheme.editorBracketMatch.background': 'editorBracketMatch.background',
  'mintGreenTheme.editorBracketMatch.border': 'editorBracketMatch.border',
  'mintGreenTheme.editorGutter.background': 'editorGutter.background',
  'mintGreenTheme.editorLineNumber.foreground': 'editorLineNumber.foreground',
  'mintGreenTheme.editorWidget.background': 'editorWidget.background',
  'mintGreenTheme.breadcrumb.background': 'breadcrumb.background',
  // Tabs
  'mintGreenTheme.editorGroupHeader.tabsBackground': 'editorGroupHeader.tabsBackground',
  'mintGreenTheme.tab.activeBackground': 'tab.activeBackground',
  'mintGreenTheme.tab.inactiveBackground': 'tab.inactiveBackground',
  'mintGreenTheme.tab.activeBorder': 'tab.activeBorder',
  'mintGreenTheme.tab.hoverBackground': 'tab.hoverBackground',
  // Side bar
  'mintGreenTheme.sideBar.background': 'sideBar.background',
  'mintGreenTheme.sideBar.foreground': 'sideBar.foreground',
  'mintGreenTheme.sideBarSectionHeader.background': 'sideBarSectionHeader.background',
  'mintGreenTheme.sideBarSectionHeader.foreground': 'sideBarSectionHeader.foreground',
  // Activity bar
  'mintGreenTheme.activityBar.background': 'activityBar.background',
  'mintGreenTheme.activityBar.foreground': 'activityBar.foreground',
  'mintGreenTheme.activityBar.inactiveForeground': 'activityBar.inactiveForeground',
  'mintGreenTheme.activityBarBadge.background': 'activityBarBadge.background',
  // Title bar
  'mintGreenTheme.titleBar.activeBackground': 'titleBar.activeBackground',
  'mintGreenTheme.titleBar.activeForeground': 'titleBar.activeForeground',
  'mintGreenTheme.titleBar.inactiveBackground': 'titleBar.inactiveBackground',
  // Status bar
  'mintGreenTheme.statusBar.background': 'statusBar.background',
  'mintGreenTheme.statusBar.foreground': 'statusBar.foreground',
  'mintGreenTheme.statusBar.debuggingBackground': 'statusBar.debuggingBackground',
  'mintGreenTheme.statusBar.noFolderBackground': 'statusBar.noFolderBackground',
  // Panel & terminal
  'mintGreenTheme.panel.background': 'panel.background',
  'mintGreenTheme.terminal.background': 'terminal.background',
  // Input & dropdown
  'mintGreenTheme.input.background': 'input.background',
  'mintGreenTheme.input.border': 'input.border',
  'mintGreenTheme.dropdown.background': 'dropdown.background',
  'mintGreenTheme.focusBorder': 'focusBorder',
  'mintGreenTheme.button.background': 'button.background',
  'mintGreenTheme.badge.background': 'badge.background',
  'mintGreenTheme.notifications.background': 'notifications.background',
  // List & tree
  'mintGreenTheme.list.hoverBackground': 'list.hoverBackground',
  'mintGreenTheme.list.activeSelectionBackground': 'list.activeSelectionBackground',
  'mintGreenTheme.list.inactiveSelectionBackground': 'list.inactiveSelectionBackground',
  // Scrollbar
  'mintGreenTheme.scrollbarSlider.background': 'scrollbarSlider.background',
  'mintGreenTheme.scrollbarSlider.hoverBackground': 'scrollbarSlider.hoverBackground',
  // Advanced: Editor
  'mintGreenTheme.editorCursor.foreground': 'editorCursor.foreground',
  'mintGreenTheme.editorIndentGuide.background1': 'editorIndentGuide.background1',
  'mintGreenTheme.editorRuler.foreground': 'editorRuler.foreground',
  'mintGreenTheme.editorWhitespace.foreground': 'editorWhitespace.foreground',
  'mintGreenTheme.tab.unfocusedActiveBackground': 'tab.unfocusedActiveBackground',
  // Advanced: Git Decorations
  'mintGreenTheme.gitDecoration.modifiedResourceForeground': 'gitDecoration.modifiedResourceForeground',
  'mintGreenTheme.gitDecoration.untrackedResourceForeground': 'gitDecoration.untrackedResourceForeground',
  'mintGreenTheme.gitDecoration.deletedResourceForeground': 'gitDecoration.deletedResourceForeground',
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
