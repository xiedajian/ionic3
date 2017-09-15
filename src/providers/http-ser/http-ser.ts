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
   * @param   url：string　 paramObj:{name:'大见',age:'23'}
   * @returns Promise
   */
  get(url:string, paramObj:any = {}) {
  let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url + this.toQueryString(paramObj),options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  /**
   * post方式请求
   * @param   url：string　 paramObj:{name:'大见',age:'23'}
   * @returns Promise application/x-www-form-urlencoded
   */
  post(url:string, body:any = {}, contentType:string="application/x-www-form-urlencoded") {
    return this.http.post(url, this.toBodyString(body))
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }



  /**
   * get请求参数处理
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
