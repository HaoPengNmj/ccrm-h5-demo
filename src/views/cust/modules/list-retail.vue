<!--
 * @desc: 零售客户列表
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-16 16:27:30
-->
<template>
  <div class="my-page">
    <div class="page-header">
      <div class="left">当前客户数：{{ refreshListRef?.total }}</div>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <van-field
                v-model="reqParams.custId"
                name="custId"
                label="客户号"
                input-align="right"
                placeholder="请输入"
                clearable
              ></van-field>
              <van-field
                v-model="reqParams.custName"
                name="custName"
                label="客户名称"
                input-align="right"
                placeholder="请输入"
                clearable
              ></van-field>
              <van-field name="custLevel" label="客户等级" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.custLevel" :options="getCombo('pcmCustBaseLevel')" clearable />
                </template>
              </van-field>
              <van-field name="custState" label="客户状态" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.custState" :options="getCombo('custState')" clearable />
                </template>
              </van-field>
              <dadp-select
                v-model="reqParams.certType"
                name="certType"
                label="证件类型"
                :options="getCombo('certType')"
                input-align="right"
                placeholder="请选择"
                clearable
              />
              <van-field
                v-model="reqParams.certNo"
                name="certNo"
                label="证件号码"
                input-align="right"
                placeholder="请输入"
                clearable
              ></van-field>
              <van-field name="mainOrgType" label="管户机构类型" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.mainOrgType" :options="getCombo('mainOrgType')" clearable />
                </template>
              </van-field>
              <busi-org
                v-model="reqParams.belongOrgIds"
                name="belongOrgIds"
                label="管户机构"
                input-align="right"
                placeholder="请选择"
              ></busi-org>
              <van-field name="mainMgrType" label="管户人类型" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.mainMgrType" :options="getCombo('mainMgrType')" clearable />
                </template>
              </van-field>
              <busi-user
                v-model="reqParams.belongMgrIds"
                name="belongMgrIds"
                label="管户人"
                input-align="right"
                placeholder="请选择"
              ></busi-user>
              <van-field name="businessTypes" label="业务类型" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.businessTypes" :options="getCombo('businessType')" clearable multiple />
                </template>
              </van-field>
            </van-cell-group>
            <div class="gform-footer">
              <van-button size="large" round plain @click="resetForm">重置</van-button>
              <van-button type="primary" size="large" round native-type="submit">确认</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 查询逻辑：管户人登录查询我关注的客户，非管户人角色登录查询我管理的客户，点击查询按钮后调用简单查询接口 -->
    <dadp-refresh-list
      ref="refreshListRef"
      :requestApi="pcmListCustForApp"
      :reqParams="{
        ...reqParams,
        belongOrgId: reqParams.belongOrgIds[0],
        belongMgrId: reqParams.belongMgrIds[0]?.userId,
        businessType: reqParams.businessTypes?.join(','),
      }"
    >
      <template v-slot="{ data }">
        <dadp-card :avatar="data.sex === '2' ? 'woman' : 'man'" is-arrow @click="handleClick(data)">
          <template #title>
            <span>{{ data.custName }}</span>
            <span v-if="data.custLevel" class="black-tag">{{ codeTranslate('pcmCustBaseLevel', data.custLevel) }}</span>
          </template>
          <template #subTitle>
            <van-space wrap>
              <van-tag v-if="data.isFocus === '1'" color="#fff3e7" text-color="#FF8812">关注客户</van-tag>
              <van-tag v-if="data.isPrattBusi === '1'" color="#fff3e7" text-color="#FF8812">普惠客户</van-tag>
              <van-tag v-if="data.isConsumeBusi === '1'" color="#fff3e7" text-color="#FF8812">消费客户</van-tag>
              <van-tag v-if="data.isCompanyBusi === '1'" color="#fff3e7" text-color="#FF8812">公司客户</van-tag>
            </van-space>
          </template>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';

import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import busiOrg from '@/components/business/busi-org.vue';
import busiUser from '@/components/business/busi-user.vue';

import { pcmListCustForApp, pcmListCustFocus, pcmListCustOwn, authRoleIsViewFunc } from '@/apis/cust';
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { hasAllPropertiesValues, resetFields } from '@/utils/global';
import { getStorage } from '@/storage/storage';
import { showToast } from 'vant';

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

const router = useRouter();
const userInfo = getStorage('userInfo');

const isSubmit = ref(false);
// 请求参数
const reqParams = ref({
  custId: '',
  custName: '',
  custLevel: '',
  custState: '',
  certType: '',
  certNo: '',
  mainOrgType: '',
  belongOrgIds: [],
  mainMgrType: '',
  belongMgrIds: [],
  businessTypes: [],
} as any);

// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};
// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
const resetForm = () => {
  resetFields(reqParams.value);
};
// 提交
const onSubmit = () => {
  isSubmit.value = true;
  nextTick(() => {
    onSearch();
    dropdownMenuRef.value.close();
  });
};
// 点击事件
const handleClick = async (val: any) => {
  const param = {
    custId: val.custId,
  };
  const { code } = await authRoleIsViewFunc(param);
  if (code == 200) {
    router.push(`/pcm-view/${val.custId}`);
  } else {
    showToast('您暂未有客户视图权限，请联系管理员！');
  }
};

onMounted(() => {
  onSearch();
});
</script>

<style lang="less" scoped>
.my-page {
  padding: 0 32px 32px;
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    .left {
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
      letter-spacing: 0;
      line-height: 28px;
      font-weight: 400;
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
  .arrow-right {
    display: flex;
    align-items: center;
    .focus-icon {
      height: 30px;
      width: 30px;
      margin-right: 4px;
    }
    .btn {
      font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      color: @gray;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: 400;
    }
  }
}
</style>
