# personal_study · 个人学习工具（微信小程序）

原生微信小程序，不依赖 web-view（个人主体不能配业务域名）、不依赖网络，进度存本机。

## 结构

```
app.json / app.wxss / theme.json   全局配置、主题变量（自动跟随深色模式）
data/registry.js                   模块注册表（首页列表顺序）
data/decks/<id>.js                 每个学习模块一份数据
pages/index/                       首页：模块列表 + 进度
pages/glossary/                    术语类模块（type: glossary）：浏览 / 问答 / 闪卡 / 自测
pages/lesson/                      概念卡模块（type: lesson）：概览 / 学习 / 自测
utils/store.js                     本地进度（wx storage，按模块隔离）
source/                            原始 HTML 存档（不打包）
tools/html2deck.js                 术语 HTML → 模块数据（不打包）
tools/cs50-json2deck.js            CS50 概念卡 JSON → 模块数据（不打包）
```

## 本地运行

微信开发者工具 → 导入项目 → 选本仓库根目录。`project.config.json` 里 appid 已设为 `wxab5ae284768f88ca`（测试小程序）。

## 加一个新模块

**术语类 HTML**（和 `source/robotics-glossary.html` 同格式，内含 `const CATS=[...]` 和 `const RAW=[...]`）：

```bash
cp ~/Downloads/xxx.html source/
node tools/html2deck.js source/xxx.html xxx 术语
```

脚本会生成 `data/decks/xxx.js` 并自动注册到 `data/registry.js`，开发者工具里刷新即可。

**手写数据**：照 `data/decks/robotics.js` 的格式写 `terms: [[分类序号, 中文, English, 说明], ...]`，再在 `registry.js` 的 `<decks>` 区块 require。

**CS50 概念卡**（`schema: cs50-cards/v1` 的 JSON，一周一份）：

```bash
node tools/cs50-json2deck.js source/cs50-week5.json
```

生成 `data/decks/cs50-w5.js` 并注册。整包更新（如 `cs50x-2026-cards.zip` 的 `data/` 下 11 份 JSON）时，先覆盖到 `source/cs50-week0.json` … `cs50-week10.json`，再批量转换：

```bash
for f in source/cs50-week*.json; do node tools/cs50-json2deck.js "$f"; done
```

学习进度按卡片 `id` 存储：修改卡片内容不要改 `id`，新增卡片要用新 `id`。同一课程（`course` 相同）的各周会自动互相链接：概览里的周时间线、卡片里的「前后联系」点击即跳到对应周，没加入的周会提示。

**格式不同的 HTML**（比如 `source/ta-kit-glossary.html`）：发给 Claude 转换即可。术语页支持的可选字段：

- 每条 term 第 5 列：`{ abbr, noteEn, why, whyEn }`，即缩写、英文释义、要点（标签由模块的 `whyLabel` 决定）及其英文。有就显示，没有就隐藏。
- 模块级 `qa: [[分组, [[问题, Question, 为什么问, 好的回答, 警惕信号], ...]], ...]`：有则多一个问答 tab（名称取 `qaLabel`，顶部提示取 `qaNote`）。
- 自测「看释义选术语」对所有带释义的模块自动可用。

**非术语类页面**（比如框架笔记、案例拆解）：模块的 `type` 字段决定路由到 `pages/<type>/<type>`。新增一种类型 = 新建对应页面 + 在 `app.json` 的 `pages` 里登记。

## 朗读（微信同声传译插件）

英文朗读走「微信同声传译」插件（`utils/tts.js`），已在 `app.json` 的 `plugins` 声明。启用前必须：

1. appid 必须是真实小程序 appid（`touristappid` 无法使用插件），当前已配置 `wxab5ae284768f88ca`。
2. 小程序后台 → 设置 → 第三方设置 → 插件管理 → 添加插件，搜「微信同声传译」（AppID `wx069ba97219f66d99`）。
3. 版本号以后台显示的最新版为准，必要时改 `app.json` 里的 `version`。

合成结果按文本缓存（插件返回的音频地址有有效期），iOS 静音键下也会出声。暂时不想配插件：删掉 `app.json` 里的 `plugins` 段即可，朗读按钮会自动隐藏。

## 与原 HTML 的差异

- 键盘快捷键：移动端无意义，去掉；闪卡支持左右滑动切换，标记时有轻震动反馈。
