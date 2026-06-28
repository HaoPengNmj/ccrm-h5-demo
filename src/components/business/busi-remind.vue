<template>
  <van-floating-bubble class="custom-bubble" v-model:offset="offset" axis="xy" magnetic="x" :gap="0" @click="onClick">
    <template #default>
      <div class="remind-text">
        实时
        <br />
        提醒
      </div>
    </template>
  </van-floating-bubble>
  <van-dialog class="remind-dialog" v-model:show="show" title="实时提醒">
    <div class="remind-content">
      <div v-for="item in remindList">
        {{ item.remindContent }}
      </div>
      <dadp-empty v-if="remindList.length == 0"></dadp-empty>
    </div>
  </van-dialog>
</template>
<script setup lang="ts">
import dadpEmpty from '../dadp-ui/dadp-empty.vue';
import { queryAppRealTimeRemindList } from '@/apis/home';

const offset = ref({ x: -1, y: Math.floor(document.body.clientHeight * 0.7) });
const show = ref(false);
const remindList = ref([] as any);

const onClick = () => {
  show.value = !show.value;
  if (show.value) getRemindData();
};

// 获取事件提醒数据
const getRemindData = async () => {
  const { data } = await queryAppRealTimeRemindList({ pageNo: 1, pageSize: 10 });
  if (data?.rows.length) {
    remindList.value = data.rows;
  }
};
</script>
<style lang="less">
.custom-bubble {
  width: 110px;
  height: 110px;
  background: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
  box-shadow: 0px 0px 20px 0px rgba(253, 236, 219, 0.18);
  border: 10px solid #fdecdb;
  transform: translate3d(316px, 700px, 0px);
  z-index: 9;
}
.remind-text {
  font-family: PingFangSC-Regular;
  font-size: @font-size-24;
  color: @white;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: 400;
  text-align: center;
  text-wrap: wrap;
}
.remind-dialog {
  background-image: url('@/assets/images/common/message.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.remind-content {
  min-height: 268px;
  background-size: 100%;
  padding: 32px;
  div {
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
  }
}
</style>
