import { Component, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfigService } from '../../services/config/config.service';
import { ItemsService } from '../../services/items/items.service';

import { Params } from './params';
import { Observable, tap, of } from 'rxjs';

@Component({
  selector: 'app-page-list',
  template: ``,
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  api: any;
  url: any;
  endpoint: any;
  items: any;
  icon: any;
  columns: any;
  link: any;
  filter = '';
  itemsPerPageDefault = 5;

  placeholder: any;
  results: any;
  creation: any;
  found: any;
  linkRoute: any;
  searchField = '';

  loaded: any;
  query: string;
  params = new Params();

  itemsCount = 0;
  itemsPage = 1;
  itemsPerPage = 4;

  public route: ActivatedRoute;
  public router: Router;
  public configService: ConfigService;
  public itemsService: ItemsService;

  constructor(injector: Injector) {
    this.query = '';
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.configService = injector.get(ConfigService);
    this.itemsService = injector.get(ItemsService);

    this.initialize();
  }

  initialize(): void {
    this.api = this.configService.config.api;
    this.url = this.configService.config.url + this.endpoint;
    this.readQueryParams();
  }

  readQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.params.query = params['q'];
      if (params['page'] !== undefined) {
        this.params.page = params['page'];
        this.itemsPage = parseInt(this.params.page, 10);
      }
      this.searchField = this.params.query;
      this.getItems().subscribe();
    });
  }

  getItems(): Observable<any> {
    this.loaded = false;
    this.query = this.searchField;

    if (this.endpoint !== undefined) {
      return this.itemsService
        .getItems(
          this.api,
          this.url,
          this.itemsPerPage,
          this.itemsPage,
          this.query
        )
        .pipe(
          tap((response) => {
            this.items = response.data;
            this.itemsCount = response.meta.total;

            if (this.itemsPerPage < 1) {
              this.itemsPerPage = this.itemsPerPageDefault;
            }

            const totalPages = Math.ceil(this.itemsCount / this.itemsPerPage);
            if (this.itemsPage >= totalPages) {
              this.itemsPage = totalPages;
            }
            this.loaded = true;
          })
        );
    }

    // Return an observable with an empty array if the endpoint is undefined
    return of([]);
  }

  writeQueryParams(): void {
    let query = this.searchField;
    if (query === '' || query === undefined) {
      query = '';
    }
    const url = '/' + this.linkRoute;
    let page = '';
    if (this.itemsPage > 1) {
      page = this.itemsPage.toString();
    }
    this.params.query = query;
    this.params.page = page;
    this.router.navigate(['lists/' + url], { queryParams: this.params });
  }

  search(): void {
    this.query = this.searchField;
    this.writeQueryParams();
    this.getItems();
  }

  changePage(page: number): void {
    this.itemsPage = page;
    this.writeQueryParams();
    this.getItems();
  }

  selectItem(id: any): void {
    this.router.navigate(['/lists/' + this.link, id]);
  }

  onChangePage(page: any): void {
    this.changePage(page);
  }

  onSearch(query: any): void {
    this.searchField = query;
    this.search();
  }
}
