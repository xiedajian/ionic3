import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {InterfaceListProvider} from '../../providers/interface-list/interface-list';
import {GeolocationProvider} from '../../providers/geolocation/geolocation';

//测试jqury
declare var $: any;
//测试依赖于jquery的插件
declare var mui: any;


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public interface_lists: InterfaceListProvider,
              public geolocation: GeolocationProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    mui.init();
    mui.previewImage();
    $('p').on('click',()=>{
      $('p').css('color','red');
      console.log('click');
    });
  }

  login() {
    this.interface_lists.AppVersionCheck().then((returnData) => {
      console.log(returnData);
    })
  }
  getGeolocation(){
    this.geolocation.getGeolocation();
  }
}
