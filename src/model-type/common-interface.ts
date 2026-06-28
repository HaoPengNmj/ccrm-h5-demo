declare namespace CommonType {
  //事件提醒
  interface remindItem {
    remindId: string;
    remindContent: string;
    validDay: number;
    createDate: string;
    eventHappenDate: string;
    expireDate: string;
    remindRoleId: string;
    remindRoleName: string;
    receiverUserId: string;
    receiverUserName: string;
    receiverOrgId: string;
    receiverOrgName: string;
    custId: string;
    custName: string;
    lawOrgId: string;
    eventType: string;
    eventSmallType: string;
    remindState: string;
    eventSrc: string;
    belongOrgId: string;
    belongOrgName: string;
    mobile: string;
  }
  //指标分类
  interface targetSub {
    id: string;
    name: string;
    [key:string]:any
  }
  // 指标列表
  interface targetItem {
    indexId: string;
    indexName: string;
    [key:string]:any
  }
}
