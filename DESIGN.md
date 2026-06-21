# Tactile UI Design System

## 一套具有物理触感的 AI-Native React 设计系统

> *收音机的调频旋钮转过整个黄昏，每一度刻度都对应一个远方的声音。打字机的金属臂击落，在纸面上留下不可撤销的凹痕。那些器物不需要说明书来解释自己——它们的形状就是它们的语言，它们的重量就是它们的承诺。*
>
> *Tactile UI 不是要回到过去。它是要把物理世界里那些真正有价值的东西——光线、重量、深度、反馈——重新翻译成屏幕能够讲述的语言。*

> Tactile UI 是一个受 Smartisan OS 设计思想启发的 React 设计系统。
> 它不是对 Smartisan OS 的复刻，也不是简单的拟物风组件库，而是提炼其背后的设计方法：秩序、比例、触感、直觉、克制的工艺感，以及可被 AI Coding Agent 理解和执行的设计规则。

---

# 0. 官方资源校准层

本设计系统后续以 SmartisanTech 开源仓库中的 Android 资源作为校准依据，而不是只依赖公开截图或主观推测。

主要参考源：

* `SmartisanTech/android_frameworks_smartisanos-base`
  * 系统级控件：`MenuDialog`、`SwitchEx`、`Title`、`SettingItem*`。
  * 资源：`core/res/res/values/colors.xml`、`dimens.xml`、`layout/*.xml`、`drawable/*.xml`、`drawable-xxhdpi/*.9.png`。

这些仓库没有发现独立的 Smartisan 视觉设计规范文档；`android_frameworks_base/docs/html-intl/.../design` 中的设计文档是 Android/Material Design 文档镜像，只作为平台交互参考。

因此本系统采用下面的优先级：

1. 官方 Smartisan 资源里的具体控件状态、尺寸、透明度、布局结构。
2. `DESIGN.md` 中的系统原则和 token 语义。
3. 黄金比例和视觉推导值。

也就是说，黄金比例负责建立节奏，但当官方资源给出明确值时，官方值优先。

---

# 1. 核心定位

> *一个圆角恰到好处的卡片，边缘带着一圈几乎察觉不到的高光。一个滑块的阻尼，在拇指滑过的速度里暗含着「到位」的暗示。一组按钮，它们的间距不是随意的数字，而是一个自然的呼吸节奏。这些微小的信号构成了一套无声的语法——用户不会注意到它们的存在，但会在它们缺席时感到不安。*

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

> *好的设计系统不是一组漂亮组件的集合。它是一种气候——当你走进去，空气的温度、光线的角度、声音的回响，都在告诉你：你在同一个世界里。*

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

> *φ = 1.618。这个数字不是我们选择的，是向日葵的种子排列选择的，是鹦鹉螺的螺旋选择的，是人类在千年建筑史中反复验证的「看起来刚好对了」的那个比例。*

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

Smartisan 官方资源中大量尺寸来自 Android dp/sp 的工程体系，例如 `30dp` 设置项左边距、`13.5sp / 15sp / 18sp / 20sp` 字号。它们不必被强行拉回黄金比例阶梯；应沉淀为 source-calibrated tokens，并让黄金比例只负责补齐没有官方依据的空白。

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

* 可用官方资源包括 `title_btn*.9.png`、`title_red_btn*.9.png`、`menu_dialog_button_*`、`blue_long_button.9.png`、`delete_button.9.png`、`search_btn.9.png`。
* Dialog/MenuDialog 主按钮是横向长条 9-patch，默认态为微凸渐变，按压态颜色变深并减少浮起感。
* `menu_dialog_button_gray_normal.9.png` / `menu_dialog_button_red_normal.9.png` 在 xxhdpi 下为 `902 × 178px`，适合全宽底部菜单动作按钮，不适合直接作为小按钮宽度。
* `title_btn*.9.png` 在 xxhdpi 下为 `200 × 146px`，适合标题栏/小型实体按钮的高度和质感参考。
* `blue_long_button.9.png` 和 `delete_button.9.png` 证明蓝色积极操作、红色危险操作都有官方实体按钮资源。
* 危险操作使用红色实体按钮；普通确认可以使用灰色实体按钮；平台级积极操作可使用蓝色实体按钮。
* Disabled 对实体按钮不应完全消失，优先降低对比和取消强阴影。

---

## 13.2 Card 卡片

卡片不是单纯的白色容器，而是信息承载面。

官方校准状态：

