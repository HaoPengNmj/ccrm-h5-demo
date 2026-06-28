import { autoRem } from '@/components/charts/charts-hook';
import { AMAP_KEY, AMAP_VERSION, GMAP_SECURITYJSCODE } from '@/config/app';
import AMapLoader from '@amap/amap-jsapi-loader';

/**
 * 创建一个防抖函数，用于限制函数的执行频率
 * 当防抖函数被连续调用时，只有在最后一次调用后的指定时间内没有再被调用，
 * 才会执行实际的函数调用这样可以优化频繁触发操作的性能
 *
 * @param func 要被防抖处理的函数
 * @param wait 在再次调用func之前的等待时间（毫秒）
 * @returns 返回一个新的防抖函数
 */
function debounce(func, wait) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}

interface PolygonOptions {
  text: string;
  path: number[][];
  textStyle: Object;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillColor?: string;
  fillOpacity?: number;
  zIndex?: number;
  bubble?: boolean;
  cursor?: string;
  draggable?: boolean;
  extData?: any;
  setCenter?: boolean;
}

const defaultCenter: [number, number] = [113.121586, 23.021351];
const defaultZoom = 15;
const maxZoom = 15;

interface AMapOptions {
  container: string; // 地图容器的 ID
  zoom?: number; // 初始缩放级别
  center?: [number, number]; // 初始中心点坐标，可选
}

