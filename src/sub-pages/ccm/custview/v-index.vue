<template>
  <div class="ccm-view">
    <van-nav-bar
      title="概况信息"
      fixed
      placeholder
      left-arrow
      :rightText="active == '1' ? '' : ''"
      @click-left="router.back()"
    ></van-nav-bar>
    <div class="ccm-view-body">
      <div class="ccm-view-info">
        <div>
          <van-image class="avatar" :src="comHead" />
        </div>
        <div class="content">
          <div class="content-row">
            <div class="name" v-if="active == '0'">{{ custInfo.custName || '--' }}</div>
            <div class="name" v-if="active == '1'">{{ baseCustInfo.companyName || '--' }}</div>
            <div class="level" v-if="active == '0'">{{ codeTranslate('ccmCustBaseLevel', custInfo.custLevel) || '--' }}</div>
          </div>
          <div class="content-row" style="justify-content: space-between" v-if="active == '0'">
            <van-space>
              <van-tag :color="custInfo.isBaseCust === '1' ? '#e7d1ab' : ''" :text-color="custInfo.isBaseCust === '1' ? '#1F98FF' : ''">
                基
              </van-tag>
              <van-tag
                :color="custInfo.isDepositCust === '1' ? '#fecf92' : ''"
                :text-color="custInfo.isDepositCust === '1' ? '#FF8812' : ''"
              >
                存
              </van-tag>
              <van-tag :color="custInfo.isLoanCust === '1' ? '#fec292' : ''" :text-color="custInfo.isLoanCust === '1' ? '#FF0D12' : ''">
                贷
              </van-tag>
              <van-tag :color="custInfo.isCreditCust === '1' ? '#ebd499' : ''" :text-color="custInfo.isCreditCust === '1' ? '#43BB67' : ''">
                授
              </van-tag>
              <van-tag :color="custInfo.isWechatCust === '1' ? '#f6cf8f' : ''" :text-color="custInfo.isWechatCust === '1' ? '#B49105' : ''">
                企业微信认证
              </van-tag>
            </van-space>
            <div class="focus" @click="focusFn">
              <van-image class="focus-icon" :src="!custInfo.beFocusOn ? noFocus : focus" />
              <div>{{ !custInfo.beFocusOn ? '关注' : '取消关注' }}</div>
            </div>
          </div>
        </div>
      </div>

      <dadp-card class="ccm-view-card" style="background: #ffffff80" is-body-padding v-if="active == '0'">
        <div class="row">
          <div class="label">客户号</div>
          <div class="value" style="display: flex; align-items: center">
            {{ custInfo.custId || '--' }} &nbsp;
            <van-button type="primary" size="mini" @click="copyToClipboard(custInfo.custId)">复制</van-button>
          </div>
        </div>
        <div class="row">
          <div class="label">统一社会信用代码</div>
          <div class="value">{{ custInfo.uniformCreditCode || '--' }}</div>
        </div>
        <div v-if="tags?.length > 0" class="row" style="display: block">
          <van-space wrap>
            <van-tag v-for="item in showTags" :key="item" color="#fbecdd" text-color="#FF8812">
              {{ item.tagName }}
            </van-tag>
            <span class="more" v-if="tags.length > 5" @click="isMore = !isMore">{{ isMore ? '收起' : '更多' }}</span>
          </van-space>
        </div>
      </dadp-card>

      <dadp-card class="ccm-view-card" is-body-padding v-if="dataMap.baseCustInfo.isInnerCust == '1'">
        <van-tabs type="card" v-model:active="active" :ellipsis="false">
          <van-tab title="行内信息" name="0"></van-tab>
          <van-tab title="行外信息" name="1"></van-tab>
        </van-tabs>
      </dadp-card>

      <template v-if="active == '0'">
        <dadp-card class="ccm-view-card" is-body-padding>
          <div class="balance">
            <div class="balance-item">
              <div class="text">金融资产余额（{{ fmtNumber(custInfo.assetBalance).unit }}）</div>
              <dadp-num :value="fmtNumber(custInfo.assetBalance).value" :toFixedNum="2"></dadp-num>
            </div>
            <div class="balance-item">
              <div class="text">贷款余额（{{ fmtNumber(custInfo.loanBalance).unit }}）</div>
              <dadp-num :value="fmtNumber(custInfo.loanBalance).value" :toFixedNum="2"></dadp-num>
            </div>
            <div class="balance-item">
              <div class="text">存款余额（{{ fmtNumber(custInfo.depBalTotal).unit }}）</div>
              <dadp-num :value="fmtNumber(custInfo.depBalTotal).value" :toFixedNum="2"></dadp-num>
            </div>
          </div>
        </dadp-card>
        <dadp-card class="ccm-view-card" is-body-padding>
          <div class="shortcuts">
            <div class="remind">
              <div class="title">客户事件提醒</div>
              <div class="num">{{ countInfo?.eventCount || 0 }}笔</div>
              <div class="detail" @click="gotoMkt('remindRef')">查看详情</div>
            </div>
            <div class="market">
              <div class="title">客户营销任务</div>
              <div class="num">{{ countInfo?.taskCount || 0 }}笔</div>
              <div class="detail" @click="gotoMkt('marketActiveRef')">查看详情</div>
            </div>
            <div class="busi">
              <div class="title">客户营销商机</div>
              <div class="num">{{ countInfo?.chanceCount || 0 }}笔</div>
              <div class="detail" @click="gotoMkt('businessClueRef')">查看详情</div>
            </div>
          </div>
        </dadp-card>
        <dadp-card class="ccm-view-card" is-body-padding>
          <div class="quick-menu">
            <div v-for="(item, index) in quickMenu" :key="index" class="quick-menu-item" @click="goDetail(item.path)">
              <van-image class="quick-menu-item-icon" :src="item.icon" />
              <div class="quick-menu-item-name">{{ item.name }}</div>
            </div>
          </div>
        </dadp-card>
      </template>
    </div>
    <van-action-bar class="ccm-view-footer">
      <div class="ccm-view-footer-item" @click="addFn('tel')">
        <van-image class="img" :src="telIcon"></van-image>
        <div>电访补录</div>
      </div>
      <div class="ccm-view-footer-item" @click="addFn('face')">
        <van-image class="img" :src="faceIcon"></van-image>
        <div>面访补录</div>
      </div>
      <div class="ccm-view-footer-item" @click="gotoKYC(custInfo)">
        <van-image class="img" :src="kycIcon"></van-image>
        <div>KYC</div>
      </div>
    </van-action-bar>
    <!-- 行外客户视图 -->
    <template v-if="active == '1'">
      <dadp-card is-body-padding>
        <div class="bigbox">
          <div class="headTag">
            <van-space>
              <van-tag color="#eadbf8" text-color="#8603ff">{{ codeTranslate('regStatus', baseCustInfo.regStatus) }}</van-tag>
              <van-tag effect="dark" color="#ecceb2" style="color: #a4671c">
                {{ dataMap.baseCustInfo.isInnerCust == '1' ? '行内客户' : '行外客户' }}
              </van-tag>
              <van-tag v-if="dataMap.baseCustInfo.isListedCompany == '1'" effect="dark" color="#e9fdd2" style="color: #07a012">
                {{ dataMap.baseCustInfo.isListedCompany == '1' ? '上市公司' : '' }}
              </van-tag>
            </van-space>
          </div>
          <div>
            <span class="histName">曾用名:</span>
            {{ baseCustInfo.companyNameHis }}
          </div>
          <div>
            <span class="twEnterQua">企业资质:</span>
            {{ baseCustInfo.twEnterQualifyContent }}
          </div>
        </div>
      </dadp-card>
      <dadp-card class="ccm-view-card" is-body-padding>
        <div class="quick-menu">
          <div v-for="(item, index) in outBankquickMenu" :key="index" class="quick-menu-item" @click="goDetail(item.path)">
            <van-image class="quick-menu-item-icon" :src="item.icon" />
            <div class="quick-menu-item-name">{{ item.name }}</div>
          </div>
        </div>
      </dadp-card>
    </template>
  </div>
