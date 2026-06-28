<template>
  <van-nav-bar :title="barTitle" fixed left-arrow @click-left="onClickLeft"></van-nav-bar>
  <div class="page-list">
    <van-form @submit="saveData">
      <dadp-card>
        <van-cell-group>
          <dadp-datetime
            v-model="queryParams.startDate"
            label="开始日期"
            input-align="right"
            :disabled="scheduleType === 'view'"
            placeholder="请选择"
            :max-date="queryParams.endDate ? parseDate(queryParams.endDate, 'yyyy-MM-dd HH:mm:ss') : undefined"
            required
            :rules="[{ required: true, message: '请选择开始日期' }]"
          ></dadp-datetime>
          <dadp-datetime
            v-model="queryParams.endDate"
            label="结束日期"
            input-align="right"
            :disabled="scheduleType === 'view'"
            placeholder="请选择"
            :min-date="queryParams.startDate ? parseDate(queryParams.startDate, 'yyyy-MM-dd HH:mm:ss') : undefined"
            required
            :rules="[{ required: true, message: '请选择结束日期' }]"
          ></dadp-datetime>
          <van-field
            v-model="queryParams.scheduleTitle"
            :disabled="scheduleType === 'view'"
            label="日程标题"
            required
            input-align="right"
            error-message-align="right"
            placeholder="输入"
            :rules="[{ required: true, message: '请输入日程标题' }]"
          ></van-field>
          <dadp-select
            v-model="queryParams.importanceLevel"
            :disabled="scheduleType === 'view'"
            label="紧要程度"
            required
            input-align="right"
            :options="getCombo('importanceLevel')"
            placeholder="请选择"
            :rules="[{ required: true, message: '请选择紧要程度' }]"
          ></dadp-select>
          <van-field
            v-model="queryParams.scheduleDesc"
            :disabled="scheduleType === 'view'"
            class="area"
            type="textarea"
            label="日程内容"
            label-align="top"
            placeholder="请输入"
            rows="5"
            autosize
            required
            :rules="[{ required: true, message: '请输入日程内容' }]"
          ></van-field>
          <dadp-select
            v-model="queryParams.remindType"
            :disabled="scheduleType === 'view'"
            label="是否提醒"
            :options="getCombo('remindType')"
            input-align="right"
            placeholder="请选择"
          ></dadp-select>
        </van-cell-group>
      </dadp-card>
      <van-action-bar>
        <van-action-bar-button v-if="scheduleType != 'view'" type="primary" text="完成" native-type="submit" />
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpDatetime from '@/components/dadp-ui/dadp-datetime.vue';
import { getCombo } from '@/hook/code-hook';
import { scheduleSave, scheduleUpdate, getScheduleDt } from '@/apis/home';
import { fmtDate, parseDate } from '@/utils/format';

defineOptions({ name: 'schedule-dtl' });

const router = useRouter();
const currentRoute = useRoute();
const dataMap = reactive({
  queryParams: {
    chanceName: '', //日程类型
    endDate: '', //结束日期
    startDate: '', //开始日期
    scheduleTitle: '', //日程标题
    importanceLevel: '', //紧要程度
    scheduleDesc: '', //日程内容
    remindType: '', //是否提醒
    scheduleId: currentRoute.params.scheduleId,
  },
  scheduleType: currentRoute.params.scheduleType, //路由传参view add edit 因为共用一个页面 用来判断
  barTitle: '', //不同页面顶部标题
  scheduleList: {},
});
const { queryParams, scheduleType, barTitle } = toRefs(dataMap);
// 左侧箭头点击事件处理器
const onClickLeft = () => {
  router.back();
};
// 日程接口(新增/修改)
const saveData = async () => {
  let api = dataMap.scheduleType === 'add' ? scheduleSave : scheduleUpdate;
  const { data, code } = await api({ ...dataMap.queryParams });
  if (code === 200) {
    dataMap.scheduleList = data;
  }
  if (dataMap.scheduleType === 'add' || dataMap.scheduleType === 'edit') {
    router.back();
  }
};
//修改/查看数据初始化
const initData = async () => {
  if (dataMap.scheduleType === 'view' || dataMap.scheduleType === 'edit') {
    const { data, code } = await getScheduleDt({ ...dataMap.queryParams });
    if (code === 200) {
      dataMap.queryParams = data;
    }
  }
};
onMounted(() => {
  if (dataMap.scheduleType === 'view') {
    dataMap.barTitle = '日程详情';
    initData();
  } else if (dataMap.scheduleType === 'add') {
    dataMap.barTitle = '新增日程';
  } else if (dataMap.scheduleType === 'edit') {
    dataMap.barTitle = '编辑日程';
    initData();
  }
});
</script>

<style lang="less" scoped>
.area {
  :deep(.van-cell__value) {
    padding: 16px 24px;
    background: @gray-1;
    border-radius: 20px;
  }
}
.page-list {
  padding: 24px;
}
</style>
