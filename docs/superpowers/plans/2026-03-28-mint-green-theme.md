# Mint Green Theme VSCode Extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个名为 `mint-green-theme` 的 VSCode 颜色主题插件，主色调为 `#CCE8CF`，所有 UI 颜色和代码语法颜色均通过 VSCode 设置项可配置，并支持一键恢复默认值命令。

**Architecture:** 插件注册一个标准颜色主题（`contributes.themes`），同时通过 `contributes.configuration` 暴露所有颜色为用户可配置项（带默认值）。Extension Host 在激活时读取用户配置，动态写入 `workbench.colorCustomizations`，并注册 `mint-green-theme.resetColors` 命令恢复所有颜色到插件默认值。

**Tech Stack:** TypeScript, VSCode Extension API (`vscode.workspace.getConfiguration`, `vscode.commands.registerCommand`), Node.js, `@vscode/vsce` 打包工具

---

## 文件结构

```
mint-green-theme/
├── package.json                  # 插件清单：contributes.themes, configuration, commands
├── tsconfig.json                 # TypeScript 编译配置
├── .vscodeignore                 # 打包忽略文件
├── README.md                     # 英文说明 + 中文说明
├── LICENSE                       # MIT License
├── publish.ps1                   # 发布到 VS Code Marketplace 和 Open VSX 的脚本
├── src/
│   ├── extension.ts              # 插件入口：激活、监听配置变更、注册命令
│   ├── colors.ts                 # 所有颜色键名和默认值的单一来源
│   └── applyColors.ts            # 读取配置并写入 workbench.colorCustomizations 的逻辑
└── themes/
    └── mint-green-color-theme.json  # 静态主题 JSON（tokenColors 初始值，UI颜色由代码动态写入）
```

---

## Task 1: 初始化插件项目结构

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.vscodeignore`

- [ ] **Step 1: 初始化 npm 项目并安装依赖**

```bash
cd e:/tmp/mint-green-theme
npm init -y
npm install --save-dev typescript @types/vscode @vscode/vsce
```

预期输出：`package.json` 被创建，`node_modules/` 被填充。

- [ ] **Step 2: 写入 `package.json`**

完整内容（覆盖 npm init 生成的文件）：

```json
{
  "name": "mint-green-theme",
  "displayName": "Mint Green Theme",
  "description": "A mint green color theme with fully configurable colors and reset-to-default support.",
  "version": "0.1.0",
  "publisher": "panjie",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": ["Themes"],
  "activationEvents": ["onStartupFinished"],
  "main": "./out/extension.js",
  "contributes": {
    "themes": [
      {
        "label": "Mint Green",
        "uiTheme": "vs",
        "path": "./themes/mint-green-color-theme.json"
      }
    ],
    "commands": [
      {
        "command": "mint-green-theme.resetColors",
        "title": "Mint Green Theme: Reset All Colors to Default"
      }
    ],
    "configuration": {
      "title": "Mint Green Theme",
      "properties": {
        "mintGreenTheme.editor.background": {
          "type": "string",
          "default": "#CCE8CF",
          "description": "Editor background color"
        },
        "mintGreenTheme.editor.findMatchBackground": {
          "type": "string",
          "default": "#fbff0071",
          "description": "Editor find match highlight background"
        },
        "mintGreenTheme.editor.findMatchHighlightBackground": {
          "type": "string",
          "default": "#00bfff69",
          "description": "Editor find all matches highlight background"
        },
        "mintGreenTheme.editor.findRangeHighlightBackground": {
          "type": "string",
          "default": "#ff99006e",
          "description": "Editor find range highlight background"
        },
        "mintGreenTheme.editor.selectionBackground": {
          "type": "string",
          "default": "#ff212190",
          "description": "Editor selection background"
        },
        "mintGreenTheme.editor.selectionHighlightBackground": {
          "type": "string",
          "default": "#ff212150",
          "description": "Editor selection highlight background"
        },
        "mintGreenTheme.editor.lineHighlightBackground": {
          "type": "string",
          "default": "#1100ff20",
          "description": "Editor current line highlight background"
        },
        "mintGreenTheme.editorGutter.background": {
          "type": "string",
          "default": "#CCE8CF",
          "description": "Editor gutter (line number area) background"
        },
        "mintGreenTheme.editorLineNumber.foreground": {
          "type": "string",
          "default": "#2BA7BF",
          "description": "Editor line number foreground color"
        },
        "mintGreenTheme.editorGroupHeader.tabsBackground": {
          "type": "string",
          "default": "#c1d3c1",
          "description": "Tab bar background color"
        },
        "mintGreenTheme.tab.inactiveBackground": {
          "type": "string",
          "default": "#b1cab1",
          "description": "Inactive tab background color"
        },
        "mintGreenTheme.sideBar.background": {
          "type": "string",
          "default": "#BCD8BF",
          "description": "Sidebar background color"
        },
        "mintGreenTheme.panel.background": {
          "type": "string",
          "default": "#D0F0D0",
          "description": "Panel (terminal area) background color"
        },
        "mintGreenTheme.terminal.background": {
          "type": "string",
          "default": "#D0F0D0",
          "description": "Integrated terminal background color"
        },
        "mintGreenTheme.token.comment": {
          "type": "string",
          "default": "#6A9955",
          "description": "Token color: comments"
        },
        "mintGreenTheme.token.string": {
          "type": "string",
          "default": "#A31515",
          "description": "Token color: strings"
        },
        "mintGreenTheme.token.keyword": {
          "type": "string",
          "default": "#0000FF",
          "description": "Token color: keywords"
        },
        "mintGreenTheme.token.number": {
          "type": "string",
          "default": "#098658",
          "description": "Token color: numbers"
        },
        "mintGreenTheme.token.function": {
          "type": "string",
          "default": "#795E26",
          "description": "Token color: function names"
        },
        "mintGreenTheme.token.type": {
          "type": "string",
          "default": "#267F99",
          "description": "Token color: types and classes"
        },
        "mintGreenTheme.token.variable": {
          "type": "string",
          "default": "#001080",
          "description": "Token color: variables"
        },
        "mintGreenTheme.token.parameter": {
          "type": "string",
          "default": "#383838",
          "description": "Token color: function parameters"
        }
      }
    }
  },
  "scripts": {
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "package": "vsce package"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0",
    "@vscode/vsce": "^2.22.0",
    "typescript": "^5.3.0"
  }
}
```

- [ ] **Step 3: 写入 `tsconfig.json`**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "outDir": "./out",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", ".vscode-test"]
}
```

