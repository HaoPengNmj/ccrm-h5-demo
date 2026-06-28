<!--
 * @desc: 营销任务详情-基本信息
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <div class="refresh-list">
    <span class="title">{{ taskInfo.taskName }}</span>
    <van-cell-group>
      <van-cell title="任务性质" :value="codeTranslate('taskShip', taskInfo.taskShip) || '--'" />
      <van-cell title="任务创建机构" :value="taskInfo.createOrgName || '--'" />
      <van-cell title="任务创建人" :value="taskInfo.createUserName || '--'" />
      <van-cell title="任务创建时间" :value="taskInfo.createDate || '--'" />
      <van-cell
        title="任务类型"
        :value="`${codeTranslate('taskBigType', taskInfo.taskBigType)} - ${codeTranslate('taskType', taskInfo.taskType)}`"
      />
      <van-cell title="营销产品" :value="taskInfo.mktProdNames || '--'" />
      <van-cell title="任务有效期" :value="`${taskInfo.taskStartDate} - ${taskInfo.taskEndDate}`" />
      <van-cell title="任务合作方" :value="taskInfo.taskCoop || '--'" />
      <van-cell title="任务形式" :value="codeTranslate('loveWay', taskInfo.loveWay) || '--'" />
      <van-cell title="关怀礼品" :value="codeTranslate('loveGift', taskInfo.loveGift) || '--'" />
      <van-cell title="任务地点" :value="taskInfo.taskAddr || '--'" />
      <van-cell title="名单类型" :value="codeTranslate('custListType', taskInfo.custListType) || '--'" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="任务要求">
        <template #label>
          <div class="content">
            {{ taskInfo.taskReq }}
          </div>
        </template>
      </van-cell>
      <van-cell title="任务描述">
        <template #label>
          <div class="content">
            {{ taskInfo.taskDes }}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script lang="ts" setup>
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  taskInfo: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="less" scoped>
.refresh-list {
  padding: 24px;
  .van-cell-group + .van-cell-group {
    margin-top: 24px;
  }
  .title {
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    margin: 24px 0;
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