</template>
<script lang="ts" setup>
import comHead from '@/assets/images/cust/view/com-head.png';
import focus from '@/assets/images/cust/view/focus.png';
import noFocus from '@/assets/images/cust/view/no-focus.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpNum from '@/components/dadp-ui/dadp-num.vue';
import { quickMenu, outBankquickMenu } from '@/sub-pages/ccm/custview/hook';
import {
  getCustBaseInfo,
  focusOrCancleCust,
  getCustTags,
  getCustReminAndMarketCount,
  EnterQualifyInfo,
  CustBaseTwInfo,
  authRoleComIsViewFunc,
} from '@/apis/cust';
import { codeTranslate } from '@/hook/code-hook';
import { fmtNumber } from '@/utils/format';
import { showToast } from 'vant';
import { copyToClipboard } from '@/utils/global';
import telIcon from '@/assets/images/cust/view/tel-icon.png';
import faceIcon from '@/assets/images/cust/view/face-icon.png';
import kycIcon from '@/assets/images/cust/view/kyc-icon.png';

defineOptions({ name: 'ccm-view' });

const router = useRouter();
const route = useRoute();

const dataMap = reactive({
  custInfo: Object(),
  // 是否行外客户
  isOutCust: '0',
  tags: Array<any>(),
  countInfo: Object(),
  baseCustInfo: {
    isInnerCust: '',
  } as any,
  EnterQuaInfo: Object(),
  isEdit: false,
  isMore: false,
  active: '0',
});
// 展示的标签
const showTags = computed(() => {
  return dataMap.isMore ? dataMap.tags || [] : (dataMap.tags || []).slice(0, 5);
});

