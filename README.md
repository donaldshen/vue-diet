# vue-diet

[![Netlify Status](https://api.netlify.com/api/v1/badges/74a3c931-6a03-4fb7-8931-dcd360e76ba9/deploy-status)](https://app.netlify.com/sites/compassionate-wing-d4bcd6/deploys)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## 开发流程

### 开发中
[x] 有 eslint & prettier
[ ] 用 vuetify 复现 diet（以手机端为主，限制最大宽度，在桌面端也有移动端的效果
[x] 有 google analytics 统计访客

### 持续集成
[x] owner 直接推 master
[x] contributor 提交 pr，基于 netlify 预览修正
[x] 有 commitlint 保证 msg 规范
[x] 基于 github flow 协作模式，就是 clone 下来基于 master 提 pr
[x] 合到 master 后 github-action 自动发布到 github-pages
[ ] 自带域名（指向 netlify 还是 github-pages
[ ] 发布成功后通知到邮件、微信

### TODO
[] eslint 插件没注册就用上了？
[] pwa 如何被使用，目前导致更新不及时
[] 看 github 其他插件，比如监控代码质量的
[] composition api（等1.0.0再学也不迟
[] typescript（强行上就是折腾

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
