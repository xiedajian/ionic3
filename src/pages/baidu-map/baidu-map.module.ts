import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaiduMapPage } from './baidu-map';

@NgModule({
  declarations: [
    BaiduMapPage,
  ],
  imports: [
    IonicPageModule.forChild(BaiduMapPage),
  ],
})
export class BaiduMapPageModule {}
