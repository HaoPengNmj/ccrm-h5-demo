<template>
  <div class="register-form">
    <van-form @submit="submit">
      <dadp-card :title="'基本信息'">
        <van-field v-model="editForm.custId" label="客户号" input-align="right" error-message-align="right" disabled></van-field>
        <van-field v-model="editForm.custName" label="客户名称" input-align="right" error-message-align="right" disabled></van-field>
        <dadp-select
          v-model="editForm.isStaffRel"
          :options="getCombo('yesOrNo')"
          label="是否行员亲属"
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>

        <van-field
          v-if="custType === '1'"
          v-model="editForm.unitEdm"
          label="工作单位名称（代发）"
          input-align="right"
          error-message-align="right"
          disabled
        ></van-field>
        <van-field
          v-if="custType === '1'"
          v-model="editForm.unitWecom"
          label="工作单位名称（企微）"
          input-align="right"
          error-message-align="right"
          disabled
        ></van-field>
        <van-field
          v-model="editForm.unitHand"
          label="工作单位名称（手工）"
          input-align="right"
          error-message-align="right"
          :disabled="opType === 'view'"
        ></van-field>

        <dadp-select
          v-model="editForm.occupation"
          :options="getCombo('kycOccupation')"
          label="职业"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择职业' }]"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.salary"
          :options="getCombo('kycSalary')"
          label="年薪"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择年薪' }]"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.hobbyList"
          :options="getCombo('kycHobby')"
          label="兴趣爱好"
          multiple
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
        <dadp-select
          v-model="editForm.topicList"
          :options="getCombo('kycTopic')"
          label="适合切入话题"
          multiple
          input-align="right"
          placeholder="请选择"
          :disabled="opType === 'view'"
        ></dadp-select>
      </dadp-card>
      <dadp-card :title="'联系方式信息'">
        <template #header-right v-if="opType !== 'view'">
          <van-button type="primary" size="small" @click="openLinkForm">新增</van-button>
        </template>
        <van-swipe :autoplay="0">
          <van-swipe-item v-for="(item,index) in (linkList as any)" :key="index">
            <div class="swipe-item">
              <dadp-select
                v-model="item.contType"
                :options="getCombo('contType')"
                label="联系方式类型"
                input-align="right"
                placeholder="请选择"
                disabled
              ></dadp-select>
              <van-field
                v-model="item.contcat"
                label="联系方式"
                input-align="right"
                error-message-align="right"
                placeholder="请输入"
                disabled
              ></van-field>
              <dadp-select
                v-model="item.isFirstChoice"
                :options="getCombo('yesOrNo')"
                label="是否首选"
                input-align="right"
                placeholder="请选择"
                disabled
              ></dadp-select>
              <dadp-select
                v-model="item.isEffective"
                :options="getCombo('yesOrNo')"
                label="是否有效"
                input-align="right"
                placeholder="请选择"
                disabled
              ></dadp-select>
            </div>
          </van-swipe-item>
        </van-swipe>
      </dadp-card>
      <dadp-card :title="'联系地址信息'">
        <template #header-right v-if="opType !== 'view'">
          <van-button type="primary" size="small" @click="openAddressForm">新增</van-button>
        </template>
        <van-swipe :autoplay="0">
          <van-swipe-item v-for="(item,index) in (addressList as any)" :key="index">
            <div class="swipe-item">
              <dadp-select
                v-model="item.addrType"
                :options="getCombo('addrType')"
                label="联系地址类型"
                input-align="right"
                placeholder="请选择"
                disabled
              ></dadp-select>
              <dadp-cascader
                v-model="item.addrCounty"
                label="地区"
                label-width="8em"
                input-align="right"
                :field-names="{
                  value: 'addressCode',
                  text: 'addressName',
                  children: 'children',
                }"
                :options="TreeListOptions"
                placeholder="省/市/区县"
                disabled
              ></dadp-cascader>
              <van-field
                v-model="item.addrDetail"
                label="详细地址"
                input-align="right"
                error-message-align="right"
                placeholder="请输入"
                disabled
              ></van-field>
              <dadp-select
                v-model="item.isFirstChoice"
                :options="getCombo('yesOrNo')"
                label="是否首选"
                input-align="right"
                placeholder="请选择"
                disabled
              ></dadp-select>
              <dadp-select
                v-model="item.isEffective"
                :options="getCombo('yesOrNo')"
                label="是否有效"
                input-align="right"
                placeholder="请选择"
                disabled
              ></dadp-select>
            </div>
          </van-swipe-item>
        </van-swipe>
      </dadp-card>
      <van-action-bar v-if="opType != 'view'">
        <van-button type="default" size="large" round plain @click="router.back()">取消</van-button>
        <van-button type="primary" size="large" round native-type="submit">提交</van-button>
      </van-action-bar>
    </van-form>

    <dadp-full-screen v-if="showLinkAdd" v-model="showLinkAdd" title="新增联系方式信息">
      <van-form @submit="submit1">
        <dadp-select
          v-if="opType !== 'view'"
          v-model="newLinkForm.contType"
          :options="getCombo('contType')"
          label="联系方式类型"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择联系方式类型' }]"
        ></dadp-select>
        <van-field
          v-model="newLinkForm.contcat"
          label="联系方式"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入联系方式' }]"
        ></van-field>
        <dadp-select
          v-model="newLinkForm.isFirstChoice"
          :options="getCombo('yesOrNo')"
          label="是否首选"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
        ></dadp-select>
        <dadp-select
          v-model="newLinkForm.isEffective"
          :options="getCombo('yesOrNo')"
          label="是否有效"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
        ></dadp-select>
        <div class="gform-footer">
          <van-button size="large" round plain @click="showLinkAdd = false">取消</van-button>
          <van-button type="primary" size="large" round native-type="submit">确认</van-button>
        </div>
      </van-form>
    </dadp-full-screen>
    <dadp-full-screen v-if="showAddressAdd" v-model="showAddressAdd" title="新增联系地址信息">
      <van-form @submit="submit2">
        <dadp-select
          v-model="newAddressForm.addrType"
          :options="getCombo('addrType')"
          label="联系地址类型"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择联系地址类型' }]"
        ></dadp-select>
        <dadp-cascader
          v-model="newAddressForm.addrCounty"
          label="地区"
          label-width="8em"
          input-align="right"
          :field-names="{
            value: 'addressCode',
            text: 'addressName',
            children: 'children',
          }"
          :options="TreeListOptions"
          placeholder="省/市/区县"
          @selected="selectedFn"
        ></dadp-cascader>
        <van-field
          v-model="newAddressForm.addrDetail"
          label="详细地址"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入详细地址' }]"
        ></van-field>
        <dadp-select
          v-model="newAddressForm.isFirstChoice"
          :options="getCombo('yesOrNo')"
          label="是否首选"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
        ></dadp-select>
        <dadp-select
          v-model="newAddressForm.isEffective"
          :options="getCombo('yesOrNo')"
          label="是否有效"
          input-align="right"
          placeholder="请选择"
          required
          :rules="[{ required: true, message: '请选择' }]"
        ></dadp-select>
        <div class="gform-footer">
          <van-button size="large" round plain @click="showAddressAdd = false">取消</van-button>
          <van-button type="primary" size="large" :loading="loading" round native-type="submit">确认</van-button>
        </div>
      </van-form>
    </dadp-full-screen>
  </div>
