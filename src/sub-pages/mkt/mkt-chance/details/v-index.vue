<!--
 * @desc: 营销商机详情
-->
<template>
  <div class="container">
    <div class="title">客户信息</div>
    <van-cell-group inset>
      <van-cell title="客户名称" :value="chanceCustData.custName || '--'" />
      <van-cell title="客户号" :value="chanceCustData.custId || '--'" />
      <van-cell
        title="客户等级"
        :value="
          codeTranslate(chanceData.chanceProperty === 'pcm' ? 'pcmCustBaseLevel' : 'ccmCustBaseLevel', chanceCustData.custLevel) || '--'
        "
      />
      <van-cell title="商机分配一级机构" :value="chanceCustData.changeExcuteFirstOrgName || '--'" />
      <van-cell title="商机分配二级机构" :value="chanceCustData.changeExcuteSecondOrgName || '--'" />
      <van-cell title="执行人" :value="chanceCustData.performeUserName || '--'" />
    </van-cell-group>
    <div class="title">
      <span>商机信息</span>
      <span class="right-text" @click="gotoFeedBack">意向反馈</span>
    </div>
    <van-cell-group inset>
      <van-cell title="商机名称" :value="chanceData.chanceName || '--'" />
      <van-cell title="商机开始日期" :value="chanceData.beginDate || '--'" />
      <van-cell title="商机结束日期" :value="chanceData.endDate || '--'" />
      <van-cell title="商机属性" :value="codeTranslate('propertyType', chanceData.chanceProperty) || '--'" />
      <van-cell title="商机类型" :value="codeTranslate('chanceType', chanceData.chanceType) || '--'" />
      <van-cell title="商机来源" :value="codeTranslate('changeSrc', chanceData.chanceSrc) || '--'" />
    </van-cell-group>
    <div class="title">推荐产品</div>
    <div class="prod-card">
      <van-swipe ref="swipe" :show-indicators="false" :autoplay="5000">
        <van-swipe-item v-for="(prod, index) in recProds" :key="index">
          <dadp-card class="backimg">
            <component :is="moduleCompList().find((x: any) => x.kindProdType === prod.kindProdType)?.comp.value" :data="prod"></component>
          </dadp-card>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="title">营销目标</div>
    <van-cell-group inset>
      <div class="content">
        {{ chanceData.mktTarget }}
      </div>
    </van-cell-group>
    <div class="title">商机说明</div>
    <van-cell-group inset>
      <div class="content">
        {{ chanceData.chanceDesc }}
      </div>
    </van-cell-group>
    <div class="title">营销话术</div>
    <van-cell-group inset>
      <div class="content" v-html="convertFontSizeToRem(chanceData.marketDiscourse)"></div>
    </van-cell-group>
  </div>
  <van-action-bar class="container-footer">
    <div class="container-footer-item" @click="goContactView('tel')">
      <van-image class="img" :src="telIcon"></van-image>
      <div>电访补录</div>
    </div>
    <div class="container-footer-item" @click="goContactView('face')">
      <van-image class="img" :src="faceIcon"></van-image>
      <div>面访补录</div>
    </div>
  </van-action-bar>
</template>
<script lang="ts" setup>
import telIcon from '@/assets/images/cust/view/tel-icon.png';
import faceIcon from '@/assets/images/cust/view/face-icon.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';
import { moduleCompArray } from '@/sub-pages/prod/hook';
import { getChance, getChangeCust, getProdBizType, getPpmProd, getCpmProd } from '@/apis/mkt';
import { convertFontSizeToRem, splitFn } from '@/utils/global';
const route = useRoute();
const router = useRouter();
const dataMap = reactive({
  //客户信息
  chanceCustData: {} as any,
  //商机信息
  chanceData: {} as any,

  recProdParams: [] as any,
  recPpmProds: [] as any, // 零售产品
  recCpmProds: [] as any, // 对公产品
});
const { chanceData, chanceCustData, recProdParams, recPpmProds, recCpmProds } = toRefs(dataMap);
// 推荐产品
const recProds = computed(() => {
  return recPpmProds.value.concat(recCpmProds.value);
});
const moduleCompList = () => {
  let ans = [] as any;
  moduleCompArray.forEach((e) => (ans = ans.concat(e.bigTypes)));
  return ans;
};

//获取商机客户信息
const getChanceCust = async () => {
  const { code, data } = await getChangeCust({ changeCustId: route.params.changeCustId });
  if (code === 200) {
    dataMap.chanceCustData = data || {};
  }
};
//获取商机信息
const getChanceData = async () => {
  const { code, data } = await getChance({ chanceId: route.params.chanceId, ...chanceData.value });
  if (code === 200) {
    dataMap.chanceData = data || {};
    if (data?.recProdId) getProdBizTypeData(); // 如果有推荐产品
  }
};

