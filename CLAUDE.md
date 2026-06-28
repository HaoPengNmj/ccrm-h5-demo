# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

# 项目概览

ccrm-h5，一个面向银行机构的 Vue3 移动端 H5 CRM 应用

## 技术栈

Vue 3 + Vant 4 + TypeScript + Less + Vite

## 目录

- apis/、mock/、router/、views/ → 按业务模块划分，路径与菜单一致
- components/ → 公共组件（kebab-case）
- hooks/ → 组合式函数（useXxx）
- http/ → 请求封装
- storage/ → 存储封装
- utils/ → 工具函数
- @types/ → 类型定义
- styles/ → 全局样式

## 规范

- 组件：`<script setup lang="ts">`，文件名 kebab-case
- 页面入口：`/[菜单名]/v-index.vue`
- 变量/函数：camelCase，常量：UPPER_SNAKE_CASE
- CSS：BEM（`.block__element--modifier`）
- 基础组件：`Base`/`App`/`V` 前缀
- Props/Emits 必须有 TS 类型
- 样式用 scoped 或 BEM

## 命令

- 开发：`npm run serve`（加载 .env）
- Mock：`npm run mock`

## 进度

### 已完成

- [ ]

### 进行中

- [ ]

### 待办

- [ ]

### 踩坑记录

-

## 对话规则

- 回答用中文
- 代码注释用中文
- 简洁回复，减少 token
- 引用具体文件请用 @filename，不要扫描全项目
