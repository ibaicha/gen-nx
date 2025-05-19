import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { ISociete } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class SocieteService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getSociete(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/societes/' + id), this.option)
  }

  getSocietes(): Observable<any> {
    return this.http.get(this.appService.getUrl('/societes'), this.option)
  }

  create(societe: ISociete): Observable<any> {
    const body: any = {}
    body.id = societe.id
    body.name = societe.name
    body.sigle = societe.sigle

    return this.http.post(
      this.appService.getUrl('/societes'),
      body,
      this.option,
    )
  }
  update(societe: ISociete): Observable<any> {
    const body: any = {}
    body.id = societe.id
    body.name = societe.name
    body.sigle = societe.sigle

    return this.http.put(this.appService.getUrl('/societes'), body, this.option)
  }

  delete(societe: ISociete): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/societes/' + societe.id),
      this.option,
    )
  }
}
