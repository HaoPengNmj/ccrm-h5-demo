import { constRouters } from '@/router/constant-modules';

// 白名单
const whiteList = ['login', 'not-found'];
// 基础页
const baseViews = constRouters.map((e) => ({ name: e.name, fullPath: e.path, isKeepAlive: e.meta.isKeepAlive }));
// 缓存列表
const cachedViews = ref([] as any[]);

// 获取缓存视图信息
export const getCachedViewsName = computed(() => {
  return cachedViews.value.filter((e) => e.isKeepAlive).map((e) => e.name) || [];
});

/**
 * 向缓存视图数组中添加视图信息
 * 如果已存在相同名称和路径的视图，则移除该视图后面的所有视图；如果不存在，则添加该视图
 *
 * @param name 视图的名称
 * @param fullPath 视图的完整路径
 * @returns 返回更新后的缓存视图数组
 */
export const updateCacheViews = (name: string, fullPath: string, isKeepAlive: boolean) => {
  // 如果name在白名单内，直接return
  if (whiteList.includes(name)) return;

  // 如果回到基础页，丢弃所有非基础页，直接返回基础页列表
  if (baseViews.map((e) => e.name).includes(name)) {
    cachedViews.value = [...baseViews];
    return cachedViews.value;
  }

  // 查找已存在相同名称和路径的视图的索引
  const index = cachedViews.value.findIndex((e) => e.name === name && e.fullPath === fullPath);

  // 如果找到了相同的视图，则移除该视图后面的所有视图
  if (index !== -1) cachedViews.value.splice(index + 1, cachedViews.value.length - index);
  // 如果不存在相同的视图，则添加该视图到缓存视图数组
  else cachedViews.value.push({ name, fullPath, isKeepAlive });

  // 返回更新后的缓存视图数组
  return cachedViews.value;
};
export const setPositions = (name: string, fullPath: string) => {
  let layout = document.getElementById('layout-box-main');
  const _tmp = cachedViews.value.find((e) => e.name === name && e.fullPath === fullPath);
  if (layout && _tmp) {
    _tmp.scrollTop = layout.scrollTop;
  }
};
export const getPositions = (name: string, fullPath: string) => {
  let layout = document.getElementById('layout-box-main');
  const _tmp = cachedViews.value.find((e) => e.name === name && e.fullPath === fullPath);
  if (layout) {
    layout.scrollTop = _tmp?.scrollTop || 0;
    delete _tmp?.scrollTop;
  }
};