- [ ] **Step 4: 写入 `.vscodeignore`**

```
.vscode/**
src/**
node_modules/**
out/maps/**
**/*.map
tsconfig.json
.vscodeignore
```

- [ ] **Step 5: 验证编译环境**

```bash
cd e:/tmp/mint-green-theme
npx tsc --version
```

预期输出：`Version 5.x.x`

---

## Task 2: 定义颜色常量（单一来源）

**Files:**
- Create: `src/colors.ts`

- [ ] **Step 1: 创建 `src/` 目录并写入 `src/colors.ts`**

```bash
mkdir -p e:/tmp/mint-green-theme/src
```

`src/colors.ts` 完整内容：

```typescript
/**
 * UI_COLOR_KEYS: 配置项键名 -> workbench.colorCustomizations 键名的映射
 * 格式：{ configKey: vscodeColorKey }
 */
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

/**
 * TOKEN_COLOR_KEYS: token 配置项键名列表（用于构建 tokenColors）
 */
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

/**
 * TOKEN_SCOPES: token 配置项键名 -> TextMate scope 的映射
 */
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
```

- [ ] **Step 2: 确认文件写入正确**

```bash
cat e:/tmp/mint-green-theme/src/colors.ts | head -5
```

预期输出：以 `/**` 开头的注释行。

---

## Task 3: 实现颜色应用逻辑

**Files:**
- Create: `src/applyColors.ts`

- [ ] **Step 1: 写入 `src/applyColors.ts`**

