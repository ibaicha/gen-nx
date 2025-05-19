import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { IVariete } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class VarieteService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getVariete(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/varietes/' + id), this.option)
  }

  getVarietes(): Observable<any> {
    return this.http.get(this.appService.getUrl('/varietes'), this.option)
  }

  create(variete: IVariete): Observable<any> {
    const body: any = {}
    body.id = variete.id
    body.name = variete.name
    body.surface_unite = variete.surface_unite
    body.surface_unite = variete.quantite_unite
    body.surface_unite = variete.rendement_unite
    body.surface_unite = variete.isActive
    body.surface_unite = variete.produit?.id ?? null

    return this.http.post(
      this.appService.getUrl('/varietes'),
      body,
      this.option,
    )
  }
  update(variete: IVariete): Observable<any> {
    const body: any = {}
    body.id = variete.id
    body.name = variete.name
    body.surface_unite = variete.surface_unite
    body.surface_unite = variete.quantite_unite
    body.surface_unite = variete.rendement_unite
    body.surface_unite = variete.isActive
    body.surface_unite = variete.produit?.id ?? null

    return this.http.put(this.appService.getUrl('/varietes'), body, this.option)
  }

  delete(variete: IVariete): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/varietes/' + variete.id),
      this.option,
    )
  }
}
