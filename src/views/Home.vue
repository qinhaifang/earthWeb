<template>
  <div id="main">
    <earth-map style="margin-top:94px"></earth-map>
    <header>
      <div class="datePicker">
        <el-date-picker v-model="year" type="year" placeholder="选择年">
      </el-date-picker>
      </div>
      <div class="fr p10" style="position: relative;bottom: 20px;">
        欢迎您登录 &nbsp;&nbsp;
        <span><i class="el-icon-switch-button blue"></i></span>
      </div>
      <h3 class="tc">{{ title }}</h3>
    </header>
    <div class="container">
      <div class="left">
        <title-box :title="titleBox1"></title-box>
        <p class="p20">全省县区：<b class="f30">{{total}}</b>个</p>
        <pie-chart :pieData="pie1"></pie-chart>
        <title-box :title="titleBox2"></title-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="发放资金" name="1" :key='activeName'>
              <div class="box"> 
                <bar-chart :barData="bar"></bar-chart>
              </div>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key="activeName+'1'">
            <div class="box"> 
              <bar-chart :barData="bar1"></bar-chart>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <title-box :title="titleBox3"></title-box>
        <el-select v-model="value" class="selectInput" placeholder="请选择补贴类型">
          <el-option value="">全部</el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="rank">
          <ul>
            <li v-for="(item,index) in rankData" :key="index">
              <span :class="{color1:index==0,color2:index==1,color3:index==2}">{{index+1}}</span>
              <span>{{item.name}}</span>
              <span>{{item.pay}} 万元</span>
              <span>{{item.num}} 笔</span>
            </li>
          </ul>
        </div>
        <title-box :title="titleBox4"></title-box>
        <el-tabs v-model="activeNameArea" type="card" @tab-click="handleClickArea">
          <el-tab-pane label="发放资金" name="1" :key='activeNameArea'>
              <div class="box"> 
                <bar-chart :barData="bar2"></bar-chart>
              </div>
          </el-tab-pane>
          <el-tab-pane label="发放人次" name="2" :key='activeNameArea+"1"'>
            <div class="box"> 
              <bar-chart :barData="bar3"></bar-chart>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="top">
        <ul>
          <li v-for="(item,index) in totalData" :key="index" @click="alertBox(index)">
            <img class="helpIcon" v-show="index == 4 || index ==5" src="../assets/icon.png" alt="">
            <span>{{item.name}}</span>
            <p class="p10"><span>{{item.num}}</span>&nbsp;&nbsp;{{item.unit}}</p>
          </li>
        </ul>
      </div>
      <el-dialog
        title="主管部门"
        :visible.sync="depBox"
        destroy-on-close
        width="30%">
        <el-table :data="depData" height="500px">
          <el-table-column property="name" label="主管部门" ></el-table-column>
          <el-table-column property="value" label="补贴类型数" width="120" align="center"></el-table-column>
          <el-table-column property="totalCount" label="发放金额（万元）" width="150" align="center"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        :title="boxTitle"
        :visible.sync="buTieDesc"
        destroy-on-close
        width="42%" style="margin-top:4%">
        <ul class="boxUl">
          <li v-for="(item,index) in getAreaBonusDetail" :key="index">
            <img :src="require('../assets/icon'+index+'.svg')" alt="">
            <span>{{item.title}}</span>
            <span>{{item.value}}</span>
          </li>
          <div class="clear"></div>
        </ul>
        <!-- <title-box style="background-size:inherit;margin-top:20px" :title="titleBox5"></title-box> -->
        <p class="boxTitle">区域发放情况 <img src="../assets/icon5.png" alt=""></p>
        <bar-charts v-if="descFlag" :barData="bar4"></bar-charts>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import TitleBox from "./title";
