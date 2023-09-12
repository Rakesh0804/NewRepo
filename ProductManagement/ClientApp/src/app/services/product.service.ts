import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, map, Observable, observable, of } from 'rxjs';
import { Constants } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly product_apiUrl = Constants.ProductAPI;

  working = false;
  private uploadProgress = 0;
  private uploadUrl = '';

  constructor(private _httpclient: HttpClient) { }

  getProductList(): Observable<any> {
    return this._httpclient.get<any>(this.product_apiUrl + 'get')
      .pipe(
        catchError(error => {
          return of(error)
        })
      )
  }

  addProduct(product: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._httpclient.post<any>(this.product_apiUrl + 'Post', product, httpOptions);
  }

  updateProduct(product: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._httpclient.put<any>(this.product_apiUrl + 'Put/' + product.id, product, httpOptions);
  }

  deleteProduct(productId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._httpclient.delete<number>(this.product_apiUrl + 'Delete/' + productId, httpOptions);
  }

  uploadPhoto(photo: any): Observable<any> {
    return this._httpclient.post<any>(this.product_apiUrl + 'UploadImage', photo);
    
  }

  searchProduct(searchText: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let params = new HttpParams();
    params.append("searchText", searchText);

    return this._httpclient.get<any>(this.product_apiUrl + 'search/'+ searchText)
      .pipe(
        catchError(error => {
          return of(error)
        })
      )
  }
}