* 当前 SmartisanOS base 仓库未发现独立通用 `Card` 组件或卡片布局规范。
* 可参考的官方材料是列表/设置项的白色承载面，以及 `MenuDialog` / `ProgressDialog` 的 9-patch 面板。
* Web `Card` 属于设计系统推导容器，用于 demo、表单分组、面板承载；不应声明为 SmartisanOS 官方原生组件。
* Card 不能替代官方设置页的 `List` / `SettingItem` 结构；设置页优先使用行分组，Card 只做 Web 页面布局容器。

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

官方校准状态：

* 当前 SmartisanOS base 仓库未发现独立的通用文本输入框 9-patch 或 `EditText` 样式资源；普通 `Input` 仍属于本设计系统基于“凹槽输入”原则的推导实现。
* base 中明确存在的是 `search_activity.xml`、`search_bg.9.png`、`search_topbar.9.png`、`search_bottombar.9.png`、`search_btn.9.png` 等系统搜索窗口资源。它们定义的是搜索浮窗，不应直接替代普通表单输入框。
* 普通 `Input` 当前只沉淀稳定结构 token：高度约 `44px`、左右内距 `16px`、密码可见性操作区 `40px`。这些值不声明为官方 SmartisanOS 数值，只作为 Web 表单与按钮体系的内部一致性规则。
* 如果后续发现官方通用输入框资源，应优先替换当前推导 token，而不是继续叠加新的视觉特例。

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

官方校准与数据洞察：

* `SwitchEx` 是由底图（`switch_ex_bottom`）、`mask`、`frame` 和 `thumb`（`switch_ex_unpressed`）四层合成的物理开关。
* **资源层级与运行机理**：
  - 静态背景层：`switch_ex_mask` 与 `switch_ex_frame`（xxhdpi 资源为 `224 × 144px`，折合 `74.67 × 48dp`）保持静止，定义了凹槽轨道的外观。槽的实际非透明内容区域为 `188 × 74px`（折合 `62.67 × 24.67dp`），在 `48dp` 外盒中垂直居中（`top: 11.67dp`）。
  - 动态平移层：`sBottom`（底图）与 `sCurBtnPic`（旋钮板）为宽度一致的 `338 × 144px`（折合 `112.67 × 48dp`）图块。它们被绑定在一起，在开启和关闭状态间同步进行位移，平移范围为 `-114px` 至 `0px`（折合 `38dp` 行程）。
  - **凹槽去色设计**：底板 `sBottom` 表面采用平整的淡灰色（约 `#fcfcfc`），未做弧度光影渐变，且开启状态下凹槽内部不使用蓝色/红色填充。轨道内唯一的指示点（直径 `9.33dp`）印在底板左侧（中心点位于底板 `x = 18.17dp` 处）。当关闭时，旋钮（其在底板上的中心为 `56dp` 左右）移动到左侧，恰好完美覆盖指示圆点；当开启时，旋钮右移 `38dp` 露出左侧的蓝色（或危险态下的红色）指示圆点。
  - **弧度阴影**：轨道凹槽的深陷感由 `switch_ex_mask` 产生的软阴影（CSS 中使用 `inset 0 1.5px 3px rgba(0, 0, 0, 0.07)`）与外框 bevel 阴影共同构成，以保证适度而克制的立体凹陷感，避免过度突兀。

* **Switch Large 精准尺寸与同心几何对齐规则**：
  - 为了保证极致的几何精确性与机械感，Switch 旋钮在两端的目标位置需与外壳两端的半圆弧保持**同心圆心对齐**，而非简单边距贴合。
  - 胶囊型外盒尺寸为 `120 × 48px`，左右两端为半径 `24px` 的圆弧，其对应的圆心坐标分别为 `x = 24px`（左端圆心）与 `x = 96px`（右端圆心）。
  - 滑块直径设计为与凹槽高度相同的 `48px`（完全填充轨道，无垂直溢出）。
  - 关闭状态：滑块圆心与左圆心 `24px` 重合，此时 `thumb left = 0px`。
  - 开启状态：滑块圆心与右圆心 `96px` 重合，此时 `thumb left = 72px`（平移行程为 `72px`）。
  - 指示圆点（直径 `18px`）在开启态下的中心必须同轴同心位于左端圆心 `24px`，因此其左边缘定位调整为 `left: 15px`（`24px - 18px / 2`）。这样在关闭态下旋钮回弹，能以同心方式精确盖在圆点正上方。

---

## 13.5 Slider 滑块

滑块应表达“沿凹槽移动的实体旋钮”，但当前官方 base 证据不足。

官方校准状态与推导：

