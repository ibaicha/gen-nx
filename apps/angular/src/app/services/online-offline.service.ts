import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private internalConnectionChanged = new Subject<boolean>()

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable()
  }

  get isOnline() {
    return !!window.navigator.onLine
  }

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus())
    window.addEventListener('offline', () => this.updateOnlineStatus())
  }

  private updateOnlineStatus() {
    this.internalConnectionChanged.next(window.navigator.onLine)
  }
}
