import * as vscode from 'vscode';
import { UI_COLOR_KEYS, TOKEN_COLOR_KEYS, TOKEN_SCOPES } from './colors';

// Read mintGreenTheme.* config and apply to workbench.colorCustomizations
// and editor.tokenColorCustomizations
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

  // Build token color overrides
  const tokenRules: Array<{ scope: string[]; settings: { foreground: string } }> = [];
  for (const configKey of TOKEN_COLOR_KEYS) {
    const subKey = configKey.replace('mintGreenTheme.', '');
    const color = mintConfig.get<string>(subKey);
    if (color) {
      tokenRules.push({
        scope: TOKEN_SCOPES[configKey],
        settings: { foreground: color },
      });
    }
  }

  await config.update(
    'editor.tokenColorCustomizations',
    { textMateRules: tokenRules },
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
