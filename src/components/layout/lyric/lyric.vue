<template>
  <div v-show="showLyrics" class="absolute overflow-hidden z-50 w-full h-full">
    <div 
    class="w-full h-full blur-lg bg-center" 
    style="transform: scale(1.3)">
    <img :src="song.al?.picUrl" alt="" class="w-full">
    </div>
    <div class="absolute inset-0 bg-black bg-opacity-50  p-4 pb-0 flex flex-col">
      <!-- 返回 -->
      <div class="h-16 flex items-center">
        <icon-park  v-on:click="changeShowLyrics" :icon="Down" class="text-gray-100 hover:text-teal-400" :size="32"></icon-park>
      </div>
      <!-- 歌词专辑部分 -->
      <div class="flex-grow flex justify-around items-center">
        <div class="flex flex-1 justify-center">
          <img :src="song.al?.picUrl" alt="" class="rounded-lg w-96 aspect-square">
        </div>
        <div class="flex-1 text-white flex flex-col justify-center text-center mr-10">
          <p class="text-xl my-4 flex justify-center leading-4">
          {{song.name}}<icon-park  v-on:click="changeShowLyrics" :icon="Youtube" class="text-gray-100 hover:text-teal-400 ml-2" :size="18"></icon-park>
          </p>
          <p class="text-sm text-gray-400">歌手：{{song.ar?.first().name}}</p>
          <p class="text-sm text-gray-400 mb-4">专辑：{{song.al?.name}}</p>
          <el-scrollbar max-height="24rem" ref="scrollbarRef">
            <div class="h-36"></div>
            <div v-for="(lyric, index) in lyriclist" class="my-2 text-sm h-6" :class="{'text-emerald-400 text-xl h-8' : index===currentNode!.index}">
              {{ lyric }}
            </div>
            <div class="h-48"></div>
          </el-scrollbar>
        </div>
      </div>
      <PlayerSlider></PlayerSlider>
      <!-- 控制部分 -->
      <div class="h-24 flex px-5 items-center">
        <!-- 左侧 -->
        <div class="flex-1 flex gap-x-3 text-main">
          <IconPark :icon="Like" size="18" :stroke-width="3" class="text-slate-400 hover-text"/>
          <IconPark :icon="DownTwo" size="18" :stroke-width="3" class="text-slate-400 hover-text"/>
          <IconPark :icon="MoreTwo" size="18" :stroke-width="3" class="text-slate-400 hover-text"/>
          <el-badge :value="1000" :max="999" class="badge2">
            <IconPark :icon="Comment" size="18" :stroke-width="3" class="text-slate-400 hover-text"/>
          </el-badge>
          <span class="text-gray-100 text-xs ml-5">
          {{ useFormatDuring(currentTime) }} / {{ useFormatDuring(duration) }}
          </span>
        </div>
        <!-- 歌曲控制 -->
        <div class="flex-1">
          <Controller/>
        </div>
        <!-- 右侧 -->
        <div class="flex-1 flex justify-end">
          <IconPark :icon="TextMessage" size="18" :stroke-width="3" class="hover-text mx-5 text-slate-400" title="歌词"/>
          <div class=" flex items-center hover-text text-slate-400" @click="showPlayList=true">
            <IconPark :icon="MusicList" size="18" :stroke-width="3" class="hover-text " title="播放列表"/>
            <span class="text-xs">{{ playListCount }}</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>

</template>
<script setup lang="ts">
import {toRefs,ref, watch, nextTick } from 'vue';
import {useLyricStore} from '@/stores/lyric';
import {usePlayerStore} from "@/stores/player";
import {useFormatDuring} from "@/utils/number";
import {Down,Youtube,Like, DownTwo, MoreTwo, Comment,TextMessage,MusicList} from '@icon-park/vue-next'
import IconPark from '@/components/common/IconPark.vue';
import Controller from "@/components/layout/lyric/Controller.vue";
import PlayerSlider from "@/components/layout/footer/PlayerSlider.vue";
import type { ElScrollbar } from 'element-plus'

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollbarContainer = ref<Element>()
const {song, currentTime, duration, playListCount, showPlayList} = toRefs(usePlayerStore())
const {showLyrics, lyriclist, currentNode}=toRefs(useLyricStore())
const {changeShowLyrics}=useLyricStore()
// 更新歌词。设置顶部的位置
const updateLyric=(index:number)=>{
  if (scrollbarContainer.value) {
    scrollbarContainer.value.scrollTo({
      top: index*32,
      behavior: 'smooth'
    })
  }
}

watch(currentNode, newNode=>{
  updateLyric(newNode!.index)
})

watch(showLyrics, (newValue)=>{
  if (newValue) {
    nextTick().then(
        ()=>updateLyric(currentNode.value!.index)
      ).then(
        ()=>console.log(scrollbarContainer.value = scrollbarRef.value!.$el.getElementsByClassName('el-scrollbar__wrap')[0])
      )
  }
})

</script>
<style lang="scss">
.badge2 {
    .el-badge__content {
      @apply scale-90 border-none -top-2 left-1 bg-transparent text-white;
      @apply dark:bg-stone-900;
    }
  }
</style>
