<template>
  <van-field name="uploader" :label="label" label-align="top">
    <template #input>
      <div class="container">
        <div class="container-item" v-for="file in fileList" :key="file.fileId">
          <van-image class="icon" :src="fileIcon"></van-image>
          <div class="name">{{ file.clientFileName }}</div>
        </div>
      </div>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import fileIcon from '@/assets/images/common/file.png';
import { listFiles } from '@/apis/common';
const props = defineProps({
  // 模块ID
  moduleId: {
    type: String,
    default: '',
  },
  // 业务ID
  businessId: {
    type: String,
    default: '',
  },
  // 表单示标题
  label: {
    type: String,
    default: '附件',
  },
});
const fileList = ref([] as any[]);
// 获取文件信息
async function getFileList() {
  const { data } = await listFiles({ bizId: props.businessId, moduleId: props.moduleId });
  fileList.value = data || [];
}
watchEffect(() => {
  if (props.businessId) getFileList();
});
defineExpose({ getFileList });
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  &-item {
    background: @gray-1;
    border-radius: 20px;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @gray;
    line-height: 28px;
    font-weight: 400;
    padding: 24px;
    display: flex;
    align-items: center;
    .icon {
      height: 30px;
      width: 30px;
      margin-right: 24px;
    }
    .name {
      width: 0px;
      flex: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & + & {
      margin-top: 24px;
    }
  }
}
</style>
