import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrowserPage } from '../browser/browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goBrower(){
    this.navCtrl.push(BrowserPage, {
      browser: {
        title: '页面名称',
        // url: '这里放置访问的页面链接'
        url: 'https://www.baidu.com'
      }
    });
  }

}
