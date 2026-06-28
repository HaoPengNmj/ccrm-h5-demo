<!--
 * @desc: 待办（申请、审批）详情-流程信息
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-09-30 11:49:08
-->
<template>
  <div class="process-info">
    <van-cell-group inset>
      <van-steps direction="vertical" :active="pendingStepList.length">
        <van-step class="pstep" v-for="(item, index) in processLists" :key="index">
          <div class="pstep-header">{{ item.mockTemplateName }}</div>
          <van-cell-group class="pstep-body">
            <van-cell title="审批节点" :value="item.nodeName" />
            <van-cell title="审批状态">
              <span
                :class="{
                  'resovle-text': item.status === '1',
                  'reject-text': item.status === '2' || item.status === '3',
                }"
              >
                {{ codeTranslate('wfInstanceStatus', item.status) }}
              </span>
            </van-cell>
            <van-cell title="审批人名称" :value="item.userName || '--'" />
            <van-cell title="接收时间" :value="item.startTime || '--'" />
            <van-cell title="处理时间" :value="item.endTime || '--'" />
            <van-cell title="审批意见" :value="item.remark || '--'" />
          </van-cell-group>
        </van-step>
      </van-steps>
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { listStepInstance } from '@/apis/home';
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

// 流程信息
const processLists = computed(() => {
  return [...pendingStepList.value, ...doneStepList.value];
});
// 待处理流程
const pendingStepList = ref([] as any);
// 已处理流程
const doneStepList = ref([] as any);

// 获取流程信息
const getProcessList = async () => {
  const { code, data } = await listStepInstance({ instanceId: props.instanceInfo.instanceId });
  if (code === 200) {
    pendingStepList.value = data.pendingStepList;
    doneStepList.value = data.doneStepList;
  }
};

watchEffect(() => {
  getProcessList();
});
</script>

<style lang="less" scoped>
.process-info {
  padding: 24px 0;
  .pstep {
    &-header {
      font-family: PingFangSC-Medium;
      font-size: @font-size-32;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 500;
    }
    &-body {
      margin-top: 24px;
      background: @gray-1;
      border-radius: 20px;
      .van-cell {
        background-color: unset;

        .resovle-text {
          color: @success-color;
        }
        .reject-text {
          color: @danger-color;
        }
      }
    }
  }

  :deep(.van-steps) {
    border-radius: 20px;
  }
  :deep(.van-step--waiting) {
    .van-step__circle {
      background-image: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
    }
  }
  :deep(.van-step--process) {
    .van-step__circle {
      background-image: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
    }
  }
}
</style>
