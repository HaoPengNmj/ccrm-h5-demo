import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

import { VantResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';
import { viteVConsole } from 'vite-plugin-vconsole';
import { viteMockServe } from 'vite-plugin-mock';
import legacy from '@vitejs/plugin-legacy';

/**
 * 创建自动导入插件配置
 * @returns {Object} AutoImport 插件配置
 */
const createAutoImport = () => {
  return AutoImport({
    imports: ['vue', 'vue-router'], // 指定要自动导入的包
    dts: './auto-import.d.ts', // 生成 TypeScript 类型声明文件
    resolvers: [VantResolver()], // 解析 Vant 组件

    // 配置 ESLint，避免未声明的全局变量警告
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true,
    },
  });
};

/**
 * 创建自动注册组件插件配置
 * @returns {Object} Components 插件配置
 */
const createComponents = () => {
  return Components({
    dts: true, // 生成 TypeScript 类型声明文件
    dirs: ['src/components/global'], // 指定组件目录
    resolvers: [VantResolver()],
  });
};

/**
 * 创建按需加载 Vant 样式的插件配置
 * @returns {Object} StyleImport 插件配置
 */
const createStyles = () => {
  return createStyleImportPlugin({
    resolves: [VantResolve()],
    libs: [
      {
        libraryName: 'vant',
        esModule: true,
        // 根据组件名称动态返回样式文件路径
        resolveStyle: (name) => {
          const mapList = [
            { type: 'toast', list: ['show-toast', 'show-loading-toast'] },
            { type: 'dialog', list: ['show-dialog', 'show-confirm-dialog'] },
            { type: 'notify', list: ['show-notify'] },
            { type: 'image-preview', list: ['show-image-preview'] },
          ];
          const _list = mapList.find((k) => k.list.includes(name));
          return _list ? `../es/${_list.type}/style/index` : `../es/${name}/style/index`;
        },
      },
    ],
  });
};

// 开发环境插件配置信息
const plugins_dev = [
  vue(),
  createComponents(),
  createAutoImport(),
  createStyles(),
  legacy({
    targets: ['defaults', 'not IE 11'],
  }),
];

// Vite 配置函数
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    // 配置 Less 预处理器
    css: {
      preprocessorOptions: {
        less: {
          // 启用 JavaScript 支持
          javascriptEnabled: true,
          // 全局导入 Less 文件
          additionalData: `@import "${resolve(__dirname, 'src/styles/global.less')}";`,
        },
      },
    },
    // 插件列表
    plugins: [
      viteMockServe({
        mockPath: './src/mock', // 指定mock文件的目录
        watchFiles: true, // 监听文件变化
        logger: true, // 输出日志
        enable: mode === 'mock' && command === 'serve', // 启用mock功能
        cors: true, // 开启CORS支持
      }),
      viteVConsole({
        entry: resolve('./src/main.ts'), // 指定入口文件
        localEnabled: true,
        enabled: mode !== 'prod', // 在生产环境中禁用
        config: {
          log: {
            maxLogNumber: 1000, // 最大日志数量
          },
          theme: 'light', // 主题
        },
      }),
      ...plugins_dev,
    ],
    // 基础路径
    base: './',
    // 路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    // 注入全局变量
    define: {
      'process.env': {},
    },
    // 服务器配置
    server: {
      open: false, // 不自动打开浏览器
      host: '0.0.0.0', // 监听所有 IP 地址
      port: 8088, // 端口号
      strictPort: false, // 如果端口被占用，自动寻找下一个可用端口
      cors: true, // 启用 CORS
      proxy:
        command === 'serve'
          ? {
              '/dmp-api': {
                target: env.VITE_APP_TARGET_API, // 代理的目标地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dmp-api/, ''), // 重写请求路径
              },
              '/wwopen': {
                target: 'https://open.work.weixin.qq.com', // 代理的目标地址
                changeOrigin: true,
              },
            }
          : {},
    },
    // 构建配置
    build: {
      // chunk 大小警告阈值
      chunkSizeWarningLimit: 3000,
      cssCodeSplit: false, // css样式是否分割;  todo:分割导致prod生成包部分样式丢失
    },
  });
};