</template>

<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpCascader from '@/components/dadp-ui/dadp-cascader.vue';
import dadpFullScreen from '@/components/dadp-ui/dadp-full-screen.vue';
import { addressGbTreeList, getPcmKyc, updatePcmKyc, kycContactList, kycAddressList, kycContactSave, kycAddressSave } from '@/apis/cust';
import { getCombo } from '@/hook/code-hook';
import { showToast } from 'vant';
import { splitFn } from '@/utils/global';
const router = useRouter();
const route = useRoute();

const opType = ref(route.query.opType || 'view');
const custId = ref(route.query.custId);
const custName = ref(route.query.custName);
const custType = ref(route.query.custType);

const dataMap = reactive({
  editForm: {
    hobbyList: [],
    topicList: [],
  } as any,
  linkList: [] as any,
  addressList: [] as any,
  TreeListOptions: [] as any,
});
const { editForm, linkList, addressList, TreeListOptions } = toRefs(dataMap);

// 国标信息(获取地址树)
const TreeList = async () => {
  const { data } = await addressGbTreeList({});
  if (data) {
    dataMap.TreeListOptions = data;
  }
};
// 获取零售kyc信息
const getPcmKycInfo = async () => {
  const { data, code } = await getPcmKyc({ custId: custId.value });
  if (code == 200) {
    dataMap.editForm = data;
    dataMap.editForm.hobbyList = data.hobby ? splitFn(data.hobby) : [];
    dataMap.editForm.topicList = data.topic ? splitFn(data.topic) : [];
    if (!dataMap.editForm.custId) {
      dataMap.editForm.custId = custId.value;
    }
    if (!dataMap.editForm.custName) {
      dataMap.editForm.custName = custName.value;
    }
  }
};
// 联系人信息
const kycContactListFn = async () => {
  const { data, code } = await kycContactList({ custId: custId.value, pageNo: 1, pageSize: 99 });
  if (code == 200) {
    dataMap.linkList = data.rows || [];
  }
};
// 地址信息
const kycAddressListFn = async () => {
  const { data, code } = await kycAddressList({ custId: custId.value, pageNo: 1, pageSize: 99 });
  if (code == 200) {
    dataMap.addressList = data.rows || [];
  }
};

