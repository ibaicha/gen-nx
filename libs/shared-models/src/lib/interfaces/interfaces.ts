export interface IUser {
  id: number
  email: string
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
  roleId?: number
}

export interface IRole {
  id: number
  name: string
}

export interface IProfile {
  id: number
  firstName: string
  lastName: string
  phone: string
  address: string
  userId?: number
}

export interface IGenre {
  id: number
  name: string
}

export interface IAnnee {
  id: number
  name: string
  valeur: number

  // 🔁 Relations
  Campagne?: ICampagne[]
  Exploitation?: IExploitation[]
  MouvementStock?: IMouvementStock[]
  MouvementIntrant?: IMouvementIntrant[]
  Demande?: IDemande[]
  CreditAgence?: ICreditAgence[]
}

export interface ISaison {
  id: number
  name: string
  description: string

  // 🔁 Relations
  Campagne?: ICampagne[]
  Exploitation?: IExploitation[]
  MouvementStock?: IMouvementStock[]
  MouvementIntrant?: IMouvementIntrant[]
  Demande?: IDemande[]
  CreditAgence?: ICreditAgence[]
}

export interface ICampagne {
  id: number
  anneeId: number
  saisonId: number

  // 🔁 Relations
  annee?: IAnnee
  saison?: ISaison
}

export interface IFormeJuridique {
  id: number
  name: string

  // 🔁 Relations
  Op?: IOp[]
  Societe?: ISociete[]
}

export interface IAnnee {
  id: number
  name: string
  valeur: number

  // 🔁 Relations
  Campagne?: ICampagne[]
  Exploitation?: IExploitation[]
  MouvementStock?: IMouvementStock[]
  MouvementIntrant?: IMouvementIntrant[]
  Demande?: IDemande[]
  CreditAgence?: ICreditAgence[]
}

export interface IActivite {
  id: number
  name: string

  // 🔁 Relations
  Filiere?: IFiliere[]
  Service?: IService[]
  FamilleTypeService?: IFamilleTypeService[]
  OpActivite?: IOpActivite[]
  PointActivite?: IPointActivite[]
  Demande?: IDemande[]
  ProducteurActivite?: IProducteurActivite[]
}

export interface IPays {
  id: number
  name: string
  sigle?: string

  // 🔁 Relations
  Zone?: IZone[]
  Region?: IRegion[]
}

export interface IZone {
  id: number
  name: string
  paysId: number

  // 🔁 Relations
  pays?: IPays
  UserZone?: IUserZone[]
  SousZone?: ISousZone[]
}

export interface ILocalite {
  id: number
  name: string

  // 🔁 Relations
  sousZoneId?: number
  sousZone?: ISousZone
  departementId?: number
  departement?: IDepartement
  Point?: IPoint[]
  Op?: IOp[]
  UserLocalite?: IUserLocalite[]
  Producteur?: IProducteur[]
  Village?: IVillage[]
}

export interface IRegion {
  id: number
  name: string
  paysId: number

  // 🔁 Relations
  pays?: IPays
  Departement?: IDepartement[]
}

export interface IDepartement {
  id: number
  name: string
  regionId: number

  // 🔁 Relations
  region?: IRegion
  Localite?: ILocalite[]
  Commune?: ICommune[]
}

// interfaces.ts

export interface IPoint {
  id: number
  name: string
  adresse?: string
  telephone?: string
  email?: string
  latitude?: number
  longitude?: number
  isActive: boolean
  isService: boolean
  isCollecte: boolean
  isTransformation: boolean
  isProduit: boolean
  isIntrant: boolean
  isVirtuel: boolean

  // 🔁 Relations
  societeId?: number
  societe?: ISociete
  localiteId?: number
  localite?: ILocalite
  UniteTransformation?: IUniteTransformation[]
  Entrepot?: IEntrepot[]
  Op?: IOp[]
  PointActivite?: IPointActivite[]
  PointAgence?: IPointAgence[]
  UserPoint?: IUserPoint[]
  PointService?: IPointService[]
  Demande?: IDemande[]
  AgenceOp?: IAgenceOp[]
}

