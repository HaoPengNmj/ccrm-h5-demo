<!--
 * @desc: 我的审批
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-09 10:13:20
-->
<template>
  <van-search v-model="reqParams.applyUserName" shape="round" show-action placeholder="请输入申请人姓名" @search="onSearch">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <van-field name="taskStatus" label="任务状态" input-align="right">
                <template #input>
                  <dadp-radio v-model="reqParams.taskStatus" :options="getCombo('taskStatus')" />
                </template>
              </van-field>
              <dadp-select
                v-model="reqParams.status"
                label="审批状态"
                :options="getCombo('wfInstanceStatus')"
                name="status"
                input-align="right"
                placeholder="请选择"
                clearable
              />
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
  <div class="total">待审批总数：{{ refreshListRef?.total || '--' }}</div>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="listAppInstance" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card
        avatar="task"
        :title="data.title"
        :status="codeTranslate('wfInstanceStatus', data.status)"
        :status-color="getColor(data.status)"
        :buttons="
          TASK_STATUS === '0'
            ? buttons
            : [
                {
                  name: '查看',
                  icon: 'records-o',
                },
              ]
        "
        is-body-padding
        @footer-click="(val) => handleClick(val, data)"
      >
        <div class="grow">
          <span class="glabel">模板类型：</span>
          <span class="gvalue">{{ codeTranslate('wfTemplateType', data.templateType) }}</span>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">申请时间：</span>
            <span class="gvalue">{{ data.startTime }}</span>
          </div>
          <div class="gcol">
            <span class="glabel">申请人姓名：</span>
            <span class="gvalue">{{ data.applyUserName }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">当前节点：</span>
            <span class="gvalue">{{ data.nodeName }}</span>
          </div>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';

import { listAppInstance } from '@/apis/home';
import { codeTranslate, getCombo } from '@/hook/code-hook';
const router = useRouter();

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

const getColor = (val: any) => {
  switch (val) {
    case '1': // 通过
      return 'blue';
    case '2': // 拒绝
      return 'red';
    case '3': // 驳回
      return 'red';
    case '4': // 撤回
      return 'gray';
    default: // 申请中
      return 'orange';
  }
};

// 请求参数
const reqParams = ref({
  applyUserName: '',
  taskStatus: '0',
  status: '',
} as any);
// 待办已办按钮控制
const TASK_STATUS = ref('0');

watch(
  () => refreshListRef.value?.listData,
  () => {
    TASK_STATUS.value = reqParams.value.taskStatus;
  },
  {
    deep: true,
    immediate: true,
  }
);

// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};
// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  onSearch();
  dropdownMenuRef.value.close();
};

const buttons = ref([
  {
    name: '处理',
    icon: 'records-o',
  },
  {
    name: '查看',
    icon: 'records-o',
  },
]);
// 点击事件
const handleClick = (btn: any, data: any) => {
  router.push({
    path: `todo-dtl/${data.instanceId}`,
    query: {
      templateType: data.templateType,
      isOper: btn.name === '查看' ? 'false' : 'true',
    },
  });
};
</script>

<style lang="less" scoped>
.total {
  padding: 24px 32px 0;
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: 400;
}
.refresh-list {
  padding: 24px;
}
</style>
