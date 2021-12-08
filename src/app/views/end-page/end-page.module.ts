import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndPageComponent } from '../../controller/end-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EndPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EndPageComponent,
      },
    ]),
  ],
})
export class EndPageModule { }
