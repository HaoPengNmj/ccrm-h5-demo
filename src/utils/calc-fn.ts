/**
 * @description: 处理加减乘除的精度问题
 * @param {num1} 传入的数
 * @param {num2} 传入的数
 * @param {operator} 操作类型
 * @param {resDigits} 保留位数
 * @return {*}
 */
export const calcWithPrecision = (num1: number, num2: number, operator: string): number => {
  const num1Str = `${num1}`;
  const num2Str = `${num2}`;
  const dotIndex1 = num1Str.indexOf('.');
  const dotIndex2 = num2Str.indexOf('.');
  const precision1 = dotIndex1 === -1 ? 0 : num1Str.length - dotIndex1 - 1;
  const precision2 = dotIndex2 === -1 ? 0 : num2Str.length - dotIndex2 - 1;
  const precision = Math.max(precision1, precision2);
  // 对数字进行放大或缩小的操作，使其整数部分能够进行四则运算
  const scaledNum1 = num1 * Math.pow(10, precision);
  const scaledNum2 = num2 * Math.pow(10, precision);
  // 根据运算符进行计算
  let result: number;
  switch (operator) {
    case '+':
      result = scaledNum1 + scaledNum2;
      break;
    case '-':
      result = scaledNum1 - scaledNum2;
      break;
    case '*':
      result = scaledNum1 * scaledNum2;
      break;
    case '/':
      result = scaledNum1 / scaledNum2;
      break;
    default:
      throw new Error('Unsupported operator');
  }
  if(operator==='*'){
	  let scael= Math.pow(10, precision) * Math.pow(10, precision)
	  return result / scael
  }
  return  result / Math.pow(10, precision)
}

//加法
export const numberAdd = (
  arg1: number,
  arg2: number,
) => {
  let res: number = calcWithPrecision(arg1, arg2, '+')
  return res
};
//减法
export const numberSub = (
  arg1: number,
  arg2: number
) => {
  let res = calcWithPrecision(arg1, arg2, '-')
  return res
};
//乘法
export const numberMul = (
  arg1: number,
  arg2: number
) => {
  let res = calcWithPrecision(arg1, arg2, '*')
  return res
};

//除法
export const numberDiv = (
  arg1: number,
  arg2: number
) => {
  let res = calcWithPrecision(arg1, arg2, '/')
  return res
};
