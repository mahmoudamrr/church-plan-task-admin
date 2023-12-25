import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsImagesComponent } from './album-images.component';
import { AlbumsImagesRoutingModule } from './album-images-routing.module';

import { GridImagesModule } from '../../components/grid-images/grid-images.module';
import { PaginationModule } from '../../components/pagination/pagination.module';
import { SearchBarModule } from '../../components/search-bar/search-bar.module';
import { SearchResultModule } from '../../components/search-result/search-result.module';

@NgModule({
  declarations: [AlbumsImagesComponent],
  imports: [
    CommonModule,
    AlbumsImagesRoutingModule,
    GridImagesModule,
    PaginationModule,
    SearchBarModule,
    SearchResultModule,
  ],
  exports: [AlbumsImagesComponent],
})
export class AlbumsImagesModule {}
