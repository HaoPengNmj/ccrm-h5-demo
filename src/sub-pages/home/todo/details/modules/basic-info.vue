<!--
 * @desc: 待办（申请、审批）详情-基础信息
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-10-06 18:33:36
-->
<template>
  <div class="todo-dtl">
    <dadp-card
      avatar="task"
      :title="instanceInfo?.title"
      :status="codeTranslate('wfInstanceStatus', instanceInfo?.status)"
      :status-color="getColor(instanceInfo?.status)"
      is-body-padding
    >
      <div class="grow">
        <span class="glabel">模板类型：</span>
        <span class="gvalue">{{ codeTranslate('wfTemplateType', instanceInfo?.templateType) }}</span>
      </div>
      <div class="grow">
        <div class="gcol">
          <span class="glabel">申请时间：</span>
          <span class="gvalue">{{ instanceInfo?.startTime }}</span>
        </div>
        <div class="gcol">
          <span class="glabel">申请人姓名：</span>
          <span class="gvalue">{{ instanceInfo?.applyUserName }}</span>
        </div>
      </div>
      <div class="grow">
        <div class="gcol">
          <span class="glabel">当前节点：</span>
          <span class="gvalue">{{ instanceInfo?.nodeName }}</span>
        </div>
      </div>
    </dadp-card>

    <component :is="componentId" :busiId="instanceInfo?.busiId"></component>
  </div>
</template>
<script lang="ts" setup>
import tmpPerfClaim from '@/sub-pages/home/todo/details/templates/tmp-perf-claim.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  // 流程信息
  instanceInfo: {
    type: Object,
    default: () => {},
  },
  // 模板类型
  templateType: {
    type: String,
    default: '',
  },
});

const templateList = [
  {
    templateName: '业绩认领',
    templateType: [
      'arPcmBusiApproveHandler',
      'arPcmBusiApproveOHandler',
      'arPcmBusiApproveSpanTTHandler',
      'arPcmBusiApproveSpanTOHandler',
      'arPcmBusiApproveSpanOTHandler',
      'arPcmBusiApproveSpanOOHandler',
    ],
    comp: tmpPerfClaim,
  },
];
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
const componentId = computed(() => {
  if (!props.templateType) {
    console.error('模板类型不能为空');
    return;
  }
  const templateObj = templateList.find((item) => item.templateType.indexOf(props.templateType) > -1);
  return templateObj?.comp;
});
</script>
<style lang="less" scoped>
.todo-dtl {
  padding: 24px;
}
</style>
