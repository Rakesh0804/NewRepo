import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Constants } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  readonly inventory_apiUrl = Constants.InventoryAPI;
  constructor(private _httpclient: HttpClient) { }

  getInventoryList(): Observable<any> {
    return this._httpclient.get<any>(this.inventory_apiUrl + 'get')
      .pipe(
        catchError(error =>
        {
          return of(error)
        })
    )
  }

  addInventory(inentory: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._httpclient.post<any>(this.inventory_apiUrl + 'Post', inentory, httpOptions);
  }

  updateInventory(inentory: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._httpclient.put<any>(this.inventory_apiUrl + 'Put/' + inentory.id, inentory, httpOptions);
  }

  deleteInventory(inentoryId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._httpclient.delete<number>(this.inventory_apiUrl + 'Delete/' + inentoryId, httpOptions);
  }

  uploadPhoto(photo: any) {
    return this._httpclient.post(this.inventory_apiUrl + 'employee/savefile', photo);
  }
}
