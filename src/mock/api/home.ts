export default [
  // ********************* 公告 *********************
  {
    url: '/dmp-api/home/notice/list',
    method: 'post',
    response: () => ({
      code: 200,
      'data|5': [
        {
          'noticeId|+1': 1,
          testTitle: '@ctitle(10, 20)',
          noticeContent: '@cparagraph(3, 5)',
          noticeType: '@integer(1, 3)',
          noticeStatus: '@integer(0, 1)',
          createTime: '@datetime',
          createUser: '@cname',
          updateTime: '@datetime',
          updateUser: '@cname',
          remark: '@csentence',
          isDel: '@boolean',
        },
      ],
      msg: 'success',
    }),
  },
  {
    url: '/dmp-api/home/notice/page',
    method: 'post',
    response: (params: any) => {
      return {
        code: 200,
        data: {
          'rows|10': [
            {
              'noticeId|+1': 1,
              testTitle: '@ctitle(10, 20)',
              noticeContent: '@cparagraph(3, 5)',
              noticeType: '@integer(1, 3)',
              noticeStatus: '@integer(0, 1)',
              createTime: '@datetime',
              createUser: '@cname',
              updateTime: '@datetime',
              updateUser: '@cname',
              remark: '@csentence',
              isDel: '@boolean',
            },
          ],
          total: 20,
        },
        msg: 'success',
      };
    },
  },

  // ********************* 我的业绩 *********************
  {
    url: '/dmp-api/home/perf/list',
    method: 'post',
    response: () => ({
      code: 200,
      data: {
        currentValue: '@integer(100000, 10000000)',
        lastDateValue: '@integer(-100000, 100000)',
        lastMonthValue: '@integer(-100000, 100000)',
        lastYearValue: '@integer(-100000, 100000)',
        'lineData|12': [
          {
            'perfId|+1': 1,
            'month|+1': 1,
            value: '@integer(100000, 10000000)',
            lastValue: '@integer(100000, 10000000)',
          },
        ],
      },
      msg: 'success',
    }),
  },
];
