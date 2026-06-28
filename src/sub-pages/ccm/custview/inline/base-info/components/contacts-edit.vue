<template>
  <div class="contacts">
    <van-form @submit="submit">
      <van-cell-group inset>
        <van-field
          v-model="editForm.custId"
          label="客户号"
          input-align="right"
          disabled
          required
          :rules="[{ required: true, message: '请输入客户号' }]"
        ></van-field>
        <van-field
          v-model="editForm.custName"
          label="客户姓名"
          input-align="right"
          disabled
          required
          :rules="[{ required: true, message: '请输入客户姓名' }]"
        ></van-field>
        <van-field
          v-model="editForm.contactsName"
          label="联系人名称"
          input-align="right"
          placeholder="请输入"
          required
          :rules="[{ required: true, message: '请输入联系人名称' }]"
        ></van-field>
        <van-field
          v-model="editForm.isFirstContacts"
          label="是否第一联系人"
          label-width="10em"
          input-align="right"
          required
          :rules="[{ required: true, message: '请选择是否第一联系人' }]"
        >
          <template #input>
            <van-radio-group v-model="editForm.isFirstContacts" direction="horizontal">
              <van-radio v-for="item in getCombo('yesOrNo')" :name="item.value">{{ item.content }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-model="editForm.phone" label="手机号码" placeholder="请输入" input-align="right"></van-field>
        <van-field v-model="editForm.landline" label="电话" placeholder="请输入" input-align="right"></van-field>
        <dadp-select
          v-model="editForm.post"
          label="职务"
          :options="getCombo('post')"
          placeholder="请选择"
          input-align="right"
        ></dadp-select>
        <van-field v-model="editForm.department" label="部门" placeholder="请输入" input-align="right"></van-field>
        <van-field v-model="editForm.mailbox" label="邮箱" placeholder="请输入" input-align="right"></van-field>
        <van-field v-model="editForm.address" label="地址" placeholder="请输入" input-align="right"></van-field>
        <dadp-datetime
          v-model="editForm.nearOneContactDate"
          label="最近一次联系时间"
          label-width="10em"
          input-align="right"
          placeholder="请选择"
        ></dadp-datetime>
        <van-field v-model="editForm.isDecisionMaker" label="是否实际控制人" label-width="10em" input-align="right">
          <template #input>
            <van-radio-group v-model="editForm.isDecisionMaker" direction="horizontal">
              <van-radio v-for="item in getCombo('yesOrNo')" :name="item.value">{{ item.content }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="editForm.respnItems"
          type="textarea"
          class="operation"
          label="负责事项"
          label-align="top"
          placeholder="请输入"
          rows="5"
          autosize
        ></van-field>
      </van-cell-group>
      <van-action-bar>
        <van-action-bar-button type="primary" text="提交" native-type="submit" />
      </van-action-bar>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import dadpDatetime from '@/components/dadp-ui/dadp-datetime.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import { saveContactList, updateContactList } from '@/apis/cust';
import { getCombo } from '@/hook/code-hook';
import { showToast } from 'vant';
const route = useRoute();
const router = useRouter();
const dataMap = reactive({
  opType: '',

  editForm: {
    custId: route.query.custId,
    ...route.query,
  } as any,
});
const { editForm } = toRefs(dataMap);

// 提交
const submit = async () => {
  const { code } =
    dataMap.opType === 'add'
      ? await saveContactList({ ...dataMap.editForm, custName: dataMap.editForm.custName })
      : await updateContactList({ ...dataMap.editForm, custName: dataMap.editForm.custName });
  if (code == 200) {
    showToast('操作成功');
    router.back();
  }
};

onMounted(() => {
  dataMap.opType = route.path.includes('contacts-edit') ? 'edit' : 'add';
});
</script>
<style lang="less" scoped>
.contacts {
  padding: 32px 0;
  padding-bottom: 120px;

  .operation {
    padding: 24px;
    :deep(.van-cell__value) {
      padding: 16px 24px;
      background: @gray-1;
      border-radius: 20px;
    }
  }
}
</style>
