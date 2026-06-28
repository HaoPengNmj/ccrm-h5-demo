<!--
 * @desc: 基金赎回计算器
 * @Date: 2024-09-25 16:35:48
 * @LastEditTime: 2024-10-09 15:48:18
-->
<template>
  <div class="deposit-page">
    <div class="deposit-header">
      <dadp-card class="deposit-card">
        <div class="card-row">
          <div>
            <div class="title">实际所得金额（元）</div>
            <div class="value">{{ fmtThousands(result.realAmount, 2) }}</div>
          </div>
        </div>
        <div class="card-row">
          <div class="card-row-left">
            <div class="title">赎回手续费（元）</div>
            <div class="value">{{ fmtThousands(result.redeemFee, 2) }}</div>
          </div>
          <div class="card-row-right">
            <div class="title">后端申购手续费（元）</div>
            <div class="value">{{ fmtThousands(result.applyFee, 2) }}</div>
          </div>
        </div>
      </dadp-card>
    </div>
    <van-form @submit="onClickButton">
      <div class="deposit-body">
        <div class="title">请填写基金赎回信息</div>
        <van-cell-group inset>
          <van-field
            v-model="queryParams.redeemAmount"
            required
            type="number"
            label="赎回份额（份）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入赎回份额"
            :rules="[{ required: true, message: '请输入' }]"
          />
          <van-field
            v-model="queryParams.redeemAsset"
            required
            type="number"
            label="赎回净值（元/份）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入赎回净值"
            :rules="[{ required: true, message: '请输入' }]"
          />
          <van-field
            v-model="queryParams.redeemRate"
            required
            type="number"
            label="赎回费率（%）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入赎回费率"
            :rules="[{ required: true, message: '请输入' }]"
          />
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="queryParams.applyAsset"
            type="number"
            label="申购净值（元/份）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入申购净值"
          />

          <div class="tip-row">
            <van-image :src="tip"></van-image>
            <span class="tip">若是后端收费基金，请填写此项，否则可以不填写</span>
          </div>
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="queryParams.applyRate"
            type="number"
            label="后端申购费率（%）"
            label-width="10em"
            input-align="right"
            error-message-align="right"
            placeholder="请输入后端申购费率"
          />

          <div class="tip-row">
            <van-image :src="tip"></van-image>
            <span class="tip">若是后端收费基金，请填写此项，否则可以不填写</span>
          </div>
        </van-cell-group>
      </div>

      <van-action-bar>
        <van-action-bar-button type="primary" text="计算" native-type="submit" />
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import tip from '@/assets/images/home/calculator/tip.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { getFundRedeemCal } from '@/apis/home';
import { fmtThousands } from '@/utils/format';

defineOptions({ name: 'subscription' });

// form表单
const queryParams = ref({
  redeemAmount: '',
  redeemAsset: '',
  date1: '',
  date2: '',
  redeemRate: '',
  period: '',
  applyRate: '',
} as any);

// 响应结果
const result = ref({} as any);

const onClickButton = async () => {
  const { code, data } = await getFundRedeemCal({ ...queryParams.value });
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
      background-image: url('@/assets/images/home/calculator/background2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      :deep(.body) {
        padding: 48px 32px;
        .card-row {
          display: flex;
          align-items: center;
          justify-content: center;
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
          & + .card-row {
            margin-top: 44px;
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
      .tip-row {
        display: flex;
        align-items: center;
        padding: 24px 30px;
        .van-image {
          height: 24px;
          width: 24px;
          margin-right: 16px;
        }
        .tip {
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @primary-color;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
        }
      }
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
