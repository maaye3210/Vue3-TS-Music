<template>
<!-- DJ封面 -->
  <div class="djcover-play-image aspect-square">
    <el-image :src="picUrl" :alt="name" class="w-full bg-gray-50 object-cover"/>
    <div class="mask flex justify-center items-center">
      <IconPark :icon="PlayOne"
      theme="filled"
      class="text-white play-icon opacity-0  hover:text-teal-400" :size="50"
      @click="emitOnPlay()"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PlayOne} from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import type { RecommendDjProgram } from "@/models/dj";

const props = defineProps<{
  picUrl : string
  name : string
  id : number
  programid?: number
  onPlay: (id:number) => void
}>()
const emitOnPlay=()=>{
  if (props.programid) {
    props.onPlay(props.programid)
  }else{
    props.onPlay(props.id)
  }
}
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

