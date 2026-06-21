# 花拳绣腿 · 电子画册

一个以「花拳绣腿」系列插画为主题的电子画册网站。纯静态站点（HTML / CSS / 原生 JS），无需构建。

## 特性

- 进场：多枚朱印汇集 → 一记重章 → 逐枚错时落位、各自荡开双层涟漪
- 标题：书法字悬停 / 点击生出缠绕梅枝、迸发花瓣并泛起涟漪
- 画作：下滑见底图 → 点击启封，水墨晕染溶出成品 + 朱砂涟漪
- 灯箱：人物自缩略图飞出放大、视差浮动
- 尾印：浮于水面的循环涟漪；点击可朱幕铺屏、回溯重放进场

## 本地预览

任意静态服务器即可，例如：

```bash
npx serve .
# 或
python -m http.server 8000
```

然后浏览器打开对应地址。

## 目录结构

```
.
├── index.html
├── style.css
├── script.js
└── images/
    ├── 1.jpg ~ 5.jpg          成品画
    ├── char1.png ~ char5.png  人物抠图
    ├── seal.png               印章
    ├── drafts/  11 ~ 55.png   底图（线稿/设定）
    ├── title/   hua/quan/xiu/tui.png  书法标题
    └── vines/   left/right/new.png    缠绕梅枝
```

## 部署

静态托管直接上传根目录内容即可（GitHub Pages / Netlify / Vercel / Cloudflare Pages 等）。
标题字体使用 Google Fonts，需联网加载。