export interface IPointActivite {
  id: number
  pointId: number
  activiteId: number

  // 🔁 Relations
  point?: IPoint
  activite?: IActivite
}

export interface ITypeSociete {
  id: number
  name: string

  // 🔁 Relations
  Societe?: ISociete[]
}

export interface ISociete {
  id: number
  name: string
  sigle: string
  email: string
  adresse: string
  telephone: string
  latitude: number
  longitude: number
  prenomContact: string
  nomContact: string
  emailContact: string
  telephoneContact: string
  typeSocieteId: number
  formeJuridiqueId?: number

  // 🔁 Relations
  typeSociete?: ITypeSociete
  formeJuridique?: IFormeJuridique
  Point?: IPoint[]
  Agence?: IAgence[]
  MouvementIntrant?: IMouvementIntrant[]
  UserSociete?: IUserSociete[]
  SocieteOp?: ISocieteOp[]
}

// interfaces.ts

export interface ISocieteOp {
  id: number
  compte: string
  numRegistre: string
  ninea: string

  // 🔁 Relations
  societeId: number
  societe?: ISociete
  opId: number
  op?: IOp
}

export interface IAgence {
  id: number
  name: string
  sigle: string
  email: string
  adresse: string
  telephone: string
  latitude: number
  longitude: number
  prenomContact: string
  nomContact: string
  emailContact: string
  telephoneContact: string
  societeId: number

  // 🔁 Relations
  societe?: ISociete
  PointAgence?: IPointAgence[]
  Exploitation?: IExploitation[]
  UserAgence?: IUserAgence[]
  Credit?: ICredit[]
  AgenceOp?: IAgenceOp[]
  CreditAgence?: ICreditAgence[]
}

export interface IAgenceOp {
  id: number
  agenceId: number
  opId: number
  pointId?: number | null

  // 🔁 Relations
  agence?: IAgence
  op?: IOp
  point?: IPoint
  CreditAgence?: ICreditAgence[]
}

export interface IPointAgence {
  id: number
  pointId: number
  agenceId: number

  // 🔁 Relations
  point?: IPoint
  agence?: IAgence
}

export interface ITypeRemboursement {
  id: number
  name: string

  // 🔁 Relations
  Remboursement?: IRemboursement[]
  RemboursementAgence?: IRemboursementAgence[]
}

// interfaces.ts

export interface IRemboursement {
  id: number
  date: Date
  pu?: number
  nombre_unite: number
  nombre_emballage: number
  valeur: number
  typeRemboursementId: number

  // 🔁 Relations
  typeRemboursement?: ITypeRemboursement
  creditId?: number
  credit?: ICredit
  emballageId?: number
  emballage?: IEmballage
  emplacementId?: number
  emplacement?: IEmplacement
}

export interface IRemboursementAgence {
  id: number
  date: Date
  pu?: number
  nombre_unite: number
  nombre_emballage: number
  valeur: number
  typeRemboursementId: number

  // 🔁 Relations
  typeRemboursement?: ITypeRemboursement
  creditAgenceId?: number
  creditAgence?: ICreditAgence
  emballageId?: number
  emballage?: IEmballage
  emplacementId?: number
  emplacement?: IEmplacement
  exploitationId?: number
  Exploitation?: IExploitation
}

export interface IUniteTransformation {
  id: number
  name: string

  // 🔁 Relations
  pointId: number
  point?: IPoint
  MouvementStock?: IMouvementStock[]
}

export interface IEntrepot {
  id: number
  name: string
  adresse: string
  pointId: number

  // 🔁 Relations
  point?: IPoint
  Emplacement?: IEmplacement[]
}

export interface IEmplacement {
  id: number
  name: string
  code?: number
  capacite: number
  familleEmplacementId: number
  entrepotId: number

  // 🔁 Relations
  familleEmplacement?: IFamilleEmplacement
  entrepot?: IEntrepot
  MouvementStock?: IMouvementStock[]
  MouvementIntrant?: IMouvementIntrant[]
  MouvementIntrantSource?: IMouvementIntrant[]
  MouvementIntrantDestination?: IMouvementIntrant[]
  Remboursement?: IRemboursement[]
  RemboursementAgence?: IRemboursementAgence[]
}

