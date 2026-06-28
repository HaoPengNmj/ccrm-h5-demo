declare namespace Http {
  // 请求
  interface RequestParams {
    pageNo?: number;
    pageSize?: number;
    [key: string]: any;
  }
  //返回
  interface CustomSuccessData {
    code?: number;
    msg?: string;
    message?: string;
    data?: any;
  }
  // get方法
  interface Get {
    get(url: string, params?: any): Promise<CustomSuccessData>;
  }
  // post方法
  interface Post {
    post(url: string, params?: any): Promise<CustomSuccessData>;
  }
}
//请求头
declare namespace HeadersType {
  interface type {
    'content-type': string;
    'Access-Control-Allow-Origin-Type': string;
    AuthorizationApp?: string;
    [key: string]: any;
  }
}

declare namespace UserType {
  //用户信息
  interface userInfo {
    userId: string
    userName: string
    loginName: string
    profilePic: string
    orgId: string
    orgName: string
    roleId: string
    roleName: string
    isAdmin: true;
    dataDate: string
  }
  // 角色类型
  interface RoleType {
    roleId: string;
    roleName: string;
  }
}

declare namespace ApplicationType {
  interface detailParams {
    id: string;
    type: string;
  }
  interface changeParams {
    id: string;
    type: string;
    message?: string;
    status: string;
  }
}
