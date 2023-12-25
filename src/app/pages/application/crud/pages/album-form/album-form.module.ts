import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlbumsFormRoutingModule } from './album-form-routing.module';
import { AlbumsFormComponent } from './album-form.component';

@NgModule({
  declarations: [AlbumsFormComponent],
  imports: [
    CommonModule,
    AlbumsFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [AlbumsFormComponent],
})
export class AlbumsFormModule {}
