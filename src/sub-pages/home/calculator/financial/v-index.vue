<!--
 * @desc: 理财收益计算器
 * @Date: 2024-09-25 16:35:48
 * @LastEditTime: 2024-10-08 15:44:38
-->
<template>
  <div class="deposit-page">
    <div class="deposit-header">
      <dadp-card class="deposit-card">
        <div class="body-left">
          <div class="title">预计收益（元）</div>
          <div class="value">{{ fmtThousands(result.income, 2) }}</div>
        </div>
        <div class="body-right">
          <div class="title">本息（元）</div>
          <div class="value">{{ fmtThousands(result.total, 2) }}</div>
        </div>
      </dadp-card>
    </div>
    <van-form @submit="onClickButton">
      <div class="deposit-body">
        <div class="title">请输入理财产品信息</div>
        <van-cell-group inset>
          <van-field
            class="reverse-field"
            v-model="queryParams.wealthMoney"
            required
            type="number"
            label="理财金额（元）"
            label-align="top"
            placeholder="请输入理财金额"
            :rules="[{ required: true, message: '请输入' }]"
          >
            <template #right-icon><span class="sign">¥</span></template>
          </van-field>
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="queryParams.wealthRate"
            required
            type="number"
            label="年利率（%)"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入年利率"
            :rules="[{ required: true, message: '请输入' }]"
          />
          <van-field
            v-model="queryParams.closePeriod"
            required
            type="number"
            label="封闭期（天）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入封闭期"
            :rules="[{ required: true, message: '请输入' }]"
          />
        </van-cell-group>
      </div>

      <van-action-bar>
        <van-action-bar-button type="primary" text="计算" native-type="submit" />
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getWealthCal } from '@/apis/home';
import { fmtThousands } from '@/utils/format';

defineOptions({ name: 'financial' });

// form表单
const queryParams = ref({
  wealthMoney: '',
  wealthRate: '',
  closePeriod: '',
} as any);

// 响应结果
const result = ref({} as any);

const onClickButton = async () => {
  const { code, data } = await getWealthCal({ ...queryParams.value });
  if (code === 200) {
    result.value = data;
  }
};
</script>

<style lang="less" scoped>
.deposit-page {
  .deposit-header {
    padding: 16px 20px 0px;
    .deposit-card {
      width: 100%;
      box-shadow: none;
      background: none;
      background-image: url('@/assets/images/home/calculator/background.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      :deep(.body) {
        padding: 48px 32px;
        display: flex;
        align-items: center;
        &-left {
          border-right: 1px dashed @gray-3;
        }
        &-left,
        &-right {
          width: 50%;
          text-align: center;
          .title {
            font-family: PingFangSC-Regular;
            font-size: @font-size-28;
            letter-spacing: 0;
            line-height: 28px;
            font-weight: 400;
          }
          .value {
            font-family: DINAlternate-Bold;
            font-size: @font-size-36;
            letter-spacing: 0;
            line-height: 36px;
            font-weight: 700;
            margin-top: 16px;
          }
        }
      }
    }
  }
  .deposit-body {
    padding-bottom: 120px;
    .title {
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
      letter-spacing: 0;
      line-height: 28px;
      font-weight: 400;
      margin: 24px 32px 24px;
    }
    .van-cell-group {
      padding: 12px 0px;
    }
    .van-cell-group + .van-cell-group {
      margin-top: 24px;
    }
    .reverse-field {
      :deep(.van-field__label--top) {
        margin-bottom: 32px;
      }
      :deep(.van-field__value) {
        border-bottom: 1px solid @gray-3;
        padding-bottom: 30px;
        .van-field__body {
          flex-direction: row-reverse;
        }
      }

      .sign {
        font-family: PingFangSC-Semibold;
        font-size: @font-size-40;
        color: @text;
        letter-spacing: 0;
        line-height: 40px;
        font-weight: 600;
        margin-right: 32px;
      }
    }
  }
}
</style>
