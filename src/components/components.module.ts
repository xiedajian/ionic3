import { NgModule } from '@angular/core';
import { PreviewimgComponent } from './previewimg/previewimg';
import { ComponentDemoComponent } from './component-demo/component-demo';
@NgModule({
	declarations: [PreviewimgComponent,
    ComponentDemoComponent],
	imports: [],
	exports: [PreviewimgComponent,
    ComponentDemoComponent]
})
export class ComponentsModule {}