export interface IFamilleEmplacement {
  id: number
  name: string

  Emplacement?: IEmplacement[]
  Produit?: IProduit[]
}

export interface ITypeEmplacement {
  id: number
  name: string
}

export interface IFiliere {
  id: number
  name: string
  activiteId: number

  activite?: IActivite
  Produit?: IProduit[]
}

export interface IProduit {
  id: number
  name: string
  isDerive: boolean
  isEnsachage: boolean
  isActive: boolean

  filiereId: number
  filiere?: IFiliere

  familleEmplacementId?: number
  familleEmplacement?: IFamilleEmplacement

  Variete?: IVariete[]
  ProduitChargeExploitation?: IProduitChargeExploitation[]
}

export interface IVariete {
  id: number
  name: string
  surface_unite: string
  quantite_unite: string
  pu_unite: number
  rendement_unite: number
  isActive: boolean

  produitId: number
  produit?: IProduit

  VarianteService?: IVarianteService[]
  Exploitation?: IExploitation[]
  Recolte?: IRecolte[]
  MouvementStock?: IMouvementStock[]
  CreditAgence?: ICreditAgence[]
}

export interface IFamilleTypeService {
  id: number
  name: string
  activiteId: number

  activite?: IActivite
  TypeService?: ITypeService[]
}

export interface ITypeService {
  id: number
  name: string
  familleTypeServiceId: number
  familleTypeService?: IFamilleTypeService
  Service?: IService[]
}

export interface IService {
  id: number
  name: string

  typeServiceId: number
  typeService?: ITypeService

  activiteId: number
  activite?: IActivite

  VarianteService?: IVarianteService[]
}

export interface IVarianteService {
  id: number
  name: string
  conditionnement: string
  quantite: number
  pu: number
  valeur: number
  isActive: boolean
  isDefault: boolean

  serviceId: number
  service?: IService

  typeEmballageId: number
  typeEmballage?: ITypeEmballage

  uniteGrandeurId: number
  uniteGrandeur?: IUniteGrandeur

  varieteId?: number
  variete?: IVariete

  PointService?: IPointService[]
}

export interface IPointService {
  id: number
  reference: string
  pu: number
  quantiteStock: number

  pointId: number
  point?: IPoint

  varianteServiceId: number
  varianteService?: IVarianteService

  DemandeDetail?: IDemandeDetail[]
}

export interface IDemande {
  id: number
  createdAt: Date
  updatedAt: Date
  date?: Date

  activiteId: number
  activite?: IActivite

  anneeId: number
  annee?: IAnnee

  saisonId: number
  saison?: ISaison

  producteurId?: number
  producteur?: IProducteur

  opId?: number
  op?: IOp

  pointId: number
  point?: IPoint

  DemandeDetail?: IDemandeDetail[]
}

export interface IDemandeDetail {
  id: number
  createdAt: Date
  updatedAt: Date
  pu: number
  quantiteDemandee: number
  quantiteLivree: number
  quantiteRecue: number
  valeurDemandee: number
  valeurLivree: number
  valeurRecue: number
  unite: string
  observation: string

  pointServiceId: number
  pointService?: IPointService

  demandeId: number
  demande?: IDemande
}

export interface ITypeUniteGrandeur {
  id: number
  name: string

  UniteGrandeur?: IUniteGrandeur[]
}

export interface IUniteGrandeur {
  id: number
  name: string
  sigle: string
  typeUniteGrandeurId: number
  typeUniteGrandeur?: ITypeUniteGrandeur

  VarianteService?: IVarianteService[]
  SurUniteGrandeur?: ISurUniteGrandeur[]
  Emballage?: IEmballage[]

  ChargeExploitation?: IChargeExploitation[]
}

export interface ISurUniteGrandeur {
  id: number
  name: string
  valeur_reference: number
  uniteGrandeurId: number
  uniteGrandeur?: IUniteGrandeur
}

export interface ITypeEmballage {
  id: number
  name: string

  VarianteService?: IVarianteService[]
  Emballage?: IEmballage[]
  EmballageIntrant?: IEmballageIntrant[]
}

