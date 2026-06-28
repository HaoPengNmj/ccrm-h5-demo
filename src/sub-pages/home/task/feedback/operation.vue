<!--
 * @desc: 日常任务反馈
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-09-30 10:57:18
-->
<template>
  <div class="operation">
    <van-form @submit="submitFn">
      <van-cell-group>
        <van-field
          v-model="queryParams.fbCry"
          class="area"
          type="textarea"
          label="任务反馈"
          label-align="top"
          placeholder="请输入"
          rows="5"
          autosize
          required
          :rules="[{ required: true, message: '请输入任务反馈' }]"
        ></van-field>
      </van-cell-group>

      <van-cell-group>
        <dadp-datetime
          v-model="queryParams.nextFbTime"
          label="下次计划反馈时间"
          placeholder="请选择日期"
          input-align="right"
        ></dadp-datetime>
      </van-cell-group>

      <van-action-bar>
        <div class="operation__button">
          <van-button text="保存" size="large" type="primary" round native-type="submit" />
        </div>
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import dadpDatetime from '@/components/dadp-ui/dadp-datetime.vue';
import { showToast } from 'vant';
import { saveTaskExeFb } from '@/apis/home';
import { getFileBizId } from '@/apis/common';

defineOptions({ name: 'task-fb-save' });
const currentRoute = useRoute();
const router = useRouter();
// form表单
const queryParams = ref({
  taskExeFbId: '',
  fbCry: '',
  nextFbTime: '',
} as any);

// 保存
const submitFn = async () => {
  const { code, msg } = await saveTaskExeFb({
    taskId: currentRoute.params.taskId,
    taskExeId: currentRoute.params.taskExeId,
    ...queryParams.value,
  });
  if (code === 200) {
    showToast(msg);
    router.back();
  }
};

// 初始化主键ID
const initId = async () => {
  const { code, data } = await getFileBizId();
  if (code === 200) {
    queryParams.value.taskExeFbId = data;
  }
};

onMounted(() => {
  initId();
});
</script>

<style lang="less" scoped>
.operation {
  padding: 24px;
  .area {
    :deep(.van-cell__value) {
      padding: 16px 24px;
      background: @gray-1;
      border-radius: 20px;
    }
  }
  &__button {
    box-sizing: border-box;
    padding: 10px 33px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .van-button + .van-button {
      margin-left: 30px;
    }
  }
}
</style>
