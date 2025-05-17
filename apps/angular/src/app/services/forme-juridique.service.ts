import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, Observable, of, throwError } from 'rxjs'
import { IFormeJuridique } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class FormeJuridiqueService {
  option = {}
  private baseUrl = this.appService.getUrl('/forme-juridique')
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getAll(): Observable<IFormeJuridique[]> {
    return this.http.get<IFormeJuridique[]>(`${this.baseUrl}`, this.option)
  }

  getById(id: number): Observable<IFormeJuridique> {
    // return this.http.get<IFormeJuridique>(`${this.baseUrl}/${id}`)
    return this.http.get<IFormeJuridique>(`${this.baseUrl}/${id}`, this.option)
  }

  create(
    formeJuridique: Partial<IFormeJuridique>,
  ): Observable<IFormeJuridique> {
    return this.http.post<IFormeJuridique>(
      `${this.baseUrl}/create`,
      formeJuridique,
    )
  }

  update(
    id: number,
    formeJuridique: Partial<IFormeJuridique>,
  ): Observable<IFormeJuridique> {
    return this.http.put<IFormeJuridique>(
      `${this.baseUrl}/update/${id}`,
      formeJuridique,
    )
  }

  delete(formeJuridique: Partial<IFormeJuridique>): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${formeJuridique}`)
  }
}
