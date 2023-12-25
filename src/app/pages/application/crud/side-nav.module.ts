import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavRoutingModule } from './side-nav-routing.module';
import { SideNavComponent } from './side-nav.component';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './services/config/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    SideNavRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SideNavComponent],
  providers: [ConfigService],
})
export class SideNavModule {}
