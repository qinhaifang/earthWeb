<template>
  <div>
    <div class="title">{{title}}</div>
  </div>
</template>
<script>
export default {
  props:["title"]
}
</script>
<style scoped>
  .title{
    width: 80%;
    padding: 10px;
    background: linear-gradient(#0f6fb3, #093c73);
  }
</style>