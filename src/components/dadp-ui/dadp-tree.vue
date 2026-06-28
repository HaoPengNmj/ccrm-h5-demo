<!--
 * @desc: 树
 * @Date: 2024-07-12 15:06:56
 * @LastEditTime: 2024-10-14 15:19:09
-->
<template>
  <div class="dadp-tree">
    <van-collapse v-model="collapseModel" :border="false" accordion>
      <dadp-tree-node
        v-for="(item, index) in filterData"
        :key="index"
        :node-data="item"
        :checkIds="checkIds"
        :filterText="filterText"
        :multiple="multiple"
        :max="max"
        @setChecked="setChecked"
      ></dadp-tree-node>
    </van-collapse>
  </div>
</template>

<script lang="ts" setup>
import { showToast } from 'vant';
import dadpTreeNode from './dadp-tree-node.vue';
import { searchIncludeParent } from '@/utils/global';
const props = defineProps({
  // 树数据
  data: {
    type: Array<TreeType.nodeTreeItem>,
    default: () => [],
  },
  // 默认选中数组
  defaultCheckIds: {
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
  // 最大选择数量
  max: {
    type: Number,
    default: undefined,
  },
});

// 过滤数据
const filterData = computed(() => {
  return !!props.filterText ? searchIncludeParent(props.data, props.filterText) : props.data;
});

// 当前展开项
const collapseModel = ref('');
watchEffect(() => (collapseModel.value = filterData.value.find((x: any) => x.open)?.id || ''));

// 当前选中的节点ID数组
const checkIds = ref([] as string[]);
watchEffect(() => (checkIds.value = [...props.defaultCheckIds]));

// 设置选中节点,并更新原数据
const setChecked = (nodeId: string) => {
  let index = checkIds.value.findIndex((e) => e === nodeId);
  if (index === -1) {
    if (props.multiple && checkIds.value.length >= props.max) {
      showToast(`最多允许选择${props.max}个`);
      return;
    }

    if (!props.multiple) checkIds.value = []; // 如果单选且不存在目标ID，则先清空选中数组再放入
    checkIds.value.push(nodeId);
  } else checkIds.value.splice(index, 1);
};

// 获取当前选中节点ID数组
const getCheckIds = () => {
  return checkIds.value;
};
// 此函数递归遍历节点数组
const getCheckedNodes = (nodes: TreeType.nodeTreeItem[]) => {
  let deptList: TreeType.nodeTreeItem[] = [];
  nodes.forEach((node) => {
    if (checkIds.value.includes(node.id)) {
      deptList.push(node);
    }
    if (node.children && node.children.length) {
      deptList = deptList.concat(getCheckedNodes(node.children as TreeType.nodeTreeItem[]));
    }
  });
  return deptList;
};
// 获取选中节点数据
const getCheckData = () => {
  return getCheckedNodes(props.data);
};

// 暴露方法
defineExpose({ getCheckIds, getCheckData });
</script>

<style lang="less" scoped>
.dadp-tree {
  width: 100%;
  height: 100%;
}
</style>
