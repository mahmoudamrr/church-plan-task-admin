import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private getHttpOptions(): any {
    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
        });

    return { headers: headers };
  }

  httpOptions = this.getHttpOptions();

  filterJsonItem(value: any, id: any): any {
    let dataTmp = null;
    value.map((row: any, index: any, data: any) => {
      const idTmp = parseInt(id, 10);
      if (data[index].id === idTmp) {
        dataTmp = data[index];
      }
    });

    return dataTmp;
  }

  getItems(
    api: boolean,
    url: string,
    itemsPerPage: number,
    page: number,
    query: any
  ): Observable<any> {
    let filter = '';
    if (
      itemsPerPage !== undefined ||
      page !== undefined ||
      query !== undefined
    ) {
      const limit: number = itemsPerPage;

      if (page !== undefined) {
        filter = `?page=${page}&perPage=${limit}`;
      }

      if (query !== undefined && query !== '' && query !== null) {
        filter += `&q=${query}`;
      }
    }

    const urlParameter = url + filter;

    let result: Observable<any>;

    if (api) {
      result = this.http
        .get<any[]>(urlParameter, this.httpOptions)
        .pipe(catchError(this.handleError('getItems', [])));
    } else {
      result = this.http.get<any>(urlParameter, this.httpOptions).pipe(
        map((response: any) => ({
          data: response.data,
          total: response.meta.total,
        })),
        catchError(this.handleError('getItems', []))
      );
    }

    return result;
  }

  getItem(api: boolean, url: any, id: number): Observable<any> {
    let result: any = {};
    if (id !== undefined) {
      if (api) {
        const urlParameter = url + '/' + id;
        result = this.http
          .get<any>(urlParameter, this.httpOptions)
          .pipe(catchError(this.handleError<any>(`getItem id=${id}`)));
      } else {
        const urlParameter = url;
        result = this.http.get<any>(urlParameter).pipe(
          map((value: string) => this.filterJsonItem(value, id)),
          catchError(this.handleError('getItems', []))
        );
      }
    }

    return result;
  }

  addItem(url: any, item: any): Observable<any> {
    const body = JSON.stringify(item);

    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<any>('addItem')));
  }

  updateItem(body: object, id: number, link: any): Observable<any> {
    const url = link + '/' + id;

    return this.http
      .put(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateItem')));
  }

  deleteItem(link: any, id: number): Observable<any> {
    const url = link + '/' + id;

    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteItem')));
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      const errors = error.error.errors;
      if (errors) {
        errors.map((err: { message: string | undefined }) =>
          this.toastr.error(err.message)
        );
      }
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
