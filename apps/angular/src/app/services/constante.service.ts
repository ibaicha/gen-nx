import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { forkJoin } from 'rxjs'
import { AppService } from './app.service'
import {
  IAnnee,
  ICampagne,
  IFormeJuridique,
  ILocalite,
  IPoint,
  ISaison,
  IVariete,
} from '@shared-models'

@Injectable({ providedIn: 'root' })
export class ConstanteService {
  /**
   * Options pour les requêtes HTTP
   */
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.appService.getLocalToken(),
    }),
  }

  /**
   * Constructeur
   * @param http Client HTTP
   * @param appService Service d'application
   */

  constructor(private http: HttpClient, private appService: AppService) {}

  loadAll() {
    return forkJoin({
      annees: this.http.get<IAnnee[]>(
        this.appService.getUrl('/annees'),
        this.options,
      ),
      saisons: this.http.get<ISaison[]>(
        this.appService.getUrl('/saisons'),
        this.options,
      ),
      campagnes: this.http.get<ICampagne[]>(
        this.appService.getUrl('/campagnes'),
        this.options,
      ),
      formeJuridiques: this.http.get<IFormeJuridique[]>(
        this.appService.getUrl('/forme-juridique'),
        this.options,
      ),
      localites: this.http.get<ILocalite[]>(
        this.appService.getUrl('/localite'),
        this.options,
      ),
      varietes: this.http.get<IVariete[]>(
        this.appService.getUrl('/varietes'),
        this.options,
      ),
      points: this.http.get<IPoint[]>(
        this.appService.getUrl('/points'),
        this.options,
      ),
    })
  }
}
