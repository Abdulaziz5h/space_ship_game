import { Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { StarterPageComponent } from './../starter-page/starter-page.component';
import { EndPageComponent } from './../end-page/end-page.component';

export const routes: Routes = [
  {
    path: '',
    component: StarterPageComponent,
    children: [
      {
        path: '/start',
        component: GameComponent,
      },
      {
        path: '/end',
        component: EndPageComponent,
      },
    ],
  },
];

export const components = [
  GameComponent,
  StarterPageComponent,
  EndPageComponent,
];
