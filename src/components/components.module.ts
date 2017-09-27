import {NgModule} from '@angular/core';
import {PreviewimgComponent} from './previewimg/previewimg';
import {ComponentDemoComponent} from './component-demo/component-demo';
import {MapPositionPickerComponent} from './map-position-picker/map-position-picker';

@NgModule({
    declarations: [PreviewimgComponent,
        ComponentDemoComponent,
        MapPositionPickerComponent],
    imports: [],
    exports: [PreviewimgComponent,
        ComponentDemoComponent,
        MapPositionPickerComponent]
})
export class ComponentsModule {
}
