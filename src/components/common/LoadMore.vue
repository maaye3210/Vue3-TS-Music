<template>
  <div class="flex justify-center py-6">
    <span v-if="!loading">
      <span v-if="!loadAll" class="text-sm text-center hover-text" @click="onloadMore()">加载更多</span>
      <span v-else class="text-sm text-center cursor-pointer">已加载全部</span>
    </span>
      <IconPark v-else class="fa faa-spin animated faa-slow" :icon="LoadingOne" />
  </div>
</template>
<script setup lang="ts">
import { LoadingOne } from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import 'font-awesome-animation';
const props = withDefaults(defineProps<{
  onloadMore?: Function;
  loadAll?: boolean;
  loading?: boolean;
}>(), {
  onloadMore: function(){},
  loadAll: false,
  loading: false
})
</script>