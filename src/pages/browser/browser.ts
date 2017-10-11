import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController} from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";
import { BrowserPopoverPage } from "./browser-popover";

/**
 * Generated class for the BrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html',
})
export class BrowserPage {
  browser: any = {
    isLoaded: false, // 网页是否被加载
    proObj: null, // 进度条对象
    progress: 0, // 网页访问的进度条
    secUrl: '', // 安全链接

    title: '加载中',
    url: '',
    share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
  };

  shareConfig: any = {
    isShow: true
  }; // 分享控制的配置

  constructor(public navCtrl: NavController,
              private params: NavParams,
              private sanitizer: DomSanitizer,
              private popoverCtrl: PopoverController) {
    let browser = this.params.get('browser');
    if(browser) {
      this.browser.title = browser.title;
      this.browser.url = browser.url;
     // Angular 2 在编译的时候，会自动清理 HTML 输入并转义不安全的代码，因此在这种情况下，脚本不会运行，只能在屏幕上显示为文本。
      // iframe 的 src 属性是资源 URL 安全上下文，因为不可信源可以在用户不知情的情况下执行某些不安全的操作。但如果我们确认资源的 URL 是安全的，可以使用 Angular 2 中提供的 DomSanitizer 服告知 Angular 该 URL 地址是安全的
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(browser.url);

      if(browser.share) {
        this.browser.share = browser.share;
      }

    } else {
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browser.url);
    }
    this.reload();
  }

  ionViewDidLoad() {
    if(!this.browser.proObj) {
      this.browser.proObj = document.getElementById('progress');
    }
    this.onprogress();
  }

  // 生成随机数
  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 网页访问进度
  private onprogress() {
    // 随机时间
    let timeout = this.random(10, 30);

    let timer = setTimeout(() => {
      if(this.browser.isLoaded) {
        this.browser.proObj.style.width = '100%';
        clearTimeout(timer);
        return;
      }

      // 随机进度
      this.browser.progress += this.random(1, 5);

      // 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
      if(this.browser.progress > 90){
        this.browser.progress = 90;
      }

      this.browser.proObj.style.width = this.browser.progress + '%';
      this.onprogress();
    }, timeout);
  }

  // 如果iframe页面加载成功后
  loaded() {
    this.browser.isLoaded = true;
  }

  // 显示Popver选项
  presentPopover(myEvent) {
    let cb = {
      refresh: () => {
        this.reload();
      },
      close: () => {
        this.navCtrl.pop();
      },
      share: null
    };

    if(this.browser.share) {
      cb.share = () => {
        this.share();
      }
    }

    let popover = this.popoverCtrl.create('BrowserPopoverPage', {
      callback: cb
    });
    popover.present({
      ev: myEvent
    });
  }

  // 重新加载页面
  reload() {
    let title = this.browser.title;
    let url = this.browser.secUrl;
    this.browser.title = '加载中';
    this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

    setTimeout(() => {
      this.browser.isLoaded = false;
      this.browser.progress = 0;
      if(!this.browser.proObj) {
        this.browser.proObj = document.getElementById('progress');
      }
      this.onprogress();
      this.browser.title = title;
      this.browser.secUrl = url;
    }, 10);
  }

  // 分享页面（作为popover的回调）
  share() {
    this.shareConfig.isShow = true;
    /*if(this.browser.share) {
     SocialSharing.share(this.browser.share.title, this.browser.share.content, '', this.browser.share.url).then(() => {

     }, (err) => {
     // Error!
     alert('错误：分享失败！' + err);
     });
     }*/
  }
}
