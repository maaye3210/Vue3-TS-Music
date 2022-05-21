<template>
<div v-if="recommendDj.length>0"  class="overflow-hidden rounded-lg  xl:w-1/3 w-96 h-44 relative">
  <div 
  class="w-full h-full  blur-lg flex bg-center" 
  :style="{ backgroundImage: 'url(' + recommendDj[programIndex].picUrl + ')'}"
  style="transform: scale(1.3)">
  </div>
  <div class="absolute inset-0 bg-gray-500 bg-opacity-10"></div>
  <div class="absolute inset-0 flex ">  
    <div>
      <djCover class="w-32 h-32 rounded-lg m-6"  
      :picUrl="recommendDj[programIndex].picUrl" 
      :name="recommendDj[programIndex].name" 
      :id="recommendDj[programIndex].id" 
      :onPlay="playDjProgram"></djCover>
    </div>
    <div class="m-2 flex-1 ">
      <div class="mt-4 ">
        <span class="bg-opacity-40 p-1 bg-gray-700 rounded text-xs text-white text-opacity-50">
        个性电台
      </span>
      </div>
      <div class="text-white my-3">{{recommendDj[programIndex].name}}</div>
      <div class="text-white my-1 text-xs text-opacity-50">{{recommendDj[programIndex].dj.nickname}}</div>
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
import type { djRadios } from "@/models/dj";
import { userdjRecommend } from "@/utils/api";
import { GoEnd, Like, Unlike , Comment, Refresh} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import djCover from '@/views/dj/djCover.vue';
import { usePlayerStore } from '@/stores/player';

const recommendDj=ref<djRadios[]>([])
const programIndex=ref(0)
const programSum=ref(0)
const name=ref('')
const programID=ref(0)
const { playDjProgram, next }=usePlayerStore()
onMounted(async ()=>{
  await getRecommendList()
  })
  async function getRecommendList() {
    // 推荐电台列表
    const res = await userdjRecommend()
    recommendDj.value = res.djRadios
    programSum.value=recommendDj.value.length
    name.value=res.name
    programID.value=res.djRadios[programIndex.value].id
    // 第一个推荐电台节目列表
    // 立刻获得列表数组第一个的歌曲信息,展示在首页
  }
  async function nextSong() {
    programIndex.value<programSum.value-1?programIndex.value++:programIndex.value=0
    programID.value=recommendDj.value[programIndex.value].id
    // await playProgram()
  }
</script>