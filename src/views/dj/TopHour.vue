<template>
<DjTitle title="24 小时节目榜" linkTo="toplist" linkName="全部榜单"></DjTitle>
<div class="gap-5 grid grid-rows-2 grid-cols-4 md:grid-cols-4 2xl:grid-cols-6 overflow-hidden">
  <div v-for="djInfo in topList" :key="djInfo.program.id" class="item-1">
  <djCover :picUrl="djInfo.program.coverUrl" :name="djInfo.program.name" :id="djInfo.program.mainTrackId" :programid="djInfo.program.id" :onPlay="handerPlay"></djCover>
    <div class="mt-2 text-xs text-main  leading-5 ">{{ djInfo.program.name }}</div>
  </div>
</div>
</template>

<script setup lang="ts">
import DjTitle from "@/views/dj/DjTitle.vue";
import djCover from "@/views/dj/djCover.vue";
import { onMounted ,ref,toRefs} from "vue";
import { djToplist } from "@/utils/api";
import type { djHourTopList } from "@/models/dj";
import { usePlayerStore } from '@/stores/player';
const {  play, playDj }=usePlayerStore()
const { djPlaying }=toRefs(usePlayerStore())
const topList=ref([] as djHourTopList[])
onMounted(async ()=>{
  topList.value = await djToplist(12)
  })
  const handerPlay=(id:number)=>{
    playDj(id)
  }
</script>