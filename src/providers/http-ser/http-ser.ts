import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * HTTP请求服务
 */
@Injectable()
export class HttpSerProvider {

    constructor(public http: Http) {
        // console.log('Hello HttpSerProvider Provider');
    }

    /**
     * get方式请求
     * @param {string} url     //url
     * @param paramObj      //json对象 如:{name:'大见',age:'23'}
     * @return {Promise<never | {}>}
     */
    get(url:string, paramObj:any = {}) {
        let timestamp = Math.floor(new Date().getTime() / 1000 - 1420070400).toString();    //获取当前时间 减 2015年1月1日的 时间戳
        let headers = new Headers({'timestamp': timestamp});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url + this.toQueryString(paramObj),options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    /**
     * post方式请求
     * @param {string} url
     * @param body       //如：paramObj:{name:'大见',age:'23'}
     * @param {string} contentType      //post请求的编码方式  application/x-www-form-urlencoded  multipart/form-data   application/json   text/xml
     * @return {Promise<never | {}>}
     */
    post(url:string, body:any = {}, contentType:string="application/x-www-form-urlencoded") {
        let headers = new Headers({'Content-Type':contentType});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, this.toBodyString(body),options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }



    /**
     * get请求参数处理
     *  对于get方法来说，都是把数据串联在请求的url后面作为参数，如果url中出现中文或其它特殊字符的话，很常见的一个乱码问题就要出现了
     *  url拼接完成后，浏览器会对url进行URL encode，然后发送给服务器，URL encode的过程就是把部分url做为字符，按照某种编码方式（如：utf-8,gbk等）编码成二进制的字节码
     * 不同的浏览器有不同的做法，中文版的浏览器一般会默认的使用GBK，通过设置浏览器也可以使用UTF-8，可能不同的用户就有不同的浏览器设置，也就造成不同的编码方式，
     * 所以通常做法都是先把url里面的中文或特殊字符用 javascript做URL encode，然后再拼接url提交数据，也就是替浏览器做了URL encode，好处就是网站可以统一get方法提交数据的编码方式。
     * @param obj　参数对象
     * @return {string}　参数字符串
     * @example
     *  声明: var obj= {'name':'大见',age:23};
     *  调用: toQueryString(obj);
     *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
     */
    private toQueryString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return '?' + ret.join('&');
    }

    /**
     *  post请求参数处理
     * @param obj
     * @return {string}
     *  声明: var obj= {'name':'大见',age:23};
     *  调用: toQueryString(obj);
     *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
     */
    private toBodyString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            // key = key;
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }

    private toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        // return key + '=' +(value === null ? '' : String(value));
    }

    private toSignPair(key, value) {
        return key + '=' + (value === null ? '' : String(value));
    }

    private extractData(res:Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error:Response | any) {
        let errMsg:string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }



}
