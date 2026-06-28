<!--
 * @desc: 个人客户视图-营销任务-意向反馈
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <div class="container">
    <van-cell-group inset>
      <van-cell title="客户名称" :value="custName || '--'" />
    </van-cell-group>
    <div class="footer">
      <van-button round size="large" type="primary" text="添加反馈" @click="showPicker = true" />
      <van-popup v-model:show="showPicker" position="bottom" round>
        <van-picker :columns="columns" option-height="5vh" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </div>
    <van-cell-group inset>
      <van-collapse v-model="collapseModel" :border="false" accordion>
        <van-collapse-item v-for="(item, index) in selectedTaskData" :key="index" :name="item.taskId" :title="item.taskName">
          <template #title>
            <van-cell style="padding: 0" title="任务名称" :value="item.taskName || '--'" />
          </template>
          <van-form @submit="saveData(item)">
            <van-cell title="营销产品" :value="item.activProd || '--'" />
            <busi-prod-kind
              v-model="item.intentionProds"
              label="意向产品"
              input-align="right"
              placeholder="请选择"
              multiple
              :max="5"
            ></busi-prod-kind>
            <van-field v-model="item.buyMon" class="reverse-field" type="number" label="意向金额" label-align="top" placeholder="请输入">
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
              v-model="item.inviteFb"
              :options="getCombo('inviteFb')"
              label="活动意向"
              input-align="right"
              placeholder="请选择"
            ></dadp-select>
            <dadp-select
              v-model="item.loanFb"
              :options="getCombo('loanFb')"
              label="续贷意向"
              input-align="right"
              placeholder="请选择"
            ></dadp-select>
            <dadp-file label="附件" module-id="T_PMM_TASK_FB" :business-id="item.taskFbId"></dadp-file>
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
import busiProdKind from '@/components/business/busi-prod-kind.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import { showToast } from 'vant';
import { getMktTask, getTaskFb, saveTaskFb } from '@/apis/mkt';
import { getFileBizId } from '@/apis/common';
import { getCombo } from '@/hook/code-hook';
import { splitFn } from '@/utils/global';
import { getStorage } from '@/storage/storage';

const route = useRoute();
const router = useRouter();

const custId = ref(route.query.custId as string);
const custName = ref(route.query.custName as string);

const collapseModel = ref('');
const taskDataOpts = ref(getStorage('selectedMktTasks') || []);
// 选择任务
const showPicker = ref(false);
const columns = computed(() => {
  return (
    taskDataOpts.value
      ?.filter((item: any) => !selectedTaskData.value.find((x: any) => x.taskId === item.taskId))
      ?.map((item: any) => ({
        text: item.taskName,
        value: item.taskId,
      })) || []
  );
});
const selectedTaskData = ref([] as any);

// 初始化意向反馈历史数据
const initFbData = async (_taskId) => {
  const { data: taskInfo } = await getMktTask({ taskId: _taskId });
  let ans = { ...taskInfo, taskName: taskInfo.taskName, activProd: taskInfo.mktProdNames };

  const { data } = await getTaskFb({ taskId: _taskId, custId: custId.value });
  if (data) {
    ans = { ...data, ...ans, intentionProds: splitFn(data.intentionProd) };
  } else {
    const { data } = await getFileBizId();
    ans = {
      ...ans,
      taskFbId: data,
      intentionProds: [], //意向产品
      buyMon: '', //意向金额
      intentionLevel: '', //意向程度
      inviteFb: '', //活动意向/邀约
      loanFb: '', //续贷意向
    };
  }
  selectedTaskData.value.push(ans);
  collapseModel.value = _taskId;
};

// 选中任务确认事件
const onConfirm = async (val: any) => {
  initFbData(val.selectedValues[0]);
  showPicker.value = false;
};

// 保存
const saveData = async (item: any) => {
  const { code } = await saveTaskFb({
    custId: custId.value,
    custName: custName.value,
    taskId: item.taskId,
    taskName: item.taskName,
    activProd: item.mktProdNames,

    intentionProd: item.intentionProds.join(','), // 意向产品
    buyMon: item.buyMon, // 意向金额
    intentionLevel: item.intentionLevel, // 意向程度
    inviteFb: item.inviteFb, // 活动意向/邀约
    loanFb: item.loanFb, // 续贷意向
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
