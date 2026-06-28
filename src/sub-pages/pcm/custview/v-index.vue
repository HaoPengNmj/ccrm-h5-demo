<template>
  <div class="pcm-view">
    <van-nav-bar title="概况信息" fixed placeholder left-arrow @click-left="router.back()"></van-nav-bar>
    <div class="pcm-view-body">
      <div class="base-info">
        <div>
          <van-image class="avatar" :src="custInfo.sex == '2' ? cardWoman : cardMan" />
        </div>
        <div class="content">
          <div class="content-row" style="justify-content: space-between">
            <div class="content-row">
              <div class="name">{{ custInfo.custName }}</div>
              <div class="level">{{ codeTranslate('pcmCustBaseLevel', custInfo.custLevel) || '--' }}</div>
            </div>
            <div>
              <van-icon name="location-o" size="0.5rem" @click="openMap" />
            </div>
          </div>
          <div class="content-row" style="justify-content: space-between">
            <div class="age" style="display: flex; align-items: center">
              {{ custInfo.custId }} &nbsp;
              <van-button type="primary" size="mini" @click="copyToClipboard(custInfo.custId)">复制</van-button>
            </div>
            <div class="focus" @click="focusCust">
              <van-image class="focus-icon" :src="!isFocus ? noFocus : focus" />
              <div>{{ !isFocus ? '关注' : '取消关注' }}</div>
            </div>
          </div>
          <div class="content-row">
            <van-space wrap>
              <van-tag color="#fbecdd" text-color="#FF8812">{{ custInfo.age || '--' }}岁</van-tag>
              <van-tag color="#fbecdd" text-color="#FF8812">{{ codeTranslate('marStat', custInfo.marStat) || '--' }}</van-tag>
              <!-- <van-tag color="#fbecdd" text-color="#FF8812">{{ custInfo.nation || '--' }}</van-tag> -->
              <van-tag color="#fbecdd" text-color="#FF8812">{{ codeTranslate('duty', custInfo.profession) || '--' }}</van-tag>
            </van-space>
          </div>
        </div>
      </div>

      <dadp-card class="pcm-view-card" style="background: #ffffff80" is-body-padding>
        <div class="row">
          <div class="label">贷款客户类型</div>
          <div class="value">{{ codeTranslate('yesOrNo', custInfo.isLoan) || '--' }}</div>
        </div>
        <div class="row">
          <div class="label">微信昵称</div>
          <div class="value">{{ custInfo.nickName || '--' }}</div>
        </div>
        <div class="row">
          <div class="label">联系地址</div>
          <div class="value">{{ custInfo.address || '--' }}</div>
        </div>
        <div v-if="custTags?.length > 0" class="row" style="display: block">
          <van-space wrap>
            <van-tag v-for="item in showTags" :key="item" color="#fbecdd" text-color="#FF8812">
              {{ item.tagName }}
            </van-tag>
            <span class="more" v-if="custTags.length > 5" @click="isMore = !isMore">{{ isMore ? '收起' : '更多' }}</span>
          </van-space>
        </div>
      </dadp-card>

      <dadp-card class="pcm-view-card" is-body-padding>
        <div class="shortcuts">
          <div class="remind" @click="goDetail('pcm-view-remind')">
            <div class="title">客户事件提醒</div>
            <div class="num">{{ countData?.eventCount || 0 }}笔</div>
            <div class="detail">查看详情</div>
          </div>
          <div class="market" @click="goDetail('pcm-view-task')">
            <div class="title">客户营销任务</div>
            <div class="num">{{ countData?.taskCount || 0 }}笔</div>
            <div class="detail">查看详情</div>
          </div>
          <div class="busi" @click="goDetail('pcm-view-chance')">
            <div class="title">客户营销商机</div>
            <div class="num">{{ countData?.chanceCount || 0 }}笔</div>
            <div class="detail">查看详情</div>
          </div>
        </div>
      </dadp-card>

      <dep-comp :cust-info="custInfo"></dep-comp>
      <loan-comp :cust-info="custInfo"></loan-comp>
      <relation-comp :cust-info="custInfo"></relation-comp>
      <limit-comp :cust-info="custInfo"></limit-comp>
    </div>

    <van-action-bar class="pcm-view-footer">
      <div class="pcm-view-footer-item" @click="goContactView('tel')">
        <van-image class="img" :src="telIcon"></van-image>
        <div>电访补录</div>
      </div>
      <div class="pcm-view-footer-item" @click="goContactView('face')">
        <van-image class="img" :src="faceIcon"></van-image>
        <div>面访补录</div>
      </div>
      <div class="pcm-view-footer-item" @click="gotoKYC(custInfo)">
        <van-image class="img" :src="kycIcon"></van-image>
        <div>KYC</div>
      </div>
    </van-action-bar>
    <dadp-full-screen v-model="showMap">
      <van-search id="autoSearch" v-model="searchValue" label="地点" placeholder="请输入搜索关键词"></van-search>
      <div id="map-container"></div>
      <van-action-sheet v-model:show="showButton" :title="custInfo.custName" :closeable="false">
        <div class="address">定位地址：{{ showMarkerInfo.markAddr }}</div>
        <div class="gform-footer">
          <van-button round size="large" plain text="取消" @click="showButton = false" />
          <van-button v-if="showMarkerInfo.custMarkId" round size="large" type="primary" text="确定" @click="showButton = false" />
          <van-button v-else round size="large" type="primary" text="添加标注" @click="setMark" />
        </div>
      </van-action-sheet>
    </dadp-full-screen>
  </div>
