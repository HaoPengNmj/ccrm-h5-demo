<!--
 * @desc: 基于van-cascader二次封装的日期选择器
 * @Date: 2024-09-19 10:41:20
 * @LastEditTime: 2024-10-16 16:39:17
-->
<template>
  <van-field
    v-model="fieldModel"
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
  ></van-field>
  <van-popup v-model:show="showPopup" position="bottom" teleport="#app" round>
    <van-cascader
      v-model="cascaderModel"
      :show-header="false"
      :closeable="false"
      :options="options"
      :field-names="fieldNames"
      @cancel="showPopup = false"
      @finish="onFinishFn"
    ></van-cascader>
  </van-popup>
</template>

<script setup lang="ts">
interface EmitsType {
  (e: 'update:modelValue', value: String): void;
  (e: 'change', value: String): void;
  (e: 'selected', value: String): void;
}

const emit = defineEmits<EmitsType>();

const props = defineProps({
  /**
   * v-model
   */
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  fieldNames: {
    type: Object,
    default: () => {
      return { value: 'value', text: 'value', children: 'value' };
    },
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

// fieldModel翻译
const fieldModel = computed(() => {
  return codeTranslateMap.value[props.modelValue] || props.modelValue;
}) as any;

/**
 * cascader内部model值
 */
const cascaderModel = ref('');
watchEffect(() => {
  cascaderModel.value = props.modelValue;
});
watch(cascaderModel, () => {
  emit('update:modelValue', cascaderModel.value);
  emit('change', cascaderModel.value);
});
const onFinishFn = (val) => {
  emit('selected', val.selectedOptions);
  showPopup.value = false;
};
/**
 * 翻译库
 */
const codeTranslateMap = ref({});
const dfs = (data: Array<any>, str: string) => {
  data.forEach((e) => {
    codeTranslateMap.value[e[props.fieldNames.value]] = str + e[props.fieldNames.text];
    if (e[props.fieldNames.children]) {
      dfs(e[props.fieldNames.children], str + e[props.fieldNames.text]);
    }
  });
};
watchEffect(() => {
  dfs(props.options, '');
});

const showPopup = ref(false);
</script>
<style lang="less" scoped>
.calendar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  .van-image {
    height: 30px;
    width: 30px;
  }
}
</style>
