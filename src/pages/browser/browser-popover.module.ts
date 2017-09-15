import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowserPopoverPage } from './browser-popover';

@NgModule({
  declarations: [
    BrowserPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowserPopoverPage),
  ],
})
export class BrowserPopoverPageModule {}
