<template>
  <div class="map">
    <div id="cesium-earth"></div>
    <el-dialog
      :title="mapBoxTitle"
      :visible.sync="mapBox"
      destroy-on-close
      :modal=false
      width="18%"
      class="mapBox"
      >
      <ul>
        <li>
          发放资金：<span>20</span>万元
        </li>
        <li>
          发放人次：<span>20</span>人
        </li>
        <li>
          补贴类型数量：<span>20</span>个
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
const layer = "http://220.181.130.171:9090/gisserver/tiles/mbtiles/Global_Image/{z}/{x}/{reverseY}.jpg";
let timerRotate;
export default {
  data() {
    return {
      viewer: null,
      mapBoxTitle:null,
      mapBox:false,
      zoneObject: [
        {
          zoneName: "sx",
          lon: 112.549248,
          lat: 37.857014,
          height: 1600000, //进入页面显示的远近距离
          name: "山西省"
        },
        {
          zoneName: "taiyuan",
          lon: 112.549248,
          lat: 37.857014,
          height: 169496,
          name: "太原市"
        },
        {
          zoneName: "datong",
          lon: 113.295259,
          lat: 40.09031,
          height: 311615,
          name: "大同市"
        },
        {
          zoneName: "yangquan",
          lon: 113.583285,
          lat: 37.861188,
          height: 311615,
          name: "阳泉市"
        },
        {
          zoneName: "changzhi",
          lon: 113.113556,
          lat: 36.191112,
          height: 311615,
          name: "长治市"
        },
        {
          zoneName: "jincheng",
          lon: 112.851274,
          lat: 35.497553,
          height: 311615,
          name: "晋城市"
        },
        {
          zoneName: "shuozhou",
          lon: 112.43338,
          lat: 39.331261,
          height: 311615,
          name: "朔州市"
        },
        {
          zoneName: "jinzhong",
          lon: 112.736465,
          lat: 37.696495,
          height: 311615,
          name: "晋中市"
        },
        {
          zoneName: "yuncheng",
          lon: 111.003957,
          lat: 35.022778,
          height: 311615,
          name: "运城市"
        },
        {
          zoneName: "xinzhou",
          lon: 112.733538,
          lat: 38.41769,
          height: 311615,
          name: "忻州市"
        },
        {
          zoneName: "linfen",
          lon: 111.517973,
          lat: 36.08415,
          height: 311615,
          name: "临汾市"
        },
        {
          zoneName: "lvliang",
          lon: 111.134335,
          lat: 37.524366,
          height: 311615,
          name: "吕梁市"
        },
        {
          zoneName: "qg",
          lon: 112.003,
          lat: 30,
          height: 10911680,
          name: "全国"
        },
        {
          zoneName: "xiaoyi",
          lon: 111.781568,
          lat: 37.144474,
          height: 311615,
          name: "孝义市"
        },
      ],
      currentZoneObject: null,
    };
  },
  mounted() {
    this.init();
    window.viewer = this.viewer;
    this.addLister(); //监听地球点击事件
    // this.addZoneBoundary(this.zoneObject[0]);
    // this.addFGPoint();
    Bus.$on('flayToMap',()=>{ 
      clearInterval(timerRotate);      
      this.timerRotate = null;
      this.mapBox = true;
      this.addZoneBoundary(this.zoneObject[0])
    })
    Bus.$on("zone-click-event",zoneName =>{
      if (!zoneName) {
        return;
      }
      Bus.$emit("clear-all-mark");
      this.mapBox = true;
      this.mapBoxTitle = zoneName
      this.zoneLocation(zoneName);
      
    }),
     Bus.$on("clear-all-mark", () => {
      this.clearZoneBoundary();
    });
  },
  methods: {
    init() {
      this.viewer = new Cesium.Viewer("cesium-earth", {
        baseLayerPicker: false, //地图切换控件
        fullscreenButton: false, //全屏按钮
        // skyAtmosphere: false,//关闭地球光环
        vrButton: false, //双屏按钮
        geocoder: false, //地名查找
        homeButton: false, //首页按钮
        infoBox: false,
        sceneModePicker: false, //是否显示投影方式控件
        selectionIndicator: false, //选中元素显示
        navigationHelpButton: false, //是否显示帮助信息控件
        navigationInstructionsInitiallyVisible: false,
        animation: false, //动画控制,左下角方向盘
        shouldAnimate: true,
        timeline: false,
        orderIndependentTranslucency: false,//去掉地球表面的大气效果的黑圈问题
        skyBox: new Cesium.SkyBox({  
          show: false
        }),   //关闭月亮、星星等
        contextOptions: {
          webgl: {
            alpha:true //改变cesium背景
            // preserveDrawingBuffer: true,
          },
        },
        // imageryProvider: new Cesium.createTileMapServiceImageryProvider({
        //   url: "../../static/tiles",
        //   maximumLevel: 2,
        // }),
      });
      this.viewer.cesiumWidget.creditContainer.style.display = "none";
      this.viewer.scene.skyBox.show = true;
      this.viewer.scene.backgroundColor = new Cesium.Color( 0, 0, 0, 0);
      this.addImageLayer();
      // 地球自转 方法一
      var x = 113;
      timerRotate = setInterval(()=>{
        x = x + 0.3;
          if (x >= 178.5) {
            x = -180
          }
          this.viewer.camera.setView({
            destination:Cesium.Cartesian3.fromDegrees(x,35.5,30000000)
          })
      },16)
      // 地球自转 方法二
      // var i = Date.now();
      // function rotate(){
      //   var a = .1;
      //   var t = Date.now();
      //   var n = (t-1) /1e3;
      //   i = t;
      //   viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z,-a * n);
      // }
      // this.viewer.clock.onTick.addEventListener(rotate);
      // setTimeout(function(){
      //   this.viewer.clock.onTick.removeEventListener(rotate);
      // },5000)
      // 地球自转 方法三
      // this.viewer.clock.multiplier = 200;//速度
      // this.viewer.clock.shouldAnimate = true;
      // var previousTime = this.viewer.clock.currentTime.secondsOfDay;
      // function onTickCallback() {
      //   var spinRate = 1;
      //   var currentTime = viewer.clock.currentTime.secondsOfDay;
      //   var delta = (currentTime - previousTime) / 1000;
      //   previousTime = currentTime;
      //   viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
      // }
      // this.viewer.clock.onTick.addEventListener(onTickCallback);
    },
    addImageLayer(){
      const imageLayer = new Cesium.ImageryLayer(
        new Cesium.UrlTemplateImageryProvider({
          url:layer
        })
      )
      this.viewer.imageryLayers.removeAll();
      this.viewer.imageryLayers.add(imageLayer,0)
    },
    // 加载行政边界
    addZoneBoundary(obj,isFly = true){
      let neighborhoodsPromise = Cesium.GeoJsonDataSource.load(`static/data/${obj.zoneName}.json`,{
        stroke:Cesium.Color.YELLOW,
        fill:Cesium.Color.fromCssColorString("#3d88c6").withAlpha(0.8),
        strokeWidth:3
      })
      neighborhoodsPromise.then(dataSource => {
        this.viewer.dataSources.add(dataSource);
        let neighborhoods = dataSource.entities;
        let neighborhoodsEntities = dataSource.entities.values;
        let labels = {};
        for (var i = 0; i < neighborhoodsEntities.length; i++) {
          var entity = neighborhoodsEntities[i];
          if (Cesium.defined(entity.polygon)) {
            //entity.name = entity.properties.name.getValue();
            let name = entity.properties.name.getValue();
            if (labels[name]) {
              continue;
            } else {
              labels[name] = name;
            }
            if (
              name === "大同市" ||
              name === "吕梁市" ||
              name === "晋城市" ||
              name === '孝义市'
            ) {
              entity.polygon.material = Cesium.Color.fromCssColorString(
                "#ff3300"
              ).withAlpha(0.7);
            }
            var polyPositions = entity.polygon.hierarchy.getValue(
              Cesium.JulianDate.now()
            ).positions;
            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions)
              .center;
            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
              polyCenter
            );
            entity.position = polyCenter;

            entity.label = {
              //创建一个标签，在中心点位置
              text: name,
              color: Cesium.Color.fromCssColorString("#fff"),
              font: "normal 26px MicroSoft YaHei",
              showBackground: true,
              scale: 0.5,
              horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                10.0,
                10000000.0
              ),
              disableDepthTestDistance: 10000000.0
            };
          }
        }
      });
      if (isFly) this.flyTo(obj.lon, obj.lat, obj.height);
    },
    flyTo(log,lat,height){
      this.viewer.camera.flyTo({
        destination:Cesium.Cartesian3.fromDegrees(log,lat,height),
        duration:3.0
      })
    },
    // 加载下一级
    zoneLocation(zoneName) {
      for (let i = 0; i < this.zoneObject.length; i++) {
        if (this.zoneObject[i].name === zoneName) {
          this.currentZoneObject = this.zoneObject[i];
          break;
        }
      }
      if (this.currentZoneObject) {
        this.clearZoneBoundary();
        this.addZoneBoundary(this.currentZoneObject);
      }
    },
    // 监听地球点击
    addLister(){
      const handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      handler.setInputAction(movement => {
        const obj = this.viewer.scene.pick(movement.position);
        if (Cesium.defined(obj) && obj.id instanceof Cesium.Entity) {
          const model = obj.id;
          Bus.$emit("zone-click-event", model.name);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    },
    //清除行政区划
    clearZoneBoundary() {
      this.viewer.dataSources.removeAll();
    }
  },
};
</script>
<style scoped>
#cesium-earth {
  width: 100%;
  height: 100%;
  background-image: url('../assets/bg1.png');
}
.mapBox{
  z-index: 0!important;
}
.mapBox ul li {
  padding: 10px;
}
</style>
<style>
.map .el-dialog__body{
  padding-left: 0;
  color: #fff!important;
}
</style>