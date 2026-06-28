<!--
 * @desc: 金融计算器
 * @Date: 2024-09-25 16:35:48
 * @LastEditTime: 2024-10-01 02:00:52
-->
<template>
  <div class="calculator-page">
    <dadp-card is-body-padding>
      <div class="container">
        <template v-for="(item, index) in calculatorItems" :key="index">
          <div class="container-item" @click="handleClick(item)">
            <van-image class="image" :src="item.image"></van-image>
            <span class="title">{{ item.name }}</span>
          </div>
        </template>
      </div>
    </dadp-card>
  </div>
</template>

<script lang="ts" setup>
import depositImg from '@/assets/images/home/calculator/deposit.png';
import financialImg from '@/assets/images/home/calculator/financial.png';
import redemptionImg from '@/assets/images/home/calculator/redemption.png';
import subscriptionImg from '@/assets/images/home/calculator/subscription.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';

defineOptions({ name: 'calculator' });

const router = useRouter();

const calculatorItems = ref([
  {
    name: '存款利息计算器',
    image: depositImg,
    link: '/calculator/deposit',
  },
  {
    name: '理财收益计算器',
    image: financialImg,
    link: '/calculator/financial',
  },
  {
    name: '基金申购/认购计算器',
    image: redemptionImg,
    link: '/calculator/redemption',
  },
  {
    name: '基金赎回计算器',
    image: subscriptionImg,
    link: '/calculator/subscription',
  },
]);

const handleClick = (item: any) => {
  router.push(item.link);
};
</script>

<style lang="less" scoped>
.calculator-page {
  padding: 24px;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .container-item {
      position: relative;
      box-sizing: border-box;
      width: calc(50% - 12px);
      height: 198px;
      border-radius: 20px;
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:first-child,
      &:nth-child(2) {
        margin-top: 0px;
      }

      .image {
        width: 90px;
        margin-bottom: 27px;
      }
      .title {
        font-family: PingFangSC-Regular;
        font-size: @font-size-30;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
        white-space: nowrap;
      }
    }
  }
}
</style>
