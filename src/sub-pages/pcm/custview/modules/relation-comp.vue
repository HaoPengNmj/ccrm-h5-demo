<template>
  <dadp-card title="关联关系" class="pcm-view-card" is-body-padding>
    <div class="charts" v-if="showChart">
      <echarts-graph :nodes="nodes" :links="links" :zoom="zoom"></echarts-graph>
    </div>
    <dadp-empty v-else></dadp-empty>
  </dadp-card>
</template>
<script lang="ts" setup>
import echartsGraph from '@/components/charts/echarts-graph.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { numberDiv, numberMul } from '@/utils/calc-fn';
import { listPcmRelate } from '@/apis/cust';
import { autoRem, getCoords } from '@/components/charts/charts-hook';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});

const showChart = ref(false);
const nodes = ref([]);
const links = ref([]);

const nodeMaps = new Map();
const zoom = ref(1);

// 关系图谱
const getChartData = async () => {
  const { data } = await listPcmRelate({ custId: props.custInfo.custId });
  if (data.length == 0) {
    showChart.value = false;
    return;
  }
  let space = autoRem(160);
  let rootNodes = {
    name: data[0].custId,
    value: data[0].custName,
    x: numberMul(numberDiv(space, 2), data.length),
    y: 0,
    fixed: true,
    itemStyle: {
      color: '#ff8812',
    },
    label: {
      color: '#000000',
    },
  };
  nodeMaps.set(data[0].custId, data[0]);
  nodes.value.push(rootNodes);
  data.forEach((item: any, index: number) => {
    if (!nodeMaps.has(item.relateCustId)) {
      nodes.value.push({
        name: item.relateCustId,
        value: item.relateCustName,
        detail: item,
        x: numberMul(space, index),
        y: numberMul(space, index % 2 === 0 ? 2 + Number(Math.random().toFixed(2)) : -(2 + Number(Math.random().toFixed(2)))),
        itemStyle: {
          // 行内客户/行外客户
          color: item.isInnerCust === '1' ? '#ff0d12' : '#1f98ff',
        },
        label: {
          color: '#000000',
        },
      });
      nodeMaps.set(item.relateCustId, item);
    }
    links.value.push({
      source: item.custId,
      target: item.relateCustId,
      label: {
        show: true,
        formatter: (e: any) => {
          return item.relateDesc || '';
        },
        color: '#FF8812',
      },
      lineStyle: {
        color: '#91bfff',
      },
    });
  });
  let length = nodes.value.filter((e) => e.y !== space).length;
  zoom.value = Math.floor(length / 4);
  showChart.value = true;
};

onMounted(() => {
  getChartData();
});
</script>
<style lang="less" scoped>
.charts {
  height: 400px;
  width: 100%;
}
</style>
