# Mint Green Theme

A Visual Studio Code color theme based on mint green (`#CCE8CF`). Every color is customizable, and all colors can be reset to defaults with a single command.

## Features

- Main editor background: `#CCE8CF` (mint green)
- All UI areas use harmonious color offsets — sidebar, terminal, tabs, title bar, status bar, activity bar
- Carefully tuned syntax token colors with distinct hues for easy type recognition
- Full semantic highlighting support (Go/gopls and other LSP languages)
- **Every color is configurable** via VS Code Settings (`mintGreenTheme.*`)
- **One command to reset all colors to default**: `Mint Green Theme: Reset All Colors to Default`
- Works in the VS Code **Agents Window** as well as regular editor windows

## Installation

Search for **Mint Green Theme** in the VS Code Extensions marketplace, or install from [Open VSX](https://open-vsx.org/).

## Usage

1. Open Command Palette (`Ctrl+Shift+P`) → `Preferences: Color Theme` → select **Mint Green**
2. The theme applies automatically

### Customize Colors

Open Settings (`Ctrl+,`) and search for `mintGreenTheme`. All colors are grouped into:

- **Editor Colors** — background, text, line highlight, selection, find
- **UI Colors** — title bar, activity bar, status bar, tabs, sidebar, terminal, input, lists
- **Syntax Token Colors** — comments, strings, keywords, numbers, functions, types, variables
- **Advanced: Editor** — word highlight, bracket match, cursor, indent guide, ruler
- **Advanced: UI Elements** — inactive states, buttons, badges, notifications
- **Advanced: Git Decorations** — modified, untracked, deleted file colors

### Reset to Default

Run `Mint Green Theme: Reset All Colors to Default` from the Command Palette (`Ctrl+Shift+P`).

## Syntax Color Reference

| Token | Color | Example |
| ----- | ----- | ------- |
| Comment | `#62766A` gray-sage italic | `// note` |
| Keyword | `#4527A0` deep indigo | `func`, `if`, `for` |
| Type / Struct | `#8A2BA8` orchid purple | `int32`, `Player` |
| String | `#A84800` burnt orange | `"hello"` |
| Number / Constant | `#B0006B` deep rose | `0`, `MaxCount` |
| Function / Method | `#0060B8` deep blue | `BizErr()`, `Init()` |
| Variable | `#00695C` deep teal | `ctx`, `rankId` |
| Parameter | `#6B4F1D` dark bronze | `p`, `te` |
| Namespace / Package | `#5F6A00` olive | `fmt`, `strings` |

## UI Color Reference

| Area | Color |
| ---- | ----- |
| Editor background | `#CCE8CF` |
| Sidebar | `#BCD8BF` |
| Terminal / Panel | `#D0F0D0` |
| Activity bar / Title bar | `#A8C8AB` |
| Status bar | `#3F7F43` |
| Input / Dropdown | `#E8F5E9` |

## Changelog

### v0.2.3

- Support the VS Code Agents Window: declare `capabilities.agentsWindow.supported`
  so the extension is enabled there and the Mint Green theme (including custom
  colors) applies instead of falling back to the default dark theme
- Fix: static theme JSON now includes the find / selection / line highlight
  defaults, so they apply before the extension activates
- Color tuning for readability (WCAG contrast) and token distinction:
  - Line numbers `#1A6E7E`, status bar `#3F7F43` (debugging: orange `#A65A1E`,
    no folder: slate `#4F6E7E`), button `#3D7A41`
  - Git decorations darkened: modified `#7A5A00`, untracked `#0F6B3C`,
    deleted `#8E3F1F`
  - Selection changed from red to soft blue (`#4A90E280`, highlight
    `#4A90E230`); current line highlight is now a neutral `#00000012`
  - Syntax tokens re-balanced so similar hues no longer collide: comment
    `#62766A`, string `#A84800`, keyword `#4527A0`, function `#0060B8`,
    type `#8A2BA8`, variable `#00695C`, parameter `#6B4F1D`,
    namespace olive `#5F6A00`
  - Colors you customized in settings are not affected

### v0.2.2

- Fix: repeated reload prompts no longer appear after installing or reloading VS Code
- Fix: the extension no longer clears user-level `workbench.colorCustomizations`
  or `editor.tokenColorCustomizations`
- Theme files are rewritten only when generated colors actually change
- If you used an older version and still see unexpected colors, manually check
  those two VS Code settings before removing them

### v0.2.0

- Fix: extension no longer writes to User Settings — uninstalling leaves no
  trace in `settings.json`
  (fixes [#1](https://github.com/caticat/mint-green-theme/issues/1))
- Note: versions before v0.2.2 attempted an automatic one-time cleanup of
  color customization settings; this behavior has been removed
- Note: changing a color setting now requires a window reload
  (a "Reload Now" prompt appears automatically)

### v0.1.1

- Add semantic highlighting support (`"semanticHighlighting": true`) — fixes Go/gopls token colors
- Improve syntax token contrast: deepen comment, shift type to red-purple, darken parameter
- Fix tab hover color hue, git decoration contrast
- Sync TextMate and semantic token scopes

### v0.1.0

- Initial release

## License

MIT

---

# Mint Green Theme（中文说明）

一款基于薄荷绿（`#CCE8CF`）的 Visual Studio Code 颜色主题，支持所有颜色的独立配置，并可一键恢复默认值。

## 特点

- 主编辑区背景色：`#CCE8CF`（绿豆沙/薄荷绿）
- 侧边栏、终端、标签栏、标题栏、状态栏、活动栏等区域均使用与主色调相近的颜色，整体协调
- 代码语法颜色采用不同色相，类型、函数、变量、关键字等一目了然
- 支持语义高亮（Go/gopls 及其他 LSP 语言）
- **所有颜色均可通过 VSCode 设置项自定义**（搜索 `mintGreenTheme`）
- **支持一键恢复所有颜色为默认值**：`Mint Green Theme: Reset All Colors to Default`

## 安装

在 VSCode 扩展市场搜索 **Mint Green Theme** 安装，或从 [Open VSX](https://open-vsx.org/) 安装（适用于 Cursor 等编辑器）。

## 使用方法

1. 打开命令面板（`Ctrl+Shift+P`）→ `Preferences: Color Theme` → 选择 **Mint Green**
2. 主题自动生效

### 自定义颜色

打开设置（`Ctrl+,`），搜索 `mintGreenTheme`，即可看到所有颜色配置项，按分类排列：

- **Editor Colors** — 编辑器背景、文字、行高亮、选中、查找
- **UI Colors** — 标题栏、活动栏、状态栏、标签栏、侧边栏、终端、输入框、列表
- **Syntax Token Colors** — 注释、字符串、关键字、数字、函数、类型、变量
- **Advanced: Editor** — 词高亮、括号匹配、光标、缩进线、参考线
- **Advanced: UI Elements** — 失焦状态、按钮、角标、通知
- **Advanced: Git Decorations** — 修改/未跟踪/删除文件颜色

### 恢复默认颜色

命令面板（`Ctrl+Shift+P`）→ 运行 `Mint Green Theme: Reset All Colors to Default`。

## 更新日志

### v0.2.2

- 修复：安装或重载 VS Code 后不再重复弹出 reload 提示
- 修复：插件不再清空用户级 `workbench.colorCustomizations`
  或 `editor.tokenColorCustomizations`
- 只有生成的主题颜色确实变化时，才会重写主题文件
- 如果你使用过旧版本并仍看到异常颜色，请先手动检查这两个 VS Code 设置，
  确认后再自行移除

### v0.2.0

- 修复：插件不再写入 User Settings，卸载后 `settings.json` 无任何残留
  （修复 [#1](https://github.com/caticat/mint-green-theme/issues/1)）
- 注意：v0.2.2 之前的版本曾尝试自动清理颜色自定义设置；此行为现已移除
- 注意：修改颜色配置后需要重载窗口（会自动弹出"Reload Now"提示）

### v0.1.1

- 添加语义高亮声明（`"semanticHighlighting": true`），修复 Go/gopls token 颜色不生效问题
- 优化语法颜色对比度：加深注释色、类型色调整为红紫、参数色加深
- 修复标签悬停色调、git 装饰色对比度
- 同步 TextMate 与语义 token 的 scope 覆盖范围

### v0.1.0

- 初始版本发布

## 许可证

MIT
