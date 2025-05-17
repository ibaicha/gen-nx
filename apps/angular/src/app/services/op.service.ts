import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, Observable, of, throwError } from 'rxjs'
import { CreateOpPortefeuilleDto, IOp } from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class OpService {
  OpDialogTitre = ''
  newOp: any = {}
  // editedOp: any = {};
  editedOp: IOp | undefined
  deletedOp: any = {}
  //ops: IOp[] = [];
  biens = []

  option = {}
  private baseUrl = this.appService.getUrl('/op')
  constructor(public http: HttpClient, private appService: AppService) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }
  }

  getOp(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.option)
  }

  getOps(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`, this.option)
  }
  /*
  getAllOpWithFilters(filter: any): Observable<any> {
    let httpParams = new HttpParams()
    for (const key in filter) {
      if (key in filter) {
        httpParams = httpParams.set(key, filter[key])
      }
    }
    const myHttp = this.http.get(this.baseUrl, {
      params: httpParams,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.option}`,
      }),
    })

    console.log('params', httpParams)
    return myHttp
  }
*/
  getOpsWithFilters(filter: any): Observable<IOp[]> {
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

    // const url = this.appService.getUrl('/ops')
    return this.http.get<IOp[]>(`${this.baseUrl}`, { params: httpParams })
  }

  /*
  getOpsWithFiltersOK1(filter: any): Observable<any> {
    let httpParams = new HttpParams()
    for (const key in filter) {
      if (key in filter) {
        httpParams = httpParams.set(key, filter[key])
      }
    }
    const myHttp = this.http.get(`${this.baseUrl}`, {
      params: httpParams,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.option}`,
      }),
    })

    console.log('params', httpParams)
    console.log('myHttp', myHttp)
    return myHttp
  }

  getOpsCustom(): Observable<any> {
    return this.http.get(this.appService.getUrl('/ops/custom'), this.option)
  }

  getAllOpsCustomFromAgence(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/ops/custom/agence/' + id),
      this.option,
    )
  }
 
  create(op: IOp): Observable<any> {
    const body: any = {}
    console.log(op)
    body.id = null
    body.name = op.name
    //body.typeOpId = op.typeOp.id;

    return this.http.post(
      this.appService.getUrl('/ops/create'),
      body,
      this.option,
    )
  }
  update(op: IOp): Observable<any> {
    const body: any = {}
    body.id = op.id
    body.name = op.name
    //body.typeOpId = op.typeOp.id;

    return this.http.put(
      this.appService.getUrl('/ops/update/' + op.id),
      body,
      this.option,
    )
  }

  delete(op: IOp): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/ops/' + op.id),
      this.option,
    )
  }
*/
  getAll(): Observable<IOp[]> {
    return this.http.get<IOp[]>(`${this.baseUrl}/all`, this.option)
  }

  getById(id: number): Observable<IOp> {
    // return this.http.get<IOp>(`${this.baseUrl}/${id}`)
    return this.http.get<IOp>(`${this.baseUrl}/${id}`, this.option)
  }

  create(op: Partial<IOp>): Observable<IOp> {
    return this.http.post<IOp>(`${this.baseUrl}`, op)
  }

  createPorteFeuille(
    opPortefeuille: Partial<CreateOpPortefeuilleDto>,
  ): Observable<CreateOpPortefeuilleDto> {
    return this.http.post<CreateOpPortefeuilleDto>(
      `${this.baseUrl}/porte-feuille`,
      opPortefeuille,
    )
  }

  update(id: number, op: Partial<IOp>): Observable<IOp> {
    return this.http.put<IOp>(`${this.baseUrl}/update/${id}`, op)
  }

  delete(op: Partial<IOp>): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${op}`)
  }
}
