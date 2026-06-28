<!--
 * @desc: 营销商机-意向反馈
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <div class="container">
    <van-cell-group inset>
      <van-cell title="客户名称" :value="chanceCustData.companyName || chanceCustData.custName || '--'" />
    </van-cell-group>
    <div v-if="!chanceId" class="footer">
      <van-button round size="large" type="primary" text="添加反馈" @click="showPicker = true" />
      <van-popup v-model:show="showPicker" position="bottom" round>
        <van-picker :columns="columns" option-height="5vh" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </div>
    <van-cell-group inset>
      <van-collapse v-model="collapseModel" :border="false" accordion>
        <van-collapse-item v-for="(item, index) in selectedChanceData" :key="index" :name="item.chanceId" :title="item.chanceName">
          <template #title>
            <van-cell style="padding: 0" title="商机名称" :value="item.chanceName || '--'" />
          </template>
          <van-form @submit="saveData(item)">
            <van-cell title="营销产品" :value="item.mktProdName || '--'" />
            <busi-prod-kind
              v-model="item.intentionProdKindIdList"
              label="意向产品目录"
              input-align="right"
              placeholder="请选择"
              multiple
              @doSelect="doSelectFn1($event, item)"
            ></busi-prod-kind>
            <busi-prod
              v-model="item.intentionProdIdList"
              label="意向产品"
              input-align="right"
              placeholder="请选择"
              multiple
              @doSelect="doSelectFn2($event, item)"
            ></busi-prod>
            <van-field
              v-model="item.intentionAmount"
              class="reverse-field"
              type="number"
              label="意向金额"
              label-align="top"
              placeholder="请输入"
            >
              <template #right-icon><span class="sign">¥</span></template>
            </van-field>
            <dadp-select
              v-model="item.intentionLevel"
              :options="getCombo('intentionLevel')"
              label="意向程度"
              input-align="right"
              placeholder="请选择"
            ></dadp-select>
            <dadp-select
              v-model="item.intentionJoin"
              :options="getCombo('inviteFb')"
              label="活动意向"
              input-align="right"
              placeholder="请选择"
            ></dadp-select>
            <dadp-select
              v-model="item.intentionLoanAgain"
              :options="getCombo('loanFb')"
              label="续贷意向"
              input-align="right"
              placeholder="请选择"
            ></dadp-select>
            <dadp-file label="附件" module-id="T_PMM_CHANGE_CUST_INTENTION" :business-id="item.changeCustIntentionId"></dadp-file>
            <van-field v-model="item.remark" label="备注" input-align="right" error-message-align="right" placeholder="请输入" />
            <div class="gform-footer">
              <van-button round size="large" type="primary" text="保存" native-type="submit" />
              <van-button round size="large" type="primary" text="完成" @click="endSaveData(item)" />
            </div>
          </van-form>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </div>
</template>
<script lang="ts" setup>
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import busiProd from '@/components/business/busi-prod.vue';
import busiProdKind from '@/components/business/busi-prod-kind.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import { showToast } from 'vant';
import { listChangeCust, saveChanceFeed, getChanceFeed, getChanceFeedId, getChance } from '@/apis/mkt';
import { getCombo } from '@/hook/code-hook';
import { splitFn } from '@/utils/global';

defineOptions({ name: 'mkt-chance-fb' });

const route = useRoute();
const router = useRouter();

const custId = ref(route.query.custId as string);
const chanceId = ref(route.query.chanceId as string);

const collapseModel = ref('');
const chanceCustData = ref({} as any);
// 选择商机
const showPicker = ref(false);
const columns = computed(() => {
  return (
    chanceCustData.value?.pmmChangeVOList
      ?.filter((item: any) => !selectedChanceData.value.find((x: any) => x.chanceId === item.chanceId))
      ?.map((item: any) => ({
        text: item.chanceName,
        value: item.chanceId,
      })) || []
  );
});
const selectedChanceData = ref([] as any);

// 意向产品目录回调事件
const doSelectFn1 = (checkData: any, item: any) => {
  item.intentionProdKindNames = checkData.map((e: any) => e.name).join(',');
};
// 意向产品回调事件
const doSelectFn2 = (checkData: any, item: any) => {
  item.intentionProdName = checkData.map((e: any) => e.prodName).join(',');
};

