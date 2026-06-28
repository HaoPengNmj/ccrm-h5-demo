# ccrm-h5

## 项目概述

ccrm-h5 是一个基于 Vue 3 的移动端 H5 项目。

## 技术栈

- **前端框架**: Vue3 + Vant4
- **类型系统**: TypeScript
- **样式预处理器**: Less
- **构建工具**: Vite
- **图表库**: Echarts
- **运行环境**: Node v18+
- **代码规范**: ESLint, Prettier

### 项目运行

运行命令：

- `serve`: 启动本地开发服务器，自动加载 `.env` 配置文件，适用于日常开发调试。
- `dev`: 以开发模式运行 Vite，自动加载 `.env.dev` 配置文件，提供热更新和快速构建体验。
- `prod`: 以生产模式运行 Vite，自动加载 `.env.prod` 配置文件，优化输出以提高性能。
- `mock`: 启动 Vite 在 mock 模式下，使用预设的 mock 数据替代实际的网络请求，方便前端开发时的离线测试。
- `build:dev`: 构建针对开发环境的静态资源包，适合内部测试和集成环境使用。
- `build:prod`: 构建针对生产环境的静态资源包，进行代码压缩和资源优化，适用于上线部署。
- `preview`: 预览已构建的项目，根据当前目录下的 `dist` 文件夹内容展示构建结果，便于检查构建效果。

## 目录结构

```shell
ccrm-h5
├── .vscode
│   ├── extensions.json         # VSCode 推荐插件配置
│   └── settings.json           # VSCode 工作区设置
├── src
│   ├── @types                  # 全局类型定义
│   ├── apis                    # API 接口封装
│   ├── assets                  # 静态资源
│   ├── components              # 自定义公共组件
│   ├── config                  # 全局配置
│   ├── hooks                   # 自定义 Hooks
│   ├── http                    # HTTP 请求封装
│   ├── layouts                 # 页面布局
│   ├── mock                    # mock 数据模拟
│   ├── models                  # 数据模型定义
│   ├── plugins                 # 插件注册
│   ├── router                  # 路由配置
│   ├── storage                 # 存储管理
│   ├── styles                  # 主题样式
│   ├── utils                   # 工具函数
│   ├── views                   # 业务视图
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 应用入口
│   └── vite-vue.d.ts           # Vite 全局声明
├── .env                        # 本地开发配置文件
├── .env.dev                    # dev 环境配置文件
├── .env.prod                   # prod 环境配置文件
├── .eslintignore               # ESLint 忽略规则
├── .eslintrc.js                # ESLint 配置
├── .gitignore                  # Git 忽略规则
├── .prettierignore             # Prettier 忽略规则
├── .prettierrc                 # Prettier 配置
├── index.html                  # HTML 模板
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript 配置
├── vite.config.js              # Vite 配置
└── README.md                   # 项目文档
```

### 项目开发规范

- **目录结构与文件命名**

  - 项目内的关键文件夹（如 `api`, `mock`, `route`, `views` 等）应遵循 <span style="color: red;font-size:18px">**统一的业务模块**</span> 划分策略，与菜单保持一致。
  - 同一业务模块的所有相关文件，包括接口定义、模拟数据、路由配置和视图组件，应当集中存放在对应模块的子目录下，确保路径的一致性和可预测性。
  - 页面入口文件名格式为 `/菜单名/v-index.vue`。

- **组件命名与文件名**

  - 组件名应遵循 KebabCase 格式，除了根组件 `App` 和 Vue 内置组件。
  - 组件文件名统一采用 kebab-case。
  - 非模板类组件可考虑使用 PascalCase（目前未启用）。
  - 展示类、无逻辑或无状态的基础组件以特定前缀（如 `Base`, `App`, `V`）开头。
  - 组件名称应以描述性最强的词开头，修饰词置于末尾。

- **变量与常量命名**

  - 变量采用 camelCase（小驼峰命名）。
  - 常量使用 UPPER_CASE_WITH_UNDERSCORES（全大写加下划线）。
  - 函数名可使用 camelCase。

- **私有属性命名**

  - 私有属性名应使用 `$` 前缀，后跟命名空间，以避免命名冲突。
  - 示例：`$_namespace_`。

- **CSS 命名规范**

  - 使用 BEM 方法：
    - `block`: 更高级别的抽象或组件。
    - `block__element`: `block` 的后代，构成完整 `block` 的部分。
    - `block--modifier`: 表示 `block` 的不同状态或变体。
  - 示例：
    - `.site-search`：块。
    - `.site-search__field`：元素。
    - `.site-search--full`：修饰符。
  - 组件样式应设置作用域，采用基于 class 的策略而非 scoped attribute。

### 入口与启动

- `src/main.ts` → 创建 Vue 应用，挂载路由，加载 `amfe-flexible` 进行移动端视口适配，并初始化 VConsole 插件（仅非生产环境）。
- `src/App.vue` — 根组件，管理视口高度、处理 resize 事件，并渲染 `<router-view />`。

### 路由与布局

