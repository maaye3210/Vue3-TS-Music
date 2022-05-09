<template>
<DjBanner :banners="djBanners"></DjBanner>
<ListHot :tags="djCatelists" @cat-change="catChange"/>
<div class="py-5 text-xl ">{{currentPage.currentName}}电台</div>
<div class="gap-5  grid grid-flow-row grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5">
<div v-for="djInfo in currentPage.djInfoList" :key="djInfo.id" class="item-1">
      <CoverPlay :name="djInfo.name" :pic-url="djInfo.picUrl" :play-count="djInfo.playCount" show-play-count/>
      <div class="mt-2 text-xs text-main  leading-5 ">{{ djInfo.name }}</div>
      <!-- <div class="mt-2 text-xs text-main  truncate text-dc">{{ djInfo.creator.nickname }}</div> -->
    </div>
</div>
</template>
<script setup lang="ts">
import { onMounted ,toRefs,reactive} from "vue";
import { useDJStore } from "@/stores/dj";
import { useUserStore } from "@/stores/user";
import ListHot from '@/components/common/ListHot.vue';
import CoverPlay from '@/components/common/CoverPlay.vue';
import {useRouter} from "vue-router";
import type { CurrentPage } from "@/models/dj";
import { djByType} from "@/utils/api";
import DjBanner from "@/views/dj/DjBanner.vue";
const router= useRouter
const {uid} = useUserStore()
const {}=useDJStore()
const {djCatelists,djBanners}=toRefs(useDJStore())
const {getDjCatelists,getDjBanner,getDjByType}=useDJStore()
const currentPage=reactive({} as CurrentPage)
onMounted(async ()=>{
  await getDjBanner()
  await getDjCatelists()
  currentPage.currentName= djCatelists.value[0].name
  currentPage.currentId= djCatelists.value[0].id
  await catChange({id:currentPage.currentId,name:currentPage.currentName})
  })
  async function catChange(cat:{id:number,name:string}) {
    console.log('cat',cat,currentPage);
    currentPage.djInfoList= await djByType(cat.id)
    console.log(currentPage)
  }
  // onMounted(async ()=>await getDjBanner())
</script>