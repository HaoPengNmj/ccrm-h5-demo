<template>
  <div class="charts" v-if="showChart">
    <echarts-graph :nodes="nodes" :links="links" :zoom="1"></echarts-graph>
  </div>
  <dadp-empty v-else></dadp-empty>
</template>
<script lang="ts" setup>
import echartsGraph from '@/components/charts/echarts-graph.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { numberDiv, numberMul } from '@/utils/calc-fn';
import { listCcmRelate } from '@/apis/cust';
import { autoRem, getCoords } from '@/components/charts/charts-hook';

defineOptions({ name: 'ccm-view-relation-chart' });

const route = useRoute();

const showChart = ref(false);
const nodes = ref([]);
const links = ref([]);
const nodeMaps = new Map();
const zoom = ref(1);

// 关系图谱
const getChartData = async () => {
  const { data } = await listCcmRelate({ custId: route.params.custId, pageNo: 1, pageSize: 100 });
  const _data = data.rows || [];
  if (_data.length == 0) {
    showChart.value = false;
    return;
  }
  let space = autoRem(160);
  let rootNodes = {
    name: _data[0].custId,
    value: _data[0].custName,
    x: numberMul(numberDiv(space, 2), _data.length),
    y: 0,
    fixed: true,
    itemStyle: {
      color: '#ff8812',
    },
    label: {
      color: '#000000',
    },
  };
  nodeMaps.set(_data[0].custId, _data[0]);
  nodes.value.push(rootNodes);
  _data.forEach((item: any, index: number) => {
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
        formatter: () => {
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
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
}
</style>
