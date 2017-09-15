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

#### 这是一个很杂的项目 -_-!

- 是ionic和mui的结合体
- 用ionic的框架来构建单页面应用，但是UI框架使用的mui（因为前端妹妹的页面已经写好了）
- 打包不是用的cordova，而是用的mui的html5+plus，据说这个东西很屎，但是没办法，公司技术选型这样。
- 最主要的是因为公司没有Mac,打包测试不方便，只能依托与Hbuilder调试ios（Hbuilder尽管提示多一点，但是还是没有webstorm好用！）

#### 目前存在的几点未知
- 不知道ionic框架下使用依托mui.min.js的组件是否会冲突
- 不知道ionic调用html5plus是否有什么未知问题
- 关于打包，因为使用Hbuilder，不知道原来的配置文件config.xml是否会有冲突，不知道Hbuilder怎么处理npm的依赖

#### 项目概况
- 所有的http请求底层封装在http-ser的provider中
- http没有进行加密。。。这。。。，不说了，全是泪
- 所有的请求没有使用angular默认的 RxJS Observabl，转为更通用的promise来进行链式操作
- 所有的接口统一写在interface-list的provider中,便于集中管理
- 全局变量统一写在app.config.ts中

#### 常见命令
ionic g page YourPageName //创建新页面
ionic g directive YourPageName //创建指令
ionic g component YourComponentName //创建组件
ionic g provider YourProviderName //创建服务
ionic g pipe YourPipeName //创建过滤器

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
4.使用自定义组件component
  - 1.由于现在组件也是懒加载，有自己的module.ts文件，所以可以不用在全局app.module.ts加入，用到在加载
  - 2.在需要使用组件的页面的module.ts文件中引入组件并加入imports数组，
  - 3.即可使用
5.pipe与组件同理
6.provider是在app.module.ts全局加入providers数组中

  
  
  
  
  
