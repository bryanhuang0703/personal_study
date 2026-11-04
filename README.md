# personal_study · 个人学习工具（微信小程序）

原生微信小程序，不依赖 web-view（个人主体不能配业务域名）、不依赖网络，进度存本机。

## 结构

```
app.json / app.wxss / theme.json   全局配置、主题变量（自动跟随深色模式）
data/registry.js                   模块注册表（首页列表顺序）
data/decks/<id>.js                 每个学习模块一份数据
pages/index/                       首页：模块列表 + 进度
pages/glossary/                    术语类模块：浏览 / 闪卡 / 自测
utils/store.js                     本地进度（wx storage，按模块隔离）
source/                            原始 HTML 存档（不打包）
tools/html2deck.js                 HTML → 模块数据 转换脚本（不打包）
```

## 本地运行

微信开发者工具 → 导入项目 → 选本仓库根目录。`project.config.json` 里 appid 是 `touristappid`（测试号），上传前换成自己的。

## 加一个新模块

**术语类 HTML**（和 `source/robotics-glossary.html` 同格式，内含 `const CATS=[...]` 和 `const RAW=[...]`）：

```bash
cp ~/Downloads/xxx.html source/
node tools/html2deck.js source/xxx.html xxx 术语
```

脚本会生成 `data/decks/xxx.js` 并自动注册到 `data/registry.js`，开发者工具里刷新即可。

**手写数据**：照 `data/decks/robotics.js` 的格式写 `terms: [[分类序号, 中文, English, 说明], ...]`，再在 `registry.js` 的 `<decks>` 区块 require。

**非术语类页面**（比如框架笔记、案例拆解）：模块的 `type` 字段决定路由到 `pages/<type>/<type>`。新增一种类型 = 新建对应页面 + 在 `app.json` 的 `pages` 里登记。

## 朗读（微信同声传译插件）

英文朗读走「微信同声传译」插件（`utils/tts.js`），已在 `app.json` 的 `plugins` 声明。启用前必须：

1. `project.config.json` 的 appid 换成自己的小程序 appid（测试号 `touristappid` 无法使用插件，会编译报错）。
2. 小程序后台 → 设置 → 第三方设置 → 插件管理 → 添加插件，搜「微信同声传译」（AppID `wx069ba97219f66d99`）。
3. 版本号以后台显示的最新版为准，必要时改 `app.json` 里的 `version`。

合成结果按文本缓存（插件返回的音频地址有有效期），iOS 静音键下也会出声。暂时不想配插件：删掉 `app.json` 里的 `plugins` 段即可，朗读按钮会自动隐藏。

## 与原 HTML 的差异

- 键盘快捷键：移动端无意义，去掉；闪卡支持左右滑动切换，标记时有轻震动反馈。
