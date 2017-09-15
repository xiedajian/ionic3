import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the BrowserPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  template: `
        <ion-list>
            <button ion-item detail-none (click)="refresh()">刷新</button>
            <button ion-item detail-none (click)="share()" *ngIf="parentCallback.share">分享</button>
            <button ion-item detail-none (click)="close()">关闭</button>
        </ion-list>
    `
})
export class BrowserPopoverPage {
  parentCallback: {refresh: () => void, share?: () => void, close: () => void};

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {
    this.parentCallback = this.navParams.data.callback;
  }

  // 刷新
  refresh() {
    this.parentCallback.refresh();
    this.viewCtrl.dismiss();
  }

  // 分享
  share() {
    this.parentCallback.share();
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
    this.parentCallback.close();
  }
}
