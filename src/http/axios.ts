import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './auth';
import { showLoading, hideLoading } from './loading';
import router from '@/router';
import { showToast } from 'vant';
import signMd5Utils from '@/hook/use-md5-hook';
import { clearStorage } from '@/storage/storage';

// 接口类型和方法
interface BaseType {
  baseURL: string;
  getConfigParams(isRepeatStop: boolean): any;
  interceptors(instance: AxiosInstance, url: string | number | undefined): any;
  request(options: AxiosRequestConfig, isRepeatStop: boolean): any;
}

interface AxiosRequestType {
  baseURL?: string;
  url?: string | undefined;
  data?: any;
  params?: any;
  method?: string;
  headers: any;
  timeout?: number;
  value?: any;
  cancelToken?: any;
}

// 取消重复请求
const CancelToken = axios.CancelToken;
// 用于存储每个请求的取消函数以及对应标识
const sources: any = [];

// 取消函数
const removeSource = (config: any, type) => {
  if (config) {
    for (const item in sources) {
      if (sources[item].umet == config.url + '&' + config.method && sources[item].data == JSON.stringify(config.data)) {
        sources[item].cancel('已取消重复请求，请勿重复请求');
        sources.splice(item, 1);
      }
    }
  }
};

class AxiosHttpRequest implements BaseType, Http.Get, Http.Post {
  baseURL: string;
  timeout: number;
  loading?: any;
  constructor() {
    this.baseURL = import.meta.env.VITE_APP_BASE_API as string;
    this.timeout = 300000;
  }

  // 配置参数
  getConfigParams(isRepeatStop: boolean) {
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin-Type': '*',
        appInvoke: 'appInvoke',
        isRepeatStop: isRepeatStop,
      },
    };
    return config;
  }

  // get链接请求格式化
  getConfigFn(config: AxiosRequestType) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      const part = encodeURIComponent(propName) + '=';
      if (value !== null && typeof value !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            const params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + '=';
            url += subPart + encodeURIComponent(value[key]) + '&';
          }
        } else {
          url += part + encodeURIComponent(value) + '&';
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
    return config;
  }

  // 拦截设置
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestType) => {
        // 取消重复请求
        if (config.headers.isRepeatStop) {
          let index = sources.findIndex((e) => e.umet == config.url + '&' + config.method && e.data == JSON.stringify(config.data));
          if (index != -1) {
            sources[index].cancel('已取消重复请求，请勿重复请求');
            sources.splice(index, 1);
            hideLoading();
          }
          config.cancelToken = new CancelToken((c) => {
            sources.push({ umet: config.url + '&' + config.method, data: JSON.stringify(config.data), cancel: c });
          });
        }

        showLoading();

        // 生成当前的时间戳
        const timestamp = new Date().getTime();
        // 签名生成
        config.headers['sign'] = signMd5Utils.getSign(timestamp, { ...(config.data || {}) });
        config.headers['time'] = timestamp;

        const token = getToken();
        if (token) config.headers.AuthorizationApp = token;
        if (config.method === 'get' && config.params) config = this.getConfigFn(config);
        if (config.data instanceof FormData) config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      (res: any) => {
        // 释放请求
        let index = sources.findIndex((e) => e.umet == res.config.url + '&' + res.config.method && e.data == res.config.data);
        sources.splice(index, 1);

        // 关闭Loading
        hideLoading();

        const code = res.data.code || res.status;
        let msg = res.data.msg || '未知错误，请联系管理员';
        if (code !== 200) {
          res.data.msg = msg;
          showToast(msg);
        }
        if (code === 999) {
          clearStorage();
          nextTick(() => {
            router.replace('/login');
          });
        }
        return Promise.resolve(res);
      },
      (error: any) => {
        let { message } = JSON.parse(JSON.stringify(error));
        if (message === 'Network Error') {
          message = '后端接口连接异常';
        } else if (message?.includes('timeout')) {
          message = '系统接口请求超时';
        } else if (message?.includes('Request failed with status code')) {
          message = '系统接口 ' + message.substr(message.length - 3) + ' 异常';
        }
        showToast(message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 外部调用方法
   * @param options axios请求参数
   * @param isRepeatStop 是否取消重复请求(统一接口多次请求)
   * @returns 实例
   */
  request(options: AxiosRequestConfig, isRepeatStop = true) {
    const instance = axios.create({});
    options = Object.assign(this.getConfigParams(isRepeatStop), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }

  async get(url: string, params?: any): Promise<Http.CustomSuccessData> {
    const response = await this.request({
      url: url,
      method: 'get',
      params,
    });
    return Promise.resolve(response.data);
  }

  async post(url: string, params?: any, isRepeatStop = true): Promise<Http.CustomSuccessData> {
    const response = await this.request(
      {
        url: url,
        method: 'post',
        data: params || {},
      },
      isRepeatStop
    );
    return Promise.resolve(response.data);
  }
  async download(url: string, params?: any): Promise<Http.CustomSuccessData> {
    let isRepeatStop = false;
    const response = await this.request(
      {
        url: url,
        method: 'post',
        data: params,
        responseType: 'blob',
      },
      isRepeatStop
    );
    return Promise.resolve(response);
  }

  async upload(url: string, onUploadProgress, params?: any): Promise<Http.CustomSuccessData> {
    let isRepeatStop = false;
    const response = await this.request(
      {
        url: url,
        method: 'post',
        data: params,
        onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
      },
      isRepeatStop
    );
    return Promise.resolve(response.data);
  }
}

// 实例化请求类
const $axios = new AxiosHttpRequest();

export default $axios;
