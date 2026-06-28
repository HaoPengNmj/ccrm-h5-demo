<!--
 * @desc: 首页-热销推荐
 * @Date: 2024-08-01 11:24:44
 * @LastEditTime: 2024-09-27 15:39:48
-->
<template>
  <div class="home-hot">
    <div class="home-hot-header">
      <div class="title">
        热销推荐
        <img height="25" alt="" src="@/assets/images/home/hot.png" />
      </div>
      <div class="more" @click="router.push('prod')">更多</div>
    </div>
    <div class="home-hot-content">
      <div class="content-left content-item" v-if="hotProdData[0]" @click="goProdDtl(hotProdData[0])">
        <div class="row">
          <van-text-ellipsis class="title" :content="hotProdData[0]?.prodName" :rows="2" />
          <!-- <span class="title">{{ hotProdData[0]?.prodName }}</span> -->
          <div class="type">{{ codeTranslate('prodType', hotProdData[0]?.kindProdType) }}</div>
        </div>
        <div class="row">
          <span class="rate">{{ getProdInfo(hotProdData[0]).value }}</span>
          <!-- <span class="sign">%</span> -->
        </div>
        <div class="row">
          <span class="text">{{ getProdInfo(hotProdData[0]).title }}</span>
        </div>
        <div class="row">
          <!-- <span class="desc">{{ fmtThousands(hotProdData[0]?.minMoney, 2) }}元起存｜{{ hotProdData[0]?.investDay }}存期</span> -->
        </div>
        <div class="row">
          <van-button type="primary" round>去了解</van-button>
        </div>
      </div>
      <div class="content-right">
        <div class="top content-item" v-if="hotProdData[1]" @click="goProdDtl(hotProdData[1])">
          <div class="row">
            <van-text-ellipsis class="title" :content="hotProdData[1]?.prodName" :rows="2" />
            <!-- <span class="title">{{ hotProdData[1]?.prodName }}</span> -->
            <div class="type">{{ codeTranslate('prodType', hotProdData[1]?.kindProdType) }}</div>
          </div>
          <div class="row">
            <span class="rate">{{ getProdInfo(hotProdData[1]).value }}</span>
            <!-- <span class="sign">%</span> -->
            <span class="text">{{ getProdInfo(hotProdData[1]).title }}</span>
          </div>
        </div>
        <div class="bottom content-item" v-if="hotProdData[2]" @click="goProdDtl(hotProdData[2])">
          <div class="row">
            <van-text-ellipsis class="title" :content="hotProdData[2]?.prodName" :rows="2" />
            <!-- <span class="title">{{ hotProdData[2]?.prodName }}</span> -->
            <div class="type">{{ codeTranslate('prodType', hotProdData[2]?.kindProdType) }}</div>
          </div>
          <div class="row">
            <span class="rate">{{ getProdInfo(hotProdData[2]).value }}</span>
            <!-- <span class="sign">%</span> -->
            <span class="text">{{ getProdInfo(hotProdData[2]).title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { listHotShow } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';
import { moduleComp, moduleCompArray } from '@/sub-pages/prod/hook';
import { fmtThousands } from '@/utils/format';
const router = useRouter();
const dataMap = reactive({
  hotProdData: Array<any>(),
});
const { hotProdData } = toRefs(dataMap);

const getProdInfo = (val) => {
  let ans = {
    title: val.prodName,
    value: '--',
  };
  switch (val.kindProdType) {
    // 公司存款
    case '1':
      ans.title = '挂牌存款利率';
      ans.value = `${fmtThousands(val?.listedDepRate, 2) || '--'}%`;
      break;
    // 公司贷款
    case '2':
      ans.title = '最低利率';
      ans.value = `${fmtThousands(val?.minRate, 2) || '--'}%`;
      break;
    // 公司理财
    case '3':
      ans.title = '年化收益率';
      ans.value = `${fmtThousands(val?.annualYield, 2) || '--'}%`;
      break;
    // 公司保函
    case '4':
      ans.title = '保证金';
      ans.value = `${fmtThousands(val?.marginAmount, 2) || '--'}`;
      break;
    // 公司银承
    case '5':
      ans.title = '手续费';
      ans.value = `${fmtThousands(val?.serviceRate, 2) || '--'}`;
      break;
    // 公司贸易融资
    case '6':
      ans.title = '期限';
      ans.value = `${val?.tradeInvestMonth || '--'}`;
      break;
    // 零售存款
    case '9':
      ans.title = '挂牌存款利率';
      ans.value = `${fmtThousands(val?.listedDepRate, 2) || '--'}%`;
      break;
    // 零售贷款
    case '10':
      ans.title = '最低利率';
      ans.value = `${fmtThousands(val?.minRate, 2) || '--'}%`;
      break;
    // 零售理财
    case '11':
      ans.title = '年化收益率';
      ans.value = `${fmtThousands(val?.annualYield, 2) || '--'}%`;
      break;
    // 零售基金
    case '12':
      ans.title = '风险等级';
      ans.value = `${codeTranslate('riskLevel', val?.riskLevel) || '--'}`;
      break;
    // 零售保险
    case '13':
      ans.title = '投保年龄';
      ans.value = `${val?.insureAge || '--'}`;
      break;
    // 零售贵金属
    case '14':
      ans.title = '产品售价';
      ans.value = `${fmtThousands(val?.prodSalePrice, 2) || '--'}`;
      break;
    // 零售卡产品
    case '15':
      ans.title = '卡类型';
      ans.value = `${codeTranslate('ppmCardProdType', val?.cardProdType)}`;
      break;
    // 普惠贷款
    case '18':
      ans.title = '最低利率';
      ans.value = `${fmtThousands(val?.minRate, 2) || '--'}%`;
      break;
    default:
      ans.title = '产品编号';
      ans.value = `${val.prodId || '--'}`;
      break;
  }
  return ans;
};

//获取零售存款产品推荐
const getHotProd = async () => {
  const { data, code } = await listHotShow({
    pageSize: 10,
    pageNo: 1,
    kindProdType: '9',
  });
  if (code === 200) {
    dataMap.hotProdData = data;
  }
};
//前往产品详情
const goProdDtl = (item: any) => {
  let bigType, smallType;
  Object.entries(moduleComp).forEach(([key, value]) => {
    Object.entries(value).forEach(([k, v]) => {
      if (v.kindProdType === item.kindProdType) {
        bigType = key;
        smallType = k;
      }
    });
  });
  if (bigType && smallType) router.push(`/prod-dtl/${bigType}/${smallType}/${item.prodId}`);
};
onMounted(() => {
  getHotProd();
});
</script>

<style lang="less" scoped>
.home-hot {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: @font-size-36;
      letter-spacing: 0;
      line-height: 36px;
      font-weight: 600;
    }
    .more {
      font-family: PingFangSC-Regular;
      font-size: @font-size-26;
      color: @gray;
      letter-spacing: 0;
      text-align: right;
      line-height: 22px;
      font-weight: 400;
    }
  }
  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 350px;
    .content-left {
      background-image: url('@/assets/images/home/hot1.png');
      height: 100%;
      width: 50%;
      flex: auto;
    }
    .content-right {
      height: 100%;
      width: 50%;
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        background-image: url('@/assets/images/home/hot2.png');
        width: 100%;
        height: 50%;
      }
      .bottom {
        margin-top: 24px;
        background-image: url('@/assets/images/home/hot3.png');
        width: 100%;
        height: 50%;
      }
    }

    .content-item {
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 24px;
      border: 1px solid @gray-2;
      box-sizing: border-box;
      padding: 24px;
      .row {
        display: flex;
        align-items: center;
      }
      .row + .row {
        margin-top: 12px;
      }
      .title {
        font-family: PingFangSC-Medium;
        font-size: @font-size-32;
        line-height: 32px;
        font-weight: 500;
        width: 100%;
      }
      .type {
        padding: 4px 8px;
        border-radius: 16px 16px 16px 0px;
        background: @primary-color-light;
        color: @primary-color;
        font-size: @font-size-20;
        font-family: PingFangSC-Medium;
        letter-spacing: 0;
        line-height: 20px;
        font-weight: 500;
        white-space: nowrap;
      }
      .rate {
        font-family: DINAlternate-Bold;
        font-size: @font-size-28;
        color: @red;
        line-height: 46px;
        font-weight: 700;
        word-break: break-all;
      }
      .sign {
        font-family: PingFangSC-Regular;
        font-size: @font-size-24;
        color: @red;
        text-align: center;
        line-height: 46px;
        font-weight: 400;
        margin-right: 12px;
      }
      .text {
        font-family: PingFangSC-Regular;
        font-size: @font-size-24;
        margin-left: 5px;
        color: #962e01;
        line-height: 24px;
        font-weight: 400;
        white-space: nowrap;
      }
      .desc {
        font-family: PingFangSC-Regular;
        font-size: @font-size-22;
        color: #962e01;
        line-height: 22px;
        font-weight: 400;
      }
    }
  }
}
</style>
