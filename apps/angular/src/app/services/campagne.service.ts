import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { ICampagne } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class CampagneService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getCampagne(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/campagnes/' + id),
      this.option,
    )
  }

  getCampagnes(): Observable<any> {
    return this.http.get(this.appService.getUrl('/campagnes'), this.option)
  }

  create(campagne: ICampagne): Observable<any> {
    const body: any = {}
    body.id = campagne.id
    body.anneeId = campagne.anneeId
    body.saisonId = campagne.saisonId

    return this.http.post(
      this.appService.getUrl('/campagnes'),
      body,
      this.option,
    )
  }
  update(campagne: ICampagne): Observable<any> {
    const body: any = {}
    body.id = campagne.id
    body.anneeId = campagne.anneeId
    body.saisonId = campagne.saisonId

    return this.http.put(
      this.appService.getUrl('/campagnes'),
      body,
      this.option,
    )
  }

  delete(campagne: ICampagne): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/campagnes/' + campagne.id),
      this.option,
    )
  }
}
