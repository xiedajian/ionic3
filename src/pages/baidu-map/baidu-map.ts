import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//引入html5定位
import {GeolocationProvider} from '../../providers/geolocation/geolocation';

// baidu map
declare var BMap;
declare var BMap_Symbol_SHAPE_POINT;

@IonicPage()
@Component({
  selector: 'page-baidu-map',
  templateUrl: 'baidu-map.html',
})
export class BaiduMapPage {

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  geolocation1: any;
  myIcon: any;

  constructor(public navCtrl: NavController,
              public html5Geolocation: GeolocationProvider,
              public navParams: NavParams) {
    this.html5Geolocation.watchPosition();
    this.myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaiduMapPage');
  }
  ionViewDidEnter() {
    let map =
      this.map =
        new BMap.Map(
          this.map_container.nativeElement,
          {
            enableMapClick: true,//点击拖拽
            enableScrollWheelZoom: true,//启动滚轮放大缩小，默认禁用
            enableContinuousZoom: true //连续缩放效果，默认禁用
          }
        );//创建地图实例

    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别
    // map.addControl(new BMap.MapTypeControl());//地图类型切换
    // map.setCurrentCity("广州"); //设置当前城市

    let point = new BMap.Point(113.38028471135, 23.129702256122);//坐标可以通过百度地图坐标拾取器获取
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    map.centerAndZoom(point, 18);//设置中心和地图显示级别

    // let sizeMap = new BMap.Size(10, 80);//显示位置
    // map.addControl(new BMap.NavigationControl());

    // let myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(300, 157));
    // let marker = this.marker = new BMap.Marker(point, { icon: myIcon });
    // map.addOverlay(marker);
  }

  //浏览器定位
  getLocationByBrowser() {
    let geolocation1 = this.geolocation1 = new BMap.Geolocation();
    geolocation1.getCurrentPosition((r) => {
      let mk = this.marker = new BMap.Marker(r.point, { icon: this.myIcon });
      console.log('打印：',geolocation1.getStatus());
      if (geolocation1.getStatus() == 'BMAP_STATUS_SUCCESS') {
        this.map.addOverlay(mk);
        this.map.panTo(r.point, 16);
        console.log('浏览器定位：您的位置是 ' + r.point.lng + ',' + r.point.lat);
      }
      else {
        alert('failed' + this.geolocation1.getStatus());
      }
    }, { enableHighAccuracy: false })
  }

  //IP定位
  getLocationByIp() {
    let myCity = new BMap.LocalCity();
    myCity.get(result => {
      let cityName = result.name;
      this.map.setCenter(cityName);
      console.log("当前定位城市:" + cityName);
    });
  }

  //城市定位
  getLocationByCity() {
    let city = "郑州";
    if (city != "") {
      this.map.centerAndZoom(city, 16);      // 用城市名设置地图中心点
    }
  }

  //经纬度定位
  getLocationByLatLon() {
    let aa=this.html5Geolocation.latitude;
    let bb=this.html5Geolocation.longitude;
    let point = new BMap.Point(bb, aa);
    let marker = this.marker = new BMap.Marker(point, { icon: this.myIcon });
    this.map.addOverlay(marker);
    this.map.centerAndZoom(point, 16);
  }

  //GPS点击定位
  getLocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
  //     let convertor = new BMap.Convertor();
  //     let pointArr = [];
  //     pointArr.push(locationPoint);
  //     convertor.translate(pointArr, 1, 5, (data) => {
  //       if (data.status === 0) {
  //         let marker = this.marker = new BMap.Marker(data.points[0], { icon: this.myIcon });
  //         this.map.panTo(data.points[0]);
  //         marker.setPosition(data.points[0]);
  //         this.map.addOverlay(marker);
  //       }
  //     })
  //     console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
  //   })
  }
}
