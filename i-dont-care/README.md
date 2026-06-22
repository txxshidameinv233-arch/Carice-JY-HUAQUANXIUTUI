# 我不在乎 · i don't care

一部无言的黑白短篇漫画的展示网站 —— 黑、白，与一点红。纯静态站点（HTML / CSS / 原生 JS），与同仓库的「花拳绣腿」网站完全独立，互不影响。

## 特性

- **首屏**：纯黑场景中泛起血红心跳般的辉光，书法标题「我不在乎 / i don't care」逐字溶入，背景为压暗的画面视差
- **氛围**：全局胶片颗粒 + 电影暗角覆层
- **阅读**：6 页竖向沉浸式阅读，每页随滚动淡入上浮；右侧竖排页码实时跟随
- **尾声**：标题重现，可一键回到开篇
- 顶部红色阅读进度条；尊重 `prefers-reduced-motion`

## 本地预览

```bash
# 在仓库根目录
python -m http.server 8000
# 浏览器打开 http://localhost:8000/i-dont-care/
```

## 目录结构

```
i-dont-care/
├── index.html
├── style.css
├── script.js
└── pages/
    ├── p1.jpg ~ p6.jpg   漫画 6 页（已压缩为适配网页的尺寸）
    └── hero.jpg          首屏暗调背景
```

## 备注

- 标题使用 Google Fonts（Ma Shan Zheng / Zhi Mang Xing / Noto Serif SC），需联网加载，缺失时回退到衬线/楷体。
- 页面图片由原作 PDF 提取并优化；版权归原作者所有。尾部署名可在 `index.html` 的 `.end-credit` 处修改。
