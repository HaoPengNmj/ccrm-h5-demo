import { getBranchList, getAreaList, getGridList, getUnitList, getOutletList, getFormatList, getPlaceList } from '@/apis/map';
import { autoRem } from '@/components/charts/charts-hook';

export const styleMap = {
  //网格支行边界 样式
  branchStyle: {
    style: {
      strokeColor: '#FF0088', //边界颜色
      fillColor: '#FF44AA', //填充颜色
    },
    textStyle: {
      backgroundColor: '#DC143C', //文本的背景颜色
      color: '#ffffff', //文本颜色
    },
  },
  areaStyle: {
    style: {
      strokeColor: '#3a2ef7', //边界颜色
      fillColor: '#cbb8eb', //填充颜色
    },
    textStyle: {
      backgroundColor: '#3a2ef7', //文本的背景颜色
      color: '#ffffff', //文本颜色
    },
  },
  formatStyle: {
    style: {
      strokeColor: '#eff32e',
      fillColor: '#bbcb93',
    },
    textStyle: {
      backgroundColor: '#3CB371', //文本的背景颜色
      color: '#ffffff', //文本颜色
    },
  },
  gridStyle: {
    style: {
      strokeColor: '#228B22',
      fillColor: '#98FB98',
    },
    textStyle: {
      backgroundColor: '#228B22', //文本的背景颜色
      color: '#ffffff', //文本颜色
    },
  },
  unitStyle: {
    style: {
      strokeColor: '#ea8d30',
      fillColor: '#d7b567',
    },
    textStyle: {
      backgroundColor: '#ea8d30', //文本的背景颜色
      color: '#ffffff', //文本颜色
    },
  },
};

/**
 * 支行边界
 * @param searchParams: 查询参数
 * @param zIndex: 覆盖物层级等级-高德用
 * @return
 */
export const queryBranchData = async (searchParams, zIndex = 10) => {
  const { data } = await getBranchList({
    subbrName: searchParams,
  });
  let defaultPolygons = data.map((e: any) => {
    return {
      text: e.subbrOrgName,
      path: e.info.map((p: any) => [p.subbrLng, p.subbrLat]),
      extData: e,
      zIndex,
      textStyle: styleMap.branchStyle.textStyle,
      ...styleMap.branchStyle.style,
    };
  });
  return defaultPolygons;
};

/**
 * 片区边界
 * @param searchParams: 查询参数
 * @param zIndex: 覆盖物层级等级-高德用
 * @return
 */
export const queryAreaData = async (searchParams, zIndex = 10) => {
  const { data } = await getAreaList({
    areaOrgName: searchParams,
  });
  let defaultPolygons = data.map((e: any) => {
    return {
      text: e.areaOrgName,
      path: e.info.map((p: any) => [p.areaLng, p.areaLat]),
      extData: e,
      zIndex,
      textStyle: styleMap.areaStyle.textStyle,
      ...styleMap.areaStyle.style,
    };
  });
  return defaultPolygons;
};

/**
 * 业态区域
 * @param searchParams: 查询参数
 * @param zIndex: 覆盖物层级等级-高德用
 * @return
 */
export const queryFormatData = async (searchParams, zIndex = 10) => {
  const { data } = await getFormatList({
    gbusiName: searchParams,
  });
  let defaultPolygons = data.map((e: any) => {
    return {
      text: e.gbusiName,
      path: e.info.map((p: any) => [p.gbusiLng, p.gbusiLat]),
      extData: e,
      zIndex,
      textStyle: styleMap.formatStyle.textStyle,
      ...styleMap.formatStyle.style,
    };
  });
  return defaultPolygons;
};

/**
 * 单元区域
 * @param searchParams: 查询参数
 * @param zIndex: 覆盖物层级等级-高德用
 * @return
 */
export const queryUnitData = async (searchParams, zIndex = 10) => {
  const { data } = await getUnitList({
    unitName: searchParams,
  });
  let defaultPolygons = data.map((e: any) => {
    return {
      text: e.unitName,
      path: e.info.map((p: any) => [p.unitLng, p.unitLat]),
      extData: e,
      zIndex,
      textStyle: styleMap.unitStyle.textStyle,
      ...styleMap.unitStyle.style,
    };
  });
  return defaultPolygons;
};

/**
 * 网格区域
 * @param searchParams: 查询参数
 * @param zIndex: 覆盖物层级等级-高德用
 * @return
 */
export const queryGridData = async (searchParams, zIndex = 10) => {
  const { data } = await getGridList({
    gorgName: searchParams,
  });
  let defaultPolygons = data.map((e: any) => {
    return {
      text: e.gorgOrgName,
      path: e.info.map((p: any) => [p.gorgLng, p.gorgLat]),
      extData: e,
      zIndex,
      textStyle: styleMap.gridStyle.textStyle,
      ...styleMap.gridStyle.style,
    };
  });
  return defaultPolygons;
};

/**
 * 网点
 * @returns
 */
export const queryOutletData = async () => {
  const { data } = await getOutletList({});
  return data;
};
