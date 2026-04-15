# No Settings Pollution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 彻底消除插件对用户 `settings.json` 的写入，将所有颜色自定义逻辑迁移到主题 JSON 文件本身，使插件在安装/卸载时完全不污染 User Settings。

**Architecture:** 删除 `applyColors()` 和 `resetColors()` 中写入 User Settings 的逻辑，改为在插件激活时根据 `mintGreenTheme.*` 配置动态生成 `themes/mint-green-color-theme.json`（写入磁盘），VSCode 主题引擎会自动读取该文件。配置变更时重新生成 JSON 文件。用户卸载插件后，User Settings 中不留任何痕迹。

**Tech Stack:** TypeScript, VSCode Extension API (`vscode.workspace.getConfiguration`, `vscode.ExtensionContext.extensionUri`), Node.js `fs.writeFileSync`

---

## 文件结构

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/applyColors.ts` | 修改 | 重写：从读配置+写 settings 改为读配置+生成主题 JSON |
| `src/extension.ts` | 修改 | 传入 `context` 给 `applyColors`，`deactivate` 无需额外操作 |
| `src/colors.ts` | 不变 | 保持原有颜色映射表不变 |
| `themes/mint-green-color-theme.json` | 运行时更新 | 由插件动态生成，不再是静态文件 |

---

## Task 1: 重写 `applyColors.ts` —— 生成主题 JSON 而非写 settings

**Files:**
- Modify: `src/applyColors.ts`

核心思路：
1. 读取 `mintGreenTheme.*` 配置值
2. 构建完整的主题 JSON 对象（colors + semanticTokenColors + tokenColors）
3. 用 `fs.writeFileSync` 写入 `themes/mint-green-color-theme.json`
4. 提示 VSCode 重新加载主题（通过 `vscode.commands.executeCommand('workbench.action.reloadWindow')` 或使用通知提示用户）

**注意：** VSCode 主题 JSON 文件更新后需要重启才能完全刷新，但 `workbench.colorCustomizations` 是实时的。方案C的权衡是：颜色改变后需要用户重载窗口。我们通过提示通知告知用户。

- [ ] **Step 1: 理解现有主题 JSON 结构**

确认 `themes/mint-green-color-theme.json` 的完整结构（已在分析阶段读取）：
- `colors`：UI 颜色，对应 `UI_COLOR_KEYS`
- `semanticTokenColors`：语义 token 颜色
- `tokenColors`：TextMate token 颜色规则数组

- [ ] **Step 2: 重写 `src/applyColors.ts`**

完整替换文件内容：

```typescript
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { UI_COLOR_KEYS, TOKEN_COLOR_KEYS, TOKEN_SCOPES, SEMANTIC_TOKEN_KEYS } from './colors';