const loading = ref(false);
// 提交表单
const submit = async () => {
  loading.value = false;
  const res = await updatePcmKyc({
    ...dataMap.editForm,
    custId: custId.value,
    hobby: dataMap.editForm.hobbyList.join(','),
    topic: dataMap.editForm.topicList.join(','),
    custType: custType.value,
  });
  if (res.code === 200) {
    showToast('提交成功');
    router.back();
  }
};

const showLinkAdd = ref(false);
const newLinkForm = ref({} as any);
const openLinkForm = () => {
  newLinkForm.value = {};
  showLinkAdd.value = true;
};
const submit1 = async () => {
  const res = await kycContactSave({ ...newLinkForm.value, custId: custId.value, custType: custType.value });
  if (res.code === 200) {
    showToast('保存成功');
    kycContactListFn();
    showLinkAdd.value = false;
  }
};

const showAddressAdd = ref(false);
const newAddressForm = ref({} as any);
const openAddressForm = () => {
  newAddressForm.value = {};
  showAddressAdd.value = true;
};
const selectedFn = (val) => {
  newAddressForm.value.addrProvince = val?.[0]?.addressCode;
  newAddressForm.value.addrCity = val?.[1]?.addressCode;
};

const submit2 = async () => {
  const res = await kycAddressSave({ ...newAddressForm.value, custId: custId.value, custType: custType.value });
  if (res.code === 200) {
    showToast('保存成功');
    kycAddressListFn();
    showAddressAdd.value = false;
  }
};

onMounted(() => {
  TreeList();
  getPcmKycInfo();
  kycContactListFn();
  kycAddressListFn();
});
</script>

<style lang="less" scoped>
.register-form {
  padding: 32px;
  padding-bottom: 320px;
  .swipe-item {
    padding-bottom: 48px;
  }
  .operation {
    :deep(.van-cell__value) {
      padding: 16px 24px;
      background: @gray-1;
      border-radius: 20px;
    }
  }
  .tel-content {
    padding: 20.25px 32.25px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangSC-Semibold;
    font-size: @font-size-36;
    color: @text;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 600;
    margin: 24px 32px;
    .right-text {
      font-family: PingFangSC-Regular;
      font-size: @font-size-28;
      color: @primary-color;
      letter-spacing: 0;
      text-align: right;
      line-height: 28px;
      font-weight: 400;
    }
  }
}
</style>