```typescript
import * as vscode from 'vscode';
import { UI_COLOR_KEYS, TOKEN_COLOR_KEYS, TOKEN_SCOPES } from './colors';

/**
 * 读取 mintGreenTheme.* 配置，写入 workbench.colorCustomizations
 * 同时更新 editor.tokenColorCustomizations
 */
export async function applyColors(): Promise<void> {
  const config = vscode.workspace.getConfiguration();
  const mintConfig = vscode.workspace.getConfiguration('mintGreenTheme');

  // 1. 构建 UI 颜色覆盖对象
  const colorCustomizations: Record<string, string> = {};
  for (const [configKey, vscodeKey] of Object.entries(UI_COLOR_KEYS)) {
    // configKey 形如 'mintGreenTheme.editor.background'
    // mintConfig 的 section 是 'mintGreenTheme'，所以取子键
    const subKey = configKey.replace('mintGreenTheme.', '');
    const value = mintConfig.get<string>(subKey);
    if (value) {
      colorCustomizations[vscodeKey] = value;
    }
  }

  // 2. 写入 workbench.colorCustomizations（全局配置）
  await config.update(
    'workbench.colorCustomizations',
    colorCustomizations,
    vscode.ConfigurationTarget.Global
  );

  // 3. 构建 tokenColors 覆盖对象
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

  // 4. 写入 editor.tokenColorCustomizations（全局配置）
  await config.update(
    'editor.tokenColorCustomizations',
    { textMateRules: tokenRules },
    vscode.ConfigurationTarget.Global
  );
}

/**
 * 将所有 mintGreenTheme.* 配置重置为 undefined（使用插件默认值）
 * 并重新应用颜色
 */
export async function resetColors(): Promise<void> {
  const mintConfig = vscode.workspace.getConfiguration('mintGreenTheme');

  // 收集所有子键
  const allKeys = [
    ...Object.keys(UI_COLOR_KEYS).map(k => k.replace('mintGreenTheme.', '')),
    ...TOKEN_COLOR_KEYS.map(k => k.replace('mintGreenTheme.', '')),
  ];

  // 逐一重置为 undefined（恢复 package.json 中定义的 default 值）
  for (const key of allKeys) {
    await mintConfig.update(key, undefined, vscode.ConfigurationTarget.Global);
  }

  // 重新应用（此时读取的是 package.json 默认值）
  await applyColors();
}
```

- [ ] **Step 2: 确认文件存在**

```bash
ls e:/tmp/mint-green-theme/src/
```

预期输出：`applyColors.ts  colors.ts`

---

## Task 4: 实现插件入口

**Files:**
- Create: `src/extension.ts`

- [ ] **Step 1: 写入 `src/extension.ts`**

```typescript
import * as vscode from 'vscode';
import { applyColors, resetColors } from './applyColors';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  // 激活时应用一次颜色
  await applyColors();

  // 监听配置变更，实时更新颜色
  const configListener = vscode.workspace.onDidChangeConfiguration(async (e) => {
    if (e.affectsConfiguration('mintGreenTheme')) {
      await applyColors();
    }
  });

  // 注册重置命令
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
```

- [ ] **Step 2: 编译 TypeScript**

```bash
cd e:/tmp/mint-green-theme && npx tsc -p ./
```

预期输出：无错误，`out/` 目录生成 `extension.js`、`applyColors.js`、`colors.js`。

- [ ] **Step 3: 确认编译产物**

```bash
ls e:/tmp/mint-green-theme/out/
```

预期输出：`applyColors.js  colors.js  extension.js`

---

## Task 5: 创建静态主题 JSON

**Files:**
- Create: `themes/mint-green-color-theme.json`

- [ ] **Step 1: 创建 themes 目录并写入主题文件**

```bash
mkdir -p e:/tmp/mint-green-theme/themes
```

`themes/mint-green-color-theme.json` 完整内容：

