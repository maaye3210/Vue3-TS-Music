<template>
<!-- <DjBanner :banners="djBanners"></DjBanner> -->
<div class="px-5">
  <DjRecommend></DjRecommend>
  <TopHour ></TopHour>
  <DjList v-for="djCatelist in djCatelist_5" :key="djCatelist.id" :info="djCatelist"></DjList>
</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, ref } from "vue";
import { useDJStore } from "@/stores/dj";
import DjList from '@/views/dj/DjList.vue';
import TopHour from '@/views/dj/TopHour.vue';
import {useRouter} from "vue-router";
import DjRecommend from "@/views/dj/DjRecommend.vue";
import { storeToRefs } from 'pinia'
import {userDj} from '@/utils/api';

const router= useRouter
const {djCatelists,djBanners}=storeToRefs(useDJStore())
const userdj = ref({})
const todaydj = ref({})
const {getDjCatelists,getDjBanner}=useDJStore()
const djCatelist_5= computed(() => djCatelists.value.slice(0,5))

onMounted(async ()=>{
  await getDjBanner()
  await getDjCatelists()
  userdj.value = await userDj(547852215)

  })
</script>