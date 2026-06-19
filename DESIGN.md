# Tactile UI Design System

## 一套具有物理触感的 AI-Native React 设计系统

> Tactile UI 是一个受 Smartisan OS 设计思想启发的 React 设计系统。
> 它不是对 Smartisan OS 的复刻，也不是简单的拟物风组件库，而是提炼其背后的设计方法：秩序、比例、触感、直觉、克制的工艺感，以及可被 AI Coding Agent 理解和执行的设计规则。

---

# 0. 官方资源校准层

本设计系统后续以 SmartisanTech 开源仓库中的 Android 资源作为校准依据，而不是只依赖公开截图或主观推测。

主要参考源：

* `SmartisanTech/android_frameworks_smartisanos-base`
  * 系统级控件：`MenuDialog`、`SwitchEx`、`Title`、`SettingItem*`。
  * 资源：`core/res/res/values/colors.xml`、`dimens.xml`、`layout/*.xml`、`drawable/*.xml`、`drawable-xxhdpi/*.9.png`。
* `SmartisanTech/packages_apps_OneStep`
  * OneStep 侧栏、拖拽浮层、内容卡片、长按气泡、图标选择器。
  * 资源：`res/values/colors.xml`、`dimens.xml`、`layout/*.xml`、`drawable-xxhdpi/*.png`。
* `SmartisanTech/packages_apps_BigBang`
  * BigBang 文本 chip、选择态、搜索窗口、弹出菜单。
  * 资源：`res/values/colors.xml`、`dimens.xml`、`layout/*.xml`、`drawable-xxhdpi/*.9.png`。
* `SmartisanTech/SmartisanOS-SDK`
  * OneStep 行为 API 与示例。它主要校准交互意图，不作为视觉规范来源。

这些仓库没有发现独立的 Smartisan 视觉设计规范文档；`android_frameworks_base/docs/html-intl/.../design` 中的设计文档是 Android/Material Design 文档镜像，只作为平台交互参考。

因此本系统采用下面的优先级：

1. 官方 Smartisan 资源里的具体控件状态、尺寸、透明度、布局结构。
2. `DESIGN.md` 中的系统原则和 token 语义。
3. 黄金比例和视觉推导值。

也就是说，黄金比例负责建立节奏，但当官方资源给出明确值时，官方值优先。

---

# 1. 核心定位

Tactile UI 追求的是：

**有秩序的物理感界面。**

它不是纯拟物，也不是纯扁平，而是：

> 扁平的信息结构 + 拟物的交互暗示 + 克制的材质表现 + 统一的比例节奏。

界面应该让用户觉得：

* 元素是可以触摸、按压、拖动、展开的；
* 信息层级清晰，不靠装饰堆砌；
* 组件之间有统一的比例、间距、圆角、阴影和动效逻辑；
* 整体气质精致、克制、可靠，有手工打磨感；
* AI 生成页面时，也能稳定遵守同一套视觉规则。

一句话原则：

> 先建立秩序，再加入触感；先保证可用，再表达风格。

---

# 2. 设计哲学

## 2.1 秩序优先于装饰

Smartisan UI 的重要启发不是“拟物”，而是“秩序”。

九宫格桌面、统一图标比例、分割线、材质和光影，本质上都是为了解决一个问题：

> 如何把原本不规则、混乱的信息重新组织成稳定、均匀、有节奏的系统？

因此 Tactile UI 的所有组件都应遵循：

1. 先定义网格；
2. 再定义比例；
3. 再定义层级；
4. 最后定义视觉细节。

禁止为了风格牺牲结构清晰度。

---

## 2.2 向物理世界学习，而不是照搬物理世界

拟物化的价值不是复古，也不是炫技，而是降低理解成本。

现实世界中的按钮、旋钮、卡片、纸张、抽屉、标签、开关，都已经被用户理解。界面可以借用这些隐喻，让用户快速判断：

* 什么可以点击；
* 什么可以拖动；
* 什么是当前状态；
* 什么是被选中；
* 什么是禁用；
* 什么是浮在上层；
* 什么是嵌在下层。

正确方向：

* 借用真实世界的行为逻辑；
* 简化真实世界的视觉细节；
* 让组件拥有可信的物理反馈。

错误方向：

* 过度纹理；
* 过度高光；
* 过度阴影；
* 仿皮革、仿木纹、仿金属堆砌；
* 为了“像真的”牺牲现代界面效率。

---

## 2.3 拟物与扁平不是对立关系

Tactile UI 不做纯拟物，也不做纯扁平。

它采用：

**扁平的信息结构 + 拟物的交互暗示 + 克制的材质表现。**

也就是说：

* 信息排版应保持现代、清晰、轻量；
* 按钮、输入框、卡片、开关等交互元素应有明确触感；
* 组件边界可以有微妙立体感；
* 装饰不能压过内容。

判断标准：

> 用户第一眼看到的是信息，第二眼感受到的是质感。

---

## 2.4 系统气质来自规则一致，而不是单个组件好看

一个按钮好看，不代表设计系统成立。

设计系统的气质来自：

* 相同的圆角逻辑；
* 相同的阴影方向；
* 相同的边框厚度；
* 相同的按压反馈；
* 相同的信息密度；
* 相同的动效节奏；
* 相同的组件命名和调用规则。

Tactile UI 的目标不是做一组漂亮组件，而是让任何页面看起来都属于同一个系统。

---

# 3. 视觉关键词

## 3.1 应该追求的气质

* 精致
* 克制
* 有触感
* 有秩序
* 类物理
* 轻拟物
* 高完成度
* 现代工艺感
* 稳定可靠
* 温和但不软弱

## 3.2 应该避免的气质

* 赛博
* 糖果感过强
* 低幼
* 过度新拟物
* 过度玻璃拟态
* 过度厚重
* 仿古皮革
* 真实木纹 / 金属纹堆砌
* 花哨渐变
* 纯装饰性阴影