```json
{
  "$schema": "vscode://schemas/color-theme",
  "name": "Mint Green",
  "type": "light",
  "colors": {
    "editor.background": "#CCE8CF",
    "editorGutter.background": "#CCE8CF",
    "editorLineNumber.foreground": "#2BA7BF",
    "editorGroupHeader.tabsBackground": "#c1d3c1",
    "tab.inactiveBackground": "#b1cab1",
    "sideBar.background": "#BCD8BF",
    "panel.background": "#D0F0D0",
    "terminal.background": "#D0F0D0"
  },
  "tokenColors": [
    {
      "scope": ["comment"],
      "settings": { "foreground": "#6A9955" }
    },
    {
      "scope": ["string"],
      "settings": { "foreground": "#A31515" }
    },
    {
      "scope": ["keyword", "storage", "storage.type"],
      "settings": { "foreground": "#0000FF" }
    },
    {
      "scope": ["constant.numeric"],
      "settings": { "foreground": "#098658" }
    },
    {
      "scope": ["entity.name.function", "support.function"],
      "settings": { "foreground": "#795E26" }
    },
    {
      "scope": ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      "settings": { "foreground": "#267F99" }
    },
    {
      "scope": ["variable", "variable.other"],
      "settings": { "foreground": "#001080" }
    },
    {
      "scope": ["variable.parameter"],
      "settings": { "foreground": "#383838" }
    }
  ]
}
```

- [ ] **Step 2: 确认文件存在**

```bash
ls e:/tmp/mint-green-theme/themes/
```

预期输出：`mint-green-color-theme.json`

---

## Task 6: 添加 README.md、LICENSE 和 publish.ps1

**Files:**
- Create: `README.md`
- Create: `LICENSE`
- Create: `publish.ps1`

- [ ] **Step 1: 写入 `README.md`**

```markdown
# Mint Green Theme

A Visual Studio Code color theme based on mint green (`#CCE8CF`), with fully configurable colors and one-click reset to defaults.

## Features

- Main editor background: `#CCE8CF` (mint green)
- All UI areas (sidebar, terminal, tabs, gutter) use harmonious color offsets from the main color
- All colors are configurable via VS Code Settings (`mintGreenTheme.*`)
- Syntax token colors (comments, strings, keywords, etc.) are also configurable
- One command to reset all colors to plugin defaults: `Mint Green Theme: Reset All Colors to Default`

## Installation

