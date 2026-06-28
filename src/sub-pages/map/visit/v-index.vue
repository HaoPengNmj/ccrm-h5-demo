<!--
 * @desc: 营销地图-客户拜访
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-12-30 16:02:09
-->
<template>
  <van-search
    v-model="searchParams"
    shape="round"
    :id="currentAction.value === '8' ? 'autoSearch' : ''"
    :show-action="currentAction.value === '1'"
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
    <!-- 仅客户-查询条件 -->
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <van-tabs v-model:active="searchTab">
                <van-tab title="公司客户" name="C">
                  <van-field name="custType" label="客户分类" label-align="top">
                    <template #input>
                      <dadp-radio v-model="ereqParams.custType" :options="getCombo('cmggCCustType')" clearable multiple />
                    </template>
                  </van-field>
                  <van-field name="custLevelList" label="客户等级" label-align="top">
                    <template #input>
                      <dadp-radio v-model="ereqParams.custLevelList" :options="getCombo('ccmCustBaseLevel')" clearable multiple />
                    </template>
                  </van-field>
                  <van-field name="companyLine" label="业务类型" label-align="top">
                    <template #input>
                      <dadp-radio v-model="ereqParams.companyLine" :options="getCombo('companyLine')" clearable multiple />
                    </template>
                  </van-field>
                </van-tab>
                <van-tab title="个人客户" name="P">
                  <van-field
                    v-model="preqParams.custName"
                    name="custName"
                    label="客户名称"
                    input-align="right"
                    placeholder="请输入"
                    clearable
                  ></van-field>
                  <van-field
                    v-model="preqParams.address"
                    name="address"
                    label="联系地址"
                    input-align="right"
                    placeholder="请输入"
                    clearable
                  ></van-field>
                  <van-field name="custType" label="客户分类" label-align="top">
                    <template #input>
                      <dadp-radio v-model="preqParams.custType" :options="getCombo('cmggPCustType')" clearable multiple />
                    </template>
                  </van-field>
                  <van-field name="custLevelList" label="客户等级" label-align="top">
                    <template #input>
                      <dadp-radio v-model="preqParams.custLevelList" :options="getCombo('pcmCustBaseLevel')" clearable multiple />
                    </template>
                  </van-field>
                  <van-field name="businessTypes" label="业务类型" label-align="top">
                    <template #input>
                      <dadp-radio v-model="preqParams.businessTypes" :options="getCombo('businessType')" clearable multiple />
                    </template>
                  </van-field>
                </van-tab>
              </van-tabs>
            </van-cell-group>
            <div class="gform-footer">
              <van-button size="large" round plain @click="onCancel">取消</van-button>
              <van-button type="primary" size="large" round native-type="submit">确认</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-search>
  <div id="map-container"></div>

  <!-- 客户标注查询面板 -->
  <van-action-sheet v-model:show="showCustPanel" :closeable="false">
    <dadp-refresh-list
      ref="refreshListRef"
      class="refresh-list"
      :requestApi="listCustMark"
      :reqParams="{
        markStatus: '1',
        markLng: extData.markLng,
        markLat: extData.markLat,
      }"
    >
      <template v-slot="{ data }">
        <dadp-card :avatar="data.custType == '1' || data.custType == '2' ? 'task' : 'ent'" @click="gotoCustView(data)">
          <template #title>
            <van-space>
              <span>{{ data.custName || data.companyName }}({{ data.custId }})</span>
              <van-tag v-if="data.custType == '1' || data.custType == '3'" style="white-space: nowrap" color="#ffe3e3" text-color="#FF0D12">
                存客
              </van-tag>
              <van-tag v-else style="white-space: nowrap" color="#e8f4ff" text-color="#1F98FF">潜客</van-tag>
              <div></div>
            </van-space>
          </template>
          <template #subTitle>
            <van-space v-if="data.custType == '1' || data.custType == '2'">
              <van-icon name="phone-o" color="#ff8812" />
              <span>{{ data.mobile || '--' }}</span>
            </van-space>
            <van-space v-else>
              <van-icon name="idcard" color="#ff8812" />
              <span>{{ data.uniformCreditCode || '--' }}</span>
            </van-space>
          </template>

          <template #header-right>
            <div style="white-space: nowrap">
              <van-button type="primary" @click.stop="gotoKYC(data)">客户KYC</van-button>
            </div>
            <div style="white-space: nowrap">
              <van-button type="primary" @click.stop="gotoFace(data)">客户拜访</van-button>
            </div>
          </template>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </van-action-sheet>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import { getCombo } from '@/hook/code-hook';

