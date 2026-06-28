<template>
  <van-dialog v-model:show="showMap" :title="title" show-confirm-button show-cancel-button @confirm="confirmAddress">
    <van-search id="autoSearch" v-model="searchValue" label="地点" placeholder="请输入搜索关键词" @search="mapSearchFn"></van-search>
    <div id="map-container"></div>
    <div id="map-panel" v-if="pois.length > 0 && showPois">
      <van-cell-group>
        <van-radio-group v-model="check" size="mini">
          <van-cell
            v-for="(item, index) in pois"
            :key="item.id"
            :title="item.address + '-' + item.name"
            clickable
            @click="selectedAddressFn(item)"
          >
            <template #right-icon>
              <van-radio :name="item.id" icon-size="20" />
            </template>
          </van-cell>
        </van-radio-group>
      </van-cell-group>
    </div>
  </van-dialog>
</template>
<script lang="ts" setup>
import { getSysConfig } from '@/apis/home';
import useAmap from '@/hook/use-amap-hook';
import { showToast } from 'vant';

const amap = useAmap({
  container: 'map-container',
  zoom: 19,
});

interface EmitsType {
  (e: 'update:modelValue', value: Boolean): void;
  (e: 'confirm', value: Object): void;
}
const emit = defineEmits<EmitsType>();

const props = defineProps({
  /**
   * v-model
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '获取定位',
  },
});

const amapSearchNearByRadius = ref(200);
const initData = async () => {
  const { code, data } = await getSysConfig({ configId: 'amapSearchNearByRadius' });
  if (code === 200 && data) {
    amapSearchNearByRadius.value = Number(data.configValue);
  }
};

const location = ref([]);
const searchValue = ref('');
const placeSearchInstance = ref();
const showPois = ref(false);
const pois = ref([]);
const check = ref();
// 地图展示
const showMap = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val: Boolean) => {
    emit('update:modelValue', val);
  },
});

watchEffect(() => {
  // 每次打开或关闭不展示Pois列表
  showPois.value = false;
  if (showMap.value) {
    initFn();
  }
});
// 初始化
const initFn = () => {
  searchValue.value = '';
  pois.value = [];
  check.value = '';
  nextTick(async () => {
    await amap.initAPI();
    await initPlaceInstance();
    if (navigator.userAgent.indexOf('wxwork') !== -1 || navigator.userAgent.indexOf('WXWork') !== -1) {
      // 企业微信
      (window as any).$qywx.getLocation((res) => {
        if (res?.errMsg === 'getLocation:ok' && !res.errmsg) {
          location.value = [res.longitude, res.latitude];
          initDefault(location.value);
        } else {
          console.log('定位失败 :>> ', res);
          showToast('定位失败');
        }
      });
    } else {
      // PC浏览器模拟
      amap.getPosition((position: [number, number]) => {
        location.value = position;
        initDefault(location.value);
      });
    }
  });
};
// 构造默认地址及默认坐标
const initDefault = (_location) => {
  amap.getAddress(_location, (address) => {
    pois.value.push({
      id: 'default',
      name: '',
      location: {
        lng: _location[0],
        lat: _location[1],
      },
      address: address,
    });
    check.value = 'default';

    amap.addInfoWindow(
      `<div style="background:#fff;padding:2vw;border-radius:2vw;width:50vw;"><strong>当前定位地址</strong>：<br/><span style="color:#666">${address}</span></div>`,
      _location
    );
    amap.addMarker({ position: _location });
    setTimeout(() => {
      amap.getInstance().setCenter(_location);
    }, 1000);
  });
};
// 初始化地点查询实例
const initPlaceInstance = () => {
  amap.getAPI().plugin(['AMap.PlaceSearch'], function () {
    let PlaceSearch = amap.getAPI().PlaceSearch;
    placeSearchInstance.value = new PlaceSearch({
      city: '佛山',
      citylimit: true,
      pageIndex: 1, // 页码
      pageSize: 10, // 单页显示结果条数
    });
  });
};
//构造地点查询类
const mapSearchFn = (e: any) => {
  placeSearchInstance.value.searchNearBy(searchValue.value, location.value, amapSearchNearByRadius.value, (status: any, result: any) => {
    console.log('searchNearBy :>> ', location.value, status, result);
    if (status === 'complete') {
      amap.getInstance().clearMap();
      pois.value = result.poiList.pois;
      pois.value.forEach((element) => {
        amap.addMarker({
          position: element.location,
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          extData: element,
        });
        amap.getInstance().setCenter(element.location);
      });
      showPois.value = true;
      amap.getInstance().setFitView([], false, [60, 60, 60, 60], 20);
    } else if (status === 'no_data') {
      showToast(`当前定位${amapSearchNearByRadius.value}米范围内无搜索结果`);
    }
  });
};
// 搜索结果-地址选择
const selectedAddressFn = (item: any) => {
  check.value = item.id;
  amap.getInstance().clearMap();
  let _tmp = null;
  pois.value.forEach((element) => {
    if (element.id !== check.value) {
      amap.addMarker({
        position: element.location,
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        extData: element,
      });
    } else {
      _tmp = element;
    }
  });
  if (_tmp) {
    amap.addMarker({ position: _tmp.location, extData: _tmp });
  }
};
// 确认地址
const confirmAddress = () => {
  let tmp = pois.value.find((item) => item.id === check.value);
  console.log('tmp :>> ', tmp);
  emit('confirm', tmp);
  showMap.value = false;
};

onMounted(() => {
  initData();
});
</script>
<style lang="less">
#map-container {
  width: 100%;
  height: 50vh;
}
#map-panel {
  position: absolute;
  bottom: 100px;
  right: 0px;
  height: 300px;
  background: @white;
  width: 80%;
  overflow: hidden;
  overflow-y: auto;
  // 加一个阴影效果
  box-shadow: 0px 0.03rem 0.27rem 0px rgba(0, 0, 0, 0.08);
  .van-cell {
    // padding: 10px;
  }
  .van-cell__title {
    font-size: @font-size-20;
    line-height: @font-size-24;
    padding-right: 10px;
  }
}
</style>
