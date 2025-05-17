import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IAnnee } from '@shared-models'
 

/**
 * Service pour gérer les années
 */
@Injectable({
  providedIn: 'root',
})
export class AnneeService {
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
  getAnnee(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl(`/annees/${id}`), this.options)
  }

  /**
   * Récupérer toutes les années
   * @returns Observable contenant les années
   */
  getAnnees(): Observable<any> {
    return this.http.get(this.appService.getUrl('/annees'), this.options)
  }

  /**
   * Créer une nouvelle année
   * @param annee Objet année à créer
   * @returns Observable contenant la réponse du serveur
   */
  create(annee: IAnnee): Observable<any> {
    const body = { ...annee } // Créer une copie de l'objet année
    return this.http.post(this.appService.getUrl('/annees'), body, this.options)
  }

  /**
   * Mettre à jour une année existante
   * @param annee Objet année à mettre à jour
   * @returns Observable contenant la réponse du serveur
   */
  update(annee: IAnnee): Observable<any> {
    const body = { ...annee } // Créer une copie de l'objet année
    return this.http.put(this.appService.getUrl('/annees'), body, this.options)
  }

  /**
   * Supprimer une année existante
   * @param annee Objet année à supprimer
   * @returns Observable contenant la réponse du serveur
   */
  delete(annee: IAnnee): Observable<any> {
    return this.http.delete(
      this.appService.getUrl(`/annees/${annee.id}`),
      this.options,
    )
  }
}
