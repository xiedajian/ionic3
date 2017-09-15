import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageDemoPage } from './page-demo';


import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PageDemoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PageDemoPage),
  ],
})
export class PageDemoPageModule {}
