import { Injectable } from '@angular/core'
import { NavigationExtras, Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Force reloading a route by temporarily navigating away and back again
   * Adds a minimum delay before calling onAfterReload.
   *
   * @param route target route path (no leading slash)
   * @param onBeforeReload optional callback before reload
   * @param onAfterReload optional callback after reload
   * @param extras optional NavigationExtras (queryParams, state, etc.)
   * @param minDelayMs minimum delay in milliseconds before hiding loader
   */
  reloadRoute(
    route: string,
    onBeforeReload?: () => void,
    onAfterReload?: () => void,
    extras: NavigationExtras = {},
    minDelayMs = 1000,
  ): void {
    console.log('🔁 Navigating to:', route)
    onBeforeReload?.()
    const start = Date.now()

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/' + route], extras).then(() => {
        const elapsed = Date.now() - start
        const remaining = Math.max(minDelayMs - elapsed, 0)

        setTimeout(() => {
          console.log('✅ Reloaded route:', route)
          onAfterReload?.()
        }, remaining)
      })
    })
  }
}
