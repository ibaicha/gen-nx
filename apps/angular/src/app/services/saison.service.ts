import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { ISaison } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class SaisonService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getSaison(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/saisons/' + id), this.option)
  }

  getSaisons(): Observable<any> {
    return this.http.get(this.appService.getUrl('/saisons'), this.option)
  }

  create(saison: ISaison): Observable<any> {
    const body: any = {}
    body.id = saison.id
    body.name = saison.name
    body.description = saison.description

    return this.http.post(this.appService.getUrl('/saisons'), body, this.option)
  }
  update(saison: ISaison): Observable<any> {
    const body: any = {}
    body.id = saison.id
    body.name = saison.name
    body.description = saison.description

    return this.http.put(this.appService.getUrl('/saisons'), body, this.option)
  }

  delete(saison: ISaison): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/saisons/' + saison.id),
      this.option,
    )
  }
}
