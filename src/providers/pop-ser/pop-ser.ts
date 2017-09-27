import {Injectable} from '@angular/core';
import {LoadingController, AlertController, ModalController, ToastController} from 'ionic-angular';

/*
  Generated class for the PopSerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/**
 *  遮罩层服务
 *
 */
@Injectable()
export class PopSerProvider {
    private load: any;
    constructor(public loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController) {
        console.log('PopSerProvider Provider');
    }

    /**
     * alert弹窗
     * http://ionicframework.com/docs/api/components/alert/AlertController/
     */
    alert(content, callback = () => {
    }) {
        let alert = this.alertCtrl.create({
            title: '<span>提示</span>',
            message: '<div>' + content + '</div>',
            enableBackdropDismiss: false,
            cssClass: '',
            buttons: [
                {
                    text: "好的",
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (callback != undefined && callback != null && typeof callback == 'function') {
                            callback();
                        }
                    }
                }]
        });
        alert.present();
    }

    /**
     * 自定义alert弹窗-
     */
    alertDIY(obj, ok_callback: any = () => {
    }) {
        let confirm_diy = this.alertCtrl.create({
            title: obj.title || '<div class="content_img">提示</div>',
            subTitle: obj.subTitle,
            message: obj.content,
            cssClass: obj.cssClass,
            enableBackdropDismiss: false,  //是否点击背景关闭弹窗
            buttons: [
                {
                    text: obj.okText || '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }

    /**
     * confirm确认框
     */
    confirm(content, ok_callback = () => {
    }) {
        let alert = this.alertCtrl.create({
            title: '<div class="content_img">提示</div>',
            subTitle: '',
            message: content,
            cssClass: '',
            enableBackdropDismiss: false,  //是否点击背景关闭弹窗
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                },
                {
                    text: '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    /**
     * 自定义confirm确认框
     */
    confirmDIY(obj, esc_callback: any = () => {
    }, ok_callback: any = () => {
    }) {
        let confirm_diy = this.alertCtrl.create({
            title: obj.title || '<div class="content_img"><img  src="assets/img/use_over.png" class="img"/></div>',
            subTitle: obj.subTitle || '',
            cssClass: obj.cssClass || '',
            message: '<div>' + obj.content + '</div>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: obj.escText || '取消',
                    handler: () => {
                        if (esc_callback != undefined && esc_callback != null && typeof esc_callback == 'function') {
                            esc_callback();
                        }
                    }
                },
                {
                    text: obj.okText || '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }


    /**
     * toast短暂提示   (支持自定义)
     * http://ionicframework.com/docs/api/components/toast/ToastController/
     * @param {string} content
     * @param {string} position    //"top", "middle", "bottom".
     * @param {string} cssClass
     * @param {number} duration
     */
    toast(content:string,position:string='bottom',cssClass:string='',duration:number=3000) {
        let toast = this.toastCtrl.create({
            message: content,
            duration: 3000,
            position: position,     //"top", "middle", "bottom".
            cssClass: cssClass,
            showCloseButton: false,
            closeButtonText: "关闭",
            dismissOnPageChange: false,     //当页面变化时是否dismiss
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }

    /**
     * 拨打号码弹窗
     */
    callPop(obj, esc_callback: any = () => {
    }, ok_callback: any = () => {
    }) {
        setTimeout(() => {//延迟几秒可以等html反应，这样获取的高度才准确
            let test = document.getElementsByClassName("pop_btn")[0];
            test.innerHTML = "<a href='tel:" + obj.tel + "'> 继续呼叫 </a>";
        }, 3);
        let confirm_diy = this.alertCtrl.create({
            title: obj.title || '<div class="content_img"><img  src="assets/img/use_over.png" class="img"/></div>',
            subTitle: obj.subTitle,
            cssClass: "call",
            message: '<div>' + obj.content + '</div>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: obj.escText || '取消',
                    handler: () => {
                        if (esc_callback != undefined && esc_callback != null && typeof esc_callback == 'function') {
                            esc_callback();
                        }
                    }
                },
                {
                    text: obj.okText || '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }

    /**
     * loading加载动画
     * http://ionicframework.com/docs/api/components/loading/LoadingController/
     * @param {string} op       // 取值：open hide
     * @param {string} content
     * @param {string} spinner    动画SVG  // 取值：ios ios-small bubbles circles crescent dots
     * @param {string} css
     * @param {boolean} showBackdrop    是否有黑色遮罩
     */
    loading(op:string, content: string ='', spinner:string='ios-small',css: string='',showBackdrop:boolean=true) {
        if (op == 'hide') {
            if (this.load) {
                this.load.dismiss();
            }
        } else {
            this.load = this.loadingCtrl.create({
                spinner: spinner,
                content:content,
                cssClass: css,
                showBackdrop:showBackdrop,      //是否有黑色遮罩
                enableBackdropDismiss:false,
                dismissOnPageChange:false,
                // duration:3000
            });
            this.load.present();
            setTimeout(() => {
                this.load.dismiss();
            }, 10000);
        }
        this.load.onDidDismiss(() => {
            console.log('Dismissed loading');
        });
    }


}
