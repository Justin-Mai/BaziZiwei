# 玄机阁 - 传统命理排盘系统 (八字 & 紫微斗数)

这是一个专为命理爱好者和传统文化开发者打造的精美排盘 Web 应用。它完美融合了**子平术八字命理**与**紫微斗数**，并结合现代“国潮”视觉风格与 **AI 祖师爷一对一解盘**，带给缘主殿堂级的批命体验。

---

## 🌟 特色功能

1. **“国潮”尊贵暗黑视觉**：
   - 动态 Canvas 星空中微弱闪烁的星宿。
   - 奢华的赤金色渐变文字和流光溢彩的玻璃拟态面板。
   - 五行属性（金木水火土）专属的霓虹光晕提示。
2. **专业子平八字排盘**：
   - 年、月、日、时四柱天干地支精准换算。
   - 自动生成藏干、十神、纳音数据。
   - 根据地支藏干比例进行**五行力量加权量化百分比**，并辅以图表展示。
   - 内置离线格局分析，推断身强身弱及喜用神改运方位。
3. **经典紫微斗数 4x4 网格星盘**：
   - 遵循最古老的传统 12 地支定宫布局，将 12 宫环形排布，中宫合并作为主体信息呈现。
   - 精细排布十四主星、六吉星、六凶星及大限，支持生年天干引发的四化（禄权科忌）角标。
   - **宫位联动交互**：点击任一宫位，下方卡片会立刻显示该宫位的主星星曜离线大字典精解。
4. **“AI 祖师爷解盘”**：
   - 接入 Gemini API Key（支持保存在浏览器本地，安全不上传），一键请求自动编写近两千字、古风色彩浓厚、引经据典的深度命书。
   - 提供对话互动输入框，允许您随时向“祖师爷”追问任何命理困惑（如：“我适合创业吗？”、“我的喜用神是什么？”）。

---

## 📁 目录结构

```text
baziziwei/
├── index.html   # 网页主骨架 (通过 CDN 自动加载 iztro 与 lunar-javascript)
├── style.css    # 核心国潮视觉样式表 (CSS Grid / 毛玻璃 / 动效)
├── app.js       # 核心历法排盘、五行量化算法、宫位交互与 AI 接口调用
└── README.md    # 项目说明文档
```

---

## 🚀 快速开始

因为本项目采用**无构建的纯前端架构**，您无需在本地搭建任何 Node/npm 运行环境，只需：

1. **双击打开网页**：
   直接使用现代浏览器（Chrome、Edge、Safari 等）双击打开 `index.html`。
2. **进行天机排盘**：
   输入姓名、选择性别，填入阳历出生日期或切换为农历年份、时辰，点击“开启天机排盘”，即可查看八字与紫微斗数盘面。
3. **启用 AI 解盘 (可选)**：
   - 在页面最下方的“Gemini API Key”输入框中，填入您的 API Key（如：`AIzaSy...`）。
   - 点击“保存 Key”，系统会将 Key 安全地保存在本地浏览器的 `localStorage` 中。
   - 点击“恭请祖师爷批命书”，稍等片刻，即可欣赏到充满道骨仙风风格的终身命理报告！

---

## 🔮 核心技术库

*   **[lunar-javascript](https://github.com/6tail/lunar-javascript)**：目前最好用的开源公农历干支转换和黄历数据分析库。
*   **[iztro](https://github.com/SylarLong/iztro)**：强大且轻量级的紫微斗数排盘算法引擎。
*   **[marked.js](https://github.com/markedjs/marked)**：用于在浏览器前端优雅地渲染 AI 生成的 Markdown 批命书。

---

## Star History

<a href="https://www.star-history.com/?repos=Justin-Mai%2FBaziZiwei&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=Justin-Mai/BaziZiwei&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=Justin-Mai/BaziZiwei&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=Justin-Mai/BaziZiwei&type=date&legend=top-left" />
 </picture>
</a>
