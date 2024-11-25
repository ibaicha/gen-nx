import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../auth/role/role.module';
import { ProfileModule } from '../auth/profile/profile.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from '../mailer/mailer.module';
import { UserAgenceModule } from '../auth/permissions/user_agence/user_agence.module';
import { UserOpModule } from '../auth/permissions/user_op/user_op.module';
import { CommentModule } from '../comment/comment.module';
//import { AnneeModule } from '../constants/annee/annee.module';
import { CampagneModule } from '../constants/campagne/campagne.module';
import { IdentifiantModule } from '../constants/identifiant/identifiant.module';
import { ModeEntreeSortieIntrantModule } from '../constants/mode_entree_sortie_intrant/mode_entree_sortie_intrant.module';
import { ModeEntreeSortieStockModule } from '../constants/mode_entree_sortie_stock/mode_entree_sortie_stock.module';
import { SaisonModule } from '../constants/saison/saison.module';
import { TypeMouvementIntrantModule } from '../constants/type_mouvement_intrant/type_mouvement_intrant.module';
import { TypeMouvementStockModule } from '../constants/type_remboursement/type_mouvement_stock.module';
import { CreditModule } from '../credits/credit/credit.module';
import { RemboursementModule } from '../credits/remboursement/remboursement.module';
import { TypeRemboursementModule } from '../credits/type_remboursement/type_remboursement.module';
import { EmballageModule } from '../emballages/emballage/emballage.module';
import { TypeEmballageModule } from '../emballages/type_emballage/type_emballage.module';
import { TypeUniteGrandeurModule } from '../emballages/type_unite_grandeur/type_unite_grandeur.module';
import { UniteGrandeurModule } from '../emballages/unite_grandeur/unite_grandeur.module';
import { ChargeExploitationModule } from '../exploitations/charge_exploitation/charge_exploitation.module';
import { ExploitationModule } from '../exploitations/exploitation/exploitation.module';
import { ExploitationChargeExploitationModule } from '../exploitations/exploitation_charge_exploitation/exploitation_charge_exploitation.module';
import { FamilleChargeExploitationModule } from '../exploitations/famille_charge_exploitation/famille_charge_exploitation.module';
import { ProduitChargeExploitationModule } from '../exploitations/produit_charge_exploitation/produit_charge_exploitation.module';
import { RecolteModule } from '../exploitations/recolte/recolte.module';
import { TypeChargeExploitationModule } from '../exploitations/type_charge_exploitation/type_charge_exploitation.module';
import { FamilleEmplacementModule } from '../filieres/famille_emplacement/famille_emplacement.module';
import { FiliereModule } from '../filieres/filiere/filiere.module';
import { ProduitModule } from '../filieres/produit/produit.module';
import { VarieteModule } from '../filieres/variete/variete.module';
import { EmballageIntrantModule } from '../intrant/emballage_intrant/emballage_intrant.module';
import { MouvementIntrantModule } from '../intrant/mouvement_intrant/mouvement_intrant.module';
import { LocaliteModule } from '../localites/localite/localite.module';
import { PaysModule } from '../localites/pays/pays.module';
import { SousZoneModule } from '../localites/sous_zone/sous_zone.module';
import { VillageModule } from '../localites/village/village.module';
import { ZoneModule } from '../localites/zone/zone.module';
import { OpModule } from '../ops/op/op.module';
import { ProducteurModule } from '../ops/producteur/producteur.module';
import { TypeOpModule } from '../ops/type_op/type_op.module';
import { PostModule } from '../post/post.module';
//import { EventsGateway } from '../socket/events/events.gateway';
import { MouvementStockModule } from '../stockage/mouvement_stock/mouvement_stock.module';
import { EmplacementModule } from '../structures/emplacement/emplacement.module';
import { EntrepotModule } from '../structures/entrepot/entrepot.module';
import { PointModule } from '../structures/point/point.module';
import { PointAgenceModule } from '../structures/point_agence/point_agence.module';
import { SocieteModule } from '../structures/societe/societe.module';
import { TypeSocieteModule } from '../structures/type_societe/type_societe.module';
import { UniteTransformationModule } from '../unites/unite_transformation/unite_transformation.module';
import { AnneeModule } from '../constants/annee/annee.module';

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
    PostModule,
    CommentModule,
    PaysModule,
    ZoneModule,
    SousZoneModule,
    LocaliteModule,
    TypeOpModule,
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
    SocieteModule,
    ProduitChargeExploitationModule,
    IdentifiantModule,
   //EventsGateway,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

