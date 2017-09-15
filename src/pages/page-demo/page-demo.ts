/**
 *   新建页面demo样本
 *  - demo页面会引入democomponent教程
 *  - demo页面会引入demoprovider教程
 *  - demo页面会引入demopipe教程
 *  - demo页面会引入第三方js教程，如jquery
 */

//引入需要的框架核心
import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 *   引入自定义组件component
 *  1. 先新建组件component
 *      ionic g component component-demo
 *  2. 在使用的页面的module中引入，例如这个页面，在 page-demo.module.ts 文件中引入
 *      import { ComponentsModule } from '../../components/components.module';
 *  3. 在 page-demo.module.ts 文件中 @NgModul e的 imports 数组中添加
 *      ComponentsModule,
 *  4. 在html页面中使用
 *        <component-demo></component-demo>
 *  5. 关于父子组件之间的传值参考 案例组件 component-demo， 主要用到的修饰器   @Input() ，@Output
 *        @Input() 用于父亲向儿子传递数据
 *        @Output() 用于儿子向父亲传递事件
 */

/**
 *  引入第三方js教程，如jquery
 *  1. 先在入口index.html文件引入js
 *      <script src="assets/js/jquery-1.7.2.js"></script>
 *  2. 在使用的页面申明
 *      declare var $: any;
 *  3. 直接使用
 */
declare var $: any;


@IonicPage()
@Component({
  selector: 'page-page-demo',
  templateUrl: 'page-demo.html',
})
export class PageDemoPage {

  name: string = 'wang';
  sonToFaterData: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.jqueryDemo();


  }


  //使用jquery的案例
  jqueryDemo() {
    $('.jqueryClass1').on('click', () => {
      $(this).html('jquery button click');
      $(this).css('color', 'red');
      console.log('click');
    });
    $('.jqueryClass2').on('click', function () {
      $(this).html('jquery button click');
      $(this).css('color', 'red');
      console.log('click');
    });
  }


  toSonData(){
    this.name='你好 世界';
  }

  //子组件事件传递给父亲，父亲接受的事件回调
  sonToFaterEventCallback(e) {
    console.log(e.sonToFaterData);  //儿子传过来事件的参数
    this.sonToFaterData = e.sonToFaterData;
  }


  openBrower(){
    this.navCtrl.push('BrowserPage', {
      browser: {
        title: '页面名称',
        // url: '这里放置访问的页面链接'
        url: 'https://www.baidu.com'
      }
    });
  }

}