//获取营销商机详情-客户信息
const getChanceCust = async () => {
  const { code, data } = await listChangeCust({
    chanceId: route.query.chanceId,
    custId: custId.value,
    pageNo: 1,
    pageSize: 1,
    chanceSts: ['1', '2', '3'],
  });
  if (code === 200) {
    chanceCustData.value = data.rows?.[0] || {};
    // 已选定营销商机
    if (!!chanceId.value) {
      initFbData(chanceId.value);
    }
  }
};

// 初始化意向反馈历史数据
const initFbData = async (chanceId) => {
  const { data: chanceInfo } = await getChance({ chanceId: chanceId });
  let ans = { ...chanceInfo, mktProdId: chanceInfo.recProdId, mktProdName: chanceInfo.recProdName };
  const { data } = await getChanceFeed({ chanceId: chanceId, custId: custId.value });
  if (data && data.changeCustIntentionId) {
    let _intentionProdId = splitFn(data.intentionProdId);
    let _intentionProdName = splitFn(data.intentionProdName);
    ans = {
      ...data,
      ...ans,
      intentionProdKindIdList: splitFn(data.intentionProdKindIds),
      intentionProdIdList: _intentionProdId.map((item, index) => ({ prodId: item, prodName: _intentionProdName[index] })),
    };
  } else {
    const { msg: changeCustIntentionId } = await getChanceFeedId({});
    ans = {
      ...ans,
      changeCustIntentionId: changeCustIntentionId,
      intentionProdIdList: [], //意向产品
      intentionProdKindIdList: [], // 意向产品目录
      intentionAmount: '', //意向金额
      intentionLevel: '', //意向程度
      intentionJoin: '', //活动意向/邀约
      intentionLoanAgain: '', //续贷意向
    };
  }
  selectedChanceData.value.push(ans);
  collapseModel.value = chanceId;
};

// 选中商机确认事件
const onConfirm = async (val: any) => {
  initFbData(val.selectedValues[0]);
  showPicker.value = false;
};

// 保存
const saveData = async (item: any) => {
  const { code } = await saveChanceFeed({
    custId: custId.value,
    custName: chanceCustData.value.companyName || chanceCustData.value.custName,
    changeCustIntentionId: item.changeCustIntentionId,
    chanceId: item.chanceId,
    chanceName: item.chanceName,

    intentionProdKindIds: item.intentionProdKindIdList.join(','), // 意向产品目录
    intentionProdKindNames: item.intentionProdKindNames,

    intentionProdId: (item.intentionProdIdList || []).map((e) => e.prodId).join(','), // 意向产品
    intentionProdName: item.intentionProdName,

    intentionAmount: item.intentionAmount, // 意向金额
    intentionLevel: item.intentionLevel, // 意向程度
    intentionJoin: item.intentionJoin, // 活动意向/邀约
    intentionLoanAgain: item.intentionLoanAgain, // 续贷意向

    remark: item.remark,
  });
  if (code === 200) {
    showToast('保存成功');
    collapseModel.value = '';
  }
};
// 完成
const endSaveData = async (item: any) => {
  await saveData(item);
  router.back();
};

onMounted(() => {
  getChanceCust();
});
</script>
<style lang="less" scoped>
.container {
  padding: 24px 0px;
  padding-bottom: 120px;
  .van-cell-group + .van-cell-group {
    margin-top: 24px;
  }
  .reverse-field {
    :deep(.van-field__label--top) {
      margin-bottom: 32px;
    }
    :deep(.van-field__value) {
      border-bottom: 1px solid @gray-3;
      padding-bottom: 30px;
      .van-field__body {
        flex-direction: row-reverse;
      }
    }

    .sign {
      font-family: PingFangSC-Semibold;
      font-size: @font-size-40;
      color: @text;
      letter-spacing: 0;
      line-height: 40px;
      font-weight: 600;
      margin-right: 32px;
    }
  }
  .footer {
    padding: 24px;
  }
}
</style>
