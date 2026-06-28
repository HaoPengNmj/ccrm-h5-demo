<template>
  <div class="schedule-page">
    <div class="page-header">
      <van-nav-bar fixed placeholder :clickable="false">
        <template #left>
          <div class="btn-row">
            <van-icon name="arrow-left" color="#ffffff" size="0.43rem" @click.stop="router.back()" />
            <div class="month-btn" @click.stop="showPicker = true">{{ calendarYMStr }}</div>
          </div>
        </template>
        <template #right>
          <div class="btn-row">
            <div class="curday-btn" @click.stop="todayFn">今</div>
            <div class="add-btn" @click.stop="addFn">
              新增
              <div class="round"><van-icon size="0.2rem" name="plus" color="#ffffff" /></div>
            </div>
          </div>
        </template>
      </van-nav-bar>

      <div class="table">
        <div class="thead">
          <div v-for="(ele, index) in CALENDAR_HEADER" :key="index" class="th">{{ ele }}</div>
        </div>
        <div class="tbody">
          <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="tr">
            <template v-if="isCurrentWeek(week)">
              <div
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                :class="{
                  'not-curm': !day.isCurrentMonth,
                }"
                class="td"
              >
                <span
                  :class="{
                    'cur-day': day.isCurrentMonth && currentDay === day.date,
                  }"
                  @click="currentDay = day.date"
                >
                  {{ day.date }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="page-fqwf">
      <div class="page-time">当前日期：{{ fmtDate(currentDate) }}</div>
      <div class="page-btn" @click="isFold = !isFold">
        {{ isFold ? '展开' : '折叠' }}
        <van-icon :name="isFold ? 'arrow-down' : 'arrow-up'" />
      </div>
    </div>

    <dadp-refresh-list ref="refreshListRef" class="page-list" :requestApi="getScheduleList" :reqParams="reqParams">
      <template v-slot="{ data }">
        <dadp-card
          :buttons="buttons"
          is-body-padding
          is-arrow
          :status="codeTranslate('scheduleSts', data.scheduleSts)"
          :status-color="data.scheduleSts === '0' ? 'orange' : 'gray'"
          @arrow-click="viewFn(data)"
          @footer-click="(btn) => footerClickFn(btn, data)"
        >
          <template #title>
            <span class="bigtitle">{{ data.scheduleTitle }}</span>
            <span>
              <van-space>
                <!-- 重要 -->
                <van-tag color="#fff3e7" text-color="#FF8812" v-if="data.importanceLevel === '0'">
                  {{ codeTranslate('importanceLevel', data.importanceLevel) }}
                </van-tag>
                <!-- 紧急 -->
                <van-tag color="#ffe6e7" text-color="#FF0D12" v-if="data.importanceLevel === '1'">
                  {{ codeTranslate('importanceLevel', data.importanceLevel) }}
                </van-tag>
                <!-- 普通 -->
                <van-tag color="#e8f4ff" text-color="#1F98FF" v-if="data.importanceLevel === '2'">
                  {{ codeTranslate('importanceLevel', data.importanceLevel) }}
                </van-tag>
              </van-space>
            </span>
          </template>
          <template #subTitle>
            <div class="glabel">{{ data.startDate || '--' }} 至 {{ data.endDate || '--' }}</div>
          </template>
          <div class="glabel">{{ data.scheduleDesc }}</div>
        </dadp-card>
      </template>
      <template #emptyText>
        <div style="text-align: center">暂无数据</div>
        <br />
        <van-button type="primary" size="small" round @click="addFn">新增日程</van-button>
      </template>
    </dadp-refresh-list>
  </div>

  <van-popup v-model:show="showPicker" position="bottom" round>
    <van-date-picker
      v-model="pickerModel"
      title="选择年月"
      :columns-type="['year', 'month']"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { showConfirmDialog, showToast } from 'vant';
import { codeTranslate } from '@/hook/code-hook';
import { getScheduleList, scheduleDelete } from '@/apis/home';
import { fmtDate } from '@/utils/format';

defineOptions({ name: 'schedule' });

const router = useRouter();

/***************************** 日历部分 ******************************/

// 常量
const CALENDAR_HEADER = ['日', '一', '二', '三', '四', '五', '六'];
const TODAY = ref(new Date()); // 今日
const isFold = ref(true);
const isCurrentWeek = (_week: any[]) => {
  return !isFold.value || _week.some((e) => e.isCurrentMonth && e.date === currentDay.value);
};

// 当前年、月、日
const currentYear = ref(TODAY.value.getFullYear());
const currentMonth = ref(TODAY.value.getMonth() + 1);
const currentDay = ref(TODAY.value.getDate());
// 当前日期对象
const currentDate = computed(() => {
  return new Date(currentYear.value, currentMonth.value - 1, currentDay.value);
});
// 当前年月字符串
const calendarYMStr = computed(() => {
  return `${currentYear.value}年${currentMonth.value}月`;
});

// 构造日历数据
const generateCalendar = () => {
  let weekList = []; // 当前日历行列表
  let dateList = []; // 当前行的日期列表

  // 根据currentYear、currentMonth生成日期对象
  const calendarObj = new Date(currentYear.value, currentMonth.value - 1, 1);

  /**
   * 1. 第一周是否需要补充上个月的天数
   */
  const firstDayIndex = new Date(calendarObj.getFullYear(), calendarObj.getMonth(), 1).getDay(); // 获取当月第一天是一周中的哪一天（0表示周日）
  const previousMonthLastDay = new Date(calendarObj.getFullYear(), calendarObj.getMonth(), 0).getDate(); // 获取上个月最后一天
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    dateList.push({
      date: previousMonthLastDay - i,
      isCurrentMonth: false, // 非本月
    });
  }
  /**
   * 2.填充当前月的天数
   */
  const lastDay = new Date(calendarObj.getFullYear(), calendarObj.getMonth() + 1, 0).getDate(); // 获取当月最后一天
  for (let i = 1; i <= lastDay; i++) {
    dateList.push({
      date: i,
      isCurrentMonth: true,
    });
    if (dateList.length === 7) {
      weekList.push(dateList);
      dateList = [];
    }
  }
  /**
   * 3. 补充最后一周
   */
  if (dateList.length > 0 && dateList.length < 7) {
    const remainingDays = 7 - dateList.length;
    for (let i = 1; i <= remainingDays; i++) {
      dateList.push({
        date: i,
        isCurrentMonth: false,
      });
    }
    weekList.push(dateList);
  }
  return weekList;
};
const weeks = computed(() => generateCalendar());