</template>
<script lang="ts" setup>
import cardWoman from '@/assets/images/common/card-woman.png';
import cardMan from '@/assets/images/common/card-man.png';
import focus from '@/assets/images/cust/view/focus.png';
import noFocus from '@/assets/images/cust/view/no-focus.png';
import telIcon from '@/assets/images/cust/view/tel-icon.png';
import faceIcon from '@/assets/images/cust/view/face-icon.png';
import kycIcon from '@/assets/images/cust/view/kyc-icon.png';

import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpFullScreen from '@/components/dadp-ui/dadp-full-screen.vue';
import depComp from './modules/dep-comp.vue';
import loanComp from './modules/loan-comp.vue';
import relationComp from './modules/relation-comp.vue';
import limitComp from './modules/limit-comp.vue';

import {
  getPerCustBaseInfo,
  getCustFocusInfo,
  setFocusCust,
  cancleFocusCust,
  getCustViewCount,
  getCustTagInfo,
  getDiyCustTagInfo,
  getMark,
  pcCustMark,
  delCustMark,
  authRoleIsViewFunc,
} from '@/apis/cust';
import useAmap from '@/hook/use-amap-hook';
import { codeTranslate } from '@/hook/code-hook';
import { showConfirmDialog, showToast } from 'vant';
import { copyToClipboard } from '@/utils/global';
import { getStorage } from '@/storage/storage';
const userInfo = getStorage('userInfo');

defineOptions({ name: 'pcm-view' });

const router = useRouter();
const route = useRoute();

// 展示的标签
const showTags = computed(() => {
  return dataMap.isMore ? dataMap.custTags || [] : (dataMap.custTags || []).slice(0, 5);
});
const dataMap = reactive({
  isFocus: false,

  custInfo: {
    custId: route.params.custId,
  } as any,
  countData: Object(),
  custTags: Array<any>(),

  isEdit: false,
  isMore: false,
});
const { custInfo, countData, custTags, isFocus, isMore } = toRefs(dataMap);

// 地图展示
const showMap = ref(false);

const searchValue = ref('');
const showButton = ref(false);
const showMarkerInfo = ref({
  custMarkId: '',
  markAddr: '',
} as any);

// 客户标注集合
const custMarks = ref([]);

const amap = useAmap({
  container: 'map-container',
});

// 打开地图
const openMap = async () => {
  showButton.value = false;
  showMap.value = true;
  searchValue.value = '';
  nextTick(async () => {
    await amap.initAPI();
    amap.autoComplete({ mapClickFn: mapClickFn });
    drawMarkers();
  });
};