import PCustEpqIcon from '@/assets/images/map/PCustEpqIcon.png';
import PCustIcon from '@/assets/images/map/PCustIcon.png';
import CCustIcon from '@/assets/images/map/CCustIcon.png';
import CCustEpqIcon from '@/assets/images/map/CCustEpqIcon.png';
import PCustEpqGIcon from '@/assets/images/map/PCustEpqGIcon.png';
import PCustGIcon from '@/assets/images/map/PCustGIcon.png';
import CCustGIcon from '@/assets/images/map/CCustGIcon.png';
import CCustEpqGIcon from '@/assets/images/map/CCustEpqGIcon.png';
import otherCustIcon from '@/assets/images/map/otherGIcon.png';
import bankIcon from '@/assets/images/map/bankIcon.png';

import useAmap from '@/hook/use-amap-hook';
import {
  queryAreaData,
  queryBranchData,
  queryFormatData,
  queryGridData,
  queryOutletData,
  queryUnitData,
} from '@/sub-pages/map/mkt-map-hook';

import { listMark, listCustMark, listMarkCcm, listMarkPcm } from '@/apis/map';
import { getStorage } from '@/storage/storage';
const userInfo = getStorage('userInfo');
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
  { text: '客户', value: '1', api: listMark },
  { text: '地点', value: '8', api: () => {} },
  { text: '支行', value: '2', api: queryBranchData },
  { text: '片区', value: '3', api: queryAreaData },
  { text: '网格', value: '4', api: queryGridData },
  { text: '业态', value: '5', api: queryFormatData },
  { text: '单元', value: '6', api: queryUnitData },
  { text: '网点', value: '7', api: queryOutletData },
]);
const currentAction = ref(actions.value[0]);
const onPopoverChange = (val) => {
  showPopover.value = false;
  currentAction.value = val;
  amap.getInstance().clearMap(); // 清空地图
  drawMarkers(custMarks.value); // 重绘客户标记
  onSearch();
};

// 查询参数
const searchParams = ref('');
/**
 * 客户类型查询--参数
 */
const searchTab = ref('C');
// 公司客户
const ereqParams = ref({
  custType: [],
  custLevelList: [],
  companyLine: [],
});
// 个人客户
const preqParams = ref({
  custName: '',
  address: '',
  custType: [],
  custLevelList: [],
  businessTypes: [],
});

/**
 * 客户标注
 */
const custMarks = ref([]);
const showCustPanel = ref(false);
const extData = ref({} as any);

// 支行、片区、网格、业态、单元、网点
const getData = async (value: string) => {
  const data = await currentAction.value.api(searchParams.value);
  amap.getInstance().clearMap(); // 清空地图
  drawMarkers(custMarks.value); // 重绘客户标记
  // 网点
  if (value === '7') {
    data.forEach((x: any, index: number) => {
      amap.addMarker({
        position: [x.netMarkLng, x.netMarkLat],
        icon: bankIcon,
        extData: x,
      });
      if (index === data.length - 1) {
        amap.getInstance().setCenter([x.netMarkLng, x.netMarkLat]);
      }
    });
  } else {
    data.forEach((x: any, index: number) => {
      amap.addPolygon({ ...x, setCenter: index === data.length - 1 });
    });
  }
};
// 客户标注点击事件
const custMarkClickFn = async (val) => {
  extData.value = val.target.getExtData() || {};
  showCustPanel.value = true;
  nextTick(() => {
    refreshListRef.value.listData = [];
    refreshListRef.value.onRefresh();
  });
};
// 绘制客户标注点
const drawMarkers = async (data, setCenter = true) => {
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
      custMarkClickFn
    );
    if (index === data.length - 1 && setCenter) {
      amap.getInstance().setCenter([e.markLng, e.markLat]);
    }
  });
};
const apiType = ref('listMark');