---

# 4. Golden Ratio Rhythm System

## 黄金比例节奏系统

黄金比例不是装饰公式，而是一种“比例秩序”。

Tactile UI 不要求所有尺寸都机械等于 `1:1.618`，而是使用黄金比例建立一套稳定的视觉节奏：

* 大与小之间有自然过渡；
* 主与次之间有明确层级；
* 强与弱之间不会突兀；
* 快与慢之间有呼吸感；
* 明与暗之间有可感知但克制的差异。

黄金比例常用值：

```txt
φ = 1.618
1 / φ = 0.618
1 - 0.618 = 0.382
1 / φ² = 0.382
1 / φ³ = 0.236
1 / φ⁴ = 0.146
1 / φ⁵ = 0.090
```

在设计系统里，重点使用这些比例：

```txt
100%
61.8%
38.2%
23.6%
14.6%
9.0%
```

它们可以用于：

* 图形比例；
* 布局分区；
* 字号层级；
* 间距阶梯；
* 圆角比例；
* 阴影扩散；
* 透明度；
* 灰度阶梯；
* 色彩强度；
* 动效时长；
* 动效节奏；
* Stagger 延迟；
* Hover / Press / Focus 反馈强度。

一句话原则：

> 黄金比例不是让界面“看起来像黄金矩形”，而是让整个系统拥有自然、统一、可信的节奏。

Smartisan 官方资源中大量尺寸来自 Android dp/sp 的工程体系，例如 `30dp` 设置项左边距、`48dp` OneStep 侧栏宽度、`13.5sp / 15sp / 18sp / 20sp` 字号、`54dp` BigBang chip 行高。它们不必被强行拉回黄金比例阶梯；应沉淀为 source-calibrated tokens，并让黄金比例只负责补齐没有官方依据的空白。

---

# 5. 布局系统

## 5.1 网格优先

所有页面应基于明确网格构建。

推荐规则：

```txt
基础间距单位：4px

常用间距：
4 / 6 / 10 / 16 / 24 / 40 / 64
```

其中：

```txt
4px   极小间隔，例如图标与文字的微间距
6px   紧凑组件内部间距
10px  小型按钮、标签内部间距
16px  普通组件内边距
24px  卡片内部大间距
40px  页面模块间距
64px  大区块间距
```

设计原则：

> 4px 网格负责工程一致性，黄金比例负责视觉节奏。

---

## 5.2 分区比例

卡片、面板和页面分区可以使用 `61.8% / 38.2%` 组织内容。

横向结构：

```txt
左侧 38.2%：图标 / 状态 / 缩略图
右侧 61.8%：标题 / 描述 / 操作
```

纵向结构：

```txt
上方 61.8%：主要内容
下方 38.2%：辅助信息 / 操作区
```

适用场景：

* Dashboard 卡片；
* 设置项；
* 通知卡片；
* 列表项；
* 产品展示卡；
* 组件文档示例。

示例：

```tsx
<Card>
  <div className="grid grid-cols-[0.382fr_0.618fr] gap-token-4">
    <IconPanel />
    <ContentPanel />
  </div>
</Card>
```

注意：

> 比例必须服务于信息结构，而不是为了套公式而套公式。

---

## 5.3 容器比例

推荐比例：

```txt
1 : 1.618    经典黄金矩形
1 : 1.272    较温和的黄金比例，适合卡片和按钮
1 : 0.618    反向黄金比例，适合侧栏、分栏、图片区
```

其中 `1.272` 可以理解为 `√φ`，比 1.618 更克制，更适合现代 UI。

使用建议：

* 大型 Hero 区块可以接近 `1 : 1.618`；
* 普通卡片可以使用 `1 : 1.272`；
* 图标容器、按钮、输入框更适合使用温和比例；
* 移动端卡片优先服从内容和屏幕宽度，不强求黄金矩形；
* 按钮、输入框、导航栏这类强功能组件，不应为了黄金比例牺牲可用性。

---

# 6. 字号系统

字号不建议直接使用 1.618 倍增长，因为跨度太大，容易导致界面夸张。

Tactile UI 使用两套比例。

## 6.1 正文级字号：温和黄金阶梯

使用 `√φ ≈ 1.272` 作为增长倍率。

原始阶梯：

```txt
12
15
19
24
31
39
```

工程落地修正为：

```txt
12
14
16
20
24
32
40
```

建议 token：

```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-md: 20px;
--text-lg: 24px;
--text-xl: 32px;
--text-2xl: 40px;
```

## 6.2 展示级字号：完整黄金阶梯

用于大标题、封面、官网 Hero、品牌展示页：

```txt
16
26
42
68
```

建议 token：

```css
--display-sm: 26px;
--display-md: 42px;
--display-lg: 68px;
```

使用原则：

* 产品界面优先使用温和阶梯；
* 官网、Hero、品牌展示可以使用完整黄金阶梯；
* 普通业务页面不要频繁使用 42px 以上标题；
* 字号变大时，行高应更紧。

推荐行高：

```txt
12px 字号 → 18px 行高
14px 字号 → 22px 行高
16px 字号 → 26px 行高
20px 字号 → 31px 行高
24px 字号 → 34px 行高
32px 字号 → 42px 行高
40px 字号 → 50px 行高
```

---

# 7. 圆角系统

圆角也应按照黄金比例组织，而不是随意取值。

推荐圆角阶梯：

```txt
4
6
10
16
26
```

