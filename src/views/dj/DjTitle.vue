<template>
<!-- 标题组件，应该还有一个点击跳转对应详情页功能 -->
  <div class="text-xl py-3 mt-2 flex items-center">
    <div>{{ title }}</div>
    <IconPark :icon="Right" size="25" :stroke-width="2"/>
    <div v-on:click="handleClick">更多</div>
  </div>
</template>

<script setup lang="ts">
import {Right} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import {useRouter} from "vue-router";

defineProps<{
  title: string
}>()
const router=useRouter()
function handleClick (){
  console.log('ok');
  router.push({name: 'alldj'})
}


</script>

<style lang="scss">

</style>
