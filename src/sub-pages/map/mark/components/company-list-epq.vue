<template>
  <van-search v-model="reqParams.custName" shape="round" show-action placeholder="客户名称" @search="onSearch">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <van-field
                v-model="reqParams.custId"
                name="custId"
                label="客户号"
                input-align="right"
                placeholder="请输入"
                clearable
              ></van-field>
              <van-field
                v-model="reqParams.uniformCreditCode"
                name="uniformCreditCode"
                label="统一社会信用代码"
                label-width="8em"
                input-align="right"
                placeholder="请输入"
                clearable
              ></van-field>
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
  <dadp-refresh-list
    ref="refreshListRef"
    class="refresh-list"
    :requestApi="listMyEpqcust"
    :reqParams="{
      ...reqParams,
    }"
  >
    <template v-slot="{ data }">
      <dadp-card avatar="ent">
        <template #title>
          <van-space>
            <span>{{ data.epqcustName }}({{ data.epqcustId }})</span>
          </van-space>
        </template>
        <template #subTitle>
          <van-space>
            <van-icon name="idcard" color="#ff8812" />
            <span>{{ data.uniformCreditCode || '--' }}</span>
          </van-space>
        </template>
        <template #header-right>
          <div style="white-space: nowrap">
            <van-button type="primary" @click="setMark(data)">标注</van-button>
          </div>
        </template>
      </dadp-card>
    </template>
  </dadp-refresh-list>
  <van-action-bar>
    <van-action-bar-button type="primary" text="新增潜客" @click="router.push('/ccm-epq/add')" />
  </van-action-bar>
</template>
<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { listMyEpqcust } from '@/apis/cust';
import { epqCustMark } from '@/apis/map';
import { showToast } from 'vant';

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const router = useRouter();
const route = useRoute();
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

const reqParams = ref({
  custId: '',
  custName: '',
  uniformCreditCode: '',
});

// 查询
const onSearch = async () => {
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

// 客户标注
const setMark = async (item) => {
  const { code, msg } = await epqCustMark({
    custId: item.epqcustId,
    markLng: props.data.markLng,
    markLat: props.data.markLat,
    markAddr: props.data.markAddr,
  });
  showToast(msg);
};

onActivated(() => {
  onSearch();
});
</script>

<style lang="less" scoped>
.refresh-list {
  background-color: @gray-1;
  padding: 32px;

  :deep(.van-pull-refresh) {
    padding-bottom: 100px;
  }
}
</style>
