<!--
 * @desc: 下拉框选择器
 * @Date: 2024-09-29 09:13:42
 * @LastEditTime: 2024-09-29 15:37:10
-->
<template>
  <van-field
    :model-value="value"
    :label="label"
    :label-width="labelWidth"
    :input-align="(inputAlign as any)"
    :error-message-align="(inputAlign as any)"
    :placeholder="placeholder"
    :required="required"
    :rules="(rules as any[])"
    :disabled="disabled"
    readonly
    @click-input="showPicker = true"
  >
    <template #right-icon v-if="clearable && !!value">
      <van-icon name="clear" color="#cccccc" @click.stop="handleClean" />
    </template>
  </van-field>
  <van-popup v-model:show="showPicker" position="bottom" teleport="#app" round>
    <van-picker v-if="!multiple" :columns="columns" option-height="5vh" @confirm="onConfirm" @cancel="showPicker = false" />
    <template v-else>
      <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel van-haptics-feedback" @click="doCancel">取消</button>
        <button type="button" class="van-picker__confirm van-haptics-feedback" @click="doSelect">确认</button>
      </div>
      <div class="dadp-picker__columns">
        <dadp-tree ref="treeRef" :data="treeData" :defaultCheckIds="(modelValue as string[])" :multiple="true" :max="max"></dadp-tree>
      </div>
    </template>
  </van-popup>
</template>

<script lang="ts" setup>
import dadpTree from './dadp-tree.vue';
// 码值类型
type Code = {
  content: string;
  value: string;
};
const props = defineProps({
  // v-model: 绑定值
  modelValue: {
    type: [String, Array<String>],
    default: '',
  },
  // 码值选择器数据
  options: {
    type: Array<Code>,
    default: () => [],
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 最大选择数量
  max: {
    type: Number,
    default: undefined,
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
// v-model语法糖
const emits = defineEmits(['update:modelValue', 'change']);
let value = computed((): string => {
  if (!props.multiple) {
    let ans = props.modelValue as string;
    return props.options.find((item) => item.value === ans)?.content || ans;
  } else {
    let ans = props.modelValue as string[];
    return ans.map((e) => props.options.find((item) => item.value === e)?.content || e).join(',');
  }
});

const showPicker = ref(false); // 显示选择器
const treeRef = ref(null); // 树dom对象

// 单选options
const columns = computed(() => {
  return props.options.map((item) => {
    return {
      text: item.content,
      value: item.value,
    };
  });
});
// 多选options
const treeData = computed(() => {
  return props.options.map((item) => {
    return {
      name: item.content,
      id: item.value,
    } as TreeType.nodeTreeItem;
  });
});

// 清除事件
const handleClean = () => {
  if (!props.multiple) {
    emits('update:modelValue', '');
    emits('change', '');
  } else {
    emits('update:modelValue', []);
    emits('change', [], []);
  }
};

// 单选确认事件
const onConfirm = (val: any) => {
  emits('update:modelValue', val.selectedValues[0]);
  emits('change', val.selectedValues[0]);
  showPicker.value = false;
};

// 多选确认事件
const doSelect = () => {
  let _checkIds = (treeRef as any).value.getCheckIds();
  let _checkData = (treeRef as any).value.getCheckData();
  emits('update:modelValue', _checkIds);
  emits('change', _checkData);
  showPicker.value = false;
};
// 取消事件
const doCancel = () => {
  showPicker.value = false;
};
</script>

<style lang="less" scoped>
.dadp-picker__columns {
  height: 450px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
