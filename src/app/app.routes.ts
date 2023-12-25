import { Routes } from '@angular/router';
import { SideNavComponent } from './pages/application/crud/side-nav.component';
import { NotFoundComponent } from './pages/general/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: SideNavComponent, canActivate: [AuthGuard] },

  {
    path: 'lists',
    loadChildren: () =>
      import('./pages/application/crud/side-nav.module').then(
        (mod) => mod.SideNavModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/application/crud/pages/auth/login/login.module').then(
        (mod) => mod.LoginModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/application/crud/pages/auth/signup/signup.module').then(
        (mod) => mod.SignupModule
      ),
  },

  { path: '**', component: NotFoundComponent },
];
