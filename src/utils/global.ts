import html2canvas from 'html2canvas';
import { showDialog } from 'vant';
import { showToast } from 'vant';
let isWXWork = navigator.userAgent.indexOf('wxwork') !== -1 || navigator.userAgent.indexOf('WXWork') !== -1;

/**
 * 表单重置
 * @param obj 表单对象
 * @returns
 */
export const resetFields = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    switch (Object.prototype.toString.call(obj[key])) {
      case '[object Number]': {
        obj[key] = 0;
        break;
      }
      case '[object String]': {
        obj[key] = '';
        break;
      }
      case '[object Boolean]': {
        obj[key] = false;
        break;
      }
      case '[object Object]': {
        obj[key] = {};
        break;
      }
      case '[object Array]': {
        obj[key] = [];
        break;
      }
      default: {
        obj[key] = null;
      }
    }
  });
};

/**
 * 检查对象至少有一个值不为空
 * @param obj
 * @returns
 */
export const hasAllPropertiesValues = (obj: any) => {
  return Object.values(obj).some((value) => {
    return value != undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
  });
};

/**
 * rem字体转换大小
 * @param html
 * @returns
 */
export const convertFontSizeToRem = (html: string) => {
  if (!html) {
    return html;
  }
  const regex = /font-size:\s*(\d+)px/g;
  return html.replace(regex, (match, fontSize) => {
    const rem = parseFloat(fontSize) / 37.5;
    return `font-size: ${rem}rem`;
  });
};

/**
 * 数据分组
 * @param list 列表
 * @param _num 个数
 * @returns
 */
export const create2DArray = (list: Array<any>, _num: number) => {
  let index = 0;
  let newList = [];
  if (list && list.length) {
    while (index < list.length) {
      newList.push(list.slice(index, (index += _num)));
    }
  }
  return newList;
};
/**
 * 金额单位转换 元，万元，亿元 统一保留2位小数
 * @param num 待转换数字，flag标志  true时为元转万，万转亿 false时相反
 * @return
 */
export const amountUnitConvert = (num: number | string, flag: boolean = true) => {
  if (num === 0) {
    return (0).toFixed(2);
  }
  if (!num) return '--';
  let _num = flag ? Number(num) / 10000 : Number(num) * 10000;
  return _num.toFixed(2);
};

/**
 * iosAndroidFn 判断是ios或者Android
 */
export const iosAndroidFn = () => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //这里是Android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //这里是ios终端
  if (isAndroid) {
    return 'Android';
  } else if (isIOS) {
    return 'IOS';
  }
};

/**
 * @description: 列表转为树
 * @param {$list} 传入的列表
 * @return {*}
 */
export const ListToTree = ($list: TreeType.nodeTreeItem[]): TreeType.nodeTreeItem[] => {
  const _treeData: TreeType.nodeTreeItem[] = [],
    map: TreeType.MapType = {};
  $list.forEach((item: TreeType.nodeTreeItem) => {
    item.children = [];
    map[item.id] = item;
  });
  $list.forEach((item) => {
    let parent = map[item.parentId as string];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      _treeData.push(item);
    }
  });
  return _treeData;
};
/**
 * @description: 树转为列表
 * @param {$tree} 传入的树
 * @return {*}
 */
export const treeToList = ($tree: TreeType.nodeTreeItem[]): TreeType.nodeTreeItem[] => {
  let _queen: TreeType.nodeTreeItem[] = [];
  const _out: TreeType.nodeTreeItem[] = [];
  _queen = _queen.concat($tree);
  while (_queen.length) {
    const _first = _queen.shift();
    if (_first && _first.children) {
      _queen = _queen.concat(_first.children);
      delete _first.children;
    }
    _out.push(_first as TreeType.nodeTreeItem);
  }
  return _out;
};
/**
 * @description: 树结构模糊查询
 * @param {$tree} 传入的树
 * @param {searchText} 关键字
 * @return {*}
 */
export const searchTreeNodes = ($tree: TreeType.nodeTreeItem[], searchText: string): TreeType.nodeTreeItem[] => {
  const result: TreeType.nodeTreeItem[] = [];
  const searchWords = searchText.toLowerCase().split(/\s+/);
  const search = (nodes: TreeType.nodeTreeItem[]) => {
    nodes.forEach((node) => {
      // 检查当前节点是否匹配搜索条件
      const matches = searchWords.every((word) => node.name.toLowerCase().includes(word));
      if (matches) {
        result.push(node);
      }
      // 递归子节点
      if (node.children && node.children.length > 0) {
        search(node.children);
      }
    });
  };
  search($tree);
  return result;
};
/**
 * @description: 树结构模糊查询
 * @param {$tree} 传入的树
 * @param {searchText} 关键字
 * @return {*}
 */
export const searchIncludeParent = ($tree: TreeType.nodeTreeItem[], searchText: string): TreeType.nodeTreeItem[] => {
  const searchWords = searchText.toLowerCase().split(/\s+/);
  const dfs = (nodes: TreeType.nodeTreeItem[]): TreeType.nodeTreeItem[] => {
    return nodes
      .map((node) => ({
        ...node,
        open: true,
        children: node.children && node.children.length ? dfs(node.children) : [],
      }))
      .filter((node) => searchWords.every((word) => node.name.toLowerCase().includes(word)) || (node.children && node.children.length > 0));
  };
  return dfs($tree);
};

/**
 * 数组转键值对
 * @description: 接收一个数组,遍历数组，将数组转成键值对的对象，key为item.id，值为item.name
 * @param {arr} 数组
 * @return {*}
 */
export const arrayToMap = (arr: any[]) => {
  let map: TreeType.MapType = {};
  arr.forEach((item) => {
    map[item.id] = item;
  });
  return map;
};

/**
 * 字符串转数组
 * @param val
 * @returns
 */
export const splitFn = (val: string) => {
  if (!val) return [];
  return val.split(',');
};

// 捕获并渲染图像
export const downloadScreen = (el, fileName: string) => {
  if (!el) return;

  return html2canvas(el, {
    width: el.offsetWidth,
    height: el.offsetHeight,
    scale: 2,
    useCORS: true,
    allowTaint: true,
  }).then((canvas) => {
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  });
};
/**
 * 复制到剪贴板
 * @param text
 * @returns
 */
export async function copyToClipboard(text: string) {
  if (isWXWork) {
    (window as any).$qywx.setClipboardData(text);
  } else {
    try {
      await navigator.clipboard.writeText(text);
      showToast('已复制到剪贴板');
    } catch (error) {
      console.error('Copy failed:', error);
      fallbackCopy(text);
    }
  }
}
// 尝试使用兼容性更好的execCommand方案
function fallbackCopy(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('已复制到剪贴板');
  } catch (err) {
    showToast('复制失败');
    console.error('Fallback copy failed:', err);
  }
  document.body.removeChild(textArea);
}
