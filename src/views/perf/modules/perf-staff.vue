<!--
 * @desc: 业绩-业绩认领
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-09-27 14:36:09
-->
<template>
  <div class="perf-claim" v-if="!isShowClaim">
    <dadp-card is-body-padding :style="isHome ? 'box-shadow: none' : ''">
      <van-tabs v-model:active="active" type="card" :ellipsis="false">
        <van-tab title="存款" name="dep">
          <van-field
            v-model="depAcct"
            label="存款账号"
            input-align="right"
            right-icon="search"
            placeholder="请输入/精准查询"
            required
            @click-right-icon="searchFn('dep')"
          ></van-field>
        </van-tab>
        <van-tab title="贷款" name="loan">
          <van-field
            v-model="loanAcct"
            label="贷款账号"
            input-align="right"
            right-icon="search"
            placeholder="请输入/精准查询"
            required
            @click-right-icon="searchFn('loan')"
          ></van-field>
        </van-tab>
      </van-tabs>
    </dadp-card>
    <dadp-card v-if="active === 'dep' && depData" :buttons="[{ name: '认领' }]" @footer-click="footClickFn">
      <van-cell title="客户号" :value="depData.custId || '--'" />
      <van-cell title="客户名称" :value="depData.companyName || depData.custName || '--'" />
      <van-cell title="存款账号" :value="depData.depAcct || '--'" />
      <van-cell title="开户日期" :value="depData.openDate || '--'" />
      <van-cell title="分配状态" :value="codeTranslate('allocStatus', depData.allocStatus) || '--'" />
    </dadp-card>
    <dadp-card v-else-if="active === 'loan' && loanData" :buttons="[{ name: '认领' }]" @footer-click="footClickFn">
      <van-cell title="客户号" :value="loanData.custId || '--'" />
      <van-cell title="客户名称" :value="loanData.companyName || loanData.custName || '--'" />
      <van-cell title="贷款账号" :value="loanData.loanAcct || '--'" />
      <van-cell title="贷款发放日期" :value="loanData.loanDate || '--'" />
      <van-cell title="产品类型" :value="codeTranslate('prodNo', loanData.prodType) || '--'" />
      <van-cell title="贷款账户类型" :value="codeTranslate('pbm_loanAcctType', loanData.loanAcctType) || '--'" />
      <van-cell title="分配状态" :value="codeTranslate('allocStatus', loanData.allocStatus) || '--'" />
    </dadp-card>
    <dadp-card v-else>
      <dadp-empty></dadp-empty>
    </dadp-card>
  </div>

  <claim
    v-else
    v-model:isShowClaim="isShowClaim"
    :perfId="perfInfo.perfId"
    :perfInfo="perfInfo"
    :perfType="active == 'dep' ? '00002' : '00001'"
    :allocStatus="active == 'dep' ? depData.allocStatus : loanData.allocStatus"
    @do-query="resetData"
  ></claim>
</template>
<script setup lang="ts">
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import claim from '@/sub-pages/perf/staff/claim.vue';
import { getDepAccount, getLoanAccount } from '@/apis/perf';
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  // 是否首页引用
  isHome: {
    type: Boolean,
    defult: false,
  },
  // 首页条件
  query: {
    type: String,
    default: '',
  },
});
const router = useRouter();

// 查询条件
const active = ref('dep');
const depAcct = ref('');
const depData = ref();
const loanAcct = ref('');
const loanData = ref();

//是否展示认领页面
const isShowClaim = ref(false);
const perfInfo = ref();

// 按账户搜索业绩
const searchFn = async (val: any) => {
  // 首页引用时点击查询跳转到业绩模块查询
  if (props.isHome) {
    router.push({
      name: 'perf',
      query: {
        active: 'perfStaffRef',
        queryParam: JSON.stringify({ depAcct: depAcct.value, loanAcct: loanAcct.value, active: active.value }),
      },
    });
  } else if (val === 'dep' && depAcct.value) {
    const { data } = await getDepAccount({
      pageNo: 1,
      pageSize: 1,
      depAcct: depAcct.value,
      allocStatus: '1,2',
      optType: '2',
    });
    depData.value = data.rows?.[0];
  } else if (val === 'loan' && loanAcct.value) {
    const { data } = await getLoanAccount({
      pageNo: 1,
      pageSize: 1,
      loanAcct: loanAcct.value,
      allocStatus: '1,2',
      optType: '2',
    });
    loanData.value = data.rows?.[0];
  }
};

// 进入业绩认领页面
const footClickFn = () => {
  // 业绩标识取当前贷款账号/存款账号
  perfInfo.value =
    active.value == 'dep' ? { ...depData.value, perfId: depData.value?.depAcct } : { ...loanData.value, perfId: loanData.value?.loanAcct };
  isShowClaim.value = true;
};

// 认领成功后清空数据
const resetData = () => {
  depAcct.value = '';
  loanAcct.value = '';
  depData.value = null;
  loanData.value = null;
};

onMounted(() => {
  // 是否带条件进入页面是的话赋值条件
  if (props.query) {
    let data = JSON.parse(props.query);
    depAcct.value = data.depAcct;
    loanAcct.value = data.loanAcct;
    active.value = data.active;
    searchFn(data.active);
  }
});
</script>

<style lang="less" scoped>
.perf-claim {
  padding: 24px;
  :deep(.van-tabs--card > .van-tabs__wrap) {
    width: 64%;
  }
  :deep(.van-tabs__nav--card) {
    margin: 0;
  }
}
</style>
