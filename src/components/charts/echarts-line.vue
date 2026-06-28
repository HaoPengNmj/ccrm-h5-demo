<!--
 * @desc: 折线图
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
  xData: {
    type: Array,
    default: () => [],
  },
  series: {
    type: Array,
    default: () => [
      {
        type: 'line',
        data: [],
      },
    ],
  },
  // 控制是否显示tooltip和格式化，为空不显示
  tooltip: {
    type: [Function, String, Boolean],
    default: true,
  },
  // x轴坐标显示间距
  interval: {
    type: Number,
    default: undefined,
  },
});
// 图表渲染DOM
const chartRef = ref(null);
// 是否展示图例由series[name]决定
const showLegend = computed(() => {
  return props.series.filter((e: any) => !!e.name).map((e: any) => e.name).length > 0;
});

// 默认配置
const defaultOptions = computed(() => ({
  // 标题
  title: {
    show: false,
    left: 'center',
  },
  // 提示
  tooltip: {
    show: !!props.tooltip,
    trigger: 'axis',
    confine: true, // 是否将 tooltip 框限制在图表的区域内
    textStyle: {
      fontSize: autoRem(22),
    },
    formatter: typeof props.tooltip === 'boolean' ? undefined : props.tooltip,
  },
  // 图例
  legend: {
    show: showLegend.value,
    top: 'bottom',
    left: 'center',

    type: 'scroll',
    icon: 'roundRect',
    itemWidth: autoRem(22),
    itemHeight: autoRem(12),
    itemGap: autoRem(30),

    textStyle: {
      fontSize: autoRem(22),
    },
  },
  // 网格
  grid: {
    left: autoRem(10),
    right: autoRem(10),
    bottom: showLegend.value ? autoRem(50) : autoRem(15),
    top: autoRem(15),
    containLabel: true,
  },
  // x轴
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLabel: {
      fontSize: autoRem(22),
      interval: props.interval,
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    data: props.xData,
  },
  // y轴
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: autoRem(22),
    },
  },
  // 系列
  series: props.series,
}));

// 图表实例对象
let echartsInstance = ref();

// 自动更新图表
watchEffect(() => {
  defaultOptions.value.xAxis.data = props.xData;
  defaultOptions.value.series = props.series.map((item: any) => {
    return { symbol: 'none', smooth: true, ...item };
  });
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
