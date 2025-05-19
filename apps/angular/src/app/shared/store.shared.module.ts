import { NgModule } from '@angular/core'

// Core Store Modules
import { OpStoreModule } from '../store/op/op-store.module'
import { CreditStoreModule } from '../store/credit/credit-store.module'

// Time-related Store Modules
import { AnneeStoreModule } from '../store/annee/annee-store.module'
import { SaisonStoreModule } from '../store/saison/saison-store.module'
import { CampagneStoreModule } from '../store/campagne/campagne-store.module'

// Entity Store Modules

import { SocieteStoreModule } from '../store/societe/societe-store.module'

import { TypeSocieteStoreModule } from '../store/type_societe/type-societe-store.module'

// Asset Store Modules

import { PointStoreModule } from '../store/point/point-store.module'
import { PointAgenceStoreModule } from '../store/point_agence/point_agence-store.module'
import { ProduitStoreModule } from '../store/produit/produit-store.module'
import { VarieteStoreModule } from '../store/variete/variete-store.module'

// Location Store Modules
import { FamilleEmplacementStoreModule } from '../store/famille_emplacement/famille_emplacement-store.module'

// Business Process Store Modules
import { FiliereStoreModule } from '../store/filiere/filiere-store.module'
import { ExploitationStoreModule } from '../store/exploitation/exploitation-store.module'
import { ExploitationCustomStoreModule } from '../store/exploitation/exploitationCustom/exploitationCustom-store.module'
import { ChargeExploitationStoreModule } from '../store/charge_exploitation/charge_exploitation-store.module'
import { RemboursementStoreModule } from '../store/remboursement/remboursement-store.module'

// Inventory Store Modules
import { MouvementStockageStoreModule } from '../store/mouvement_stockage/mouvement_stockage-store.module'
import { MouvementIntrantStoreModule } from '../store/mouvement_intrant/mouvement_intrant-store.module'

// Identity Store Module
import { IdentifiantStoreModule } from '../store/identifiant/identifiant-store.module'
import { AgenceStoreModule } from '../store/agence/agence-store.module'
import { CreditAgenceStoreModule } from '../store/credit_agence/credit_agence-store.module'
import { FormeJuridiqueStoreModule } from '../store/forme_juridique/forme-juridique-store.module'
import { LocaliteStoreModule } from '../store/localite/localite-store.module'
import { ConstanteStoreModule } from '../store/constante/constante-store.module'

const CORE_STORE_MODULES = [
  OpStoreModule,
  CreditStoreModule,
  CreditAgenceStoreModule,
]

const TIME_STORE_MODULES = [
  AnneeStoreModule,
  SaisonStoreModule,
  CampagneStoreModule,
  FormeJuridiqueStoreModule,
  LocaliteStoreModule,
  ConstanteStoreModule,
]

const ENTITY_STORE_MODULES = [
  SocieteStoreModule,
  AgenceStoreModule,

  TypeSocieteStoreModule,
]

const ASSET_STORE_MODULES = [
  PointStoreModule,
  PointAgenceStoreModule,
  ProduitStoreModule,
  VarieteStoreModule,
]

const LOCATION_STORE_MODULES = [FamilleEmplacementStoreModule]

const BUSINESS_PROCESS_STORE_MODULES = [
  FiliereStoreModule,
  ExploitationStoreModule,
  ExploitationCustomStoreModule,
  ChargeExploitationStoreModule,
  RemboursementStoreModule,
]

const INVENTORY_STORE_MODULES = [
  MouvementStockageStoreModule,
  MouvementIntrantStoreModule,
]

const IDENTITY_STORE_MODULES = [IdentifiantStoreModule]

@NgModule({
  imports: [
    ...CORE_STORE_MODULES,
    ...TIME_STORE_MODULES,
    ...ENTITY_STORE_MODULES,
    ...ASSET_STORE_MODULES,
    ...LOCATION_STORE_MODULES,
    ...BUSINESS_PROCESS_STORE_MODULES,
    ...INVENTORY_STORE_MODULES,
    ...IDENTITY_STORE_MODULES,
  ],
  exports: [
    ...CORE_STORE_MODULES,
    ...TIME_STORE_MODULES,
    ...ENTITY_STORE_MODULES,
    ...ASSET_STORE_MODULES,
    ...LOCATION_STORE_MODULES,
    ...BUSINESS_PROCESS_STORE_MODULES,
    ...INVENTORY_STORE_MODULES,
    ...IDENTITY_STORE_MODULES,
  ],
})
export class StoreSharedModule {}
