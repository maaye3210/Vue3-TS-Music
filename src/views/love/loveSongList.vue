<template>
  <div class="mt-2">
    <div class="flex text-xs text-gray-400 py-2">
      <div class="flex-auto">歌曲</div>
      <div class="w-1/4">歌手</div>
      <div class="w-1/4">专辑</div>
    </div>
    <div class="text-sm">
      <template v-for="song in songs" :key="song.id">
        <love-song-list-item :song="song" show-ar-name show-al-name/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {Song} from "@/models/song";
import loveSongListItem from "@/views/love/loveSongListItem.vue";
import {computed, ref} from "vue";

const props = defineProps<{
  songs: Song[],
}>()

const pageSize = ref(10)
const page = ref(1)

const noMore = computed(() => {
  return page.value - (props.songs.length / pageSize.value) >= 0
})

const loadMore = () => {
  page.value = page.value + 1
}

</script>
<style lang="scss">

</style>
