<template>
  <van-nav-bar
  left-arrow
  @click-left="goBack"
  />
  <div class="container">
    <van-cell-group>
        <van-cell>
          <template #title>
            <span class="cell-label">签到人工号：</span>
          </template>
          <template #value>
            <span>{{ itemData.userId }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="cell-label">用户姓名：</span>
          </template>
          <template #value>
            <span>{{ itemData.userName }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="cell-label">所属业绩管理机构：</span>
          </template>
          <template #value>
            <span>{{ itemData.bmOrgName }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="cell-label">所属一级业绩机构：</span>
          </template>
          <template #value>
            <span>{{ itemData.bmOneOrgName }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="cell-label">签到时间：</span>
          </template>
          <template #value>
            <span>{{ itemData.signDate }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="cell-label">签到定位：</span>
          </template>
          <template #value>
            <span>{{ itemData.signAddr }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="cell-label">签到备注：</span>
          </template>
          <template #value>
            <span>{{ itemData.signType }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="cell-label">签到图片：</span>
          </template>
          <template #value>
            <dadp-file
              label=""
              moduleId="T_PCM_USER_SIGN"
              :business-id="itemData.userSignId"
              readonly
            ></dadp-file>
          </template>
        </van-cell>
      </van-cell-group>
  </div>
</template>


<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpFullScreen from '@/components/dadp-ui/dadp-full-screen.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import { useRouter } from 'vue-router';
import { listCustMark, saveMarkCancel, getMarkCancel } from '@/apis/map';
import { listFiles } from '@/apis/common';
import { showConfirmDialog } from 'vant';

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const router = useRouter();
const route = useRoute();

const itemString = route.query.item as string;
let itemData = null;
if (itemString) {
  try {
    itemData = JSON.parse(decodeURIComponent(itemString));
  } catch (e) {
    console.error('解析 item 失败', e);
  }
}
const goBack = () => {
  router.push('statistics'); // 或者你实际的路由路径
};

</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 10px;

  .van-cell-group {
    margin-bottom: 10px;
  }

  .van-cell {
    padding: 10px;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .cell-label {
      color: @gray;
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
    }

    .dadp-file {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFangSC-Regular;
      height: 50px;
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 5px;
      box-sizing: border-box;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
