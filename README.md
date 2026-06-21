# Tactile UI

### 让屏幕重新拥有手感

有一些东西正在从屏幕上消失。不是功能——功能从未如此丰富。消失的，是那种你触碰一个按钮时，指尖下方微微凹陷的确信感；是你拨动一个开关时，齿轮咬合传来的、不可伪造的物理承诺。

Tactile UI 是一个受 Smartisan OS 设计思想启发的 React 设计系统。它不是对 Smartisan OS 的复刻，也不是旧日拟物风格的回光返照——而是将物理世界里真正有价值的东西，重新翻译成屏幕能够讲述的语言。**翻译，而不是复刻。**

> 当光从左上方落下，按钮的右侧应该出现一道薄薄的阴影——这不是装饰，这是你大脑在毫秒之内读取"这个东西可以按下去"的方式。

---

## ✨ 核心特色

1. **精致拟物主义 — 光影即语法**
   拒绝大面积刺眼的渐变和花哨的材质贴图。完全依靠多重阴影层叠加（环境阴影 + 落体阴影 + 内部边缘高光），让每一个组件拥有像素级精细的物理凹凸质感。凸起的按钮在按下时向内凹陷，开关在滑动时凹槽里的阴影会呼吸——这些微小的变化构成了一套无声的交互语法。

2. **黄金比例节奏 — 自然的韵脚**
   使用黄金分割常数 $\phi \approx 1.618$ 及其衍生步长，为间距、字号、圆角、阴影扩散、动效时长建立统一的视觉节奏。不是为了制造数学优越感，而是因为当所有组件共享同一个内在比例时，整个界面会产生一种无法被指认、却能被感知的和谐——就像一座好的建筑，你不会去数它的柱间距，但你会觉得走在里面很舒服。

3. **官方资源精确校准 — 不靠猜测**
   从 SmartisanTech 开源项目中提取真实的布局、透明度及工程尺寸。`13.5sp` 的按钮字号、`48dp` 的侧栏宽度、设置项的工程间距——每一个数字都有出处，每一次还原都经得起像素级对照。

4. **物理反馈音效 — 那一声「咔」**
   基于浏览器原生 `AudioContext` 实时合成清脆的机械开关与物理点击音效。不需要下载音频文件，只需要一段精心调制的波形——因为手指的记忆比眼睛的审美更长久，你可能忘记某个界面的配色方案，但你会记得那个开关拨过去时恰到好处的声音。

5. **令牌化架构 — 秩序的代价与回报**
   颜色、阴影、间距、圆角、时长、缓动曲线——全部收敛在一份 `tokens.css` 中，不允许硬编码，不允许例外。这不是洁癖，这是让 AI 编码助手也能精准生成属于这个系统的界面的唯一方法。当机器能够理解规则，人类就能专注于感受。

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
