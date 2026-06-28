<!--
 * @desc: 营销地图-网格企业
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-12-25 09:48:04
-->
<template>
  <van-search v-model="reqParams.companyName" shape="round" show-action placeholder="请输入企业名称查询" @search="onSubmit">
    <!-- 仅客户-查询条件 -->
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <dadp-select
                v-model="reqParams.subbrId"
                :options="BranchOptions"
                label="所属支行"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <dadp-select
                v-model="reqParams.areaId"
                :options="AreaOptions"
                label="所属片区"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <dadp-select
                v-model="reqParams.gorgId"
                :options="GridOptions"
                label="所属网格"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <dadp-select
                v-model="reqParams.gbusiId"
                :options="FormatOptions"
                label="所属业态"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <dadp-select
                v-model="reqParams.unitId"
                :options="UnitOptions"
                label="所属单元"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
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
                multiple
                @doSelect="doSelect"
              ></busi-industry>
              <van-field name="enterScaleList" label="企业规模" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.enterScaleList" multiple :options="getCombo('entScaleWsType')" clearable />
                </template>
              </van-field>
              <dadp-select
                v-model="reqParams.companyTypeList"
                :options="getCombo('companyType')"
                multiple
                label="企业类型"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <dadp-select
                v-model="reqParams.enterQualifyList"
                :options="getCombo('enterQualify')"
                multiple
                label="企业资质内容"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <dadp-select
                v-model="reqParams.regStatusList"
                :options="getCombo('regStatus')"
                multiple
                label="经营状态"
                input-align="right"
                placeholder="请选择"
              ></dadp-select>
              <van-field label="成立年限" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.estiblishYears" :options="getCombo('estiblishYears')" clearable @change="onChangeestib" />
                </template>
              </van-field>
              <dadp-date
                v-model="estiblishdate"
                label="成立年限"
                type="range"
                input-align="right"
                placeholder="请选择"
                value-fmt="yyyyMMdd"
                @change="changeDate"
              ></dadp-date>
              <van-field label="注册资本" label-align="top">
                <template #input>
                  <dadp-radio v-model="reqParams.regCapital" :options="getCombo('regCapital')" clearable @change="onChangeestib2" />
                </template>
              </van-field>
              <van-field label="注册资本" label-align="top">
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
              <van-button size="large" round plain @click="onCancel">取消</van-button>
              <van-button type="primary" size="large" round native-type="submit">确认</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-search>
  <div id="map-container"></div>

  <dadp-full-screen v-model="showEntPanel" title="企业列表">
    <dadp-refresh-list
      v-if="showEntPanel"
      ref="refreshListRef"
      class="refresh-list"
      :requestApi="queryCompany"
      :reqParams="{
        ...reqParams,
      }"
    >
      <template v-slot="{ data }">
        <dadp-card
          avatar="ent"
          @click="
            router.push({
              path: `/ccm-view/${data.custId}`,
              query: {
                outbank: '1',
              },
            })
          "
        >
          <template #title>
            <van-space>
              <span>{{ data.companyName }}</span>
              <van-tag v-if="data.isInnerCust === '1'" style="white-space: nowrap" color="#ffe3e3" text-color="#FF0D12">存客</van-tag>
              <van-tag v-else-if="data.isEpqcust === '1'" style="white-space: nowrap" color="#e8f4ff" text-color="#1F98FF">潜客</van-tag>
              <div></div>
            </van-space>
          </template>
          <template #subTitle>
            <van-space>
              <van-icon name="idcard" color="#ff8812" />
              <span>{{ data.uniformCreditCode || '--' }}</span>
            </van-space>
          </template>

          <template #header-right>
            <div v-if="data.isInnerCust !== '1' && data.isEpqcust !== '1'" style="white-space: nowrap">
              <van-button type="primary" @click.stop="addEpqCustFn(data)">添加潜客</van-button>
            </div>
            <div v-if="(data.isEpqcust === '1' || data.isInnerCust === '1') && data.isSigned !== '1'" style="white-space: nowrap">
              <van-button type="primary" @click.stop="setMarkFn(data)">标注客户</van-button>
            </div>
          </template>
        </dadp-card>
      </template>
    </dadp-refresh-list>
  </dadp-full-screen>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpFullScreen from '@/components/dadp-ui/dadp-full-screen.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpRadio from '@/components/dadp-ui/dadp-radio.vue';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import busiIndustry from '@/components/business/busi-industry.vue';
import dadpCascader from '@/components/dadp-ui/dadp-cascader.vue';
import { getCombo } from '@/hook/code-hook';
import useAmap from '@/hook/use-amap-hook';

import {
  queryCompany,
  addEpqCust,
  ccmCustMark,
  getBranchList,
  getAreaList,
  getGridList,
  getUnitList,
  getOutletList,
  getFormatList,
} from '@/apis/map';
import { showToast } from 'vant';
import { addressGbTreeList } from '@/apis/cust';
import { getStorage } from '@/storage/storage';
const filedNames = {
  value: 'subbrOrgId',
  text: 'subbrOrgName',
};

const amap = useAmap({ container: 'map-container' }, true);
const router = useRouter();
const route = useRoute();
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref
const userInfo = getStorage('userInfo');

