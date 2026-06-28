export default [
  {
    url: '/dmp-api/sys/cache/listCombo',
    method: 'post',
    response: () => ({
      code: 200,
      data: {
        processStatus: [
          { value: '0', content: '审批中', parentValue: '' },
          { value: '1', content: '已通过', parentValue: '' },
          { value: '2', content: '已拒绝', parentValue: '' },
          { value: '3', content: '已驳回', parentValue: '' },
          { value: '4', content: '已撤回', parentValue: '' },
        ],
        cycleType: [
          { value: '', content: '全部' },
          { value: '1', content: '周期1' },
          { value: '2', content: '周期2' },
          { value: '3', content: '周期3' },
        ],
        way: [
          { value: '', content: '全部' },
          { value: '1', content: '方式1' },
          { value: '2', content: '方式2' },
        ],
        risk: [
          { value: '0', content: 'R1低风险', parentValue: '' },
          { value: '1', content: 'R2中低风险', parentValue: '' },
          { value: '2', content: 'R3中风险', parentValue: '' },
          { value: '3', content: 'R4中高风险', parentValue: '' },
          { value: '4', content: 'R5高风险', parentValue: '' },
        ],
        financeType: [
          { value: '0', content: '货币型', parentValue: '' },
          { value: '1', content: '封闭式', parentValue: '' },
          { value: '2', content: '定开型', parentValue: '' },
          { value: '3', content: '最短持有期', parentValue: '' },
          { value: '4', content: '客户周期型', parentValue: '' },
        ],
        prodType: [
          { value: '0', content: '活期', parentValue: '' },
          { value: '1', content: '定期', parentValue: '' },
          { value: '2', content: '大额存单', parentValue: '' },
          { value: '3', content: '整存整取', parentValue: '' },
          { value: '4', content: '零存整取', parentValue: '' },
          { value: '5', content: '定活两便', parentValue: '' },
        ],
      },
      msg: 'success',
    }),
  },
];
