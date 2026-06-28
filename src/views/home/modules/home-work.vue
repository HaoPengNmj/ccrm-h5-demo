<!--
 * @desc: 首页-工作台
 * @Date: 2024-08-01 11:24:50
 * @LastEditTime: 2024-09-29 16:38:07
-->
<template>
  <div class="home-work">
    <div class="home-work-header">
      <div class="title">工作台</div>
      <div class="more" @click="router.push('work')">更多</div>
    </div>
    <div class="home-work-content">
      <div class="content-header">
        <div class="left">
          <img alt="" src="@/assets/images/home/work_time.png" />
          <span class="text">{{ userInfo.dataDate }}</span>
        </div>
        <div class="right">
          <van-button type="primary" round block @click="goAddSchedule">
            添加日程
            <template #icon>
              <img class="button-icon" src="@/assets/images/home/work_add.png" alt="" />
            </template>
          </van-button>
        </div>
      </div>
      <div class="content-body">
        <div
          v-for="(item, index) in wrokMenu"
          class="content-body-item"
          :style="index == 0 ? 'margin-left:0' : ''"
          @click="handleClick(item.menuUrl)"
        >
          <div class="sign" :class="item.class" v-if="item.number > 0">
            <span class="text">{{ item.number }}</span>
          </div>
          <van-image class="item-img" :src="item.menuImage" />
          <div class="title">{{ item.menuName }}</div>
          <div class="status" :class="{ ending: item.number === 0 }">
            {{ item.number > 0 ? item.menuText : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import work_todo from '@/assets/images/home/work_todo.png';
import work_task from '@/assets/images/home/work_task.png';
import work_remind from '@/assets/images/home/work_remind.png';
import work_notice from '@/assets/images/home/work_notice.png';
import work_schedule from '@/assets/images/home/work_schedule.png';
import work_calculator from '@/assets/images/home/work_calculator.png';
import { getHomeShortMenuList, getWorkNoticeNumList } from '@/apis/home';
import { fmtDate } from '@/utils/format';
import { getStorage } from '@/storage/storage';
const userInfo = getStorage('userInfo') || {};
const router = useRouter();

// 响应结果
const result = ref({} as any);
// 工作台菜单集合
const menuList = ref([
  {
    menuId: 'instance2',
    menuName: '我的待办',
    menuImage: work_todo,
    menuText: '未完成',
    number: 0,
    menuUrl: '/todo',
    class: 'sign--todo',
  },
  {
    menuId: 'mytask2',
    menuName: '我的任务',
    menuImage: work_task,
    menuText: '待完成',
    number: 0,
    menuUrl: '/task',
    class: 'sign--task',
  },
  {
    menuId: 'remind2',
    menuName: '我的提醒',
    menuImage: work_remind,
    menuText: '未查看',
    number: 0,
    menuUrl: '/remind',
    class: 'sign--remind',
  },
  {
    menuId: 'notice2',
    menuName: '平台公告',
    menuImage: work_notice,
    menuText: '未读',
    number: 0,
    menuUrl: '/notice',
    class: 'sign--notice',
  },
  {
    menuId: 'schedule2',
    menuName: '我的日程',
    menuImage: work_schedule,
    menuText: '',
    number: 0,
    menuUrl: '/schedule',
    class: 'sign--schedules',
  },
  {
    menuId: 'calculator2',
    menuName: '金融计算器',
    menuImage: work_calculator,
    menuText: '',
    number: 0,
    menuUrl: '/calculator',
    class: 'sign--calculator',
  },
] as any);
// 已配置工作台
const wrokMenu = ref([] as any);
// 当前日期
const currentDate = ref(new Date());
//用来判断去新增日程的类型界面
const scheduleType = ref('');
// 点击事件
const handleClick = (link: any) => {
  router.push(link);
};

// 获取配置工作台
const getWorkMenu = async () => {
  const { data } = await getHomeShortMenuList({ menuType: 2, pageNo: 1, pageSize: 3 });
  data?.forEach((item: any) => {
    wrokMenu.value.push(menuList.value.find((menu: any) => menu.menuId == item.shortMenuId));
  });
  getWorkNoticeNum();
};
// 获取提醒条数
const getWorkNoticeNum = async () => {
  const { data } = await getWorkNoticeNumList({});
  wrokMenu.value.forEach((item: any) => {
    item.number =
      item.menuId == 'instance2'
        ? data.task?.numNew || 0
        : item.menuId == 'mytask2'
        ? data.mytask?.numNew || 0
        : item.menuId == 'remind2'
        ? data.eventReminder?.numNew || 0
        : item.menuId == 'notice2'
        ? data.myNotice?.numNew || 0
        : '';
  });
};
//点击添加日程去往新增日程界面
const goAddSchedule = () => {
  scheduleType.value = 'add';
  router.push(`/schedule-dtl/${'scheduleId'}/${scheduleType.value}`);
};
onMounted(() => {
  getWorkMenu();
});
</script>

<style lang="less" scoped>
.home-work {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: @font-size-36;
      letter-spacing: 0;
      line-height: 36px;
      font-weight: 600;
    }
    .more {
      font-family: PingFangSC-Regular;
      font-size: @font-size-26;
      color: @gray;
      letter-spacing: 0;
      text-align: right;
      line-height: 22px;
      font-weight: 400;
    }
  }
  &-content {
    background-image: url('@/assets/images/home/bg_work.png');
    background-size: cover;
    background-repeat: no-repeat;
    padding: 30px;
    .button-icon {
      height: 22px;
      width: 22px;
    }
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 22px;
      .left {
        img {
          height: 22px;
          width: 22px;
          margin-right: 16px;
        }
        .text {
          font-family: DINAlternate-Bold;
          font-size: @font-size-30;
          letter-spacing: 0;
          line-height: 30px;
          font-weight: 700;
        }
      }
    }
    .content-body {
      display: flex;
      align-items: center;
      height: 200px;
      &-item {
        position: relative;
        background: @white;
        border-radius: 20px;
        width: 31%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 42px 0 25px;
        margin-left: 3.5%;
        .sign {
          position: absolute;
          top: 11px;
          left: 0;
          border-radius: 0 20px 20px 0;
          padding: 0px 21px;
          text-align: center;
          .text {
            font-family: PingFangSC-Medium;
            font-size: @font-size-22;
            letter-spacing: 0;
            text-align: right;
            line-height: 22px;
            font-weight: 500;
          }
          &--todo {
            background: @orange-light;
            .text {
              color: @orange;
            }
          }
          &--task {
            background: @blue-light;
            .text {
              color: @blue;
            }
          }
          &--remind {
            background: @red-light;
            .text {
              color: @red;
            }
          }
          &--notice {
            background: #fceccb;
            .text {
              color: #fcc550;
            }
          }
          &--schedules {
            background: #cafcd9;
            .text {
              color: @green;
            }
          }
          &--calculator {
            background: @orange-light;
            .text {
              color: @orange;
            }
          }
        }

        .item-img {
          height: 54px;
          width: 54px;
        }
        .title {
          margin-top: 13px;
          font-family: PingFangSC-Semibold;
          font-size: @font-size-26;
          letter-spacing: 0;
          text-align: center;
          line-height: 26px;
          font-weight: 600;
        }
        .status {
          margin-top: 10px;
          font-family: PingFangSC-Semibold;
          font-size: @font-size-24;
          color: @red;
          letter-spacing: 0;
          text-align: right;
          line-height: 24px;
          font-weight: 600;
          height: 24px;
        }
        .ending {
          color: @gray;
        }
      }
    }
  }
}
</style>
