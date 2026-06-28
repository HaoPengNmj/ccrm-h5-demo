<!--
 * @desc: 默认柱状图
 * @Date: 2024-09-29 09:13:42
 * @LastEditTime: 2024-10-14 00:37:53
-->
<template>
  <div ref="chartRef" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import useEcharts from '@/components/charts/charts-hook';
import { autoRem } from '@/components/charts/charts-hook';
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
    default: () => [],
  },
});
// 图表渲染DOM
const chartRef = ref(null);

// 自定义主题色
const customTheme = {
  color: [
    '#FF8812',
    '#1F98FF',
    '#FF6A52',
    '#FAB728',
    '#43BB67',
    '#ea7ccc',
    '#fc8452',
    '#5470c6',
    '#ee6666',
    '#fac858',
    '#3ba272',
    '#9a60b4',
    '#73c0de',
    '#91cc75',
  ],
};

// 默认配置
const defaultOptions = ref({
  // 标题
  title: {
    show: false,
    left: 'center',
  },
  // 提示
  tooltip: {
    trigger: 'axis',
    confine: true, // 是否将 tooltip 框限制在图表的区域内
  },
  // 图例
  legend: {
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
    bottom: autoRem(50),
    top: autoRem(15),
    containLabel: true,
  },
  // 系列
  series: [
    {
      type: 'tree',
      data: [
        {
          name: '',
          children: [
            {
              name: '',
              children: [{ name: '客户1' }],
              symbol: 'triangle',
              slient: true,
              symbolRotate: 180,
            },
            {
              name: '',
              children: [
                {
                  name: '客户2',
                  label: {
                    width: 10,
                    height: 120,
                    backgroundColor: 'red',
                    borderRadius: 5,
                    borderColor: '#f8f8f8',
                    borderWidth: 1,
                    textAlign: 'center',
                    padding: 10,
                    position: 'inside',
                    overflow: 'truncate',
                    formatter: (params: any) => {
                      let newName = '';
                      let len = params.data.name.length;
                      let strLen = 1; //一行显示几个字
                      let rowNum = Math.ceil(len / strLen);
                      if (len > strLen) {
                        for (let p = 0; p < rowNum; p++) {
                          let tempStr = '';
                          let start = p * strLen;
                          let end = start + strLen;
                          if (p == rowNum - 1) {
                            tempStr = params.data.name.substring(start, len);
                          } else {
                            tempStr = params.data.name.substring(start, end) + '\n';
                          }
                          newName += tempStr;
                        }
                      } else {
                        newName = params.data.name;
                      }
                      let n = newName;
                      if (n.length > 16) {
                        n = n.slice(0, 16) + '...';
                      }
                      let str = `${n}`;
                      return str;
                    },
                  },
                },
              ],
              symbol: 'triangle',
              slient: true,
              symbolRotate: 0,
            },
          ],
        },
      ],
      left: '5%',
      orient: 'BT',
      itemStyle: { color: '#FCC800' },
      lineStyle: { color: '#FCC800' },
      lines: { curveness: 0.1 },
      label: {
        position: 'inside',
        verticalAlign: 'middle',
        align: 'bottom',
      },
      leaves: {
        label: {
          // position: name == 'topEchart' ? 'top' : 'bottom',
          verticalAlign: 'middle',
          // align: name == 'topEchart' ? 'top' : 'bottom',
        },
      },

      emphasis: {
        focus: 'descendant',
      },
      expandAndCollapse: false,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
});

// 图表实例对象
let echartsInstance: any;

// 自动更新图表
watchEffect(() => {
  defaultOptions.value.series = props.series.map((item: any) => {
    return { symbol: 'none', smooth: true, ...item };
  });
  if (echartsInstance) {
    echartsInstance.setOptions({ ...defaultOptions.value, ...props.options });
  }
});

// 组件挂载时初始化图表
onMounted(() => {
  echartsInstance = useEcharts(chartRef.value, customTheme);
  echartsInstance.addResizeListener();
});

// 组件销毁时销毁图表
onBeforeUnmount(() => {
  echartsInstance.removeResizeListener();
});
</script>

<style lang="less" scoped></style>
