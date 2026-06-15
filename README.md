# 每日事项 - 四象限桌面任务管理

一款vibecoding轻量级的桌面任务管理工具，基于艾森豪威尔四象限法则，帮助你高效规划每日工作。采用 Electron + React 构建，无边框透明窗口设计，像桌面小工具一样始终置顶显示。

## 功能特性

- **四象限任务管理** - 按重要/紧急程度将任务分为四个象限，清晰直观
- **固定事项** - 每日重复的固定任务，自动带入新的一天
- **临时待办** - 灵活添加当日临时任务
- **拖拽排序** - 支持拖拽调整任务顺序和象限
- **历史记录** - 查看往日计划，支持导出/导入数据
- **桌面小工具模式** - 无边框透明窗口，始终置顶，不占任务栏
- **系统托盘** - 最小化到右下角托盘，双击恢复
- **自由缩放** - 拖动窗口边缘自由调整大小，内容等比缩放
- **数据清除** - 一键清除所有记录，不留痕迹

## 截图

> 四象限主界面，重要/紧急维度清晰划分任务

## 技术栈

| 技术 | 说明 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| Electron 33 | 桌面端封装 |
| Zustand | 状态管理 |
| Tailwind CSS | 样式 |
| @dnd-kit | 拖拽功能 |
| Lucide React | 图标库 |

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9
- Windows（目前仅支持 Windows）

### 安装依赖

```bash
git clone https://github.com/你的用户名/每日事项.git
cd 每日事项
npm install
```

> 首次安装会下载 Electron，如果网络较慢请配置国内镜像（见下方说明）

### 开发模式

```bash
# 启动 Web 开发服务器（浏览器预览）
npm run dev

# 启动 Electron 桌面版
npm run electron:dev
```

### 打包为 EXE

```bash
npm run electron:build
```

打包完成后，在 `release-new/win-unpacked/` 目录下找到 `每日事项.exe`，整个 `win-unpacked` 文件夹可以复制到任何 Windows 电脑直接运行，无需安装。

## 国内镜像配置

如果 `npm install` 或打包时下载 Electron 失败，请创建 `.npmrc` 文件（项目已包含）：

```ini
electron_mirror=https://npmmirror.com/mirrors/electron/
electron-builder-binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
```

## 项目结构

```
├── electron/               # Electron 主进程
│   ├── index.js            # 窗口创建、托盘、IPC 通信
│   └── preload.js          # 安全桥接，暴露窗口控制 API
├── src/                    # React 前端
│   ├── components/         # 组件
│   │   ├── TitleBar.tsx    # 自定义标题栏（拖动、最小化、关闭、置顶）
│   │   ├── QuadrantGrid.tsx  # 四象限网格
│   │   ├── QuadrantCard.tsx  # 单个象限卡片
│   │   ├── TaskItem.tsx    # 任务项
│   │   ├── TaskInput.tsx   # 任务输入框
│   │   ├── FixedItems.tsx  # 固定事项
│   │   ├── TemporaryTodos.tsx # 临时待办
│   │   ├── HistoryPanel.tsx  # 历史记录面板
│   │   └── SettingsPanel.tsx # 设置面板
│   ├── pages/
│   │   └── MainPanel.tsx   # 主页面
│   ├── store/
│   │   └── usePlanStore.ts # Zustand 状态管理
│   ├── utils/
│   │   ├── date.ts         # 日期工具
│   │   └── storage.ts      # localStorage 封装
│   ├── App.tsx             # 应用入口
│   ├── main.tsx            # 渲染入口
│   └── types.ts            # 类型定义
├── public/                 # 静态资源
├── icon.ico                # 应用图标
├── package.json            # 项目配置 & Electron Builder 配置
├── vite.config.ts          # Vite 配置
├── tailwind.config.js      # Tailwind 配置
└── tsconfig.json           # TypeScript 配置
```

## 使用说明

### 基本操作

1. **添加任务** - 在对应象限的输入框中输入内容，按回车添加
2. **完成任务** - 点击任务左侧圆圈标记完成
3. **删除任务** - 点击任务右侧删除按钮
4. **拖拽排序** - 拖动任务调整顺序或移动到其他象限

### 窗口操作

| 操作 | 方式 |
|------|------|
| 移动窗口 | 拖动顶部标题栏 |
| 调整大小 | 拖动窗口边缘/角落 |
| 最小化 | 点击标题栏最小化按钮 |
| 隐藏到托盘 | 点击关闭按钮 |
| 恢复窗口 | 双击右下角托盘图标 |
| 完全退出 | 右键托盘图标 → 退出 |

### 数据管理

- **导出数据** - 历史记录面板中点击导出，保存为 JSON 文件
- **导入数据** - 历史记录面板中点击导入，从 JSON 文件恢复
- **清除所有数据** - 设置面板中点击"清除所有数据"，不可恢复

### 开机自启动

右键以管理员身份运行 `创建开机自启动.ps1` 即可添加开机自启动。

## 自定义图标

替换项目根目录下的 `icon.ico` 文件，然后重新打包即可。ICO 文件建议包含多种尺寸（16/32/48/64/128/256）。

## License

MIT
