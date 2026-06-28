<template>
  <van-field
    class="dadp-uploader"
    name="uploader"
    :label="label"
    label-align="top"
    :required="required"
    :rules="(rules as any[])"
    :disabled="disabled || readonly"
  >
    <template #input>
      <van-uploader
        v-if="!disabled && !readonly"
        v-model="fileList"
        result-type="file"
        :show-upload="true"
        :accept="fileAccept"
        :max-count="maxCount"
        :after-read="afterReadFn"
        :before-read="beforeReadFn"
        :before-delete="beforeDeleteFn"
        :capture="capture"
        @click-preview="clickPreviewFn($event)"
      ></van-uploader>
      <div class="container" v-if="readonly || disabled">
        <div class="container-item" v-for="(file, index) in fileList" :key="file.fileId" @click="downLoadFileFn(file, 'download')">
          <van-image class="icon" :src="fileIcon"></van-image>
          <div class="name">{{ file.name || file.clientFileName }}</div>
        </div>
      </div>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import fileIcon from '@/assets/images/common/file.png';
import { listFiles, doUploadFile, doDeleteFile, doDownloadFile } from '@/apis/common';
import { showImagePreview, showToast } from 'vant';

const props = defineProps({
  /******************** 输入框 props传参 **********************/

  /**
   * 输入框左侧文本
   * 同van-field的label字段
   */
  label: {
    type: String,
    default: '附件',
  },
  /**
   * 左侧文本宽度
   * 请使用em为单位
   */
  labelWidth: {
    type: String,
    default: '8em',
  },
  /**
   * 名称，作为提交表单时的标识符
   * 同van-field的name字段
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 占位提示文字
   * 同van-field的placeholder字段
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * 文本对齐方式
   * 同van-field的input-align字段
   */
  inputAlign: {
    type: String,
    default: 'left',
  },
  /**
   * 是否显示必填星号
   * 同van-field的required字段
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * 校验规则
   * 同van-field的rules字段
   */
  rules: {
    type: Array,
    default: () => [],
  },
  /**
   * 是否禁用
   * 同van-field的disabled字段
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用清除按钮
   * 同van-field的disabled字段
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  // 业务表名
  moduleId: {
    type: String,
    default: '',
  },
  // 业务Id
  businessId: {
    type: String,
    default: '',
  },
  // 可上传附件类型
  fileAccept: {
    type: String,
    default: 'image/*,video/*',
  },
  //最大上传数量
  maxCount: {
    type: Number,
    default: 5,
  },
  // 单个文件大小,以M为单位，默认50M
  fileSize: {
    type: Number,
    default: 50,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  // 设置camera直接调起摄像头
  capture: {
    type: String,
    default: null,
  },
});

const dataMap = reactive({
  fileList: Array<any>(),
  queryParams: new FormData(),
});
const { fileList } = toRefs(dataMap);

/**
 * 下载、预览方法
 * @param file
 * @param method download：下载 preview：预览
 */
const downLoadFileFn = (file: any, method: string) => {
  if (props.disabled) {
    return false;
  }
  let isWXWork = navigator.userAgent.indexOf('wxwork') !== -1 || navigator.userAgent.indexOf('WXWork') !== -1;
  if (isWXWork) {
    (window as any).$qywx.previewFile(
      `${import.meta.env.VITE_APP_BASE}/dmp-api/sys/file/appDownload?fileId=${file.fileId}`,
      file.clientFileName,
      file.fileSize
    );
    return;
  }

  if (method === 'preview' && file.previewUrl) {
    showImagePreview([file.previewUrl]);
    return;
  }

  doDownloadFile(file).then((res) => {
    const { code, data } = { ...res };
    if (data.type === 'application/json') {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        let result = JSON.parse((fileReader as any).result);
        showToast(result.msg);
      };
      fileReader.readAsText(res.data);
      return;
    }
    const blob = new Blob([data], {
      type: 'application/octet-stream',
    });
    let url = URL.createObjectURL(blob);
    if (method === 'preview') {
      file.previewUrl = url;
      showImagePreview([file.previewUrl]);
    } else {
      const elink = document.createElement('a');
      elink.download = file.clientFileName;
      elink.style.display = 'none';
      elink.href = url;
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href);
      document.body.removeChild(elink);
    }
  });
};
const clickPreviewFn = (val) => {
  if (!val.file) {
    downLoadFileFn(val, 'download');
  }
};

