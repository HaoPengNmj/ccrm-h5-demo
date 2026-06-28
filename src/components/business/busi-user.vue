<template>
  <van-field
    v-model="vanFieldModel"
    :label="label"
    :label-width="labelWidth"
    :input-align="(inputAlign as any)"
    :error-message-align="(inputAlign as any)"
    :placeholder="placeholder"
    :required="required"
    :rules="(rules as any[])"
    :disabled="disabled"
    readonly
    @click-input="showPopup = true"
  >
    <template #right-icon v-if="clearable && !!vanFieldModel">
      <van-icon name="close" />
    </template>
  </van-field>
  <van-popup v-model:show="showPopup" class="busi-select" :style="{ height: '100vh' }" position="bottom" teleport="#app">
    <div class="busi-select-header">
      <div class="title">用户选择</div>
      <van-search v-model="reqParams.userName" shape="round" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <van-dropdown-menu ref="dropdownMenuRef" :close-on-click-outside="false">
            <van-dropdown-item>
              <template #title>
                <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
              </template>
              <van-form class="gform" @submit="onSubmit">
                <van-cell-group>
                  <busi-org
                    v-model="reqParams.tmpOrgIds"
                    :topOrgId="topOrgId"
                    :orgLevel="orgLevel"
                    :levelCode="levelCode"
                    :orgTreeType="orgTreeType"
                    :label="orgTreeType === 'BM' ? '业绩管理机构' : '客户管理机构'"
                    input-align="right"
                    placeholder="请选择"
                  ></busi-org>
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
    </div>
    <div class="busi-select-body">
      <dadp-refresh-list
        ref="refreshListRef"
        class="refresh-list"
        :requestApi="listUser"
        :reqParams="{
          ...reqParams,
          orgId: orgTreeType === 'BM' ? undefined : reqParams.tmpOrgIds[0] || topOrgId,
          bmOrgId: orgTreeType === 'BM' ? reqParams.tmpOrgIds[0] || topOrgId : undefined,
        }"
      >
        <template v-slot="{ data }">
          <dadp-card :title="data.userName" is-body-padding @click="cardClickFn(data)">
            <div class="grow">
              <div class="gcol">
                <span class="glabel">员工编号：</span>
                <span class="gvalue">{{ data.userId }}</span>
              </div>
              <div class="gcol">
                <span class="glabel">所属机构：</span>
                <span class="gvalue">{{ data.bmOrgName }}</span>
              </div>
            </div>
            <template #header-right>
              <van-checkbox
                :model-value="!!checkData.find((e) => e.userId === data.userId)"
                icon-size="0.35rem"
                :shape="multiple ? 'square' : 'round'"
              ></van-checkbox>
            </template>
          </dadp-card>
        </template>
      </dadp-refresh-list>
    </div>
    <div class="busi-select-check">
      <div class="left">已选择：</div>
      <div class="right">
        <van-space>
          <van-tag
            v-for="(item, index) in checkData"
            :key="index"
            color="#fff3e7"
            text-color="#FF8812"
            size="large"
            closeable
            @close="tagCloseFn(item)"
          >
            {{ item.userName }}
          </van-tag>
        </van-space>
      </div>
    </div>
    <div class="busi-select-footer">
      <van-button size="large" round plain @click="doCancel">取消</van-button>
      <van-button size="large" round type="primary" @click="doSelect">确定</van-button>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import filter from '@/assets/images/common/filter.png';
import busiOrg from '@/components/business/busi-org.vue';
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { listUser } from '@/apis/common';

const props = defineProps({
  // v-model: 绑定值
  modelValue: {
    type: Array,
    default: () => [],
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 父节点ID
  topOrgId: {
    type: String,
    default: '',
  },
  // 机构层级: 【客户机构】==> 2-一级支行  5-二级支行 【业绩机构】==> 3-一级支行  4,5,6,7-二级支行 7-网点
  // ps：该字段保留，暂不使用，过滤一级、二级、网点使用levelCode字段
  orgLevel: {
    type: String,
    default: '',
  },
  // 机构级别代码:1-一级支行  2-二级支行 3-网点
  levelCode: {
    type: String,
    default: '',
  },
  //机构树类型：默认不传-客户机构 BM-业绩机构
  orgTreeType: {
    type: String,
    default: '',
  },
  //0-全部，1-其他(业绩认领需查全部)
  isDataAuth: {
    type: String,
    default: '1',
  },

  /******************** 输入框 props传参 **********************/

  /**
   * 输入框左侧文本
   * 同van-field的label字段
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * 左侧文本宽度
   * 请使用em为单位
   */
  labelWidth: {
    type: String,
    default: '8em',
  },
  /**
   * 名称，作为提交表单时的标识符
   * 同van-field的name字段
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 占位提示文字
   * 同van-field的placeholder字段
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * 文本对齐方式
   * 同van-field的input-align字段
   */
  inputAlign: {
    type: String,
    default: 'left',
  },
  /**
   * 是否显示必填星号
   * 同van-field的required字段
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * 校验规则
   * 同van-field的rules字段
   */
  rules: {
    type: Array,
    default: () => [],
  },
  /**
   * 是否禁用
   * 同van-field的disabled字段
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用清除按钮
   * 同van-field的disabled字段
   */
  clearable: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:modelValue', 'doSelect']);

const showPopup = ref(false); // 弹窗显示
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref
// 请求参数
const reqParams = ref({
  userName: '',
  tmpOrgIds: props.topOrgId ? [props.topOrgId] : [],
  isDataAuth: props.isDataAuth,
});

// van-field的model值，主要用于回显中文
const vanFieldModel = computed(() => {
  return props.modelValue.map((e: any) => e.userName || e.userId).join(',');
});

const checkData = ref([] as any[]); // 选中数据
watchEffect(() => {
  if (showPopup.value) checkData.value = [...props.modelValue];
});

// 卡片点击事件（不存在新增，否则移除）
const cardClickFn = (item: any) => {
  let index = checkData.value.findIndex((e) => e.userId === item.userId);
  if (index === -1) {
    if (!props.multiple) checkData.value = []; // 如果单选且不存在目标ID，则先清空选中数组再放入
    checkData.value.push(item);
  } else checkData.value.splice(index, 1);
};
// 标签关闭事件（移除）
const tagCloseFn = (item: any) => {
  let index = checkData.value.findIndex((e) => e.userId === item.userId);
  checkData.value.splice(index, 1);
};

// 查询
const onSearch = () => {
  refreshListRef.value.onRefresh();
};
// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  onSearch();
  dropdownMenuRef.value.close();
};

// 选择事件
const doSelect = () => {
  emits('update:modelValue', checkData.value);
  emits('doSelect', checkData.value);
  showPopup.value = false;
};
// 取消事件
const doCancel = () => {
  showPopup.value = false;
};
</script>
<style lang="less" scoped>
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
    padding: 20px 20px 0;
    flex: auto;
    overflow: hidden;
    overflow-y: auto;

    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: 400;
    .item {
      :deep(.van-checkbox__label) {
        flex: auto;
      }
    }
    .item + .item {
      margin-top: 12px;
    }
  }
  &-check {
    background: @white;
    padding: 20px 20px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    white-space: nowrap;
    .left {
      height: 43.5px;
    }
    .right {
      overflow: hidden;
      overflow-x: auto;
    }
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
