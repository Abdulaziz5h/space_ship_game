import { Routes } from '@angular/router';
import { _404Error } from './error/404-error';

export const routes: Routes = [
  {
    path: '',
    // component: GameComponent,
    loadChildren: () => import('./views/starter-page/starter-page.module').then(c => c.StarterPageModule),
    pathMatch: 'full'
  },
  {
    path: 'start',
    // component: GameComponent,
    loadChildren: () => import('./views/game/game.module').then(c => c.GameModule),
  },
  {
    path: 'end',
    // component: GameComponent,
    loadChildren: () => import('./views/end-page/end-page.module').then(c => c.EndPageModule),
  },
  {
    path: "**",
    component: _404Error
  }
];
