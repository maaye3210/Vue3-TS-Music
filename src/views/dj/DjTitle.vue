<template>
<!-- 标题组件，应该还有一个点击跳转对应详情页功能 -->
  <div class="text-xl py-3 mt-2 flex items-center">
    <div class="flex-none">{{ title }}</div>
    <div class="flex-grow "></div>
    <div class="flex-none cursor-pointer" v-on:click="handleClick">{{linkName?linkName:"更多"}}</div>
    <IconPark :icon="Right" size="25" :stroke-width="2"/>
  </div>
</template>

<script setup lang="ts">
import {Right} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import {useRouter} from "vue-router";

const props = defineProps<{
  title: string
  linkTo?: string
  linkName?: string
}>()
const router=useRouter()
function handleClick (){
  router.push({name: props.linkTo?props.linkTo:'alldj'})
}


</script>

<style lang="scss">

</style>
