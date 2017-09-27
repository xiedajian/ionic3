import { Component ,ViewChild ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//引入html5定位
import {GeolocationProvider} from '../../providers/geolocation/geolocation';

// gaode map
declare var AMap;

@IonicPage()
@Component({
  selector: 'page-gaodemap',
  templateUrl: 'gaodemap.html',
})
export class GaodemapPage {


  @ViewChild('map2') map_container2: ElementRef;
  map: any;//地图对象

  constructor(public navCtrl: NavController,
              public html5Geolocation: GeolocationProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaodemapPage');
  }
  ionViewDidEnter() {
    this.load();
  }
  load(){
    this.map = new AMap.Map(this.map_container2.nativeElement, {
      view: new AMap.View2D({//创建地图二维视口
        center:[this.html5Geolocation.longitude,this.html5Geolocation.latitude],
        zoom: 16, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true
      })
    });
  }

}
