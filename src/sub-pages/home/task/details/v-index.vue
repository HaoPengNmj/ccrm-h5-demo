<!--
 * @desc: 日常任务详情
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-10-08 15:02:35
-->
<template>
  <div class="task-dtl">
    <van-cell-group inset>
      <van-cell
        title="触客形式"
        :value="
          splitFn(result.taskType)
            .map((item) => codeTranslate('pdtTaskType', item))
            .join(',')
        "
      />
      <van-cell title="生效日期" :value="result.beginDate" />
      <van-cell title="结束日期" :value="result.endDate" />
      <van-cell title="任务名称" :value="result.taskName" />
      <van-cell title="触客周期类型" :value="codeTranslate('pdtTaskCyc', result.taskCyc)" />
    </van-cell-group>
    <van-cell-group inset>
      <van-cell title="任务描述">
        <template #label>
          <div class="content">
            {{ result.taskDesc }}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset>
      <dadp-file-list label="任务反馈附件" moduleId="T_WP_TASK" :businessId="result.taskId"></dadp-file-list>
    </van-cell-group>
  </div>
</template>
<script lang="ts" setup>
import dadpFileList from '@/components/dadp-ui/dadp-file-list.vue';
import { getTask } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';
import { splitFn } from '@/utils/global';
defineOptions({ name: 'task-dtl' });
const currentRoute = useRoute();

// 响应数据
const result = ref({} as any);
// 获取详情数据
const getDetail = async () => {
  const { code, data } = await getTask({
    taskId: currentRoute.params.taskId,
  });
  if (code === 200) {
    result.value = data;
  }
};

onMounted(() => {
  getDetail();
});
</script>
<style lang="less" scoped>
.task-dtl {
  padding: 24px 0;
  .van-cell-group + .van-cell-group {
    margin-top: 24px;
  }
  .content {
    min-height: 150px;
    background: @gray-1;
    border-radius: 20px;
    padding: 16px 24px;

    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @gray;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
    text-align: justify;
  }
}
</style>