//获取营销商机详情-推荐产品信息(零售)
const initPpmProd = async (arry: any) => {
  const { code, data } = await getPpmProd({ cpmProdDTO4ListTittleList: arry });
  if (code === 200) {
    recPpmProds.value = data;
  }
};
//获取营销商机详情-推荐产品信息(对公 --普惠)
const initCpmProd = async (arry: any) => {
  const { code, data } = await getCpmProd({ cpmProdDTO4ListTittleList: arry });
  if (code === 200) {
    recCpmProds.value = data;
  }
};

// 获取推荐产品类型
const getProdBizTypeData = async () => {
  let ans = splitFn(dataMap.chanceData.recProdId) || [];

  Promise.all(
    ans.map((item) => {
      return new Promise((resolve, reject) => {
        getProdBizType({ prodId: item }).then((res) => {
          if (res.code === 200 && !!res.data) {
            recProdParams.value.push(res.data);
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    })
  )
    .then(() => {
      let a = recProdParams.value.filter((item: any) => item.bizType === '20') || []; // 零售产品
      let b = recProdParams.value.filter((item: any) => item.bizType === '10') || []; // 对公产品
      if (a.length > 0) initPpmProd(a);
      if (b.length > 0) initCpmProd(b);
    })
    .catch((err) => {
      console.error('err :>> ', err);
    });
};

// 接触登记
const goContactView = (val: any) => {
  let _custData = chanceCustData.value || {};
  let _chanceData = chanceData.value || {};
  // 1-零售存量 2公司存量 3零售潜客 4公司潜客
  if (_custData.changeCustType == '1' || _custData.changeCustType == '3') {
    router.push({
      name: 'pcm-view-contact', // 零售客户-营销接触
      query: {
        isCust: _custData.changeCustType === '1' ? '1' : '0', // 是否存量客户
        custId: _custData.custId,
        custName: _custData.custName,
        srcId: _custData.changeCustId,
        exeRegSrc: '1', // 登记渠道:1-商机，3-客户视图，5-任务执行
        showTab: val,
        reason: _chanceData.chanceName,
      },
    });
  } else {
    router.push({
      name: 'ccm-view-service-info', // 对公客户-营销接触
      query: {
        isCust: _custData.changeCustType === '2' ? '1' : '0', // 是否存量客户
        custId: _custData.custId,
        custName: _custData.custName,
        srcId: _custData.changeCustId,
        exeRegSrc: '1', // 登记渠道:1-商机，3-客户视图，5-任务执行
        showTab: val,
        reason: _chanceData.chanceName,
      },
    });
  }
};
// 意向反馈
const gotoFeedBack = () => {
  router.push({
    name: 'mkt-chance-fb',
    query: {
      custId: chanceCustData.value.custId,
      chanceId: chanceData.value.chanceId,
    },
  });
};

onMounted(() => {
  getChanceData();
  getChanceCust();
});
</script>
<style lang="less" scoped>
.container {
  padding-bottom: 230px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    margin: 24px 32px;
    .right-text {
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
      color: @primary-color;
      letter-spacing: 0;
      text-align: right;
      line-height: 28px;
      font-weight: 400;
    }
  }
  .prod-card {
    margin: 0 32px;
    .backimg {
      box-sizing: content-box;
      width: 100%;
      box-shadow: none;
      background: none;
      background-image: url('@/assets/images/mkt/background.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .card-content {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .label {
        font-family: PingFangSC-Regular;
        font-size: @font-size-22;
        color: @gray;
        letter-spacing: 0;
        line-height: 22px;
        font-weight: 400;
        margin-top: 12px;
      }
      .red-value {
        font-family: PingFangSC-Medium;
        font-size: @font-size-24;
        color: @red;
        letter-spacing: 0;
        line-height: 44px;
        font-weight: 500;
      }
      .big {
        font-size: @font-size-44;
      }
      .value {
        font-family: PingFangSC-Medium;
        font-size: @font-size-26;
        color: @text;
        letter-spacing: 0;
        text-align: center;
        line-height: 26px;
        font-weight: 500;
      }
    }
  }

  .content {
    margin: 24px;
    min-height: 150px;
    background: @gray-1;
    border-radius: 20px;
    padding: 16px 24px;
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @gray;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
    text-align: justify;
    word-wrap: break-all;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    height: 220px;
    width: 100%;
    &-item {
      width: 50%;
      margin: 30px 0;
      text-align: center;
      .img {
        width: 90px;
        height: 70px;
        margin-bottom: 28px;
      }
    }
  }
}
</style>
