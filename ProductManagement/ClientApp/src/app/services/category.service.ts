import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, observable, of } from 'rxjs';
import { Constants } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly category_apiUrl = Constants.CategoryAPI;

  constructor(private _httpclient: HttpClient) { }

  getCategoryIdNameList(): Observable<any> {
    return this._httpclient.get<any>(this.category_apiUrl + 'GetCategoryNameId')
      .pipe(
        catchError(error => {
          return of(error)
        })
      )
  }
}