export interface IEmballage {
  id: number
  name: string
  conditionnement: string
  quantite: number
  pu: number
  valeur: number
  isActive: boolean
  isDefault: boolean

  typeEmballageId: number
  typeEmballage?: ITypeEmballage

  uniteGrandeurId: number
  uniteGrandeur?: IUniteGrandeur

  Recolte?: IRecolte[]
  MouvementStock?: IMouvementStock[]
  Remboursement?: IRemboursement[]
  RemboursementAgence?: IRemboursementAgence[]
}

export interface IEmballageIntrant {
  id: number
  name: string
  conditionnement: string
  quantite: number
  pu: number
  valeur: number
  isActive: boolean
  isDefault: boolean

  chargeExploitationId: number
  chargeExploitation?: IChargeExploitation

  typeEmballageId: number
  typeEmballage?: ITypeEmballage

  MouvementIntrant?: IMouvementIntrant[]
}

export interface ITypeMouvementIntrant {
  id: number
  name: string

  // 🔁 Relations
  ModeEntreeSortieIntrant?: IModeEntreeSortieIntrant[]
}

export interface IModeEntreeSortieIntrant {
  id: number
  code: string
  name: string
  typeMouvementIntrantId: number

  // 🔁 Relations
  typeMouvementIntrant?: ITypeMouvementIntrant
  MouvementIntrant?: IMouvementIntrant[]
}

export interface IMouvementIntrant {
  id: number
  date: Date
  pu: number
  quantiteEntreeEmballage: number
  quantiteSortieEmballage: number
  nombreUnite: number
  valeur: number
  lot: string
  modeEntreeSortieIntrantId: number
  anneeId: number
  saisonId: number
  chargeExploitationId?: number
  emplacementId?: number
  emplacementSourceId?: number
  emplacementDestinationId?: number
  opId?: number
  societeId?: number
  emballageIntrantId: number

  // 🔁 Relations
  modeEntreeSortieIntrant?: IModeEntreeSortieIntrant
  annee?: IAnnee
  saison?: ISaison
  chargeExploitation?: IChargeExploitation
  emplacement?: IEmplacement
  emplacementSource?: IEmplacement
  emplacementDestination?: IEmplacement
  op?: IOp
  societe?: ISociete
  emballageIntrant?: IEmballageIntrant
}

export interface ITypeMouvementStock {
  id: number
  name: string

  // 🔁 Relations
  ModeEntreeSortieStock?: IModeEntreeSortieStock[]
}

export interface IModeEntreeSortieStock {
  id: number
  code: string
  name: string
  typeMouvementStockId: number

  // 🔁 Relations
  typeMouvementStock?: ITypeMouvementStock
  MouvementStock?: IMouvementStock[]
}

export interface IMouvementStock {
  id: number
  date: Date
  pu: number
  quantiteEntreeEmballage: number
  quantiteSortieEmballage: number
  nombreUnite: number
  valeur: number
  lot: string
  opId?: number
  uniteTransformationId?: number
  varieteId: number
  modeEntreeSortieStockId: number
  anneeId: number
  saisonId: number
  emplacementId: number
  emballageId: number

  // 🔁 Relations
  op?: IOp
  uniteTransformation?: IUniteTransformation
  variete?: IVariete
  modeEntreeSortieStock?: IModeEntreeSortieStock
  annee?: IAnnee
  saison?: ISaison
  emplacement?: IEmplacement
  emballage?: IEmballage
}

export interface IProducteur {
  id: number
  compte: number
  prenom: string
  nom: string
  cni: string
  email: string
  telephone: string
  adresse: string
  latitude: number
  longitude: number
  isActive: boolean
  genreId: number
  localiteId: number

  // 🔁 Relations
  genre?: IGenre
  localite?: ILocalite
  ProducteurActivite?: IProducteurActivite[]
  OpProducteur?: IOpProducteur[]
  Demande?: IDemande[]
  UserProducteur?: IUserProducteur[]
}

export interface IProducteurActivite {
  id: number
  producteurId: number
  activiteId: number