建议 token：

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 26px;
```

使用规则：

```txt
4px   小标签、徽标、细小控件
6px   小按钮、小输入框
10px  默认按钮、输入框、菜单
16px  卡片、弹层、面板
26px  大卡片、Hero 容器、柔和容器
```

组件圆角和尺寸要保持比例关系：

```txt
小组件圆角 ≈ 高度的 14.6%
中组件圆角 ≈ 高度的 23.6%
胶囊按钮圆角 = 高度的 50%
```

示例：

```txt
40px 高按钮 → 6px 或 10px 圆角
48px 高按钮 → 10px 圆角
64px 高卡片头部 → 16px 圆角
```

---

# 8. 色彩系统

Tactile UI 的颜色应服务于质感和层级，而不是装饰。

## 8.1 基础色彩方向

推荐基础色板：

```css
--color-cream: #F0EEE5;
--color-ink: #1A1A1A;
--color-muted: #D5D2CA;
--color-accent: #D97757;
--color-blue: #5B8DEF;
--color-green: #6F8A63;
--color-red-deep: #B75C4A;
```

使用方向：

* 背景：温和米白、浅灰、低饱和暖色；
* 文本：接近黑色，但避免纯黑过硬；
* 主色：克制的砖红、橙红或深蓝；
* 辅助色：低饱和绿、蓝、棕；
* 边框：比背景深一档；
* 阴影：低透明度冷灰或暖灰。

避免：

* 大面积高饱和色；
* 荧光色；
* 过度渐变；
* 颜色抢过内容；
* 状态色只靠颜色表达。

Smartisan 官方组件的基础色比上面的概念色板更冷、更中性。系统控件应优先使用官方校准色：

```txt
页面/控件底色：白、近白、浅灰
主文本：#CC000000 语义等价的高不透明黑
次文本：#80000000 语义等价的中不透明黑
标题栏文字：#9A000000 语义等价的标题黑
禁用文字：#4D000000 / #BABABA
选中态：克制蓝色整块或凸点
危险操作：红色实体按钮
```

暖色和砖红仍可用于 Tactile UI 的品牌展示或扩展主题，但 Smartisan OS 风格组件默认应以冷中性灰阶、蓝色选中和红色危险操作为主。

---

## 8.2 色彩强度阶梯

以主色 `#D97757` 为例，可以建立黄金比例色彩强度：

```txt
主色 100%
主色 61.8%
主色 38.2%
主色 23.6%
主色 14.6%
主色 9.0%
```

建议 token：

```css
--accent-solid: #D97757;
--accent-default: var(--accent-solid);

--accent-soft: color-mix(in srgb, var(--accent-solid) 38%, white);
--accent-subtle: color-mix(in srgb, var(--accent-solid) 24%, white);
--accent-tint: color-mix(in srgb, var(--accent-solid) 15%, white);
--accent-wash: color-mix(in srgb, var(--accent-solid) 9%, white);
```

使用规则：

```txt
100%  主按钮、关键状态、品牌锚点
61.8% Hover / Active / 强调图标
38.2% 次级按钮、选中背景、标签
23.6% 轻提示背景、弱状态
14.6% 大面积轻色块
9.0%  背景氛围、悬停底色
```

---

## 8.3 色彩面积控制

颜色面积也可以使用黄金比例约束。

推荐：

```txt
中性色 / 背景色：61.8%
内容色 / 文本色：23.6%
品牌色 / 强调色：14.6%
```

普通产品页面建议：

```txt
背景和容器占 60% 以上；
文本和结构线占 20% 左右；
品牌色和状态色控制在 15% 以内。
```

这能避免界面变得太花。

---

# 9. 灰度与透明度系统

灰度阶梯不应该线性变化。

线性灰度的问题是：

* 中间层级容易糊；
* 主次不够清楚；
* 暗部变化过硬；
* 浅背景上层次不自然。

Tactile UI 使用黄金比例生成透明度和灰度层级。

## 9.1 透明度阶梯

推荐：

```css
--opacity-solid: 1;
--opacity-primary: 0.88;
--opacity-secondary: 0.62;
--opacity-tertiary: 0.382;
--opacity-muted: 0.236;
--opacity-subtle: 0.146;
--opacity-hairline: 0.09;
```

使用规则：

```txt
1.000  实体组件、主按钮
0.880  主文本
0.620  次文本、普通图标
0.382  placeholder、弱图标
0.236  disabled 内容
0.146  弱边框、浅色背景
0.090  hairline、极弱阴影
```

官方 Smartisan 控件里 disabled 并不总是降到很弱。`SwitchEx` 禁用态使用 `MAX_ALPHA * 3 / 4`，即 0.75。对于有物理外壳的控件，disabled 应表达“失去活性但物体仍存在”，默认使用 `0.75`；对于纯文本和辅助说明，仍可使用较低透明度。

示例：

```css
--text-primary: rgba(26, 26, 26, 0.88);
--text-secondary: rgba(26, 26, 26, 0.62);
--text-tertiary: rgba(26, 26, 26, 0.382);
--text-disabled: rgba(26, 26, 26, 0.236);

--border-subtle: rgba(26, 26, 26, 0.146);
--border-hairline: rgba(26, 26, 26, 0.09);
```

---

## 9.2 背景灰度阶梯

推荐浅色背景阶梯：

```css
--surface-base: #F7F4EC;
--surface-raised: #F0EEE5;
--surface-sunken: #E8E3D8;
--surface-muted: #DAD4C8;
--surface-strong: #C8C0B3;
```

语义：

```txt
base      页面底色
raised    卡片 / 按钮默认面
sunken    输入框 / 凹槽 / 分组背景
muted     禁用背景 / 次级面
strong    强边界 / 高对比底面
```

原则：

> 背景灰度不追求纯数学精确，而是以黄金比例控制“层级距离”：越接近内容层，差异越小；越接近结构层，差异越大。

---

# 10. 阴影与光照系统

Tactile UI 的阴影必须遵循统一光源。

默认光源：

> 左上方为光源，右下方为阴影。

规则：

* 所有凸起元素应保持同一光源方向；
* 阴影不能四面均匀扩散；
* 小组件用小阴影；
* 大容器用更柔和的阴影；
* 按压态应减少外阴影，增加内阴影；
* 浮层可以有更明显阴影，但不能漂浮过高。

