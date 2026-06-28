import { formatDate, parse } from 'date-fns';
import { isValid } from './validate';
const NULL_STR = '--';

/**
 * Date类型日期按传入格式转为日期字符串，默认格式化为"yyyy-MM-dd"。
 * @param time 日期
 * @param formatString 字符串格式
 */
export const fmtDate = (time: Date = new Date(), formatString = 'yyyy-MM-dd') => {
  if (!time) return undefined;
  let _date: Date;
  if (time instanceof Date) {
    _date = time;
  } else if (typeof time === 'string' || typeof time === 'number') {
    _date = new Date(time);
    if (isNaN(_date.getTime())) return time;
  } else {
    return time;
  }
  return formatDate(time, formatString);
};
/**
 * 日期字符串按传入格式转为Date类型日期，默认格式化为"yyyy-MM-dd"。
 * @param time 日期字符串
 * @param formatString 字符串格式
 */
export const parseDate = (time: string, formatString = 'yyyy-MM-dd') => {
  return parse(time, formatString, new Date());
};

/**
 * 将 'yyyyMMdd' 格式的字符串转换为 'yyyy-MM-dd HH:mm:ss' 格式的字符串
 * @param dateStr - 输入的日期字符串，例如 '20250101'
 * @returns 格式化后的日期字符串，例如 '2025-01-01 00:00:00'
 */
export const formatDateString = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = parseDate(dateStr, 'yyyyMMdd');
  return fmtDate(date, 'yyyy-MM-dd HH:mm:ss');
};
/**
 * 格式化数字，根据数字大小自动选择合适的单位（元、万元、亿元）
 * @param value 需要格式化的数据
 * @param unit 基础单位
 * @return 包含格式化后的数字和单位的对象：{value：xxx,unit:xxx}
 */
export const fmtNumber = (value: number | string, unit: string = '元') => {
  if (!isValid(value)) {
    return { value, unit };
  }
  let _value = typeof value === 'number' ? value : Number(value);

  if (Number.isNaN(_value)) {
    console.error('value不是数字类型 :>> ', value);
    return { value, unit };
  }
  if (unit.includes('亿')) {
    return { value, unit };
  }
  if (unit.includes('万')) {
    if (Math.abs(_value) > 10000) {
      return { value: parseFloat((_value / 10000).toFixed(2)), unit: `${unit.replace('万', '亿')}` };
    }
    return { value, unit };
  }
  if (Math.abs(_value) > 100000000) {
    return { value: parseFloat((_value / 100000000).toFixed(2)), unit: `亿${unit}` };
  } else if (Math.abs(_value) > 10000) {
    return { value: parseFloat((_value / 10000).toFixed(2)), unit: `万${unit}` };
  }
  return { value, unit };
};

/**
 * 数字转千分位格式字符串，支持指定小数位数。
 * @param val 需要格式化的数据
 * @param toFixedNum 需要保留的位数
 */
export const fmtThousands = (val: string | Number, toFixedNum: number = 0) => {
  if (isValid(val)) {
    const num = Number(val);
    if (isNaN(num)) return val.toString();

    /* IOS不支持零宽断言 */
    // return num
    //   .toFixed(toFixedNum)
    //   .toString()
    //   .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

    // return num
    //   .toFixed(toFixedNum)
    //   .toString()
    //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    const numStr = num.toFixed(toFixedNum);
    const parts = numStr.split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // 处理整数部分，反转后每三位添加逗号，再反转回来
    integerPart = integerPart
      .split('')
      .reverse()
      .join('') // 反转字符串
      .replace(/(\d{3})(?=\d)/g, '$1,') // 每三位加逗号（后面还有数字时）
      .split('')
      .reverse()
      .join('') // 反转回来
      .replace(/^,/, ''); // 移除开头可能多余的逗号

    return integerPart + decimalPart;
  }
  return NULL_STR;
};

/**
 * 小数转百分比，默认保留2位小数
 * @param val
 * @param precision 需要保留的位数
 * @returns
 */
export const fmtPercent = (val: number, precision = 2) => {
  if (isValid(val)) {
    return (val * 100).toFixed(precision) + '%';
  }
  return NULL_STR;
};

/**
 * 根据布尔值返回原值或脱敏数据
 * @param val
 * @param precision 需要保留的位数
 * @returns
 */
export const fmtMaskData = (val: any, isMasked: boolean) => {
  if (isMasked) {
    return '***';
  }
  return val;
};
