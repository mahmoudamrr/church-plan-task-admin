import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SongsFormRoutingModule } from './song-form-routing.module';
import { SongFormComponent } from './song-form.component';

@NgModule({
  declarations: [SongFormComponent],
  imports: [
    CommonModule,
    SongsFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SongFormComponent],
})
export class SongFormModule {}