阴影可以用黄金比例控制：

* 偏移；
* 模糊；
* 透明度；
* 扩散。

原则：

```txt
blur ≈ offset × 1.618 ~ 2.618
alpha 随层级增加，但不能线性暴涨
```

推荐 token：

```css
--shadow-1:
  0 1px 2px rgba(26, 26, 26, 0.09),
  inset 0 1px 0 rgba(255, 255, 255, 0.62);

--shadow-2:
  0 2px 4px rgba(26, 26, 26, 0.09),
  0 1px 2px rgba(26, 26, 26, 0.06),
  inset 0 1px 0 rgba(255, 255, 255, 0.62);

--shadow-3:
  0 4px 10px rgba(26, 26, 26, 0.12),
  0 2px 4px rgba(26, 26, 26, 0.09),
  inset 0 1px 0 rgba(255, 255, 255, 0.62);

--shadow-4:
  0 10px 26px rgba(26, 26, 26, 0.15),
  0 4px 10px rgba(26, 26, 26, 0.09),
  inset 0 1px 0 rgba(255, 255, 255, 0.62);

--shadow-pressed:
  inset 0 2px 4px rgba(26, 26, 26, 0.15),
  inset 0 1px 1px rgba(26, 26, 26, 0.09);
```

使用规则：

```txt
shadow-1  按钮、轻微凸起组件
shadow-2  卡片、工具栏
shadow-3  下拉菜单、Popover
shadow-4  Modal、Drawer、浮层
pressed   按钮按压、开关按压、可点击卡片按压
```

关键原则：

> 默认态向外凸起，按压态向内凹陷。

---

# 11. 动效系统

动效用于表达物理反馈，不用于炫技。

推荐特征：

* 短；
* 干净；
* 有方向；
* 有因果关系；
* 不拖泥带水。

## 11.1 动效时长

推荐基础时长：

```txt
60ms
100ms
160ms
260ms
420ms
```

它们近似符合黄金比例递增。

建议 token：

```css
--duration-instant: 60ms;
--duration-fast: 100ms;
--duration-normal: 160ms;
--duration-slow: 260ms;
--duration-slower: 420ms;
```

使用规则：

```txt
60ms    按压反馈、极短状态变化
100ms   Active / Release
160ms   Hover / Focus / 小型切换
260ms   Dropdown / Popover / Tab transition
420ms   Modal / Drawer / 页面级过渡
```

不要超过 420ms，除非是品牌展示动画。

---

## 11.2 动效内部节奏

一个动效内部也可以使用 `38.2% / 61.8%` 分配。

按钮按压：

```txt
前 38.2% 时间：快速下沉
后 61.8% 时间：柔和回弹稳定
```

Modal 出现：

```txt
前 61.8% 时间：完成主要位移和透明度变化
后 38.2% 时间：完成细微缩放和阴影稳定
```

这会让动效感觉更自然：

* 不是匀速；
* 不是机械线性；
* 有物理感；
* 但不夸张。

---

## 11.3 动效位移与缩放

推荐位移：

```txt
1px
2px
4px
6px
10px
16px
```

使用规则：

```txt
1px   按钮 active 下沉
2px   卡片 hover 轻微上浮
4px   小型菜单出现
6px   Popover 出现
10px  Drawer / Toast 出现
16px  页面模块进入
```

推荐缩放：

```txt
0.985  按压态
0.990  轻按压态
1.000  默认态
1.006  Hover 微放大
1.016  强调 Hover
```

原则：

> Tactile UI 的动效应该像精密机械，而不是弹簧玩具。

---

## 11.4 Stagger 延迟

多个元素依次出现时，可以用黄金比例控制延迟。

推荐 stagger：

```txt
16ms
26ms
42ms
68ms
```

使用规则：

```txt
16ms  密集列表
26ms  卡片组
42ms  页面模块
68ms  品牌展示或 onboarding
```

普通产品界面建议不超过 42ms。

---

# 12. Focus Ring 与状态反馈

Focus ring 不应随便写一个蓝色边框。

它也应该有比例。

推荐 token：

```css
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
--focus-ring-alpha: 0.382;
--focus-ring-soft-alpha: 0.146;
```

示例：

```css
.tactile-focus {
  outline: 2px solid color-mix(in srgb, var(--accent-solid) 38%, transparent);
  outline-offset: 2px;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent-solid) 15%, transparent);
}
```

逻辑：

```txt
38.2% 用于清晰边界；
14.6% 用于柔和外扩；
2px 保证可访问性；
6px 提供触感和呼吸感。
```

推荐状态强度：

```txt
hover      14.6% 变化
active     23.6% 变化
focus      38.2% 强调
disabled   38.2% 可见度
```

示例：

```css
.button:hover {
  background: color-mix(in srgb, var(--button-bg) 86%, white 14%);
}

.button:active {
  transform: translateY(1px) scale(0.985);
  box-shadow: var(--shadow-pressed);
}

.button:focus-visible {
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--accent-solid) 38%, transparent),
    0 0 0 6px color-mix(in srgb, var(--accent-solid) 15%, transparent);
}

.button:disabled {
  opacity: 0.382;
}
```

---

# 13. 组件设计原则

## 13.1 Button 按钮

按钮必须看起来“可以按”。

按钮是 Tactile UI 最核心的触感组件。

按钮状态至少包含：

* default：轻微凸起；
* hover：亮度或阴影略增强；
* active：向下按压，阴影收缩；
* focus：清晰但克制的焦点环；
* disabled：失去立体感和对比度；
* loading：保持按钮尺寸稳定，不跳动。

按钮设计规则：

* 主按钮应有明确视觉重量；
* 次按钮可以更平，但仍应有边界；
* 危险按钮不能只靠颜色区分，应结合图标或文案；
* 图标按钮必须有可点击区域，不应只显示裸图标；
* 按压态必须通过位移、阴影、内阴影或背景变化体现。