- **Hash 模式路由**（`createWebHashHistory`）。所有路由挂载在单一 Layout 路由（`/`）下，由 `src/layout/layout-box.vue` 渲染。
- 布局根据每个路由的 `meta.hasType`（`'header'`、`'footer'`、`'both'`、`'none'`）动态显示/隐藏顶部**导航栏**和**底部标签栏**。
- **底部标签页**定义在 `src/router/constant-modules.ts`：home（首页）、perf（业绩）、cust（客户）、mkt（营销）、user（我的）。每个标签的可见性由 `hasMenu()` 控制。
- **各模块子页面路由**：`src/router/auth-modules/<module>.ts`。子页面组件位于 `src/sub-pages/<module>/`。
- **Keep-alive**：`cached-view-hook.ts` 管理哪些视图保持存活（根据 `meta.isKeepAlive`），并通过 `layout-box-main` 元素保存/恢复滚动位置。
- **鉴权守卫**：`router.beforeEach` 检查 sessionStorage 中是否存在 token；如不存在则重定向到 `/login`（白名单路径除外）。

### HTTP 层（`src/http/`）

- `axios.ts` — `AxiosHttpRequest` 类封装 axios，包含：
  - **MD5 签名**：每个请求头通过 `use-md5-hook.ts` 包含 `sign`（body + 时间戳的 MD5 值）和 `time`。
  - **重复请求取消**：使用 axios CancelToken；可按请求选择关闭。
  - **自动加载动画**：在请求生命周期中自动显示/隐藏。
  - **Token 注入**：从 sessionStorage 获取 `AuthorizationApp` 请求头。
  - **响应处理**：code 999 → 强制登出；非 200 → toast 错误提示。
- `auth.ts` — 从 sessionStorage 中获取/设置/移除 token（`AuthorizationApp` 键）。
- API 模块位于 `src/apis/`，各模块从 `$axios` 引入，遵循模式：`export const someApi = (params) => $axios.get/post('/path', params)`。

### 认证与权限

- **登录**：通过 `config/app.ts` → `getAppUrl()` 跳转微信 OAuth2 授权 → 回调获取 `code` → `qywxLogin()` 或 `postLogin()`（SM3 哈希密码）→ 将 token、userInfo、menuList、funcList、roleList、codeCombo 存入 sessionStorage。
- **权限控制**：`hasMenu(key)` 对照 sessionStorage 中的 `menuList` 校验（用于标签/菜单可见性）。`hasPermission(key)` 对照 `funcList` 校验（用于功能级访问控制）。
- **角色**：由 `roleId` 派生出三种角色 — `isMgr`（R302 管户人）、`isMarketers`（R666 营销人）、`isManager`（管理员）。

### 移动端适配

- `amfe-flexible` 根据视口宽度设置根字体大小。
- `postcss-pxtorem` 将 px 转换为 rem：Vant 组件使用 `rootValue: 37.5`，项目代码使用 `rootValue: 75`。
- `App.vue` 中处理可视视口高度，应对移动端键盘/webview 的兼容问题。

### 自动导入（Vite 插件）

- Vue 和 Vue Router API 自动导入（无需手动 `import { ref } from 'vue'`）。
- Vant 组件自动导入并按需 tree-shaking。
- `src/components/global/` 下的全局组件自动注册。
- 自动生成的类型声明文件：`auto-import.d.ts`、`components.d.ts`。

### Mock 系统

- `vite-plugin-mock` 仅在 `mode === 'mock'` 且 `command === 'serve'` 时启用。
- Mock 文件：`src/mock/api/<module>.ts`，通过 `src/mock/index.ts` 统一导出。

### 样式

- Less 预处理器，`global.less` 自动注入到每个组件中。
- `src/styles/variable.less` — 主题色、字号、Vant 灰色变量。
- 采用 BEM 命名规范，使用 class 级作用域（不使用 `scoped` 属性）。
- Vant 组件样式覆盖位于 `src/styles/vant-reset/`。

### 关键目录

| 目录                       | 用途                                                          |
| -------------------------- | ------------------------------------------------------------- |
| `src/views/`               | 顶层页面组件（login、home、cust、mkt、perf、user、not-found） |
| `src/sub-pages/`           | 子页面组件，按业务模块组织                                    |
| `src/router/auth-modules/` | 各业务模块的路由定义                                          |
| `src/apis/`                | API 函数，每个模块一个文件                                    |
| `src/hook/`                | 组合式函数（auth、企业微信、高德地图、缓存视图等）            |
| `src/components/`          | 共享组件；`global/` 子目录用于自动注册的组件                  |
| `src/layout/`              | 布局外壳（layout-box、nav-bar、bottom-bar）                   |
| `src/styles/`              | 全局 Less 样式、变量、Vant 覆盖样式                           |
| `src/config/`              | 应用配置（高德地图 key、OAuth URL 构建器）                    |
| `src/mock/`                | Mock API 响应数据                                             |
| `src/utils/`               | 工具函数（树形转换、金额转换、剪贴板）                        |

### 命名规范

- 页面入口文件：`/菜单名/v-index.vue`
- 组件文件：kebab-case
- 变量：camelCase，常量：UPPER_CASE
- CSS：BEM（`.block__element--modifier`），优先使用 class 级作用域而非 `scoped` 属性
- 私有属性：`$_namespace_` 前缀模式
