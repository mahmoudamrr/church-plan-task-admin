import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongFormComponent } from './song-form.component';

const routes: Routes = [
  { path: '', component: SongFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsFormRoutingModule { }
