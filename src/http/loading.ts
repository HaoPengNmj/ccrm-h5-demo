/**
 *loading框设置局部刷新
 * 当调用一次showLoading，则次数+1；当次数为0时，则显示loading
 * 当调用一次hideLoading，则次数-1; 当次数为0时，则结束loading
 */
import { showLoadingToast } from 'vant';

//声明一个对象用于存储请求个数
let loadingRequestCount = 0;
// 初始化loading
let loadingInstance: any;
// loading 持续事件
const duration = 5000;

//显示
const showLoading = () => {
  if (loadingRequestCount === 0) {
    loadingInstance = showLoadingToast({
      duration: duration,
      forbidClick: true,
      loadingType: 'spinner',
      mask: true,
    });
  }
  loadingRequestCount++;
};

//隐藏
const hideLoading = () => {
  if (loadingRequestCount <= 0) return;
  loadingRequestCount--;
  if (loadingRequestCount === 0) {
    loadingInstance.close();
  }
};

export { showLoading, hideLoading };
