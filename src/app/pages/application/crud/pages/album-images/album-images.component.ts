import { Component, OnInit, Injector } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PageListComponent } from '../../components/page-list/page-list.component';

@Component({
  selector: 'app-album-images',
  templateUrl: './album-images.component.html',
  styleUrls: ['./album-images.component.css'],
})
export class AlbumsImagesComponent extends PageListComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    injector: Injector
  ) {
    super(injector);
  }

  override initialize(): void {
    this.endpoint = 'album';
    this.link = 'albums';
    this.placeholder = 'albums...';
    this.results = 'Albums';
    this.found = 'albums';
    this.creation = 'Albums';
    this.loaded = false;
    this.icon = 'fas fa-film';
    this.itemsCount = 0;
    this.itemsPerPage = 24;
    this.linkRoute = 'albums';

    this.columns = [
      { type: 'text', name: 'Id', field: 'id' },
      {
        type: 'text',
        name: 'Name',
        field: 'name',
      },
      {
        type: 'img',
        name: 'image',
        field: 'cover_photo',
      },
    ];

    super.initialize();
  }

  ngOnInit(): void {
    this.titleService.setTitle('New Movies: angular.ganatan');
    this.meta.addTag({
      name: 'angular.ganatan',
      content: '',
    });
    this.meta.updateTag({
      name: 'description',
      content: 'All the new movies',
    });
  }

  createItem(): void {
    this.router.navigate(['/lists/albums/0']);
  }

  override selectItem(id: any): void {
    this.router.navigate(['/lists/' + this.link, id]);
  }
}
