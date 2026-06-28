<template>
  <van-search v-model="reqParams.title" shape="round" show-action placeholder="请输入签到日期" @search="onSearch">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <dadp-date
                v-model=dateRange
                label="签到日期"
                value-fmt="yyyyMMdd"
                input-align="right"
                placeholder="请选择"
                clearable
                required
                type="range"
                :max-date="new Date()"
                :rules="[{required: true, message:'请选择日期'}]"
              />
            </van-cell-group>
            <div class="gform-footer">
              <van-button size="large" round plain @click="onCancel">取消</van-button>
              <van-button type="primary" size="large" round native-type="submit" :loading="sumbitLoading">确认</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-search>
  <div class="container">
    <div class="month-sign-count" v-if="monthSignCount">
      <span class="label">本月签到：</span>
      <span class="count">{{ monthSignCount }}</span>
      <span class="label">次</span>
    </div>
    <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="getUserSignData" :reqParams="reqParams" :pageSize="7">
    <template v-slot="{ data }">
        <dadp-card
          is-body-padding
        >
          <template #title>
            <div class="rowTitle">
              <span class="titleLeft">{{ data.dataDate }}</span>
              <span>|</span>
              <span class="titleRight">签到{{ data.total }}次</span>
            </div>
          </template>
          <div class="grow row" v-for="(item, index) in data.signList" :key="index" @click="handleClick(item)">
            <div class="gcol" style="position: relative">
              <van-space>
                <van-tag>{{  item.signTime1 }}</van-tag>
              </van-space>
              <div class="subRowTitle" v-if="item.signAddr">
                <van-text-ellipsis content='签到地点' rows="1"/>
              </div>
              <div class="text" v-if="item.signAddr">
                <van-text-ellipsis :content="item.signAddr" rows="1"/>
              </div>
              <div class="subRowTitle" v-if="item.signType">
                <van-text-ellipsis content='签到内容' rows="1"/>
              </div>
              <div class="text" v-if="item.signType">
                <van-text-ellipsis :content="item.signType" rows="1"/>
              </div>
            </div>
            <van-icon name="arrow"></van-icon>
          </div>    
        </dadp-card>
      </template>
  </dadp-refresh-list>
  </div>
  
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getUserSignData } from '@/apis/home';
import { formatDateString } from '@/utils/format';
import { getStorage } from '@/storage/storage';

onMounted(() => {
     fetchMonthSignCount();
});

const router = useRouter();
const userInfo = getStorage('userInfo');

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref
const dateRange = ref<string[]>([]);

const startDate = computed(() => {
  const startDateStr = dateRange.value?.[0] || '';
  return formatDateString(startDateStr);
});
const endDate = computed(() => {
  const endDateStr = dateRange.value?.[1] || '';
  return formatDateString(endDateStr);
});

const sumbitLoading = ref<boolean>(false);
  const monthSignCount = ref(0);

// 请求参数
const reqParams = ref({
  userId:userInfo.userId,
  signDateStart:startDate,
  signDateEnd:endDate,
} as any);

const reqParams1 = ref({
  userId:userInfo.userId,
  pageNo:1,
  pageSize:99
} as any);

// 单独获取monthSignCount
const fetchMonthSignCount = async () => {
  const res = await getUserSignData(reqParams1.value);
  if (res.data.monthSignCount !== undefined) {
    monthSignCount.value = res.data.monthSignCount;
  }
};
// 查询
const onSearch = () => {
  fetchMonthSignCount(); // 查询时同步刷新monthSignCount
  refreshListRef.value.onRefresh();
};

// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  sumbitLoading.value =true;
    try {
      onSearch();
      dropdownMenuRef.value.close();
      // 处理成功
    } catch (error) {
      console.error(error);
    } finally {
      sumbitLoading.value =false;
    }
  
};

// 点击事件
const handleClick = (data: any) => {
  const itemString = encodeURIComponent(JSON.stringify(data)); // 序列化对象
  router.push({
    path: 'statisticsDetail',
    query: { item: itemString }
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

.rowTitle{

  span:nth-child(2) {
    color: rgb(218, 210, 210);
    margin: 0 2%;
  }
  .titleLeft{
    font-weight: bold;
    font-size: @font-size-26;
  }
  .titleRight{
    font-size: @font-size-26;
  }
}
.container {
  padding: 24px;
  .row {
    white-space: nowrap;
    background-color: @gray-1;
    border-radius: 8px;
    padding: 10px;
    .text {
      font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      color: @text;
      letter-spacing: 0;
      line-height: 16px;
      font-weight: 400;
    }
    .subRowTitle{
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: rgb(218, 210, 210) ;
      letter-spacing: 0;
      line-height: 16px;
      font-weight: 400;
      margin-top: 10px;
    }
  }
  .row + .row {
    margin-top: 30px;
  }
  .label{
    font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      color: @text;
      color: rgb(131, 129, 129) ;
      font-weight: 400;
  }
  .count{
    font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      color: @text;
      color: rgb(12, 148, 226) ;
      font-weight: 1000;
  }
}
</style>