* 当前 SmartisanOS base 仓库未发现独立通用 `SeekBar/Slider` 视觉资源；只发现 `smartisan_progress_dialog.xml` 和 `progress_medium_smartisanos_*` 等进度弹层资源，它们不适合作为普通可拖拽滑块规范。
* 当前 Web `Slider` 属于本设计系统推导组件，用于音量、亮度、分段时长等设置场景。
* Slider 不应复用 `SwitchEx` 的滑块尺寸。`SwitchEx` 已校准为大尺寸滑块，而 Slider 旋钮继续使用独立规范，避免设置页里两类控件层级混淆。
* **当前校准结构 token**：控制区高度 `38px`，轨道高度 `10px`，轨道横向 padding `16px`，节点 `16px`，节点 border 宽 `4px`，旋钮（thumb-size）直径 `35px`，旋钮中心凹点/指示高光点（thumb-inner-highlight-size）直径 `15px`。
* 分段滑块的文字标签是辅助标尺，不应比当前值更醒目；连续滑块应优先显示实体旋钮和填充轨道。

交互规则：

* 支持点击轨道直接定位；
* 支持拖拽旋钮连续更新；
* 有 `marks` 时吸附到最近标记；
* 禁用态保持实体可见，使用系统控件禁用透明度 `0.75`。

---

## 13.6 SegmentedControl 分段控件

分段控件用于在少量互斥选项之间切换。它在当前官方 base 资源中没有独立对应组件，应按实体按钮组推导实现。

官方校准状态：

* 当前 SmartisanOS base 仓库未发现独立的 segmented/tab/radio button group 资源。
* 可参考的官方机制是按钮 9-patch、selector 状态、TitleBar 对“不要承载分段导航”的约束，以及列表 check 对“互斥选择”的语义。
* 当前 Web `SegmentedControl` 属于本设计系统推导组件，不应声明为 SmartisanOS 官方组件。
* 视觉上应像一组连在一起的实体按钮：外框统一、相邻分隔线克制、active 态使用内凹而非额外浮起。
* 当前稳定结构 token：最小宽度 `280px`、单项最小高度 `36px`、横向 padding `16px`。

交互规则：

* 语义使用 `radiogroup` + `radio`，每项暴露 `aria-checked`。
* 支持点击切换，也支持方向键在选项间移动。
* 只适合 2-4 个短标签选项；更多选项应使用列表、Select 或页面级导航。

---

## 13.8 Checkbox / Radio 选择控件

独立 `Checkbox` 和 `Radio` 是 Web 表单基础控件，不等同于 SmartisanOS 官方设置页里的整行勾选项。

官方校准状态：

* 当前 SmartisanOS base 仓库发现的是 `SettingItemCheck`、`setting_item_check_layout.xml`、`item_check_layout.xml`、`selector_check_icon.xml` 和 `selector_item_check_icon.xml`。
* 官方 check 形态是列表/设置行右侧的勾选图标：未选中时 `invisible`，选中时显示 `selected` 图标，按压/聚焦时切换 `selected_highlight`。
* 官方 xxhdpi `selected.png` 与 `selected_highlight.png` 尺寸均为 `80 × 80px`，折算约 `26.7dp` 图标画布；Web 设置行中沉淀为 `27px` 选中图标画布、`15 × 11px` 勾选标记近似。
* `SettingItemCheck.setEnabled(false)` 将标题和图标 alpha 设为 `0.3`；这与 `SwitchEx` 禁用态 `0.75` 不同，不能混用。
* 当前未发现独立通用 `RadioButton` 或小型独立 checkbox 资源。Web `Checkbox` / `Radio` 属于表单推导组件，不应声明为官方原生控件。

结构规则：

* 设置页的单选语义应优先使用 `SettingItem accessory="check"` 或列表 check 行，而不是小圆点 radio。
* 独立 `Checkbox` / `Radio` 只用于表单、小型偏好项或非设置页密集表单。
* 小型选择控件必须保持拟物凹槽、选中实体点/勾、聚焦环和禁用可辨识；尺寸通过选择控件 token 管理。
* 多个互斥选项如果是短标签，可使用 `SegmentedControl`；如果是设置项，应使用 check 型列表。

---

## 13.9 Select 下拉选择

`Select` 是 Web 表单里的轻量下拉选择控件，不应伪装成 SmartisanOS 官方 `MenuDialog`。

官方校准状态：

* 当前 SmartisanOS base 仓库未发现独立通用 Spinner/Select 视觉资源。
* 已确认存在的是底部 `MenuDialog`、`menu_dialog_list_item.xml`、`menu_dialog_list_multi_item.xml`、`MenuDialogListAdapter`、`MenuDialogMultiAdapter`。
* `MenuDialog` 是底部贴边、强遮罩、全宽决策菜单；它不是输入框旁的小型下拉。
* 当前 Web `Select` 属于推导组件，只保留 Smartisan 的实体输入框、克制浮层、行分隔和短促展开反馈。

