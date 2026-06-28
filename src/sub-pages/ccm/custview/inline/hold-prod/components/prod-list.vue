<template>
  <dadp-refresh-list :requestApi="prod.apiUrl" :reqParams="queryParams">
    <template v-slot="{ data }">
      <dadp-card :title="prod.titleField ? data[prod.titleField] : ''" is-body-padding>
        <div class="grow" v-for="item in prod.fields">
          <span class="glabel">{{ item.label }}：</span>
          <span class="gvalue">{{ item.formatter ? item.formatter(data) || '--' : data[item.prop] || '--' }}</span>
        </div>
      </dadp-card>
    </template>
  </dadp-refresh-list>
</template>

<script lang="ts" setup>
import dadpRefreshList from '@/components/dadp-ui/dadp-refresh-list.vue';
import dadpCard from '@/components/dadp-ui/dadp-card.vue';

const props = defineProps({
  queryParams: {
    type: Object,
    default: () => {},
  },
  prod: {
    type: Object,
    default: () => {},
  },
});
</script>
