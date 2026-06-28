<!--
 * @desc: 公告详情
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-10-08 15:02:09
-->
<template>
  <div class="notice-dtl">
    <dadp-card is-body-padding>
      <div class="title">{{ result.noticeTitle }}</div>
      <div class="sub">
        <van-space>
          <span class="glabel">{{ result.releaseDate }}</span>
          <van-tag color="#fff3e7" text-color="#FF8812">{{ codeTranslate('importanceType', result.importanceType) }}</van-tag>
          <van-tag color="#e8f4ff" text-color="#1F98FF">已阅</van-tag>
        </van-space>
      </div>
      <div class="text" v-html="convertFontSizeToRem(result.noticeContent)"></div>
      <dadp-file label="附件" :moduleId="'T_WP_NOTICE'" :business-id="result.noticeId" readonly></dadp-file>
    </dadp-card>
  </div>
</template>
<script lang="ts" setup>
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getNotice, readNotice } from '@/apis/home';
import { codeTranslate } from '@/hook/code-hook';
import { convertFontSizeToRem } from '@/utils/global';
defineOptions({ name: 'notice-dtl' });

const currentRoute = useRoute();
// 响应数据
const result = ref({} as any);
// 获取详情数据
const getDetail = async () => {
  const { code, data } = await getNotice({
    noticeId: currentRoute.params.noticeId,
  });
  if (code === 200) {
    result.value = data;
    readNotice({ noticeId: currentRoute.params.noticeId });
  }
};
onMounted(() => {
  getDetail();
});
</script>
<style lang="less" scoped>
.notice-dtl {
  padding: 24px;
  .title {
    font-family: PingFangSC-Medium;
    font-size: @font-size-32;
    color: @text;
    letter-spacing: 0;
    text-align: center;
    line-height: 32px;
    font-weight: 600;
  }
  .sub {
    margin-top: 46px;
  }

  .text {
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    text-align: justify;
    font-weight: 400;
    margin-top: 32px;
    word-break: break-all;
  }
}
</style>
