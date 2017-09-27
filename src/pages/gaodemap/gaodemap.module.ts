import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaodemapPage } from './gaodemap';

@NgModule({
  declarations: [
    GaodemapPage,
  ],
  imports: [
    IonicPageModule.forChild(GaodemapPage),
  ],
})
export class GaodemapPageModule {}
