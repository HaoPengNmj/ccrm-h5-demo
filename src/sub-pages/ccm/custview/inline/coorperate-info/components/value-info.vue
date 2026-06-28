<template>
  <div class="info-header">
    <span class="left">价值信息</span>
    <span class="right">单位：万元</span>
  </div>
  <dadp-card is-body-padding>
    <div class="ls-header">
      <div class="ls-header-ele">
        <div class="label">综合利润贡献度</div>
        <div class="value">{{ fmtThousands(valueInfo.compreProfitContributSum, 2) || '--' }}</div>
      </div>
      <div class="ls-header-ele">
        <div class="label">客户活跃度</div>
        <div class="value">{{ fmtThousands(valueInfo.custActSum, 2) || '--' }}</div>
      </div>
      <div class="ls-header-ele">
        <div class="label">客户忠诚度</div>
        <div class="value">{{ fmtThousands(valueInfo.custLoyaltySum, 2) || '--' }}</div>
      </div>
    </div>
    <van-cell title="金融资产余额" :value="fmtThousands(amountUnitConvert(valueInfo.assetBalance), 2) || '--'" />

    <template v-if="isMore">
      <van-cell title="金融资产月日均" :value="fmtThousands(amountUnitConvert(valueInfo.assetsBalanceM), 2) || '--'" />
      <van-cell title="金融资产季日均" :value="fmtThousands(amountUnitConvert(valueInfo.assetsBalanceQ), 2) || '--'" />
      <van-cell title="金融资产年日均" :value="fmtThousands(amountUnitConvert(valueInfo.assetsBalanceY), 2) || '--'" />
    </template>

    <van-cell title="总存款余额" :value="fmtThousands(amountUnitConvert(valueInfo.depBalTotal), 2) || '--'" />

    <template v-if="isMore">
      <van-cell title="总存款月日均" :value="fmtThousands(amountUnitConvert(valueInfo.depBalAvgM), 2) || '--'" />
      <van-cell title="总存款季日均" :value="fmtThousands(amountUnitConvert(valueInfo.depBalAvgS), 2) || '--'" />
      <van-cell title="总存款年日均" :value="fmtThousands(amountUnitConvert(valueInfo.depBalAvgY), 2) || '--'" />
    </template>

    <van-cell title="活期存款余额" :value="fmtThousands(amountUnitConvert(valueInfo.currDepBalance), 2) || '--'" />
    <van-cell title="定期存款余额" :value="fmtThousands(amountUnitConvert(valueInfo.reguDepBalance), 2) || '--'" />

    <template v-if="isMore">
      <van-cell title="保证金存款余额" :value="fmtThousands(amountUnitConvert(valueInfo.earnBal), 2) || '--'" />
      <van-cell title="理财余额" :value="fmtThousands(amountUnitConvert(valueInfo.finaPurchPrice), 2) || '--'" />
    </template>

    <van-cell title="授信总额" :value="fmtThousands(amountUnitConvert(valueInfo.creditAmountSum), 2) || '--'" />

    <template v-if="isMore">
      <van-cell title="未用信额度" :value="fmtThousands(amountUnitConvert(valueInfo.unCreditAmountSum), 2) || '--'" />
    </template>

    <van-cell title="贷款余额" :value="fmtThousands(amountUnitConvert(valueInfo.loanBalance), 2) || '--'" />

    <template v-if="isMore">
      <van-cell title="固定贷款余额" :value="fmtThousands(amountUnitConvert(valueInfo.loanFixedBal), 2) || '--'" />
      <van-cell title="流动贷款余额" :value="fmtThousands(amountUnitConvert(valueInfo.loanfloatBal), 2) || '--'" />
      <van-cell title="不良贷款金额" :value="fmtThousands(amountUnitConvert(valueInfo.badLoanBalance), 2) || '--'" />
      <van-cell title="贸易融资贷款余额" :value="fmtThousands(amountUnitConvert(valueInfo.tradeFinanceLoan), 2) || '--'" />
      <van-cell title="福费廷余额" :value="fmtThousands(amountUnitConvert(valueInfo.forfaitBal), 2) || '--'" />
      <van-cell title="贴现余额" :value="fmtThousands(amountUnitConvert(valueInfo.discountAmount), 2) || '--'" />
      <van-cell title="银承余额" :value="fmtThousands(amountUnitConvert(valueInfo.bacnkAcceptAmount), 2) || '--'" />
      <van-cell title="保函余额" :value="fmtThousands(amountUnitConvert(valueInfo.letterGuaranteeAmount), 2) || '--'" />
      <van-cell title="逾期非不良贷款" :value="fmtThousands(amountUnitConvert(valueInfo.overdueNobadLoanBalance), 2) || '--'" />
    </template>

    <div class="ls-footer" @click="isMore = !isMore">
      <span class="text">{{ !isMore ? '展示更多' : '收起更多' }}</span>
      <van-icon :name="!isMore ? 'arrow-down' : 'arrow-up'" />
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getValueInfoList } from '@/apis/cust';
import { fmtThousands } from '@/utils/format';
import { amountUnitConvert } from '@/utils/global';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const dataMap = reactive({
  valueInfo: Object(),
  isMore: false,
});
const { valueInfo, isMore } = toRefs(dataMap);

const initData = async () => {
  const res = await getValueInfoList({ custId: props.custInfo.custId });
  if (res.code == 200) {
    dataMap.valueInfo = res.data ? res.data : {};
  }
};

watchEffect(() => {
  if (props.custInfo.custId) initData();
});
</script>

<style lang="less" scoped>
.ls-header {
  display: flex;
  align-items: center;
  background-image: linear-gradient(180deg, #fdf6ea 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 32px 30px;
  &-ele {
    width: 100%;
    text-align: center;
    .label {
      font-family: PingFangSC-Regular;
      font-size: @font-size-22;
      line-height: 22px;
      color: @sub-text;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }
    .value {
      font-family: PingFangSC-Semibold;
      font-size: @font-size-30;
      line-height: 30px;
      font-weight: 600;
      margin-top: 24px;
    }
  }
}

.ls-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 32px;
  color: @gray;
  .text {
    margin-right: 16px;
  }
}
</style>
