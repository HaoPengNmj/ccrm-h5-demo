<!--
 * @desc: 工作台
 * @Date: 2024-09-25 16:35:48
 * @LastEditTime: 2024-10-01 02:04:35
-->
<template>
  <div class="work-page">
    <dadp-card is-body-padding>
      <div class="container">
        <template v-for="(item, index) in workItems" :key="index">
          <div class="container-item" :style="{ 'background-image': `url(${item.backgroundImage})` }" @click="handleClick(item)">
            <div>
              <span class="title">{{ item.name }}</span>
            </div>
            <div class="label">
              <span>{{ item.placeholder }}</span>
              <van-icon name="arrow" />
              <van-checkbox v-model="item.isCheck" style="float: right" @click.stop="beforeCheck(item)"></van-checkbox>
            </div>
          </div>
        </template>
      </div>
    </dadp-card>
  </div>
</template>

<script lang="ts" setup>
import noticeImg from '@/assets/images/home/work/notice.png';
import remindImg from '@/assets/images/home/work/remind.png';
import taskImg from '@/assets/images/home/work/task.png';
import todoImg from '@/assets/images/home/work/todo.png';
import scheduleImg from '@/assets/images/home/work/schedule.png';
import calculatorImg from '@/assets/images/home/work/calculator.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getAllHomeShortMenuList, saveHomeWorkMenuList, deleteHomeWorkMenuList } from '@/apis/home';
import { showToast } from 'vant';
defineOptions({ name: 'work' });
const router = useRouter();

const workItems = ref([
  {
    name: '我的待办',
    placeholder: '查看待办',
    backgroundImage: todoImg,
    link: 'todo',
    isCheck: false,
  },
  {
    name: '我的提醒',
    placeholder: '查看提醒',
    backgroundImage: remindImg,
    link: 'remind',
    isCheck: false,
  },
  {
    name: '我的任务',
    placeholder: '查看任务',
    backgroundImage: taskImg,
    link: 'task',
    isCheck: false,
  },
  {
    name: '平台公告',
    placeholder: '查看公告',
    backgroundImage: noticeImg,
    link: 'notice',
    isCheck: false,
  },
  {
    name: '我的日程',
    placeholder: '查看日程',
    backgroundImage: scheduleImg,
    link: 'schedule',
    isCheck: false,
  },
  {
    name: '金融计算器',
    placeholder: '高效快速测算',
    backgroundImage: calculatorImg,
    link: 'calculator',
    isCheck: false,
  },
]);
// 点击勾选
const handleClick = (item: any) => {
  let checkList = [];
  workItems.value.forEach((item: any) => {
    if (item.isCheck) checkList.push(item);
  });
  if (checkList.length > 2 && !item.isCheck) {
    // item.isCheck = false;
    showToast('工作台最多显示三个按钮');
  } else {
    item.isCheck = !item.isCheck;
    opData(item.shortMenuId, item.isCheck);
  }
  // router.push(item.link);
};
// 点击图标勾选
const beforeCheck = (val: any) => {
  let checkList = [];
  workItems.value.forEach((item: any) => {
    if (item.isCheck) checkList.push(item);
  });
  if (checkList.length > 3) {
    val.isCheck = false;
    showToast('工作台最多显示三个按钮');
  } else {
    opData(val.shortMenuId, val.isCheck);
  }
};
const opData = async (shortMenuId: any, isCheck: any) => {
  const { data } = isCheck
    ? await saveHomeWorkMenuList({ shortMenuId: shortMenuId })
    : await deleteHomeWorkMenuList({ shortMenuIds: shortMenuId });
};
const initData = async () => {
  const { data } = await getAllHomeShortMenuList({ menuType: '2', pageNo: 1, pageSize: 99 });
  workItems.value.forEach((item: any) => {
    item.isCheck = data.filter((val: any) => val.menuName == item.name)[0].isConfig == '1';
    item.shortMenuId = data.filter((val: any) => val.menuName == item.name)[0].shortMenuId;
  });
};
onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped>
.work-page {
  padding: 24px;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .container-item {
      position: relative;
      box-sizing: border-box;
      width: calc(50% - 12px);
      padding: 24px 20px;
      border-radius: 20px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-top: 24px;

      &:first-child,
      &:nth-child(2) {
        margin-top: 0px;
      }

      .title {
        font-family: PingFangSC-Semibold;
        font-size: @font-size-30;
        letter-spacing: 0;
        line-height: 30px;
        font-weight: 600;
      }
      .label {
        font-family: PingFangSC-Regular;
        font-size: @font-size-24;
        color: @gray;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: 400;
        margin-top: 20px;
      }
    }
  }
}
</style>
