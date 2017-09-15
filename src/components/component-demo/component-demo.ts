import { Component ,Input ,Output ,EventEmitter  } from '@angular/core';

/**
 *  自定义组件demo
 *
 *  1. 父亲向儿子传递数据
 *     @Input()
 *
 *  2. 儿子向父亲传递事件
 *     @Output()
 */
@Component({
  selector: 'component-demo',
  templateUrl: 'component-demo.html'
})
export class ComponentDemoComponent {

  //这个案例中，父组件向儿子传递了一个数据，这个数据被绑定到儿子的 fatherToSonData 属性中
  @Input('fatherToSonData') fatherToSonData :string;

  //向外传递的事件
  @Output() parentClick = new EventEmitter();

  //儿子独立作用域中的属性
  text: string;

  constructor() {
    // console.log('Hello ComponentDemoComponent Component');
    this.text = 'Hello World';
  }

  //儿子的点击事件
  sonClick(){
    console.log('son click');
    this.parentClick.emit(
      {
        sonToFaterData: '我是子元素传递回去事件的参数',
      })
  }

}