推荐触感：

```txt
默认态：外阴影 + 顶部微高光
Hover：背景亮度轻微变化，约 14.6%
Active：translateY(1px) + scale(0.985) + 内阴影
Disabled：opacity 0.382，去除明显投影
```

官方校准：

* Dialog 主按钮是横向长条 9-patch，默认态为微凸渐变，按压态颜色变深并减少浮起感。
* 危险操作使用红色实体按钮；普通确认可以使用灰色实体按钮；平台级积极操作可使用蓝色实体按钮。
* Disabled 对实体按钮不应完全消失，优先降低对比和取消强阴影。

---

## 13.2 Card 卡片

卡片不是单纯的白色容器，而是信息承载面。

卡片应像一张被放在界面上的“板”：

* 有边界；
* 有层级；
* 有轻微厚度；
* 内容分区清晰；
* 不喧宾夺主。

卡片规则：

* 卡片之间必须有足够间距；
* 卡片内部不要塞入过多不相关信息；
* 卡片阴影应轻，不应漂浮过高；
* 可点击卡片需要 hover 和 active 状态；
* 不可点击卡片不要做得像按钮。

---

## 13.3 Input 输入框

输入框应像一个可以写入的凹槽。

输入框规则：

* 默认态应有轻微内凹感；
* focus 态必须明显；
* error 态必须同时通过颜色、文字和图标表达；
* placeholder 不能像真实输入内容一样醒目；
* 输入框高度应和按钮体系一致；
* label、helper text、error text 的层级要稳定。

推荐状态：

```txt
default   浅背景 + 内阴影或细边框
focus     边框增强 + 轻微外发光
error     错误色边框 + 错误说明
disabled  低对比度 + 禁止输入反馈
```

---

## 13.4 Switch / Toggle 开关

开关应表达“机械切换”的感觉。

规则：

* 轨道和圆点必须有明确层级；
* 开启和关闭不能只靠颜色区分；
* 圆点移动应有短促、干净的动效；
* active 时可以加入轻微按压；
* 大小要适合手指点击，不能过小。

推荐动效：

```txt
切换时间：160ms
圆点位移：完整距离
按压缩放：0.985
开启强调：主色 38.2% 或 61.8%
```

官方校准：

* `SwitchEx` 是由底图、mask、frame、thumb 四层合成的物理开关。
* 滑块按 60fps 推进，速度约 `350dp/s`，拖拽和点击都可触发切换。
* 禁用态 alpha 为 0.75。
* Web 组件不需要照搬 Java 位图合成，但必须保留：可拖拽/可点击、短促位移、凸起圆形滑块、轨道凹槽、禁用仍可辨识。

---

## 13.5 TitleBar 标题栏

标题栏是 Smartisan 系统页面的顶部骨架，不等同于站点级导航 `Header`。

官方校准来源：

* `title_layout.xml`
* `title_bar_title_text_size = 20sp`
* `title_bar_btn_text_size = 13.5sp`
* `title_back_btn_max_width = 101.7dp`
* `title_text_color = #9a000000`

结构规则：

* 标题居中，单行省略，优先保证页面身份稳定。
* 左侧为返回按钮，右侧为确认/完成按钮或占位区。
* 左右按钮最大宽度约 `101.7dp`，避免挤压中间标题。
* 按钮字号为 `13.5sp`，标题字号为 `20sp`。
* 返回按钮是普通标题按钮；确认按钮可使用高亮实体按钮。
* 标题栏不应承担站点导航、分段导航或大量操作入口。

状态规则：

* 右侧确认按钮可以隐藏、禁用或显示高亮态。
* 禁用态仍保持实体轮廓，使用官方实体控件透明度 `0.75`。
* 按压态通过轻微位移和内阴影表达，不使用夸张缩放。

Web 组件命名建议：

```tsx
<TitleBar title="声音与触感" backLabel="返回" confirmLabel="完成" />
```

---

## 13.6 SettingItem 设置项

设置项是 Smartisan 系统里最典型的信息组织组件，不应被普通列表项完全替代。

官方校准来源：

* `setting_item_text_layout.xml`
* `setting_item_switch_layout.xml`
* `setting_item_check_layout.xml`
* `item_text_layout.xml`

结构规则：

* 左侧主内容从 `30dp` 起始，形成稳定的设置页读线。
* 标题字号为 `18sp`，摘要和右侧副标题为 `13.5sp`。
* 标题默认最大宽度约 `220dp`；当右侧有副标题/值时，标题宽度收敛到约 `175dp`。
* 图标槽为 `24dp`，图标与文字之间保留 `12dp`。
* 右侧箭头或控件与边缘保持约 `12dp ~ 18dp` 的节奏。
* 摘要是标题的从属信息，不能比标题更醒目。

状态规则：

* `text` 型：左标题/摘要 + 右侧值 + 箭头，适合进入二级页面。
* `switch` 型：右侧放 `SwitchEx` 对应的机械开关，禁用态仍使用实体透明度 `0.75`。
* `check` 型：右侧勾选标识只表达当前选择，不应额外制造按钮感。
* 选中或按下态可使用系统蓝色块状高亮，文字切换为反白。
* 纯展示型设置项不要出现强按钮阴影，重点是行分隔、读线和状态清晰。

Web 组件命名建议：

```tsx
<SettingItem title="无线局域网" value="已开启" accessory="chevron" />
<SettingItem title="OneStep 侧栏" accessory="switch" checked />
<SettingItem title="经典提示音" accessory="check" selected />
```

---

## 13.7 Modal / Drawer 弹层

弹层代表更高层级，必须清楚地“浮”在页面上。

规则：

* 背景遮罩要克制；
* 弹层阴影可以比卡片更明显；
* 关闭按钮必须容易找到；
* 主要操作和取消操作必须分清；
* 不要在弹层中继续套过多弹层；
* 弹层内容应短而明确。

