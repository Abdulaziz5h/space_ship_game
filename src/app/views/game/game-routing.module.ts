import { Routes } from '@angular/router';

import { GameComponent } from '../../controller/game.component';
import { StarterPageComponent } from 'src/app/controller/starter-page.component';
import { EndPageComponent } from 'src/app/controller/end-page.component';

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
