<template>
  <!-- <dadp-location :modelValue="true" id="map-container" @confirm="confirmAddress"></dadp-location> -->
  <div id="map-container"></div>
  <van-form class="gform" @submit="onSubmit">
    <dadp-card>
      <van-field
        v-model="editForm.signAddr"
        label="地址"
        type="textarea"
        rows="1"
        autosize
        right-icon="location-o"
        input-align="right"
        error-message-align="right"
        placeholder="点击获取地址"
        readonly
        required
        :rules="[{ required: true, message: '请重新定位' }]"
        @click-right-icon="getLocation"
      ></van-field>
      <dadpSelect
        v-model="editForm.signType"
        :options="getCombo('signType')"
        label="签到备注"
        input-align="right"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择签到备注' }]"
      ></dadpSelect>
    </dadp-card>
    <dadp-card>
      <dadp-file label="签到照片" :moduleId="'T_PCM_USER_SIGN'" :business-id="editForm.userSignId" capture="camera"></dadp-file>
    </dadp-card>
    <van-popup v-model:show="isShow" closeable style="height: 100px; width: 250px; text-align: center; border-radius: 10px">
      <div class="success-box">
        <span>
          <van-image style="width: 20px; height: 20px; vertical-align: middle" :src="signSuccess"></van-image>
          签到成功
        </span>
        <br />
        <br />
        <span>签到时间： {{ signTime }}</span>
      </div>
    </van-popup>
    <van-button type="primary" size="large" round native-type="submit" class="clock-bubble">
      <span>签到</span>
      <br />
      {{ nowTime }}
    </van-button>
    <div class="bottom-text">
      <span>{{ signTimes == '0' ? `今日未签到` : `今日签到` + signTimes + `次` }}</span>
    </div>
  </van-form>
</template>
<script lang="ts" setup>
import dadpCard from '@/components/dadp-ui/dadp-card.vue';
import dadpSelect from '@/components/dadp-ui/dadp-select.vue';
import dadpFile from '@/components/dadp-ui/dadp-file.vue';
import { showToast } from 'vant';
import { getCombo } from '@/hook/code-hook';
import useAmap from '@/hook/use-amap-hook';
import { userSign, getUserSignList } from '@/apis/home';
import { fmtDate } from '@/utils/format';
import { getStorage } from '@/storage/storage';
import { getFileBizId } from '@/apis/common';
import { resetFields } from '@/utils/global';
import signSuccess from '@/assets/images/common/signSuccess.png';
const userInfo = getStorage('userInfo');
const amap = useAmap({ container: 'map-container' }, true);
const editForm = ref({} as any);
const isShow = ref(false);
const onSubmit = async () => {
  let signDate = fmtDate(new Date(), 'yyyy-MM-dd').toString() + ' ' + nowTime.value;
  signTime.value = signDate;
  const res = await userSign({
    ...editForm.value,
    signDate: signDate,
    adrrLng: location.value[0],
    adrrLat: location.value[1],
  });
  if (res.code == 200) {
    isShow.value = true;
    getSignTime();
    resetFields(editForm.value);
    initFileId();
  } else {
    showToast('签到失败');
  }
};
const getSignTime = async () => {
  let signDate = fmtDate(new Date(), 'yyyy-MM-dd') + ' 00:00:00';
  const res = await getUserSignList({
    pageNo: 1,
    pageSize: 10,
    userId: userInfo.userId,
    signDateStart: signDate,
  });
  if (res.code == 200) {
    signTimes.value = res.data.total;
  }
};
const nowTime = ref('');
const timerId = ref(null);
const location = ref([]);
const pois = ref([]);
const check = ref();
const signTime = ref('');
const signTimes = ref('0');
const getNowTime = () => {
  let date = new Date();
  nowTime.value =
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0') +
    ':' +
    date.getSeconds().toString().padStart(2, '0');
};
// 定时器实时获取时间
const openTime = () => {
  timerId.value = setInterval(() => {
    getNowTime();
  }, 1000);
};
const getLocation = () => {
  if (navigator.userAgent.indexOf('wxwork') !== -1 || navigator.userAgent.indexOf('WXWork') !== -1) {
    // 企业微信
    (window as any).$qywx.getLocation((res) => {
      if (res?.errMsg === 'getLocation:ok' && !res.errmsg) {
        location.value = [res.longitude, res.latitude];
        initDefault(location.value);
      } else {
        console.log('定位失败 :>> ', res);
        showToast('定位失败');
      }
    });
  } else {
    // PC浏览器模拟
    amap.getPosition((position: [number, number]) => {
      location.value = position;
      initDefault(location.value);
    });
  }
  // amap.confirmAddress()
};
// 构造默认地址及默认坐标
const initDefault = (_location) => {
  amap.getAddress(_location, (address) => {
    pois.value.push({
      id: 'default',
      name: '',
      location: {
        lng: _location[0],
        lat: _location[1],
      },
      address: address,
    });
    check.value = 'default';
    editForm.value.signAddr = address;
    amap.addInfoWindow(
      `<div style="background:#fff;padding:2vw;border-radius:2vw;width:50vw;"><strong>当前定位地址</strong>：<br/><span style="color:#666">${address}</span></div>`,
      _location
    );
    amap.addMarker({ position: _location });
    setTimeout(() => {
      amap.getInstance().setCenter(_location);
    }, 1000);
  });
};
// 初始化附件ID
const initFileId = async () => {
  const { data, code } = await getFileBizId();
  if (code == 200 && !!data) {
    editForm.value.userSignId = data;
  } else {
    initFileId();
  }
};
onMounted(() => {
  openTime();
  amap.ensureMapReady(() => {
    getLocation();
  });
  getSignTime();
  initFileId();
});
onBeforeMount(() => {
  clearInterval(timerId.value);
});
</script>
<style lang="less" scoped>
#map-container {
  width: 100%;
  height: 20vh;
}
.clock-bubble {
  width: 300px;
  height: 300px;
  background: linear-gradient(90deg, #fcc824 0%, #ff8812 100%);
  box-shadow: 0px 0px 20px 0px rgba(253, 236, 219, 0.18);
  border: 10px solid #fdecdb;
  text-align: center;
  position: absolute;
  bottom: 120px;
  left: calc(50% - 150px);
  border-radius: 50%;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 120px);
  // padding-top: 110px;
}
.bottom-text {
  text-align: center;
  position: absolute;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 100px);
  width: 100%;
  color: @gray;
}
.remind-text {
  font-family: PingFangSC-Regular;
  font-size: @font-size-24;
  color: @gray;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: 400;
  text-align: center;
  text-wrap: wrap;
  span {
    color: @white;
    font-size: @font-size-32;
  }
}
.success-box {
  margin-top: 30px;
}
</style>
