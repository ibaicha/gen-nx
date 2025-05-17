import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { AuthModule } from '../auth/auth.module'
import { RoleModule } from '../auth/role/role.module'
import { ProfileModule } from '../auth/profile/profile.module'
import { PrismaModule } from '../prisma/prisma.module'
import { MailerModule } from '../mailer/mailer.module'
import { UserAgenceModule } from '../auth/permissions/user_agence/user_agence.module'
import { UserOpModule } from '../auth/permissions/user_op/user_op.module'
import { CampagneModule } from '../constants/campagne/campagne.module'
import { ModeEntreeSortieIntrantModule } from '../constants/mode_entree_sortie_intrant/mode_entree_sortie_intrant.module'
import { ModeEntreeSortieStockModule } from '../constants/mode_entree_sortie_stock/mode_entree_sortie_stock.module'
import { SaisonModule } from '../constants/saison/saison.module'
import { TypeMouvementIntrantModule } from '../constants/type_mouvement_intrant/type_mouvement_intrant.module'
import { TypeMouvementStockModule } from '../constants/type_remboursement/type_mouvement_stock.module'
import { CreditModule } from '../credits/credit/credit.module'
import { RemboursementModule } from '../credits/remboursement/remboursement.module'
import { TypeRemboursementModule } from '../credits/type_remboursement/type_remboursement.module'
import { EmballageModule } from '../emballages/emballage/emballage.module'
import { TypeEmballageModule } from '../emballages/type_emballage/type_emballage.module'
import { TypeUniteGrandeurModule } from '../emballages/type_unite_grandeur/type_unite_grandeur.module'
import { UniteGrandeurModule } from '../emballages/unite_grandeur/unite_grandeur.module'
import { ChargeExploitationModule } from '../exploitations/charge_exploitation/charge_exploitation.module'
import { ExploitationModule } from '../exploitations/exploitation/exploitation.module'
import { ExploitationChargeExploitationModule } from '../exploitations/exploitation_charge_exploitation/exploitation_charge_exploitation.module'
import { FamilleChargeExploitationModule } from '../exploitations/famille_charge_exploitation/famille_charge_exploitation.module'
import { ProduitChargeExploitationModule } from '../exploitations/produit_charge_exploitation/produit_charge_exploitation.module'
import { RecolteModule } from '../exploitations/recolte/recolte.module'
import { TypeChargeExploitationModule } from '../exploitations/type_charge_exploitation/type_charge_exploitation.module'
import { FamilleEmplacementModule } from '../filieres/famille_emplacement/famille_emplacement.module'
import { FiliereModule } from '../filieres/filiere/filiere.module'
import { ProduitModule } from '../filieres/produit/produit.module'
import { VarieteModule } from '../filieres/variete/variete.module'
import { EmballageIntrantModule } from '../intrant/emballage_intrant/emballage_intrant.module'
import { MouvementIntrantModule } from '../intrant/mouvement_intrant/mouvement_intrant.module'
import { LocaliteModule } from '../localites/localite/localite.module'
import { PaysModule } from '../localites/pays/pays.module'
import { SousZoneModule } from '../localites/sous_zone/sous_zone.module'
import { VillageModule } from '../localites/village/village.module'
import { ZoneModule } from '../localites/zone/zone.module'
//import { EventsGateway } from '../socket/events/events.gateway';
import { MouvementStockModule } from '../stockage/mouvement_stock/mouvement_stock.module'
import { EmplacementModule } from '../structures/emplacement/emplacement.module'
import { EntrepotModule } from '../structures/entrepot/entrepot.module'

import { UniteTransformationModule } from '../unites/unite_transformation/unite_transformation.module'
import { AnneeModule } from '../constants/annee/annee.module'
import { ProducteurModule } from '../tiers/producteur/producteur.module'
import { OpModule } from '../tiers/op/op.module'
import { RegionModule } from '../localites/region/region.module'
import { DepartementModule } from '../localites/departement/departement.module'
import { FormeJuridiqueModule } from '../tiers/forme_juridique/forme_juridique.module'
import { OpActiviteModule } from '../tiers/op_activite/op_activite.module'
import { ActiviteModule } from '../services/activite/activite.module'
import { TypeServiceModule } from '../services/type_service/type_service.module'
import { ServiceModule } from '../services/service/service.module'
import { VarianteServiceModule } from '../services/variante_service/variante_service.module'
import { FamilleTypeServiceModule } from '../services/famille_type_service/famille_type_service.module'
import { PointActiviteModule } from '../tiers/point_activite/point_activite.module'
import { PointServiceModule } from '../services/point_service/point_service.module'
import { DemandeModule } from '../demandes/demande/demande.module'
import { DemandeDetailModule } from '../demandes/demande_detail/demande_detail.module'
import { CreditAgenceModule } from '../credits/credit_agence/credit_agence.module'
import { RemboursementAgenceModule } from '../credits/remboursement_agence/remboursement_agence.module'
import { PointModule } from '../tiers/point/point.module'
import { TypeSocieteModule } from '../tiers/type_societe/type_societe.module'
import { SocieteModule } from '../tiers/societe/societe.module'
import { PointAgenceModule } from '../tiers/point_agence/point_agence.module'
import { AgenceModule } from '../tiers/agence/agence.module'
import { AgenceOpModule } from '../tiers/agence_op/agence_op.module'
import { SocieteOpModule } from '../tiers/societe_op/societe_op.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    RoleModule,
    ProfileModule,
    PrismaModule,
    MailerModule,
    PaysModule,
    ZoneModule,
    SousZoneModule,
    LocaliteModule,
    OpModule,
    ProducteurModule,
    VillageModule,
    TypeChargeExploitationModule,
    FamilleChargeExploitationModule,
    ChargeExploitationModule,
    FiliereModule,
    ProduitModule,
    VarieteModule,
    FamilleEmplacementModule,
    AnneeModule,
    SaisonModule,
    ExploitationChargeExploitationModule,
    ExploitationModule,
    TypeUniteGrandeurModule,
    UniteGrandeurModule,
    TypeEmballageModule,
    EmballageModule,
    UserOpModule,
    RecolteModule,
    CreditModule,
    TypeRemboursementModule,
    RemboursementModule,
    UserAgenceModule,
    UniteTransformationModule,
    TypeMouvementStockModule,
    ModeEntreeSortieStockModule,
    MouvementStockModule,
    EntrepotModule,
    EmplacementModule,
    CampagneModule,
    ModeEntreeSortieIntrantModule,
    TypeMouvementIntrantModule,
    MouvementIntrantModule,
    EmballageIntrantModule,
    PointModule,
    PointAgenceModule,
    TypeSocieteModule,
    ProduitChargeExploitationModule,
    RegionModule,
    DepartementModule,
    FormeJuridiqueModule,
    SocieteModule,
    SocieteOpModule,
    OpActiviteModule,
    FamilleEmplacementModule,
    FamilleChargeExploitationModule,
    ActiviteModule,
    TypeEmballageModule,
    TypeServiceModule,
    ServiceModule,
    VarieteModule,
    VarianteServiceModule,
    PointAgenceModule,
    TypeServiceModule,
    FamilleTypeServiceModule,
    PointActiviteModule,
    PointServiceModule,
    DemandeModule,
    DemandeDetailModule,
    CreditAgenceModule,
    RemboursementAgenceModule,
    AgenceModule,
    AgenceOpModule,
    PointAgenceModule,
    OpModule,
    AgenceModule,

    //EventsGateway,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