推荐：

```txt
Modal 出现：260ms ~ 420ms
背景遮罩：rgba(26,26,26,0.236) 左右
弹层阴影：shadow-4
位移：6px ~ 10px
缩放：0.985 → 1
```

官方校准：

* `MenuDialog` 是底部浮层，不是居中 Modal：窗口贴底、全宽、内容自适应高度。
* 官方遮罩为 `backgroundDimAmount=0.6`，比当前文档推荐的 0.236 更强。涉及破坏性操作、系统级菜单、沉浸式任务切换时，可以使用 `0.6`。
* 标题栏、取消按钮、列表区域和主操作按钮是分层结构。危险主按钮默认红色；普通主按钮可切换灰色。
* 因此组件库需要同时提供居中 `Dialog` 和底部 `ActionSheet/MenuDialog` 两种弹层。

---

## 13.8 ProgressDialog 进度弹层

`ProgressDialog` 是系统级“处理中”反馈，不等同于页面内条形 `Progress`。

官方校准来源：

* `smartisan_progress_dialog.xml`
* `progress_medium_smartisanos_light.xml`
* `smartisan_progress_dialog_bg.9.png`

结构规则：

* 弹层内容宽度为 `246dp`，居中显示。
* 标题可选，字号为 `18sp`，单行省略。
* Spinner 位于中间，官方资源为 `48dp` 旋转图形。
* 消息可选，字号为 `13sp`，左右内边距 `30dp`，单行省略。
* 标题和消息使用接近 `#9c000000` 的深色半透明文本。
* 不提供确认/取消按钮；需要用户决策时应使用 `Dialog` 或 `ActionSheet`。

状态规则：

* 打开时锁定背景滚动。
* 用 `aria-busy` / `role="dialog"` 表示当前区域正在处理。
* 只用于短时等待、同步、加载、保存中等不可交互状态。
* 不应在后台任务已完成后继续停留，也不应用作成功提示。

Web 组件命名建议：

```tsx
<ProgressDialog isOpen title="正在同步" message="请稍候，正在处理系统设置" />
```

---

## 13.9 DragBubble / FloatText 拖拽气泡

OneStep 的拖拽反馈不是普通 Tooltip，而是贴合侧栏和拖拽对象的短时浮层。

官方校准来源：

* `packages_apps_OneStep/res/layout/float_text_layout.xml`
* `packages_apps_OneStep/res/layout/drag_view.xml`
* `packages_apps_OneStep/src/.../FloatText.java`
* `float_text_bg.9.png`
* `long_press_bubble.9.png`

结构规则：

* `float` 型用于侧栏旁文字提示：白字、`13dp`、单行省略、最大宽 `180dp`。
* `preview` 型用于长按拖拽预览：上方文字气泡最大宽 `159dp`，下方图标为 `48dp`。
* 气泡背景来自深色 9-patch，Web 中应使用深色半透明实体面、内高光和轻投影表达。
* `FloatText` 与 OneStep 侧栏保持 `12dp` 间距，左/右侧栏模式下分别出现在目标控件外侧。
* 只承载短文本，不承载按钮、菜单或长说明。

状态规则：

* 出现/隐藏应短促，不打断页面布局。
* 文本必须单行省略，不能撑开拖拽热区。
* 预览型可以带图标或缩略图，但视觉重心仍是拖拽对象而不是装饰。

Web 组件命名建议：

```tsx
<DragBubble>拖到侧栏发送</DragBubble>
<DragBubble variant="preview">Smartisan UI 官方校准</DragBubble>
```

---

## 13.10 OneStepItem / OneStepPanel 内容列表

OneStep 内容面板不是普通白底列表，而是贴在侧栏旁的深色半透明任务面板。

官方校准来源：

* `packages_apps_OneStep/res/layout/content_title.xml`
* `packages_apps_OneStep/res/layout/copy_history_item.xml`
* `packages_apps_OneStep/res/layout/recent_file_item.xml`
* `packages_apps_OneStep/res/layout/bookmark_item.xml`
* `packages_apps_OneStep/src/.../ListItemFrameLayout.java`
* `content_view_background_color = #40000000`
* `content_view_title_color = #b3ffffff`
* `content_view_interval_more_color = #3fffffff`

结构规则：

* 内容标题栏高度为 `40dp`，背景约 `#5a000000`，标题左边距 `15dp`，字号 `13.5dp`。
* 日期/时间分隔条高度为 `24dp`，左边距 `15dp`，字号 `10dp`。
* 剪贴板和最近文件条目高度为 `51dp`；书签条目高度为 `45dp`。
* 剪贴板文本字号为 `13.5dp`、颜色 `#ccffffff`，右侧复制图标为 `12dp`，左右间距来自 `13dp`。
* 最近文件图标为 `26dp`，文件名左侧留 `9dp`。
* 书签标题字号为 `12dp`，URL 字号为 `9dp`、颜色 `#4cffffff`。
* “加载更多”使用 `12dp` 文本和 `#3fffffff`，视觉上比真实内容更弱。

状态规则：

* `ListItemFrameLayout` 使用系统 list selector；Web 中应表现为深色半透明条目上的短促按压亮面。
* OneStep 内容列表只承载可拖拽/可发送的临时内容，不应混用设置页 `SettingItem` 或普通白底 `ListItem`。
* 面板整体应保持深色、紧凑、横向读线稳定，避免变成普通卡片列表。

Web 组件命名建议：

```tsx
<OneStepPanel title="剪贴板">
  <OneStepItem date="今天" title="复制的文本" variant="text" />
  <OneStepItem title="layout.pdf" variant="file" />
  <OneStepItem title="SmartisanTech" subtitle="github.com/SmartisanTech" variant="bookmark" />
</OneStepPanel>
```

---

## 13.11 BigBangOptionPopup 搜索选项弹窗

