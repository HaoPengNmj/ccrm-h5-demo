<!--
 * @desc: 树节点
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-14 14:29:53
-->
<template>
  <van-collapse-item :name="nodeData.id" :isLink="nodeData.children && nodeData.children.length ? true : false" :border="false">
    <template #title>
      <div class="tree-nodes-item">
        <van-checkbox
          v-if="!nodeData.disabled"
          :model-value="checkIds.includes(nodeData.id)"
          icon-size="0.35rem"
          :shape="multiple ? 'square' : 'round'"
          @click.stop="checkClickFn"
        ></van-checkbox>
        <span class="name" v-if="filterText && nodeData.name.indexOf(filterText) > -1">
          <span>{{ nodeData.name.substring(0, nodeData.name.indexOf(filterText)) }}</span>
          <span class="highlight">{{ filterText }}</span>
          <span>{{ nodeData.name.substring(nodeData.name.indexOf(filterText) + filterText.length) }}</span>
        </span>
        <span class="name" v-else>{{ nodeData.name }}</span>
      </div>
    </template>
    <!-- 子节点 -->
    <template v-if="nodeData.children && nodeData.children.length">
      <van-collapse v-model="collapseModel" :border="false" accordion>
        <dadp-tree-node
          v-for="(item, index) in nodeData.children"
          :key="index"
          :node-data="item"
          :checkIds="checkIds"
          :filterText="filterText"
          :multiple="multiple"
          @setChecked="setChecked"
        ></dadp-tree-node>
      </van-collapse>
    </template>
  </van-collapse-item>
</template>
<script lang="ts" setup>
const props = defineProps({
  // 当前节点数据
  nodeData: {
    type: Object as PropType<TreeType.nodeTreeItem>,
    default: () => {},
  },
  // 当前选中节点
  checkIds: {
    type: Array<string>,
    default: () => [],
  },
  // 筛选文本
  filterText: {
    type: String,
    default: '',
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['setChecked']);

// 展开项数组
const collapseModel = ref('');
watchEffect(() => (collapseModel.value = props.nodeData.children?.find((x: any) => x.open)?.id || ''));

//设置当前节点
const setChecked = (nodeId: string) => {
  emits('setChecked', nodeId);
};

// 点击当前节点checkbox
const checkClickFn = () => {
  if (!props.nodeData.disabled) setChecked(props.nodeData.id);
};
</script>

<style lang="less" scoped>
.tree-nodes-item {
  display: flex;
  align-items: center;
  .van-checkbox {
    flex: none;
  }
  .name {
    margin-left: 16px;
  }
}
// 取消上下间距，避免无子节点的时候展示空白
:deep(.van-collapse-item__content) {
  padding: 0 0 0 24px;
}
.highlight {
  color: @primary-color;
}
</style>
