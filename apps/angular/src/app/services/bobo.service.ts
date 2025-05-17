import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IBobo } from '../interfaces/bobo.interface'

/**
 * Service pour gérer les opérations CRUD sur les bobos
 */
@Injectable({
  providedIn: 'root',
})
export class BoboService {
  /** Options HTTP avec les en-têtes d'authentification */
  private readonly option: { headers: HttpHeaders }

  constructor(
    private readonly http: HttpClient,
    private readonly appService: AppService
  ) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.appService.getLocalToken()}`,
      }),
    }
  }

  /**
   * Récupère un bobo par son identifiant
   * @param id - Identifiant du bobo
   * @returns Observable contenant le bobo
   */
  getBobo(id: number): Observable<IBobo> {
    return this.http.get<IBobo>(
      this.appService.getUrl(`/bobos/${id}`),
      this.option
    )
  }

  /**
   * Récupère tous les bobos
   * @returns Observable contenant la liste des bobos
   */
  getBobos(): Observable<IBobo[]> {
    return this.http.get<IBobo[]>(this.appService.getUrl('/bobos'), this.option)
  }

  /**
   * Crée un nouveau bobo
   * @param bobo - Le bobo à créer
   * @returns Observable contenant le bobo créé
   */
  create(bobo: IBobo): Observable<IBobo> {
    const body: Partial<IBobo> = {
      id: undefined,
      ...this.extractBoboData(bobo)
    }

    return this.http.post<IBobo>(
      this.appService.getUrl('/bobos'),
      body,
      this.option
    )
  }

  /**
   * Met à jour un bobo existant
   * @param bobo - Le bobo à mettre à jour
   * @returns Observable contenant le bobo mis à jour
   */
  update(bobo: IBobo): Observable<IBobo> {
    const body: Partial<IBobo> = {
      id: bobo.id,
      ...this.extractBoboData(bobo)
    }

    return this.http.put<IBobo>(
      this.appService.getUrl('/bobos'),
      body,
      this.option
    )
  }

  /**
   * Supprime un bobo
   * @param bobo - Le bobo à supprimer
   * @returns Observable contenant le bobo supprimé
   */
  delete(bobo: IBobo): Observable<IBobo> {
    return this.http.delete<IBobo>(
      this.appService.getUrl(`/bobos/${bobo.id}`),
      this.option
    )
  }

  /**
   * Extrait les données communes d'un bobo pour les requêtes create/update
   * @param bobo - Le bobo source
   * @returns Les données extraites
   */
  private extractBoboData(bobo: IBobo): Partial<IBobo> {
    return {
      nom: bobo.nom,
      description: bobo.description,
      dateCreation: bobo.dateCreation,
      statut: bobo.statut,
      priorite: bobo.priorite,
      categorie: bobo.categorie,
      responsable: bobo.responsable,
      commentaires: bobo.commentaires,
      tags: bobo.tags
    }
  }
}
