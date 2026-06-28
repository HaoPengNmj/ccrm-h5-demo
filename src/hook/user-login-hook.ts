import { getCodeCombo } from '@/apis/common';
import { changeRole, postLogin, qywxLogin, postLogout } from '@/apis/user';
import { setToken } from '@/http/auth';
import { setStorage, clearStorage } from '@/storage/storage';
import { showConfirmDialog, showToast } from 'vant';
import { sm3 } from 'sm-crypto';
import router from '@/router';

//登录
interface LoginParams {
  loginName: string;
  password: string;
}

// 用户登录-账号
export const loginByAccount = async (params: LoginParams) => {
  clearStorage(); // 成功登录前清除缓存

  const { code, data } = await postLogin({
    loginName: params.loginName,
    password: sm3(params.password),
  });
  if (code === 200) {
    await setAppStore(data);
  }
};

// 用户登录-账号
export const loginByCode = async (str: string) => {
  clearStorage(); // 成功登录前清除缓存
  const { code, data } = await qywxLogin({ code: str });
  if (code === 200) {
    await setAppStore(data);
  }
};

//用户信息、角色、菜单、权限
export const setAppStore = async (res: any) => {
  const { token, funcList, menuList, roleList, ...other } = res;
  setToken(token);
  setStorage(
    'menuList',
    menuList.map((e) => e.menuId)
  );
  setStorage('funcList', funcList); //模块权限
  setStorage('roleList', roleList); // 角色列表

  /**
   * APP角色体系
   *
   * 管理员：其余角色
   * 管户人：管户人 R302
   * 营销人：全员营销岗 R666
   */
  const { roleId } = other;
  const isMgr = roleId === 'R302'; // 是否管户人
  const isMarketers = roleId === 'R666'; // 是否营销人
  const isManager = !isMgr && !isMarketers; // 是否管理员
  const qrCode = 'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcb16cf00755358a2d';
  const avatar =
    'https://thirdwx.qlogo.cn/mmopen/vi_32/E1os9WNJsbUqvE5ZZzfVBLaHOTNyCiaJnCNuyFiaeJ5QEw5oshSSEspQcUhsGql7wiaB82Fxz1a1PHH5J9nx1lD8w/0';
  console.log('other.qrCode :>> ', other.qrCode);
  console.log('other.avatar :>> ', other.avatar);
  setStorage('userInfo', {
    ...other,
    isMgr,
    isMarketers,
    isManager,
    qrCode: (other.qrCode || qrCode).replace('https://open.work.weixin.qq.com', ''),
    avatar: other.avatar || avatar,
  });
  // 用户信息
  await getCodeCombo().then((res) => {
    setStorage('codeCombo', res.data); // 码值信息
  });
};

//角色切换
export const doRoleChange = async (roleId: string) => {
  const { data: res } = await changeRole({ roleId: roleId });
  window.location.reload();
  setAppStore(res);
};

//退出
export const doLogout = async () => {
  showConfirmDialog({
    message: '确认退出',
  })
    .then(async () => {
      autoLogout();
    })
    .catch(() => {
      // showToast('取消退出');
    });
};

// 自动退出
export const autoLogout = async () => {
  await postLogout();
  clearStorage();
  nextTick(() => {
    router.replace('/login');
  });
};
