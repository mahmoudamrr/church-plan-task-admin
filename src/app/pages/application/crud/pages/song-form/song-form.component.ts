import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { PageFormComponent } from '../../components/page-form/page-form.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css'],
})
export class SongFormComponent extends PageFormComponent implements OnInit {
  artists: any[] | undefined;
  albums: any[] | undefined;

  constructor(injector: Injector, private http: HttpClient) {
    super(injector);
  }

  override initialize(): void {
    this.endpoint = 'song';
    this.titleForm = 'Song Form';
    this.icon = 'fas fa-film';
    super.initialize();
  }

  ngOnInit(): void {
    this.fetchArtists();
    this.fetchAlbums();
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

  fetchAlbums(): void {
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
      .get<any>(`${this.configService.config.url}album`, { headers })
      .subscribe((response) => {
        this.albums = response.data;
      });
  }

  override createForm(): void {
    this.form = this.fb.group({
      id: null,
      name: null,
      duration: null,
      releaseAt: null,
      artistId: [null, Validators.required],
      albumId: [null],
    });
    super.createForm();
  }

  override resetForm(): void {
    this.item.name = null;
    this.item.duration = null;
    this.item.releaseAt = null;
    this.item.artistId = null;
    this.item.albumId = null;
    super.resetForm();
  }

  override setFormValue(item: any): void {
    this.form.controls['id'].setValue(item.id);
    this.form.controls['name'].setValue(item.name);
    this.form.controls['duration'].setValue(item.duration);
    this.form.controls['releaseAt'].setValue(item.release_at);
    this.form.controls['artistId'].setValue(item.artistId);
    this.form.controls['albumId'].setValue(item.album_id);
    super.setFormValue(item);
  }

  get name(): any {
    return this.form.get('name');
  }
}
