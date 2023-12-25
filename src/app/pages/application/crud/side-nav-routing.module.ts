import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavComponent } from './side-nav.component';

const routes: Routes = [
  {
    path: '',
    component: SideNavComponent,
    children: [
      {
        path: 'songs',
        loadChildren: () =>
          import('./pages/songs/songs.module').then((mod) => mod.SongsModule),
      },
      {
        path: 'artist',
        loadChildren: () =>
          import('./pages/artist/artist.module').then(
            (mod) => mod.ArtistModule
          ),
      },
      {
        path: 'albums',
        loadChildren: () =>
          import('./pages/album-images/album-images.module').then(
            (mod) => mod.AlbumsImagesModule
          ),
      },
      {
        path: 'albums/:id',
        loadChildren: () =>
          import('./pages/album-form/album-form.module').then(
            (mod) => mod.AlbumsFormModule
          ),
      },
      {
        path: 'artist/:id',
        loadChildren: () =>
          import('./pages/artist-form/artist-form.module').then(
            (mod) => mod.ArtistFormModule
          ),
      },
      {
        path: 'song/:id',
        loadChildren: () =>
          import('./pages/song-form/song-form.module').then(
            (mod) => mod.SongFormModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/album-images/album-images.module').then(
            (mod) => mod.AlbumsImagesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideNavRoutingModule {}
