import { Component,Input } from '@angular/core';

/**
 * Generated class for the PanelShareComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'panel-share',
  templateUrl: 'panel-share.html'
})
export class PanelShareComponent {

  @Input() share;

  constructor() {
    console.log('Hello PanelShareComponent Component');
  }

  exit(){

  }
}
