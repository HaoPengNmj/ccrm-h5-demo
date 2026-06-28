<!--
 * @desc: 首页-今日日程
 * @Date: 2024-08-01 11:24:48
 * @LastEditTime: 2024-09-27 14:34:22
-->
<template>
  <div class="home-schedule" v-if="dataMap.scheduleTitleList.length > 0">
    <van-image class="home-schedule-img" :src="schedule" @click="goDayList" />
    <van-swipe :vertical="true" :show-indicators="false" :autoplay="5000">
      <van-swipe-item v-for="item in scheduleTitleList">
        <div class="content">
          <van-text-ellipsis class="home-schedule-text" :content="item.scheduleTitle" :rows="1"></van-text-ellipsis>
          <van-image class="home-schedule-img2" :src="scheduleArrow" @click="goAddDay(item)" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup lang="ts">
import schedule from '@/assets/images/home/schedule.png';
import scheduleArrow from '@/assets/images/home/schedule-arrow.png';
import { getTodayList } from '@/apis/home';
import { fmtDate } from '@/utils/format';
const router = useRouter();
const dataMap = reactive({
  text: '', //不同页面顶部标题
  scheduleTitleList: Array<any>(),
});
const { scheduleTitleList } = toRefs(dataMap);
const scheduleType = ref('');
const goDayList = async () => {
  router.push('/schedule');
};
//
const goAddDay = async (item: any) => {
  scheduleType.value = 'view';
  router.push(
    `/schedule-dtl/${item.scheduleId}/${scheduleType.value}`
  );
};
// 获取滚动5条数据
const getTodayLists = async () => {
  let day = new Date();
  const { data, code } = await getTodayList({ pageNo: 1, pageSize: 5, scheduleDate: fmtDate(day) });
  if (code === 200) {
    dataMap.scheduleTitleList = data.rows;
  }
  //
};
onMounted(() => {
  getTodayLists();
});
</script>
<style lang="less" scoped>
.home-schedule {
  background: @gray-1;
  border-radius: 16px;
  padding: 25px 20px 20px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-img {
    height: 33px;
    width: 130px;
  }
  .van-swipe {
    width: calc(100% - 130px - 20px - 32px);
    height: 33px;
  }
  &-text {
    margin: 0 16px;
    font-family: PingFangSC-Regular;
    font-size: @font-size-22;
    color: @sub-text;
    line-height: 22px;
    font-weight: 400;
  }
  .home-schedule-text {
    width: 400px;
  }
  &-img2 {
    height: 20px;
    width: 20px;
  }
}
.content {
  display: flex;
}
</style>
