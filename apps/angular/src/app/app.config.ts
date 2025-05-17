import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core'
import { appRoutes } from './app.routes'
import { provideRouter } from '@angular/router'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { EntityDataModule } from '@ngrx/data'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DialogService } from 'primeng/dynamicdialog'
import { AuthInterceptor } from './composants/auth/shared/authconfig.interceptor'
import { entityConfig } from './entity-metadata'
import { reducers, metaReducers } from './reducers'
import { MaterialSharedModule } from './shared/material.shared.module'
import { PrimeNgModule } from './shared/primeng.shared.module'
import { ServiceSharedModule } from './shared/service.shared.module'
import { StoreSharedModule } from './shared/store.shared.module'

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      PrimeNgModule,
      MaterialSharedModule,
      ServiceSharedModule,
      StoreSharedModule,
      StoreModule.forRoot(reducers, {
        metaReducers,
      }),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot(),
      EntityDataModule.forRoot(entityConfig),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ),

    DialogService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    provideRouter(appRoutes),
    provideAnimations(),
  ],
}
