export const AMAP_KEY = '173f3cfc95677ce9845343f90a328586';
export const AMAP_VERSION = '2.0';
export const GMAP_SECURITYJSCODE = '68290c36de949f2c64b4e7d1ce34f0c3';

export const getAppUrl = (url) => {
  const APP_URL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
    import.meta.env.VITE_CORP_ID as string
  }&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_privateinfo&state=STATE&agentid=${
    import.meta.env.VITE_AGENT_ID as string
  }#wechat_redirect`;
  return APP_URL;
};
