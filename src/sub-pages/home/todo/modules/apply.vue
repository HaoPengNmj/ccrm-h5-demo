<!--
 * @desc: 我的申请
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-06 18:39:46
-->
<template>
  <van-search v-model="reqParams.title" shape="round" show-action placeholder="请输入申请主题" @search="onSearch">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <dadp-select
                v-model="reqParams.status"
                label="审批状态"
                :options="getCombo('wfInstanceStatus')"
                name="status"
                input-align="right"
                placeholder="请选择"
              />
              <dadp-select
                v-model="reqParams.templateType"
                label="流程类型"
                :options="getCombo('wfTemplateType')"
                name="templateType"
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
  <div class="total">申请总数：{{ refreshListRef?.total || '--' }}</div>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="listInstance" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card
        avatar="task"
        :title="data.title"
        :status="codeTranslate('wfInstanceStatus', data.status)"
        :status-color="getColor(data.status)"
        is-body-padding
        is-arrow
        @click="handleClick(data)"
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

import { listInstance } from '@/apis/home';
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
  status: '0',
  templateType: '',
} as any);
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
const handleClick = (data: any) => {
  router.push({
    path: `todo-dtl/${data.instanceId}`,
    query: {
      templateType: data.templateType,
      isOper: 'false',
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
