<template>
  <dadp-refresh-list
    ref="refreshListRef"
    class="refresh-list"
    :requestApi="listCustMark"
    :reqParams="{
      ...props.data,
    }"
  >
    <template v-slot="{ data }">
      <dadp-card :avatar="data.custType == '1' || data.custType == '2' ? 'task' : 'ent'">
        <template #title>
          <van-space>
            <span>{{ data.custName || data.companyName }}({{ data.custId }})</span>
            <van-tag v-if="data.custType == '1' || data.custType == '3'" style="white-space: nowrap" color="#ffe3e3" text-color="#FF0D12">
              存客
            </van-tag>
            <van-tag v-else style="white-space: nowrap" color="#e8f4ff" text-color="#1F98FF">潜客</van-tag>
            <div></div>
          </van-space>
        </template>
        <template #subTitle>
          <van-space v-if="data.custType == '1' || data.custType == '2'">
            <van-icon name="phone-o" color="#ff8812" />
            <span>{{ data.mobile || '--' }}</span>
          </van-space>
          <van-space v-else>
            <van-icon name="idcard" color="#ff8812" />
            <span>{{ data.uniformCreditCode || '--' }}</span>
          </van-space>
        </template>

        <template #header-right>
          <div style="white-space: nowrap">
            <van-button v-if="data.markStatus === '1'" plain @click="cancelMarkFn(data)">注销标注</van-button>
            <van-button v-if="data.markStatus === '3'" plain @click="viewCacelMarkFn(data)">已失效</van-button>
          </div>
        </template>
      </dadp-card>
    </template>
  </dadp-refresh-list>

  <dadp-full-screen v-model="showFullScreen" title="注销标注">
    <van-form @submit="saveData">
      <van-cell-group>
        <van-field
          v-model="formData.custName"
          label="客户名称"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          disabled
          required
          :rules="[{ required: true, message: '请输入客户名称' }]"
        ></van-field>
        <van-field
          v-model="formData.markAddr"
          label="注销地址"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          disabled
          required
          :rules="[{ required: true, message: '请输入注销地址' }]"
        ></van-field>
        <van-field
          v-if="opType === 'view'"
          v-model="formData.createUserId"
          label="创建人"
          input-align="right"
          error-message-align="right"
          placeholder="请输入"
          disabled
        ></van-field>
        <van-field
          v-model="formData.reason"
          class="area"
          type="textarea"
          label="注销理由"
          label-align="top"
          placeholder="请输入"
          rows="5"
          autosize
          :disabled="opType === 'view'"
          required
          :rules="[{ required: true, message: '请输入注销理由' }]"
        ></van-field>
        <dadp-file
          v-if="showFullScreen"
          label="附件"
          moduleId="T_CGMM_MARK_CANCEL"
          :business-id="formData.markCancelId"
          :readonly="opType === 'view'"
        ></dadp-file>
      </van-cell-group>
      <div class="gform-footer" v-if="opType !== 'view'">
        <van-button size="large" round plain @click="showFullScreen = false">取消</van-button>
        <van-button type="primary" size="large" round native-type="submit">确定</van-button>
      </div>
    </van-form>
  </dadp-full-screen>
</template>
<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpFullScreen from '@/components/dadp-ui/dadp-full-screen.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import { listCustMark, saveMarkCancel, getMarkCancel } from '@/apis/map';
import { getFileBizId } from '@/apis/common';
import { showConfirmDialog } from 'vant';

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const router = useRouter();
const route = useRoute();
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

const showFullScreen = ref(false);
const opType = ref('view');
const formData = ref({} as any);

// 注销标注
const cancelMarkFn = (data) => {
  opType.value = 'add';
  formData.value = { ...data };
  formData.value.custName = formData.value.custName || formData.value.companyName;
  initFileId();
  showFullScreen.value = true;
};
const viewCacelMarkFn = async (item) => {
  opType.value = 'view';
  const { data } = await getMarkCancel({
    custMarkId: item.custMarkId,
  });
  if (data) {
    formData.value = { ...data };
    formData.value.custName = formData.value.custName || formData.value.companyName;
    showFullScreen.value = true;
  }
};

// 保存数据
const saveData = async () => {
  showConfirmDialog({
    message: `确定注销该标注信息?`,
  })
    .then(async () => {
      const { code } = await saveMarkCancel({
        markCancelId: formData.value.markCancelId,
        custMarkId: formData.value.custMarkId,
        custName: formData.value.custName,
        reason: formData.value.reason,
      });
      if (code === 200) {
        showFullScreen.value = false;
        refreshListRef.value.onRefresh();
      }
    })
    .catch(() => {});
};

// 初始化附件ID
const initFileId = async () => {
  const { data, code } = await getFileBizId();
  if (code == 200) {
    formData.value.markCancelId = data;
  }
};
</script>

<style lang="less" scoped>
.refresh-list {
  background-color: @gray-1;
  padding: 32px;
}
</style>
