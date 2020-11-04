<template>
  <div id="main">
    <header>
      <el-date-picker v-model="year" type="year" placeholder="选择年">
      </el-date-picker>
      <div class="fr p10">
        欢迎您登录 &nbsp;&nbsp;
        <span><i class="el-icon-switch-button blue"></i></span>
      </div>
      <h3 class="tc">{{ title }}</h3>
    </header>
    <div class="container">
      <el-row>
        <el-col :span="5">
          <title-box :title="titleBox1"></title-box>
        </el-col>
        <el-col :span="14">
          <earth-map></earth-map>
        </el-col>
        <el-col :span="5">
          <title-box :title="titleBox3"></title-box>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import TitleBox from "./title";
import EarthMap from "../components/earthMap"
export default {
  components: {
    TitleBox,
    EarthMap
  },
  data() {
    return {
      year: "",
      title: "慧民惠农财政补贴资金“一卡通”",
      titleBox1: "覆盖区域",
      titleBox2: "补贴发放",
      titleBox3: "发放资金排行榜",
      titleBox4: "区域发放",
    };
  },
  mounted() {
    
  },
  methods: {},
};
</script>
<style scoped>
#main {
  position: relative;
  width: 100%;
  height: 100%;
}
h3 {
  font-size: 22px;
  letter-spacing: 4px;
  /* color: antiquewhite; */
  background: linear-gradient(to right, #0e67a9, #26d3d7);
  -webkit-background-clip: text;
  color: transparent;
}

.container{
  width: 100%;
  height: 100%;
  padding-top: 1%;
}

</style>