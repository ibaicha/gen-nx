import { Injectable } from '@angular/core'
// import { Http, RequestOptionsArgs, Response} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Observable } from 'rxjs';
// import { Headers, RequestOptions } from '@angular/http';
// import { Body } from '@angular/http/src/body';

import * as serviceURL_Data from '../../../../angular/public/assets/env.json'

@Injectable()
export class AppService {
  // private serviceURL = 'https://api-horticulture.suivi-paddy.org/';
  // private serviceURL = 'http://192.168.1.20:8000/';
  // private serviceURL = 'http://192.168.43.97:80OO/';
  // private serviceURL = 'http://localhost:8000/';
  // private serviceURL = 'http://172.20.10.3:3000';
  // private serviceURL = 'https://test-p94w.onrender.com';
  // private serviceURL = 'http://172.16.1.127:3000';

  // private serviceURL = '';
  private serviceURLDev = ''

  public body = {}
  public myHeader = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8',
  )
  /*
private headers: Headers = new Headers(
  {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
);
*/

  constructor(private http: HttpClient) {
    const data: any = serviceURL_Data
    console.log('Data', data.data[0]['serviceURLDev'])
    this.serviceURLDev = data.data[0]['serviceURLDev']
  }

  getUrl(url: string): string {
    return this.serviceURLDev + url
  }

  getLocalToken(): any {
    return localStorage.getItem('access_token')
  }

  getLocalselectedCampagneAnneeId(): any {
    return localStorage.getItem('selectedCampagneAnneeId')
  }
  getLocalselectedCampagneAnneeName(): any {
    return localStorage.getItem('selectedCampagneAnneeName')
  }
  getLocalselectedCampagneSaisonId(): any {
    return localStorage.getItem('selectedCampagneSaisonId')
  }

  getLocalselectedCampagneSaisonName(): any {
    return localStorage.getItem('selectedCampagneSaisonName')
  }

  getLocalselectedAnneeId(): any {
    return localStorage.getItem('selectedAnneeId')
  }
  getLocalselectedAnneeName(): any {
    return localStorage.getItem('selectedAnneeName')
  }

  getLocalselectedSaisonId(): any {
    return localStorage.getItem('selectedSaisonId')
  }
  getLocalselectedSaisonName(): any {
    return localStorage.getItem('selectedSaisonName')
  }

  getLocalselectedProduitBrutId(): any {
    return localStorage.getItem('selectedProduitBrutId')
  }
  getLocalselectedProduitBrutName(): any {
    return localStorage.getItem('selectedProduitBrutName')
  }
  getLocalselectedProduitBruitIds(): any {
    return localStorage.getItem('selectedProduitBruitIds')
  }

  getLocalselectedPoint(): any {
    return localStorage.getItem('selectedPointId')
  }

  getLocalselectedOpId(): any {
    return localStorage.getItem('selectedOpId')
  }
  getLocalselectedVarieteId(): any {
    return localStorage.getItem('selectedVarieteId')
  }
  getLocalselectedLotId(): any {
    return localStorage.getItem('selectedLotId')
  }

  getLocalselectedSocieteId(): any {
    return localStorage.getItem('selectedSocieteId')
  }

  getLocalselectedAgenceId(): any {
    return localStorage.getItem('selectedAgenceId')
  }

  getLocalselectedVarieteName(): any {
    return localStorage.getItem('selectedVarieteName')
  }
  getLocalselectedOpName(): any {
    return localStorage.getItem('selectedOpName')
  }

  getLocalselectedExploitationId(): any {
    return localStorage.getItem('selectedExploitationId')
  }

  getLocalselectedChargeExploitationId(): any {
    return localStorage.getItem('selectedChargeExploitationId')
  }
  getLocalselectedChargeExploitationName(): any {
    return localStorage.getItem('selectedChargeExploitationName')
  }

  getLocalselectedChargeExploitationUniteId(): any {
    return localStorage.getItem('selectedChargeExploitationUniteId')
  }
  getLocalselectedChargeExploitationUniteName(): any {
    return localStorage.getItem('selectedChargeExploitationUniteName')
  }

  backgroundColorCredit(valeur: number): string {
    let myColor = '#A9F5A9'
    if (valeur >= 100) {
      myColor = '#A9F5A9'
    } else if (valeur < 100 && valeur >= 75) {
      myColor = '#D8F781'
    } else if (valeur < 75 && valeur >= 50) {
      myColor = '#EFFBF5'
    } else if (valeur < 50 && valeur >= 25) {
      myColor = '#F5DA81'
    } else if (valeur < 25 && valeur >= 0) {
      myColor = '#FA8258'
    }
    return myColor
  }

  removeNullProperties(obj: Record<string, any>) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key]
      }
    }
  }
}
