import { EChartsType, getInstanceByDom, init } from 'echarts';

export default function (element: any, theme?: any) {
  // 获取图表实例对象
  let instance: EChartsType = getInstanceByDom(element) as EChartsType;

  // 实例不存在，则初始化
  if (!instance) {
    instance = init(element, theme, { renderer: 'svg' });
  }

  /**
   * 设置图表实例的配置项
   * @param options - ECharts的配置项，用于定制图表的展示和行为
   * 此函数的作用是外部可以动态设置图表配置，以达到更新图表的目的
   */
  const setOptions = function (options: any) {
    instance.setOption(options);
  };

  /**
   * 订阅指定事件的回调函数
   *
   * 此函数用于向某个实例订阅一个特定事件，当该事件被触发时，所提供的回调函数将会被调用
   * 它是事件驱动编程模式的一个关键部分，允许代码在特定条件得到满足时（事件触发）自动执行响应操作
   *
   * @param {string} event - 要订阅的事件名称，用于指定哪种事件触发时调用回调函数
   * @param {any} callback - 当指定事件被触发时要调用的回调函数，执行具体的响应操作
   */
  const on = function (event: string, callback: any) {
    instance.on(event, callback);
  };

  /**
   * 添加窗口大小调整事件监听器
   * 该函数通过监听窗口大小变化事件，调用实例的resize方法来响应大小调整
   */
  const addResizeListener = function () {
    window.addEventListener('resize', resize);
  };
  /**
   * 移除窗口大小调整事件的监听。
   * 该函数主要用于在适当的时候释放资源，比如组件卸载时。
   */
  const removeResizeListener = function () {
    window.removeEventListener('resize', resize);
  };

  // 手动RESIZE
  const resize = function () {
    if (element?.clientHeight !== 0) {
      instance.resize();
    }
  };

  // 手动销毁
  const dispose = function () {
    if (instance) {
      instance.clear();
      instance.dispose();
      instance = null;
    }
  };

  return {
    setOptions,
    on,
    addResizeListener,
    removeResizeListener,
    resize,
    dispose,
  };
}

/**
 * REM适配
 * @param {number} size - 转换的大小
 */
export const autoRem = (size: number) => {
  const designWidth = 750; // 设计稿宽度
  const screenWidth = document.documentElement.clientWidth; // 当前屏幕宽度
  const newFontSize = parseFloat((size * (screenWidth / designWidth)).toFixed(2));
  return newFontSize;
};

export const getCoords = (index: number) => {
  // 计算层级
  const level = Math.floor(index / 4) + 1;
  // 计算当前象限位置
  const postions = index % 4;
  // 根据位置生成坐标
  switch (postions) {
    case 0:
      return { x: level, y: level };
    case 1:
      return { x: level, y: -level };
    case 2:
      return { x: -level, y: -level };
    case 3:
      return { x: -level, y: level };
    default:
      throw new Error('Invalid position');
  }
};

// 自定义主题色
export const customTheme = {
  color: [
    '#FF8812', // 橙
    '#1F98FF', // 蓝
    '#FF6A52', // 红
    '#FAB728', // 黄
    '#43BB67', // 绿
    '#0D8C8C', // 深绿
    '#1374B2', // 深蓝
    '#9A60B4', // 紫
    '#EA7CCC', // 粉
  ],
};
