<!--
 * @desc: 产品
 * @Date: 2024-09-25 18:03:19
 * @LastEditTime: 2024-10-09 20:40:09
-->
<template>
  <div class="prod-page">
    <van-nav-bar fixed placeholder left-arrow @click-left="router.back()">
      <template #title>
        <van-tabs v-model:active="prodType" type="card" :ellipsis="false" @change="activeTabChange">
          <van-tab v-for="item in moduleCompArray" :title="item.title"></van-tab>
        </van-tabs>
      </template>
    </van-nav-bar>

    <van-tabs v-model:active="bigType" sticky @change="bigTypeChange">
      <van-tab v-for="item in bigTypeComp" :title="item.title">
        <div class="container">
          <div class="container-header">
            <div class="header-left" @click="changeHotNew('热销')">
              <div class="title">热销{{ currObj.title }}产品</div>
              <div class="value">{{ fmtThousands(result.hotCount, 0) }}</div>
            </div>
            <div class="header-right" @click="changeHotNew('新发售')">
              <div class="title">
                新发售产品
                <span class="new">NEW</span>
              </div>
              <div class="value">{{ fmtThousands(result.newCount, 0) }}</div>
            </div>
          </div>
          <div class="container-btn">
            <div v-for="(item, index) in smallTypes" class="container-btn-item" :key="index" @click="routerToList(item)">
              <van-image class="item-img" :src="iconImage[index]" />
              <div class="item-title">{{ item.content }}</div>
            </div>
          </div>
          <div class="container-title">
            <div class="bar-left">
              <span class="title">
                {{ title }}{{ currObj.title }}产品
                <van-image v-if="title === '热销'" class="hot" :src="hotPng"></van-image>
              </span>
            </div>
            <div class="bar-right">
              <span
                class="more"
                @click="
                  routerToList({
                    value: '1',
                    isHot: title === '热销' ? 1 : undefined,
                    isNew: title === '新发售' ? 1 : undefined,
                  })
                "
              >
                更多
              </span>
            </div>
          </div>
          <div class="container-body">
            <template v-for="(item, index) in tableData" :key="index">
              <component :is="currObj.comp.value" :data="item" @click.stop="routerToDtl(item)"></component>
            </template>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import small1 from '@/assets/images/prod/small1.png';
import small2 from '@/assets/images/prod/small2.png';
import small3 from '@/assets/images/prod/small3.png';
import small4 from '@/assets/images/prod/small4.png';
import hotPng from '@/assets/images/prod/hot.png';

import { getCountHotNew, listPProd, listCProd } from '@/apis/prod';
import { fmtThousands } from '@/utils/format';
import { getCombo } from '@/hook/code-hook';
import { moduleCompArray } from './hook';

defineOptions({ name: 'prod' });
const router = useRouter();

// 零售产品、公司产品、普惠产品
const prodType = ref(0);
const activeTabChange = () => {
  bigType.value = 0;
  getCount();
  getList();
};

// 产品大类
const bigTypeComp = computed(() => {
  return moduleCompArray[prodType.value]?.bigTypes;
});
const bigType = ref(0);
const bigTypeChange = () => {
  getCount();
  getList();
};

// 根据activeTab和bigType,在moduleComp找到对应对象
const currObj = computed(() => {
  return moduleCompArray[prodType.value]?.bigTypes[bigType.value];
}) as any;

// 切换热销/新发售
const title = ref('热销');
const changeHotNew = (str: string) => {
  if (title.value === str) return;
  title.value = str;
  getList();
};

// 产品小类图标
const iconImage = [small1, small2, small3, small4];
// 根据对应码值取产品小类前三个 + 全部
const smallTypes = computed(() => {
  let ans = getCombo(moduleCompArray[prodType.value]?.bigTypes[bigType.value].codeCombo).slice(0, 3);
  ans.push({ content: '全部', value: '1' });
  return ans;
}) as any;

