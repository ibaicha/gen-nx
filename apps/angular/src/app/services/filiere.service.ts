import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { IFiliere } from '@shared-models'
 

@Injectable({
  providedIn: 'root',
})
export class FiliereService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getFiliere(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/filieres/' + id), this.option)
  }

  getFilieres(): Observable<any> {
    return this.http.get(this.appService.getUrl('/filieres'), this.option)
  }

  create(filiere: IFiliere): Observable<any> {
    const body: any = {}
    body.id = filiere.id
    body.name = filiere.name

    return this.http.post(
      this.appService.getUrl('/filieres'),
      body,
      this.option,
    )
  }
  update(filiere: IFiliere): Observable<any> {
    const body: any = {}
    body.id = filiere.id
    body.name = filiere.name

    return this.http.put(this.appService.getUrl('/filieres'), body, this.option)
  }

  delete(filiere: IFiliere): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/filieres/' + filiere.id),
      this.option,
    )
  }
}
