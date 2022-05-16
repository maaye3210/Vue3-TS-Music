<template>
<!-- <DjBanner :banners="djBanners"></DjBanner> -->
<DjRecommend></DjRecommend>

<DjList v-for="djCatelist in djCatelist_5" :key="djCatelist.id" :info="djCatelist"></DjList>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { useDJStore } from "@/stores/dj";
import DjList from '@/views/dj/DjList.vue';
import {useRouter} from "vue-router";
import DjBanner from "@/views/dj/DjBanner.vue";
import DjRecommend from "@/views/dj/DjRecommend.vue";
import { storeToRefs } from 'pinia'

const router= useRouter
const {djCatelists,djBanners}=storeToRefs(useDJStore())
const {getDjCatelists,getDjBanner,getRecommendList}=useDJStore()
const djCatelist_5= computed(() => djCatelists.value.slice(0,5))

onMounted(async ()=>{
  await getDjBanner()
  await getDjCatelists()
  })
</script>