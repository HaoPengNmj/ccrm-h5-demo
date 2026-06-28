<!--
 * @desc: 我的提醒详情
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-10-08 15:02:30
-->
<template>
  <van-nav-bar :title="currentRemind?.title" fixed left-arrow @click-left="router.back()">
    <template #right>
      <div @click="readAllFn">
        <van-image class="icon" :src="readAllImg" />
        <div class="text">一键已读</div>
      </div>
    </template>
  </van-nav-bar>

  <div class="content">
    <div class="header">
      <div class="left">提醒数:{{ refreshListRef?.total }}</div>
      <div class="right">
        <div class="btn" @click="showCheck = !showCheck">{{ !showCheck ? '选择提醒' : '取消选择' }}</div>
        <van-dropdown-menu ref="dropdownMenuRef">
          <van-dropdown-item>
            <template #title>
              <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
            </template>
            <van-form class="gform" @submit="onSubmit">
              <van-cell-group>
                <dadp-date v-model="queryParams.remindDate" label="提醒日期" type="range" input-align="right" clearable></dadp-date>
                <van-field v-model="queryParams.custId" name="radio" label="客户号" input-align="right"></van-field>
                <van-field v-model="queryParams.custName" name="radio" label="客户名称" input-align="right"></van-field>
                <van-field name="radio" label="阅读状态" input-align="right">
                  <template #input>
                    <dadp-radio v-model="queryParams.readState" :options="readStateOpt" />
                  </template>
                </van-field>
              </van-cell-group>
              <div class="gform-footer">
                <van-button size="large" round plain @click="resetForm">重置</van-button>
                <van-button type="primary" size="large" round native-type="submit">查询</van-button>
              </div>
            </van-form>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <dadp-refresh-list
      ref="refreshListRef"
      class="refresh-list"
      :requestApi="currentRemind?.apiUrl"
      :reqParams="{
        ...queryParams,
        remindStartDate: queryParams.remindDate?.[0] || '',
        remindEndDate: queryParams.remindDate?.[1] || '',
      }"
    >
      <template v-slot="{ data }">
        <dadp-card avatar="task" is-body-padding @click="handleClick(data)">
          <div class="dot" v-if="data.readState === '0'"></div>
          <template #title>
            <span @click="gotoCustView(data)">{{ data.custName }}</span>
            <span v-if="data.custLevel" class="black-tag">
              <span>{{ codeTranslate(queryParams.custType === 'P' ? 'pcmCustBaseLevel' : 'ccmCustBaseLevel', data.custLevel) }}</span>
            </span>
          </template>
          <template #subTitle>{{ data.custId }}</template>
          <template #header-right v-if="showCheck">
            <van-checkbox :model-value="checkIds.includes(data.remindId)" icon-size="0.35rem" shape="square"></van-checkbox>
          </template>
          <div class="tewxt">
            {{ data.remindContent }}
          </div>
          <div class="glabel">提醒日期：{{ data.remindDate }}</div>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>

  <van-action-bar v-if="showCheck">
    <div class="bottomBar">
      <div class="left">
        <van-checkbox v-model="isCheckAll" icon-size="0.35rem" shape="square" @change="checkAllFn">全选</van-checkbox>
      </div>
      <div class="right">
        <van-button size="large" plain round @click="showCheck = false">取消</van-button>
        <van-button type="primary" size="large" round @click="readCheckFn()">标记已读</van-button>
      </div>
    </div>
  </van-action-bar>
</template>
<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import readAllImg from '@/assets/images/home/readAll.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import { markAsRead } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';
import eventReminds from '@/sub-pages/home/remind/details/eventReminds.js';
import { showConfirmDialog, showToast } from 'vant';
defineOptions({ name: 'remind-dtl' });

const route = useRoute();
const router = useRouter();

// 当前提醒类型
const currentRemind = computed(() => {
  return eventReminds.find((e) => e.type === queryParams.value.eventSmallType);
});

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

// 阅读状态
const readStateOpt = [
  { content: '全部', value: '' },
  { content: '未读', value: '0' },
  { content: '已读', value: '1' },
];

const dataMap = reactive({
  queryParams: {
    custType: route.query.custType,
    eventSmallType: route.query.eventSmallType,
    custId: '',
    custName: '',
    readState: '',
    remindDate: [],
  },

  // 是否开启选择框
  showCheck: false,
  // 是否全选
  isCheckAll: false,
});
const { queryParams, showCheck, isCheckAll } = toRefs(dataMap);
// 客户视图
const gotoCustView = (custInfo) => {
  if (queryParams.value.custType === 'P') {
    router.push(`/pcm-view/${custInfo.custId}`);
  } else {
    router.push(`/ccm-view/${custInfo.custId}`);
  }
};
// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};
//重置
const resetForm = () => {
  //不用resetFields 是因为为了防止把路由带进来的细类大类传参弄掉
  (dataMap.queryParams.custId = ''),
    (dataMap.queryParams.custName = ''),
    (dataMap.queryParams.readState = ''),
    (dataMap.queryParams.remindDate = []);
};
// 提交
const onSubmit = () => {
  onSearch();
  dropdownMenuRef.value.close();
};
const checkIds = ref([]);

// 单选
const handleClick = (data) => {
  if (!showCheck.value) {
    return;
  }
  if (checkIds.value.includes(data.remindId)) {
    checkIds.value.splice(checkIds.value.indexOf(data.remindId), 1);
  } else {
    checkIds.value.push(data.remindId);
  }
};

//一键勾选所有 若为已读也同样勾选
const checkAllFn = (val) => {
  if (val) {
    checkIds.value = refreshListRef.value.listData?.map((e) => e.remindId);
  } else {
    checkIds.value = [];
  }
};

// 已读选中提醒
const readCheckFn = async () => {
  if (checkIds.value.length === 0) {
    showToast('请选择提醒数据');
    return;
  }
  const { code } = await markAsRead({ remindIds: checkIds.value.join(',') });
  if (code == 200) {
    showToast('阅读成功');
    isCheckAll.value = false;
    showCheck.value = false;
    onSearch();
  }
};
// 已读全部提醒
const readAllFn = async () => {
  showConfirmDialog({
    message: `是否将【${currentRemind.value?.title}】类的消息提醒全部标记为已读?`,
  })
    .then(async () => {
      const { code } = await markAsRead({
        isReadAll: '1',
        ...queryParams.value,
        remindStartDate: queryParams.value.remindDate?.[0] || '',
        remindEndDate: queryParams.value.remindDate?.[1] || '',
      });
      if (code == 200) {
        showToast('阅读成功');
        showCheck.value = false;
        isCheckAll.value = false;
        onSearch();
      }
    })
    .catch(() => {});
};

watchEffect(() => {
  if (!showCheck.value) {
    checkIds.value = [];
    isCheckAll.value = false;
  }
});
</script>
<style lang="less" scoped>
.icon {
  height: 28px;
  width: 28px;
}
.text {
  font-family: PingFangSC-Regular;
  font-size: @font-size-22;
  color: @gray;
  letter-spacing: 0;
  text-align: right;
  line-height: 22px;
  font-weight: 400;
}
.content {
  padding: 0px 32px;
  padding-bottom: 120px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    .left {
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
      color: @text;
      letter-spacing: 0;
      line-height: 28px;
      font-weight: 400;
    }
    .right {
      display: flex;
      align-items: center;
      .btn {
        color: @primary-color;
      }
    }
  }
  .black-tag {
    background: #222222;
    border: 1px solid rgba(196, 138, 19, 1);
    border-radius: 8px 0px 8px 0px;
    padding: 5px 8px;
    font-family: PingFangSC-Medium;
    font-size: @font-size-22;
    color: #ffcd64;
    line-height: 22px;
    font-weight: 500;
    margin-left: 10px;
  }
  .tewxt {
    font-family: PingFangSC-Regular;
    font-size: @font-size-24;
    color: @text;
    letter-spacing: 0;
    line-height: 40px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: @red;
    position: absolute;
    top: 32px;
    right: 32px;
  }
}
.bottomBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 9px 32px;
  .left {
    white-space: nowrap;
  }
  .right {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
  }
}
</style>
