# vue-diet

[![Netlify Status](https://api.netlify.com/api/v1/badges/74a3c931-6a03-4fb7-8931-dcd360e76ba9/deploy-status)](https://app.netlify.com/sites/compassionate-wing-d4bcd6/deploys)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## 开发须知

### 开发中
[x] 有 eslint & prettier
[ ] 用 vuetify 复现 diet（以手机端为主，限制最大宽度，在桌面端也有移动端的效果
[x] 有 google analytics 统计访客
[x] 添加 pwa。注意在当前页刷新只是 fetch 了资源；要关闭标签页再打开才会更新内容
[x] 有最近十次历史功能，包括时间，事物名称，卡路里；可被点击，再次进食；
[x] 二次确认
[ ] 有常用食物的数据；列表形式，项目包括食物名称，卡路里；可 crud
[ ] 使用 food api 查询热量数据

### 持续集成
[x] owner 直接推 master
[x] contributor 提交 pr，基于 netlify 预览修正
[x] 有 commitlint 保证 msg 规范
[x] 基于 github flow 协作模式，就是 clone 下来基于 master 提 pr
[x] 合到 master 后 github-action 自动发布到 github-pages
[x] 添加 github 应用 stale 检测过期 issue
[x] 添加 github 应用 imgbot 自动为新增图片提无损压缩 pr
[x] 添加 github 应用 depfu 自动为过期依赖提 pr
[x] 自定义域名（指向 netlify
[ ] 发布成功或失败后通知到邮件、微信

### 潜在 TODO
[ ] eslint 插件没注册就用上了？
[ ] 按 audit 的意见尽可能修改
[ ] 账号密码体系；数据存在数据库
[ ] composition api（等1.0.0再学也不迟
[ ] typescript（强行上就是折腾

### 选择 netlify 服务为主的心路历程（优于 github pages & zeit
[netlify vs github-pages - netlify 官方文章](https://www.netlify.com/github-pages-vs-netlify/)
[静态站点托管选择历程 - medium 文章](https://medium.com/liferaydesign/netlify-vs-zeit-vs-github-pages-5f609dd6912b)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
