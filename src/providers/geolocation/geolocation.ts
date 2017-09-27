import {Injectable} from '@angular/core';

/**
 * 定位服务
 */
@Injectable()
export class GeolocationProvider {
  constructor() {
    // console.log('Hello GeolocationProvider Provider');
    this.watchPosition();
  }

  latitude:number;  //十进制数的纬度
  longitude:number; //十进制数的经度

  /**
   * HTML5 Geolocation（地理定位）定位用户的位置
   * Api :  navigator.geolocation.getCurrentPosition(on_success, on_error, options);
   * 1.位置服务用于估计您所在位置的本地网络信息包括：有关可见 WiFi 接入点的信息（包括信号强度）、有关您本地路由器的信息、您计算机的 IP 地址。位置服务的准确度和覆盖范围因位置不同而异。
   * 2.总的来说，在PC的浏览器中 HTML5 的地理位置功能获取的位置精度不够高，如果借助这个 HTML5 特性做一个城市天气预报是绰绰有余，但如果是做一个地图应用，那误差还是太大了。
   * 3.不过，如果是移动设备上的 HTML5 应用，可以通过设置 enableHighAcuracy 参数为 true，调用设备的 GPS 定位来获取高精度的地理位置信息。
   */
  getGeolocation() :any{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.showPosition(position)
      }, (err)=>this.locationError(err), {
        // true获取高精度的位置，默认为false
        enableHighAccuracy: true,
        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        timeout: 5000,
        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        maximumAge: 3000
      });
    }
    else {
      console.log("不支持定位");
    }
  }

  /**
   * 监听地理位置变化
   * Api :  navigator.geolocation.watchPosition(on_success, on_error, options);
   * watchPosition() - 返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）。
   * clearWatch() - 停止 watchPosition() 方法
   * 下面的例子展示 watchPosition() 方法。您需要一台精确的 GPS 设备来测试该例（比如 iPhone）：
   */
  watchPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position)=>{
        this.showPosition(position)
      }, (err)=>this.locationError(err), {
        // true获取高精度的位置，默认为false
        enableHighAccuracy: true,
        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        timeout: 5000,
        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        maximumAge: 3000
      });
    }else{
      console.log("不支持定位");
    }

  }



  /**
   * 参数1 ： 成功回调
   */
  showPosition(position) :any{
    console.log(typeof position.coords.latitude);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }


  /**
   * 参数2： 失败回调
   */
  locationError(error) {
    switch (error.code) {
      case error.TIMEOUT:
        this.showError("A timeout occured! Please try again!");
        break;
      case error.POSITION_UNAVAILABLE:
        this.showError('We can\'t detect your location. Sorry!');
        break;
      case error.PERMISSION_DENIED:
        this.showError('Please allow geolocation access for this to work.');
        break;
      case error.UNKNOWN_ERROR:
        this.showError('An unknown error occured!');
        break;
    }
  }

  showError(err) {
    console.log(err);
  }




}