const { custInfo, tags, countInfo, isMore, active, baseCustInfo } = toRefs(dataMap);

// 关注/取消关注
const focusFn = async () => {
  const { code } = await focusOrCancleCust({ custId: dataMap.custInfo.custId, beFocusOn: dataMap.custInfo.beFocusOn });
  if (code == 200) dataMap.custInfo.beFocusOn = !dataMap.custInfo.beFocusOn;
};
// 跳转接触登记
const gotoContact = () => {
  router.push({
    name: 'ccm-view-service-info',
    query: {
      isCust: '1',
      custId: dataMap.custInfo.custId,
      custName: dataMap.custInfo.custName,
      srcId: dataMap.custInfo.custId,
      exeRegSrc: '3', // 登记渠道:1-商机，3-客户视图，5-任务执行
    },
  });
};
// 跳转营销模块
const gotoMkt = (val: any) => {
  router.push(`/ccm-view/market-info/${dataMap.custInfo.custId}/${val}`);
};
// 跳转详情页 入参为路由path
const goDetail = (path: any) => {
  if (path == '/ccm-view/market-info') {
    gotoMkt('prodRecommendRef');
  } else if (path == '/ccm-view/service-info') {
    gotoContact();
  } else if (path === '/ccm-view/funds-relationship') {
    router.push(`${path}/${dataMap.custInfo.custId}/${dataMap.custInfo.custName}`);
  } else {
    router.push(`${path}/${dataMap.custInfo.custId}`);
  }
};

/**
 * ******************* 初始化数据 *******************
 */
// 初始化基础信息
const initCustInfo = async () => {
  const { data } = await getCustBaseInfo({ custId: dataMap.custInfo.custId });
  if (data) {
    dataMap.custInfo = { ...data };
  }
};
// 初始化客户标签
const initCustTag = async () => {
  const { data } = await getCustTags({ custId: dataMap.custInfo.custId, isMobileShow: '1' });
  if (data) {
    dataMap.tags = data.tagList;
  }
};
// 初始化提醒和任务统计数
const initCount = async () => {
  const { data } = await getCustReminAndMarketCount({ custId: dataMap.custInfo.custId, custType: 'E' });
  if (data) {
    dataMap.countInfo = { ...data };
  }
};
// 新增录入
const addFn = (val: any) => {
  router.push({
    name: val == 'tel' ? 'ccm-concat-tel' : 'ccm-concat-face',
    query: {
      isCust: '1',
      custId: dataMap.custInfo.custId,
      custName: dataMap.custInfo.custName,
      srcId: dataMap.custInfo.custId,
      exeRegSrc: '3', // 登记渠道:1-商机，3-客户视图，5-任务执行
    },
  });
};
const gotoKYC = (item: any) => {
  console.log(dataMap.isEdit);
  router.push({
    path: `/ccm-view/kyc`,
    query: {
      opType: dataMap.isEdit ? 'add' : 'view',
      custId: dataMap.custInfo.custId,
      custName: dataMap.custInfo.custName || dataMap.custInfo.companyName,
      custType: '1', // 1-存客，2-潜客
    },
  });
};
/**
 * ******************* 行外信息方法 *******************
 */
