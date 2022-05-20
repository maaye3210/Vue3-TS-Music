<template>
本地歌曲
</template>
<script setup lang="ts">
import {onMounted} from 'vue';
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
onMounted(()=>{
  ElMessage({
    message: `模块正在开发ing...过段时间再来看吧 ^_^ ~`,
    type: 'success'
  })
})
</script>