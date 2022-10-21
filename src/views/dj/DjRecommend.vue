<template>
<div v-if="todaydj.length>0"  class="overflow-hidden rounded-lg  xl:w-128 sm:w-112 h-44 relative">
  <div 
  class="w-full h-full blur-lg flex bg-center" 
  :style="{ backgroundImage: 'url(' + todaydj[programIndex].picUrl + ')'}"
  style="transform: scale(1.3)">
  </div>
  <div class="absolute inset-0 bg-gray-900 bg-opacity-20"></div>
  <div class="absolute inset-0 flex ">  
    <div>
      <djCover class="w-32 h-32 rounded-lg m-6"  
      :picUrl="todaydj[programIndex].picUrl" 
      :name="todaydj[programIndex].name" 
      :id="todaydj[programIndex].id" 
      :onPlay="playDjProgram"></djCover>
    </div>
    <div class="m-2 flex-1">
      <div class="mt-4 ">
        <span class="bg-opacity-40 p-1 bg-gray-700 rounded text-xs text-white text-opacity-50">
        个性电台
      </span>
      </div>
      <div class="text-white my-3 truncate w-11/12 h-6">{{todaydj[programIndex].lastProgramName}}</div>
      <div class="text-white my-1 text-xs text-opacity-50">{{todaydj[programIndex].name}}</div>
      <div class="text-white flex items-center gap-x-3 mt-4">
        <icon-park :icon="GoEnd" class="mr-1 hover:text-teal-400" :size="20" @click="next"></icon-park>
        <icon-park :icon="Like" class="mr-1 hover:text-teal-400" :size="20"></icon-park>
        <icon-park :icon="Unlike" class="mr-1 hover:text-teal-400" :size="20"></icon-park>
        <icon-park :icon="Comment" class="mr-1 hover:text-teal-400" :size="20"></icon-park>
        <span class="text-xs flex hover:text-teal-400">换一个
          <icon-park :icon="Refresh" class="ml-1" :size="16" @click="nextSong"></icon-park>
        </span>
      </div>
      </div>
  </div>
</div>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { djRadios, todayPerferedDj } from "@/models/dj";
import { userdjRecommend, userTodayPerferedDj } from "@/utils/api";
import { GoEnd, Like, Unlike , Comment, Refresh} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import djCover from '@/views/dj/djCover.vue';
import { usePlayerStore } from '@/stores/player';

const programIndex=ref(0)
const programSum=ref(0)
const programID=ref(0)
const todaydj = ref<todayPerferedDj[]>([])
const { playDjProgram, next }=usePlayerStore()
onMounted(async ()=>{
  await getUserTodayPerferedDj()
  })
  
  async function getUserTodayPerferedDj() {
    // 推荐电台列表
    todaydj.value = await userTodayPerferedDj()
    programSum.value = todaydj.value.length
    programID.value = todaydj.value[programIndex.value].id
    // 第一个推荐电台节目列表
    // 立刻获得列表数组第一个的歌曲信息,展示在首页
  }
  async function nextSong() {
    programIndex.value < programSum.value - 1 ? programIndex.value++ : programIndex.value = 0
    programID.value=todaydj.value[programIndex.value].id
    // await playProgram()
  }
</script>