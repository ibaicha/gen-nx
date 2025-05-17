import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IAgence } from '@shared-models'
 

/**
 * Service pour gérer les années
 */
@Injectable({
  providedIn: 'root',
})
export class AgenceService {
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

  /**
   * Récupérer une année par son ID
   * @param id ID de l'année
   * @returns Observable contenant l'année
   */
  getAgence(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl(`/agences/${id}`), this.options)
  }

  /**
   * Récupérer toutes les années
   * @returns Observable contenant les années
   */
  getAgences(): Observable<any> {
    return this.http.get(this.appService.getUrl('/agences'), this.options)
  }

  /**
   * Créer une nouvelle année
   * @param agence Objet année à créer
   * @returns Observable contenant la réponse du serveur
   */
  create(agence: IAgence): Observable<any> {
    const body = { ...agence } // Créer une copie de l'objet année
    return this.http.post(
      this.appService.getUrl('/agences'),
      body,
      this.options,
    )
  }

  /**
   * Mettre à jour une année existante
   * @param agence Objet année à mettre à jour
   * @returns Observable contenant la réponse du serveur
   */
  update(agence: IAgence): Observable<any> {
    const body = { ...agence } // Créer une copie de l'objet année
    return this.http.put(this.appService.getUrl('/agences'), body, this.options)
  }

  /**
   * Supprimer une année existante
   * @param agence Objet année à supprimer
   * @returns Observable contenant la réponse du serveur
   */
  delete(agence: IAgence): Observable<any> {
    return this.http.delete(
      this.appService.getUrl(`/agences/${agence.id}`),
      this.options,
    )
  }
}
