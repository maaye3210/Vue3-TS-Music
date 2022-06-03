<template>
<div class="flex py-5">
      
      <div class=" button-outline w-28 mr-3 ">
        <IconPark :icon="List" size="20"/>
        <div class="ml-1">批量操作</div>
      </div>
      <div class="flex-1 flex flex-row-reverse w-20 items-center">
        <div class="btn w-16 h-6 mx-1 flex">
          <IconPark :icon="Search" />
          <div >搜索</div>
        </div>
      </div>
    </div>
<div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5 2xl:grid-cols-6">
      <div v-for="(item,index) in likeplaylists" :key="index" :class="{'item-1' : index===0}"
           @click="router.push({name:'playlist',query:{id:item.id}})">
        <CoverPlay :name="item.name" :pic-url="item.coverImgUrl" :play-count="item.playCount" show-play-count/>
        <div class="mt-2 text-xs text-main truncate">{{ item.name }}</div>
      </div>
    </div>
</template>
<script setup lang="ts">
import {onMounted, toRefs} from 'vue'
import {useUserLikeStore} from '@/stores/userlike'
import {useRouter} from "vue-router";
import {List,Search} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import CoverPlay from '@/components//common//CoverPlay.vue'

const router = useRouter();
const { likeplaylists }=toRefs(useUserLikeStore())


</script>
<style lang="scss" scoped>
.btn {
  @apply  text-sm rounded-sm justify-center items-center flex hover:bg-gray-200
}
</style>