交互规则：

* 触发器使用真实 `button`，并暴露 `aria-haspopup="listbox"`、`aria-expanded` 和 `aria-controls`。
* 展开内容使用 `listbox` + `option`，当前项暴露 `aria-selected`。
* 支持点击、Enter/Space 展开或收起、Escape 关闭、方向键移动选项。
* 少量页面级决策或危险操作应使用 `ActionSheet/MenuDialog`；设置页互斥选择优先使用 check 型列表。

---

## 13.10 TitleBar 标题栏

标题栏是 Smartisan 系统页面的顶部骨架，不等同于站点级导航 `Header`。

官方校准来源：

* `title_layout.xml`
* `title_bar_title_text_size = 20sp`
* `title_bar_btn_text_size = 13.5sp`
* `title_back_btn_max_width = 101.7dp`
* `title_text_color = #9a000000`
* `selector_title_button_back.xml`
* `selector_title_button_ok.xml`
* `title_btn_back.9.png` / `title_btn_ok.9.png`

结构规则：

* 标题居中，单行省略，优先保证页面身份稳定。
* 左侧为返回按钮，右侧为确认/完成按钮或占位区。
* 左右按钮最大宽度约 `101.7dp`，避免挤压中间标题。
* 按钮字号为 `13.5sp`，标题字号为 `20sp`。
* 官方标题按钮 9-patch 高度为 `146px` xxhdpi，折算约 `48.7dp`；Web 标题栏高度以 `48px` 近似。
* `title_btn_back.9.png` 资源画布为 `144 × 146px`，`title_btn_ok.9.png` 为 `200 × 146px`；Web 不直接复用画布宽度，只保留最大宽度、实体按钮和按压状态。
* 返回按钮是普通标题按钮；确认按钮可使用高亮实体按钮。
* 标题栏不应承担站点导航、分段导航或大量操作入口。

状态规则：

* 右侧确认按钮可以隐藏、禁用或显示高亮态。
* 返回按钮 selector 有 normal/highlight；确认按钮 selector 有 normal/highlight/disabled。
* 禁用态仍保持实体轮廓，使用官方实体控件透明度 `0.75`。
* 按压态通过轻微位移和内阴影表达，不使用夸张缩放。

Web 组件命名建议：

```tsx
<TitleBar title="声音与触感" backLabel="返回" confirmLabel="完成" />
```

---

## 13.11 List / ListItem 列表

`ListItem` 是通用信息行；`SettingItem` 是设置页专用行。两者共享官方读线和字号，但语义边界不同。

官方校准来源：

* `item_text_layout.xml`
* `item_check_layout.xml`
* `selector_item_text_arrow.xml`
* `selector_item_check_icon.xml`
* `item_text_arrow.png` / `item_text_arrow_highlight.png`

结构规则：

* 普通文本行左侧文字布局从 `30dp` 起始，标题最大宽度 `220dp`。
* 标题字号为 `18sp`；摘要、右侧副标题和值为 `13.5sp`。
* 右侧箭头边距约 `12dp`，右侧副标题与标题块间距约 `3dp`。
* check 型列表行右侧勾选图标边距约 `18dp`，未选中时保留占位但不可见。
* 官方 xxhdpi 箭头资源画布为 `86 × 108px`，Web 中不直接使用画布尺寸，而以窄箭头视觉近似，并保持右侧官方边距。

状态规则：

* 可点击行按下时文字和图标反白，背景可切为系统蓝色高亮。
* 通用 `ListItem` 可以承载普通入口、只读信息和 check 型选择；不要承载开关，开关应使用 `SettingItem`。
* `List` 容器在 Web 中可作为分组卡片出现，但官方 base 的核心证据是行布局，不是外层卡片。

---

## 13.12 SettingItem 设置项

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
* `check` 型禁用态沿用官方 `SettingItemCheck`：标题和图标弱化到 alpha `0.3`，不要套用 `SwitchEx` 的 `0.75`。
* 选中或按下态可使用系统蓝色块状高亮，文字切换为反白。
* 纯展示型设置项不要出现强按钮阴影，重点是行分隔、读线和状态清晰。

Web 组件命名建议：

```tsx
<SettingItem title="无线局域网" value="已开启" accessory="chevron" />
<SettingItem title="触感快捷开关" accessory="switch" checked />
<SettingItem title="经典提示音" accessory="check" selected />
```

---

