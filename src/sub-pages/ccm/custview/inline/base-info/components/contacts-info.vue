<template>
  <div class="title">
    联系信息
    <div class="header-btn" @click="addContacts">
      <van-icon name="add-o" />
      新增
    </div>
  </div>
  <template v-if="contacts.length > 0">
    <van-swipe :autoplay="0">
      <van-swipe-item v-for="item in (contacts as any)">
        <div class="new-card">
          <dadp-card is-body-padding>
            <div class="items">
              <div class="label">联系人姓名</div>
              <div class="value">{{ item.contactsName || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">是否第一联系人</div>
              <div class="value">{{ codeTranslate('yesOrNo', item.isFirstContacts) || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">手机号码</div>
              <div class="value">{{ item.phone || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">电话</div>
              <div class="value">{{ item.landline || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">部门</div>
              <div class="value">{{ item.department || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">职务</div>
              <div class="value">{{ codeTranslate('post', item.post) || '--' }}</div>
            </div>
            <div class="items" style="width: 100%">
              <div class="label">邮箱</div>
              <div class="value">{{ item.mailbox || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">是否实控人</div>
              <div class="value">{{ codeTranslate('yesOrNo', item.isDecisionMaker) || '--' }}</div>
            </div>
            <div class="items">
              <div class="label">最近一次联系时间</div>
              <div class="value">{{ item.nearOneContactDate || '--' }}</div>
            </div>
            <div class="items" style="width: 100%">
              <div class="label">地址</div>
              <div class="value">{{ item.address || '--' }}</div>
            </div>
            <div class="items" style="width: 100%">
              <div class="label">负责事项</div>
              <div class="value-text">{{ item.respnItems || '--' }}</div>
            </div>
            <div class="footer-btn">
              <div class="header-btn edit" @click="editContacts(item)">
                <van-image class="img" :src="editIcon" />
                编辑
              </div>
              <div class="header-btn" @click="deleteContacts(item)">
                <van-image class="img" :src="deletIcon" />
                删除
              </div>
            </div>
          </dadp-card>
        </div>
      </van-swipe-item>
    </van-swipe>
  </template>
  <template v-else>
    <dadp-empty></dadp-empty>
  </template>
</template>

<script lang="ts" setup>
import deletIcon from '@/assets/images/cust/view/delete.png';
import editIcon from '@/assets/images/cust/view/edit.png';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpEmpty from '@/components/dadp-ui/dadp-empty.vue';
import { showConfirmDialog, showToast } from 'vant';

import { getContactsList, deleteContactsList } from '@/apis/cust';
import { codeTranslate } from '@/hook/code-hook';

const props = defineProps({
  custInfo: {
    type: Object,
    default: () => {},
  },
});
const router = useRouter();

const dataMap = reactive({
  contacts: [],
  editForm: Object(),
});
const { contacts } = toRefs(dataMap);

// 新增联系人
const addContacts = () => {
  router.push({
    path: `/ccm-view/contacts-add`,
    query: { custId: props.custInfo.custId, custName: props.custInfo.custName },
  });
};
// 编辑联系人
const editContacts = (item: any) => {
  router.push({
    path: `/ccm-view/contacts-edit/${item.custContactsId}`,
    query: { ...item },
  });
};
// 删除联系人
const deleteContacts = (item: any) => {
  showConfirmDialog({
    message: `是否删除该联系人?`,
  })
    .then(async () => {
      const { code } = await deleteContactsList({ custContactsIds: item.custContactsId });
      if (code == 200) {
        showToast('删除成功');
        getContactsLists();
      }
    })
    .catch(() => {});
};

// 获取联系人列表
const getContactsLists = async () => {
  const { data } = await getContactsList({ custId: props.custInfo.custId });
  dataMap.contacts = data;
};

onMounted(() => {
  getContactsLists();
});
</script>

<style lang="less" scoped>
.title {
  font-family: PingFangSC-Semibold;
  font-size: @font-size-36;
  color: @text;
  line-height: 36px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  .header-btn {
    color: @orange;
    font-size: 28px;
    line-height: 28px;
    font-weight: 400;
  }
}
.items {
  display: inline-table;
  width: 50%;
  .label {
    font-family: PingFangSC-Regular;
    font-size: @font-size-24;
    color: @gray;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 400;
  }
  .value {
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
    margin-top: 12px;
    margin-bottom: 30px;
    width: 100%;
  }
  .value-text {
    font-family: PingFangSC-Regular;
    font-size: @font-size-28;
    color: @text;
    letter-spacing: 0;
    line-height: 44px;
    font-weight: 400;
    margin-top: 12px;
    margin-bottom: 30px;
    width: 100%;
    height: 200px;
    overflow: hidden;
    overflow-y: auto;
    background-color: @gray-1;
    padding: 10px;
  }
}
.new-card {
  padding-bottom: 60px;
}
.footer-btn {
  display: flex;
  .edit {
    border-right: 1px solid @sub-text;
    padding-right: 32px;
    margin-right: 32px;
  }
  .header-btn {
    color: @orange;
    font-size: 26px;
    line-height: 26px;
    font-weight: 400;
    .img {
      height: 26px;
      width: 26px;
    }
  }
}
</style>
