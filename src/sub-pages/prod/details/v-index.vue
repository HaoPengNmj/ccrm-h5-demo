<!--
 * @desc: 产品-详情
 * @Date: 2024-09-29 17:16:06
 * @LastEditTime: 2024-10-09 20:12:53
-->
<template>
  <div class="prod-dtl">
    <van-cell-group>
      <component :is="currObj?.comp.value" :data="result"></component>
    </van-cell-group>
    <template v-if="currObj?.showItems.length > 0">
      <div class="title">产品简介</div>
      <van-cell-group>
        <van-cell v-for="(item, index) in currObj?.showItems" :key="index" :title="item.label">
          <template #value>
            <span v-if="item.convertFontSizeToRem" v-html="item.convertFontSizeToRem(result[item.props])"></span>
            <span v-else>
              {{ (item.formatter ? item.formatter(result[item.props]) : result[item.props]) || '--' }}
            </span>
          </template>
        </van-cell>

        <van-cell>
          <div class="pic">产品图片</div>
          <dadp-file label="" :moduleId="modelId" :business-id="prodId" :readonly="true"></dadp-file>
        </van-cell>
      </van-cell-group>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { pgetProd, cgetProd } from '@/apis/prod';
import { moduleComp } from '../hook';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
defineOptions({ name: 'prod-dtl' });
const currentRoute = useRoute();

const currObj = computed(() => {
  return moduleComp[currentRoute.params?.line as string]?.[currentRoute.params?.type as string];
});
const prodId = currentRoute.params.prodId as any;
const modelId = currObj.value.modeId;
// 响应数据
const result = ref({} as any);
// 获取详情数据
const getDetail = async () => {
  let api = currentRoute.params.line === 'retail' ? pgetProd : cgetProd;
  const { code, data } = await api({
    prodId: currentRoute.params.prodId,
    kindProdType: currObj.value.kindProdType,
  });
  if (code === 200) {
    result.value = data || {};
  }
};

onMounted(() => {
  getDetail();
});
</script>
<style lang="less" scoped>
.prod-dtl {
  padding: 24px;
  .van-cell-group {
    border-radius: 20px;
  }
  .title {
    font-family: PingFangSC-Medium;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    margin-top: 32px;
    margin-bottom: 24px;
  }
  :deep(.van-cell__value) {
    text-align: justify !important;
  }
  .pic {
    color: #323233;
  }
}
</style>
