import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { ICredit, ICreditCustom, IExploitationCredit } from '../interfaces/credit.interface'

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  CreditDialogTitre = ''
  newCredit: any = {}
  editedCredit: any = {}
  deletedCredit: any = {}
  //credits: ICredit[] = [];
  credits = []

  option = {}
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getAllCreditsWithFiltersX(filter: any): Observable<any> {
    let httpParams = new HttpParams()

    // Traitement des paramètres de filtrage
    for (const key in filter) {
      if (filter[key] !== undefined && filter[key] !== null) {
        if (Array.isArray(filter[key])) {
          // Si c'est un tableau, ajouter chaque valeur séparément
          filter[key].forEach((value: any) => {
            httpParams = httpParams.append(key, value)
          })
        } else {
          // Si c'est une valeur simple
          httpParams = httpParams.set(key, filter[key])
        }
      }
    }

    console.log('params', httpParams.toString())

    const url = this.appService.getUrl('/exploitations')
    const fullUrl = `${url}?${httpParams.toString()}`
    console.log('URL', fullUrl)

    return this.http.get(this.appService.getUrl('/exploitations'), {
      ...this.option,
      params: httpParams,
    })
  }
  //return this.http.get(fullUrl, this.option)
 getAllCreditsWithFilters(filter: any): Observable<ICreditCustom[]> {
    let httpParams = new HttpParams();

    // Traitement des paramètres de filtrage
    for (const key in filter) {
      if (filter[key] !== undefined && filter[key] !== null) {
        if (Array.isArray(filter[key])) {
          // Si c'est un tableau, ajouter chaque valeur séparément
          filter[key].forEach((value: any) => {
            httpParams = httpParams.append(key, value);
          });
        } else {
          // Si c'est une valeur simple
          httpParams = httpParams.set(key, filter[key]);
        }
      }
    }

    const url = this.appService.getUrl('/exploitations');
    return this.http.get<ICreditCustom[]>(url, { params: httpParams });
  }

  getCredit(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/credits/' + id), this.option)
  }

  getCredits(): Observable<any> {
    return this.http.get(this.appService.getUrl('/credits/all'), this.option)
  }

  getAllCustomCreditToOp(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/credits/' + id), this.option)
  }

  getAllCustom(): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/credits/custom/'),
      this.option,
    )
  }

  getAllCustomCreditAgenceVarieteAnneeSaison(
    agenceId: number,
    produitId: number,
    anneeId: number,
    saisonId: number,
  ): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/credits/custom/agenceId/' +
          agenceId +
          '/produitId/' +
          produitId +
          '/anneeId/' +
          anneeId +
          '/saisonId/' +
          saisonId,
      ),
      this.option,
    )
  }

  getAllCustomCreditSocieteVarieteAnneeSaison(
    etablissementId: number,
    produitId: number,
    anneeId: number,
    saisonId: number,
  ): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/credits/custom/etablissementId/' +
          etablissementId +
          '/produitId/' +
          produitId +
          '/anneeId/' +
          anneeId +
          '/saisonId/' +
          saisonId,
      ),
      this.option,
    )
  }

  create(credit: ICredit): Observable<any> {
    const body: any = {}
    console.log(credit)
    body.id = null
    body.dateCredit = credit.dateCredit
    body.capital = credit.capital
    body.interet = credit.interet
    body.moratoire = credit.moratoire
    body.autres_engagements = credit.autres_engagements

    return this.http.post(
      this.appService.getUrl('/credits/create'),
      body,
      this.option,
    )
  }
  update(credit: ICredit): Observable<any> {
    const body: any = {}
    body.id = credit.id
    body.date = credit.dateCredit
    body.capital = credit.capital
    body.interet = credit.interet
    body.moratoire = credit.moratoire
    body.autres_engagements = credit.autres_engagements
    body.exploitationId = credit.exploitationId

    return this.http.put(
      this.appService.getUrl('/credits/update/' + credit.id),
      body,
      this.option,
    )
  }

  createExploitationCredit(
    exploitationCredit: IExploitationCredit,
  ): Observable<any> {
    const body: any = {}
    // console.log(exploitationCredit);
    body.id = null
    ////////////// DONNEES CREDIT
    body.date = exploitationCredit.date
    body.capital = exploitationCredit.capital
    body.interet = exploitationCredit.interet
    body.moratoire = exploitationCredit.moratoire
    body.autres_engagements = exploitationCredit.autres_engagements
    body.exploitationId = exploitationCredit.exploitationId
    ////////////// DONNEES EXPLOITATION
    // body.compte = exploitationCredit.compte;
    body.dateExploitation = exploitationCredit.dateExploitation
    body.unite = exploitationCredit.unite
    body.surface = exploitationCredit.surface
    body.agenceId = exploitationCredit.agenceId
    body.varieteId = exploitationCredit.varieteId
    body.anneeId = exploitationCredit.anneeId
    body.saisonId = exploitationCredit.saisonId
    //body.producteurId = exploitationCredit.producteurId;
    body.opId = exploitationCredit.opId

    console.log(body)
    return this.http.post(
      this.appService.getUrl('/credits/createExploitationCredit'),
      body,
      this.option,
    )
  }

  delete(credit: ICredit): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/credits/delete/' + credit.id),
      this.option,
    )
  }
}
