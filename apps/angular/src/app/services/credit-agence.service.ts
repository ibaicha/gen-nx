import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { Observable } from 'rxjs'
import { ICreditAgence } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class CreditAgenceService {
  option = {}
  private baseUrl = this.appService.getUrl('/credit-agence/')
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  /**
   * Crée un nouveau Crédit Agence
   */
  createCreditAgence(
    creditAgenceData: Partial<ICreditAgence>,
  ): Observable<ICreditAgence> {
    const payload = {
      ...creditAgenceData,
      date: (creditAgenceData.date ?? new Date()).toISOString(),
    }
    // console.log('✅ ✅ ✅ ✅ ✅ ✅ payload', payload)
    return this.http.post<ICreditAgence>(
      `${this.baseUrl}`,
      payload,
      this.option,
    )
  }

  getCreditsAgencesWithFilters(filter: any): Observable<ICreditAgence[]> {
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

    //const url = this.appService.getUrl('/creditAgences')
    // console.log('✅ ✅ ✅ httpParams', httpParams)
    // console.log('✅ ✅ ✅ url', url)
    return this.http.get<ICreditAgence[]>(`${this.baseUrl}`, {
      params: httpParams,
    })
  }
}
