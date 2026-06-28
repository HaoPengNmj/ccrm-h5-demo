<!--
 * @desc: 存款利息计算器
 * @Date: 2024-09-25 16:35:48
 * @LastEditTime: 2024-10-09 15:48:02
-->
<template>
  <div class="deposit-page">
    <div class="deposit-header">
      <dadp-card class="deposit-card">
        <div class="body-left">
          <div class="title">本息金额</div>
          <div class="value">{{ fmtThousands(result.sumMoney, 2) }}</div>
        </div>
        <div class="body-right">
          <div class="title">利息金额</div>
          <div class="value">{{ fmtThousands(result.interest, 2) }}</div>
        </div>
      </dadp-card>
    </div>
    <van-form @submit="onClickButton">
      <div class="deposit-body">
        <div class="title">请输入存款信息</div>
        <van-cell-group inset>
          <van-field
            class="reverse-field"
            v-model="queryParams.saveMoney"
            required
            type="number"
            label="存入金额（元）"
            label-align="top"
            placeholder="请输入存入金额"
            :rules="[{ required: true, message: '请输入存入金额' }]"
          >
            <template #right-icon><span class="sign">¥</span></template>
          </van-field>
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="queryParams.investDay"
            required
            type="number"
            label="存款期限（月）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入存款期限"
            :rules="[{ required: true, message: '请输入存款期限' }]"
          />
          <!-- 所有类型都展示 -->
          <van-field
            v-model="queryParams.depRate"
            required
            type="number"
            label="年利率（%）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入年利率"
            :rules="[{ required: true, message: '请输入年利率' }]"
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
import { getDepcal } from '@/apis/home';
import { fmtThousands } from '@/utils/format';

defineOptions({ name: 'deposit' });

// form表单
const queryParams = ref({
  saveMoney: '',
  depRate: '',
  investDay: '',
} as any);
// 响应结果
const result = ref({} as any);

const onClickButton = async () => {
  const { code, data } = await getDepcal({ ...queryParams.value });
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
