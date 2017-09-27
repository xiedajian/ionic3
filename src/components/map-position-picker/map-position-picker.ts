import {Component, EventEmitter, Output} from '@angular/core';

declare var AMap: any;
declare var AMapUI: any;

import {MapPositionModel} from '../../model/mapPositionModel';

/***
 *  高德地图 - 地图选点反推地址组件
 *  1. 组件依赖高德官方两个js，在入口文件index.html引入
 *    <!--高德地图JavaScript API入口脚本-->
 *    <script src="http://webapi.amap.com/maps?v=1.4.0&key=7c24ba9bd6a0b7b95d70ec6919e30c34&plugin=AMap.ToolBar"></script>
 *    <!-- 高德地图UI组件库 1.0 -->
 *   <script src="//webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
 */

@Component({
    selector: 'map-position-picker',
    templateUrl: 'map-position-picker.html'
})
export class MapPositionPickerComponent {
    @Output() outputPosition: EventEmitter<any> = new EventEmitter();
    loaded: boolean = false;
    //所选点
    position: MapPositionModel;
    //替补点
    alternate: Array<MapPositionModel> = [];

    constructor() {
        console.log('Hello MapPositionPickerComponent Component');
        //初始化地图
        this.initMap();
    }

    //初始化地图
    initMap() {
        AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
            // 1.制作地图
            var map = new AMap.Map('container', {
                zoom: 13,
                // 地图是否可通过鼠标滚轮缩放浏览，默认为true
                scrollWheel: false,
                // center:[],
            })

            // 2.定位当前位置，并添加标记到当前地图,把位置作为地图中心点
            map.plugin('AMap.Geolocation', () => {
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                //定位成功
                AMap.event.addListener(geolocation, 'complete', (data) => {
                });
                //定位失败
                AMap.event.addListener(geolocation, 'error', (err) => {
                    console.log(err)
                });
            });


            // 3.地图拖动选址
            var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
            });
            positionPicker.on('success', (positionResult) => {
                // console.log(positionResult);

                this.position = {
                    address: positionResult.address,
                    location: positionResult.position,
                };
                this.alternate =positionResult.regeocode.pois;
                this.loaded = true;
                //向父元素传播事件
                this.outputPosition.emit({
                    firstPosition:this.position,
                    morePostion:this.alternate,
                });
            });
            positionPicker.on('fail', (positionResult) => {
                console.log('定位失败');
            });
            //开始选点
            positionPicker.start();
            map.panBy(0, 1);
            positionPicker.setMode('dragMap');

            map.addControl(new AMap.ToolBar({
                liteStyle: true
            }))
        });
    }

    //地图定位
    mapGeolocation(successCallback) {

    }

    //地图定位成功回调
    mapGeolocationSuccessCallback(data) {
        console.log('定位当前位置成功');
        console.log('经度：' + data.position.getLng());
        console.log('纬度：' + data.position.getLat());
        if (data.accuracy) {
            console.log('精度：' + data.accuracy + ' 米');
        }
        //如为IP精确定位结果则没有精度信息
        console.log('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    }

    //地图定位出错回调
    mapGeolocationErrorCallback(error) {
        console.log('定位失败', error);
    }

}
