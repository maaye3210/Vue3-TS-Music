<template>
<!-- DJ封面 -->
  <div class="djcover-play-image">
    <el-image :src="picUrl" :alt="name" class=""/>
    <div class="mask flex justify-center items-center">
      <IconPark v-if="!isCurrentPlay"
      :icon="PlayOne"
      theme="filled"
      class="text-white play-icon opacity-0  hover:text-teal-400" :size="50"
      @click="onPlay"/>
      <IconPark v-else="!isCurrentPlay"
      :icon="Pause"
      theme="filled"
      class="text-white play-icon opacity-0  hover:text-teal-400" :size="50"
      @click="onPlay"/>
    </div>
    <!-- <div v-if="showPlayCount" class="play-count">
      <IconPark :icon="video?Play:Headset" class="mr-1" :size="12"/>
      <text>{{ useNumberFormat(playCount || 0) }}
      </text>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import {PlayOne, Play, Headset, Pause } from '@icon-park/vue-next'
import {useNumberFormat} from "@/utils/number";
import IconPark from "@/components/common/IconPark.vue";

defineProps<{
  picUrl: string
  isCurrentPlay?:boolean
  playCount?: number
  name?: string
  onPlay?: () => void
}>()
</script>

<style lang="scss">
.djcover-play-image {
  @apply rounded-lg relative overflow-hidden;
  .mask {
    @apply absolute inset-0 bg-black bg-opacity-0;
  }

  &:hover {
    .mask {
      @apply bg-opacity-50;
      .play-icon {
        @apply opacity-100;
      }
    }

    .play-count {
      @apply opacity-0;
    }
  }
}
</style>
