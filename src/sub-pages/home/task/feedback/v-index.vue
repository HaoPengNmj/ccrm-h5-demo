<!--
 * @desc: 日常任务反馈历史
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-08 14:40:09
-->
<template>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="listTaskExeFb" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card avatar="date" :title="`反馈时间：${data.createDate}`" is-body-padding>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">任务反馈：</span>
            <van-text-ellipsis rows="2" :content="data.fbCry" expand-text=" 展开" collapse-text=" 收起" />
          </div>
        </div>
        <div class="grow">
          <div class="gcol">
            <span class="glabel">下次计划反馈时间：</span>
            <span class="gvalue">{{ data.nextFbTime }}</span>
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
import { listTaskExeFb } from '@/apis/home';
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { splitFn } from '@/utils/global';

defineOptions({ name: 'task-fb' });
const currentRoute = useRoute();
const router = useRouter();

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

// 请求参数
const reqParams = ref({
  taskId: currentRoute.params.taskId,
  taskExeId: currentRoute.params.taskExeId,
});

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
