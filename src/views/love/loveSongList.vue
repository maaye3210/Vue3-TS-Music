<template>
  <div class="mt-2">
    <div class="flex py-5">
      <div class="w-32 button mr-3 ">
        <IconPark :icon="PlayOne" size="20"/>
        <div class="ml-1">播放全部</div>
      </div>
      <div class=" button-outline w-28 mr-3 ">
        <IconPark :icon="Download" size="20"/>
        <div class="ml-1">下载</div>
      </div>
      <div class=" button-outline w-28 mr-3 ">
        <IconPark :icon="List" size="20"/>
        <div class="ml-1">批量操作</div>
      </div>
      <div class="flex-1 flex flex-row-reverse w-20 items-center">
        <div class="btn w-7  h-6 ">
          <IconPark :icon="Cd" fill="#7b7b7b" />
        </div>
        <div class="btn w-7  h-6 ">
          <IconPark :icon="Avatar" fill="#7b7b7b" />
        </div>
        <div class="btn w-7  h-6 ">
          <IconPark :icon="VerticalTidyUp" fill="#7b7b7b" />
        </div>
        <div class="btn w-16 h-6 mx-1">
          <IconPark :icon="SortOne" />
          <div>排序</div>
        </div>
        <div class="btn w-16 h-6 mx-1 ">
          <IconPark :icon="Search" />
          <div >搜索</div>
        </div>
      </div>
    </div>
    <div class="flex text-xs leading-3 text-gray-400 py-2">
      <div class="flex-auto flex">
        歌曲
        <IconPark class="align-middle" :icon="order===-1 ? Sort : order===0 ? UpOne : DownOne" theme="filled" size="12" fill="#21d369"/>
        
      </div>
      <div class="w-1/4">歌手</div>
      <div class="w-1/4">专辑</div>
    </div>
    <div class="text-sm">
      <template v-for="song in songs" :key="song.id">
        <song-list-item :song="song" show-ar-name show-al-name/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {Song} from "@/models/song";
import songListItem from "@/components/common/SongListItem.vue";
import {computed, ref} from "vue";
import {Sort, UpOne, DownOne,PlayOne,Download,List,Search,SortOne,VerticalTidyUp,Avatar,Cd} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";

const props = defineProps<{
  songs: Song[],
}>()

const pageSize = ref(10)
const page = ref(1)
const order = ref(-1)

const noMore = computed(() => {
  return page.value - (props.songs.length / pageSize.value) >= 0
})

const loadMore = () => {
  page.value = page.value + 1
}

</script>
<style lang="scss" scoped>
.btn {
  @apply  text-sm rounded-sm justify-center items-center flex hover:bg-gray-200
}
</style>
