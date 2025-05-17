import { Injectable } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { DbindexedService } from './dbindexed.service'

import { forkJoin, Observable } from 'rxjs'
import * as serviceURL_Data from '../../../../angular/public/assets/env.json'

@Injectable()
export class ShareService {
  public myToken = ''
  NewLigne = []
  private serviceURL = ''
  option = {}
  constructor(
    public http: HttpClient,
    private dbindexedService: DbindexedService,
    private appService: AppService,
  ) {
    this.option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.appService.getLocalToken(),
      }),
    }

    const data: any = serviceURL_Data
    console.log('Data', data.data[0]['serviceURL'])
    this.serviceURL = data.data[0]['serviceURL']
  }

  public myHeader = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8',
  )

  public myHeaderParam = this.myHeader.set('Authorization', 'Bearer ')

  public makeToken(token: string) {
    const header = { Authorization: `Bearer ${token}` }

    return {
      headers: header,
    }
  }

  public makeHeader() {
    return ''
  }

  getLogin(headers: any): Observable<any> {
    return this.http.post(this.serviceURL + 'auth/signin', headers)
  }

  getProfils(headers: any): Observable<any> {
    return this.http.get(this.serviceURL + 'api/profils', headers)
  }

  getAllUsers(headers: any): Observable<any> {
    return this.http.get(this.serviceURL + 'api/users/allusers', headers)
  }
  getUsers(headers: any): Observable<any> {
    return this.http.get(this.serviceURL + 'api/users', headers)
  }
  getUser(headers: any, userId: number): Observable<any> {
    return this.http.get(
      this.serviceURL + 'api/users/ ' + userId + '/specific',
      headers,
    )
  }
}
