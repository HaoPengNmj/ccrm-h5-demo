<template>
  <div class="dadp-table">
    <div class="dadp-table-header">
      <div
        class="dadp-header-cell"
        v-for="(column, index) in tableColumns"
        :key="index"
        :style="{ width: column.width, textAlign: column.headerAlign || column.align }"
      >
        {{ column.title }}
      </div>
    </div>
    <div class="dadp-table-body">
      <template v-if="tableData.length !== 0">
        <div
          class="dadp-row"
          v-for="(row, rowIndex) in tableData"
          :key="rowIndex"
          :class="{ even: rowIndex % 2 !== 0, sticky: row.sticky }"
        >
          <div class="dadp-cell" v-for="(column, colIndex) in tableColumns" :key="colIndex" :style="{ width: column.width }">
            <slot :name="`cell-${column.prop}`" :row="row" :column="column" :value="row[column.prop]">
              {{ column.formatter ? column.formatter(row) : row[column.prop] }}
            </slot>
          </div>
        </div>
      </template>
      <template v-else>
        <div :colspan="tableColumns.length">
          <dadp-empty></dadp-empty>
        </div>
      </template>
    </div>

    <div class="dadp-table-footer" v-if="isMore && tableData.length !== 0" @click="footerClickFn">
      <span class="text">{{ isMoreText }}</span>
      <van-icon name="arrow-down" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dadpEmpty from './dadp-empty.vue';

const props = defineProps({
  /**
   * 表格列配置
   * 配置表格列的标题、宽度等属性，默认为空数组，不显示表格
   */
  tableColumns: {
    type: Array<any>,
    default: () => [],
  },
  /**
   * 表格数据
   * 配置表格数据，默认为空数组，不显示表格
   */
  tableData: {
    type: Array<any>,
    default: () => [],
  },
  /**
   * 是否显示展示更多，默认不展示
   */
  isMore: {
    type: Boolean,
    default: false,
  },
  isMoreText: {
    type: String,
    default: '展示更多',
  },
});

const emit = defineEmits(['footerClick']);

// 行点击事件
const rowClickFn = (row: any) => {};
// footer 点击事件
const footerClickFn = () => {
  emit('footerClick');
};
</script>

<style lang="less" scoped>
.dadp-table {
  background-color: @white;
  width: 100%;
  border-collapse: collapse;
  border-radius: 20px 20px 0px 0px;
  overflow: hidden;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dadp-header-cell {
      background: @gray-2;
      padding: 27px 20px;
      font-family: PingFangSC-Regular;
      font-size: @font-size-26;
      color: @gray;
      font-weight: 400;
      text-align: left;
      flex: auto;
    }
  }
  &-body {
    height: 50vh;
    overflow: hidden;
    overflow-y: auto;
    position: relative;

    .dadp-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: @white;
    }
    .dadp-cell {
      padding: 32px 20px;
      text-align: left;
      font-family: PingFangSC-Regular;
      font-size: @font-size-26;
      color: @text;
      font-weight: 400;
      flex: auto;
    }
    .even {
      background: @gray-2 !important;
    }
    .sticky {
      position: relative;
      position: sticky;
      overflow: hidden;
      top: 0px;
      z-index: 1;
    }
  }
  &-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 32px;
    .text {
      margin-right: 16px;
    }
  }
}
</style>