// Build and write the theme JSON file based on current mintGreenTheme.* config.
// This avoids writing to User Settings entirely.
export async function applyColors(context: vscode.ExtensionContext): Promise<void> {
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
      const scopes = TOKEN_SCOPES[configKey];
      // comment already added above, skip to avoid duplicate
      if (configKey === 'mintGreenTheme.token.comment') continue;
      tokenColors.push({ scope: scopes, settings: { foreground: color } });
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

  // --- Assemble theme JSON ---
  const themeJson = {
    $schema: 'vscode://schemas/color-theme',
    name: 'Mint Green',
    type: 'light',
    semanticHighlighting: true,
    colors,
    semanticTokenColors,
    tokenColors,
  };

  // --- Write to disk ---
  const themePath = path.join(context.extensionPath, 'themes', 'mint-green-color-theme.json');
  fs.writeFileSync(themePath, JSON.stringify(themeJson, null, 2), 'utf8');

  // Notify user that a window reload is needed for theme changes to take effect
  const action = await vscode.window.showInformationMessage(
    'Mint Green Theme: Colors updated. Reload window to apply changes.',
    'Reload Now'
  );
  if (action === 'Reload Now') {
    await vscode.commands.executeCommand('workbench.action.reloadWindow');
  }
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

  await applyColors(context);
}
```

- [ ] **Step 3: 确认文件保存正确**

在编辑器中检查 `src/applyColors.ts`，确保内容完整，无语法错误。

---

## Task 2: 更新 `extension.ts` —— 传入 context

**Files:**
- Modify: `src/extension.ts`

现有 `applyColors()` 和 `resetColors()` 不接受参数，需要改为接受 `context`。

- [ ] **Step 1: 修改 `src/extension.ts`**

```typescript
import * as vscode from 'vscode';
import { applyColors, resetColors } from './applyColors';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  await applyColors(context);

  const configListener = vscode.workspace.onDidChangeConfiguration(async (e) => {
    if (e.affectsConfiguration('mintGreenTheme')) {
      await applyColors(context);
    }
  });

  const resetCommand = vscode.commands.registerCommand(
    'mint-green-theme.resetColors',
    async () => {
      await resetColors(context);
      vscode.window.showInformationMessage('Mint Green Theme: All colors reset to default.');
    }
  );

  context.subscriptions.push(configListener, resetCommand);
}

export function deactivate(): void {}
```

---

## Task 3: 清理旧写入 —— 提供一次性 cleanup 命令

**Files:**
- Modify: `src/extension.ts`
- Modify: `package.json`

已安装插件的用户在更新到新版本之前，`settings.json` 里可能已有 `workbench.colorCustomizations` 和 `editor.tokenColorCustomizations` 的残留。我们在激活时检查并自动清除这些键。

- [ ] **Step 1: 在 `applyColors` 执行前，清除遗留的 settings 写入**

在 `src/applyColors.ts` 的 `applyColors` 函数开头插入清理逻辑：

```typescript
// Clean up legacy settings written by older versions of this extension.
// These keys are no longer used — colors now live entirely in the theme JSON.
const globalConfig = vscode.workspace.getConfiguration();
const existingColorCustomizations = globalConfig.inspect('workbench.colorCustomizations');
const existingTokenCustomizations = globalConfig.inspect('editor.tokenColorCustomizations');