/**
 * 月选择器弹窗
 */
const showPicker = ref(false);
const pickerModel = ref([currentYear.value.toString(), currentMonth.value.toString()]);
// 月-确认事件
const onConfirm = () => {
  currentYear.value = Number(pickerModel.value[0]);
  currentMonth.value = Number(pickerModel.value[1]);
  currentDay.value = 1; // 默认回到选取年月的1号
  showPicker.value = false;
};

// 今-点击事件
const todayFn = () => {
  currentYear.value = TODAY.value.getFullYear();
  currentMonth.value = TODAY.value.getMonth() + 1;
  currentDay.value = TODAY.value.getDate();
};

/***************************** 列表部分 ******************************/

const refreshListRef = ref(); // 列表Ref
// 请求参数
const reqParams = computed(() => {
  return {
    startDate: fmtDate(currentDate.value, 'yyyy-MM-dd') + ' 00:00:00',
    endDate: fmtDate(currentDate.value, 'yyyy-MM-dd') + ' 23:59:59',
  };
});
// 日程按钮
const buttons = ref([
  {
    name: '编辑',
    icon: 'edit',
  },
  {
    name: '删除',
    icon: 'delete',
  },
]);

// 根据选中日期加载数据
watchEffect(() => {
  if (currentDate.value) {
    refreshListRef.value?.onRefresh();
  }
});

// 新增日程
const addFn = () => {
  router.push(`/schedule-dtl/scheduleId/add`);
};
// 删除日程
const delFn = (scheduleId) => {
  showConfirmDialog({
    message: `是否删除该日程?`,
  }).then(async () => {
    const { code } = await scheduleDelete({ scheduleIds: scheduleId });
    if (code === 200) {
      showToast('删除成功');
      refreshListRef.value?.onRefresh();
    }
  });
};
// 修改日程
const editFn = (scheduleId) => {
  router.push(`/schedule-dtl/${scheduleId}/edit`);
};
// 查看日程
const viewFn = (data: any) => {
  router.push(`/schedule-dtl/${data.scheduleId}/view`);
};
// 日程底部按钮事件
const footerClickFn = (btn: any, data: any) => {
  if (btn.name === '编辑') editFn(data.scheduleId);
  else if (btn.name === '删除') delFn(data.scheduleId);
};
</script>

<style lang="less" scoped>
.schedule-page {
  position: relative;
  .page-header {
    background-image: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
    :deep(.van-nav-bar) {
      background: unset;
      background-image: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
    }
    .btn-row {
      display: flex;
      align-items: center;
      color: @white;
      .month-btn {
        margin-left: 24px;
      }
      .curday-btn {
        font-family: PingFangSC-Regular;
        font-size: @font-size-30;
        color: @white;
        letter-spacing: 0;
        line-height: 30px;
        font-weight: 400;
        margin-right: 60px;
      }
      .add-btn {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: @font-size-30;
        color: @white;
        letter-spacing: 0;
        line-height: 30px;
        font-weight: 400;
        .round {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 28px;
          width: 28px;
          border: 2px solid @white;
          border-radius: 50%;
          margin-left: 12px;
        }
      }
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      .thead {
        background-image: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .th {
          font-family: PingFangSC-Regular;
          font-size: @font-size-26;
          color: @white;
          letter-spacing: 0;
          text-align: center;
          line-height: 28px;
          font-weight: 400;
          padding: 30px 0;
          width: 100px;
        }
      }
      .tbody {
        background: @white;
        .tr {
          background: @white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .td {
          font-family: PingFangSC-Regular;
          font-size: @font-size-28;
          color: @text;
          letter-spacing: 0;
          text-align: center;
          line-height: 48px;
          font-weight: 400;
          padding: 15px 0;
          background: @white;
          width: 100px;
        }
      }
    }

    .not-curm {
      color: @gray;
      pointer-events: none;
    }
    .cur-day {
      border-radius: 50%;
      background-image: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
      color: @white;
      height: 48px;
      width: 48px;
    }
  }
  .page-fqwf {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px 0;

    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    .page-btn {
      color: @primary-color;
    }
    .page-time {
    }
  }
  .page-list {
    padding: 24px;
  }
  .bigtitle {
    padding-right: 20px;
  }
}
</style>