// 列表跳转
const routerToList = (item: any) => {
  // router.push(`/${moduleCompArray[prodType.value].id}/${currObj.value.id}/${item.value}`);
  router.push({
    name: `${moduleCompArray[prodType.value].id}-${currObj.value.id}`,
    query: {
      tab: item.value,
      isHot: item.isHot,
      isNew: item.isNew,
    },
  });
  //                   ***** 零售/公司/普惠 *****       ***** 产品大类 *****     *** 产品小类 ***
};
// 详情跳转
const routerToDtl = (item: any) => {
  router.push(`/prod-dtl/${moduleCompArray[prodType.value].id}/${currObj.value.id}/${item.prodId}`);
  //                         ***** 零售/公司/普惠 *****         ***** 产品大类 *****   *** 产品ID ***
};

/**
 * 初始化数据
 */
const result = ref({} as any);
const tableData = ref([] as any);
const getCount = async () => {
  const { code, data } = await getCountHotNew({ kindProdType: currObj.value.kindProdType, approveState: '2' });
  if (code === 200) {
    result.value = data || {};
  }
};
const getList = async () => {
  tableData.value = [];
  // 零售
  if (moduleCompArray[prodType.value].id === 'retail') {
    const { code, data } = await listPProd({
      kindProdType: currObj.value.kindProdType,
      isHot: title.value === '热销' ? 1 : undefined,
      isNew: title.value === '新发售' ? 1 : undefined,
      isMobileShow: '1',
      pageNo: 1,
      pageSize: 50,
      approveState: '2',
    });
    if (code === 200) {
      tableData.value = data.rows;
    }
    // 公司、普惠
  } else {
    const { code, data } = await listCProd({
      kindProdType: currObj.value.kindProdType,
      isHot: title.value === '热销' ? 1 : undefined,
      isNew: title.value === '新发售' ? 1 : undefined,
      isMobileShow: '1',
      pageNo: 1,
      pageSize: 50,
      approveState: '2',
    });
    if (code === 200) {
      tableData.value = data.rows;
    }
  }
};

onMounted(() => {
  getCount();
  getList();
});
</script>
<style lang="less" scoped>
.prod-page {
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .container {
    padding: 24px;
    &-header {
      background-image: url('@/assets/images/prod/background.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding: 32px 0;
      display: flex;
      align-items: center;
      transform: scale(1.03);

      .header-left {
        border-right: 1px dashed @gray-3;
      }
      .header-left,
      .header-right {
        width: 50%;
        text-align: center;
        .title {
          font-family: PingFangSC-Regular;
          font-size: @font-size-28;
          color: @text;
          letter-spacing: 0;
          line-height: 28px;
          font-weight: 400;
        }
        .value {
          font-family: DINAlternate-Bold;
          font-size: @font-size-36;
          color: @text;
          letter-spacing: 0;
          line-height: 36px;
          font-weight: 700;
          margin-top: 16px;
        }
        .new {
          background: @red;
          border-radius: 16px 16px 16px 0px;
          font-family: PingFangSC-Medium;
          font-size: @font-size-20;
          color: @white;
          letter-spacing: 0;
          text-align: right;
          line-height: 20px;
          font-weight: 500;
        }
      }
    }
    &-btn {
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: 20px;
      margin-top: 24px;
      &-item {
        box-sizing: border-box;
        width: 25%;
        padding: 32px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item-img {
          width: 60px;
          height: 60px;
        }
        .item-title {
          margin-top: 12px;
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
          font-weight: 400;
        }
      }
    }
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;
      margin-bottom: 27px;

      .title {
        font-family: PingFangSC-Semibold;
        font-size: @font-size-36;
        color: @text;
        letter-spacing: 0;
        line-height: 36px;
        font-weight: 600;
        .hot {
          width: 24px;
          height: 30px;
        }
      }
      .more {
        font-family: PingFangSC-Regular;
        font-size: @font-size-26;
        color: @gray;
        letter-spacing: 0;
        text-align: right;
        line-height: 26px;
        font-weight: 400;
      }
    }
    &-body {
      background: #ffffff;
      border-radius: 20px;
    }
  }
}
</style>
