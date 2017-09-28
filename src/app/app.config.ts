/**
 * 请求地址头
 */
// 测试环境
// export const APP_SERVE_URL:string = 'http://192.168.1.88/v1';
// export const APP_SERVE_URL:string = 'http://kmf.dev.ipvp.cn/v1';
// 生产环境
export const APP_SERVE_URL:string = 'http://118.190.150.148:9001/jfsc';
//AES加密key
export const AES_key:string =")O[NB]6,YF}+efcaj{+oESb9d8>Z'e9M";
/**
 * App配置信息
 */
export class AppConfig {
    static PCmodel:boolean = false;        //PC端调试模式
    static Appmodel:number=3;             //1首次启动  2.今日首次启动 3普通模式启动
    //设备信息
    static deviceId:string = '';          //设备id
    static deviceCordova:string = '';          //设备上运行的Cordova版本
    static deviceModel:string = '';           //设备型号或产品的名称
    static devicePlatform:string = '';          //操作系统名称
    static devicePlatformVersion:string = '';          //操作系统版本
    static deviceManufacturer:string = '';          //设备的制造商
    static deviceSerial:string = '';          //设备硬件序列号
    //APP信息
    static platform:string = '';          // android  ios
    static appName:string = 'CRM_KmfApp';           //CRM_KmfApp
    static appVersion:string = '2.0.2';        //版本号 2.0.2
    //常规配置
    static userProtocol:string = '';      //用户协议
    //导购用户信息
    static userName:string = '';          //账号名
    static token:string = '';             //token
    static userInfo:any = {};             //用户信息
    //导购配置信息
    static callingType:number = 2;        //通话方式      [1,2,3] 1免费 2普通  3两者
    static inited:boolean=true;              //系统是否可用 (指该执行人员归属的数据是否准备完毕)
    static balanceMinute:number = 0;      //剩余通话分钟数
    static showCustomerPhone:boolean=false;   //是否显示会员电话号码（导购可见）
    //授权信息
    static expireDate:any = '2018.01.01';           //APP到期日期
    //极光推送
    static jPushRegistrationId:string='';            //极光的注册id;
    static jPushAlias:string='';                //极光的别名;
    static jPushTags:string='';                //极光的标签;


    //获取设备高度
    public static getWindowHeight() {
        return window.screen.height;
    }

    //获取设备宽度
    public static getWindowWidth() {
        return window.screen.width;
    }

    //获取设备屏幕分辨率
    public static getFenbianlv() {
        let x=window.screen.width * window.devicePixelRatio;
        let y=window.screen.height * window.devicePixelRatio;
        return [x,y];
    }
    //获取通话方式
    public static getCallingType():number {
        return this.callingType ;
    }

    //获取系统是否可用  不可用返回false
    public static getInited():boolean {
        return this.inited;
    }

    //获取剩余通话分钟数
    public static getBalanceMinute():number {
        return this.balanceMinute ;
    }

    //获取本地时间  格式：2017-01-03
    public static getLocalTime() {
        let date = new Date();
        let month:any = date.getMonth() + 1;
        let strDate:any = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let dd:string = date.getFullYear() + "-" + month + "-" + strDate;
        return dd;
    }

    //获取本地时间  格式：20170103
    public static getLocalTime2() {
        let date = new Date();
        let month:any = date.getMonth() + 1;
        let strDate:any = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let dd:string = date.getFullYear() + "" + month + "" + strDate;
        return dd;
    }

    //判断系统是否到期  超期返回true
    public static getIsExpired():boolean {
        if(!this.expireDate){
            return true;
        }
        var DateTwo = this.expireDate;
        var myDate = new Date();
        var DateOne = myDate.toLocaleDateString();
        var TwoMonth = DateTwo.substring(5, 7);
        var TwoDay = DateTwo.substring(8, 10);
        var TwoYear = DateTwo.substring(0, 4);
        var cha = ((Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear) - Date.parse(DateOne)) / 86400000);
        return (cha < 0) ? true : false;
    }

    //获取token
    public static getToken():string {
        return this.token || '';
    }

    //获取平台  ios android  none（小写）
    public static getPlatform():string {
        return this.platform || '';
    }

    //获取设备id
    public static getDeviceid():string {
        return this.deviceId || '';
    }

    //获取App名称
    public static getAppName():string {
        return this.appName || '';
    }

    //获取App版本号  数字 2000001
    public static getAppVersion():any {
        let version = this.appVersion || '';
        let t:any = version.split('.');
        let num:number = parseInt(t[0]) * 1000000 + parseInt(t[1]) * 1000 + parseInt(t[2]);
        return num || '';
    }

    //获取账号
    public static getuserName():string {
        return this.userName || '';
    }

    //获取用户信息
    public static getUserInfo() {
        let userInfo = {
            userId: 0, //用户Id
            uuid: 0, //全局用户Id
            userName: '',
            token: '',
            orgId: 0,  //会员组织机构Id
            name: '',  //会员名称
            mobile: '' //执行人员的联系方式
        };
        return this.userInfo || userInfo;
    }

    //去字符串两侧空格
    public static trim(str) {
        return str.replace(/(^s*)|(s*$)/g, "");
    }

    public static getTestCount(){
        let x=Math.floor((Math.random()*4));
        let cc:any={
            name:'测试号:谢大见',
            number:'18558756920',
        };
        if(x===0){
            cc={
                name:'测试号0:赵',
                number:'15306907390',
            }
        }else if (x==1){
            cc={
                name:'测试号1:林',
                number:'13459202232',
            }
        }else if (x==2){
            cc={
                name:'测试号2:袁',
                number:'18221612515',
            }
        }else if (x==3){
            cc={
                name:'测试号3:詹',
                number:'18250347781',
            }
        }else if (x==4){
            cc={
                name:'测试号4:阳阳',
                number:'15060067536',
            }
        }
        return cc;
    }

    //正则，不能输入表情
    public static RegExp(str,event) {
        let regex=/[^\a-zA-Z0-9\u4E00-\u9FA5]/g;
        if(regex.test(str)){
            str = str.replace(regex, "");
            event.target.value=str;//显示文本替换掉
           return false;
        }
    }

    // 正则，不能输入表情和中文
    public static RegExpCn(str) {
        let regex=/[^\a-zA-Z0-9\|\$\(\)\*\+\.\[\]\?\\\/\^\{\}\-~`!@#%&_=,<>;:'"]/g;
        if(regex.test(str)){
            // str = str.replace(regex, "");
            // event.target.value=str;//显示文本替换掉
            return true;
        }
    }


}