## 13.13 Modal / Drawer 弹层

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
* `menu_dialog.xml` 标题栏左右取消按钮宽约 `67dp`，最小高度约 `49dp`；标题最多两行，左右留 `6dp` 间距。
* `menu_dialog_list_item.xml` 使用 `18sp` 居中文字和按钮 9-patch；`menu_dialog_list_multi_item.xml` 使用 `16dp` 左右 padding 与 `menu_dialog_multi_item_selector`。
* 多选/列表型 MenuDialog 固定列表高度为 `237dp`，单按钮/少量动作则内容自适应。
* 因此组件库需要同时提供居中 `Dialog` 和底部 `ActionSheet/MenuDialog` 两种弹层：`ActionSheet` 对应官方 `MenuDialog`；居中 `Dialog` 是 Web 通用推导组件，不声明为官方 SmartisanOS 原生弹窗。
* 居中 `Dialog` 必须具备 `role="dialog"`、`aria-modal`、Escape 关闭、遮罩点击关闭和 body 滚动锁定。

---

## 13.14 Progress 条形进度

`Progress` 是页面内的轻量条形进度反馈，不等同于 SmartisanOS 官方 `ProgressDialog`。

官方校准状态：

* 当前 SmartisanOS base 仓库未发现独立通用水平条形进度条视觉资源。
* 已确认的官方进度资源集中在 `smartisan_progress_dialog.xml`、`progress_medium_smartisanos_light.xml`、`progress_medium_smartisanos_dark.xml` 和 spinner 外环位图。
* 因此 Web `Progress` 属于推导组件，用于页面内上传、同步、容量、步骤完成度等非阻塞状态。
* 视觉上应保留 Smartisan 的凹槽轨道、实体填充和轻微高光，但不应宣称来自官方原生条形控件。

交互与语义：

* `role="progressbar"` 放在稳定外层轨道上，避免 `0%` 时填充层不可访问。
* 暴露 `aria-valuenow`、`aria-valuemin`、`aria-valuemax`。
* 需要阻塞用户操作的处理中状态必须使用 `ProgressDialog`，不要用页面内条形进度替代。

---

## 13.15 ProgressDialog 进度弹层

`ProgressDialog` 是系统级“处理中”反馈，不等同于页面内条形 `Progress`。

官方校准来源：

* `smartisan_progress_dialog.xml`
* `progress_medium_smartisanos_light.xml`
* `progress_medium_smartisanos_dark.xml`
* `smartisan_progress_dialog_bg.9.png`
* `smartisan_progress_dialog_bg_dark.9.png`
* `spinner_48_outer_smartisanos_light.png`
* `spinner_48_outer_smartisanos_dark.png`

结构规则：

* 弹层内容宽度为 `246dp`，居中显示。
* 标题可选，字号为 `18sp`，单行省略。
* Spinner 位于中间，官方 `spinner_48_outer_smartisanos_*` 资源为 `144 × 144px` xxhdpi，折算 `48dp`。
* 消息可选，字号为 `13sp`，左右内边距 `30dp`，单行省略。
* 标题和消息使用接近 `#9c000000` 的深色半透明文本。
* 标题和消息上下 margin 均为 `8dp`，spinner 顶部 margin 为 `2dp`。
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

## 13.18 Icon 图标

图标要统一，不要只追求单个好看。

官方校准状态：

* 当前 SmartisanOS base 仓库包含大量场景图标资源，如 `file_icon_*.png`、`item_text_arrow.png`、`selected.png`、`search_pre_btn.png`、`search_next_btn.png` 等。
* 文件图标资源在 xxhdpi 下多为 `101 × 120px`，属于文件类型专用图标，不应作为通用线性 Icon 的尺寸基准。
* 当前 Web `Icon` 是通用图标承载组件，用于统一尺寸、颜色继承、可选拟物容器和可访问标签；它不声明复刻某个官方图标集。
* 当图标承担官方资源语义，如列表箭头或 check 标记时，应优先使用对应组件的专用 token，而不是直接套通用 Icon。

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

## 13.19 Demo Shell / Header / SideNav 展示壳层

`Header`、`SideNav` 和 `Hero` 是本 Web 演示站的展示壳层，不是 SmartisanOS 官方组件。

边界规则：

* `TitleBar` 才是系统页面顶部骨架；`Header` 是站点导航，不能作为 SmartisanOS 标题栏规范来源。
* `SideNav` 是 Web 文档导航，不是系统级任务侧栏；不要把它当作业务组件规范来源。
* `Hero` 是展示页首屏，不属于系统控件；其中的设备模型、仪表、装饰按钮只用于说明触感原则。
* 这些壳层可以使用设计 token，但不要反向影响官方组件校准值。

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
