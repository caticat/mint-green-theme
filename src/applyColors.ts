import * as vscode from 'vscode';
import { UI_COLOR_KEYS, TOKEN_COLOR_KEYS, TOKEN_SCOPES, SEMANTIC_TOKEN_KEYS } from './colors';

// Read mintGreenTheme.* config and apply to workbench.colorCustomizations
// and editor.tokenColorCustomizations (both TextMate and semantic)
export async function applyColors(): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  const mintConfig = vscode.workspace.getConfiguration('mintGreenTheme');

  // Build UI color overrides
  const colorCustomizations: Record<string, string> = {};
  for (const [configKey, vscodeKey] of Object.entries(UI_COLOR_KEYS)) {
    const subKey = configKey.replace('mintGreenTheme.', '');
    const value = mintConfig.get<string>(subKey);
    if (value) {
      colorCustomizations[vscodeKey] = value;
    }
  }

  await config.update(
    'workbench.colorCustomizations',
    colorCustomizations,
    vscode.ConfigurationTarget.Global
  );

  // Build TextMate token color rules
  const textMateRules: Array<{ scope: string[]; settings: { foreground: string } }> = [];
  // Build semantic token colors
  const semanticTokenColors: Record<string, string> = {};

  for (const configKey of TOKEN_COLOR_KEYS) {
    const subKey = configKey.replace('mintGreenTheme.', '');
    const color = mintConfig.get<string>(subKey);
    if (color) {
      textMateRules.push({
        scope: TOKEN_SCOPES[configKey],
        settings: { foreground: color },
      });
      for (const semanticType of SEMANTIC_TOKEN_KEYS[configKey]) {
        semanticTokenColors[semanticType] = color;
      }
    }
  }

  // Fixed semantic tokens not exposed as user config
  // namespace (Go package names), enumMember, macro share colors with related tokens
  const functionColor = mintConfig.get<string>('token.function');
  const numberColor = mintConfig.get<string>('token.number');
  if (functionColor) {
    semanticTokenColors['namespace'] = '#8B0000'; // always distinct from function/variable
  }
  if (numberColor) {
    semanticTokenColors['enumMember'] = numberColor;
    semanticTokenColors['macro'] = numberColor;
  }

  await config.update(
    'editor.tokenColorCustomizations',
    { textMateRules, semanticTokenColors },
    vscode.ConfigurationTarget.Global
  );
}

// Reset all mintGreenTheme.* settings to undefined (restores package.json defaults)
// then re-apply
export async function resetColors(): Promise<void> {
  const mintConfig = vscode.workspace.getConfiguration('mintGreenTheme');

  const allKeys = [
    ...Object.keys(UI_COLOR_KEYS).map(k => k.replace('mintGreenTheme.', '')),
    ...TOKEN_COLOR_KEYS.map(k => k.replace('mintGreenTheme.', '')),
  ];

  for (const key of allKeys) {
    await mintConfig.update(key, undefined, vscode.ConfigurationTarget.Global);
  }

  await applyColors();
}
