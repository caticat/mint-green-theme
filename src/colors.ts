// UI_COLOR_KEYS: maps mintGreenTheme config key -> workbench.colorCustomizations key
export const UI_COLOR_KEYS: Record<string, string> = {
  'mintGreenTheme.editor.background': 'editor.background',
  'mintGreenTheme.editor.findMatchBackground': 'editor.findMatchBackground',
  'mintGreenTheme.editor.findMatchHighlightBackground': 'editor.findMatchHighlightBackground',
  'mintGreenTheme.editor.findRangeHighlightBackground': 'editor.findRangeHighlightBackground',
  'mintGreenTheme.editor.selectionBackground': 'editor.selectionBackground',
  'mintGreenTheme.editor.selectionHighlightBackground': 'editor.selectionHighlightBackground',
  'mintGreenTheme.editor.lineHighlightBackground': 'editor.lineHighlightBackground',
  'mintGreenTheme.editorGutter.background': 'editorGutter.background',
  'mintGreenTheme.editorLineNumber.foreground': 'editorLineNumber.foreground',
  'mintGreenTheme.editorGroupHeader.tabsBackground': 'editorGroupHeader.tabsBackground',
  'mintGreenTheme.tab.inactiveBackground': 'tab.inactiveBackground',
  'mintGreenTheme.sideBar.background': 'sideBar.background',
  'mintGreenTheme.panel.background': 'panel.background',
  'mintGreenTheme.terminal.background': 'terminal.background',
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
