<!--
 * @desc: 基于van-calendar+van-time-picker二次封装的日期时间选择器
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
    @click-right-icon="clickRightFn"
    @click-input="openFn"
    @click.stop
  >
    <template #right-icon>
      <van-icon v-if="clearable && !!fieldModel" name="close" @click="fieldModel = ''" />
      <div v-else class="calendar-icon">
        <span v-if="!disabled && !disabledMoment" class="moment">此刻</span>
        <van-image v-else :src="calendar" />
      </div>
    </template>
  </van-field>
  <van-calendar
    v-model:show="showCalendar"
    :default-date="defaultDate"
    type="single"
    row-height="3em"
    switch-mode="month"
    teleport="#app"
    :allow-same-day="true"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirmFn"
  />
  <van-popup v-model:show="showTimePicker" position="bottom" teleport="#app" round>
    <van-time-picker
      :columns-type="columnsType"
      row-height="3em"
      :min-time="isSameDay(props.minDate, selectDate) ? minTime : undefined"
      :max-time="isSameDay(props.maxDate, selectDate) ? maxTime : undefined"
      @cancel="showTimePicker = false"
      @confirm="onConfirmTimeFn"
    />
  </van-popup>
</template>

<script setup lang="ts">
import calendar from '@/assets/images/common/calendar.png';
import { fmtDate, parseDate } from '@/utils/format';
import { isAfter, isBefore, isSameDay } from 'date-fns';

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

  /******************** 日历 props传参 **********************/

  /**
   * 最小可选日期
   * 同van-calendar的min-date字段
   */
  minDate: {
    type: Date,
    default: null,
  },
  /**
   * 最大可选日期
   * 同van-calendar的min-date字段
   */
  maxDate: {
    type: Date,
    default: null,
  },
  /**
   * 日期格式化
   */
  valueFmt: {
    type: String,
    default: 'yyyy-MM-dd HH:mm:ss',
  },
  // 选择时间列
  columnsType: {
    type: Array<String>,
    default: ['hour', 'minute', 'second'],
  },
  // // 最小时间
  // minTime: {
  //   type: String,
  //   default: '00:00:00',
  // },
  // // 最大时间
  // maxTime: {
  //   type: String,
  //   default: '23:59:59',
  // },

  // 是否禁用时刻
  // maxDate有值且不是new Date()，一律禁用
  disabledMoment: {
    type: Boolean,
    default: true,
  },
});

const minTime = computed(() => {
  return fmtDate(props.minDate, 'HH:mm:ss');
});
const maxTime = computed(() => {
  return fmtDate(props.maxDate, 'HH:mm:ss');
});
const fieldModel = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit('update:modelValue', val);
    emit('change', val);
  },
});

const defaultDate = computed(() => {
  if (!props.modelValue) {
    return undefined;
  }
  return parseDate(props.modelValue, props.valueFmt);
});

const showCalendar = ref(false);
const showTimePicker = ref(false);

// 此刻
const clickRightFn = () => {
  if (props.disabled) {
    return;
  }
  if (props.disabledMoment) {
    return;
  }
  let tmp = new Date();
  selectDate.value = tmp;
  fieldModel.value = fmtDate(selectDate.value, props.valueFmt);
};
// 打开
function openFn() {
  if (!props.disabled) showCalendar.value = true;
}

// 选中日期
const selectDate = ref();

// 日期确认
function onConfirmFn(date: Date) {
  selectDate.value = date;
  showCalendar.value = false;
  showTimePicker.value = true;
}
// 时间确认
function onConfirmTimeFn(date: any) {
  selectDate.value.setHours(date.selectedValues[0]);
  selectDate.value.setMinutes(date.selectedValues[1]);
  selectDate.value.setSeconds(date.selectedValues[2]);

  fieldModel.value = fmtDate(selectDate.value, props.valueFmt);
  showTimePicker.value = false;
}
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
  .moment {
    color: @primary-color;
    font-size: @font-size-20;
  }
}
</style>
