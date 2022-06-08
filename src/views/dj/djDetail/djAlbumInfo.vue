<template>
  <div class="flex  text-xs leading-6">
    <div class=" w-32">
      专辑
    </div>
    <div class=" text-gray-400">
      {{djDetail.name}}
    </div>
  </div>
  <div class="flex  text-xs leading-6">
    <div class=" w-32">
      歌手
    </div>
    <div class=" text-gray-400">
      {{djDetail.dj?.nickname}}
    </div>
  </div>
  <div class="flex  text-xs leading-6">
    <div class=" w-32">
      分类
    </div>
    <div class=" text-gray-400">
      {{djDetail.category}}
    </div>
  </div>
  <div class="flex  text-xs leading-6">
    <div class=" w-32">
      唱片类型
    </div>
    <div class=" text-gray-400">
      {{djDetail.secondCategory}}
    </div>
  </div>
  <div class="flex  text-xs leading-6">
    <div class=" w-32">
      专辑简介
    </div>
    <div class=" text-gray-400">
      {{djDetail.dj?.signature}}
    </div>
  </div>
</template>
<script setup lang="ts">
import type {DjInfo} from "@/models/dj";
import {ref, onMounted} from 'vue';
defineProps<{
  djDetail:DjInfo
}>()
const infos:{title:string,msg:string}[] = [
  {title:'专辑',msg:'name'},
  {title:'歌手',msg:'nickname'},
  {title:'分类',msg:'category'},
  {title:'唱片类型',msg:'secondCategory'},
  {title:'专辑简介',msg:'signature'},
]
</script>