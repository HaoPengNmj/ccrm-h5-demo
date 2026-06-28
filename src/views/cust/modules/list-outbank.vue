<!--
 * @desc: 外部客户列表
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-12 18:10:57
-->
<template>
  <div class="my-page">
    <div class="page-header">
      <div class="left">当前客户数：{{ refreshListRef?.total }}</div>
      <div class="right">
        <van-dropdown-menu ref="dropdownMenuRef" :close-on-click-outside="false">
          <van-dropdown-item>
            <template #title>
              <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
            </template>
            <van-form class="gform" @submit="onSubmit">
              <van-cell-group>
                <van-field
                  v-model="reqParams.companyName"
                  name="companyName"
                  label="企业名称"
                  label-width="8em"
                  input-align="right"
                  placeholder="请输入"
                  clearable
                ></van-field>
                <dadp-cascader
                  v-model="reqParams.quxian"
                  label="地区"
                  label-width="8em"
                  input-align="right"
                  :field-names="{
                    value: 'addressCode',
                    text: 'addressName',
                    children: 'children',
                  }"
                  :options="TreeListOptions"
                  placeholder="省/市/区县"
                  @selected="selectedFn"
                ></dadp-cascader>
                <busi-industry
                  v-model="reqParams.industry"
                  label="所属行业"
                  label-width="8em"
                  input-align="right"
                  @doSelect="doSelect"
                  :multiple="true"
                ></busi-industry>
                <van-field name="enterScaleList" label="企业规模" label-align="top">
                  <template #input>
                    <dadp-radio v-model="reqParams.enterScaleList" multiple :options="getCombo('entScaleWsType')" clearable />
                  </template>
                </van-field>
                <dadpSelect
                  v-model="reqParams.companyTypeList"
                  :options="getCombo('companyType')"
                  :multiple="true"
                  label="企业类型"
                  input-align="right"
                  placeholder="请选择"
                ></dadpSelect>
                <dadpSelect
                  v-model="reqParams.enterQualifyList"
                  :options="getCombo('enterQualify')"
                  :multiple="true"
                  label="企业资质内容"
                  input-align="right"
                  placeholder="请选择"
                ></dadpSelect>
                <dadpSelect
                  v-model="reqParams.regStatusList"
                  :options="getCombo('regStatus')"
                  :multiple="true"
                  label="经营状态"
                  input-align="right"
                  placeholder="请选择"
                ></dadpSelect>
                <van-field label="成立年限" label-align="top">
                  <template #input>
                    <dadp-radio
                      v-model="reqParams.estiblishYears"
                      :options="getCombo('estiblishYears')"
                      clearable
                      @change="onChangeestib"
                    />
                  </template>
                </van-field>
                <van-field>
                  <template #input>
                    <dadp-date
                      v-model="estiblishdate"
                      label="成立年限"
                      input-align="right"
                      placeholder="请选择"
                      value-fmt="yyyyMMdd"
                      type="range"
                      @change="changeDate"
                    ></dadp-date>
                  </template>
                </van-field>
                <van-field label="注册资本" label-align="top">
                  <template #input>
                    <dadp-radio v-model="reqParams.regCapital" :options="getCombo('regCapital')" clearable @change="onChangeestib2" />
                  </template>
                </van-field>
                <van-field label-align="top">
                  <template #input>
                    <van-field
                      v-model="reqParams.regCapitalStart"
                      input-align="center"
                      type="digit"
                      placeholder="请输入开始数值"
                      @focus="regFocus"
                    ></van-field>
                    -
                    <van-field v-model="reqParams.regCapitalEnd" input-align="center" type="digit" placeholder="请输入结束数值"></van-field>
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
    </div>
    <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="CustBaseTwInfoList" :reqParams="reqParams">
      <template v-slot="{ data }">
        <dadp-card :title="data.companyName" is-body-padding is-arrow @click="handleClick(data)">
          <template #subTitle>
            <van-space>
              <van-tag v-if="data.regStatus" color="#f2e3ff" text-color="#7a00ff ">
                {{ codeTranslate('regStatus', data.regStatus) }}
              </van-tag>
              <van-tag v-if="data.isListedCompany == '1'" color="#e9fdd2" text-color="#07a012 ">
                {{ data.isListedCompany == '1' ? '上市公司' : '' }}
              </van-tag>
              <van-tag color="#ecceb2" text-color="#a4671c ">
                {{ data.isInnerCust == '1' ? '行内客户' : '行外客户' }}
              </van-tag>
            </van-space>
          </template>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">曾用名：</span>
              <span class="value">{{ data.companyNameHis }}</span>
            </div>
          </div>
          <div class="grow">
            <div class="gcol">
              <span class="glabel">企业资质内容：</span>
              <span class="value">{{ data.twEnterQualifyContent }}</span>
            </div>
          </div>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </div>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import dadpCascader from '@/components/dadp-ui/dadp-cascader.vue';
import busiIndustry from '@/components/business/busi-industry.vue';
import { codeTranslate, getCombo } from '@/hook/code-hook';
import { CustBaseTwInfoList, addressGbTreeList, industryTree } from '@/apis/cust';
import { resetFields } from '@/utils/global';
import { showToast } from 'vant';

