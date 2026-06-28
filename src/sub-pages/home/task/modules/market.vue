<!--
 * @desc: 营销任务列表
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <van-search shape="round" v-model="reqParams.taskName" @search="onSearch" show-action placeholder="请输入营销任务名称">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <dadp-select
                v-model="reqParams.taskBigType"
                name="taskBigType"
                label="任务大类"
                :options="getCombo('taskBigType')"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <dadp-select
                v-model="reqParams.taskType"
                name="taskType"
                label="任务小类"
                :options="getCombo('taskType')"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <van-field name="radio" label="任务性质" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.taskShip" :options="taskShipOptions" />
                </template>
              </van-field>
              <van-field name="radio" label="任务状态" label-align="top">
                <template #input>
                  <dadp-radio
                    v-model="reqParams.taskSts"
                    :options="userInfo.isManager ? taskStsOptions : [{ value: '5', content: '执行中' }]"
                    :disabled="!userInfo.isManager"
                  />
                </template>
              </van-field>
            </van-cell-group>
            <div class="gform-footer">
              <van-button size="large" round plain @click="onClean">清空</van-button>
              <van-button type="primary" size="large" round native-type="submit">查询</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-search>
  <dadp-refresh-list
    ref="refreshListRef"
    class="refresh-list"
    :requestApi="userInfo.isManager ? listMktTaskByManger : listMktTask"
    :reqParams="reqParams"
  >
    <template v-slot="{ data }">
      <dadp-card
        avatar="task"
        :title="data.taskName"
        is-body-padding
        is-arrow
        :status="codeTranslate('taskSts', data.taskSts)"
        :status-color="getColor(data.taskSts)"
        @click="handleClick(data)"
      >
        <template #subTitle>
          <van-space>
            <van-tag color="#e8f4ff" text-color="#1F98FF">
              {{ codeTranslate('taskBigType', data.taskBigType) }}
            </van-tag>
            <van-tag color="#fff3e7" text-color="#FF8812">
              {{ codeTranslate('taskType', data.taskType) }}
            </van-tag>
          </van-space>
        </template>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">任务有效期：</span>
            <span class="gvalue">{{ data.taskStartDate || '--' }}至{{ data.taskEndDate || '--' }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">创建机构：</span>
            <span class="gvalue">{{ data.createOrgName }}</span>
          </div>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>
<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import { listMktTaskByManger, listMktTask } from '@/apis/mkt';
import { getCombo, codeTranslate } from '@/hook/code-hook';
import { resetFields } from '@/utils/global';
import { fmtDate } from '@/utils/format';
import { getStorage } from '@/storage/storage';

defineOptions({ name: 'mkt-task' });

const userInfo = getStorage('userInfo') || {}; // 用户信息

const router = useRouter();

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

const dataMap = reactive({
  reqParams: {
    taskName: '',
    taskBigType: '',
    taskType: '',
    taskSts: userInfo.isManager ? '5,7,8' : '5',
    taskSrc: '',
    taskShip: '', //任务性质
  },
  taskShipOptions: [
    { content: '全部', value: '' },
    { content: '目标类任务', value: '1' },
    { content: '执行类任务', value: '2' },
  ],
  taskStsOptions: [
    { value: '5,7,8', content: '全部' },
    { value: '5', content: '执行中' },
    { value: '7', content: '提前终止' },
    { value: '8', content: '任务结束' },
  ],
});
const { reqParams, taskStsOptions, taskShipOptions } = toRefs(dataMap);

const getColor = (val: any) => {
  switch (val) {
    case '5':
      return 'orange';
    case '7':
      return 'red';
    case '8':
      return 'gray';
    default:
      return 'orange';
  }
};

// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};
// 清空
const onClean = () => {
  resetFields(reqParams.value);
  reqParams.value.taskSts = userInfo.isManager ? '5,7,8' : '5';
};
// 提交
const onSubmit = () => {
  onSearch();
  dropdownMenuRef.value.close();
};
// 点击事件
const handleClick = (val: any) => {
  router.push(`/mkt-task-dtl/${val.taskId}`);
};
</script>
<style lang="less" scoped>
.refresh-list {
  padding: 24px;
}
</style>
