/*
 * @desc: 码值
 * @Date: 2024-10-08 19:55:35
 * @LastEditTime: 2024-10-09 19:32:30
 */
import { getStorage } from '@/storage/storage';

/**
 * @description: 码值翻译
 * @param {string} codeTypeId 码值类型ID
 * @param {string} val 码值
 * @return {*} 成功返回翻译后的文本，否则返回原值
 */
export const codeTranslate = (codeTypeId: string, val: string) => {
  if (!codeTypeId) return val;
  let _codeCombos = getStorage('codeCombo') || ({} as any);
  return _codeCombos[codeTypeId]?.find((e: any) => e.value === val)?.content || val;
};

/**
 * @description: 获取码值列表1
 * @param {string} codeTypeId 码值类型ID
 * @returns {Array<{ value: string; content: string; parentValue: string }>} 码值列表
 */
export const getCombo = (codeTypeId: string) => {
  if (!codeTypeId) return [];
  let _codeCombos = getStorage('codeCombo') || ({} as any);
  return _codeCombos[codeTypeId] || [];
};

/**
 * @description: 获取码值列表2
 * @param {string} codeTypeId 码值类型ID
 * @returns {Array<{ value: string; label: string}>} 码值列表
 */
export const getOptions = (codeTypeId: string) => {
  if (!codeTypeId) return [];
  let _codeCombos = getStorage('codeCombo') || ({} as any);
  return (_codeCombos[codeTypeId] || []).map((e: any) => ({ label: e.content, value: e.value }));
};

/**
 * @description: 获取码值列表2
 * @param {string} codeTypeId 码值类型ID
 * @returns {Array<{ value: string; text: string}>} 码值列表
 */
export const getDropOptions = (codeTypeId: string) => {
  if (!codeTypeId) return [];
  let _codeCombos = getStorage('codeCombo') || ({} as any);
  return (_codeCombos[codeTypeId] || []).map((e: any) => ({ text: e.content, value: e.value }));
};
