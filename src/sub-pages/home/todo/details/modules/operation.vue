<!--
 * @desc: 待办（申请、审批）详情-处理
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-09-30 10:57:18
-->
<template>
  <div class="operation">
    <van-form>
      <van-cell-group>
        <van-field
          v-model="queryParams.remark"
          type="textarea"
          label="审批意见"
          label-align="top"
          placeholder="请输入"
          rows="5"
          autosize
          required
          :rules="[{ required: true, message: '请输入审批意见' }]"
        ></van-field>
        <van-cell>
          <span @click="queryParams.remark = '同意，按流程办理'">同意，按流程办理</span>
        </van-cell>
      </van-cell-group>

      <van-action-bar>
        <div class="operation__button">
          <van-button text="拒绝" size="large" plain round native-type="submit" @click="onClickButton('2')" />
          <van-button text="驳回" size="large" plain round native-type="submit" @click="onClickButton('3')" />
          <van-button text="通过" size="large" type="primary" round native-type="submit" @click="onClickButton('1')" />
        </div>
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { approveInstance } from '@/apis/home';
import { showToast } from 'vant';

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

const router = useRouter();

// form表单
const queryParams = ref({
  remark: '',
} as any);

//  approveType审批状态	1-通过 2-拒绝 3-驳回
const onClickButton = async (approveType: any) => {
  if (queryParams.value.remark) {
    const { code } = await approveInstance({
      templateId: props.instanceInfo?.templateId,
      templateType: props.instanceInfo?.templateType,
      instanceId: props.instanceInfo?.instanceId,
      busiId: props.instanceInfo?.busiId,
      approveType: approveType,
      remark: queryParams.value.remark,
    });
    if (code === 200) {
      showToast('操作成功');
      router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.operation {
  padding: 24px;
  :deep(.van-cell__value) {
    padding: 16px 24px;
    background: @gray-1;
    border-radius: 20px;
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
