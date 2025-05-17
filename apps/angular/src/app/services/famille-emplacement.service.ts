import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { IFamilleEmplacement } from '@shared-models'
 

@Injectable({
  providedIn: 'root',
})
export class FamilleEmplacementService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getFamilleEmplacement(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/familleEmplacements/' + id),
      this.option,
    )
  }

  getFamilleEmplacements(): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/familleEmplacements'),
      this.option,
    )
  }

  create(familleEmplacement: IFamilleEmplacement): Observable<any> {
    const body: any = {}
    body.id = familleEmplacement.id
    body.name = familleEmplacement.name

    return this.http.post(
      this.appService.getUrl('/familleEmplacements'),
      body,
      this.option,
    )
  }
  update(familleEmplacement: IFamilleEmplacement): Observable<any> {
    const body: any = {}
    body.id = familleEmplacement.id
    body.name = familleEmplacement.name

    return this.http.put(
      this.appService.getUrl('/familleEmplacements'),
      body,
      this.option,
    )
  }

  delete(familleEmplacement: IFamilleEmplacement): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/familleEmplacements/' + familleEmplacement.id),
      this.option,
    )
  }
}
