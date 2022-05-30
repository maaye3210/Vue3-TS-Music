<template>
  <div class="playlist">
    <div class="p-5" v-if="lovelist">
      <el-tabs class="mt-3" v-model="tab">
        <el-tab-pane lazy :label="`歌曲 ${songs.length}`" name="tracks">
          <loveSongList v-if="songs.length>0" :songs="songs"/>
        </el-tab-pane>
        <el-tab-pane lazy label="歌单" name="songlist">
        </el-tab-pane>
        <el-tab-pane lazy label="专辑" name="album">
        </el-tab-pane>
        <el-tab-pane lazy label="主播电台" name="dj">
        </el-tab-pane>
        <el-tab-pane lazy label="视频" name="vedio">
        </el-tab-pane>
      </el-tabs>
    
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, toRefs, watch} from "vue";
import { usePlayListTrackAll} from "@/utils/api";
import loveSongList from "@/views/love/loveSongList.vue";
import type {Song} from "@/models/song";
import {usePlayerStore} from "@/stores/player";
import {useUserStore} from '@/stores/user';
const { lovelist }=toRefs(useUserStore())

const tab = ref('tracks')

const songs = ref<Song[]>([]);

const {pushPlayList, play} = usePlayerStore()

const playAll = () => {
  pushPlayList(true, ...songs.value)

  play(songs.value.first().id)
}
const getData = async () => {
  await usePlayListTrackAll(lovelist.value.id).then(res => {
    songs.value = res
  })
} 
watch(lovelist, getData)
onMounted(getData)
</script>

<style lang="scss">
.playlist {
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  .el-tabs__header {
    @apply m-0;
  }
}
</style>