import { NgModule } from '@angular/core';
import { PipeDemoPipe } from './pipe-demo/pipe-demo';
@NgModule({
	declarations: [PipeDemoPipe],
	imports: [],
	exports: [PipeDemoPipe]
})
export class PipesModule {}
