# 玄机阁 - 传统命理排盘系统 (八字 & 紫微斗数)

skill版本参考：https://github.com/Justin-Mai/bazi-ziwei-skill

这是一个专为命理爱好者和传统文化开发者打造的精美排盘 Web 应用。它完美融合了**子平术八字命理**与**紫微斗数**，并结合现代“国潮”视觉风格与 **AI 祖师爷一对一解盘**，带给缘主殿堂级的批命体验。

---

## 🌟 特色功能

1. **“国潮”尊贵暗黑视觉**：
   - 动态 Canvas 星空中微弱闪烁的星宿与星轨。
   - 奢华的赤金色渐变文字和流光溢彩的玻璃拟态面板。
   - 五行属性（金木水火土）专属的霓虹光晕提示。
2. **专业子平八字排盘**：
   - 年、月、日、时四柱天干地支精准换算。
   - 自动生成藏干、十神、纳音数据。
   - 根据地支藏干比例进行**五行力量加权量化百分比**，并辅以直观的能量进度条展示。
   - 内置离线格局分析，推断日元属性、身强身弱及喜用神改运建议。
3. **经典紫微斗数 4x4 网格星盘**：
   - 遵循传统的 12 地支定宫布局，将 12 宫环形排布，中宫合并作为主体信息与基本命局呈现。
   - 精细排布十四主星、六吉星、六凶星及大限，支持生年天干引发的四化（禄权科忌）角标展示。
   - **宫位联动交互**：点击任一宫位，下方卡片会立刻显示该宫位的主星星曜离线大字典精解（如命宫、夫妻宫、财帛宫、官禄宫等）。
4. **真太阳时精准校准**：
   - 支持八字和紫微斗数分别独立配置真太阳时校准。
   - 内置中国主要省市经度数据库，支持二级城市联动，自动关联出生地经度。
   - 精确计算**经度时差**与**均时差 (Equation of Time, EoT)**，还原缘主最真实的出生真太阳时，解决早晚子时及跨天排盘问题。
5. **AI 命理定盘校准（时辰校准）**：
   - 针对出生时辰不明确或处于交界处的缘主，支持勾选多个已保存的历史备选命盘。
   - 缘主提供人生大事线索（如出生家庭情况、升学、感情变动、事业财运、健康变故等）。
   - 恭请“AI 祖师爷”深入对比不同时盘的命理印证，找出最吻合真实生命轨迹的命盘并给出定盘解析。
6. **历史档案管理**：
   - 排盘数据支持一键保存至本地浏览器 `localStorage` 进行持久化管理。
   - 提供直观的历史档案侧边栏，显示乾造/坤造、真太阳时使用状态及具体时间。
   - 点击历史记录可秒级重载历史命盘，支持一键删除，保护隐私。
7. **灵活的 AI 接口配置与第三方联动**：
   - 接入 Gemini API，支持自主配置 API Key 和 **API 代理地址**，适合国内等不同的网络环境。
   - 提供 **“一键复制排盘与 AI 提示词 / 复制定盘提示词”** 功能，可直接将精准排盘上下文与预设指令复制到剪贴板，方便在 ChatGPT、Claude、Kimi 等其他大语言模型中进行深度互动。
   - 支持直接在网页端向 AI 祖师爷提问（如：“我适合创业吗？”、“我的喜用神是什么？”），提供近两千字、古风色彩浓厚、引经据典的深度命书和对话体验。

---

## 📁 目录结构

```text
baziziwei/
├── index.html   # 网页主骨架 (通过 CDN 自动加载 iztro 与 lunar-javascript)
├── style.css    # 核心国潮视觉样式表 (CSS Grid / 毛玻璃 / 动效)
├── app.js       # 核心历法排盘、五行量化算法、宫位交互、定盘校准与 AI 接口调用
└── README.md    # 项目说明文档
```

---

## 🚀 快速开始

因为本项目采用**无构建的纯前端架构**，您无需在本地搭建任何 Node/npm 运行环境，只需：

1. **双击打开网页**：
   直接使用现代浏览器（Chrome、Edge、Safari 等）双击打开 `index.html`。
2. **进行天机排盘**：
   - 输入姓名、选择性别，填入阳历出生日期或切换为农历年份、月份、日期、时辰。
   - 选择出生省市（例如：广东-湛江廉江），系统将自动加载并填入实测经度。
   - 勾选是否启用八字或紫微斗数的“真太阳时校准”。
   - 点击“开启天机排盘”，即可查看对应的八字与紫微斗数盘面。
3. **管理历史记录**：
   排盘成功后，点击“保存当前排盘”可将档案记录在侧边栏“历史档案”中。点击任一历史记录即可重新排盘。
4. **恭请祖师爷定盘**：
   如果有多个时辰不确定，可先将不同时辰的排盘分别保存至历史档案，然后在“命理定盘校准”区域勾选这几个档案，输入生平大事经历，点击“恭请祖师爷定盘”进行校准分析，或点击“复制定盘提示词”发送给外部 AI。
5. **启用 AI 解盘**：
   - 点击页面最下方的“API 参数配置”，填入您的 Gemini API Key（如：`AIzaSy...`），并可选配置 API 代理地址。
   - 点击“保存配置”，系统会将 Key 安全地保存在本地浏览器的 `localStorage` 中。
   - 点击“恭请祖师爷批命书”，稍等片刻，即可欣赏到充满道骨仙风风格的终身命理报告！
   - 您还可以在下方的咨询框中向祖师爷随时追问。

---

## 🔮 核心技术库

*   **[lunar-javascript](https://github.com/6tail/lunar-javascript)**：目前最好用的开源公农历干支转换和黄历数据分析库。
*   **[iztro](https://github.com/SylarLong/iztro)**：强大且轻量级的紫微斗数排盘算法引擎。
*   **[marked.js](https://github.com/markedjs/marked)**：用于在浏览器前端优雅地渲染 AI 生成的 Markdown 批命书。

---

## 💖 打赏支持

如果您觉得“玄机阁”对您的命理研究或项目开发有帮助，欢迎用一杯咖啡或一瓶可乐打赏支持作者的无私开源创作！

<div align="center">
  <img src="picture/dashang.jpg" alt="打赏作者" width="220" style="border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />
</div>

---

## Star History

<a href="https://www.star-history.com/?repos=Justin-Mai%2FBaziZiwei&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=Justin-Mai/BaziZiwei&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=Justin-Mai/BaziZiwei&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=Justin-Mai/BaziZiwei&type=date&legend=top-left" />
 </picture>
</a>
