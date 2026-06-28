export const isValid = (val: any) => {
  return val !== null && val !== undefined && val !== '';
};

/**
 * 校验函数模块
 */
/**
 * 手机号码验证（严谨），根据2019年工信部最新公布的号段
 * @param phone 手机号码
 * @returns true || false
 */
export const isPhone = (phone: string) => {
  let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  return reg.test(phone);
};

/**
 * 邮箱格式验证
 * @param email 邮箱
 * @returns true || false
 */
export const isEmail = (email: string) => {
  let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};
