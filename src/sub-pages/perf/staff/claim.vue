<template>
  <div class="claim">
    <template v-if="tableData.length > 0">
      <dadp-card title="原分配信息">
        <van-cell title="业绩标识">{{ tableData[0]?.perfId }}</van-cell>
        <van-cell title="开始时间">{{ tableData[0]?.beginDate }}</van-cell>
        <van-cell title="结束时间">{{ tableData[0]?.endDate }}</van-cell>

        <div class="new-table">
          <dadp-table
            :table-columns="[
              { title: '对象类型', prop: 'objType', formatter: (val) => codeTranslate('pbm_objType', val.objType) },
              { title: '认领对象', prop: 'objName' },
              { title: '认领比例(%)', prop: 'percent' },
            ]"
            :table-data="tableData"
          ></dadp-table>
        </div>
      </dadp-card>
      <br />
    </template>

    <van-form @submit="submit">
      <dadp-card>
        <dadp-date
          v-model="editForm.beginDate"
          label="开始日期"
          input-align="right"
          required
          :rules="[{ required: true, message: '请选择开始日期' }]"
          :max-date="editForm.endDate ? parseDate(editForm.endDate) : undefined"
        ></dadp-date>
        <dadp-date
          v-model="editForm.endDate"
          label="结束日期"
          input-align="right"
          :min-date="editForm.beginDate ? parseDate(editForm.beginDate) : undefined"
        ></dadp-date>
      </dadp-card>

      <div class="btn">
        <van-button type="primary" size="small" icon="plus" @click="addPerfList"></van-button>
      </div>

      <dadp-card
        v-for="(item, index) in claimObjArray"
        :key="index"
        :buttons="index != 0 ? [{ name: '删除' }] : []"
        @footer-click="deletePerfList(index)"
      >
        <van-cell title="业绩标识">{{ item.perfId }}</van-cell>
        <dadp-select
          v-model="item.objType"
          :options="getCombo('pbm_objType')"
          label="对象类型"
          input-align="right"
          placeholder="请选择"
          :required="true"
          :rules="[{ required: true, message: '请选择对象类型' }]"
          @change="changeObjType(index)"
        ></dadp-select>
        <busi-org
          v-if="item.objType === 'ORG'"
          v-model="item.obj"
          org-tree-type="BM"
          :orgLevel="'7'"
          label="认领对象"
          input-align="right"
          placeholder="请选择"
          :required="true"
          :isDataAuth="'0'"
          :rules="[{ required: true, message: '请选择认领对象' }]"
          @doSelect="getOrgSelect($event, $event, index)"
        ></busi-org>
        <busi-user
          v-else-if="item.objType === 'USER'"
          v-model="item.obj"
          org-tree-type="BM"
          label="认领对象"
          input-align="right"
          placeholder="请选择"
          :required="true"
          :isDataAuth="'0'"
          :rules="[{ required: true, message: '请选择认领对象' }]"
          @doSelect="getUserSelect($event, index)"
        ></busi-user>
        <van-field
          v-model="item.percent"
          label="认领比例(%)"
          type="number"
          input-align="right"
          placeholder="请输入"
          :rules="[{ validator: validatorForBFB, trigger: 'onSubmit' }]"
        ></van-field>
      </dadp-card>

      <div class="footer">
        <van-button type="default" size="large" round @click="cancle">取消</van-button>
        <van-button type="primary" size="large" round native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpTable from '@/components/dadp-ui/dadp-table.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import busiOrg from '@/components/business/busi-org.vue';
import busiUser from '@/components/business/busi-user.vue';
import { claimPerfList, listByPerfIdAndPerfType } from '@/apis/perf';
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { getStorage } from '@/storage/storage';

import { showToast } from 'vant';
import { parseDate } from '@/utils/format';

