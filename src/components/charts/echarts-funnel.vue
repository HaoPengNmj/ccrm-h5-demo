<!--
 * @desc: 漏斗图
 * @Date: 2024-10-12 18:28:09
 * @LastEditTime: 2024-10-16 16:11:50
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
  // 数据
  data: {
    type: Array,
    default: () => [],
  },
  // 是否展示图例
  showLegend: {
    type: Boolean,
    default: false,
  },
  // 是否展示文本
  showLabel: {
    type: Boolean,
    default: true,
  },
});

// 图表渲染DOM
const chartRef = ref(null);

// 默认配置
const defaultOptions = computed(() => ({
  // 图例
  legend: {
    show: props.showLegend,
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
  // 系列
  series: [
    {
      type: 'funnel',
      left: '10%',
      top: '10%',
      bottom: '10%',
      width: '40%',
      minSize: '20%',
      sort: 'none',
      label: {
        show: props.showLabel,
        position: 'right',
        fontSize: autoRem(22),
        formatter: (val: any) => {
          return `\u25cf ${val.name} ${val.value}`;
        },
      },
      labelLine: {
        show: false,
      },
      data: props.data,
    },
  ],
}));

// 图表实例对象
let echartsInstance = ref();

// 自动更新图表
watchEffect(() => {
  defaultOptions.value.series[0].data = props.data;
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