// 绘制标注点
const drawMarkers = async () => {
  const { data } = await getMark({ custId: route.params.custId });
  custMarks.value = data || [];
  amap.getInstance().clearMap();
  custMarks.value.forEach((e, index) => {
    amap.addMarker({ position: [e.markLng, e.markLat], draggable: false, extData: e }, mapClickFn);
    if (index === custMarks.value.length - 1) {
      amap.getInstance().setCenter([e.markLng, e.markLat]);
    }
  });
};
// 客户标注
const setMark = async () => {
  const { code, msg } = await pcCustMark({
    custId: custInfo.value.custId,
    markAddr: showMarkerInfo.value.markAddr,
    markLng: showMarkerInfo.value.markLng,
    markLat: showMarkerInfo.value.markLat,
  });
  showToast(msg);
  showButton.value = false;
  nextTick(() => {
    drawMarkers();
  });
};
// 删除标注
const delMark = async () => {
  showConfirmDialog({ message: '是否删除该标注?' })
    .then(async () => {
      const { code, msg } = await delCustMark({ custMarkIds: showMarkerInfo.value.custMarkId });
      if (code == 200) {
        showToast('删除成功');
        drawMarkers();
      } else {
        showToast(msg);
      }
    })
    .catch(() => {});
};
// 地图标记点击事件
const mapClickFn = (val) => {
  showMarkerInfo.value = val.target.getExtData() || {};
  showMarkerInfo.value.markLat = showMarkerInfo.value.location.lat;
  showMarkerInfo.value.markLng = showMarkerInfo.value.location.lng;
  if (!showMarkerInfo.value.custMarkId) {
    amap.getAddress(showMarkerInfo.value.location, (addr) => {
      showMarkerInfo.value.markAddr = addr;
    });
  }
  showButton.value = true;
};

// 点击关注取关
const focusCust = async () => {
  const res = dataMap.isFocus
    ? await cancleFocusCust({ custId: route.params.custId })
    : await setFocusCust({ custId: route.params.custId });
  if (res.code == 200) {
    initFocusData();
  }
};
// 跳转详情页 入参为路由name
const goDetail = (name: any) => {
  router.push({
    name: name,
    query: {
      custId: route.params.custId,
      custName: dataMap.custInfo.custName,
      custLevel: dataMap.custInfo.custLevel,
    },
  });
};
// 底部接触跳转
const goContactView = (val: any) => {
  router.push({
    name: 'pcm-view-contact', // 零售客户-营销接触
    query: {
      isCust: '1', // 是否存量客户
      custId: route.params.custId,
      custName: dataMap.custInfo.custName,
      srcId: route.params.custId,
      exeRegSrc: '3', // 登记渠道:1-商机，3-客户视图，5-任务执行
      showTab: val,
    },
  });
};

const gotoKYC = (item: any) => {
  console.log(dataMap.isEdit);
  router.push({
    path: `/pcm-view/kyc`,
    query: {
      opType: dataMap.isEdit ? 'add' : 'view',
      custId: route.params.custId,
      custName: dataMap.custInfo.custName,
      custType: '1', // 1-存客，2-潜客
    },
  });
};
/**
 * 数据初始化
 */
const isViewFunc = async () => {
  const { code, msg, data } = await authRoleIsViewFunc({ custId: route.params.custId });
  if (code === 200) {
    initCustData();
    initFocusData();
    initCountData();
    getCustTags();
    getDiyCustTags();
    // 判断kyc是否有编辑权限
    console.log(data);
    if (data) {
      dataMap.isEdit = data.indexOf('pcmCustView-kyc') > -1 ? true : false;
    } else {
      dataMap.isEdit = true;
    }
  } else {
    router.back();
  }
};
// 初始化客户基本信息
const initCustData = async () => {
  const { data } = await getPerCustBaseInfo({ custId: route.params.custId });
  if (data) dataMap.custInfo = { ...data };
};
// 初始化客户关注信息
const initFocusData = async () => {
  const { data } = await getCustFocusInfo({ custId: route.params.custId });
  dataMap.isFocus = data;
};
// 初始化客户业务统计数
const initCountData = async () => {
  const { data } = await getCustViewCount({ custId: route.params.custId });
  if (data) dataMap.countData = { ...data };
};
// 初始化客户标签
const getCustTags = async () => {
  const { data } = await getCustTagInfo({ custId: route.params.custId, isMobileShow: '1' });
  if (data && data.tagList) {
    dataMap.custTags = dataMap.custTags.concat(data.tagList);
  }
};
// 初始化自定义客户标签
const getDiyCustTags = async () => {
  const { data } = await getDiyCustTagInfo({ custId: route.params.custId, isMobileShow: '1' });
  if (data && data.tagList) {
    dataMap.custTags = dataMap.custTags.concat(data.tagList);
  }
};

onMounted(() => {
  isViewFunc();
});
</script>
<style lang="less" scoped>
#map-container {
  width: 100vw;
  height: calc(100% - 100px);
}
.address {
  padding: 32px;
}

