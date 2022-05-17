<template>
<DjTitle :title="props.info.name" lingkTo="" linkName="更多分类"></DjTitle>
<div class="gap-5 grid grid-rows-1 grid-cols-4 md:grid-cols-5 2xl:grid-cols-10 overflow-hidden">
  <div v-for="djInfo in currentPage.djInfoList" :key="djInfo.id" class="item-1">
    <djCover :picUrl="djInfo.picUrl" :name="djInfo.name" :id="djInfo.id" :onPlay="playDjProgram"></djCover>
    <div class="mt-2 text-xs text-main  leading-5 ">{{ djInfo.name }}</div>
  </div>
</div>
</template>

<script setup lang="ts">
import DjTitle from "@/views/dj/DjTitle.vue";
import djCover from "@/views/dj/djCover.vue";
import { onMounted ,toRefs,reactive} from "vue";
import { djByType } from "@/utils/api";
import type { CurrentPage } from "@/models/dj";
import { usePlayerStore } from '@/stores/player';
const { playDjProgram }=usePlayerStore()
const props = defineProps<{
  info: {name:string,id: number}
}>()
const currentPage=reactive({} as CurrentPage)
onMounted(async ()=>{
  currentPage.djInfoList= await djByType(props.info.id)
  })
</script>