  // 🔁 Relations
  producteur?: IProducteur
  activite?: IActivite
}

export interface IOp {
  id: number
  name: string
  sigle: string
  email: string
  telephone: string
  adresse: string
  latitude: number
  longitude: number
  prenomContact: string
  nomContact: string
  emailContact: string
  telephoneContact: string
  isActive: boolean
  formeJuridiqueId?: number
  localiteId?: number
  pointId?: number

  // 🔁 Relations
  formeJuridique?: IFormeJuridique
  localite?: ILocalite
  point?: IPoint
  OpActivite?: IOpActivite[]
  Exploitation?: IExploitation[]
  MouvementStock?: IMouvementStock[]
  MouvementIntrant?: IMouvementIntrant[]
  UserOp?: IUserOp[]
  Demande?: IDemande[]
  OpProducteur?: IOpProducteur[]
  SocieteOp?: ISocieteOp[]
  AgenceOp?: IAgenceOp[]
  CreditAgence?: ICreditAgence[]
}

export interface IOpProducteur {
  id: number
  opId: number
  producteurId: number

  // 🔁 Relations
  op?: IOp
  producteur?: IProducteur
}

export interface IOpActivite {
  id: number
  opId: number
  activiteId: number

  // 🔁 Relations
  op?: IOp
  activite?: IActivite
}

export interface ICredit {
  id: number
  date: Date
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  exploitationId: number
  agenceId: number

  // 🔁 Relations
  exploitation?: IExploitation
  agence?: IAgence
  Remboursement?: IRemboursement[]
}

export interface ICreditAgence {
  id: number
  date: Date
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  varieteId?: number
  anneeId?: number
  saisonId?: number
  agenceOpId?: number
  agenceId?: number
  opId?: number

  // 🔁 Relations
  variete?: IVariete
  annee?: IAnnee
  saison?: ISaison
  agenceOp?: IAgenceOp
  agence?: IAgence
  op?: IOp
  RemboursementAgence?: IRemboursementAgence[]
}

export interface IExploitation {
  id: number
  createdAt: Date
  updatedAt: Date
  compte: number
  date?: Date
  unite: string
  surface: number
  agenceId: number
  varieteId: number
  anneeId: number
  saisonId: number
  opId?: number

  // 🔁 Relations
  agence?: IAgence
  variete?: IVariete
  annee?: IAnnee
  saison?: ISaison
  op?: IOp
  Recolte?: IRecolte[]
  Credit?: ICredit[]
  ExploitationChargeExploitation?: IExploitationChargeExploitation[]
  RemboursementAgence?: IRemboursementAgence[]
}

export interface IExploitationChargeExploitation {
  id: number
  createdAt: Date
  updatedAt: Date
  pu: number
  quantite: number
  valeur: number
  unite: string
  date: Date
  observation: string
  exploitationId: number
  chargeExploitationId: number

  // 🔁 Relations
  exploitation?: IExploitation
  chargeExploitation?: IChargeExploitation
}

export interface IFamilleTypeChargeExploitation {
  id: number
  name: string

  // 🔁 Relations
  TypeChargeExploitation?: ITypeChargeExploitation[]
}

export interface ITypeChargeExploitation {
  id: number
  name: string
  familleTypeChargeExploitationId: number

  // 🔁 Relations
  familleTypeChargeExploitation?: IFamilleTypeChargeExploitation
  ChargeExploitation?: IChargeExploitation[]
}

export interface IFamilleChargeExploitation {
  id: number
  name: string

  // 🔁 Relations
  ChargeExploitation?: IChargeExploitation[]
}

export interface IChargeExploitation {
  id: number
  name: string
  unite: string
  pu: number
  quantite_unite_superficie: number
  isAchat: boolean
  isProduit: boolean
  isIntrant: boolean
  uniteGrandeurId?: number
  typeChargeExploitationId: number
  familleChargeExploitationId: number

  // 🔁 Relations
  uniteGrandeur?: IUniteGrandeur
  typeChargeExploitation?: ITypeChargeExploitation
  familleChargeExploitation?: IFamilleChargeExploitation
  ProduitChargeExploitation?: IProduitChargeExploitation[]
  EmballageIntrant?: IEmballageIntrant[]
  MouvementIntrant?: IMouvementIntrant[]
  ExploitationChargeExploitation?: IExploitationChargeExploitation[]
}

