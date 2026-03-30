# Mint Green Theme

A Visual Studio Code color theme based on mint green (`#CCE8CF`). Every color is customizable, and all colors can be reset to defaults with a single command.

## Features

- Main editor background: `#CCE8CF` (mint green)
- All UI areas use harmonious color offsets — sidebar, terminal, tabs, title bar, status bar, activity bar
- Carefully tuned syntax token colors with distinct hues for easy type recognition
- Full semantic highlighting support (Go/gopls and other LSP languages)
- **Every color is configurable** via VS Code Settings (`mintGreenTheme.*`)
- **One command to reset all colors to default**: `Mint Green Theme: Reset All Colors to Default`

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
| Comment | `#4A7A4A` gray-green italic | `// note` |
| Keyword | `#5533CC` indigo | `func`, `if`, `for` |
| Type / Struct | `#8800BB` red-purple | `int32`, `Player` |
| String | `#C05000` deep orange | `"hello"` |
| Number / Constant | `#B0006B` deep rose | `0`, `MaxCount` |
| Function / Method | `#0055CC` deep blue | `BizErr()`, `Init()` |
| Variable | `#007055` deep teal | `ctx`, `rankId` |
| Parameter | `#8B4513` saddle brown | `p`, `te` |

## UI Color Reference

| Area | Color |
| ---- | ----- |
| Editor background | `#CCE8CF` |
| Sidebar | `#BCD8BF` |
| Terminal / Panel | `#D0F0D0` |
| Activity bar / Title bar | `#A8C8AB` |
| Status bar | `#7AAD7E` |
| Input / Dropdown | `#E8F5E9` |

## Changelog

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

### v0.1.1

- 添加语义高亮声明（`"semanticHighlighting": true`），修复 Go/gopls token 颜色不生效问题
- 优化语法颜色对比度：加深注释色、类型色调整为红紫、参数色加深
- 修复标签悬停色调、git 装饰色对比度
- 同步 TextMate 与语义 token 的 scope 覆盖范围

### v0.1.0

- 初始版本发布

## 许可证

MIT
