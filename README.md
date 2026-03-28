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
