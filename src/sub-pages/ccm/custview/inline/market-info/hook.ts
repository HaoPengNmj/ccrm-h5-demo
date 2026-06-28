
import { defineAsyncComponent, shallowRef } from 'vue';
const prodRecommend = defineAsyncComponent(() => import('./components/prod-recommend.vue')); // 产品推荐
const marketActive = defineAsyncComponent(() => import('./components/market-active.vue')); // 营销活动
const remind = defineAsyncComponent(() => import('./components/remind.vue')); // 事件提醒
const businessClue = defineAsyncComponent(() => import('./components/business-clue.vue')); // 商机线索


const depItem = defineAsyncComponent(() => import('@/sub-pages/prod/corporation/deposit/item.vue'))//存款产品卡片内容
const loanItem = defineAsyncComponent(() => import('@/sub-pages/prod/corporation/loan/item.vue'))//贷款产品卡片内容
const wealthItem = defineAsyncComponent(() => import('@/sub-pages/prod/corporation/finance/item.vue'))//理财产品卡片内容
const backletterItem = defineAsyncComponent(() => import('@/sub-pages/prod/corporation/backletter/item.vue'))//保函产品卡片内容
const silverItem = defineAsyncComponent(() => import('@/sub-pages/prod/corporation/silver/item.vue'))//银承产品卡片内容
const tradeItem = defineAsyncComponent(() => import('@/sub-pages/prod/corporation/trade/item.vue'))//贸融产品卡片内容
const otherItem = defineAsyncComponent(() => import('@/sub-pages/prod/corporation/other/item.vue'))//理财产品卡片内容

export const marketComp = [
    {
        title: '产品推荐',
        id: 'prodRecommendRef',
        // permission: 'prodRecommend',
        comp: shallowRef(prodRecommend),
    },
    {
        title: '营销任务',
        id: 'marketActiveRef',
        // permission: 'perfIndex',
        comp: shallowRef(marketActive),
    },
    {
        title: '事件提醒',
        id: 'remindRef',
        // permission: 'remind',
        comp: shallowRef(remind),
    }, {
        title: '商机线索',
        id: 'businessClueRef',
        // permission: 'businessClue',
        comp: shallowRef(businessClue),
    },
]
// 产品推荐组件
export const prodItem = {
    depComp: shallowRef(depItem),
    loanComp: shallowRef(loanItem),
    wealthComp: shallowRef(wealthItem),
    backletterComp: shallowRef(backletterItem),
    silverComp: shallowRef(silverItem),
    tradeComp: shallowRef(tradeItem),
    otherComp: shallowRef(otherItem),
}