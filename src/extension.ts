import * as vscode from 'vscode';
import { applyColors, resetColors } from './applyColors';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  await applyColors();

  const configListener = vscode.workspace.onDidChangeConfiguration(async (e) => {
    if (e.affectsConfiguration('mintGreenTheme')) {
      await applyColors();
    }
  });

  const resetCommand = vscode.commands.registerCommand(
    'mint-green-theme.resetColors',
    async () => {
      await resetColors();
      vscode.window.showInformationMessage('Mint Green Theme: All colors reset to default.');
    }
  );

  context.subscriptions.push(configListener, resetCommand);
}

export function deactivate(): void {}
