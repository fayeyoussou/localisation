import { Routes } from '@angular/router';
import {MapComponent} from "./pages/map/map.component";
import {ChildComponent} from "./pages/child/child.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {path : 'map',component:MapComponent},
  {path : 'child',component:ChildComponent},

  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];
