import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { IProduit } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getProduit(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/produits/' + id), this.option)
  }

  getProduits(): Observable<any> {
    return this.http.get(this.appService.getUrl('/produits'), this.option)
  }

  create(produit: IProduit): Observable<any> {
    const body: any = {}
    body.id = produit.id
    body.name = produit.name
    body.isDerive = produit.isDerive
    body.isEnsachage = produit.isEnsachage
    body.isActive = produit.isActive
    body.filiereId = produit.filiere?.id ?? null
    body.familleEmplacementId = produit.familleEmplacement?.id ?? null

    return this.http.post(
      this.appService.getUrl('/produits'),
      body,
      this.option,
    )
  }
  update(produit: IProduit): Observable<any> {
    const body: any = {}
    body.id = produit.id
    body.name = produit.name
    body.isDerive = produit.isDerive
    body.isEnsachage = produit.isEnsachage
    body.isActive = produit.isActive
    body.filiereId = produit.filiere?.id ?? null
    body.familleEmplacementId = produit.familleEmplacement?.id ?? null

    return this.http.put(this.appService.getUrl('/produits'), body, this.option)
  }

  delete(produit: IProduit): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/produits/' + produit.id),
      this.option,
    )
  }
}
