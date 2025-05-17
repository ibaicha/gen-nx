import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, Observable, of, throwError } from 'rxjs'
import { ILocalite } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class LocaliteService {
  option = {}
  private baseUrl = this.appService.getUrl('/localite')
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getAll(): Observable<ILocalite[]> {
    console.log(this.http.get<ILocalite[]>(`${this.baseUrl}`, this.option))
    return this.http.get<ILocalite[]>(`${this.baseUrl}`, this.option)
  }

  getById(id: number): Observable<ILocalite> {
    // return this.http.get<ILocalite>(`${this.baseUrl}/${id}`)
    return this.http.get<ILocalite>(`${this.baseUrl}/${id}`, this.option)
  }

  create(localite: Partial<ILocalite>): Observable<ILocalite> {
    return this.http.post<ILocalite>(`${this.baseUrl}/create`, localite)
  }

  update(id: number, localite: Partial<ILocalite>): Observable<ILocalite> {
    return this.http.put<ILocalite>(`${this.baseUrl}/update/${id}`, localite)
  }

  delete(localite: Partial<ILocalite>): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${localite}`)
  }
}
