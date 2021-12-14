import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterPageComponent } from './starter-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StarterPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StarterPageComponent,
      },
    ]),
  ],
})
export class StarterPageModule { }
