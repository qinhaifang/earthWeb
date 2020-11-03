<template>
  <div>
    <header>
      <el-date-picker
        v-model="year"
        type="year"
        placeholder="选择年">
      </el-date-picker>
      <div class="fr p10">欢迎您登录</div>
      <h3 class="tc">{{title}}</h3>
      
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year:'',
      title:"慧民惠农财政补贴资金“一卡通”",
    }
  },
}
</script>
<style scoped>
h3{
  font-size: 22px;
   letter-spacing: 4px;
   color: antiquewhite;
}
</style>