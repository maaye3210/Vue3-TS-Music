<template>
  <div ref="like">
    我喜欢
  </div>
</template>
<script lang="ts">
import exp from 'constants';
import {ref, onMounted} from 'vue';
export default{
  setup() {
    const like=ref(null)
    onMounted(()=>{
      console.log(like.value);
      
    })
    return {
      like
    }
  }
}
</script>