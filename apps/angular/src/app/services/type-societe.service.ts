import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { ITypeSociete } from '@shared-models'
 
@Injectable({
  providedIn: 'root',
})
export class TypeSocieteService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getTypeSociete(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/typeSocietes/' + id),
      this.option,
    )
  }

  getTypeSocietes(): Observable<any> {
    return this.http.get(this.appService.getUrl('/typeSocietes'), this.option)
  }

  create(typeSociete: ITypeSociete): Observable<any> {
    const body: any = {}
    body.id = typeSociete.id
    body.name = typeSociete.name

    return this.http.post(
      this.appService.getUrl('/typeSocietes'),
      body,
      this.option,
    )
  }
  update(typeSociete: ITypeSociete): Observable<any> {
    const body: any = {}
    body.id = typeSociete.id
    body.name = typeSociete.name

    return this.http.put(
      this.appService.getUrl('/typeSocietes'),
      body,
      this.option,
    )
  }

  delete(typeSociete: ITypeSociete): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/typeSocietes/' + typeSociete.id),
      this.option,
    )
  }
}
