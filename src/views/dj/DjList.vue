<template>
<DjTitle :title="props.info.name"></DjTitle>
<div class="gap-5  grid grid-flow-row grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5">
  <div v-for="djInfo in currentPage.djInfoList" :key="djInfo.id" class="item-1">
    <CoverPlay :name="djInfo.name" :pic-url="djInfo.picUrl" :play-count="djInfo.playCount" show-play-count/>
    <div class="mt-2 text-xs text-main  leading-5 ">{{ djInfo.name }}</div>
  </div>
</div>
</template>
<script setup lang="ts">
import DjTitle from "@/views/dj/DjTitle.vue";
import { onMounted ,toRefs,reactive} from "vue";
import { djByType} from "@/utils/api";
import type { CurrentPage } from "@/models/dj";
const props = defineProps<{
  info: {name:string,id: number}
}>()
const currentPage=reactive({} as CurrentPage)
// import { useDJStore } from "@/stores/dj";
// import { useUserStore } from "@/stores/user";
// import DjList from "@/views/dj/DjList.vue";
// const {uid} = useUserStore()
// const {djCatelists,djBanners}=toRefs(useDJStore())

// const {getDjCatelists,getDjBanner}=useDJStore()

onMounted(async ()=>{
  currentPage.djInfoList= await djByType(props.info.id)
  })
</script>