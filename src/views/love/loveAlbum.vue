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
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5 2xl:grid-cols-7">
    <div v-for="(item,index) in loveAlbum" :key="index" :class="{'item-1' : index===0}">
      <CoverPlay :name="item.name" :pic-url="item.picUrl" :play-count="item.size" show-play-count/>
      <div class="mt-2 text-xs text-main truncate">{{ item.name }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, toRefs, ref} from 'vue'
import {useRouter} from "vue-router";
import {userAlbumSublist} from '@/utils/api';
import {List,Search} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import CoverPlay from '@/components//common//CoverPlay.vue'
import type { LoveAlbum } from '@/models/album';

const router = useRouter();
const loveAlbum = ref<LoveAlbum[]>([])
onMounted(async()=>{
  loveAlbum.value = await userAlbumSublist()
})


</script>
<style lang="scss" scoped>
.btn {
  @apply  text-sm rounded-sm justify-center items-center flex hover:bg-gray-200
}
</style>