// 通用客户标注查询接口
const getCustData = async () => {
  apiType.value = 'listMark';
  const { data } = await listMark({
    custIdOrName: searchParams.value,
  });
  custMarks.value = data || [];
  amap.getInstance().clearMap();
  drawMarkers(custMarks.value);
};
// 公司客户查询
const onCcmSearch = async () => {
  apiType.value = 'listMarkCcm';

  const { data } = await listMarkCcm({
    ...ereqParams.value,
    custIdOrName: searchParams.value,
    custName: searchParams.value,
    custTypes: ereqParams.value.custType.join(','),
    isCompanyBusi: ereqParams.value.companyLine.includes('2') ? '1' : '',
    isParttBusi: ereqParams.value.companyLine.includes('1') ? '1' : '',
  });
  custMarks.value = data || [];
  amap.getInstance().clearMap();
  drawMarkers(custMarks.value);
};
// 个人客户查询
const onPcmSearch = async () => {
  apiType.value = 'listMarkPcm';

  const { data } = await listMarkPcm({
    ...preqParams.value,
    custIdOrName: searchParams.value,
    custTypes: preqParams.value.custType.join(','),
    isParttBusi: preqParams.value.businessTypes.includes('1') ? '1' : '',
    isConsumeBusi: preqParams.value.businessTypes.includes('2') ? '1' : '',
    isCompanyBusi: preqParams.value.businessTypes.includes('3') ? '1' : '',
    isBankBusi: preqParams.value.businessTypes.includes('4') ? '1' : '',
  });
  custMarks.value = data || [];
  amap.getInstance().clearMap();
  drawMarkers(custMarks.value);
};
// 默认查询（公司、个人通用接口，直接查询标注点）
const onSearch = () => {
  switch (currentAction.value.value) {
    case '1': // 客户
      getCustData();
      break;
    case '8': // 地点
      amap.ensureMapReady(() => {
        amap.autoComplete({
          callback: () => {
            drawMarkers(custMarks.value, false);
          },
        });
      });
      break;
    default:
      getData(currentAction.value.value);
      break;
  }
};

// 取消
const onCancel = () => {
  let dom = document.getElementsByClassName('van-cell-group')?.[0];
  if (dom) dom.scrollTop = 0;
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  if (searchTab.value === 'C') {
    onCcmSearch();
  } else {
    onPcmSearch();
  }
  let dom = document.getElementsByClassName('van-cell-group')?.[0];
  if (dom) dom.scrollTop = 0;
  dropdownMenuRef.value.close();
};

// 跳转客户视图
const gotoCustView = (item: any) => {
  if (item.custType === '1') {
    router.push(`/pcm-view/${item.custId}`);
  } else if (item.custType === '3') {
    router.push(`/ccm-view/${item.custId}`);
  }
};
// 跳转KYC
const gotoKYC = (item: any) => {
  if (item.custType === '1' || item.custType === '2') {
    router.push({
      path: `/pcm-view/kyc`,
      query: {
        opType: item.mgrId === userInfo.userId ? 'add' : 'view',
        custId: item.custId,
        custName: item.custName || item.companyName,
        custType: item.custType, // 1-存客，2-潜客
      },
    });
  } else if (item.custType === '3' || item.custType === '4') {
    router.push({
      path: `/ccm-view/kyc`,
      query: {
        opType: item.mgrId === userInfo.userId ? 'add' : 'view',
        custId: item.custId,
        custName: item.custName || item.companyName,
        custType: item.custType === '3' ? '1' : '2', // 1-存客，2-潜客
      },
    });
  }
};

// 跳转面访
const gotoFace = (item: any) => {
  if (item.custType === '1' || item.custType === '2') {
    router.push({
      name: 'pcm-contact-face',
      query: {
        isCust: item.custType == '1' || item.custType == '3' ? '1' : '0', // 是否存量客户
        custId: item.custId,
        custName: item.custName || item.companyName,
        exeRegSrc: '3',
        srcId: item.custId,
      },
    });
  } else {
    router.push({
      name: 'ccm-concat-face',
      query: {
        isCust: item.custType == '1' || item.custType == '3' ? '1' : '0', // 是否存量客户
        custId: item.custId,
        custName: item.custName || item.companyName,
        exeRegSrc: '3',
        srcId: item.custId,
      },
    });
  }
};

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

.refresh-list {
  background-color: @gray-1;
  padding: 32px;
  height: 55vh;
  :deep(.van-pull-refresh) {
    min-height: 100% !important;
  }
}

.new-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid @gray-1;
  padding: 16px 0;
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
