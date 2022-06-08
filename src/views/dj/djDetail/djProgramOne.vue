<!-- 歌曲条目 -->
<template>
  <div class="flex song-item items-center w-full hover-bg-main" :class="{'playing' : id===program.id}">
    <div class="flex-shrink-0 flex-1 flex items-center justify-between pr-5 ">

      <div class="items-center flex flex-1 w-10 flex-shrink-0">
        <IconPark v-if="isLove" :icon="Like" size="16" theme="filled" class="loved"/>
        <IconPark v-else :icon="Like" size="16" class="notlove"/>
        <div class="truncate" style="max-width: 75%;">
          <small>{{ program.name }}</small>
        </div>
      </div>
      <div class="hidden icon-action flex-shrink-0">
        <div class="flex items-center gap-x-1.5 text-gray-400 ml-2  ">
          <IconPark title="播放" :icon="PlayOne" size="20" class="hover-text" @click="playDj(program.id)" />
          <IconPark title="添加到" :icon="Add" size="16" class="hover-text"/>
          <IconPark title="下载" :icon="DownTwo" size="16" class="hover-text"/>
          <IconPark title="更多操作" :icon="MoreTwo" size="16" class="hover-text"/>
        </div>
      </div>
    </div>
    <div class="flex-shrink-0 w-1/3">
      <div class="w-9/12 truncate">
        <small class="truncate max-w-full hover-text"
               @click="router.push({name:'artistDetail',query:{id:program.mainSong.artists.first().id}})">{{program.mainSong.artists.first().name}}</small>
      </div>
    </div>
    <div class="w-20 flex-shrink-0 ">
      <div class="w-20 truncate">
        <small>{{ useFormatDuring(program.scheduledPublishTime / 1000) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Add, DownTwo, Like, MoreTwo, PlayOne, PlayTwo} from '@icon-park/vue-next'
import {useFormatDuring} from '@/utils/number'
import {usePlayerStore} from "@/stores/player";
import {useUserStore} from "@/stores/user";
import IconPark from "@/components/common/IconPark.vue";
import type {Song} from "@/models/song";
import type {RecommendDjProgram} from "@/models/dj";
import {useRouter} from "vue-router";
import {Pages} from "@/router/pages";
import {storeToRefs} from "pinia";

const props = defineProps<{
  program: RecommendDjProgram
}>()

const router = useRouter()

const {playDj} = usePlayerStore()
const {id} = storeToRefs(usePlayerStore())
const { loveIdList } = useUserStore()
let isLove = loveIdList.includes(props.program.id)
</script>

<style lang="scss" scoped>
.song-item {
  @apply py-2.5 pl-0.5;
  &:hover {
    .icon-action {
      @apply inline-block;
    }
  }
}

.playing {
  @apply bg-emerald-50 dark:bg-stone-800;
}
.loved {
  @apply text-red-400 mr-1 cursor-pointer hover:text-red-500
}
.notlove {
  @apply text-gray-500 mr-1 cursor-pointer hover:text-red-400;
}
</style>
