# 📋 待办事项 App

一个可以安装到手机桌面的待办事项应用（PWA）。

## 功能

- ✅ 添加 / 编辑 / 删除待办事项
- ✅ 一键切换完成状态
- ✅ 全部 / 待完成 / 已完成 筛选
- ✅ 清除已完成事项
- ✅ 数据自动保存（localStorage）
- ✅ **支持离线使用**
- ✅ **可安装到手机桌面**，像原生 App 一样

## 如何使用

### 方式一：手机浏览器直接打开（在线地址）

等部署到 GitHub Pages 后，用手机浏览器打开下面的地址，按提示点击「安装」即可：

> https://你的用户名.github.io/todo-pwa

### 方式二：本地运行

用任意 HTTP 服务启动（因为 PWA 需要 HTTP 协议）：

```bash
# Python 方式
python -m http.server 8080

# Node.js 方式
npx serve .
```

然后浏览器打开 `http://localhost:8080`

## 技术栈

- 纯 HTML + CSS + JavaScript
- PWA（Service Worker + Manifest）
- 零依赖，无需构建工具
