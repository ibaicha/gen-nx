import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { Observable } from 'rxjs/internal/Observable'
import { IPoint } from '@shared-models'


@Injectable({
  providedIn: 'root',
})
export class PointService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getPoint(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/points/' + id), this.option)
  }

  getPoints(): Observable<any> {
    return this.http.get(this.appService.getUrl('/points'), this.option)
  }

  getPointsCustom(): Observable<any> {
    return this.http.get(this.appService.getUrl('/point/custom'), this.option)
  }

  getPointAgences(): Observable<any> {
    return this.http.get(this.appService.getUrl('/pointAgences'), this.option)
  }

  create(point: IPoint): Observable<any> {
    const body: any = {}
    console.log(point)
    body.id = null
    body.name = point.name
    body.localiteId = point.localiteId 

    return this.http.post(
      this.appService.getUrl('/points/create'),
      body,
      this.option,
    )
  }
  update(point: IPoint): Observable<any> {
    const body: any = {}
    body.id = point.id
    body.name = point.name
    body.localiteId = point.localiteId

    return this.http.put(
      this.appService.getUrl('/points/update/' + point.id),
      body,
      this.option,
    )
  }

  delete(point: IPoint): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/points/' + point.id),
      this.option,
    )
  }
}
