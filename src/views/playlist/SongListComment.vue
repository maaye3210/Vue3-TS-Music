<template>
  <div v-for="info in infos?.comments">
    {{info.content}}
  </div>
</template>
<script lang="ts" setup>
import type {PlayListDetail} from "@/models/playlist";
import type {PlayListCommentInfo} from "@/models/comment";
import {useCommentNew} from '@/utils/api';
import {ref,onMounted} from 'vue';
const props = defineProps<{
  playlist:PlayListDetail
}>()
const infos = ref<PlayListCommentInfo>()

onMounted(async() => {
  infos.value = await useCommentNew(props.playlist.id,2)
})
</script>