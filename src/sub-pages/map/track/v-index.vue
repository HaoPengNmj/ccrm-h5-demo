<!--
 * @desc: 营销地图-营销轨迹
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-12-23 09:25:45
-->
<template>
  <van-search v-model="reqParams.userName" shape="round" show-action disabled placeholder="点击右侧图标打开筛选">
    <template #action>
      <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item>
          <template #title>
            <div class="filter-action"><van-image class="filter-icon" :src="filter" /></div>
          </template>
          <van-form class="gform" @submit="onSubmit">
            <van-cell-group>
              <busi-user
                v-model="reqParams.users"
                label="员工姓名"
                :top-orgId="userInfo.orgId"
                input-align="right"
                placeholder="请选择"
                @do-select="
                  () => {
                    reqParams.userId = reqParams.users.map((e) => e.userId).join(',');
                    reqParams.userName = reqParams.users.map((e) => e.userName).join(',');
                  }
                "
                :disabled="!userInfo.isManager"
                required
                :rules="[{ required: true, message: '请选择员工' }]"
              ></busi-user>
              <dadp-date
                v-model="reqParams.signDate"
                label="拜访日期"
                input-align="right"
                placeholder="请选择日期"
                clearable
                required
                :rules="[{ required: true, message: '请选择拜访日期' }]"
              />
            </van-cell-group>
            <div class="gform-footer">
              <van-button size="large" round plain @click="onCancel">取消</van-button>
              <van-button type="primary" size="large" round native-type="submit">确认</van-button>
            </div>
          </van-form>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-search>
  <div id="map-container"></div>
</template>

<script lang="ts" setup>
import filter from '@/assets/images/common/filter.png';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import busiUser from '@/components/business/busi-user.vue';
import curPosition from '@/assets/images/map/curPosition.png';
import useAmap from '@/hook/use-amap-hook';
import { getStorage } from '@/storage/storage';
import { listPosition4User } from '@/apis/map';

const amap = useAmap({ container: 'map-container' }, true);
const router = useRouter();
const route = useRoute();
const userInfo = getStorage('userInfo') || {};
const dropdownMenuRef = ref(); // 下拉菜单Ref
const refreshListRef = ref(); // 列表Ref

// 查询参数
const reqParams = ref({
  userId: '',
  userName: '',
  users: [],
  signDate: '',
  examIds: [],
});

/**
 * 标注
 */
const markData = ref([]);
const extData = ref({} as any);

// 标注点击事件
const markClickFn = async (val) => {
  extData.value = val.target.getExtData() || {};
};
// 获取拜访路径标注
const onSearch = async () => {
  const { data } = await listPosition4User({
    ...reqParams.value,
  });
  markData.value = data?.positionList || [];
  amap.getInstance().clearMap();
  amap.addPolyline({ path: markData.value.map((e) => [e.adrrLng, e.adrrLat]), showDir: true });
  markData.value.forEach((e, index) => {
    if (index === 0) {
      amap.getInstance().setCenter([e.adrrLng, e.adrrLat]);
    }
    amap.addMarker(
      {
        position: [e.adrrLng, e.adrrLat],
        icon: curPosition,
        label: (index + 1).toString(),
        extData: e,
      },
      markClickFn
    );
  });
};

// 取消
const onCancel = () => {
  dropdownMenuRef.value.close();
};
// 提交
const onSubmit = () => {
  onSearch();
  dropdownMenuRef.value.close();
};

onMounted(() => {
  if (!userInfo.isManager) {
    reqParams.value.userId = userInfo.userId;
    reqParams.value.userName = userInfo.userName;
    reqParams.value.users = [
      {
        userId: userInfo.userId,
        userName: userInfo.userName,
      },
    ];
  }
  amap.ensureMapReady(() => {
    // onSearch();
  });
});
</script>

<style lang="less" scoped>
#map-container {
  width: 100%;
  height: calc(100vh - 365px);
}
</style>