Search for **Mint Green Theme** in the VS Code Extensions marketplace, or install from [Open VSX](https://open-vsx.org/).

## Usage

1. Open Command Palette (`Ctrl+Shift+P`) → `Preferences: Color Theme` → select **Mint Green**
2. The theme applies automatically
3. To customize colors: open Settings (`Ctrl+,`) and search for `mintGreenTheme`
4. To reset all colors to default: Command Palette → `Mint Green Theme: Reset All Colors to Default`

## Color Configuration

All colors can be customized in `settings.json`:

| Setting | Default | Description |
|---------|---------|-------------|
| `mintGreenTheme.editor.background` | `#CCE8CF` | Editor background |
| `mintGreenTheme.editorGutter.background` | `#CCE8CF` | Line number gutter background |
| `mintGreenTheme.editorLineNumber.foreground` | `#2BA7BF` | Line number color |
| `mintGreenTheme.editorGroupHeader.tabsBackground` | `#c1d3c1` | Tab bar background |
| `mintGreenTheme.tab.inactiveBackground` | `#b1cab1` | Inactive tab background |
| `mintGreenTheme.sideBar.background` | `#BCD8BF` | Sidebar background |
| `mintGreenTheme.panel.background` | `#D0F0D0` | Panel background |
| `mintGreenTheme.terminal.background` | `#D0F0D0` | Terminal background |
| `mintGreenTheme.token.comment` | `#6A9955` | Comment color |
| `mintGreenTheme.token.string` | `#A31515` | String color |
| `mintGreenTheme.token.keyword` | `#0000FF` | Keyword color |
| `mintGreenTheme.token.number` | `#098658` | Number color |
| `mintGreenTheme.token.function` | `#795E26` | Function name color |
| `mintGreenTheme.token.type` | `#267F99` | Type/class color |
| `mintGreenTheme.token.variable` | `#001080` | Variable color |
| `mintGreenTheme.token.parameter` | `#383838` | Parameter color |

## License

MIT

---

# Mint Green Theme（中文说明）

一款基于薄荷绿（`#CCE8CF`）的 Visual Studio Code 颜色主题，支持所有颜色的独立配置，并可一键恢复默认值。

## 特点

- 主编辑区背景色：`#CCE8CF`（绿豆沙/薄荷绿）
- 侧边栏、终端、标签栏、行号区等均使用与主色调相近的颜色，整体协调
- 所有界面颜色均可通过 VSCode 设置项（`mintGreenTheme.*`）自定义
- 代码语法颜色（注释、字符串、关键字等）同样支持配置
- 提供命令一键恢复全部颜色为插件默认值：`Mint Green Theme: Reset All Colors to Default`

## 安装

在 VSCode 扩展市场搜索 **Mint Green Theme** 安装，或从 [Open VSX](https://open-vsx.org/) 安装（适用于 Cursor 等编辑器）。

## 使用方法

1. 打开命令面板（`Ctrl+Shift+P`）→ `Preferences: Color Theme` → 选择 **Mint Green**
2. 主题自动生效
3. 自定义颜色：打开设置（`Ctrl+,`），搜索 `mintGreenTheme`，修改对应颜色值
4. 恢复默认颜色：命令面板 → `Mint Green Theme: Reset All Colors to Default`

## 许可证

MIT
```

- [ ] **Step 2: 写入 `LICENSE`**

```text
MIT License

Copyright (c) 2026 panjie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: 写入 `.gitignore`**

```gitignore
node_modules/
out/
*.vsix
```

- [ ] **Step 4: 初始化 git 仓库并提交**

```bash
cd e:/tmp/mint-green-theme
git init
git add .
git commit -m "feat: initial release v0.1.0 - mint green theme with configurable colors"
```

预期输出：`[master (root-commit) xxxxxxx] feat: initial release v0.1.0 ...`

- [ ] **Step 5: 将 `publish.ps1` 和 `docs/` 加入 `.vscodeignore`（不打包进 .vsix）**

在 `.vscodeignore` 末尾追加：

```
publish.ps1
docs/**
.gitignore
```

- [ ] **Step 4: 更新 `package.json`，添加 `repository` 和 `license` 字段**

在 `package.json` 的 `"publisher"` 字段后添加：

```json
"license": "MIT",
"repository": {
  "type": "git",
  "url": "https://github.com/panjie/mint-green-theme"
},
```

- [ ] **Step 5: 确认文件存在**

```bash
ls e:/tmp/mint-green-theme/
```

预期输出：包含 `README.md`、`LICENSE`、`publish.ps1`

---

## Task 7: 打包并本地安装测试

**Files:**
- 无新文件，使用 `@vscode/vsce` 打包

- [ ] **Step 1: 打包插件**

```bash
cd e:/tmp/mint-green-theme && npx vsce package --allow-missing-repository
```

预期输出：生成 `mint-green-theme-0.1.0.vsix` 文件。

- [ ] **Step 2: 本地安装插件**

```bash
code --install-extension e:/tmp/mint-green-theme/mint-green-theme-0.1.0.vsix
```

预期输出：`Extension 'mint-green-theme-0.1.0.vsix' was successfully installed.`

- [ ] **Step 3: 验证插件功能**

1. 重启 VSCode
2. 打开命令面板（`Ctrl+Shift+P`），切换主题：`Preferences: Color Theme` → 选择 `Mint Green`
3. 打开 `File > Preferences > Settings`，搜索 `mintGreenTheme`，确认所有颜色配置项可见
4. 修改任意颜色值，确认编辑器颜色实时变化
5. 执行命令 `Mint Green Theme: Reset All Colors to Default`，确认颜色恢复默认值

---

## Review

- **Task 1**：初始化项目，写 `package.json`（包含 themes/commands/configuration 的完整 contributes）、`tsconfig.json`、`.vscodeignore`
- **Task 2**：`src/colors.ts` 是颜色键名和 TextMate scope 的单一来源，UI 颜色和 token 颜色均在此定义
- **Task 3**：`src/applyColors.ts` 读取 `mintGreenTheme.*` 配置，动态写入 `workbench.colorCustomizations` 和 `editor.tokenColorCustomizations`；`resetColors()` 将所有配置项清为 undefined 后重新应用
- **Task 4**：`src/extension.ts` 激活时调用 `applyColors()`，监听配置变更实时更新，注册重置命令
- **Task 5**：`themes/mint-green-color-theme.json` 提供静态主题 JSON，作为初始颜色基准（dynamic apply 会覆盖这里的值）
- **Task 6**：打包为 `.vsix` 并本地安装验证
