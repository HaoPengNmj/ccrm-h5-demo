<!--
 * @desc: 关系图
 * @Date: 2024-09-29 09:13:42
 * @LastEditTime: 2024-10-14 00:36:33
-->
<template>
  <div ref="chartRef" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import useEcharts from './charts-hook';
import { autoRem, customTheme } from './charts-hook';
const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  nodes: {
    type: Array,
    default: () => [],
  },
  links: {
    type: Array,
    default: () => [],
  },
  symbolSize: {
    type: Number,
    default: autoRem(80),
  },
  zoom: {
    type: Number,
    default: 1,
  },
});
// 图表渲染DOM
const chartRef = ref(null);
// 默认配置
const defaultOptions = computed(() => ({
  // 系列
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbol: 'circle',
      symbolSize: props.symbolSize,
      roam: 'move',
      zoom: props.zoom,
      nodeScaleRatio: 0,
      label: {
        show: true,
        formatter: (val) => {
          return val.value;
        },
        fontSize: autoRem(24),
        width: props.symbolSize - autoRem(15),
        // overflow: 'breakAll',
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [autoRem(4), autoRem(10)],
      edgeLabel: {
        fontSize: autoRem(24),
      },
      lineStyle: {
        opacity: 0.9,
        curveness: 0,
        width: autoRem(2),
      },
      nodes: props.nodes,
      links: props.links,
    },
  ],
}));

// 图表实例对象
let echartsInstance = ref();

// 自动更新图表
watchEffect(() => {
  if (echartsInstance.value) {
    echartsInstance.value.setOptions({ ...defaultOptions.value, ...props.options });
  }
});

// 组件挂载时初始化图表
onMounted(() => {
  nextTick(() => {
    echartsInstance.value = useEcharts(chartRef.value, customTheme);
    echartsInstance.value.addResizeListener();
  });
});

// 如果被缓存，重新加载时需要重新确定大小
onActivated(() => {
  echartsInstance.value.resize();
});

// 组件销毁时销毁图表
onBeforeUnmount(() => {
  echartsInstance.value.removeResizeListener();
  echartsInstance.value.dispose();
});
</script>

<style lang="less" scoped></style>