const router = useRouter();
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref
const filedNames = {
  value: 'addressCode',
  text: 'addressName',
  children: 'children',
};
// 请求参数
const dataMap = reactive({
  reqParams: {
    companyName: '',
    regCapitalStart: undefined,
    regCapitalEnd: undefined,
    companyTypeList: [], //企业类型
    enterQualifyList: [], //资质内容
    enterScaleList: [], //	企业规模
    regStatusList: ['在营（开业）'], // 	经营状态
    estiblishYears: '', //成立年限
    estiblishYearsEnd: '', //	成立年限结束
    estiblishYearsStart: '', //	成立年限开始
    regCapital: '', //注册资本
    quxian: '',
    shi: '',
    city: '', //市ID
    town: '', //区/县ID
    industryList: [], //所属一级行业
    industryTwoList: [], //所属二级行业
    industryThreeList: [], //所属三级行业
    industryFourList: [], //所属四级行业
    industry: Array<any>(),
  },
  estiblishdate: [], //成立年限
  industryId: '',
  TreeListOptions: Array<any>(),
});
const { TreeListOptions, reqParams, estiblishdate } = toRefs(dataMap);
// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};
//重置
const resetForm = () => {
  resetFields(reqParams.value);
  dataMap.estiblishdate = [];
  dataMap.reqParams.regStatusList = ['在营（开业）'];
};
// 所属行业所选名称回调给参数赋值
const doSelect = (checkData: any, item: any) => {
  dataMap.reqParams.industryList = [];
  dataMap.reqParams.industryTwoList = [];
  dataMap.reqParams.industryThreeList = [];
  dataMap.reqParams.industryFourList = [];
  checkData.forEach((e: any) => {
    if (e.industryLevel == '1') {
      dataMap.reqParams.industryList.push(e.industryName);
    } else if (e.industryLevel == '2') {
      dataMap.reqParams.industryTwoList.push(e.industryName);
    } else if (e.industryLevel == '3') {
      dataMap.reqParams.industryThreeList.push(e.industryName);
    } else if (e.industryLevel == '4') {
      dataMap.reqParams.industryFourList.push(e.industryName);
    }
  });
};
//时间选择方法与成立年限单选框互斥关系
const changeDate = (val: any) => {
  dataMap.reqParams.estiblishYearsStart = dataMap.estiblishdate?.[0] || '';
  dataMap.reqParams.estiblishYearsEnd = dataMap.estiblishdate?.[1] || '';
  if (dataMap.estiblishdate.length > 0) {
    dataMap.reqParams.estiblishYears = '';
  }
};
//成立年限单选框与时间选择方法互斥关系
const onChangeestib = (val: any) => {
  if (dataMap.reqParams.estiblishYears != '') {
    dataMap.estiblishdate = [];
  }
};
//输入数值单选框与注册资本互斥关系
const regFocus = (val: any) => {
  dataMap.reqParams.regCapital = '';
};

//注册资本单选框与输入数值互斥关系
const onChangeestib2 = (val: any) => {
  if (dataMap.reqParams.regCapitalStart) {
    dataMap.reqParams.regCapitalStart = undefined;
    dataMap.reqParams.regCapitalEnd = undefined;
  }
};
// 提交
const onSubmit = () => {
  if (dataMap.reqParams.regCapitalStart && dataMap.reqParams.regCapitalEnd) {
    if (dataMap.reqParams.regCapitalStart > dataMap.reqParams.regCapitalEnd) {
      showToast('后面输入值需大于前面');
    } else {
      onSearch();
      dropdownMenuRef.value.close();
    }
  } else {
    onSearch();
    dropdownMenuRef.value.close();
  }
};

const selectedFn = (val) => {
  //市名称
  dataMap.reqParams.city = val?.[1]?.addressName;
  //区/县展示名称
  dataMap.reqParams.town = val?.[2]?.addressName;
};
// 国标信息(获取地址树)
const TreeList = async () => {
  const { data } = await addressGbTreeList({});
  if (data) {
    dataMap.TreeListOptions = data;
  }
};
// 点击事件
//外部客户列表点击事件 query传参outbank：'1',代表是外部客户列表跳入客户视图 所以若是1优先展示行外视图信息
const handleClick = (val: any) => {
  router.push({
    path: `/ccm-view/${val.custId}`,
    query: {
      outbank: '1',
    },
  });
};
onMounted(() => {
  TreeList();
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
}
.busi-select {
  display: flex;
  flex-direction: column;
  background: @gray-1;

  &-header {
    background: @white;
    .title {
      padding: 32px;
      font-family: PingFangSC-Medium;
      font-size: @font-size-32;
      color: @text;
      letter-spacing: 0;
      text-align: center;
      line-height: 32px;
      font-weight: 500;
    }
  }
  &-body {
    background: @white;
    margin: 20px 0px;
    flex: auto;
    overflow: hidden;
    overflow-y: auto;

    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: 400;
  }
  &-footer {
    background: @white;
    display: flex;
    padding: 20px 34px;
    .van-button + .van-button {
      margin-left: 20px;
    }
  }
}
</style>
