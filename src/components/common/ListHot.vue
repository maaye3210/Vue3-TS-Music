<template>
<br>
  <div class="grid grid-flow-row grid-cols-8 2xl:grid-cols-12 gap-2.5">
    <div v-for="tag in tags" :key="tag.id" class="button-dc" @click="catClick(tag)">{{ tag.name }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tags: {
    id:number,
    name:string
    }[]
}>()
const emit = defineEmits<{
  (e: 'catChange', cat:  {id:number,name:string}): void,
}>()

const catClick = (cat: {id:number,name:string}) => {
  emit('catChange', cat)
}

</script>