BigBang 的搜索选项弹窗不是通用 Select，而是文本爆炸后贴近底部工具区的轻量 `PopupWindow`。

官方校准来源：

* `packages_apps_BigBang/res/layout/search_option_popup.xml`
* `packages_apps_BigBang/res/layout/search_option_listitem.xml`
* `packages_apps_BigBang/src/com/smartisanos/textboom/OptionPopupWindow.java`
* `popup_vertical_offset = 74dp`
* `popup_arrow_horrizontal_offset = 44dp`

结构规则：

* 列表宽度为 `271dp`，每行高度为 `45dp`。
* 行文本字号为 `15sp`，颜色接近 `#9a000000`，单行省略，最大宽度为 `122dp`。
* 行间分隔线为 `2px`，颜色来自官方 `#14000000`。
* 左侧是搜索/翻译来源图标，右侧是选中勾，勾选图标距离右边约 `7dp`。
* 弹层底部带居中箭头；在多入口场景下，箭头横向位移以 `44dp` 为步进。
* 官方窗口 `focusable=false`、`outsideTouchable=true`、`clippingEnabled=false`，因此它应轻量出现，不阻断当前文本任务。

状态规则：

* 当前项显示右侧勾选标识。
* 点击不同项时，先切换勾选态，再通知外层并关闭弹层。
* 点击当前项时不重复触发选择，但仍关闭弹层。
* 它不应替代普通设置页里的 `Select`；仅用于 BigBang 搜索、翻译、词典等即时动作来源切换。

Web 组件命名建议：

```tsx
<BigBangOptionPopup options={options} selectedIndex={0} />
```

---

## 13.12 BigBangSearchPanel 搜索窗口

BigBang 搜索窗口是文本爆炸后的迷你浏览器容器，不是普通卡片或普通 Modal。

官方校准来源：

* `packages_apps_BigBang/res/layout/boom_search_activity.xml`
* `packages_apps_BigBang/src/com/smartisanos/textboom/BoomSearchActivity.java`
* `android_frameworks_smartisanos-base/core/res/res/layout/search_activity.xml`
* `search_popup_width = 350dp`
* `search_popup_height = 504dp`（BigBang 覆盖系统通用搜索窗口的 `538dp`）
* `search_webview_vertical_margin = 45dp`
* `search_title.maxWidth = 178dp`
* `search_progress = 22dp`

结构规则：

* 外层窗口宽 `350dp`、高 `504dp`，有独立阴影和圆角，不应被普通 `Card` 样式吞掉。
* WebView 内容区上下各让出 `45dp`，由顶部 titlebar 和底部 bottombar 覆盖。
* 顶部标题居中，字号 `15sp`，单行省略，最大宽度 `178dp`。
* 右上角是“打开浏览器”按钮，不是关闭按钮；设置入口位于右下角。
* 底部左侧是返回按钮；中间是三个搜索来源入口：网页、词典、百科。
* loading spinner 为 `22dp`，根据当前入口横向移动：网页 `-44dp`、词典 `0`、百科 `+44dp`。

行为规则：

* 点击网页/词典/百科会切换当前搜索类型并重新执行搜索。
* 长按某个搜索入口才打开对应的 `BigBangOptionPopup`，用于切换具体引擎或词典来源。
* 点击外部区域会关闭窗口；Web 组件可由外层弹层或页面容器处理 dismiss。
* 它承载临时查询结果，不应承担完整浏览器导航、设置页或长期阅读页面的职责。

Web 组件命名建议：

```tsx
<BigBangSearchPanel title="Smartisan UI" activeMode="dict" loading />
```

---

## 13.13 Icon 图标

图标要统一，不要只追求单个好看。

规则：

* 使用统一线宽；
* 使用统一圆角；
* 使用统一视角；
* 使用统一光影逻辑；
* 不同图标的视觉重量要一致；
* 不规则图形应通过视觉补偿保持平衡。

如果图标放入固定容器，应注意：

* 图标不要撑满；
* 保留呼吸空间；
* 不同形状图标需要视觉居中，而不是数学居中；
* 复杂图标应适当简化。

---

# 14. 文案原则

Tactile UI 的文案应像系统提示，不像营销广告。

原则：

* 简短；
* 明确；
* 有帮助；
* 不装可爱；
* 不过度解释；
* 不制造压力。

按钮文案：

* 使用动词；
* 避免含糊；
* 避免“好的”“确定”泛滥；
* 危险操作要写清后果。

示例：

```txt
好：删除文件
差：确定

好：保存更改
差：马上体验

好：恢复默认设置
差：一键焕新
```

---

# 15. AI Agent 生成规则

Tactile UI 是 AI-Native 设计系统，因此必须让 AI Coding Agent 能读懂、调用并遵守规则。

## 15.1 优先使用设计系统组件

禁止优先手写原生按钮、输入框、弹窗。

正确：

```tsx
<Button variant="primary">保存更改</Button>

<Card>
  <CardHeader title="账户设置" />
</Card>
```

错误：

```tsx
<button className="bg-red-500 shadow-xl rounded-lg">
  保存
</button>
```

---

## 15.2 优先使用 token

禁止随意写死颜色、阴影、圆角和间距。

正确：

```tsx
<Card className="p-token-4 rounded-token-lg shadow-token-2" />
```

错误：

```tsx
<div className="p-[19px] rounded-[13px] shadow-[0_7px_21px_rgba(0,0,0,.18)]" />
```

如果确实需要新数值，应优先从黄金比例阶梯中选择：

```txt
4 / 6 / 10 / 16 / 24 / 40 / 64
```

---

## 15.3 不要机械套用 1.618

错误：

```tsx
<div style={{ width: 618, height: 382 }} />
```

如果没有内容逻辑，只是为了比例而比例，这是无意义的。

正确：

```tsx
<Card className="grid grid-cols-[0.382fr_0.618fr] gap-token-4">
  <StatusIcon />
  <CardContent />
</Card>
```

