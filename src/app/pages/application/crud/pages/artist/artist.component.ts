import { Component } from '@angular/core';
import { Injector } from '@angular/core';

import { PageListComponent } from '../../components/page-list/page-list.component';

@Component({
  selector: 'app-movies',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent extends PageListComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  override initialize(): void {
    this.endpoint = 'artist';
    this.link = 'artist';
    this.placeholder = 'artist...';
    this.results = 'Artist';
    this.found = 'artist';
    this.creation = 'Artist';
    this.loaded = false;
    this.icon = 'fas fa-film';
    this.itemsCount = 0;
    this.itemsPerPage = 10;
    this.linkRoute = 'artist';

    this.columns = [
      {
        type: 'text',
        title: {
          caption: 'Id',
          class:
            'text-info font-weight-bold text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell',
        },
        data: {
          field: 'id',
          class:
            'text-info text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell',
        },
      },
      {
        type: 'text',
        title: { caption: 'first name', class: 'text-center text-success' },
        data: { field: 'first_name', class: 'text-center text-success' },
      },
      {
        type: 'text',
        title: { caption: 'last name', class: 'text-center text-success' },
        data: { field: 'last_name', class: 'text-center text-success' },
      },
      {
        type: 'img',
        title: { caption: 'image', class: 'text-center text-success' },
        data: { field: 'profile_picture', class: 'text-center text-success' },
      },
    ];

    super.initialize();
  }

  createItem(): void {
    this.router.navigate(['/lists/artist/0']);
  }
}