// 请求参数
const dataMap = reactive({
  reqParams: {
    companyName: '',
    unitId: '',
    areaId: '',
    subbrId: '',
    gorgId: '',
    gbusiId: '',

    custName: '',
    regCapitalStart: undefined,
    regCapitalEnd: undefined,
    companyTypeList: [], //企业类型
    enterQualifyList: [], //资质内容
    enterScaleList: [], //	企业规模
    regStatusList: [], // 	经营状态
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
  showPicker: false, //展示市区
  selectValue: '', //
  selectValue2: '', //
  selectOptions: Array<any>(),
  TreeListOptions: Array<any>(),
  BranchOptions: Array<any>(),
  AreaOptions: Array<any>(),
  GridOptions: Array<any>(),
  FormatOptions: Array<any>(),
  UnitOptions: Array<any>(),
});
const { TreeListOptions, reqParams, estiblishdate, BranchOptions, AreaOptions, GridOptions, FormatOptions, UnitOptions } = toRefs(dataMap);

const selectedFn = (val) => {
  //市名称
  dataMap.reqParams.city = val?.[1]?.addressName;
  //区/县展示名称
  dataMap.reqParams.town = val?.[2]?.addressName;
};

/**
 * 所属行业回调
 * @param checkData
 * @param item
 */
const doSelect = (checkData: any, item: any) => {
  reqParams.value.industryList = [];
  reqParams.value.industryTwoList = [];
  reqParams.value.industryThreeList = [];
  reqParams.value.industryFourList = [];
  checkData.forEach((e: any) => {
    if (e.industryLevel == '1') {
      reqParams.value.industryList.push(e.industryName);
    } else if (e.industryLevel == '2') {
      reqParams.value.industryTwoList.push(e.industryName);
    } else if (e.industryLevel == '3') {
      reqParams.value.industryThreeList.push(e.industryName);
    } else if (e.industryLevel == '4') {
      reqParams.value.industryFourList.push(e.industryName);
    }
  });
};
//时间选择方法与成立年限单选框互斥关系
const changeDate = (val: any) => {
  reqParams.value.estiblishYearsStart = dataMap.estiblishdate?.[0] || '';
  reqParams.value.estiblishYearsEnd = dataMap.estiblishdate?.[1] || '';
  if (dataMap.estiblishdate.length > 0) {
    reqParams.value.estiblishYears = '';
  }
};
//成立年限单选框与时间选择方法互斥关系
const onChangeestib = (val: any) => {
  if (reqParams.value.estiblishYears != '') {
    dataMap.estiblishdate = [];
  }
};
//输入数值单选框与注册资本互斥关系
const regFocus = (val: any) => {
  reqParams.value.regCapital = '';
};

//注册资本单选框与输入数值互斥关系
const onChangeestib2 = (val: any) => {
  if (reqParams.value.regCapitalStart) {
    reqParams.value.regCapitalStart = undefined;
    reqParams.value.regCapitalEnd = undefined;
  }
};

const showEntPanel = ref(false);

// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  dropdownMenuRef.value.close();
  showEntPanel.value = true;
};

// 添加潜客
const addEpqCustFn = async (item) => {
  const { code } = await addEpqCust({
    epqcustName: item.companyName,
    uniformCreditCode: item.uniformCreditCode,
    mktOrgId: userInfo.orgId,
    mktOrgName: userInfo.orgName,
  });
  if (code === 200) {
    showToast('添加成功');
    refreshListRef.value.onRefresh();
  }
};

// 客户标注
const setMarkFn = async (item) => {
  if (!item.regLocation || !item.addressLng || !item.addressLat) {
    showToast('当前客户缺少定位信息，无法标注');
    return;
  }
  const { code, msg } = await ccmCustMark({
    custId: item.custId,
    markAddr: item.regLocation,
    markLng: item.addressLng,
    markLat: item.addressLat,
  });
  showToast(msg);
  refreshListRef.value.onRefresh();
};

// 国标信息(获取地址树)
const TreeList = async () => {
  const { data } = await addressGbTreeList({});
  if (data) {
    dataMap.TreeListOptions = data;
  }
};
// 所属支行options
const getBranchOptions = async () => {
  const { data } = await getBranchList({});
  if (data) {
    dataMap.BranchOptions = data.map((item: any) => {
      return {
        value: item.subbrOrgId,
        content: item.subbrOrgName,
        ...item,
      };
    });
  }
};
// 所属片区options
const getAreaOptions = async () => {
  const { data } = await getAreaList({});
  if (data) {
    dataMap.AreaOptions = data.map((item: any) => {
      return {
        value: item.areaOrgId,
        content: item.areaOrgName,
        ...item,
      };
    });
  }
};
// 所属网格options
const getGridOptions = async () => {
  const { data } = await getGridList({});
  if (data) {
    dataMap.GridOptions = data.map((item: any) => {
      return {
        value: item.gorgOrgId,
        content: item.gorgOrgName,
        ...item,
      };
    });
  }
};
// 所属业态options
const getFormatOptions = async () => {
  const { data } = await getFormatList({});
  if (data) {
    dataMap.FormatOptions = data.map((item: any) => {
      return {
        value: item.gbusiId,
        content: item.gbusiName,
        ...item,
      };
    });
  }
};
// 所属单元options
const getUnitOptions = async () => {
  const { data } = await getUnitList({});
  if (data) {
    dataMap.UnitOptions = data.map((item: any) => {
      return {
        value: item.unitId,
        content: item.unitName,
        ...item,
      };
    });
  }
};
onMounted(() => {
  TreeList();
  getBranchOptions();
  getAreaOptions();
  getGridOptions();
  getFormatOptions();
  getUnitOptions();
});
</script>

<style lang="less" scoped>
#map-container {
  width: 100%;
  height: calc(100vh - 365px);
}

.refresh-list {
  box-sizing: border-box;
  height: 100%;
  padding: 24px;
  padding-bottom: 100px;
  :deep(.van-pull-refresh) {
    min-height: 100% !important;
  }
}
</style>
