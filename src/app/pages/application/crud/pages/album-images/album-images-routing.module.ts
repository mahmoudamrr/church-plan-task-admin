import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsImagesComponent } from './album-images.component';

const routes: Routes = [{ path: '', component: AlbumsImagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsImagesRoutingModule {}
