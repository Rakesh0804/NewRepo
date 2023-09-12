import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, observable, of } from 'rxjs';
import { Constants } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  readonly subcategory_apiUrl = Constants.SubCategoryAPI;

  constructor(private _httpclient: HttpClient) { }

  getSubCategoryIdNameList(): Observable<any> {
    return this._httpclient.get<any>(this.subcategory_apiUrl + 'GetSubCategoryNameId')
      .pipe(
        catchError(error => {
          return of(error)
        })
      )
  }
  getSubCategoryByCategoryIdList(categoryId: number): Observable<any> {
    return this._httpclient.get<any>(this.subcategory_apiUrl + 'getSubCategoryIdNameByCategogyId/' + categoryId)
      .pipe(
        catchError(error => {
          return of(error)
        })
      )
  }
}
