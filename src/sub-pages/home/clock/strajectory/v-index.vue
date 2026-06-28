<template>
  <van-search v-model="reqParams.userName" shape="round" show-action disabled placeholder="点击右侧图标打开筛选">
    <template #action>
      <!-- <van-dropdown-menu ref="dropdownMenuRef">
        <van-dropdown-item> -->
      <div class="filter-action" @click="isShow = !isShow"><van-image class="filter-icon" :src="filter" /></div>

      <van-popup v-model:show="isShow" position="top">
        <template #title></template>
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
              v-model="reqParams.signDateStart"
              label="开始日期"
              input-align="right"
              placeholder="请选择日期"
              clearable
              required
              :minDate="reqParams.signDateEnd ? new Date(new Date(reqParams.signDateEnd).getTime() - 7 * 24 * 60 * 60 * 1000) : undefined"
              :maxDate="reqParams.signDateEnd ? new Date(reqParams.signDateEnd) : undefined"
              :rules="[{ required: true, message: '请选择开始日期' }]"
            />
            <dadp-date
              v-model="reqParams.signDateEnd"
              label="结束日期"
              input-align="right"
              placeholder="请选择日期"
              clearable
              required
              :minDate="reqParams.signDateStart ? new Date(reqParams.signDateStart) : undefined"
              :maxDate="
                reqParams.signDateStart ? new Date(new Date(reqParams.signDateStart).getTime() + 7 * 24 * 60 * 60 * 1000) : undefined
              "
              :rules="[{ required: true, message: '请选择结束日期' }]"
            />
          </van-cell-group>
          <div class="gform-footer">
            <van-button size="large" round plain @click="onCancel">取消</van-button>
            <van-button type="primary" size="large" round native-type="submit">确认</van-button>
          </div>
        </van-form>
      </van-popup>
      <!-- </van-dropdown-item>
      </van-dropdown-menu> -->
    </template>
  </van-search>
  <div id="map-container"></div>
</template>
<script lang="ts" setup>
import useAmap from '@/hook/use-amap-hook';
import { getUserSignTrack } from '@/apis/home';
import faceIcon from '@/assets/images/map/faceIcon.png';
import signIcon from '@/assets/images/map/signIcon.png';
import { getStorage } from '@/storage/storage';
import filter from '@/assets/images/common/filter.png';
import dadpDate from '@/components/dadp-ui/dadp-date.vue';
import busiUser from '@/components/business/busi-user.vue';
import { fmtDate } from '@/utils/format';
import { customTheme } from '@/components/charts/charts-hook';

const userInfo = getStorage('userInfo') || {};

const amap = useAmap({ container: 'map-container' }, true);
const reqParams = ref({
  userId: '',
  userName: '',
  users: [],
  signDateEnd: '',
  signDateStart: '',
  examIds: [],
});
const markData = ref([]);
const extData = ref({} as any);
const isShow = ref(false);
// 取消
const onCancel = () => {
  isShow.value = false;
};
// 提交
const onSubmit = () => {
  isShow.value = false;
  onSearch();
};
// 标注点击事件
const markClickFn = async (val) => {
  extData.value = val.target.getExtData() || {};
};
// 获取拜访路径标注
const onSearch = async () => {
  let param = {
    ...reqParams.value,
  };
  param.signDateEnd = param.signDateEnd ? param.signDateEnd + ' 23:59:59' : '';
  param.signDateStart = param.signDateStart ? param.signDateStart + ' 00:00:00' : '';
  const { data } = await getUserSignTrack(param);
  // 加是否面访标识
  data?.userSignTrackList.forEach((item: any) => {
    item.isFace = false;
  });
  data?.faceSignTrackList.forEach((item: any) => {
    item.isFace = true;
  });
  let positionList = data.faceSignTrackList.concat(data.userSignTrackList);
  markData.value = data?.userSignTrackList || [];
  markData.value = markData.value.concat(data?.faceSignTrackList || []);
  amap.getInstance().clearMap();
  // 对数据按时间排序
  positionList.sort((a: any, b: any) => Date.parse(a.signDate) - Date.parse(b.signDate));
  // 对返回的数据按日期分组
  positionList.forEach((item: any) => {
    item.date = fmtDate(item.signDate, 'yyyyMMdd');
  });
  const guiji = positionList.reduce((acc: any, item: any) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  Object.keys(guiji).forEach((key: any, index: any) => {
    amap.addPolyline({ path: guiji[key].map((e) => [e.adrrLng, e.adrrLat]), showDir: true, strokeColor: customTheme.color[index] });
  });
  // 绘制点
  markData.value.forEach((e, index) => {
    if (index === 0) {
      amap.getInstance().setCenter([e.adrrLng, e.adrrLat]);
    }
    amap.addMarker(
      {
        position: [e.adrrLng, e.adrrLat],
        icon: e.isFace ? faceIcon : signIcon,
        extData: e,
        label: (index + 1).toString(),
      },
      markClickFn
    );
  });
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
    // getLocation();
    // 获取到签到点后画线
    amap.addPolyline({});
  });
});
</script>
<style lang="less" scoped>
#map-container {
  width: 100%;
  height: 100vh;
}
.van-overlay {
  background: transparent;
}
.van-popup--top {
  top: 180px;
}
</style>
