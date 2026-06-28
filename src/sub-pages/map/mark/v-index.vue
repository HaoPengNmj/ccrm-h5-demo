<!--
 * @desc: 营销地图-客户标注
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-12-30 16:01:56
-->
<template>
  <van-search
    v-model="searchParams"
    shape="round"
    :id="currentAction.value === '1' ? '' : 'autoSearch'"
    :placeholder="currentAction.value === '1' ? '客户名称/客户号' : '请输入搜索关键词'"
    @search="onSearch"
  >
    <!-- 搜索类型 -->
    <template #left>
      <van-popover v-model:show="showPopover" :actions="actions" placement="bottom-start" close-on-click-action @select="onPopoverChange">
        <template #reference>
          <span class="search-icon">
            {{ currentAction.text }}
            <van-icon name="arrow-down"></van-icon>
          </span>
        </template>
      </van-popover>
    </template>
  </van-search>
  <div id="map-container"></div>

  <!-- 查询地点面板 -->
  <van-action-sheet v-model:show="showPlacePanel" :closeable="false">
    <div class="action-sheet-content">
      <div class="header">
        <span class="title">{{ placeInfo?.name || placeInfo?.custName || placeInfo?.companyName }}</span>
        <van-button type="primary" size="small" style="white-space: nowrap" @click="openMarkPanel">客户标注</van-button>
      </div>
      <div class="body">{{ placeInfo.address }}</div>
    </div>
  </van-action-sheet>

  <!-- 客户标注操作面板 -->
  <dadp-full-screen v-if="showMarkPanel" v-model="showMarkPanel" title="客户标注">
    <van-tabs v-model:active="activeTab">
      <van-tab title="已标注">
        <marked-list
          v-if="activeTab === 0"
          :data="{
            markLng: placeInfo.markLng,
            markLat: placeInfo.markLat,
          }"
        ></marked-list>
      </van-tab>
      <van-tab title="个人存客">
        <person-list
          v-if="activeTab === 1"
          :data="{
            markLng: placeInfo.markLng,
            markLat: placeInfo.markLat,
            markAddr: placeInfo.address,
          }"
        ></person-list>
      </van-tab>
      <van-tab title="个人潜客">
        <person-list-epq
          v-if="activeTab === 2"
          :data="{
            markLng: placeInfo.markLng,
            markLat: placeInfo.markLat,
            markAddr: placeInfo.address,
          }"
        ></person-list-epq>
      </van-tab>
      <van-tab title="公司存客">
        <company-list
          v-if="activeTab === 3"
          :data="{
            markLng: placeInfo.markLng,
            markLat: placeInfo.markLat,
            markAddr: placeInfo.address,
          }"
        ></company-list>
      </van-tab>
      <van-tab title="公司潜客">
        <company-list-epq
          v-if="activeTab === 4"
          :data="{
            markLng: placeInfo.markLng,
            markLat: placeInfo.markLat,
            markAddr: placeInfo.address,
          }"
        ></company-list-epq>
      </van-tab>
    </van-tabs>
  </dadp-full-screen>
</template>
<script lang="ts" setup>
import dadpFullScreen from '@/components/dadp-ui/dadp-full-screen.vue';
import markedList from './components/marked-list.vue';
import personList from './components/person-list.vue';
import personListEpq from './components/person-list-epq.vue';
import companyList from './components/company-list.vue';
import companyListEpq from './components/company-list-epq.vue';

import PCustEpqIcon from '@/assets/images/map/PCustEpqIcon.png';
import PCustIcon from '@/assets/images/map/PCustIcon.png';
import CCustIcon from '@/assets/images/map/CCustIcon.png';
import CCustEpqIcon from '@/assets/images/map/CCustEpqIcon.png';
import PCustEpqGIcon from '@/assets/images/map/PCustEpqGIcon.png';
import PCustGIcon from '@/assets/images/map/PCustGIcon.png';
import CCustGIcon from '@/assets/images/map/CCustGIcon.png';
import CCustEpqGIcon from '@/assets/images/map/CCustEpqGIcon.png';
import otherCustIcon from '@/assets/images/map/otherGIcon.png';

import useAmap from '@/hook/use-amap-hook';

import { listMark } from '@/apis/map';

const amap = useAmap({ container: 'map-container' }, true);
const router = useRouter();
const route = useRoute();
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

/**
 * Popover组件
 *
 * 实现查询类型切换
 */
const showPopover = ref(false);
const actions = ref([
  { text: '地点', value: '2' },
  { text: '客户', value: '1' },
]);
const currentAction = ref(actions.value[0]);
const onPopoverChange = (val) => {
  searchParams.value = '';
  showPopover.value = false;
  currentAction.value = val;
  amap.getInstance().clearMap(); // 清空地图
  onSearch();
};

// 查询参数
const searchParams = ref('');
const custMarks = ref([]);

// 绘制客户标注点
const drawMarkers = async (data) => {
  amap.getInstance().clearMap();
  data.forEach((e, index) => {
    amap.addMarker(
      {
        position: [e.markLng, e.markLat],
        icon:
          e.markType == '1'
            ? PCustIcon
            : e.markType == '2'
            ? PCustEpqIcon
            : e.markType == '3'
            ? CCustIcon
            : e.markType == '4'
            ? CCustEpqIcon
            : e.markType == '5'
            ? PCustGIcon
            : e.markType == '6'
            ? PCustEpqGIcon
            : e.markType == '7'
            ? CCustGIcon
            : e.markType == '8'
            ? CCustEpqGIcon
            : otherCustIcon,
        extData: e,
      },
      placeMarkClickFn
    );
    if (index === data.length - 1) {
      amap.getInstance().setCenter([e.markLng, e.markLat]);
    }
  });
};
// 通用客户标注查询接口
const getCustData = async () => {
  const { data } = await listMark({
    custIdOrName: searchParams.value,
  });
  custMarks.value = data || [];
  drawMarkers(custMarks.value);
};
// 默认查询
const onSearch = () => {
  switch (currentAction.value.value) {
    case '1': // 客户
      getCustData();
      break;
    default:
      amap.ensureMapReady(() => {
        amap.autoComplete({ mapClickFn: placeMarkClickFn });
      });
      break;
  }
};

/**
 * 查询地点面板
 */
const showPlacePanel = ref(false);
const placeInfo = ref({} as any);

// 地点标注 点击事件
const placeMarkClickFn = (val) => {
  placeInfo.value = val.target.getExtData() || {};
  placeInfo.value.markLat = placeInfo.value.location?.lat || placeInfo.value.markLat;
  placeInfo.value.markLng = placeInfo.value.location?.lng || placeInfo.value.markLng;
  placeInfo.value.address = placeInfo.value.address || placeInfo.value.markAddr;
  if (!placeInfo.value.address) {
    amap.getAddress([placeInfo.value.markLng, placeInfo.value.markLat], (addr) => {
      placeInfo.value.address = addr;
    });
  }
  showPlacePanel.value = true;
};

const openMarkPanel = () => {
  showPlacePanel.value = false;
  activeTab.value = 0;
  showMarkPanel.value = true;
};

/**
 * 客户标注操作面板
 */
const showMarkPanel = ref(false);
const activeTab = ref(0);

onMounted(() => {
  amap.ensureMapReady(() => {
    onSearch();
  });
});
</script>

<style lang="less" scoped>
#map-container {
  width: 100%;
  height: calc(100vh - 365px);
}

.action-sheet-content {
  padding: 32px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 24px;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #333333;
      letter-spacing: 0;
      line-height: 36px;
      font-weight: 600;
    }
  }
}
</style>
