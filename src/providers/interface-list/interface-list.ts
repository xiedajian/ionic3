import { Injectable } from '@angular/core';
import { HttpSerProvider } from '../http-ser/http-ser';
import {APP_SERVE_URL} from '../../app/app.config';

/**
 * App接口列表
 */
@Injectable()
export class InterfaceListProvider {

  constructor(private httpser:HttpSerProvider) {
    console.log('Hello InterfaceListProvider Provider');
  }
  /**
   *  接口测试
   * @param   data:{version:1}
   * @returns Promise
   */
  httpTset() {
    let url = APP_SERVE_URL + "/userLoginRegisterjfsc/selecIntegralApi";
    return this.httpser.get(url, {userId:1});
  }




}