// 检查用户是否有行内视图权限
const isViewFunc = async () => {
  const { code, data } = await authRoleComIsViewFunc({ custId: dataMap.custInfo.custId });
  if (code == 200 && data.length > 3) {
    initCustInfo();
    initCustTag();
    initCount();
    // 判断kyc是否有编辑权限
    console.log(data);
    if (data) {
      dataMap.isEdit = data.indexOf('ccmCustView-kyc') > -1 ? true : false;
    } else {
      dataMap.isEdit = true;
    }
  } else {
    dataMap.baseCustInfo.isInnerCust = '0';
    dataMap.active = '1';
    showToast('您暂未有客户行内视图权限，不可查看客户行内视图！');
  }
};
// 行外客户-基本信息
const CustBaseInfo = async () => {
  const { data } = await CustBaseTwInfo({ custId: dataMap.custInfo.custId });
  if (data) {
    dataMap.baseCustInfo = { ...data };
    // 如果为行内客户，补充调用行内信息接口
    if (dataMap.baseCustInfo.isInnerCust == '1' && dataMap.isOutCust === '1') {
      isViewFunc();
    }
  }
};
// 行外客户-企业资质信息
const getEnterQualifyInfo = async () => {
  const { data } = await EnterQualifyInfo({ custId: dataMap.custInfo.custId });
  if (data) {
    dataMap.EnterQuaInfo = { ...data };
  }
};

onMounted(() => {
  dataMap.custInfo.custId = route.params.custId;
  dataMap.isOutCust = route.query.outbank as string;

  //如果是1就是外部客户列表视图跳进来的 所以active默认展示行外视图
  dataMap.active = dataMap.isOutCust === '1' ? '1' : '0';

  // 非行外客户直接加载行内信息
  if (dataMap.isOutCust !== '1') {
    isViewFunc();
  }
  CustBaseInfo();
  getEnterQualifyInfo();
});
</script>
<style lang="less" scoped>
.ccm-view {
  background-image: url('@/assets/images/cust/view/view-background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 0 32px;
  :deep(.van-nav-bar__text) {
    color: @sub-text;
  }
  :deep(.van-nav-bar) {
    background: transparent;
    background-image: url('@/assets/images/cust/view/view-background.png');
  }
  &-body {
    padding-bottom: 240px;
  }
  &-info {
    margin-top: 34px;
    margin-bottom: 36px;
    display: flex;
    .avatar {
      width: 96px;
      height: 96px;
    }
    .content {
      flex: auto;
      padding-left: 20px;

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
      .content-row + .content-row {
        margin-top: 16px;
      }
    }
  }
  &-card {
    :deep(.van-tabs__wrap) {
      width: 60%;
      margin-left: 20%;
    }
    .row + .row {
      margin-top: 24px;
    }
    .row {
      display: flex;
      align-items: center;
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
    .balance {
      display: flex;
      justify-content: space-between;
      &-item {
        width: 33%;
        .text {
          font-family: PingFangSC-Regular;
          font-size: @font-size-20;
          color: @sub-text;
          letter-spacing: 0;
          line-height: 28px;
          font-weight: 400;
          margin-bottom: 16px;
        }
        .value {
          font-family: DINAlternate-Bold;
          font-size: @font-size-36;
          color: @text;
          letter-spacing: 0;
          line-height: 36px;
          font-weight: 700;
        }
      }
    }
    .shortcuts {
      display: flex;
      justify-content: space-between;
      .remind {
        background: url('@/assets/images/cust/view/remind.png');
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
        background: url('@/assets/images/cust/view/market.png');
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
    .quick-menu {
      &-item {
        display: inline-block;
        width: 25%;
        text-align: center;
        margin-bottom: 16px;
        &-icon {
          width: 46px;
          height: 46px;
        }
        &-name {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #222222;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
          font-weight: 400;
          margin-top: 16px;
        }
      }
    }
  }
  .histName {
    color: #999;
    padding-top: 10px;
  }
  .twEnterQua {
    padding-top: 10px;
    color: #999;
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
