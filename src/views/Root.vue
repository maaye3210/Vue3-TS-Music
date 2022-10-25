<template>
  <div class="w-screen h-screen flex items-stretch overflow-hidden">
    <div class="w-56 h-screen flex-shrink-0">
      <Menu />
    </div>
    <div class="flex-1 flex flex-col ">
      <div class="h-14">
        <Header />
      </div>
      <div class="flex-1 overflow-hidden">
        <ElScrollbar>
          <div class="container mx-auto">
            <router-view v-show="$route.meta.keepAlive" v-slot="{ Component }">
              <transition name="slide-fade">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
            <router-view v-if="!$route.meta.keepAlive" v-slot="{ Component }">
              <transition name="slide-fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </ElScrollbar>
      </div>
      <div class="h-20">
        <Footer />
      </div>
    </div>
    <Lyric></Lyric>

    <PlayList />

  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/layout/menu/Menu.vue";
import Header from "@/components/layout/header/Header.vue";
import Footer from "@/components/layout/footer/Footer.vue";
import PlayList from "@/components/layout/playList/PlayList.vue";
import Lyric from "@/components/layout/lyric/lyric.vue";
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-enter-from

/* .slide-fade-leave-active for below version 2.1.8 */
  {
  transform: translateX(30px);
  opacity: 0;
}
</style>
