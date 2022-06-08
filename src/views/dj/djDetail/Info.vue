<template>
  <div class="flex items-stretch">
    <img :src="djDetail.picUrl" alt="" class="w-44 h-44 object-cover rounded-sm flex-shrink-0">
    <div class="pl-5 flex flex-col justify-between py-1 flex-1">
      <div class="flex flex-col justify-between flex-1">
        <div class="text-2xl font-bold ">{{ djDetail.name }}</div>
        <div class="text-xs text-gray-500 leading-normal mt-2">
          {{djDetail.desc}}...
        </div>
        <div class="flex text-xs gap-x-5 text-slate-500 mt-2">
          <div><span>{{formatTime(djDetail.createTime)}}</span></div>
        </div>
      </div>
      <div class="justify-self-stretch mt-5 gap-x-2 flex items-center">
        <button class="w-32 button">
          <IconPark :icon="PlayOne" size="18" class="mr-1"/>
          <span>播放全部</span>
        </button>
        <button class="w-32 button-outline">
          <IconPark :icon="Like" size="18" class="mr-1"/>
          <span>收藏</span>
        </button>
        <button  class="button-outline w-8" >
          <IconPark :icon="More"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PlayOne, Like, More} from '@icon-park/vue-next'
import MoreText from "@/components/common/MoreText.vue";
import {formatTime} from '@/utils/number';
import IconPark from "@/components/common/IconPark.vue";
import type {DjInfo} from "@/models/dj";


defineProps<{
  djDetail: DjInfo,
}>()
</script>
