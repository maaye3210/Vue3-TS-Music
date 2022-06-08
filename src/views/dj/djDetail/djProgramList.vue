<template>
  <el-tabs v-model="tab" class="demo-tabs py-5" >
    <el-tab-pane :label="`歌曲${djDetail.programCount}`" name="songs">
      <div class="flex text-xs leading-3 text-gray-400 py-2">
      <div class="flex-auto flex">
        歌曲
      </div>
      <div class="w-1/3">歌手</div>
      <div class="w-20">时长</div>
    </div>
      <div v-for="program in Programs" >

        <dj-program-one :program="program"></dj-program-one>
      </div>
      <div class="text-sm text-center">
        <span v-if="!loadAll" class=" hover-text" @click="$emit('getMore')">加载更多</span>
        <span v-else class="text-sm text-center  cursor-pointer">已加载全部</span>
      </div>
    </el-tab-pane>
    <el-tab-pane label="专辑信息" name="info">
      <dj-album-info :djDetail="djDetail"></dj-album-info>
    </el-tab-pane>
    <el-tab-pane label="评论" name="comment">
      <dj-comment :djDetail="djDetail"></dj-comment>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import type {DjInfo, RecommendDjProgram} from "@/models/dj";
import {ref,} from 'vue';
import djProgramOne from '@/views/dj/djDetail/djProgramOne.vue';
import djAlbumInfo from '@/views/dj/djDetail/djAlbumInfo.vue';
import djComment from '@/views/dj/djDetail/djComment.vue';

defineProps<{
  Programs:RecommendDjProgram[]
  djDetail:DjInfo
  loadAll:boolean
}>()

defineEmits<{
  getMore:() => void
}>()
  
const tab = ref('songs')


</script>