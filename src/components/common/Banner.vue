<!-- 轮播图组件 -->
<template>
  <Swiper :loop="true"  :slides-per-group-auto="true" :looped-slides="4" slides-per-view="auto" :autoplay="{delay: 3000}">
    <SwiperSlide v-for="item in banners" :key="item.bannerId">
      <img :src="item.pic" class="banner-image" @click="onClick(item)"  alt=""/>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import SwiperCore, { Navigation , Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { onMounted, toRefs} from "vue";
import { usePlayerStore } from "@/stores/player";
import { useCommonStore } from "@/stores/common";
import type { Banner } from "@/models/banner";
SwiperCore.use([Autoplay,Navigation]);

defineProps<{
  perPage?: number
}>()
const { banners } = toRefs(useCommonStore())
const { getBanners } = useCommonStore()
onMounted(async () => {
  await getBanners()
})

const { play } = usePlayerStore()

const onClick = (banner: Banner) => {
  if (banner.targetType === 1) {
    play(banner.targetId)
  }
}
</script>

<style lang="scss">
.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5;
  }
}

.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>
