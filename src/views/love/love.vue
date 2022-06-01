<template>
  <div class="px-5">
    <div class="text-4xl font-black">
    我喜欢
  </div>
  <lovelist></lovelist>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted,toRefs} from 'vue';
import {useUserStore} from '@/stores/user';
import lovelist from '@/views/love/lovelist.vue';

</script>