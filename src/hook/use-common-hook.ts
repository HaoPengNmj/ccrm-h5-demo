import { getStorage } from '@/storage/storage';

/**
 * @description: 拥有查看该模块的权限
 * @param {$list} 传入的列表
 * @return {*}
 */
export const hasPermission = ($key: string) => {
  let flag = false;
  const powerList = getStorage('funcList');
  if (powerList && powerList.length) {
    flag = powerList.includes($key);
  }
  return flag;
};

/**
 * @description: 拥有查看该菜单的权限
 * @param {$list} 传入的列表
 * @return {*}
 */
export const hasMenu = ($key: string) => {
  let flag = false;
  const powerList = getStorage('menuList');
  if (powerList && powerList.length) {
    flag = powerList.includes($key);
  }
  return flag;
};
