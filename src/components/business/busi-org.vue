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
      <van-icon name="close" @click="vanFieldModel = ''" />
    </template>
  </van-field>
  <van-popup
    v-model:show="showPopup"
    class="busi-select"
    :style="{ height: '80vh' }"
    round
    position="bottom"
    teleport="#app"
  >
    <div class="busi-select-header">
      <div class="title">机构选择</div>
      <van-search v-model="keyword" shape="round" placeholder="请输入搜索关键词" />
    </div>
    <div class="busi-select-body">
      <dadp-tree ref="treeRef" :data="treeData" :defaultCheckIds="modelValue" :filterText="keyword" :multiple="multiple"></dadp-tree>
    </div>
    <div class="busi-select-footer">
      <van-button size="large" round plain @click="doCancel">取消</van-button>
      <van-button size="large" round type="primary" @click="doSelect">确定</van-button>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import dadpTree from '../dadp-ui/dadp-tree.vue';
import { ListToTree, arrayToMap } from '@/utils/global';
import { listOrg, listOrgBm } from '@/apis/common';

const props = defineProps({
  // v-model: 绑定值
  modelValue: {
    type: Array<string>,
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

// van-field中文回显
const vanFieldModel = computed(() => {
  return props.modelValue.map((item: any) => treeMaps.value[item]?.name || item).join(',');
});

const showPopup = ref(false); // 弹窗显示
const keyword = ref(''); // 关键字
const treeRef = ref(null); // 树dom对象
const treeData = ref([] as TreeType.nodeTreeItem[]); // 树数据
const treeMaps = ref({} as any);

// 选择事件
const doSelect = () => {
  let _checkIds = (treeRef as any).value.getCheckIds();
  let _checkData = (treeRef as any).value.getCheckData();
  emits('update:modelValue', _checkIds);
  emits('doSelect', _checkData, _checkIds);
  showPopup.value = false;
};
// 取消事件
const doCancel = () => {
  showPopup.value = false;
};

// 初始化数据
const initData = async () => {
  let apiUrl = props.orgTreeType === 'BM' ? listOrgBm : listOrg;
  const { data } = await apiUrl({ topOrgId: props.topOrgId, orgLevel: props.orgLevel, levelCode: props.levelCode });
  if (data && data.length) {
    let ans = data.map((item: any) => ({ ...item, open: false }));
    treeData.value = ListToTree(ans);
    treeMaps.value = arrayToMap(ans);
  }
};

onMounted(() => {
  initData();
});
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
