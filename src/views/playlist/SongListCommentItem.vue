<template>

  <div>
    {{playListComment.content}}
  </div>
</template>
<script lang="ts" setup>
import type {PlayListDetail} from "@/models/playlist";
import type {PlayListComment} from "@/models/comment";
import {useCommentNew} from '@/utils/api';
import {ref,onMounted} from 'vue';
const props = defineProps<{
  playListComment:PlayListComment
}>()
</script>