export interface IOpProducteur {
  id: number
  opId: number
  producteurId: number
}

export interface IOpActivite {
  id: number
  opId: number
  activiteId: number
}

export interface ICredit {
  id: number
  date: Date
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  exploitationId: number
  agenceId: number
}

export interface ICreditAgence {
  id: number
  date: Date
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  varieteId?: number
  anneeId?: number
  saisonId?: number
  agenceOpId?: number
  agenceId?: number
  opId?: number
}

export interface IExploitation {
  id: number
  createdAt: Date
  updatedAt: Date
  compte: number
  date?: Date
  unite: string
  surface: number
  agenceId: number
  varieteId: number
  anneeId: number
  saisonId: number
  opId?: number
}

export interface IExploitationChargeExploitation {
  id: number
  createdAt: Date
  updatedAt: Date
  pu: number
  quantite: number
  valeur: number
  unite: string
  date: Date
  observation: string
  exploitationId: number
  chargeExploitationId: number
}

export interface IFamilleTypeChargeExploitation {
  id: number
  name: string
}

export interface ITypeChargeExploitation {
  id: number
  name: string
  familleTypeChargeExploitationId: number
}

export interface IFamilleChargeExploitation {
  id: number
  name: string
}

export interface IChargeExploitation {
  id: number
  name: string
  unite: string
  pu: number
  quantite_unite_superficie: number
  isAchat: boolean
  isProduit: boolean
  isIntrant: boolean
  uniteGrandeurId?: number
  typeChargeExploitationId: number
  familleChargeExploitationId: number
}

export interface IProduitChargeExploitation {
  id: number
  produitId: number
  chargeExploitationId: number
}

export interface IRecolte {
  id: number
  date: Date
  pu: number
  nombre_unite: number
  nombre_emballage: number
  valeur: number
  exploitationId: number
  varieteId: number
  emballageId: number
}

export interface IUserZone {
  id: number
  userId: number
  zoneId: number
}

export interface IUserLocalite {
  id: number
  userId: number
  localiteId: number
}

export interface IUserPoint {
  id: number
  userId: number
  pointId: number
}

export interface IUserOp {
  id: number
  userId: number
  opId: number
}

export interface IUserAgence {
  id: number
  userId: number
  agenceId: number
}

export interface IUserSociete {
  id: number
  userId: number
  societeId: number
}

export interface IUserProducteur {
  id: number
  userId: number
  producteurId: number
}

export interface ISousZone {
  id: number
  name: string
  zoneId: number
}

export interface ICommune {
  id: number
  name: string
  departementId: number
}

export interface IVillage {
  id: number
  name: string
  communeId?: number
  localiteId?: number
}

export interface IUserSousZone {
  id: number
  userId: number
  sousZoneId: number
}

export interface IUserVillage {
  id: number
  userId: number
  villageId: number
}

export interface ISumCreditAgence {
  id: number
  sumCapitals: number
  sumCapitalsFormatString: string
  sumInterets: number
  sumInteretsFormatString: string
  sumMoratoires: number
  sumMoratoiresFormatString: string
  sumAutresEngagements: number
  sumAutresEngagementsFormatString: string
  sumExigibles: number
  sumExigiblesFormatString: string
  sumRemboursements: number
  sumRemboursementsFormatString: string
  sumTauxRemboursement: number
  sumtauxRemboursementFormatString: string
}

export interface IIdName {
  id: number
  name: string
}

 

export interface SelectItem {
  label: string
  value: number | undefined
  items: Item[]
}

export interface Item {
  label: string
  value: IVariete | undefined
}

export interface SelectItemChargeExploitation {
  label: string
  value: number
  items: ItemChargeExploitation[]
}
export interface ItemChargeExploitation {
  label: string
  value: IChargeExploitation
}

export interface DropdownEvent {
  value: {
    id: number
    name: string
  } | null // Inclure `null` pour gérer les cas où "Aucun" est sélectionné
}