import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

// Auth Services
import { AuthService } from '../composants/auth/shared/auth.service'

// Core Services
import { OpService } from '../services/op.service'
import { CreditService } from '../services/credit.service'

// Time-related Services
import { AnneeService } from '../services/annee.service'
import { SaisonService } from '../services/saison.service'
import { CampagneService } from '../services/campagne.service'

// Entity Services
import { SocieteService } from '../services/societe.service'

import { TypeSocieteService } from '../services/type-societe.service'

// Asset Services
 
import { PointService } from '../services/point.service'
import { PointAgenceService } from '../services/point-agence.service'
import { ProduitService } from '../services/produit.service'
import { VarieteService } from '../services/variete.service'

// Location Services
import { FamilleEmplacementService } from '../services/famille-emplacement.service'

// Business Process Services
import { FiliereService } from '../services/filiere.service'
import { ExploitationService } from '../services/exploitation.service'
import { RemboursementService } from '../services/remboursement.service'
import { ChargeExploitationService } from '../services/charge-exploitation.service'

// Inventory Services
import { MouvementStockageService } from '../services/mouvement-stockage.service'
import { MouvementIntrantService } from '../services/mouvement-intrant.service'

// Identity Service
import { IdentifiantService } from '../services/identifiant.service'
import { ShareService } from '../services/share.service'
import { AppService } from '../services/app.service'
import { AgenceService } from '../services/agence.service'

const AUTH_SERVICES = [AuthService, AppService, ShareService]

const CORE_SERVICES = [OpService, CreditService]

const TIME_SERVICES = [AnneeService, SaisonService, CampagneService]

const ENTITY_SERVICES = [
  SocieteService,
  AgenceService,

  TypeSocieteService,
]

const ASSET_SERVICES = [
 
  PointService,
  PointAgenceService,
  ProduitService,
  VarieteService,
]

const LOCATION_SERVICES = [FamilleEmplacementService]

const BUSINESS_PROCESS_SERVICES = [
  FiliereService,
  ExploitationService,
  RemboursementService,
  ChargeExploitationService,
]

const INVENTORY_SERVICES = [MouvementStockageService, MouvementIntrantService]

const IDENTITY_SERVICES = [IdentifiantService]

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    ...AUTH_SERVICES,
    ...CORE_SERVICES,
    ...TIME_SERVICES,
    ...ENTITY_SERVICES,
    ...ASSET_SERVICES,
    ...LOCATION_SERVICES,
    ...BUSINESS_PROCESS_SERVICES,
    ...INVENTORY_SERVICES,
    ...IDENTITY_SERVICES,
  ],
})
export class ServiceSharedModule {}
