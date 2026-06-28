<!--
 * @desc: 根据UI样式设计的通用卡片
 * @Date: 2024-09-19 10:41:20
 * @LastEditTime: 2024-10-16 16:39:17
-->
<template>
  <div class="dadp-card">
    <div v-if="status" class="status" :class="`status--${statusColor}`">
      <span>{{ status }}</span>
    </div>
    <div
      v-if="avatar || $slots.title || title || $slots.subTitle || subTitle || isArrow || $slots['header-right']"
      class="header"
      :class="{ 'header--status': !!status }"
      :style="isBodyPadding ? 'padding-bottom:0px' : ''"
    >
      <div class="header-left">
        <van-image v-if="avatar" class="avatar" :src="avatarMap[avatar] || avatar" />
        <div class="box">
          <div class="title">
            <slot name="title">
              <van-text-ellipsis class="title" v-if="ellipsis" :content="title" />
              <span v-else>{{ title }}</span>
            </slot>
          </div>
          <div v-if="subTitle || $slots.subTitle" class="sub-title">
            <slot name="subTitle">{{ subTitle }}</slot>
          </div>
        </div>
      </div>
      <div class="header-right">
        <slot name="header-right">
          <van-icon v-if="isArrow" class="arrow" name="arrow" @click.stop="arrowClickFn" />
        </slot>
      </div>
    </div>
    <div class="body" :class="{ 'body--padding': isBodyPadding }">
      <slot></slot>
    </div>
    <div class="footer" v-if="buttons.length > 0">
      <van-button
        v-for="(item, index) in buttons"
        :key="index"
        :icon="item.icon"
        class="footer-button"
        :type="!item.disabled ? 'primary' : ''"
        size="small"
        plain
        :disabled="item.disabled"
        @click.stop="footerClickFn(item)"
      >
        <!-- <template #icon v-if="item.icon">
          <van-image class="button-icon" :src="item.icon"></van-image>
        </template> -->
        {{ item.name }}
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import taskIcon from '@/assets/images/common/card-tsak.png';
import teamIcon from '@/assets/images/common/card-team.png';
import dateIcon from '@/assets/images/common/card-date.png';
import manIcon from '@/assets/images/common/card-man.png';
import womanIcon from '@/assets/images/common/card-woman.png';
import entIcon from '@/assets/images/common/card-ent.png';

const props = defineProps({
  /**
   * 状态文本
   * 悬浮于卡片右上角的通用状态样式，默认不显示。传值作为文本直接显示，为空则不显示
   */
  status: {
    type: String,
    default: '',
  },
  /**
   * 状态文本颜色
   * 前置条件：status有值
   * 默认orange，可选red、blue、gray
   */
  statusColor: {
    type: String,
    default: 'orange',
  },
  /**
   * 头像URL
   * 位于卡片头部左侧的默认图像，默认不显示。
   * 提供多种默认图片：task、team、date、man、woman、ent，也可以传自定义图片URL，为空则不显示
   */
  avatar: {
    type: String,
    default: '',
  },
  /**
   * 标题
   * 卡片标题，可以直接传参作为文本显示，也可以通过title插槽进行样式定制。
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 标题是否缩略展示，默认缩略
   * 前置条件：title有值
   */
  ellipsis: {
    type: Boolean,
    default: false,
  },
  /**
   * 次级标题
   * 次级标题，位于标题正下方，可以直接传参作为文本显示，也可以通过subTitle插槽进行样式定制。
   */
  subTitle: {
    type: String,
    default: '',
  },
  /**
   * 是否开启箭头图标
   * 位于卡片头部右侧的箭头图标，根据传值控制显隐，默认不显示。
   */
  isArrow: {
    type: Boolean,
    default: false,
  },
  /**
   * body是否默认padding填充
   * 默认填充padding: 0px 30px 32px;
   */
  isBodyPadding: {
    type: Boolean,
    default: false,
  },
  /**
   * 底部按钮组
   * 底部按钮组，默认不显示。
   */
  buttons: {
    type: Array<any>,
    default: () => [],
  },
});

// 默认图标：根据props的avatar值，选择对应的图标
const avatarMap = {
  task: taskIcon,
  team: teamIcon,
  date: dateIcon,
  man: manIcon,
  woman: womanIcon,
  ent: entIcon,
} as any;

// 声明可接收的自定义事件
const emits = defineEmits(['arrow-click', 'footer-click']);
// 卡片头部右侧箭头图标点击事件
const arrowClickFn = () => {
  emits('arrow-click');
};
// 卡片底部点击事件
const footerClickFn = (item: any) => {
  emits('footer-click', item);
};
</script>

<style lang="less" scoped>
.dadp-card {
  position: relative;
  width: 100%;
  background: @white;
  border-radius: 16px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.08);

  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      .avatar {
        height: 80px;
        width: 80px;
        margin-right: 24px;
      }
      .box {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-family: PingFangSC-Medium;
          font-size: @font-size-32;
          letter-spacing: 0;
          font-weight: bold;
          word-break: break-all;
        }
        .sub-title {
          font-family: PingFangSC-Regular;
          font-size: @font-size-24;
          color: @gray;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 400;
          margin-top: 16px;
        }
      }
    }
    &-right {
      .arrow {
        margin-left: 10px;
      }
    }
    &--status {
      padding-top: 50px;
    }
  }
  .body {
    &--padding {
      padding: 32px 30px 32px;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid @gray-3;
    margin: 0px 30px;
    padding: 15px 0;
    .button-icon {
      height: 28px;
      width: 28px;
      margin-right: 8px;
    }
    &-button {
      border: none;
    }
  }

  // 位于卡片右上角的状态栏样式
  // 提供orange、blue、red、gray四种样式
  .status {
    position: absolute;
    right: 0;
    top: 0;
    background: @orange-light;
    border-radius: 0px 20px 0px 30px;
    padding: 10px 12px 10px 20px;
    span {
      font-family: PingFangSC-Regular;
      font-size: @font-size-24;
      color: @orange;
      letter-spacing: 0;
      text-align: center;
      line-height: 28px;
      font-weight: 400;
    }
    &--orange {
      background: @orange-light;
      span {
        color: @orange;
      }
    }
    &--blue {
      background: @blue-light;
      span {
        color: @blue;
      }
    }
    &--red {
      background: @red-light;
      span {
        color: @red;
      }
    }
    &--gray {
      background: @gray-light;
      span {
        color: @gray;
      }
    }
  }
  & + .dadp-card {
    margin-top: 24px;
  }
}
</style>