const useAmap = (options: AMapOptions, autoInit?: boolean) => {
  // AMapLoader实例
  let AMap = null;
  // 地图实例
  let mapInstance = null;
  // 定位控件
  let geolocation = null;

  let mapReadyResolve: (value: void | PromiseLike<void>) => void;
  const mapReadyPromise = new Promise<void>((resolve) => {
    mapReadyResolve = resolve;
  });

  const ensureMapReady = async (callback: () => void) => {
    await mapReadyPromise;
    callback();
  };

  /**
   * 在地图上添加标记
   *
   * 此函数用于在给定的位置上添加一个标记到地图上它首先检查地图实例是否存在，
   * 然后创建一个新的标记对象，并将其添加到地图中
   *
   * @param position 标记的位置，由经度和纬度组成的数组
   */

  const addMarker = (
    param: { position: Number[]; label?: string; draggable?: boolean; icon?: string; extData?: object },
    callback?: Function
  ) => {
    ensureMapReady(() => {
      const icon = new AMap.Icon({
        size: [autoRem(36.42), autoRem(50)],
        imageSize: [autoRem(36.42), autoRem(50)],
        image: param.icon || '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
      });
      const marker = new AMap.Marker({
        position: param.position,
        icon: icon,
        draggable: param.draggable,
        offset: [0, autoRem(-20)],
        anchor: 'center',
        label: {
          content: param.label,
          offset: [autoRem(-25), autoRem(30)],
        },
        extData: param.extData,
      });
      if (callback) {
        marker.on(
          'click',
          debounce((val) => {
            callback(val);
          }, 300)
        );
      }
      mapInstance.add(marker);
    });
  };

  /**
   * 在地图上添加线
   *
   * 此函数用于在给定的路径上添加一条线到地图上。它首先检查地图实例是否存在，
   * 然后创建一个新的线对象，并将其添加到地图中。
   *
   * @param path 线的路径，由多个经纬度坐标点组成的数组
   * @param options 线的可选配置项
   */

  const addPolyline = (param: any) => {
    let bPoints =
      param?.path?.map((point: any) => {
        return new AMap.LngLat(Number(point[0]), Number(point[1]));
      }) || [];
    ensureMapReady(() => {
      const polyline = new AMap.Polyline({
        ...param,
        path: bPoints,
        strokeWeight: autoRem(15), // 线宽
        strokeOpacity: 1, // 线透明度
        strokeColor: param.strokeColor || '#ff8812', // 线颜色，默认黑色
        lineJoin: 'round',
        lineCap: 'round',
      });
      mapInstance.add(polyline);
    });
  };

  /**
   * 在地图上添加多边形
   *
   * 此函数用于在给定的路径上添加一个多边形到地图上。它首先检查地图实例是否存在，
   * 然后创建一个新的多边形对象，并将其添加到地图中
   *
   * @param path 多边形的路径，由多个经纬度坐标点组成的数组
   * @param options 多边形的可选配置项
   */

  const addPolygon = (param: PolygonOptions, callback?: Function) => {
    let bPoints = [] as any;
    let x = 0;
    let y = 0;
    param.path?.forEach((point: any) => {
      bPoints.push(new AMap.LngLat(Number(point[0]), Number(point[1])));
      x += Number(point[0]);
      y += Number(point[1]);
    });
    ensureMapReady(() => {
      const polygon = new AMap.Polygon({
        ...param,
        path: bPoints,
        strokeWeight: autoRem(2), //边界宽度
        strokeOpacity: 1, //边界透明度
        fillOpacity: 0.2, //填充透明度
      });
      const point = new AMap.LngLat(x / param.path.length, y / param.path.length);
      if (param.setCenter) {
        mapInstance.setZoomAndCenter(maxZoom, point);
      }
      if (param.text !== '') {
        createLabel(param.text, point, param.textStyle);
      }
      if (callback) {
        polygon.on(
          'click',
          debounce((val) => {
            callback(val);
          }, 300)
        );
      }
      mapInstance.add(polygon);
    });
  };

  /**
   * 创建地图标签
   *
   * 此函数用于在地图上创建并添加一个标签通过AMap.Text创建一个文本overlay，
   * 并将其添加到地图实例中主要参数包括文本内容、位置、样式和显示的层级范围
   *
   * @param text 文本内容，表示要在地图上显示的标签文字
   * @param point 标签创建的位置，用于指定文本在地图上的坐标
   * @param style 标签的样式，用于定制文本的外观，如颜色、字体等
   * @param zooms 文本显示的层级范围，默认为[10, 15]，用于指定在哪些缩放级别下显示文本
   * @returns 返回创建的AMap.Text实例，以便于进一步操作或引用
   */
  const createLabel = (
    text: string, //文本
    point: any, //文本创建点
    style: any, //文本HTMLElement的样式
    zooms = [10, 50] //文本显示的层级范围
  ) => {
    const overlayLabel = new AMap.Text({
      position: point,
      text: text,
      style: {
        ...style,
        border: 0,
        borderRadius: `${autoRem(10)}px`, //边框圆角
        padding: `${autoRem(6)}px ${autoRem(10)}px`, //文本离上下左右距离
        fontSize: `${autoRem(24)}px`, //文本大小
      },
      zooms: zooms,
    });
    mapInstance.add(overlayLabel);
    return overlayLabel;
  };

  /**
   * 向地图添加信息窗口。
   *
   * 当地图实例存在时，此函数会在地图中心位置创建并打开一个信息窗口。
   * 信息窗口的内容由参数 content 指定。
   *
   * @param {string} content - 信息窗口的内容
   */
  const addInfoWindow = (content: string, center) => {
    ensureMapReady(() => {
      const infoWindow = new AMap.InfoWindow({
        content: content,
        isCustom: true, // 使用自定义内容
        offset: [0, autoRem(-50)],
      });
      infoWindow.open(mapInstance, center);
    });
  };

  /**
   * 获取当前地理位置
   * @param callback 回调函数，接收一个表示当前位置的坐标数组
   */
  const getPosition = (callback: (position: [number, number]) => void) => {
    geolocation?.getCurrentPosition((status: string, result: any) => {
      let position: [number, number] = defaultCenter; // 默认：广东省佛山市
      if (status === 'complete') {
        position = [result.position?.lng || result.position?.[0], result.position?.lat || result.position?.[1]];
      }
      console.info('AMap.Geocoder[getCurrentPosition]:', status, result, position);
      callback(position);
    });
  };
  /**
   * 根据地理坐标获取地址信息
   * @param position 地理坐标，包括经纬度
   * 该函数使用高德地图的Geocoder服务，将地理坐标转换为人类可读的地址信息
   * 如果转换成功，它将打印出地址信息并返回详细的地址字符串如果失败，它将打印出错误信息
   */
  const getAddress = (position, callback) => {
    ensureMapReady(() => {
      AMap.plugin(['AMap.Geocoder'], () => {
        new AMap.Geocoder().getAddress(position, (status, result) => {
          console.info('AMap.Geocoder[getAddress]:', status, result);
          if (status === 'complete' && result.info === 'OK') {
            callback(result.regeocode.formattedAddress);
          } else {
            callback(null);
          }
        });
      });
    });
  };
  /**
   * 根据输入的关键词进行地图自动补全和地点搜索
   * 此函数旨在通过高德地图API实现地址的自动补全以及地点的详细信息搜索
   * @param inputKey 输入的关键词，用于自动补全
   */
  const autoComplete = (param?: { mapClickFn?: Function; callback?: Function; markParam?: object }) => {
    ensureMapReady(() => {
      AMap.plugin(['AMap.AutoComplete', 'AMap.PlaceSearch'], function () {
        const auto = new AMap.AutoComplete({
          input: 'autoSearch',
          city: '佛山',
        });
        const placeSearch = new AMap.PlaceSearch({
          city: '佛山',
          citylimit: true,
          pageSize: 1,
        }); //构造地点查询类
        const searchFn = (e: any) => {
          mapInstance.clearMap();
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name, (status: any, result: any) => {
            console.log('构造地点查询类[result] :>> ', result);
            var pois = result.poiList.pois;
            pois?.forEach((element) => {
              console.log('地点查询 :>> ', element);
              addMarker({ position: element.location, ...param?.markParam, extData: element }, param?.mapClickFn);
              mapInstance.setZoomAndCenter(maxZoom, element.location);
            });
            if (param?.callback) {
              param?.callback();
            }
          });
        };
        auto.on('select', searchFn);
      });
    });
  };

  /**
   * 初始化地图实例
   *
   * 此函数负责创建一个地图实例，并设置其初始位置和缩放级别
   * 它接受一个中心点坐标数组作为参数，用于确定地图的中心位置
   *
   * @param center 一个包含经度和纬度的数组，用于设置地图的中心点
   */
  const initMapInstance = (center: [number, number]) => {
    const amap = new AMap.Map(options.container, {
      viewMode: '2D', //设置地图模式
      zoom: options.zoom || defaultZoom,
      center: center,
    });
    mapInstance = amap;

    // 定位控件
    mapInstance.addControl(geolocation);

    // 缩放控件
    const toolBar = new AMap.ToolBar({
      position: 'RT',
    });
    mapInstance.addControl(toolBar);

    // addMarker(center);
  };
  /**
   * 初始化高德地图
   * 该函数负责加载高德地图的JS API，并初始化地图实例
   * 如果没有提供中心点坐标，将尝试获取当前地理位置作为中心点
   */
  const initAPI = async (_center?: [number, number]) => {
    try {
      // 配置高德地图的安全码
      (window as any)._AMapSecurityConfig = {
        securityJsCode: GMAP_SECURITYJSCODE,
      };

      // 加载高德地图的JS API
      AMap = await AMapLoader.load({
        key: AMAP_KEY,
        version: AMAP_VERSION,
        plugins: ['AMap.ToolBar', 'AMap.Geolocation'],
      });

      // 初始化定位插件
      geolocation = new AMap.Geolocation({
        timeout: 10000, // 定位的超时时间，毫秒
        maximumAge: 5 * 60 * 1000, // 浏览器原生定位的缓存时间，毫秒

        enableHighAccuracy: true, // 进行浏览器原生定位的时候是否尝试获取较高精度，可能影响定位效率
        GeoLocationFirst: true, // 优先使用H5定位，默认移动端为true，PC端为false
        noIpLocate: 0, // 是否禁用IP精确定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
        noGeoLocation: 0, // 是否禁用浏览器原生定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用

        convert: true, // 是否将定位结果转换为高德坐标
        panToLocation: true, // 定位成功后是否自动移动到响应位置
        zoomToAccuracy: true, // 定位成功后是否自动调整级别
        getCityWhenFail: true, // 定位失败之后是否返回基本城市定位信息

        showButton: true, // 是否显示定位按钮
        position: 'LB', //定位按钮的位置
        showCircle: false, // 是否显示定位精度圆
        showMarker: false, // 是否显示定位点
      });

      let center = _center || options.center || defaultCenter;

      initMapInstance(center);
      mapReadyResolve(); // 地图初始化完成
    } catch (e) {
      console.error('高德地图 JS API 加载失败:', e);
    }
  };

  /**
   * 生命周期
   */
  onMounted(() => {
    if (autoInit) {
      initAPI();
    }
  });
  onUnmounted(() => {
    if (mapInstance) {
      console.log('mapInstance.destroy :>> ', '地图正在销毁...');
      mapInstance.destroy();
    }
  });

  return {
    initAPI,
    initMapInstance,

    getAPI: () => AMap,
    getInstance: () => mapInstance,

    addMarker,
    addPolyline,
    addPolygon,
    addInfoWindow,

    getPosition,
    getAddress,
    autoComplete,

    ensureMapReady,
  };
};

export default useAmap;
