declare namespace IUser {
  //用户类型定义
  type UserType = {
    userId: string;
    userName: string;
    sex: string;
    loginName: string;
    profilePic: string; // 用户头像
    roleId: string;
    roleName: string;
    tel: string;
    orgId: string;
    orgName: string;
    orgAddr: string;
    isAdmin: boolean; //是否管理岗
    [key: string]: any;
  };
  // 角色类型
  type RoleType = {
    roleId: string;
    roleName: string;
    [key: string]: any;
  };
}