.pcm-view {
  background-image: url('@/assets/images/cust/view/view-background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  :deep(.van-nav-bar__text) {
    color: @sub-text;
  }
  :deep(.van-nav-bar) {
    background: transparent;
    background-image: url('@/assets/images/cust/view/view-background.png');
  }
  &-body {
    padding: 32px;
    padding-bottom: 240px;
  }

  .base-info {
    display: flex;

    .avatar {
      width: 96px;
      height: 96px;
    }
    .content {
      flex: auto;
      padding-left: 20px;
      .content-row + .content-row {
        padding-top: 12px;
      }

      .content-row {
        display: flex;
        align-items: center;

        .name {
          font-family: PingFangSC-Semibold;
          font-size: @font-size-40;
          color: @text;
          line-height: 48px;
          font-weight: 600;
          word-break: break-all;
        }
        .age {
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @sub-text;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
        }

        .level {
          margin-left: 16px;
          padding: 5px 8px;
          background: #222222;
          border: 1px solid rgba(196, 138, 19, 1);
          border-radius: 8px 0px 8px 0px;
          font-family: PingFangSC-Medium;
          font-size: @font-size-22;
          color: #ffcd64;
          line-height: 22px;
          font-weight: 500;
          white-space: nowrap;
        }

        .focus {
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @sub-text;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
          &-icon {
            width: 30px;
            height: 30px;
          }
          div {
            height: 30px;
            line-height: 30px;
            margin-left: 4px;
          }
        }
      }
    }
  }

  &-card {
    margin-top: 32px;
    .row + .row {
      margin-top: 24px;
    }
    .row {
      display: flex;

      .label {
        font-size: @font-size-28;
        color: @gray;
        letter-spacing: 0;
        line-height: 28px;
        font-weight: 400;
        width: 40%;
      }

      .value {
        font-size: @font-size-28;
        color: @text;
        letter-spacing: 0;
        line-height: 28px;
        font-weight: 400;
      }

      .more {
        width: 3em;
        font-size: @font-size-22;
        color: @primary-color;
        letter-spacing: 0;
        text-align: right;
        line-height: 22px;
        font-weight: 400;
      }
    }

    .shortcuts {
      display: flex;
      justify-content: space-between;

      .remind {
        background: url('@/assets/images/cust/view/per-remind.png');
        width: 32%;
        height: 172px;
        border-radius: 20px;
        background-size: 100% 100%;
        padding: 24px;

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 22px;
          color: #222222;
          letter-spacing: 0;
          font-weight: 600;
          width: 100%;
        }

        .num {
          margin-top: 16px;
          font-family: DINAlternate-Bold;
          font-size: 32px;
          color: #1d70f5;
          letter-spacing: 0;
          line-height: 32px;
          font-weight: 700;
        }

        .detail {
          margin-top: 16px;
          background-image: linear-gradient(106deg, #28e0ff 0%, #1d70f5 100%);
          border-radius: 15px;
          height: 30px;
          width: 100px;
          font-size: 18px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          line-height: 30px;
        }
      }

      .market {
        background: url('@/assets/images/cust/view/market-task.png');
        width: 32%;
        height: 172px;
        border-radius: 20px;
        background-size: 100% 100%;
        padding: 24px;

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 22px;
          color: #222222;
          letter-spacing: 0;
          font-weight: 600;
          width: 100%;
        }

        .num {
          margin-top: 16px;
          font-family: DINAlternate-Bold;
          font-size: 32px;
          color: #ffb931;
          letter-spacing: 0;
          line-height: 32px;
          font-weight: 700;
        }

        .detail {
          margin-top: 16px;
          background-image: linear-gradient(104deg, #fccf77 0%, #ffb931 100%);
          border-radius: 15px;
          height: 30px;
          width: 100px;
          font-size: 18px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          line-height: 30px;
        }
      }

      .busi {
        background: url('@/assets/images/cust/view/market-busi.png');
        width: 32%;
        height: 172px;
        border-radius: 20px;
        background-size: 100% 100%;
        padding: 24px;

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 22px;
          color: #222222;
          letter-spacing: 0;
          font-weight: 600;
          width: 100%;
        }

        .num {
          margin-top: 16px;
          font-family: DINAlternate-Bold;
          font-size: 32px;
          color: #ff6c31;
          letter-spacing: 0;
          line-height: 32px;
          font-weight: 700;
        }

        .detail {
          margin-top: 16px;
          background-image: linear-gradient(104deg, #ffbf8c 0%, #ff6c31 100%);
          border-radius: 15px;
          height: 30px;
          width: 100px;
          font-size: 18px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    height: 220px;
    width: 100%;

    &-item {
      width: 50%;
      text-align: center;
      margin: 50px 0 30px 0;

      .img {
        width: 90px;
        height: 70px;
        margin-bottom: 28px;
      }
    }
  }
}
</style>
