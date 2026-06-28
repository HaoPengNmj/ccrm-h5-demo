/**
 * storage 存储相关操作
 */
//设置缓存
export const setStorage = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data))
}
// 获取缓存
export const getStorage = (key: string): any => {
  let list = sessionStorage.getItem(key);
  if (list === "undefined" || !list) {
    return ''
  }
  return JSON.parse(list)
}
// 删除某一缓存
export const deleteStorage = (key: string) => {
  sessionStorage.removeItem(key)
}
//清除缓存
export const clearStorage = () => {
  sessionStorage.clear();
}
