import VConsole from 'vconsole';

/**
 * 功能：向VConsole添加自定义插件
 * 描述：此函数创建并注册一个VConsole插件，提供刷新页面与清空控制台的功能。
 * console.log("[1]",xxx)可将xxx输出到该面版中
 */
export const addVConsolePlugin = () => {
  const vc = VConsole.instance;

  if (!vc) return;

  const myPlugin = new VConsole.VConsoleLogPlugin('1', '我的面板');

  myPlugin.on('addTool', (callback) => {
    const button1 = {
      name: '刷新页面',
      onClick: () => location.reload(),
    };

    const button2 = {
      name: 'clear',
      onClick: () => console.clear(),
    };

    callback([button1, button2]);
  });

  vc.addPlugin(myPlugin);
};
