<!--
 * @desc: 营销活动
 * @Date: 2024-10-9 10:38：56
 * @LastEditTime: 2025-01-17 18:29:43
-->
<template>
  <dadp-refresh-list ref="refreshListRef" class="refresh-list" :requestApi="listMktActive" :reqParams="reqParams">
    <template v-slot="{ data }">
      <dadp-card
        ref="reference"
        :title="data.launchTitle"
        :sub-title="data.launchDesc"
        is-body-padding
        :is-arrow="true"
        @arrow-click="handleClick(data)"
      >
        <van-image style="width: 100%" :src="data.focusImg || ''"></van-image>
        <div class="grow">
          <div class="gcol">
            {{ data.createOrgName }}
          </div>
          <div class="gcol" style="white-space: nowrap; flex: none">
            <van-space>
              <van-button type="danger" round @click="handlePoster(data)">生成海报</van-button>
              <van-button v-if="data.linkShareFlag === '1'" type="primary" round icon="share-o" @click="handleShare(data)">分享</van-button>
            </van-space>
          </div>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>
  <dadp-share v-model="showSheet" :title="sheetModel.title" :desc="sheetModel.desc" :link="sheetModel.link" :img-url="sheetModel.imgUrl" />
</template>
<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpShare from '@/components/dadp-ui/dadp-share.vue';
import { listMktActive } from '@/apis/mkt';
import { getStorage } from '@/storage/storage';

defineOptions({ name: 'mkt-active' });

const userInfo = getStorage('userInfo') || {}; // 用户信息
const router = useRouter();

const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

const dataMap = reactive({
  reqParams: {
    orgLevelCode: userInfo.orgLevelCode,
  },
});
const { reqParams } = toRefs(dataMap);

const reference = ref(null);
const linkAddr = ref(null);

// 生成海报
const handlePoster = (val: any) => {
  router.push(`/mkt-active-poster/${val.actNodeNo}`);
};
const handleClick = (data: any) => {
  console.log('data.linkAddr :>> ', data.linkAddr);
  router.push({
    name: 'mkt-active-dtl',
    query: {
      linkAddr: data.linkAddr,
    },
  });
};

// 分享组件
const showSheet = ref(false);
const sheetModel = ref({
  title: '',
  desc: '',
  link: '',
  imgUrl: '',
});
// 分享
const handleShare = (val: any) => {
  sheetModel.value.title = val.linkShareTitle;
  sheetModel.value.desc = val.linkShareRem;
  sheetModel.value.link = val.linkAddr;
  sheetModel.value.imgUrl = val.shareImgUrl;
  showSheet.value = true;
};
</script>
<style lang="less" scoped>
.refresh-list {
  padding: 24px;
}
.qwfwqfwq {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  pointer-events: none;
}
</style>
