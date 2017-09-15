import { Component } from '@angular/core';

/**
 * Generated class for the PreviewimgComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'previewimg',
  templateUrl: 'previewimg.html'
})
export class PreviewimgComponent {

  text: string;

  constructor() {
    console.log('Hello PreviewimgComponent Component');
    this.text = 'Hello World';
  }

}
