<template>
  <div class="flex justify-end items-center  gap-x-2.5">
    <span class="text-xs">
      {{ useFormatDuring(currentTime) }} / {{ useFormatDuring(duration) }}
    </span>
    <!-- 使用IconPark图标 -->
    <IconPark :icon="TextMessage" size="18" :stroke-width="3" class="hover-text" title="歌词"/>
    <div class="flex items-center hover-text" @click="showPlayList=true">
      <IconPark :icon="MusicList" size="18" :stroke-width="3" class="hover-text" title="播放列表"/>
      <span class="text-xs">{{ playListCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入IconPark组件，作为参数传入自己二次封装的IconPark组件中
import {MusicList, TextMessage} from '@icon-park/vue-next'
import {useFormatDuring} from "@/utils/number";
import {usePlayerStore} from "@/stores/player";
import IconPark from "@/components/common/IconPark.vue";
import {storeToRefs} from "pinia";
// 从仓库中获得数据
const {currentTime, duration, playListCount, showPlayList} = storeToRefs(usePlayerStore())
</script>