/**
 * 文件读取前
 * @param file
 */
const beforeReadFn = (file) => {
  console.log('文件读取前 :>> ', file);
  let filesType = file.type;
  if (
    // 压缩包、word、pdf、excel
    // !filesType.startsWith('application/vnd') &&
    // !filesType.startsWith('application/ms') &&
    // txt
    // !filesType.startsWith('text/plain') &&
    // 图片
    !filesType.startsWith('image/') &&
    // 视频
    !filesType.startsWith('video/')
  ) {
    showToast('不支持该文件类型!');
    return false;
  }
  let _fileSize = file.size;
  if (_fileSize > props.fileSize * 1024 * 1024) {
    showToast('文件大小不能超过50M');
    return false;
  }
  return true;
};
/**
 * 上传文件的回调函数
 * @param fileObj 上传的文件对象
 * @param item 上传文件的信息 {name: '', index: ''}
 */
const afterReadFn = (fileObj: any, item: any) => {
  console.log('上传文件的回调函数 :>> ', fileObj);
  fileObj.status = 'uploading';
  fileObj.message = '上传中...';

  let _formData = new FormData();
  _formData.append('file', dataMap.fileList[item.index].file);
  _formData.append('bizId', props.businessId);
  _formData.append('moduleId', props.moduleId);
  dataMap.queryParams = _formData;

  uploadFileFn(fileObj);
};
/**
 * 上传方法
 * @param fileObj 上传对象
 */
const uploadFileFn = (fileObj: any) => {
  console.log('上传方法 :>> ', fileObj);
  fileObj.name = fileObj.file?.name;
  fileObj.uploadProgress = 0;
  doUploadFile(dataMap.queryParams, (progressEvent) => {
    if (progressEvent.lengthComputable) {
      fileObj.uploadProgress = Number(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2));
    }
  })
    .then((result: any) => {
      if (result.code === 200) {
        if (result.data) {
          fileObj.serverPath = result.data.serverPath;
          fileObj.clientFileName = result.data.clientFileName;
          fileObj.serverFileName = result.data.serverFileName;
        }
        console.log('fileObj :>> ', fileObj);
        fileObj.status = 'done';
        fileObj.message = '上传成功';
      } else {
        console.error('[failed]uploadFileFn :>> ', result);
        fileObj.status = 'failed';
        fileObj.message = '上传失败';
      }
    })
    .catch((err: any) => {
      console.error('[ERROR]uploadFileFn :>> ', err);
      fileObj.status = 'failed';
      fileObj.message = '上传异常';
    });
};

/**
 * 文件删除前
 * @param file
 * @param index
 */
const beforeDeleteFn = (file: any, indexObj) => {
  // 未成功上传的附件无需调用接口删除
  if (file.status == 'failed') {
    dataMap.fileList.splice(indexObj.index, 1);
    showToast('删除成功');
  } else {
    doDeleteFile({ serverPath: file.serverPath, serverFileName: file.serverFileName }).then((res: any) => {
      if (res.code == 200) {
        dataMap.fileList.splice(indexObj.index, 1);
        showToast('删除成功');
      }
    });
  }
};

/**
 * 初始化文件信息
 */
const initFileList = async () => {
  const { data } = await listFiles({ bizId: props.businessId, moduleId: props.moduleId });
  if (data) {
    dataMap.fileList = data;
  }
};
watchEffect(() => {
  if (props.businessId) initFileList();
});
</script>

<style lang="less" scoped>
.dadp-uploader {
  :deep(.van-field__control--custom) {
    display: block;
  }
  :deep(.van-uploader) {
    margin-bottom: 24px;
  }
  // :deep(.van-uploader__preview) {
  //   display: none;
  // }
}
.container {
  width: 100%;
  &-item {
    background: @gray-1;
    border-radius: 20px;
    width: 100%;
    padding: 12px;

    font-size: @font-size-28;
    font-weight: 400;
    font-family: PingFangSC-Regular;
    color: @gray;

    display: flex;
    align-items: center;

    .icon {
      height: 30px;
      width: 30px;
      margin-right: 12px;
    }
    .name {
      width: 0;
      flex: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & + & {
      margin-top: 24px;
    }
  }
}
</style>
