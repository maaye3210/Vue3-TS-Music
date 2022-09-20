<template>
  <el-drawer v-model="showPlayList" direction="rtl" :with-header="false" size="320px" custom-class="play-list">
    <div class="h-screen flex flex-col">
      <div class="p-2.5 flex-shrink-0">
        <div class="text-xl">播放列表</div>
        <div class="text-xs mt-1 flex justify-between items-center">
          <div>共 {{ playListCount }} 首歌曲</div>
          <div class="text-dc flex items-center hover-text" @click="clearPlayList">
            <IconPark :icon="Delete" />
            <span class="ml-0.5">清空</span>
          </div>
        </div>
      </div>
      <div class="flex-1 overflow-hidden">
        <el-scrollbar>
          <!-- dblclick双击事件 -->
          <PlayListSongItem v-for="song in playList" :key="song.id" :song="song"
            :active="(djPlaying ? song.djProgram?.id : song.id) === id" :dj-playing="djPlaying"
            @dblclick="handleClick(song)" />
          <LoadMore v-if="djPlaying" :loading="loading" :loadAll="loadAllDjPage" :onloadMore="onLoadMore" />
        </el-scrollbar>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { Delete } from "@icon-park/vue-next";
import { usePlayerStore } from "@/stores/player";
import IconPark from "@/components/common/IconPark.vue";
import PlayListSongItem from "@/components/layout/playList/PlayListSongItem.vue";
import LoadMore from '@/components/common/LoadMore.vue';
import type { Song } from "@/models/song";

const { showPlayList, playListCount, playList, id, loadAllDjPage, djPlaying } = storeToRefs(usePlayerStore())
const { play, clearPlayList, moreDj, playDj } = usePlayerStore()
const onLoadMore = async () => {
  loading.value = true
  await moreDj()
  loading.value = false
}
const loading = ref(false)
const handleClick = async (song: Song) => {
  if (djPlaying) {
    loading.value = true
    await playDj((song.djProgram?.id) as number)
    loading.value = false
  }
  play(song.id)
}

</script>
<style lang="scss">
.play-list {
  .el-drawer__body {
    padding: 0;
  }
}
</style>
