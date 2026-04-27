# 简历神器 · Awsome Resume

一款基于 **React 18 + TypeScript + Vite** 构建的 **AI 驱动** 简历工具。不只是简历生成器 —— 支持多模板切换、岗位定向匹配度分析、一键改写 / 量化 / STAR 化、PDF 导出，开箱即用，无需后端。

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss) ![AI Powered](https://img.shields.io/badge/AI-Powered-8B5CF6)

---

## 功能特性

### 简历模板

提供 4 套专业模板，覆盖不同求职场景：

| 模板 | 风格 | 适用场景 |
|------|------|---------|
| **现代** | 彩色页眉 + 标签式技能 | 互联网、产品、设计岗位 |
| **经典** | 居中对齐、传统排版 | 金融、行政、管培生 |
| **极简** | 大量留白、轻量字重 | 设计师、创意行业 |
| **技术** | 深色左侧栏 + 双栏布局 | 研发工程师、技术岗位 |

### 样式定制

- **颜色主题**：经典蓝、青碧绿、典雅紫、商务灰、玫瑰红、琥珀金，共 6 种配色一键切换
- **字体风格**：无衬线体（默认）/ 衬线体 / 等宽体
- **字体大小**：小 / 中 / 大 三档调节

### 简历内容模块

支持以下 8 个独立可编辑模块：

- 基本信息（姓名、职位、联系方式、个人简介）
- 工作经历（公司、职务、时间段、工作描述、量化成就）
- 教育经历（学校、专业、学历、GPA）
- 专业技能（分类技能标签，支持批量添加/删除）
- 项目经历（项目名称、角色、描述、技术栈、链接）
- 证书 & 荣誉
- 语言能力
- 自定义模块（自由添加任意内容）

### 其他功能

- **实时预览**：左侧编辑，右侧即时同步渲染，支持缩放（30%—120%）
- **PDF 导出**：高质量 A4 格式，导出效果与预览完全一致
- **JSON 备份 / 恢复**：将简历数据导出为 JSON 文件，随时导入恢复
- **浏览器打印**：一键调用系统打印功能
- **自动持久化**：数据实时保存至 `localStorage`，刷新页面不丢失
- **重置示例**：一键恢复为内置示例数据，方便快速体验

---

## 快速开始

### 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | ≥ 18 |
| pnpm | ≥ 8（推荐）|

> 也可以使用 `npm` 或 `yarn`，将下方命令中的 `pnpm` 替换即可。

### 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/wke88/generate-resume.git
cd generate-resume

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

启动成功后，在浏览器打开 [http://localhost:5173](http://localhost:5173) 即可使用。

### 构建生产版本

```bash
# 构建产物输出至 dist/ 目录
pnpm build

# 本地预览构建结果
pnpm preview
```

---

## 项目结构

```
generate-resume/
├── public/
│   └── favicon.svg
├── src/
│   ├── types/
│   │   └── resume.ts              # 完整 TypeScript 类型定义
│   ├── data/
│   │   └── defaults.ts            # 默认数据 & 颜色主题配置
│   ├── store/
│   │   └── resumeStore.ts         # Zustand 全局状态（含 localStorage 持久化）
│   ├── templates/
│   │   ├── ModernTemplate.tsx     # 现代模板
│   │   ├── ClassicTemplate.tsx    # 经典模板
│   │   ├── MinimalTemplate.tsx    # 极简模板
│   │   ├── TechTemplate.tsx       # 技术双栏模板
│   │   └── index.tsx              # 模板路由
│   ├── components/
│   │   ├── TopBar.tsx             # 顶部导航 & 导出入口
│   │   ├── PreviewPanel.tsx       # 实时预览区 & 缩放控制
│   │   ├── SettingsPanel.tsx      # 模板 / 颜色 / 字体设置面板
│   │   └── editor/
│   │       ├── EditorPanel.tsx    # 编辑器主容器 & 侧边导航
│   │       ├── PersonalForm.tsx   # 基本信息表单
│   │       ├── WorkExperienceForm.tsx
│   │       ├── EducationForm.tsx
│   │       ├── SkillsForm.tsx
│   │       ├── ProjectsForm.tsx
│   │       └── OtherForms.tsx     # 证书 / 语言 / 自定义模块
│   ├── utils/
│   │   └── export.ts              # PDF & JSON 导出工具函数
│   ├── App.tsx                    # 根组件 & 布局
│   ├── main.tsx                   # 入口文件
│   └── index.css                  # 全局样式 & Tailwind 引入
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 技术栈

| 分类 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite 4 |
| 样式方案 | Tailwind CSS 3 |
| 状态管理 | Zustand 4（含 `persist` 中间件） |
| PDF 生成 | html2canvas + jsPDF |
| 图标库 | Lucide React |

---

## 开源协议

[MIT License](LICENSE) · 欢迎 Fork、Star 和 PR 贡献。
