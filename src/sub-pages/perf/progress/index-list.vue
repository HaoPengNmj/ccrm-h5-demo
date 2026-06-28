<template>
  <div class="list">
    <div v-for="(item, index) in showData" :key="index" class="list-item">
      <div class="header" @click="nameClickFn(item)">
        <span>{{ item.indexName }}</span>
      </div>
      <div class="content">
        <div class="item-left">
          <div class="text">
            {{ fmtMaskData(amountUnitConvert(item.cpltVal), isMark) }} / {{ fmtMaskData(amountUnitConvert(item.targetVal), isMark) }}
          </div>
          <div>实际完成值/目标值</div>
        </div>
        <div class="item-right">
          <div class="red">{{ fmtMaskData(`${fmtThousands(item.cpltRate, 2)}%`, isMark) }}</div>
          <div>完成进度</div>
        </div>
      </div>
      <div class="progress">
        <van-progress
          stroke-width="0.5em"
          text-color="#222222"
          :show-pivot="false"
          :percentage="item.cpltRate < 0 ? 0 : item.cpltRate > 100 ? 100 : item.cpltRate || 0"
        ></van-progress>
      </div>
    </div>
    <dadp-empty v-if="showData.length === 0"></dadp-empty>

    <template v-if="total > 8">
      <div class="list-footer" @click="footerClickFn">
        <span class="text">{{ !isLoadData && isMore ? '收起' : '展示更多' }}</span>
        <van-icon :name="!isLoadData && isMore ? 'arrow-up' : 'arrow-down'" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { pbmPlanScheindexList } from '@/apis/perf';
import { fmtMaskData, fmtThousands } from '@/utils/format';
import { amountUnitConvert } from '@/utils/global';
const props = defineProps({
  queryParams: {
    type: Object,
    default: () => {},
  },
  isMark: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['clickIndex']);
const dataMap = reactive({
  pageNo: 1,

  total: 0,
  tableData: Array<any>(),
  isLoadData: false, // 是否还需加载数据
  isMore: false, // 是否展示更多
});
const { total, isLoadData, isMore } = toRefs(dataMap);

// 展示数据
const showData = computed(() => {
  return dataMap.isMore ? [...dataMap.tableData] : [...dataMap.tableData.slice(0, 8)];
});

// 查询方法
const loadData = async (init = false) => {
  dataMap.pageNo = init ? 1 : dataMap.pageNo;

  const { data } = await pbmPlanScheindexList({
    ...props.queryParams,
    pageNo: dataMap.pageNo,
    pageSize: 8,
    // sortOrders: [{ sortTab: 'taskCpltRate', sortWay: 'descending' }],
  });
  const { rows, total } = data;
  let ans = [
    ...rows?.map((e) => {
      e.objName = e.taskObj === 'ORG' ? e.orgName : e.userName;
      return e;
    }),
  ];
  dataMap.tableData = init ? ans : dataMap.tableData.concat(ans);
  dataMap.total = total;
  dataMap.isLoadData = dataMap.total > 0 && dataMap.total > dataMap.tableData.length;
};

// 展示更多
const footerClickFn = () => {
  if (dataMap.isLoadData) {
    dataMap.isMore = true;
    dataMap.pageNo++;
    loadData();
  } else {
    dataMap.isMore = !dataMap.isMore;
  }
};

// 点击指标名称
const nameClickFn = (row: any) => {
  emit('clickIndex', row);
};

defineExpose({ loadData });
</script>
<style lang="less" scoped>
.list {
  padding-top: 24px;
  &-item {
    border: 1px solid @gray-5;
    border-radius: 12px;
    padding: 24px;
    .header {
      font-family: PingFangSC-Medium;
      font-size: @font-size-32;
      letter-spacing: 0;
      font-weight: bold;
      text-align: justify;
      padding-bottom: 12px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-left {
        font-size: @font-size-20;
        color: @gray;
        text-align: left;
        .text {
          font-family: PingFangSC-Regular;
          font-size: @font-size-32;
          color: @black;
          text-align: left;
          line-height: 46px;
        }
      }
      .item-right {
        font-size: @font-size-20;
        color: @gray;
        text-align: right;
        .red {
          font-family: PingFangSC-Regular;
          font-size: @font-size-32;
          color: @red;
          line-height: 46px;
        }
      }
    }
    .progress {
      padding-top: 12px;
    }
    & + & {
      margin-top: 24px;
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    color: @gray;
    .text {
      margin-right: 16px;
    }
  }
}
:deep(.van-progress__portion) {
  background: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
}
</style>
