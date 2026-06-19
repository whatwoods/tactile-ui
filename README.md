# Tactile UI (Smartisan UI) 设计系统

一套具有物理触感的 AI-Native React 设计系统，受 Smartisan OS 经典设计思想启发。

Tactile UI 不是对 Smartisan OS 的复刻，也不是简单的旧拟物风组件库，而是提炼其背后的设计方法：**秩序、比例、触感、直觉与克制的工艺感**。它提供了一套极具质感、能够被 AI Coding Agent 理解并精确执行的视觉规范体系。

---

## ✨ 核心特色

1. **精致拟物主义 (Refined Skeuomorphism)**
   - 拒绝大面积刺眼的渐变和过多花哨的材质贴图，完全依靠光影与立体深度来传染材质感。
   - 使用多重阴影层叠加（环境阴影 + 落体阴影 + 内部边缘高光），实现像素级精细的物理凹凸质感。

2. **黄金比例节奏系统 (Golden Ratio Rhythm)**
   - 使用黄金分割常数 $\phi \approx 1.618$ 及相关步长，为系统定义布局比例、圆角级数、字号阶梯、阴影模糊度、色彩强度和动效时长。
   - 创造富有和谐美感与自然呼吸感的视觉层级。

3. **官方资源精确校准 (Calibrated Specs)**
   - 从 SmartisanTech 开源项目（`OneStep`、`BigBang`、`android_frameworks_smartisanos-base` 等）中提取真实的布局、透明度及工程尺寸，而不是只靠主观推测。
   - 比如 `13.5sp` 的按钮字号、`48dp` 的侧栏宽度、`54dp` 的 Chip 行高等均得到高精度还原。

4. **物理按键反馈音效 (Web Audio Click)**
   - 系统内置了轻量化的物理反馈层。基于浏览器原生 `AudioContext`，无需下载大型音频文件即可合出清脆的机械开关与按钮物理点击音效。

5. **现代 CSS 架构 (CSS Modules & CSS Variables)**
   - 顶层由 `src/styles/tokens.css` 强力约束设计令牌，确保绝无颜色与阴影的硬编码。
   - 组件样式采用 Vanilla CSS Modules 编写，独立自治，防止全局污染，对现代打包工具极其友好。

---

## 📂 项目结构

```txt
├── DESIGN.md                 # 核心设计哲学、黄金比例推导与视觉准则 (必读)
├── README.md                 # 项目介绍与快速上手
├── package.json              # 项目依赖与 Scripts
├── src/
│   ├── App.tsx               # 落地页核心交互演练场与 specs 展示
│   ├── main.tsx              # 应用入口
│   ├── components/           # Tactile UI 组件库
│   │   ├── Hero/             # 交互式 skeuomorphic 控制台 Hero 模块
│   │   ├── Button/           # 物理琴键按钮
│   │   ├── Switch/           # 立体拨码开关
│   │   ├── Slider/           # 物理阻尼滑块
│   │   ├── OneStepItem/      # OneStep 内容列表与托盘面板
│   │   ├── BigBangSearchPanel/# BigBang 裂变搜索面板
│   │   └── ...               # 其他已校准拟物组件
│   └── styles/
│       ├── tokens.css        # 设计令牌（核心颜色、多重阴影、边框半径、时间函数）
│       └── global.css        # 全局基础重置样式与滚动条规范
```

---

## 🚀 快速上手

### 1. 安装依赖

确保你本地安装了 Node.js（推荐 v18 或更高版本），然后在项目根目录下运行：

```bash
npm install
```

### 2. 启动开发服务器

启动 Vite 开发服务器以进行实时预览：

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173` 即可体验。

### 3. 构建生产包

```bash
npm run build
```

---

## 🛠️ 使用示例

在你的 React 项目中，可以通过直接引入组件与样式来开始使用：

```tsx
import React, { useState } from 'react';
import { Card } from './components/Card/Card';
import { Switch } from './components/Switch/Switch';
import { Button } from './components/Button/Button';
import './styles/tokens.css'; // 确保全局引入了设计令牌

function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Card title="控制面板" padding="lg">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>系统加速状态</span>
        <Switch checked={enabled} onChange={setEnabled} />
      </div>
      
      <Button 
        variant="primary" 
        style={{ marginTop: '20px', width: '100%' }}
        disabled={!enabled}
      >
        执行同步
      </Button>
    </Card>
  );
}
```

---

## 🎨 设计原则备忘 (详见 [DESIGN.md](file:///Users/way/Developer/webs/smartisan-ui/DESIGN.md))

* **不要硬编码颜色**：始终使用 `var(--s-color-*)`。
* **不要硬编码阴影**：悬浮用 `var(--s-shadow-panel)`，按压用 `var(--s-shadow-pressed)`，按钮用 `var(--s-shadow-button-idle)`，凹槽用 `var(--s-shadow-inset-groove)`。
* **物理光源统一**：默认左上角为光源，即阴影永远向右下方延伸，凹陷部分的亮边则在右下方。
* **秩序高于装饰**：先通过 $4\text{px}$ 步长和黄金比例搭建严密的比例网格，再去添加微弱的材质细节。