// Only clear if globally set (don't touch workspace-level settings)
if (existingColorCustomizations?.globalValue !== undefined) {
  await globalConfig.update('workbench.colorCustomizations', undefined, vscode.ConfigurationTarget.Global);
}
if (existingTokenCustomizations?.globalValue !== undefined) {
  await globalConfig.update('editor.tokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);
}
```

**注意：** 上面的清理逻辑会在每次激活时执行，这不够精确——它会清除用户自己设置的 `workbench.colorCustomizations`。

**更安全的方式：** 只在第一次激活（或版本升级时）清理，用 `context.globalState` 记录是否已迁移。

修改为：

```typescript
// One-time migration: clear legacy settings written by versions < 0.2.0
const MIGRATION_KEY = 'colorSettingsMigrated_v0_2_0';
const alreadyMigrated = context.globalState.get<boolean>(MIGRATION_KEY, false);
if (!alreadyMigrated) {
  const globalConfig = vscode.workspace.getConfiguration();
  await globalConfig.update('workbench.colorCustomizations', undefined, vscode.ConfigurationTarget.Global);
  await globalConfig.update('editor.tokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);
  await context.globalState.update(MIGRATION_KEY, true);
}
```

将此代码块放在 `applyColors` 函数中，在构建 JSON 之前执行。完整的 `applyColors` 函数如下（合并 Task 1 + Task 3）：

```typescript
export async function applyColors(context: vscode.ExtensionContext): Promise<void> {
  // One-time migration: clear legacy settings written by versions < 0.2.0
  const MIGRATION_KEY = 'colorSettingsMigrated_v0_2_0';
  const alreadyMigrated = context.globalState.get<boolean>(MIGRATION_KEY, false);
  if (!alreadyMigrated) {
    const globalConfig = vscode.workspace.getConfiguration();
    await globalConfig.update('workbench.colorCustomizations', undefined, vscode.ConfigurationTarget.Global);
    await globalConfig.update('editor.tokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);
    await context.globalState.update(MIGRATION_KEY, true);
  }

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

  const commentColor = mintConfig.get<string>('token.comment');
  if (commentColor) {
    tokenColors.push({ scope: ['comment'], settings: { foreground: commentColor, fontStyle: 'italic' } });
  }

  const numberColor = mintConfig.get<string>('token.number');
  if (numberColor) {
    tokenColors.push({ scope: ['variable.other.constant.go'], settings: { foreground: numberColor } });
  }

  const variableColor = mintConfig.get<string>('token.variable');
  if (variableColor) {
    tokenColors.push({ scope: ['variable.other.go'], settings: { foreground: variableColor } });
  }

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
  semanticTokenColors['namespace'] = '#CC3300';
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
  fs.writeFileSync(themePath, JSON.stringify(themeJson, null, 2), 'utf8');

  const action = await vscode.window.showInformationMessage(
    'Mint Green Theme: Colors updated. Reload window to apply changes.',
    'Reload Now'
  );
  if (action === 'Reload Now') {
    await vscode.commands.executeCommand('workbench.action.reloadWindow');
  }
}
```

---

## Task 4: 版本号更新

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 更新版本号**

将 `package.json` 中的 `"version"` 从 `"0.1.1"` 改为 `"0.2.0"`（这是一个行为变更，适合 minor 版本升级）。

```json
"version": "0.2.0",
```

- [ ] **Step 2: 更新 description 说明插件不污染 settings**

```json
"description": "A mint green color theme with fully configurable colors. Does not modify User Settings.",
```

---

## Task 5: 编译和验证

**Files:**
- N/A（编译产出到 `out/`）

- [ ] **Step 1: 编译 TypeScript**

```bash
cd e:/tmp/mint-green-theme
npm run compile
```

预期：无错误输出，`out/extension.js` 和 `out/applyColors.js` 被更新。

- [ ] **Step 2: 检查编译输出**

确认 `out/applyColors.js` 存在且包含 `fs.writeFileSync` 调用。

```bash
grep -n "writeFileSync" out/applyColors.js
```

预期：找到至少一处 `writeFileSync` 调用。

---

## Task 6: Commit

- [ ] **Step 1: 提交所有更改**

```bash
cd e:/tmp/mint-green-theme
git add src/applyColors.ts src/extension.ts package.json
git commit -m "fix: stop polluting User Settings — write colors to theme JSON instead

Previously, applyColors() wrote workbench.colorCustomizations and
editor.tokenColorCustomizations directly to the global User Settings,
which persisted after uninstall. Now all color customization is baked
into the theme JSON file at activation time, leaving User Settings
completely untouched.

Includes a one-time migration that clears the legacy settings keys on
first activation of v0.2.0.

Fixes: https://github.com/caticat/mint-green-theme/issues/1"
```

---

## 自检：Spec 覆盖

| 需求 | 对应 Task |
|------|----------|
| 不写 User Settings | Task 1/3 |
| 激活时生成主题 JSON | Task 1 |
| 配置变更时重新生成 | Task 2（配置监听器已有，传 context 即可） |
| 清除旧版本遗留 settings | Task 3 |
| 版本升级 | Task 4 |
| 编译验证 | Task 5 |
| 提交 | Task 6 |

**已知权衡（不需修复）：**
- 颜色变更后需要重载窗口才能生效（因为 VSCode 主题 JSON 不是热更新的）。这是方案C固有的限制，已通过弹出通知告知用户。
- 插件本身的 `themes/` 目录下的 JSON 文件会被运行时修改（插件目录通常在 extensions 文件夹，可写）。
