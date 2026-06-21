# Tactile UI
### 一套具有物理触感的 AI-Native React 设计系统

> 用秩序建立系统，用触感表达交互，用比例形成节奏，用细节沉淀气质。

Tactile UI 受 Smartisan OS 设计思想启发——不是复刻其界面，而是提炼其背后的设计方法：
秩序、比例、触感、直觉、克制的工艺感，以及**可被 AI Coding Agent 理解和执行的设计规则**。

它在清晰可用的基础上，提供克制、统一、可信的物理触感。

---

## ✨ 核心特色

### 秩序优先于装饰
先建立网格，再定义比例，再定义层级，最后添加视觉细节。
禁止为了风格牺牲结构清晰度。

### 向物理世界学习，而不是照搬物理世界
借用真实世界的行为逻辑，简化真实世界的视觉细节。
多层阴影叠加（环境阴影 + 落体阴影 + 内部高光）提供像素级精细的凹凸质感——不靠贴图，靠光影。

### 黄金比例是比例秩序，不是装饰公式
φ ≈ 1.618 及其衍生步长统一控制间距、字号、圆角、阴影扩散、动效时长。
不是每个尺寸都等于 1:1.618，而是让整个系统拥有自然、统一、可信的节奏。

### AI-Native 设计规则
所有参数收敛在 `tokens.css` 中，不允许硬编码。
AI Coding Agent 可以精准读取、调用并遵守规则——当机器能理解秩序，人类就能专注于感受。

### 物理反馈音效
浏览器原生 `AudioContext` 实时合成机械开关与点击音效。
不需要音频文件，只需一段精心调制的波形。

---

## 📂 项目结构

```txt
├── MANIFESTO.md               # 品牌宣言 —— 我们为什么做这件事
├── DESIGN.md                  # 核心设计哲学、黄金比例推导与视觉准则 (必读)
├── README.md                  # 你正在阅读的这份文档
├── package.json               # 项目依赖与 Scripts
├── src/
│   ├── App.tsx                # 落地页：交互演练场与规范展示
│   ├── main.tsx               # 应用入口
│   ├── components/            # Tactile UI 组件库
│   │   ├── Hero/              # 交互式拟物控制台 Hero 模块
│   │   ├── Button/            # 物理琴键按钮
│   │   ├── Switch/            # 立体拨码开关
│   │   ├── Slider/            # 物理阻尼滑块
│   │   └── ...                # 其他已校准拟物组件
│   └── styles/
│       ├── tokens.css         # 设计令牌（核心颜色、多重阴影、圆角、时间函数）
│       └── global.css         # 全局基础重置样式与滚动条规范
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

> 先建立秩序，再加入触感；先保证可用，再表达风格。

* **不要硬编码颜色**：始终使用 `var(--s-color-*)`。
* **不要硬编码阴影**：悬浮用 `var(--s-shadow-panel)`，按压用 `var(--s-shadow-pressed)`。
* **物理光源统一**：默认左上角为光源——阴影永远向右下方延伸，凹陷部分的亮边则在右下方。
* **秩序高于装饰**：先通过 $4\text{px}$ 步长和黄金比例搭建严密的比例网格，再去添加微弱的材质细节。
