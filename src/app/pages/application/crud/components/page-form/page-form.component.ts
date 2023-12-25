import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfigService } from '../../services/config/config.service';
import { ItemsService } from '../../services/items/items.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.css'],
})
export class PageFormComponent {
  api: any;
  url: any;
  endpoint: any;
  icon: any;
  item: any = {};
  titleForm: any = {};
  form: FormGroup;

  public route: ActivatedRoute;
  public router: Router;
  public configService: ConfigService;
  public itemsService: ItemsService;
  public fb: FormBuilder;
  private toastr: ToastrService;

  constructor(injector: Injector) {
    this.form = new FormGroup({});

    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.toastr = injector.get(ToastrService);
    this.configService = injector.get(ConfigService);
    this.itemsService = injector.get(ItemsService);
    this.fb = injector.get(FormBuilder);

    this.initialize();
    this.createForm();
    this.getItemById();
  }

  initialize(): void {
    this.api = this.configService.config.api;
    this.url = this.configService.config.url + this.endpoint;
  }

  createForm(): void {
    console.log('createForm');
  }

  getItemById(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] !== undefined) {
        this.itemsService
          .getItem(this.api, this.url, params['id'])
          .subscribe((data) => {
            if (data !== null && data !== undefined) {
              this.item = data;
              this.setFormValue(this.item);
            } else {
              this.resetForm();
            }
          });
      }
    });
  }

  resetForm(): void {
    this.setFormValue(this.item);
  }

  setFormValue(item: any): void {
    console.log(item);
  }

  onCreate(): void {
    this.resetForm();
  }

  onUpdate(): void {
    this.item = this.form.value;
    const id = this.item.id;
    if (id === null || id === undefined) {
      this.createItem(this.url, this.item);
    } else {
      this.updateItem(this.url, this.item, id);
    }
  }

  onDelete(): void {
    if (this.item.id !== undefined && this.item.id != null) {
      this.deleteItem(this.url, this.item.id);
    }
  }

  createItem(url: any, item: any): void {
    this.itemsService.addItem(url, item).subscribe((data) => {
      this.toastr.success('The record successfully created');
      this.router.navigate(['/lists']);
      this.item = data;
      this.form.setValue(data);
    });
  }

  updateItem(url: any, item: any, id: number): void {
    this.itemsService.updateItem(item, id, url).subscribe((data) => {
      this.toastr.success('The record successfully updated');
      this.router.navigate(['/lists']);
      this.item = data;
      this.form.setValue(this.item);
    });
  }

  deleteItem(url: any, id: number): void {
    this.itemsService.deleteItem(url, id).subscribe((data) => {
      this.resetForm();
      this.toastr.success('The record successfully deleted');
      this.router.navigate(['/lists']);
    });
  }
}
