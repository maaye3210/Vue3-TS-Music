<template>
<ListHot :tags="djCatelists" @cat-change="catChange"/>
<div class="py-5 text-xl ">{{currentPage.currentName}}电台</div>
<div class="gap-5  grid grid-flow-row grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5">
  <div v-for="djInfo in currentPage.djInfoList" :key="djInfo.id" class="item-1">
    <djCover  :picUrl="djInfo.picUrl" :name="djInfo.name" :id="djInfo.id" :onPlay="playDjProgram"  :onDetail="goDjDetail"></djCover>
    <div class="mt-2 text-xs text-main  leading-5 ">{{ djInfo.name }}</div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted,reactive} from "vue";
import { useDJStore } from "@/stores/dj";
import ListHot from '@/components/common/ListHot.vue';
import djCover from "@/views/dj/djCover.vue";
import type { CurrentPage } from "@/models/dj";
import { djByType} from "@/utils/api";
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player';
import {useRouter} from 'vue-router';

const router = useRouter()
const { playDjProgram }=usePlayerStore()
const {djCatelists}=storeToRefs(useDJStore())
const {getDjCatelists,getDjBanner}=useDJStore()
const currentPage=reactive({} as CurrentPage)
const goDjDetail = (id:number)=>{
  router.push({name:'djDetail',query:{id}})
}
onMounted(async ()=>{
  await getDjBanner()
  await getDjCatelists()
  currentPage.currentName= djCatelists.value[0].name
  currentPage.currentId= djCatelists.value[0].id
  await catChange({id:currentPage.currentId,name:currentPage.currentName})
  })
  
  async function catChange(cat:{id:number,name:string}) {
    currentPage.djInfoList= await djByType(cat.id)
  }
</script>