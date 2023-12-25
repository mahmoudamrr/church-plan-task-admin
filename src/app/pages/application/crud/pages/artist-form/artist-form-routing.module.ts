import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistFormComponent } from './artist-form.component';

const routes: Routes = [
  { path: '', component: ArtistFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistFormRoutingModule { }
