<!--
 * @desc: 营销任务列表
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2024-10-09 10：38：00
-->
<template>
  <div class="my-group">
    <div class="base-info">
      <div class="content">
        <div class="content-row">
          <div class="name">{{ custInfo.custName }}</div>
          <div class="level">{{ codeTranslate('pcmCustBaseLevel', custInfo.custLevel) || '--' }}</div>
        </div>
        <div class="content-row" style="justify-content: space-between">
          <div class="age">{{ custInfo.custId }}</div>
        </div>
      </div>
    </div>

    <dadp-refresh-list ref="refreshListRef" :requestApi="userInfo.isManager ? listMktTaskByManger : listMktTask" :reqParams="reqParams">
      <template v-slot="{ data }">
        <dadp-card
          avatar="task"
          :title="data.taskName"
          is-body-padding
          :status="codeTranslate('taskSts', data.taskSts)"
          :status-color="getColor(data.taskSts)"
          @click="handleClick(data)"
        >
          <template #subTitle>
            <van-space>
              <van-tag color="#e8f4ff" text-color="#1F98FF">
                {{ codeTranslate('taskBigType', data.taskBigType) }}
              </van-tag>
              <van-tag color="#fff3e7" text-color="#FF8812">
                {{ codeTranslate('taskType', data.taskType) }}
              </van-tag>
            </van-space>
            <van-checkbox
              v-if="userInfo.isMgr"
              :model-value="!!checkList.find((e) => e.taskId === data.taskId)"
              shape="square"
              style="float: right"
            ></van-checkbox>
          </template>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">任务有效期：</span>
              <span class="gvalue">{{ data.taskStartDate || '--' }}至{{ data.taskEndDate || '--' }}</span>
            </div>
          </div>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">创建机构：</span>
              <span class="gvalue">{{ data.createOrgName }}</span>
            </div>
          </div>
        </dadp-card>
      </template>
    </dadp-refresh-list>

    <van-action-bar class="gform-footer" v-if="userInfo.isMgr">
      <van-button @click="feedBack" size="large" round type="primary">意向反馈</van-button>
    </van-action-bar>
  </div>
</template>
<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';

import { listMktTaskByManger, listMktTask } from '@/apis/mkt';
import { codeTranslate } from '@/hook/code-hook';
import { fmtDate } from '@/utils/format';
import { getStorage, setStorage } from '@/storage/storage';
import { showToast } from 'vant';

defineOptions({ name: 'pcm-view-task' });

const router = useRouter();
const route = useRoute();
const userInfo = getStorage('userInfo');

const refreshListRef = ref(); // 列表Ref
const custInfo = ref({
  custId: route.query.custId,
  custName: route.query.custName,
  custLevel: route.query.custLevel as string,
});
const dataMap = reactive({
  reqParams: {
    custId: route.query.custId,
    taskSts: '5',
    custType: 'P',
  },
  checkList: [],
});
const { reqParams, checkList } = toRefs(dataMap);

const getColor = (val: any) => {
  switch (val) {
    case '5':
      return 'orange';
    case '7':
      return 'red';
    case '8':
      return 'gray';
    default:
      return 'orange';
  }
};

const handleClick = (data: any) => {
  let index = checkList.value.findIndex((e) => e.taskId === data.taskId);
  if (index !== -1) {
    checkList.value.splice(index, 1);
  } else {
    checkList.value.push(data);
  }

  setStorage('selectedMktTasks', checkList.value);
};

const feedBack = async () => {
  if (dataMap.checkList.length == 0) {
    showToast('请选择营销任务');
    return false;
  }
  router.push({
    name: 'mkt-task-fb',
    query: {
      custId: route.query.custId,
      custName: route.query.custName,
    },
  });
};
</script>
<style lang="less" scoped>
.my-group {
  padding: 24px;
  background-image: url('@/assets/images/cust/view/view-background.png');
  background-repeat: no-repeat;
  background-size: 100%;
  .base-info {
    padding-bottom: 24px;
    .content {
      flex: auto;
      .content-row + .content-row {
        padding-top: 12px;
      }

      .content-row {
        display: flex;
        align-items: center;

        .name {
          font-family: PingFangSC-Semibold;
          font-size: @font-size-40;
          color: @text;
          line-height: 48px;
          font-weight: 600;
          word-break: break-all;
        }
        .age {
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @sub-text;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
        }

        .level {
          margin-left: 16px;
          padding: 5px 8px;
          background: #222222;
          border: 1px solid rgba(196, 138, 19, 1);
          border-radius: 8px 0px 8px 0px;
          font-family: PingFangSC-Medium;
          font-size: @font-size-22;
          color: #ffcd64;
          line-height: 22px;
          font-weight: 500;
          white-space: nowrap;
        }

        .focus {
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @sub-text;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
          &-icon {
            width: 30px;
            height: 30px;
          }
          div {
            height: 30px;
            line-height: 30px;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
