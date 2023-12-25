import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { PageFormComponent } from '../../components/page-form/page-form.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css'],
})
export class AlbumsFormComponent extends PageFormComponent implements OnInit {
  artists: any[] | undefined;

  constructor(injector: Injector, private http: HttpClient) {
    super(injector);
  }

  override initialize(): void {
    this.endpoint = 'album';
    this.titleForm = 'Albums Form';
    this.icon = 'fas fa-film';
    super.initialize();
  }

  ngOnInit(): void {
    this.fetchArtists();
  }

  fetchArtists(): void {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
        });
    this.http
      .get<any>(`${this.configService.config.url}artist`, { headers })
      .subscribe((response) => {
        this.artists = response.data;
      });
  }

  override createForm(): void {
    this.form = this.fb.group({
      id: null,
      name: [null],
      description: null,
      releaseAt: null,
      coverPhoto: null,
      artistId: [null, Validators.required],
    });
    super.createForm();
  }

  override setFormValue(item: any): void {
    this.form.controls['id'].setValue(item.id);
    this.form.controls['name'].setValue(item.name);
    this.form.controls['description'].setValue(item.description);
    this.form.controls['coverPhoto'].setValue(item.cover_photo);
    this.form.controls['releaseAt'].setValue(item.release_at);
    this.form.controls['artistId'].setValue(item.artist_id);
    super.setFormValue(item);
  }
}
