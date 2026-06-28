import { showToast } from 'vant';
import $axios from '@/http/axios';
import router from '@/router';
import { clearStorage } from '@/storage/storage';

interface CustomSuccessData {
  code?: number;
  msg?: string;
  message?: string;
  data?: any;
  [keys: string]: any;
}

export const downLoadFile = async (val: any) => {
  downloadFiles('/sys/file/download', { fileId: val.fileId });
};
/**
 * 文件下载
 * @param _url 地址
 * @param _params 参数
 * @param requestFn 请求方式
 * @returns
 */
export const downloadFiles = (_url: string, _params: any, requestFn = 'download') => {
  $axios[requestFn](_url, _params)
    .then((res: CustomSuccessData) => {
      const { data } = { ...res };
      if (data.type === 'application/json') {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          let result = JSON.parse((fileReader as any).result);
          if (result.code === 999) {
            clearStorage();
            nextTick(() => {
              router.replace('/login');
            });
          }
        };
        fileReader.readAsText(res.data);
        return;
      }
      const contentDisposition = res.headers['content-disposition'];
      let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=') + 1));
      const blob = new Blob([data], {
        type: 'application/octet-stream',
      });
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        (navigator as any).msSaveBlob(blob, fileName);
      }
    })
    .catch((err: any) => {
      console.error('err :>> ', err);
      showToast(err.msg);
    });
};
