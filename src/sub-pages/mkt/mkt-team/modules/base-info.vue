<!--
 * @desc: 团队视图-基本信息
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-08 14:18:53
-->
<template>
  <div class="container">
    <dadp-card :title="`${teamInfo.teamName}（共${teamInfo.teamMemberNum}人）`" is-body-padding>
      <div>团队负责人:{{ teamInfo.teamLeaderName }}</div>
    </dadp-card>
    <dadp-card is-body-padding title="岗位人数占比">
      <div style="height: 250px">
        <echarts-pie :data="xData" :tooltip="tooltip" show-legend></echarts-pie>
      </div>
    </dadp-card>
  </div>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import echartsPie from '@/components/charts/echarts-pie.vue';
import { getTeamInfo } from '@/apis/mkt';
const props = defineProps({
  teamId: {
    type: String,
    default: '',
  },
});

// 团队信息
const teamInfo = ref({
  teamLeaderName: '',
  teamMemberNum: '',
  teamName: '',
});
// 图表数据
const xData = ref();
const tooltip = (object: any) => {
  return `${object.marker} ${object.data.name}<br/>人数：${object.data.value}<br/>人数占比：${object.percent}%`;
};

//获取团队视图详情-基本信息
const initData = async () => {
  const { code, data } = await getTeamInfo({ teamId: props.teamId });
  if (code === 200) {
    teamInfo.value = data;
    xData.value = data.pieData;
  }
};

onMounted(() => {
  initData();
});
</script>
<style lang="less" scoped>
.container {
  padding: 24px;
}
</style>
