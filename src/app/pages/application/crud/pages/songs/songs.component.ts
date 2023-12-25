import { Component } from '@angular/core';
import { Injector } from '@angular/core';

import { PageListComponent } from '../../components/page-list/page-list.component';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent extends PageListComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  override initialize(): void {
    this.endpoint = 'song';
    this.link = 'song';
    this.placeholder = 'songs...';
    this.results = 'Songs';
    this.found = 'songs';
    this.creation = 'Song';
    this.loaded = false;
    this.icon = 'fas fa-laptop';
    this.itemsCount = 0;
    this.itemsPerPage = 5;
    this.linkRoute = 'songs';

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
        title: {
          caption: 'Name',
          class: 'text-primary font-weight-bold text-center',
        },
        data: {
          field: 'name',
          class: 'text-primary font-weight-bold text-center',
        },
      },
      {
        type: 'text',
        title: { caption: 'duration', class: 'font-weight-bold text-center' },
        data: { field: 'duration', class: 'font-weight-bold text-center' },
      },
    ];

    super.initialize();
  }

  createItem(): void {
    this.router.navigate(['/lists/song/0']);
  }
}
