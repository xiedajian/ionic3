This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

#### 项目概况
- 所有的http请求底层封装在http-ser的provider中
- http没有进行加密。。。
- 所有的请求没有使用angular默认的 RxJS Observabl，转为更通用的promise来进行链式操作
- 所有的接口统一写在interface-list的provider中,便于集中管理
- 全局变量统一写在app.config.ts中
- 组件demo，pipedemo，providerdemo都有，可以参考
- 可以在根组件添加全局安卓物理返回键箭头


#### 常见命令
ionic help <command>
ionic info

ionic start appName

npm install --save-dev --save-exact @ionic/cli-plugin-ionic-angular@latest
npm install --save-dev --save-exact @ionic/cli-plugin-cordova@latest

ionic g page YourPageName //创建新页面
ionic g directive YourPageName //创建指令
ionic g component YourComponentName //创建组件
ionic g provider YourProviderName //创建服务
ionic g pipe YourPipeName //创建过滤器

ionic serve
ionic build
ionic cordova plugins <action> <platform>
ionic cordova emulate <platform>
ionic cordova run <platform>
ionic cordova add platform android
ionic cordova remove platform android
ionic cordova build android --prod --release

#### 初始化项目步骤
1.项目需要进行http请求，以及双向绑定，需要在app.module.ts引入下面核心包
  import { BrowserModule } from '@angular/platform-browser';
  import { HttpModule} from '@angular/http';
2.加入到app.module.ts的imports数组中
      BrowserModule,
      HttpModule,
3.封装http请求，转为promise
  在封装的http-ser,provider中引入toPromise的raxjs，
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/toPromise';
  然后在请求后
  http.get().toPromise()
4.项目的全局配置在app.module.ts的imports数组中的 IonicModule.forRoot的第二个参数
    IonicModule.forRoot(MyApp,{
      
    })
4.使用自定义组件component
  - 1.由于现在组件也是懒加载，有自己的module.ts文件，所以可以不用在全局app.module.ts加入，用到在加载
  - 2.在需要使用组件的页面的module.ts文件中引入组件并加入imports数组，
  - 3.即可使用
5.pipe与组件同理
6.provider是在app.module.ts全局加入providers数组中

  
  
  
  
  
