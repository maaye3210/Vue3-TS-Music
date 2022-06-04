<template>
<!-- Component使用内置组件，is参数表示要渲染的标签、组件、或者v-node节点 -->
  <Component :is="icon" :theme="theme" :size="size" :spin="spin" :fill="fill" :strokeLinecap="strokeLinecap"
             :strokeLinejoin="strokeLinejoin" :strokeWidth="strokeWidth"/>
</template>

<script setup lang="ts">
// 二次封装一个IconPark组件，可以方便的调用

import type {Icon} from "@icon-park/vue-next/lib/runtime";

defineProps<{
  icon: Icon,
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color',
  size?: number | string,
  spin?: boolean,
  fill?: string | string[],
  strokeLinecap?: 'butt' | 'round' | 'square',
  strokeLinejoin?: 'miter' | 'round' | 'bevel',
  strokeWidth?: number
  title?:string
}>()
</script>
