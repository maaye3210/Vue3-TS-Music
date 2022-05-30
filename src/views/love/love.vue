<template>
  <div ref="like">
    我喜欢
  </div>
  <lovelist></lovelist>
</template>
<script setup lang="ts">
import {ref, onMounted,toRefs} from 'vue';
import {useUserStore} from '@/stores/user';
import lovelist from '@/views/love/lovelist.vue';

</script>