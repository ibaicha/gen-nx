import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { Observable } from 'rxjs'
import { IPointAgence } from '@shared-models'


@Injectable({
  providedIn: 'root',
})
export class PointAgenceService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getpointAgence(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/pointAgences/' + id),
      this.option,
    )
  }

  getpointAgences(): Observable<any> {
    return this.http.get(this.appService.getUrl('/pointAgences'), this.option)
  }

  ggetpointAgencesCustom(): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/pointAgences/custom'),
      this.option,
    )
  }

  create(pointAgence: IPointAgence): Observable<any> {
    const body: any = {}
    console.log(pointAgence)
    body.id = null
    body.agenceEtablissementFinancierId = pointAgence.agenceId
    body.pointCollecteId = pointAgence.pointId

    return this.http.post(
      this.appService.getUrl('/pointAgences/create'),
      body,
      this.option,
    )
  }
  update(pointAgence: IPointAgence): Observable<any> {
    const body: any = {}
    console.log(pointAgence)
    body.id = null
    body.agenceEtablissementFinancierId = pointAgence.agenceId
    body.pointCollecteId = pointAgence.pointId

    return this.http.put(
      this.appService.getUrl('/pointAgences/update/' + pointAgence.id),
      body,
      this.option,
    )
  }

  delete(pointAgence: IPointAgence): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/pointAgences/update/' + pointAgence.id),
      this.option,
    )
  }
}
