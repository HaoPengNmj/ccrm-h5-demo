import { fmtThousands } from '@/utils/format';

export const inTableColumns = [
  {
    prop: 'outflowBank',
    title: '资金流出行',
    width: '25%',
  },
  {
    prop: 'inflowTotalAmount',
    title: '流入总金额',
    formatter: (row: any) => {
      return fmtThousands(row.inflowTotalAmount, 2);
    },
    width: '25%',
  },
  {
    prop: 'inflowSameAccount',
    title: '同名账户流入金额',
    formatter: (row: any) => {
      return fmtThousands(row.inflowSameAccount, 2);
    },
    width: '25%',
  },
  {
    prop: 'inflowNotSameAccount',
    title: '非同名账户流入金额',
    formatter: (row: any) => {
      return fmtThousands(row.inflowNotSameAccount, 2);
    },
    width: '25%',
  },
];
export const outTableColumns = [
  {
    prop: 'inflowBank',
    title: '资金流入行',
    width: '25%',
  },
  {
    prop: 'outflowTotalAmount',
    title: '流出总金额',
    formatter: (row: any) => {
      return fmtThousands(row.outflowTotalAmount, 2);
    },
    width: '25%',
  },
  {
    prop: 'outflowSameAccount',
    title: '流向同名账户金额',
    formatter: (row: any) => {
      return fmtThousands(row.outflowSameAccount, 2);
    },
    width: '25%',
  },
  {
    prop: 'outflowNotSameAccount',
    title: '流向非同名账户金额',
    formatter: (row: any) => {
      return fmtThousands(row.outflowNotSameAccount, 2);
    },
    width: '25%',
  },
];

export const series = [
  {
    type: 'tree',
    data: [
      {
        name: '',
        children: [
          {
            name: '',
            children: [{ name: '客户1' }],
            symbol: 'triangle',
            slient: true,
            symbolRotate: 180,
          },
          {
            name: '',
            symbol: 'triangle',
            slient: true,
            symbolRotate: 0,
            children: [
              {
                name: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的客户',
                label: {
                  width: 10,
                  height: 120,
                  backgroundColor: 'red',
                  borderRadius: 5,
                  borderColor: '#f8f8f8',
                  borderWidth: 1,
                  textAlign: 'center',
                  padding: 10,
                  position: 'inside',
                  overflow: 'truncate',
                  formatter: (params: any) => {
                    let newName = '';
                    let len = params.data.name.length;
                    let strLen = 1; //一行显示几个字
                    let rowNum = Math.ceil(len / strLen);
                    if (len > strLen) {
                      for (let p = 0; p < rowNum; p++) {
                        let tempStr = '';
                        let start = p * strLen;
                        let end = start + strLen;
                        if (p == rowNum - 1) {
                          tempStr = params.data.name.substring(start, len);
                        } else {
                          tempStr = params.data.name.substring(start, end) + '\n';
                        }
                        newName += tempStr;
                      }
                    } else {
                      newName = params.data.name;
                    }
                    let n = newName;
                    if (n.length > 16) {
                      n = n.slice(0, 16) + '...';
                    }
                    let str = `${n}`;
                    return str;
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    left: '5%',
    orient: 'BT',
    itemStyle: { color: '#FCC800' },
    lineStyle: { color: '#FCC800' },
    lines: { curveness: 0.1 },
    label: {
      position: 'inside',
      verticalAlign: 'middle',
      align: 'bottom',
    },
    leaves: {
      label: {
        // position: 'bottom',
        verticalAlign: 'middle',
        // align: 'bottom',
      },
    },

    emphasis: {
      focus: 'descendant',
    },
    expandAndCollapse: false,
    animationDuration: 550,
    animationDurationUpdate: 750,
  },
];