比例必须服务于信息结构。

---

## 15.4 组件必须包含状态

任何交互组件至少需要考虑：

* default；
* hover；
* active；
* focus；
* disabled；
* loading 或 error，视组件类型而定。

不允许只生成静态好看的组件。

---

## 15.5 动效必须使用系统时长

错误：

```css
transition: all 300ms ease;
```

正确：

```css
transition:
  transform var(--duration-normal) var(--ease-tactile),
  box-shadow var(--duration-normal) var(--ease-tactile),
  background var(--duration-fast) var(--ease-tactile);
```

---

## 15.6 不允许过度拟物

AI Agent 生成界面时，应避免：

* 皮革纹理；
* 真实木纹；
* 过重金属质感；
* 过度玻璃反射；
* 复杂背景纹理；
* 大量高光；
* 强烈 3D 透视。

Tactile UI 的触感应来自微妙的边框、阴影、层级和反馈，而不是贴图式装饰。

---

## 15.7 页面必须有信息层级

每个页面至少应区分：

* 页面标题；
* 主要内容；
* 次要说明；
* 操作区域；
* 状态反馈。

不要只生成一组卡片或按钮堆叠。

---

# 16. Token 总表

```css
:root {
  /* Ratio */
  --ratio-phi: 1.618;
  --ratio-inverse: 0.618;
  --ratio-minor: 0.382;
  --ratio-subtle: 0.236;
  --ratio-faint: 0.146;
  --ratio-hairline: 0.09;

  /* Space */
  --space-1: 4px;
  --space-2: 6px;
  --space-3: 10px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 40px;
  --space-7: 64px;

  /* Radius */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 26px;

  /* Typography */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-md: 20px;
  --text-lg: 24px;
  --text-xl: 32px;
  --text-2xl: 40px;

  --display-sm: 26px;
  --display-md: 42px;
  --display-lg: 68px;

  /* Duration */
  --duration-instant: 60ms;
  --duration-fast: 100ms;
  --duration-normal: 160ms;
  --duration-slow: 260ms;
  --duration-slower: 420ms;

  /* Opacity */
  --opacity-solid: 1;
  --opacity-primary: 0.88;
  --opacity-secondary: 0.62;
  --opacity-tertiary: 0.382;
  --opacity-muted: 0.236;
  --opacity-subtle: 0.146;
  --opacity-hairline: 0.09;

  /* Color */
  --color-cream: #F0EEE5;
  --color-ink: #1A1A1A;
  --color-muted: #D5D2CA;
  --color-accent: #D97757;
  --color-blue: #5B8DEF;
  --color-green: #6F8A63;
  --color-red-deep: #B75C4A;

  /* Text */
  --text-primary: rgba(26, 26, 26, 0.88);
  --text-secondary: rgba(26, 26, 26, 0.62);
  --text-tertiary: rgba(26, 26, 26, 0.382);
  --text-disabled: rgba(26, 26, 26, 0.236);

  /* Surface */
  --surface-base: #F7F4EC;
  --surface-raised: #F0EEE5;
  --surface-sunken: #E8E3D8;
  --surface-muted: #DAD4C8;
  --surface-strong: #C8C0B3;

  /* Border */
  --border-subtle: rgba(26, 26, 26, 0.146);
  --border-hairline: rgba(26, 26, 26, 0.09);

  /* Focus */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-alpha: 0.382;
  --focus-ring-soft-alpha: 0.146;
}
```

---

# 17. Do / Don’t

## Do

* 使用统一间距；
* 使用统一圆角；
* 使用统一光源；
* 使用黄金比例控制节奏；
* 让按钮看起来能按；
* 让输入框看起来能写；
* 让卡片看起来承载信息；
* 让弹层看起来处于上层；
* 用轻微材质增强触感；
* 用清晰排版保证效率；
* 用细节形成系统气质。

## Don’t

* 不要为了拟物而拟物；
* 不要机械套用黄金矩形；
* 不要堆叠阴影；
* 不要到处加渐变；
* 不要滥用玻璃效果；
* 不要让装饰压过内容；
* 不要每个组件都像按钮；
* 不要让不同组件使用不同光源；
* 不要随意写死 token 外的数值；
* 不要让 AI 生成一次性风格代码；
* 不要把 Smartisan 风格误解成复古皮革风。

---

# 18. 组件验收清单

每个组件进入设计系统前，需要检查：

* 是否符合统一网格？
* 是否使用设计 token？
* 是否有完整状态？
* 是否符合统一光源？
* 是否有明确可用性？
* 是否有触感但不过度？
* 是否符合黄金比例节奏系统？
* 是否适配深浅色背景？
* 是否支持键盘焦点？
* 是否支持无障碍语义？
* 是否在不同尺寸下仍然稳定？
* 是否能被 AI Agent 正确调用？
* 是否有清晰示例和反例？

---

# 19. 最终判断标准

当我们不确定一个设计是否符合 Tactile UI 时，用下面这句话判断：

> 它是否在清晰可用的基础上，提供了克制、统一、可信的物理触感？

黄金比例在 Tactile UI 中的价值，不是让用户发现“这里用了 1.618”。

真正的目标是：

* 用户觉得界面有秩序；
* 层级自然；
* 间距舒服；
* 动效不突兀；
* 色彩不刺眼；
* 灰度不混乱；
* 组件像经过同一套规则打磨出来。

如果一个组件只是长宽比接近 1.618，但间距、动效、灰度、状态、阴影都混乱，它不符合 Tactile UI。

如果一个组件没有明显黄金矩形，但它的空间、层级、状态和反馈都遵循自然比例，它才真正符合 Tactile UI。

---

# 20. 一句话总结

Tactile UI 的目标不是复刻 Smartisan OS，而是继承它的核心精神：

> 用秩序建立系统，用触感表达交互，用比例形成节奏，用细节沉淀气质。
