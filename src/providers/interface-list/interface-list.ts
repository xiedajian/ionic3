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
   *  4.1	App版本检测接口
   * @param   data:{version:1}
   * @returns Promise
   */
  AppVersionCheck() {
    let url = APP_SERVE_URL + "/userLoginRegisterjfsc/selecIntegralApi";
    return this.httpser.get(url, {userId:1});
  }




}
