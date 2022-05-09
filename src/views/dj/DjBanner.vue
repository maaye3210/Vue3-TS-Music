<!-- 轮播图组件 -->
<template>
<!-- :centered-slides="true" -->
  <Swiper :loop="true"  :slides-per-group-auto="true" :looped-slides="3" slides-per-view="auto" :autoplay="{delay: 3000}">
    <SwiperSlide v-for="item in banners" :key="item.targetId">
      <img :src="item.pic" class="banner-image"  alt=""/>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import SwiperCore, { Navigation , Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import type {DJBanner} from '@/models/dj';
SwiperCore.use([Autoplay,Navigation]);

defineProps<{
  banners:DJBanner[]
}>()
</script>


<style lang="scss">
.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/3 px-2.5;
  }
}

.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>
