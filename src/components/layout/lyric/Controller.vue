<template>
  <div class="flex items-center justify-center gap-x-3">
    <IconPark :icon="loopType===0?PlayOnce:loopType===1?LoopOnce:ShuffleOne" size="20" :stroke-width="3" class="hover-text text-white" @click="toggleLoop"/>
    <IconPark :icon="GoStart" size="28" theme="filled" class="hover-text text-white" @click="prev"/>
    <IconPark :icon="!isPlaying ? Play : PauseOne" size="45" theme="filled" class="hover-text text-emerald-400" @click="togglePlay"/>
    <IconPark :icon="GoEnd" size="28" class="hover-text text-white" @click="next"/>
    <el-popover placement="top" width="50px">
      <!-- 音量控制 -->
      <template #reference>
        <IconPark :icon="muted?VolumeMute:volume<50?VolumeSmall:VolumeNotice" size="20" :stroke-width="3" class="hover-text text-white"/>
      </template>
      <PlayerVolumeSlider/>
    </el-popover>

  </div>
</template>

<script setup lang="ts">
import {Play, PauseOne, LoopOnce, ShuffleOne, PlayOnce, GoEnd, GoStart, VolumeSmall,VolumeMute,VolumeNotice} from "@icon-park/vue-next";
import {toRefs} from "vue";
import IconPark from "@/components/common/IconPark.vue";
import PlayerVolumeSlider from "@/components/layout/footer/PlayerVolumeSlider.vue";
import {usePlayerStore} from "@/stores/player";

const {toggleLoop, loopType, next, prev, togglePlay, isPlaying, muted, volume} = toRefs(usePlayerStore())

</script>


<style lang="scss">
.controller-icon {
  @apply hover:text-emerald-400 cursor-pointer transition-colors;
}
</style>
