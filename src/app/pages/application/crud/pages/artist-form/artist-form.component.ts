import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { PageFormComponent } from '../../components/page-form/page-form.component';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css'],
})
export class ArtistFormComponent extends PageFormComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  override initialize(): void {
    this.endpoint = 'artist';
    this.titleForm = 'Artist Form';
    this.icon = 'fas fa-film';
    super.initialize();
  }

  override createForm(): void {
    this.form = this.fb.group({
      id: null,
      firstName: null,
      lastName: null,
      profilePicture: null,
      birthDate: null,
    });
    super.createForm();
  }

  override resetForm(): void {
    this.item.firstName = null;
    this.item.lastName = null;
    this.item.profilePicture = null;
    this.item.birthDate = null;
    super.resetForm();
  }

  override setFormValue(item: any): void {
    this.form.controls['id'].setValue(item.id);
    this.form.controls['firstName'].setValue(item.first_name);
    this.form.controls['lastName'].setValue(item.last_name);
    this.form.controls['profilePicture'].setValue(item.profile_picture);
    this.form.controls['birthDate'].setValue(item.birth_date);
    super.setFormValue(item);
  }

  get name(): any {
    return this.form.get('name');
  }
}
