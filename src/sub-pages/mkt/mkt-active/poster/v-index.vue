<!--
 * @desc: 营销活动生成海报
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2025-01-17 18:23:36
-->
<template>
  <div class="page">
    <div v-if="imageUrl" class="captured-image"><van-image :src="imageUrl" alt="Captured Image" /></div>
    <div v-else class="loading-container">
      <van-loading color="#ff8812" vertical>
        <template #icon>
          <van-icon name="star-o" size="32" />
        </template>
        正在生成海报...
      </van-loading>
    </div>

    <van-action-bar>
      <van-button type="primary" size="large" round @click="handlePoster">保存</van-button>
      <van-button type="primary" size="large" round @click="handleShare">分享</van-button>
    </van-action-bar>
  </div>

  <!-- 用于生成海报的底图 -->
  <div class="container" ref="container">
    <van-image :src="mktTaskInfo?.posterImgUrls" @load="isLoad1 = true" @error="showToast('加载海报图片失败')"></van-image>
    <div class="footer">
      <div class="footer-left">
        <van-image
          round
          :src="userInfo?.avatar"
          crossorigin="Anonymous"
          @load="isLoad2 = true"
          @error="showToast('加载用户头像失败')"
        ></van-image>
      </div>
      <div class="footer-center">
        <div class="title">{{ userInfo.userName }}</div>
        <div class="sub-title">{{ userInfo.orgName }}</div>
        <!-- <div class="sub-title">{{ userInfo.roleName }}</div> -->
        <div class="sub-title">{{ userInfo.tel }}</div>
      </div>
      <div class="footer-right">
        <van-image
          :src="userInfo?.qrCode"
          crossorigin="Anonymous"
          @load="isLoad3 = true"
          @error="showToast('加载企业微信二维码失败')"
        ></van-image>
      </div>
    </div>
  </div>

  <dadp-share
    v-model="showSheet"
    :title="mktTaskInfo.launchTitle + '活动海报'"
    :desc="mktTaskInfo.launchDesc"
    :link="imageUrl"
    :img-url="imageUrl"
  />
</template>
<script lang="ts" setup>
import { getMktActive } from '@/apis/mkt';
import { getStorage } from '@/storage/storage';
import { downloadScreen } from '@/utils/global';
import { showDialog, showToast } from 'vant';
import dadpShare from '@/components/dadp-ui/dadp-share.vue';

defineOptions({ name: 'mkt-active-poster' });

const userInfo = getStorage('userInfo') || {}; // 用户信息
const route = useRoute();

const actNodeNo = ref(route.params.actNodeNo as string);
const mktTaskInfo = ref({} as any);

const container = ref(null);
const isLoad1 = ref(false);
const isLoad2 = ref(false);
const isLoad3 = ref(false);
const imageUrl = ref(null);

// 海报保存
const handlePoster = async () => {
  let isWXWork = navigator.userAgent.indexOf('wxwork') !== -1 || navigator.userAgent.indexOf('WXWork') !== -1;
  if (isWXWork) {
    showDialog({ message: '请长按图片进行保存' });
  } else {
    let byteCharacters = atob(imageUrl.value.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    let byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], {
      type: 'image/png',
    });
    let aLink = document.createElement('a');
    aLink.download = `${mktTaskInfo.value.actName}活动海报.png` + '.png';
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
    URL.revokeObjectURL(aLink.href);
    document.body.removeChild(aLink);
  }
};
// 分享
const showSheet = ref(false);
const handleShare = () => {
  showDialog({ message: '请长按图片进行保存，手动分享' });
};

//获取营销任务详情-基本信息
const initData = async () => {
  let fromData = new FormData();
  fromData.append('actNodeNo', actNodeNo.value);
  const { code, data } = await getMktActive(fromData);
  if (code === 200) {
    mktTaskInfo.value = data;
    if (!mktTaskInfo.value?.posterImgUrls) {
      showToast('未配置海报图片');
    }
  }
};
const initHtml2Canvans = async () => {
  console.log('initHtml2Canvans :>> begin：', Date.now());
  const dataURL = await downloadScreen(container.value, `${mktTaskInfo.value.actName}活动海报`);
  console.log('initHtml2Canvans :>> end：', Date.now());
  imageUrl.value = dataURL;
};

watchEffect(() => {
  console.log('isLoad :>> ', isLoad1.value, isLoad2.value, isLoad3.value);
  if (isLoad1.value && isLoad2.value && isLoad3.value) {
    setTimeout(() => {
      initHtml2Canvans();
    }, 1000);
  }
});

onMounted(() => {
  initData();
});
</script>
<style lang="less" scoped>
.page {
  position: relative;
  padding-bottom: 110px;
  height: 100%;
  box-sizing: border-box;
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .captured-image {
    // position: absolute;
    // top: 0;
    // left: 0;
    // z-index: 10;
    padding-bottom: 100px;
  }
}
.container {
  position: absolute;
  top: 0;
  z-index: -100;
  background-color: @white;
  width: 100%;

  .van-image {
    display: block;
  }

  .footer {
    width: 100%;
    box-sizing: border-box;
    padding: 24px;
    display: flex;
    justify-content: space-between;

    &-left {
      flex: none;

      .van-image {
        height: 150px;
        width: 150px;
      }
    }

    &-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: auto;
      padding: 0 24px;

      div + div {
        margin-top: 12px;
      }
    }

    &-right {
      flex: none;

      .van-image {
        height: 150px;
        width: 150px;
      }
    }

    .title {
      font-family: PingFangSC-Medium;
      font-size: @font-size-32;
      color: @text;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 600;
    }

    .sub-title {
      font-family: PingFangSC-Regular;
      font-size: @font-size-22;
      color: @gray;
      letter-spacing: 0;
      line-height: 28px;
      font-weight: 400;
    }
  }
}
</style>
