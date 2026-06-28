<!--
 * @desc: 饼图
 * @Date: 2024-10-12 18:28:09
 * @LastEditTime: 2024-10-16 16:11:50
-->
<template>
  <div ref="chartRef" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import question from '@/assets/images/common/question.png';
import { showToast } from 'vant';
import useEcharts from './charts-hook';
import { autoRem, customTheme } from './charts-hook';
const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  // 标题文本
  text: {
    type: String,
    default: '',
  },
  // 副标题文本
  subtext: {
    type: String,
    default: '',
  },
  // 数据
  data: {
    type: Array,
    default: () => [],
  },
  // 控制是否显示tooltip和格式化，为空不显示
  tooltip: {
    type: [Function, String, Boolean],
    default: '',
  },
  // 问号提示，为空不显示
  question: {
    type: String,
    default: '',
  },
  // 是否展示图例
  showLegend: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['title-click']);
// 图表渲染DOM
const chartRef = ref(null);

// 默认配置
const defaultOptions = computed(() => ({
  // 标题
  title: {
    show: !!props.text || !!props.subtext, // 标题或副标题至少有一个不为空则显示

    triggerEvent: !!props.question,

    top: props.showLegend && props.data.length > 0 ? '30%' : '40%',
    left: 'center',

    text: `${props.text}${props.question ? ' {icon|  }' : ''}`,
    textStyle: {
      fontSize: autoRem(22),
      color: '#222222',
      fontWeight: 'normal',
      rich: {
        icon: {
          fontSize: autoRem(50),
          backgroundColor: {
            image: question,
          },
        },
      },
    },

    subtext: props.subtext,
    subtextStyle: {
      fontSize: autoRem(40),
      color: '#000000',
      fontWeight: 'bold',
    },
  },
  // 图例
  legend: {
    show: props.showLegend && props.data.length > 0,
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
  // 提示
  tooltip: {
    show: !!props.tooltip,
    trigger: 'item',
    confine: true, // 是否将 tooltip 框限制在图表的区域内
    textStyle: {
      fontSize: autoRem(22),
    },
    formatter: typeof props.tooltip === 'boolean' ? undefined : props.tooltip,
  },

  // 系列
  series: [
    {
      type: 'pie',
      center: ['50%', props.showLegend && props.data.length > 0 ? '40%' : '50%'], // 圆心坐标,设置成相对的百分比
      radius: ['70%', '80%'],
      startAngle: 90, // 起始角度
      endendAngle: 'auto', // 结束角度

      itemStyle: {
        borderColor: '#fff',
        borderWidth: autoRem(4),
      },

      // 文本标签
      label: {
        show: false,
      },
      // 视觉引导线
      labelLine: {
        show: false,
      },
      // 移动端禁用选中效果，不与图例联动
      emphasis: {
        disabled: false,
        scale: false,
      },

      // 数据
      data: props.data,
    },
  ],
}));

// 图表实例对象
let echartsInstance = ref();

// 自动更新图表
watchEffect(() => {
  defaultOptions.value.title.text = `${props.text}${props.question ? ' {icon|  }' : ''}`;
  defaultOptions.value.title.subtext = props.subtext;
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
    if (props.question) {
      echartsInstance.value.on('click', (obj: any) => {
        if (obj.componentType === 'title') {
          showToast(props.question);
        }
      });
    }
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
