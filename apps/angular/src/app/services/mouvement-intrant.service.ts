import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { IMouvementIntrant } from '../interfaces/mouvement-intrant.interface'

@Injectable({
  providedIn: 'root',
})
export class MouvementIntrantService {
  MouvementIntrantDialogTitre = ''
  newMouvementIntrant: any = {}
  editedMouvementIntrant: any = {}
  deletedMouvementIntrant: any = {}
  //mouvementIntrants: IMouvementIntrant[] = [];
  mouvementIntrants = []
  token: string
  constructor(public http: HttpClient, private appService: AppService) {
    this.token = this.appService.getLocalToken()
  }

  getMouvementIntrant(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/mouvementIntrants/' + id), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    })
  }

  getMouvementIntrants(): Observable<any> {
    return this.http.get(this.appService.getUrl('/mouvementIntrants/all'), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    })
  }

  getAllMouvementIntrantWithFilters(filter: any): Observable<any> {
    return this.http.get(this.appService.getUrl('/mouvementIntrants'), {
      params: filter,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        //'Content-Type': 'application/json',
      }),
    })
  }

  create(mouvementIntrant: IMouvementIntrant): Observable<any> {
    const body: any = {}
    console.log(mouvementIntrant)
    body.id = null
    body.date = mouvementIntrant.date
    body.pu = mouvementIntrant.pu
    body.quantiteEntreeEmballage = mouvementIntrant.quantiteEntreeEmballage
    body.quantiteSortieEmballage = mouvementIntrant.quantiteSortieEmballage
    body.nombreUnite = mouvementIntrant.nombreUnite
    body.valeur = mouvementIntrant.valeur
    body.modeEntreeSortieIntrantId = mouvementIntrant.modeEntreeSortieIntrantId
    body.chargeExploitationId = mouvementIntrant.chargeExploitationId
    body.anneeId = mouvementIntrant.anneeId
    body.saisonId = mouvementIntrant.saisonId
    body.emplacementId = mouvementIntrant.emplacementId
    body.emplacementSourceId = mouvementIntrant.emplacementSourceId
    body.emplacementDestinationId = mouvementIntrant.emplacementDestinationId
    body.opId = mouvementIntrant.opId
    body.fournisseurId = mouvementIntrant.fournisseurId

    return this.http.post(
      this.appService.getUrl('/mouvementIntrants/create'),
      body,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      },
    )
  }

  update(mouvementIntrant: IMouvementIntrant): Observable<any> {
    const body: any = {}
    console.log(mouvementIntrant)
    body.id = null
    body.date = mouvementIntrant.date
    body.pu = mouvementIntrant.pu
    body.quantiteEntreeEmballage = mouvementIntrant.quantiteEntreeEmballage
    body.quantiteSortieEmballage = mouvementIntrant.quantiteSortieEmballage
    body.nombreUnite = mouvementIntrant.nombreUnite
    body.valeur = mouvementIntrant.valeur
    body.modeEntreeSortieIntrantId = mouvementIntrant.modeEntreeSortieIntrantId
    body.chargeExploitationId = mouvementIntrant.chargeExploitationId
    body.anneeId = mouvementIntrant.anneeId
    body.saisonId = mouvementIntrant.saisonId
    body.emplacementId = mouvementIntrant.emplacementId
    body.emplacementSourceId = mouvementIntrant.emplacementSourceId
    body.emplacementDestinationId = mouvementIntrant.emplacementDestinationId
    body.opId = mouvementIntrant.opId
    body.fournisseurId = mouvementIntrant.fournisseurId

    return this.http.put(
      this.appService.getUrl(
        '/mouvementIntrants/update/' + mouvementIntrant.id,
      ),
      body,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      },
    )
  }

  delete(mouvementIntrant: IMouvementIntrant): Observable<any> {
    return this.http.delete(
      this.appService.getUrl(
        '/mouvementIntrants/delete/' + mouvementIntrant.id,
      ),
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      },
    )
  }
}
