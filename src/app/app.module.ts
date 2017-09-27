//引入核心依赖
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
//引入双向绑定，http请求依赖
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

//引入页面组件
import {MyApp} from './app.component';
import {TabsPage} from '../pages/tabs/tabs';

//引入native
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

//引入自定义provider
import {HttpSerProvider} from '../providers/http-ser/http-ser';
import {PopSerProvider} from '../providers/pop-ser/pop-ser';
import {InterfaceListProvider} from '../providers/interface-list/interface-list';
import {GeolocationProvider} from '../providers/geolocation/geolocation';

//引入自定义组件component  （也可以不全局引入，在需要的页面引入需要的组件）
import {ComponentsModule} from '../components/components.module';

//引入自定义过滤器pipe    （也可以不全局引入，在需要的页面引入需要的pipe）


@NgModule({
    declarations: [
        MyApp,
        TabsPage,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ComponentsModule,
        //第二个参数是个对象，表示全局配置
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        // {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpSerProvider,
        PopSerProvider,
        InterfaceListProvider,
        GeolocationProvider
    ]
})
export class AppModule {
}
