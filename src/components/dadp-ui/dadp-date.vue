<!--
 * @desc: 基于van-calendar二次封装的日期选择器
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
    right-icon="calendar-o"
    @click-input="openCalendarFn"
  >
    <template #right-icon>
      <van-icon
        v-if="clearable && !!fieldModel"
        name="clear"
        color="#cccccc"
        @click.stop="
          () => {
            fieldModel = '';
          }
        "
      />
      <div v-else class="calendar-icon">
        <van-image :src="calendar" />
      </div>
    </template>
  </van-field>
  <van-calendar
    v-if="compType === 'calendar'"
    v-model:show="showCalendar"
    :default-date="defaultDate"
    :type="(type as any)"
    :switch-mode="(model as any)"
    row-height="3em"
    teleport="#app"
    :overlay-style="{ pointerEvent: 'auto'}"   
    :allow-same-day="true"
    :max-date="maxDate"
    :min-date="minDate"
    @confirm="onConfirmFnOnCalendar"
    @click.stop
  />
  <van-popup v-else-if="compType === 'picker'" v-model:show="showCalendar" position="bottom" teleport="#app" round>
    <van-date-picker
      v-model="pickerModel"
      row-height="3em"
      :max-date="maxDate"
      :min-date="minDate || aHundredYearsAgo()"
      @cancel="showCalendar = false"
      @confirm="onConfirmFnOnPicker"
    />
  </van-popup>
</template>

<script setup lang="ts">
import calendar from '@/assets/images/common/calendar.png';
import { fmtDate, parseDate } from '@/utils/format';
import { addYears, getDate, getMonth, getYear } from 'date-fns';

interface EmitsType {
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
}

const emit = defineEmits<EmitsType>();

const props = defineProps({
  /**
   * v-model
   */
  modelValue: {
    type: [String, Array<String>],
    default: '',
  },
  /**
   * 组件类型
   * 可选值：calendar | picker
   */
  compType: {
    type: String,
    default: 'calendar',
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
  /******************** 日历 props传参 **********************/

  /**
   * 日历选择类型
   * 同van-calendar的type字段
   * 可选值：按van官方文档 single/multiple/range,但不建议使用multiple
   * 默认为 single
   */
  type: {
    type: String,
    default: 'single',
  },
  /**
   * 日历切换模式
   * 同van-calendar的switch-mode字段
   * 可选值：按van官方文档 none/month/year-month，但不建议使用none
   * 默认为 month
   */
  model: {
    type: String,
    default: 'month',
  },
  /**
   * 最小可选日期
   * 同van-calendar的min-date字段
   */
  minDate: {
    type: Date,
    default: undefined,
  },
  /**
   * 最大可选日期
   * 同van-calendar的min-date字段
   */
  maxDate: {
    type: Date,
    default: undefined,
  },
  labelFmt: {
    type: String,
    default: 'yyyy-MM-dd',
  },
  valueFmt: {
    type: String,
    default: 'yyyy-MM-dd',
  },
});

/**
 * van-field
 */
const fieldModel = computed({
  get: () => {
    if (!props.modelValue || props.modelValue.length === 0) {
      return '';
    }
    if (props.compType === 'calendar') {
      switch (props.type) {
        case 'multiple':
          return translateDate(props.modelValue[0] as string) + (props.modelValue.length > 1 ? '等' : '');
        case 'range':
          return translateDate(props.modelValue[0] as string) + '至' + translateDate(props.modelValue[1] as string);
        default:
          return translateDate(props.modelValue as string);
      }
    } else {
      return translateDate(props.modelValue as string);
    }
  },
  set: (val) => {
    emit('update:modelValue', val as any);
    emit('change', val as any);
  },
}) as any;

// 是否展示日历面板
const showCalendar = ref(false);
// 打开日历面板
function openCalendarFn() {
  if (!props.disabled) {
    showCalendar.value = true;
  }
}
/**
 * van-calendar
 */
// 的默认日期
const defaultDate = computed(() => {
  if (!props.modelValue || props.modelValue.length === 0) {
    return undefined;
  }
  switch (props.type) {
    case 'multiple':
      return (props.modelValue as string[]).map((e: string) => parseDate(e, props.valueFmt));
    case 'range':
      return (props.modelValue as string[]).map((e: string) => parseDate(e, props.valueFmt));
    default:
      return parseDate(props.modelValue as string, props.valueFmt);
  }
}) as any;
// 确认选择的日期
const onConfirmFnOnCalendar = (date: Date | Date[]) => {
  switch (props.type) {
    case 'multiple':
      date = date as Date[];
      fieldModel.value = date.map((e) => fmtDate(e, props.valueFmt));
      break;
    case 'range':
      date = date as Date[];
      fieldModel.value = date.map((e) => fmtDate(e, props.valueFmt));
      break;
    default:
      date = date as Date;
      fieldModel.value = fmtDate(date, props.valueFmt);
      break;
  }
  showCalendar.value = false;
};

/**
 * van-date-picker
 */
// 绑定的model对象
const pickerModel = ref([]);
watchEffect(() => {
  if (props.compType === 'picker') {
    let _date = props.modelValue ? parseDate(props.modelValue as string, props.valueFmt) : new Date();
    pickerModel.value = [_date.getFullYear(), _date.getMonth() + 1, _date.getDate()];
  }
});
// 确认选择的日期
const onConfirmFnOnPicker = (temp: any) => {
  const selectedValues = temp.selectedValues;
  let date = new Date(selectedValues[0], selectedValues[1], selectedValues[2]);
  fieldModel.value = fmtDate(date, props.valueFmt);
  showCalendar.value = false;
};

/************************** utils ***************************/

// 将日期格式从valueFmt转成labelFmt
const translateDate = (val: string) => {
  let date = parseDate(val, props.valueFmt);
  return fmtDate(date, props.labelFmt);
};
// 获取一百五十年前（生日区间）
const aHundredYearsAgo = () => {
  let now = new Date();
  return addYears(now, -150);
};
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
