import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArtistFormRoutingModule } from './artist-form-routing.module';
import { ArtistFormComponent } from './artist-form.component';

@NgModule({
  declarations: [ArtistFormComponent],
  imports: [
    CommonModule,
    ArtistFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ArtistFormComponent],
})
export class ArtistFormModule {}
