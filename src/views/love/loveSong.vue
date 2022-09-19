<template>
  <div class="mt-2">
    <div class="flex py-5">
      <div class="w-32 button mr-3 " :onclick="playAll">
        <IconPark :icon="PlayOne" size="20" />
        <div class="ml-1">播放全部</div>
      </div>
      <div class=" button-outline w-28 mr-3 ">
        <IconPark :icon="Download" size="20" />
        <div class="ml-1">下载</div>
      </div>
      <div class=" button-outline w-28 mr-3 ">
        <IconPark :icon="List" size="20" />
        <div class="ml-1">批量操作</div>
      </div>
      <div class="flex-grow" />
      <div class="flex items-center">
        <div class="btn w-16 h-6 mx-1 ">
          <IconPark :icon="Search" />
          <div style="width: 32px; padding-left: 4px;">搜索</div>
        </div>
        <div class="btn w-16 h-6 mx-1">
          <IconPark :icon="SortOne" />
          <div style="width: 32px; padding-left: 4px;">排序</div>
        </div>
        <div class="btn w-7 h-6 ">
          <IconPark :icon="VerticalTidyUp" fill="#7b7b7b" />
        </div>
        <div class="btn w-7 h-6 ">
          <IconPark :icon="Avatar" fill="#7b7b7b" />
        </div>
        <div class="btn w-7 h-6 ">
          <IconPark :icon="Cd" fill="#7b7b7b" />
        </div>
      </div>
    </div>
    <div class="flex text-xs leading-3 text-gray-400 py-2">
      <div class="flex-auto flex">
        歌曲
        <IconPark class="align-middle" :icon="order === -1 ? Sort : order === 0 ? UpOne : DownOne" theme="filled" size="12" fill="#21d369" />
      </div>
      <div class="w-1/4">歌手</div>
      <div class="w-1/4">专辑</div>
    </div>
    <div class="text-sm">
      <template v-for="song in songs" :key="song.id">
        <song-list-item :song="song" show-ar-name show-al-name />
      </template>
        <div class="flex justify-center py-6">
          <LoadMore :loadAll="loadAll" :loading="loading" :onloadMore="getMoreData" />
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Song } from "@/models/song";
import songListItem from "@/components/common/SongListItem.vue";
import { ref, toRefs, onMounted, watch } from "vue";
import { usePlayListTrackAll} from "@/utils/api";
import { Sort, UpOne, DownOne, PlayOne, Download, List, Search, SortOne, VerticalTidyUp, Avatar, Cd, LoadingOne } from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import 'font-awesome-animation';
import {useUserLikeStore} from '@/stores/userlike';
import {usePlayerStore} from "@/stores/player";
import LoadMore from '@/components/common/LoadMore.vue';

const { lovelist } = toRefs(useUserLikeStore())
const {pushPlayList, play} = usePlayerStore()
const songs = ref<Song[]>([]);

const getData = async () => {
  loading.value = true
  if (lovelist.value.id) {
    songs.value = await usePlayListTrackAll(lovelist.value.id, pageSize)
  }
  loading.value = false
}

const getMoreData = async () => {
  pageNo.value++
  loading.value = true
  if (lovelist.value.id) {
    const moreSongs = await usePlayListTrackAll(lovelist.value.id, pageSize, pageNo.value*pageSize)
    if (moreSongs.length!==pageSize) {
      loadAll.value = true
    }
    songs.value.push(...moreSongs)
  }
  loading.value = false
}
const playAll = () => {
  pushPlayList(true, ...songs.value)

  play(songs.value.first().id)
}
const pageSize = 20
const pageNo = ref(0)
const order = ref(-1)
const loadAll = ref(false)
const loading = ref(false)

watch(lovelist, getData)
onMounted(getData)

</script>
<style lang="scss" scoped>
.btn {
  @apply text-sm rounded-sm justify-center items-center flex hover:bg-gray-200
}
</style>
