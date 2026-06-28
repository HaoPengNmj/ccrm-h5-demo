/*
 * @desc: 通用测试接口
 * @Date: 2024-09-27 09:23:31
 * @LastEditTime: 2024-10-08 15:54:06
 */

/**
 * 测试常量
 */
const TOTAL = 15;
const MOCK_OBJECT = {
  mockId: '@id',

  // 模拟业务类信息
  mockTitle: '@ctitle(10, 20)',
  mockTemplateName: '@ctitle(5, 10)',
  mockContent: '@cparagraph(5, 7)',
  mockRemark: '@csentence',

  // 模拟金额类信息
  mockAmount: '@float(1000, 1000000, 2, 2)', // 生成 1000 到 10000 之间的浮点数，保留两位小数
  mockLastday: '@float(-100, 100, 2, 2)', // 生成 -100% 到 100% 之间的浮点数，保留两位小数
  mockLastMonth: '@float(-100, 100, 2, 2)',
  mockLastQuarter: '@float(-100, 100, 2, 2)',
  mockLastYear: '@float(-100, 100, 2, 2)',
  mockCurrency: '@pick(["CNY", "USD", "EUR"])', // 货币类型

  // 模拟数量
  mockCustNum: '@integer(1, 100)',
  mockTodoNum: '@integer(0, 100)',
  mockTaskNum: '@integer(0, 100)',
  mockRemindNum: '@integer(0, 100)',
  
  // 模拟数据状态
  mockType: /^[1-3]$/,
  mockStatus: /^[0-4]$/,

  // 模拟人员信息
  createUserId: /^1\d{5}$/,
  createUserName: '@cname',
  createDate: '@date',
  createTime: '@datetime',

  updateUserId: /^1\d{5}$/,
  updateUserName: '@cname',
  updateDate: '@date',
  updateTime: '@datetime',

  mockAddress: '@province@city@county(true)', // 生成地址
  mockPhone: /^1[3-9]\d{9}$/,
  belongOrgId: '',
  belongOrgName: '@pick([ "北京MOCK分行", "上海MOCK分行",  "广州MOCK分行", "深圳MOCK分行", ])',
  belongLine: '@pick(["互联网金融", "电子商务", "软件开发", "硬件制造", "咨询服务", "教育培训", "游戏开发", "大数据分析"])',
};

export default [
  {
    url: '/dmp-api/test/page',
    method: 'post',
    response: {
      code: 200,
      data: {
        'rows|5-10': [MOCK_OBJECT],
        total: TOTAL,
      },
      msg: 'success',
    },
  },
  {
    url: '/dmp-api/test/list',
    method: 'post',
    response: {
      code: 200,
      'data|5-10': [MOCK_OBJECT],
      msg: 'success',
    },
  },
  {
    url: '/dmp-api/test/chart',
    method: 'post',
    response: {
      code: 200,
      data: {
        'rows|12': [MOCK_OBJECT],
        ...MOCK_OBJECT,
      },
      msg: 'success',
    },
  },
  {
    url: '/dmp-api/test/get',
    method: 'post',
    response: {
      code: 200,
      data: MOCK_OBJECT,
      msg: 'success',
    },
  },
];
