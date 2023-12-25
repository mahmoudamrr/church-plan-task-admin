import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistComponent } from './artist.component';
import { ArtistRoutingModule } from './artist-routing.module';

import { GridModule } from '../../components/grid/grid.module';
import { PaginationModule } from '../../components/pagination/pagination.module';
import { SearchBarModule } from '../../components/search-bar/search-bar.module';
import { SearchResultModule } from '../../components/search-result/search-result.module';

@NgModule({
  declarations: [ArtistComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    GridModule,
    PaginationModule,
    SearchBarModule,
    SearchResultModule,
  ],
  exports: [ArtistComponent],
})
export class ArtistModule {}
