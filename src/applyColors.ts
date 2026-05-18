import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { UI_COLOR_KEYS, TOKEN_COLOR_KEYS, TOKEN_SCOPES, SEMANTIC_TOKEN_KEYS } from './colors';

type ApplyColorsOptions = {
  promptReload?: boolean;
};

// Build and write the theme JSON file based on current mintGreenTheme.* config.
// This avoids writing to User Settings entirely.
export async function applyColors(context: vscode.ExtensionContext, options: ApplyColorsOptions = {}): Promise<boolean> {
  const mintConfig = vscode.workspace.getConfiguration('mintGreenTheme');

  // --- UI colors ---
  const colors: Record<string, string> = {};
  for (const [configKey, vscodeKey] of Object.entries(UI_COLOR_KEYS)) {
    const subKey = configKey.replace('mintGreenTheme.', '');
    const value = mintConfig.get<string>(subKey);
    if (value) {
      colors[vscodeKey] = value;
    }
  }

  // --- TextMate token rules ---
  const tokenColors: Array<{ scope: string[]; settings: { foreground: string; fontStyle?: string } }> = [];

  // comment gets italic
  const commentColor = mintConfig.get<string>('token.comment');
  if (commentColor) {
    tokenColors.push({ scope: ['comment'], settings: { foreground: commentColor, fontStyle: 'italic' } });
  }

  // Go constant gets number color (distinct from variable)
  const numberColor = mintConfig.get<string>('token.number');
  if (numberColor) {
    tokenColors.push({ scope: ['variable.other.constant.go'], settings: { foreground: numberColor } });
  }

  // Go variable scope (must come before generic variable to override)
  const variableColor = mintConfig.get<string>('token.variable');
  if (variableColor) {
    tokenColors.push({ scope: ['variable.other.go'], settings: { foreground: variableColor } });
  }

  // All other token colors
  for (const configKey of TOKEN_COLOR_KEYS) {
    const subKey = configKey.replace('mintGreenTheme.', '');
    const color = mintConfig.get<string>(subKey);
    if (color) {
      if (configKey === 'mintGreenTheme.token.comment') continue; // already added with fontStyle
      tokenColors.push({ scope: TOKEN_SCOPES[configKey], settings: { foreground: color } });
    }
  }

  // --- Semantic token colors ---
  const semanticTokenColors: Record<string, string> = {};
  for (const configKey of TOKEN_COLOR_KEYS) {
    const subKey = configKey.replace('mintGreenTheme.', '');
    const color = mintConfig.get<string>(subKey);
    if (color) {
      for (const semanticType of SEMANTIC_TOKEN_KEYS[configKey]) {
        semanticTokenColors[semanticType] = color;
      }
    }
  }

  // Fixed semantic tokens: namespace uses a distinct color, not exposed as user config
  semanticTokenColors['namespace'] = '#CC3300';

  // enumMember and macro share number color
  if (numberColor) {
    semanticTokenColors['enumMember'] = numberColor;
    semanticTokenColors['macro'] = numberColor;
  }

  // --- Assemble and write theme JSON ---
  const themeJson = {
    $schema: 'vscode://schemas/color-theme',
    name: 'Mint Green',
    type: 'light',
    semanticHighlighting: true,
    colors,
    semanticTokenColors,
    tokenColors,
  };

  const themePath = path.join(context.extensionPath, 'themes', 'mint-green-color-theme.json');
  const nextThemeContents = `${JSON.stringify(themeJson, null, 2)}\n`;
  const currentThemeContents = fs.existsSync(themePath) ? fs.readFileSync(themePath, 'utf8') : undefined;
  const changed = currentThemeContents !== nextThemeContents;

  if (changed) {
    fs.writeFileSync(themePath, nextThemeContents, 'utf8');
  }

  if (!changed || !options.promptReload) {
    return changed;
  }

  const action = await vscode.window.showInformationMessage(
    'Mint Green Theme: Colors updated. Reload window to apply changes.',
    'Reload Now'
  );
  if (action === 'Reload Now') {
    await vscode.commands.executeCommand('workbench.action.reloadWindow');
  }

  return changed;
}

// Reset: clear all mintGreenTheme.* user overrides, then regenerate theme JSON
export async function resetColors(context: vscode.ExtensionContext): Promise<void> {
  const mintConfig = vscode.workspace.getConfiguration('mintGreenTheme');

  const allKeys = [
    ...Object.keys(UI_COLOR_KEYS).map(k => k.replace('mintGreenTheme.', '')),
    ...TOKEN_COLOR_KEYS.map(k => k.replace('mintGreenTheme.', '')),
  ];

  for (const key of allKeys) {
    await mintConfig.update(key, undefined, vscode.ConfigurationTarget.Global);
  }

  await applyColors(context, { promptReload: true });
}
