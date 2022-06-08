<template>
<div class="artist-detail px-10 py-5" v-if="djInfo">
  <Info :djDetail="djInfo"></Info>
  <dj-program-list :Programs="programs" :djDetail="djInfo" :loadAll="loadAll" v-on:getMore="getMore" ></dj-program-list>
  
</div>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import { useDjDetail, djProgram } from "@/utils/api";
import Info from "@/views/dj/djDetail/Info.vue";
import DjProgramList from "@/views/dj/djDetail/djProgramList.vue";
import type {DjInfo, RecommendDjProgram} from "@/models/dj";
import {usePlayerStore} from "@/stores/player";

const route = useRoute()
const djInfo = ref({} as DjInfo)
const programs = ref<RecommendDjProgram[]>([])
const page = ref(0)
const id:number = Number(route.query.id)
const loadAll = ref(false)

const getInfo =async() => {
  djInfo.value = await useDjDetail(id)
  programs.value = await djProgram(id, 20*page.value, 20)
  page.value++
  if (programs.value.length<20) {
    loadAll.value = true
  }
}
const getMore = async()=>{
  console.log('ok');
  
  const res = await djProgram(id, 20*page.value, 20)
  if (res.length < 20) {
    loadAll.value = true
  }
  programs.value.push(...res)
  page.value++
}
onMounted(getInfo)
</script>