import PieChart from "../components/pieChart"
import EarthMap from "../components/earthMap"
import BarChart from "../components/barChart"
import BarCharts from "../components/barCharts"
export default {
  components: {
    TitleBox,
    EarthMap,
    PieChart,
    BarChart,
    BarCharts
  },
  data() {
    return {
      year: "",
      title: "惠民惠农财政补贴资金“一卡通”",
      titleBox1: "覆盖区域",
      titleBox2: "补贴发放",
      titleBox3: "发放资金排行榜",
      titleBox4: "区域发放",
      total:117,
      activeName:"1",
      activeNameArea:"1",
      depBox:false,  //主管部门弹窗
      depData: [
        {
          name:'test',
          value:'19',
          totalCount:'100',
        }
      ],
      pie1:{
        id:"pieChart1",
        height:'200px',
        data1:80,
        data2:10
      },
      bar:{
        id:"barChart",
        height:'400px',
        dataX:[239,181,154,144,135,117,29,181,154,144],
        dataY:["农机购置","党员补贴","儿童补贴","低保补贴","伤残补贴","优抚补贴","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      bar1:{
        id:"barChart1",
        height:'400px',
        dataX:[29,181,154,144,135,117,29,181,154,144],
        dataY:["党员补贴","农机购置","儿童补贴","低保补贴","伤残补贴","优抚补贴","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      bar2:{
        id:"barChart2",
        height:'400px',
        dataX:[29,181,154,144,135,117,29,181,154,144],
        dataY:["吕梁市","太原市","运城市","忻州市","阳泉市","临汾市","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      bar3:{
        id:"barChart3",
        height:'400px',
        dataX:[99,181,154,144,135,117,29,181,154,144],
        dataY:["党员补贴","农机购置","儿童补贴","低保补贴","伤残补贴","优抚补贴","低保补贴","伤残补贴","优抚补贴","农机购置"]
      },
      bar4:{
        id:"barChart4",
        height:'400px',
        dataX:['1','2','3','4','5'],
        dataY:[2,3,4,5,6],
        dataZ:[7,8,9,0,10],
        unit:'万元'
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      rankData:[
        {
          name:'吕梁市',
          pay:90,
          num:10
        },
        {
          name:'太原市',
          pay:40,
          num:100
        },
        {
          name:'忻州市',
          pay:10,
          num:6
        },
        {
          name:'晋城市',
          pay:10,
          num:5
        },
        {
          name:'介休市',
          pay:50,
          num:1
        },
      ],
      totalData:[
        {name:'覆盖区县',num:35,unit:'个'},
        {name:'发放金额',num:9123,unit:'万元'},
        {name:'补贴类型',num:14,unit:'个'},
        {name:'受益人口',num:520,unit:'人'},
        {name:'代发银行',num:5,unit:'个'},
        {name:'主管部门',num:8,unit:'个'},
      ],
      buTieDesc:false,   //左边柱状图点击进入详情
      boxTitle:'柱状图详情',
      descFlag:false,
      getAreaBonusDetail:[
        {title:'覆盖区县',value:0},
        {title:'发放人次',value:0},
        {title:'发放笔数',value:0},
        {title:'发放金额',value:0}
      ]
    };
  },
  mounted() {
    Bus.$on('buTeiDesc',(name,index,state)=>{
      this.buTieDesc = state;
      this.boxTitle = name;
    })
  },
  methods: {
    numFormat(num) {
        var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        this.totalData[1].num = c
        return c;
    },
    handleClick(tab, event) {
      console.log(111,tab.name);
    },
    handleClickArea(tab, event) {
      console.log(111,tab.name);
    },
    alertBox(index){
      if(index == 5){
        this.depBox = true
      }
    }
  },
};
</script>
<style scoped>
  .p10{
    padding: 10px;
  }
  .clear{
    clear: both;
  }
  #main {
    position: relative;
    width: 100%;
    height: 100%;
  }
  header{
    width: 100%;
    height: 100px;
    /* background: url("../assets/headerBackground.svg") no-repeat top center; */
    background: url("../assets/header.png") no-repeat top center;
    background-size: contain;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
  }
  h3 {
    font-family: 'Microsoft YaHei';
    font-size: 32px;
    /* letter-spacing: 4px; */
    padding-left: 9%;
    font-weight: 700;
    color: antiquewhite;
    background: linear-gradient(to bottom, #72E6FF ,  #2968E8);
    -webkit-background-clip: text;
    color: transparent;
    cursor: pointer;
    position: relative;
    top: -20px;
    left: 17%;
    width: 50%;
  }
  .container{
    width: 100%;
    height: 100%;
  }
  .el-tabs__content{
    height: 500px;
    overflow: auto;
  }
  .left{
    /* width: 340px; */
    width: 18%;
    height: 100%;
    background: rgb(10, 30, 60);
    /* background-color: rgba(0, 0, 0,.3); */
    /* box-shadow: 2px 0px 28px 0px rgba(55, 100, 171,.8); */
    position: absolute;
    top: -2%;
    left: 0;
  }
  .right{
    /* width: 320px; */
    width: 16.5%;
    height: 100%;
    position: absolute;
    top: -2%;
    right: 0;
    background: rgb(10, 30, 60);
    /* background-color: rgba(0, 0, 0,.3); */
    /* background-color: rgba(55, 100, 171,.3); */
  }
  .rank ul li,.dep ul li{
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    margin: 8px;
    background: linear-gradient(90deg, rgba(0, 43, 144, 0) 0%, rgba(0, 125, 203, 0.51) 100%);
  }
  .color1{
    background: #FF3C3C;
    /* border: 1px solid #BC0000; */
  }
  .color2{
    background: #FF8122;
    /* border: 1px solid #E3861C; */
  }
  .color3{
    background: #F0DE40;
    /* border: 1px solid #FFBB52; */
  }
  .rank{
    height: 230px;
    overflow: auto;
  }
   .dep{
    height: 480px;
    overflow: auto;
  }
  .rank ul li span:first-child,.dep ul li span:first-child{
    display: inline-block;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border-radius: 50%;
  }
  .rank ul li span:nth-child(2),.dep ul li span:nth-child(2){
    display: block;
    width: 5rem;
    padding-left: 4px;
    text-align: left;
  }
  .rank ul li span:nth-child(3),.dep ul li span:nth-child(3){
    width: 3.125rem;
    text-align: right;
  }
  .rank ul li span:not(:first-child),.dep ul li span:not(:first-child){
    display: inline-block;
  }
  .rank ul li span:last-child,.dep ul li span:last-child{
    width: 6.25rem;
    text-align: right;
  }
  .top{
    width: 65.6%;
    position:absolute;
    top: -2%;
    left: 18%;
    background: rgb(10, 30, 60);
    padding-top: 1.5625rem;
  }
  .top ul{
    width: 100%;
    text-align: center;
  }
  .top ul li{
    width: 15%;
    float: left;
    cursor: pointer;
    padding: 1.25rem .625rem ;
  }
    /* .top ul li:nth-child(2){
      width: 10%;
    } */
  .top ul li span{
    font-size: 1.125rem;
  }
  .top ul li p{
    color: rgba(255, 214, 108, 1);
  }

  .top ul li p span{
    display: inline-block;
    font-size: 2.5rem!important;
    font-family: 'number';
  }
  .box{
    height: 450px;
    overflow: auto;
  }
  .datePicker{
    position: relative;
    top: 18%;
    padding-left: 10px;
  }
  .boxUl li{
    width: 20.5%;
    padding: 10px;
    margin:0 5px;
    float: left;
    background: rgba(255,255,255,0.1);
    /* border:1px solid #ffd66c; */
    border-radius: 4px;
  }
  .boxUl li img{
    float: left;
  }
  .boxUl li span{
    padding-left: 50px;
    display: block;
    color: #fff;
  }
  .boxUl li span:last-child{
    padding-top: 10px;
  }
  .helpIcon{
    width: 1.5625rem;
    position: absolute;
    margin-left: 7%;
    margin-top: -.6875rem;
  }
  .boxTitle{
    padding: 30px 0;
    color: #ffab2b;
    font-weight: 700;
  }
  .boxTitle img{
    padding-left: 20px;
  }
  .light{
    position: relative;
    left: 45%;
    top: -6px;
    transform: translateX(-50%);
    animation: topLight 4s infinite linear;
    animation-direction: alternate;
  }
  .popName{
    font-size: 14px;
    padding: 2px 10px;
    background: #083b59;
    color: #fff;
    position: absolute;
    display: inline-block;
    left: 27%;
    margin-top: -11px;
  }
  @keyframes topLight {
    0%{
      opacity: 1;
    }
    50%{
      margin-left: 105px;
      opacity: 1;
    }
    100%{
      margin-left: 205px;
      opacity: 1;
    }
  }
  
</style>
<style>
  .el-select{
    z-index: 10;
  }
  .el-input__inner{
    background: rgba(0, 66, 142, 0.5)!important;
    border: 1px solid #00B1FF;
    border-radius: 4px;
    color: #fff!important;
  }
  .selectInput .el-input__inner{
    width: 300px;
    margin-left: 10px;
  }
  .el-dialog{
    background: linear-gradient(top, #00316D 0%, #004F8F 100%)!important;;
    /* border: 1px solid #00B1FF; */
    border-radius: 4px;
    color: #fff;
    padding: 0 25px;
  }
  .el-dialog__title,.el-dialog__body{
    color: #fff;
  }
  .el-table ,.el-table--fit ,.el-table th, .el-table tr{
    color: #fff;
    background: rgba(0, 0, 0, 0)!important;
    border-bottom:1px dashed #ccc;
  }
  .el-table tbody tr:hover>td ,.el-table tbody tr>td{ 
    background-color:rgba(0, 0, 0, 0)!important;
    border-bottom:1px dashed #ccc;
  }
  .el-table th:hover, .el-table tr:hover td,.el-table th,.el-table tr{
    background:none!important;
  }
  .el-table th{
    color: #ffab2b;
    font-weight: 700;
  }
  .mapBox .el-dialog{
    /* background: linear-gradient(90deg, rgba(41, 104, 232, 0.8) 0%, rgba(0, 79, 143, .6) 100%); */
    position: absolute!important;
    right: 18%;
    bottom: 0;
  }
  .el-dialog__header{
    height: 33px;
    background: url('../assets/titleBackground.svg') no-repeat;
    background-size: contain;
    position: relative;
    left: -25px;
  }
  .el-dialog__title{
    position: relative;
    top: -11px;
    font-size: 16px;
    color: #FFF!important;
  }
  .el-dialog__headerbtn{
    right: -34px!important;
  }
  .el-dialog__headerbtn .el-dialog__close{
    color: #fff;
  }
</style>
