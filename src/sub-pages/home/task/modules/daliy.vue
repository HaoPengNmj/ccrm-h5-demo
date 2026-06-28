<!--
 * @desc: 日常任务
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 14:40:09
-->
<template>
  <van-search v-model="reqParams.taskName" shape="round" show-action placeholder="请输入搜索关键词" @search="onSearch">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <van-field name="radio" label="触客方式" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.taskTypeList" :options="getCombo('pdtTaskType')" clearable multiple />
                </template>
              </van-field>
              <van-field name="radio" label="周期类型" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.taskCyc" :options="getCombo('pdtTaskCyc')" clearable />
                </template>
              </van-field>
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
  <!-- <div class="total">申请总数：{{ refreshListRef?.total || '--' }}</div> -->
  <dadp-refresh-list
    ref="refreshListRef"
    class="refresh-list"
    :requestApi="listMyTask"
    :reqParams="{
      ...reqParams,
      taskType: reqParams.taskTypeList.join(','),
    }"
  >
    <template v-slot="{ data }">
      <dadp-card
        avatar="task"
        :title="data.taskName"
        :buttons="buttons"
        is-body-padding
        is-arrow
        @arrow-click="arrowClickFn(data)"
        @footer-click="(btn) => footerClickFn(btn, data)"
      >
        <template #subTitle>
          <van-space>
            <van-tag
              v-for="(item, index) in splitFn(data.taskType)"
              :key="index"
              :color="colors(item)?.color"
              :text-color="colors(item)?.textColor"
            >
              {{ codeTranslate('pdtTaskType', item) }}
            </van-tag>
          </van-space>
        </template>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">执行人名称：</span>
            <span class="gvalue">{{ data.exeUserName }}</span>
          </div>
          <div class="gcol">
            <span class="glabel">触客周期类型：</span>
            <span class="gvalue">{{ codeTranslate('pdtTaskCyc', data.taskCyc) }}</span>
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">任务有效时间：</span>
            <span class="gvalue">{{ data.beginDate }} - {{ data.endDate }}</span>
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
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import { listMyTask } from '@/apis/home';
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { hasPermission } from '@/hook/use-common-hook';
import { splitFn } from '@/utils/global';
const router = useRouter();

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

// 请求参数
const reqParams = ref({
  taskName: '',
  taskType: '',
  taskCyc: '',
  taskTypeList: [],
  pageSize: 20,
  pageNo: 1,
});

const colors = (item: any) => {
  switch (item) {
    case '1':
      return { color: '#fff3e7', textColor: '#FF8812' };
    case '3':
      return { color: '#e8f4ff', textColor: '#1F98FF' };
    case '5':
      return { color: '#ffe6e7', textColor: '#FF0D12' };
  }
};
const buttons = ref([
  {
    path: 'task-fb-save',
    name: '任务反馈',
    icon: 'records-o',
    permission: hasPermission('home-task_app-daliy-feedback_app'),
  },
  {
    path: 'task-fb',
    name: '反馈历史',
    icon: 'records-o',
    permission: hasPermission('home-task_app-daliy-history_app'),
  },
]).value.filter((e) => e.permission);

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

// 点击事件
const arrowClickFn = (item: any) => {
  router.push(`/task-dtl/${item.taskId}`);
};
const footerClickFn = (btn: any, item: any) => {
  router.push(`/${btn.path}/${item.taskId}/${item.taskExeId}`);
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
