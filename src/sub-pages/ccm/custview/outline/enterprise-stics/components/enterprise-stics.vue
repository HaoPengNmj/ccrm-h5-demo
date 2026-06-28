<template>
    <div class="hedtitle">企业特征</div>
  <dadp-card is-body-padding>
    <div class="my-cell">
      <div class="label">企业规模</div>
      <div class="value">{{ custInfo.enterScale || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属一级企业</div>
      <div class="value">{{ custInfo.industry || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属二级企业</div>
      <div class="value">{{ custInfo.industryTwo || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属三级企业</div>
      <div class="value">{{ custInfo.industryThree || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属四级企业</div>
      <div class="value">{{ custInfo.industryFour || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">员工人数</div>
      <div class="value">{{ custInfo.employeeNumber || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">社保参保人数</div>
      <div class="value">{{ custInfo.socialSecurityNum || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属地市</div>
      <div class="value">{{ custInfo.city || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属镇街</div>
      <div class="value">{{ codeTranslate('currency', custInfo.town) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">所属园区</div>
      <div class="value">{{ fmtThousands(custInfo.park, 2) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">是否规上企业</div>
      <div class="value">{{ custInfo.isAboveScale || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">是否国资控股</div>
      <div class="value textarea">{{ custInfo.isStateOwned || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">是否国资参股</div>
      <div class="value">{{ codeTranslate('entScaleBQType', custInfo.isStateControlled) || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">是否上市公司</div>
      <div class="value">{{ custInfo.isListedCompany || '--' }}</div>
    </div>
    <div class="my-cell">
      <div class="label">企业资质</div>
      <div class="value">{{ custInfo.twEnterQualifyContent || '--' }}</div>
    </div>
  </dadp-card>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import { codeTranslate } from '@/hook/code-hook';
import { fmtThousands } from '@/utils/format';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
  contacts: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="less" scoped>
.my-cell + .my-cell {
  margin-top: 24px;
}
.my-cell {
  display: flex;
}
.label {
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  color: @gray;
  letter-spacing: 0;
  line-height: 44px;
  font-weight: 400;
  width: 40%;
  white-space: nowrap;
  flex: none;
}
.value {
  font-family: PingFangSC-Regular;
  font-size: @font-size-28;
  color: @text;
  letter-spacing: 0;
  line-height: 44px;
  font-weight: 400;
}
</style>