const props = defineProps({
  // 是否展示认领页面
  isShowClaim: {
    type: Boolean,
    default: true,
  },
  // 业绩标识
  perfId: {
    type: String,
    default: '',
  },
  // 业绩信息
  perfInfo: {
    type: Object,
    default: () => {
      return {};
    },
  },
  /**
   * 业绩类型
   * 00001:贷款; 00002:存款;
   */
  perfType: {
    type: String,
    default: '',
  },
  /* 分配状态 */
  allocStatus: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:isShowClaim', 'doQuery']);
const userInfo = getStorage('userInfo') || {}; // 用户信息
const dataMap = reactive({
  editForm: Object(),
  claimObjArray: Array<any>(), // 认领对象数组
});
const { editForm, claimObjArray } = toRefs(dataMap);

// 校验规则 -- 百分百
const validatorForBFB = (val: any) => {
  let arr = dataMap.claimObjArray.map((item) => item.percent);
  let hasZero = arr.indexOf('0');
  let _sum = dataMap.claimObjArray.reduce((sum: number, item: { percent: any }) => sum + Number(item.percent), 0);
  if (hasZero > -1) {
    return '所填写的业绩比例不可输入0，无法进行申请操作，请修改比例';
  } else if (_sum !== 100) {
    return '所填写的业绩比例合计不是100%，无法进行申请操作，请修改比例';
  } else {
    return true;
  }
};

// 新增业绩
const addPerfList = () => {
  dataMap.claimObjArray.push({ perfId: props.perfId });
};

// 选择对象类型后清空认领对象的值
const changeObjType = (index: any) => {
  dataMap.claimObjArray[index].obj = [];
  dataMap.claimObjArray[index].objNo = '';
  dataMap.claimObjArray[index].objName = '';
};
// 选择机构回调方法
const getOrgSelect = (checkData: any, checkId: any, index: any) => {
  let objs = dataMap.claimObjArray.map((item) => item.objType + item.objNo);
  let objArray = objs.filter((item) => item === dataMap.claimObjArray[index].objType + checkId[0]);
  if (objArray.length > 0) {
    showToast('所选对象重复,请重新选择');
    dataMap.claimObjArray[index].obj = [];
  } else {
    dataMap.claimObjArray[index].objNo = checkData[0].id;
    dataMap.claimObjArray[index].objName = checkData[0].name;
  }
};
// 选择用户回调方法
const getUserSelect = (checkData: any, index: any) => {
  let objs = dataMap.claimObjArray.map((item) => item.objType + item.objNo);
  let objArray = objs.filter((item) => item === dataMap.claimObjArray[index].objType + checkData[0].userId);
  if (objArray.length > 0) {
    showToast('所选对象重复,请重新选择');
    dataMap.claimObjArray[index].obj = [];
  } else {
    dataMap.claimObjArray[index].objNo = checkData[0].userId;
    dataMap.claimObjArray[index].objName = checkData[0].userName;
  }
};
// 删除业绩
const deletePerfList = (val: any) => {
  dataMap.claimObjArray.splice(val, 1);
};
// 提交
const submit = async (val: any) => {
  dataMap.claimObjArray.forEach((item: any) => {
    item.rate = Number((item.percent / 100).toFixed(4));
  });
  const { code } = await claimPerfList({ ...dataMap.editForm, objList: dataMap.claimObjArray, flag: '2' });
  if (code == 200) {
    showToast('认领成功');
    emits('update:isShowClaim', false);
    emits('doQuery');
  }
};
// 取消
const cancle = () => {
  emits('update:isShowClaim', false);
};

const tableData = ref([]);
const initData = async () => {
  let formData = new FormData();
  formData.append('PERF_ID', props.perfId);
  formData.append('PERF_TYPE', props.perfType);
  const { code, data } = await listByPerfIdAndPerfType(formData);
  tableData.value = data.map((e) => ({ ...e, percent: Number(e.rate * 100) }));
};

// 初始化业绩
const init = () => {
  dataMap.editForm = {
    perfType: props.perfType,
    perfId: props.perfId,
    custId: props.perfInfo.custId,
    custName: props.perfInfo.custName,
    orgId: props.perfInfo.orgId,
    beginDate: '',
    endDate: '',
  };
  // 默认添加当前用户作为认领对象，不可删除
  // dataMap.claimObjArray.push({
  //   perfId: props.perfId,
  //   objType: 'USER',
  //   obj: [{ userId: userInfo.userId, userName: userInfo.userName }],
  //   objNo: userInfo.userId,
  //   objName: userInfo.userName,
  // });
};
onMounted(() => {
  initData();
  init();
});
</script>

<style lang="less" scoped>
.claim {
  padding: 32px;
  .btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: @primary-color;
    margin: 12px 0;
  }
  .new-table {
    padding: 24px;
    padding-top: 0;
  }
  .footer {
    padding: 24px 0px;

    display: flex;
    justify-content: space-between;

    .van-button {
      width: calc(50% - 12px);
    }
  }
}
</style>
