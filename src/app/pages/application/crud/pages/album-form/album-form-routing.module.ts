import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsFormComponent } from './album-form.component';

const routes: Routes = [
  { path: '', component: AlbumsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsFormRoutingModule { }
