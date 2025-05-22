import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

// Instantiate Prisma Client
const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  // ... your Prisma Client goes here
  await deletePermission()
  await deleteOp()
  await deleteLocalite()
  await deleteRoleUserProfile()
  await deleteTiers()
  await deleteService()
  await deleteEmballage()
  await deleteFiliere()
  await deleteConstants()
  // END DELETE

  await addConstants()
  await addRoleUserProfile()
  await addLocalite()
  await addTiers()
  await addEmballage()
  await addFiliere()
  await addService()
}

async function deleteCredit() {
  console.log(' -----------DELETE REMBOURSEMENT -----------')
  await prisma.remboursement.deleteMany({})
  console.log(' remboursement deleted')

  console.log(' -----------DELETE TYPE REMBOURSEMENT -----------')
  await prisma.typeRemboursement.deleteMany({})
  console.log(' type remboursement deleted')

  console.log(' -----------DELETE CREDIT -----------')
  await prisma.credit.deleteMany({})
  console.log(' credit deleted')

  console.log(' -----------DELETE POINT AGENCES -----------')
  await prisma.pointAgence.deleteMany({})
  console.log(' point agence deleted')

  console.log(' -----------DELETE AGENCE -----------')
  await prisma.agence.deleteMany({})
  console.log(' agence deleted')

  console.log(' -----------DELETE SOCIETE -----------')
  await prisma.societe.deleteMany({})
  console.log(' societe deleted')

  console.log(' -----------DELETE TYPE SOCIETE-----------')
  await prisma.typeSociete.deleteMany({})
  console.log(' type societe deleted')

  console.log(' -----------DELETE RECOLTE -----------')
  await prisma.recolte.deleteMany({})
  console.log(' recolte deleted')
}
async function deleteTiers() {
  console.log(' -----------DELETE TIERS -----------')
}
async function deleteService() {
  console.log(' -----------DELETE SERVICE -----------')
}
async function deleteEmballage() {
  console.log(' -----------DELETE TYPE EMBALLAGE -----------')
  await prisma.typeEmballage.deleteMany({})
  console.log(' type emballage deleted')
  console.log(' -----------DELETE TYPE UNITE GRANDEUR -----------')
  await prisma.typeUniteGrandeur.deleteMany({})
  console.log(' type unite grandeur deleted')
  await prisma.uniteGrandeur.deleteMany({})
  console.log(' unite grandeur deleted')
  await prisma.emballage.deleteMany({})
  console.log(' emballage deleted')
}
async function deleteFiliere() {
  console.log(' -----------DELETE VARIETE -----------')
  await prisma.variete.deleteMany({})
  console.log(' variete deleted')
  console.log(' -----------DELETE PRODUIT -----------')
  await prisma.produit.deleteMany({})
  console.log(' produit deleted')
  console.log(' -----------DELETE FILIERE -----------')
  await prisma.filiere.deleteMany({})
  console.log(' filiere deleted')
  console.log(' -----------DELETE FAMILLE EMPLACEMENT -----------')
  await prisma.familleEmplacement.deleteMany({})
  console.log(' famille emplacement deleted')
}
async function deletePermission() {
  console.log(' -----------DELETE PERMISSION -----------')

  await prisma.userZone.deleteMany({})
  console.log(' userZone deleted')

  await prisma.userLocalite.deleteMany({})
  console.log(' UserLocalite deleted')

  await prisma.userPoint.deleteMany({})
  console.log(' userPoint deleted')
}
async function deleteOp() {
  console.log(' -----------DELETE OP -----------')
  await prisma.producteur.deleteMany({})
  console.log(' producteur deleted')

  await prisma.op.deleteMany({})
  console.log(' op deleted')

  await prisma.point.deleteMany({})
  console.log(' point deleted')

  await prisma.activite.deleteMany({})
  console.log(' type op deleted')
}

async function deleteLocalite() {
  console.log(' -----------DELETE LOCALITES -----------')

  await prisma.localite.deleteMany({})
  console.log(' localite deleted')

  await prisma.zone.deleteMany({})
  console.log(' zone deleted')

  await prisma.departement.deleteMany({})
  console.log(' departement deleted')

  await prisma.region.deleteMany({})
  console.log(' region deleted')

  await prisma.pays.deleteMany({})
  console.log(' pays deleted')
}
async function deleteRoleUserProfile() {
  console.log(' -----------DELETE USER -----------')
  await prisma.profile.deleteMany({})
  console.log(' profile deleted')

  await prisma.user.deleteMany({})
  console.log(' user deleted')

  await prisma.role.deleteMany({})
  console.log(' role deleted')
}

async function deleteConstants() {
  console.log(' -----------DELETE CAMPAGNE -----------')
  await prisma.campagne.deleteMany({})
  console.log(' campagne deleted')
  console.log(' -----------DELETE ANNEE -----------')
  await prisma.annee.deleteMany({})
  console.log(' annee deleted')
  console.log(' -----------DELETE SAISON -----------')
  await prisma.saison.deleteMany({})
  console.log(' saison deleted')
}

async function addRoleUserProfile() {
  const hash = await bcrypt.hash('123456', 10)
  console.log(' ----------- ADD ROLES -----------')
  // CREATION DES ROLES
  // ADD ROLE ADMIN
  console.log(' add role: Admin')
  const role_admin = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  })
  console.log(' -----> add user: user_iba_gmx_fr')
  const user_iba_gmx_fr = await prisma.user.create({
    data: {
      username: 'iba',
      email: 'iba@gmx.fr',
      password: hash,
      roleId: role_admin.id,
    },
  })
  console.log(' -----> add profile: user_iba_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Ibrahima',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_iba_gmx_fr.id,
    },
  })

  // ADD ROLE ZONE
  console.log(' add role: Zone')
  const role_zone = await prisma.role.create({
    data: {
      name: 'Zone',
    },
  })

  // ADD ROLE LOCALITE
  console.log(' -----> add role: Localite')
  const role_localite = await prisma.role.create({
    data: {
      name: 'Localite',
    },
  })
  // ADD FOURNISSEUR
  console.log(' -----> add role: societe')
  const role_societe = await prisma.role.create({
    data: {
      name: 'Societe',
    },
  })

  // ADD POINT
  console.log(' -----> add role: Point')
  const role_point = await prisma.role.create({
    data: {
      name: 'Point',
    },
  })

  // ADD ROLE OP
  console.log(' -----> add role: Op')
  const role_op = await prisma.role.create({
    data: {
      name: 'Op',
    },
  })

  // ADD ROLE PRODUCTEUR
  console.log(' add role: Producteur')
  const role_producteur = await prisma.role.create({
    data: {
      name: 'Producteur',
    },
  })
  // ADD ROLE MAGASINIER
  console.log(' add role: Magasinier')
  const role_magasinier = await prisma.role.create({
    data: {
      name: 'Magasinier',
    },
  })
  // ADD ROLE AGENCE
  console.log(' add role: Agence')
  const role_agence = await prisma.role.create({
    data: {
      name: 'Agence',
    },
  })

  console.log(' -----> add user: user_aby_gmx_fr')
  const user_aby_gmx_fr = await prisma.user.create({
    data: {
      username: 'aby',
      email: 'aby@gmx.fr',
      password: hash,
      roleId: role_zone.id,
    },
  })
  console.log(' -----> add profile: user_aby_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Aby',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_aby_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_aicha_gmx_fr')
  const user_aicha_gmx_fr = await prisma.user.create({
    data: {
      username: 'aicha',
      email: 'aicha@gmx.fr',
      password: hash,
      roleId: role_localite.id,
    },
  })
  console.log(' -----> add profile: user_aicha_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Aichatou',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_aicha_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_mouhamed_gmx_fr')
  const user_mouhamed_gmx_fr = await prisma.user.create({
    data: {
      username: 'mouhamed',
      email: 'mouh@gmx.fr',
      password: hash,
      roleId: role_agence.id,
    },
  })
  console.log(' -----> add profile: user_mouhamed_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Mouhamed',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_mouhamed_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_abdou_gmx_fr')
  const user_abdou_gmx_fr = await prisma.user.create({
    data: {
      username: 'abdou',
      email: 'abdou@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  })
  console.log(' -----> add profile: user_abdou_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Abdou',
      lastName: 'SOUMARE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_abdou_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_badara_gmx_fr')
  const user_badara_gmx_fr = await prisma.user.create({
    data: {
      username: 'badara',
      email: 'badara@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  })
  console.log(' -----> add profile: user_badara_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Alioune Badara',
      lastName: 'SAMB',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_badara_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_souare_gmx_fr')
  const user_souare_gmx_fr = await prisma.user.create({
    data: {
      username: 'amadou',
      email: 'souare@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  })

  console.log(' -----> add profile: user_badara_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Amadou',
      lastName: 'SOUARE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_souare_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_serigne_gmx_fr')
  const user_serigne_gmx_fr = await prisma.user.create({
    data: {
      username: 'serigne',
      email: 'serigne@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  })
  console.log(' -----> add profile: user_serigne_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Serigne Ibrahima',
      lastName: 'Diop',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_serigne_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_jeyli_gmx_fr')
  const user_jeyli_gmx_fr = await prisma.user.create({
    data: {
      username: 'jeyli',
      email: 'jeyli@gmx.fr',
      password: hash,
      roleId: role_op.id,
    },
  })

  console.log(' -----> add profile: user_jeylany_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Jeylany',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_jeyli_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_ass_gmx_fr')
  const user_ass_gmx_fr = await prisma.user.create({
    data: {
      username: 'ass',
      email: 'ass@gmx.fr',
      password: hash,
      roleId: role_producteur.id,
    },
  })

  console.log(' -----> add profile: user_ass_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Ass Malick',
      lastName: 'FALL',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_ass_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_gamby_gmx_fr')
  const user_gamby_gmx_fr = await prisma.user.create({
    data: {
      username: 'gamby',
      email: 'gamby@gmx.fr',
      password: hash,
      roleId: role_societe.id,
    },
  })

  console.log(' -----> add profile: user_gamby_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Gamby',
      lastName: 'DIAGNE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_gamby_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_ossama_gmx_fr')
  const user_oussama_gmx_fr = await prisma.user.create({
    data: {
      username: 'oussama',
      email: 'oussama@gmx.fr',
      password: hash,
      roleId: role_magasinier.id,
    },
  })

  console.log(' -----> add profile: user_ossama_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Oussama',
      lastName: 'DIAGNE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_oussama_gmx_fr.id,
    },
  })

  console.log(' -----> add user: user_bineta_gmx_fr')
  const user_bineta_gmx_fr = await prisma.user.create({
    data: {
      username: 'Bineta',
      email: 'bineta@gmx.fr',
      password: hash,
      roleId: role_agence.id,
    },
  })

  console.log(' -----> add profile: user_bineta_gmx_fr')
  await prisma.profile.create({
    data: {
      firstName: 'Bineta',
      lastName: 'DIAGNE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_bineta_gmx_fr.id,
    },
  })

  /*
  console.log(' -----> add userAgence: user_bineta_gmx_fr')
  await prisma.userAgence.create({
    data: {
      userId: user_bineta_gmx_fr.id,
      agenceId: 1,
    },
  })

  console.log(' -----> add userAgence: user_mouhamed_gmx_fr')
  await prisma.userAgence.create({
    data: {
      userId: user_mouhamed_gmx_fr.id,
      agenceId: 1,
    },
  })
  */
}

async function addService() {
  console.log(' -----> add famille_type_service -------')
  // ADD INTRANT
  console.log(' add famille_type_service: intrant')
  const intrant = await prisma.familleTypeService.create({
    data: {
      name: 'Intrant',
      activiteId: 1,
    },
  })
  // ADD EQUIPEMENT
  console.log(' add famille_type_service: équipement')
  const equipement = await prisma.familleTypeService.create({
    data: {
      name: 'Équipement',
      activiteId: 1,
    },
  })

  console.log(' -----> add type_service -------')
  // ADD SEMENCE
  console.log(' add type_service: semence')
  const semence = await prisma.typeService.create({
    data: {
      name: 'Semence',
      familleTypeServiceId: intrant.id,
    },
  })
  // ADD ENGRAIS
  console.log(' add type_service: engrais')
  const engrais = await prisma.typeService.create({
    data: {
      name: 'Engrais',
      familleTypeServiceId: intrant.id,
    },
  })

  // ADD PESTICIDE
  console.log(' add type_service: pesticide')
  const pesticide = await prisma.typeService.create({
    data: {
      name: 'Pesticide',
      familleTypeServiceId: intrant.id,
    },
  })
  // ADD EQUIPEMENT
  console.log(' add type_service: machine')
  const equipementType = await prisma.typeService.create({
    data: {
      name: 'Machine',
      familleTypeServiceId: equipement.id,
    },
  })

  console.log(' -----> add service -------')
  // ADD BASE
  console.log(' add service: base')
  const semenceBase1 = await prisma.service.create({
    data: {
      name: 'Base (G1)',
      typeServiceId: semence.id,
      activiteId: 1,
    },
  })

  // ADD PREBASE (G1)
  console.log(' add service: prebase (G0)')
  const semencePrebase0 = await prisma.service.create({
    data: {
      name: 'Prebase (G0)',
      typeServiceId: semence.id,
      activiteId: 1,
    },
  })
  // ADD CERTIFIE (G2)
  console.log(' add service: Certifiée (G2)')
  const semenceCertifiee2 = await prisma.service.create({
    data: {
      name: 'Certifiée (G2)',
      typeServiceId: semence.id,
      activiteId: 1,
    },
  })
  // ADD CERTIFIEE (G3)
  console.log(' add service: Certifiée (G3)')
  const semenceCertifiee3 = await prisma.service.create({
    data: {
      name: 'Certifiée (G3)',
      typeServiceId: semence.id,
      activiteId: 1,
    },
  })

  // ADD COMMERCIALE
  console.log(' add service: Commerciale')
  const semenceCommerciale = await prisma.service.create({
    data: {
      name: 'Commerciale',
      typeServiceId: semence.id,
      activiteId: 1,
    },
  })
  // ADD FERMIERE
  console.log(' add service: Fermiere')
  const semenceFermiere = await prisma.service.create({
    data: {
      name: 'Fermière',
      typeServiceId: semence.id,
      activiteId: 1,
    },
  })
  // ADD PROPANIL
  console.log(' add service: propanil')
  const propanil = await prisma.service.create({
    data: {
      name: 'Propanil',
      typeServiceId: pesticide.id,
      activiteId: 1,
    },
  })

  // WEEDONE
  console.log(' add service: weedone')
  const weedone = await prisma.service.create({
    data: {
      name: 'Weedone',
      typeServiceId: pesticide.id,
      activiteId: 1,
    },
  })

  // LONDAX
  console.log(' add service: londax')
  const londax = await prisma.service.create({
    data: {
      name: 'Londax',
      typeServiceId: engrais.id,
      activiteId: 1,
    },
  })

  // ADD UREE
  console.log(' add service: uree')
  const uree = await prisma.service.create({
    data: {
      name: 'Uree',
      typeServiceId: engrais.id,
      activiteId: 1,
    },
  })

  // ADD NPK
  console.log(' add service: NPK')
  const npk = await prisma.service.create({
    data: {
      name: 'NPK',
      typeServiceId: engrais.id,
      activiteId: 1,
    },
  })

  // ADD MOISSONNEUSE
  console.log(' add service: moissonneuse')
  const moissonneuse = await prisma.service.create({
    data: {
      name: 'Moissonneuse',
      typeServiceId: equipementType.id,
      activiteId: 1,
    },
  })
  // ADD TRACTEUR
  console.log(' add service: tracteur')
  const tracteur = await prisma.service.create({
    data: {
      name: 'Tracteur',
      typeServiceId: equipementType.id,
      activiteId: 1,
    },
  })

  // ADD VARIANTE LONDAX
  console.log(' add variante: Londax')
  const londax_variante10w = await prisma.varianteService.create({
    data: {
      name: 'Londax 10 W / 120g',
      conditionnement: 'sachet',
      quantite: 120,
      pu: 800,
      valeur: 800,
      isActive: true,
      isDefault: true,
      serviceId: londax.id,
      typeEmballageId: 3,
      uniteGrandeurId: 6,
    },
  })
  const londax_variante60DF = await prisma.varianteService.create({
    data: {
      name: 'Londax 60 DF / 250g',
      conditionnement: 'sachet',
      quantite: 250,
      pu: 2000,
      valeur: 2000,
      isActive: true,
      isDefault: false,
      serviceId: londax.id,
      typeEmballageId: 3,
      uniteGrandeurId: 6,
    },
  })

  const londax_varianteWG = await prisma.varianteService.create({
    data: {
      name: 'Londax WG / 4 kg',
      conditionnement: 'sachet',
      quantite: 1,
      pu: 25000,
      valeur: 25000,
      isActive: true,
      isDefault: false,
      serviceId: londax.id,
      typeEmballageId: 1,
      uniteGrandeurId: 3,
    },
  })

  const uree46 = await prisma.varianteService.create({
    data: {
      name: 'UREE 46%',
      conditionnement: 'Sachet',
      quantite: 1,
      pu: 1400,
      valeur: 1400,
      isActive: true,
      isDefault: false,
      serviceId: uree.id,
      typeEmballageId: 2,
      uniteGrandeurId: 3,
    },
  })

  const mais_hybride_2kg = await prisma.varianteService.create({
    data: {
      name: 'MAÏS Hybride F1 KABAMANOJ 2,5kg ',
      conditionnement: 'Sac',
      quantite: 2,
      pu: 8750,
      valeur: 8750,
      isActive: true,
      isDefault: false,
      serviceId: semenceCommerciale.id,
      typeEmballageId: 1,
      uniteGrandeurId: 3,
    },
  })
  const mais_hybride_10kg = await prisma.varianteService.create({
    data: {
      name: 'MAÏS Hybride F1 KABAMANOJ 10kg ',
      conditionnement: 'Sac',
      quantite: 10,
      pu: 35000,
      valeur: 35000,
      isActive: true,
      isDefault: false,
      serviceId: semenceCommerciale.id,
      typeEmballageId: 1,
      uniteGrandeurId: 3,
    },
  })
  // ADD POINT SERVICE
  console.log(' add point service')
  const point_service1 = await prisma.pointService.create({
    data: {
      reference: '1010',
      pu: 1000,
      quantiteStock: 100,
      pointId: 1,
      varianteServiceId: 1,
    },
  }) // Londax 60 DF / 120g

  // ADD POINT SERVICE
  console.log(' add point service')
  const point_service2 = await prisma.pointService.create({
    data: {
      reference: '1020',
      pu: 2000,
      quantiteStock: 200,
      pointId: 1,
      varianteServiceId: 2,
    },
  })

  // ADD POINT SERVICE
  console.log(' add point service')
  const point_service3 = await prisma.pointService.create({
    data: {
      reference: '1030',
      pu: 3000,
      quantiteStock: 300,
      pointId: 1,
      varianteServiceId: 3,
    },
  })

  /* XXXXXXXXXXXX */
  console.log(' add point service')
  const point_service4 = await prisma.pointService.create({
    data: {
      reference: '1040',
      pu: 1000,
      quantiteStock: 100,
      pointId: 2,
      varianteServiceId: 1,
    },
  })
  console.log(' add point service')
  const point_service5 = await prisma.pointService.create({
    data: {
      reference: '1050',
      pu: 2000,
      quantiteStock: 200,
      pointId: 2,
      varianteServiceId: 2,
    },
  })
  console.log(' add point service')
  const point_service6 = await prisma.pointService.create({
    data: {
      reference: '1060',
      pu: 3000,
      quantiteStock: 300,
      pointId: 2,
      varianteServiceId: 3,
    },
  })
  console.log(' add point service')
  const point_service7 = await prisma.pointService.create({
    data: {
      reference: '1070',
      pu: 4000,
      quantiteStock: 400,
      pointId: 2,
      varianteServiceId: 4,
    },
  })
  console.log(' add point service')
  const point_service8 = await prisma.pointService.create({
    data: {
      reference: '1080',
      pu: 5000,
      quantiteStock: 500,
      pointId: 1,
      varianteServiceId: 5,
    },
  })
}

async function addTiers() {
  console.log(' -----> add genre -------')
  // ADD GENRE MASCULIN
  console.log(' add genre: masculin')
  const genre_masculin = await prisma.genre.create({
    data: {
      name: 'Masculin',
    },
  })

  // ADD GENRE FEMININ
  console.log(' add genre: feminin')
  const genre_feminin = await prisma.genre.create({
    data: {
      name: 'Feminin',
    },
  })

  console.log(' -----> add forme_juridique -------')
  // ADD RFORME GIE
  console.log(' add forme_juridique: gie')
  const forme_gie = await prisma.formeJuridique.create({
    data: {
      name: 'GIE',
    },
  })

  // ADD RFORME SV
  console.log(' add forme_juridique: sv')
  const forme_sv = await prisma.formeJuridique.create({
    data: {
      name: 'SV',
    },
  })
  // ADD RFORME SAS
  console.log(' add forme_juridique: sas')
  const forme_sas = await prisma.formeJuridique.create({
    data: {
      name: 'SAS',
    },
  })
  // ADD RFORME SARL
  console.log(' add forme_juridique: sarl')
  const forme_sarl = await prisma.formeJuridique.create({
    data: {
      name: 'SARL',
    },
  })

  // ADD ORGANISATION GIE_SAINT_LOUIS_1
  console.log(' add op: gie_saint_louis_1')
  const op_gie_saint_louis_1 = await prisma.op.create({
    data: {
      name: 'GIE SAINT LOUIS 1',
      sigle: 'GIE SAINT LOUIS 1',
      email: 'gie_saint_louis_1@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.2663,
      longitude: -16.0007,
      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_gie.id,
      localiteId: 1,
    },
  })
  // ADD ORGANISATION GIE_SAINT_LOUIS_2
  console.log(' add op: gie_saint_louis_2')
  const op_gie_saint_louis_2 = await prisma.op.create({
    data: {
      name: 'GIE SAINT LOUIS 2',
      sigle: 'GIE SAINT LOUIS 2',
      email: 'gie_saint_louis_2@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.5366,
      longitude: -16.1809,
      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_gie.id,
      localiteId: 1,
    },
  })
  // ADD ORGANISATION SV_SAINT_LOUIS_1
  console.log(' add op: sv_saint_louis_1')
  const op_sv_saint_louis_1 = await prisma.op.create({
    data: {
      name: 'SV SAINT LOUIS 1',
      sigle: 'SV SAINT LOUIS 1',
      email: 'sv_saint_louis_1@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.2663,
      longitude: -16.5413,
      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_sv.id,
      localiteId: 2,
    },
  })
  // ADD ORGANISATION SV_SAINT_LOUIS_2
  console.log(' add op: sv_saint_louis_2')
  const op_sv_saint_louis_2 = await prisma.op.create({
    data: {
      name: 'SV SAINT LOUIS 2',
      sigle: 'SV SAINT LOUIS 2',
      email: 'sv_saint_louis_2@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.7169,
      longitude: -15.8203,
      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_sv.id,
      localiteId: 2,
    },
  })
  // ADD ORGANISATION GIE_ROSS_BETHIO_1
  console.log(' add op: gie_ross_bethio_1')
  const op_gie_ross_bethio_1 = await prisma.op.create({
    data: {
      name: 'GIE ROSS BETHIO 1',
      sigle: 'GIE ROSS BETHIO 1',
      email: 'gie_ross_bethio_1@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.18,
      longitude: -16.1389,

      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_gie.id,
      localiteId: 3,
    },
  })
  // ADD ORGANISATION GIE_ROSS_BETHIO_2
  console.log(' add op: gie_ross_bethio_2')
  const op_gie_ross_bethio_2 = await prisma.op.create({
    data: {
      name: 'GIE ROSS BETHIO 2',
      sigle: 'GIE ROSS BETHIO 2',
      email: 'gie_ross_bethio_2@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.2774,
      longitude: -15.9389,
      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_gie.id,
      localiteId: 3,
    },
  })

  // ADD ORGANISATION GIE_ROSS_BETHIO_2
  console.log(' add op: gie_ross_bethio_3')
  const op_gie_ross_bethio_3 = await prisma.op.create({
    data: {
      name: 'GIE ROSS BETHIO 3',
      sigle: 'GIE ROSS BETHIO 3',
      email: 'gie_ross_bethio_2@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.5774,
      longitude: -16.1389,
      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_gie.id,
      localiteId: 3,
    },
  })

  // ADD ORGANISATION GIE_ROSS_BETHIO_2
  console.log(' add op: gie_ross_bethio_4')
  const op_gie_ross_bethio_4 = await prisma.op.create({
    data: {
      name: 'GIE ROSS BETHIO 4',
      sigle: 'GIE ROSS BETHIO 4',
      email: 'gie_ross_bethio_2@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.2774,
      longitude: -16.5389,
      prenomContact: 'Prenom_contact',
      nomContact: 'Nom_contact',
      emailContact: 'email_contact@gmx.fr',
      telephoneContact: '776563111',
      isActive: true,
      formeJuridiqueId: forme_gie.id,
      localiteId: 3,
    },
  })

  // ADD ORGANISATION SAS_ROSS_BETHIO_1 ACTIVE
  console.log(' add op activite: op_gie_saint_louis_1_1')
  const op_gie_saint_louis_1_1 = await prisma.opActivite.create({
    data: {
      opId: op_gie_saint_louis_1.id,
      activiteId: 1,
    },
  })
  const op_gie_saint_louis_1_2 = await prisma.opActivite.create({
    data: {
      opId: op_gie_saint_louis_1.id,
      activiteId: 2,
    },
  })

  const op_gie_saint_louis_2_1 = await prisma.opActivite.create({
    data: {
      opId: op_gie_saint_louis_2.id,
      activiteId: 1,
    },
  })

  const op_gie_saint_louis_2_2 = await prisma.opActivite.create({
    data: {
      opId: op_gie_saint_louis_2.id,
      activiteId: 2,
    },
  })

  const op_gie_ross_bethio_1_1 = await prisma.opActivite.create({
    data: {
      opId: op_gie_ross_bethio_1.id,
      activiteId: 1,
    },
  })

  const op_gie_ross_bethio_1_2 = await prisma.opActivite.create({
    data: {
      opId: op_gie_ross_bethio_1.id,
      activiteId: 2,
    },
  })

  const op_gie_ross_bethio_2_1 = await prisma.opActivite.create({
    data: {
      opId: op_gie_ross_bethio_2.id,
      activiteId: 1,
    },
  })

  const op_gie_ross_bethio_2_2 = await prisma.opActivite.create({
    data: {
      opId: op_gie_ross_bethio_2.id,
      activiteId: 2,
    },
  })
  const op_sv_saint_louis_1_1 = await prisma.opActivite.create({
    data: {
      opId: op_sv_saint_louis_1.id,
      activiteId: 1,
    },
  })

  const op_sv_saint_louis_1_2 = await prisma.opActivite.create({
    data: {
      opId: op_sv_saint_louis_1.id,
      activiteId: 2,
    },
  })

  // ADD PRODUCTEUR PRODUCTEUR SAINT LOUIS 1

  console.log(' add producteur: producteur_saint_louis_1')
  const producteur_saint_louis_1 = await prisma.producteur.create({
    data: {
      compte: 123456,
      prenom: 'Ass Malick',
      nom: 'FALL',
      cni: '123456789',
      email: 'producteur_saint_louis_1@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 15.7258,
      longitude: -16.5413,
      isActive: true,
      genreId: genre_masculin.id,
      localiteId: 1,
    },
  })
  // ADD PRODUCTEUR PRODUCTEUR SAINT LOUIS 2
  console.log(' add producteur: producteur_saint_louis_2')
  const producteur_saint_louis_2 = await prisma.producteur.create({
    data: {
      compte: 123456,
      prenom: 'Mamadou',
      nom: 'DIOP',
      cni: '123456789',
      email: 'producteur_saint_louis_2@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 15.6807,
      longitude: -15.8203,
      isActive: true,
      genreId: genre_masculin.id,
      localiteId: 1,
    },
  })

  // ADD PRODUCTEUR PRODUCTEUR ROSS BETHIO 1
  console.log(' add producteur: producteur_ross_bethio_1')
  const producteur_ross_bethio_1 = await prisma.producteur.create({
    data: {
      compte: 123456,
      prenom: 'Djadji',
      nom: 'GAYE',
      cni: '123456789',
      email: 'producteur_ross_bethio_1@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 15.8774,
      longitude: -16.4389,
      isActive: true,
      genreId: genre_masculin.id,
      localiteId: 3,
    },
  })
  // ADD PRODUCTEUR PRODUCTEUR ROSS BETHIO 2
  console.log(' add producteur: producteur_ross_bethio_2')
  const producteur_ross_bethio_2 = await prisma.producteur.create({
    data: {
      compte: 123456,
      prenom: 'Siby',
      nom: 'SY',
      cni: '123456789',
      email: 'producteur_ross_bethio_2@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 15.8774,
      longitude: -15.8389,
      isActive: true,
      genreId: genre_feminin.id,
      localiteId: 3,
    },
  })
  // ADD PRODUCTEUR PRODUCTEUR ROSS BETHIO 3
  console.log(' add producteur: producteur_ross_bethio_3')
  const producteur_ross_bethio_3 = await prisma.producteur.create({
    data: {
      compte: 123456,
      prenom: 'GAEL',
      nom: 'BA',
      cni: '123456789',
      email: 'producteur_ross_bethio_3@gmx.fr',
      telephone: '776563111',
      adresse: 'Sud, Saint-Louis',
      latitude: 16.2774,
      longitude: -16.8389,
      isActive: true,
      genreId: genre_feminin.id,
      localiteId: 3,
    },
  })

  const producteur_saint_louis_1_1 = await prisma.producteurActivite.create({
    data: {
      producteurId: producteur_saint_louis_1.id,
      activiteId: 1,
    },
  })
  const producteur_saint_louis_1_2 = await prisma.producteurActivite.create({
    data: {
      producteurId: producteur_saint_louis_1.id,
      activiteId: 2,
    },
  })

  const producteur_ross_bethio_1_1 = await prisma.producteurActivite.create({
    data: {
      producteurId: producteur_ross_bethio_1.id,
      activiteId: 1,
    },
  })

  const producteur_ross_bethio_1_2 = await prisma.producteurActivite.create({
    data: {
      producteurId: producteur_ross_bethio_1.id,
      activiteId: 2,
    },
  })

  const producteur_ross_bethio_2_1 = await prisma.producteurActivite.create({
    data: {
      producteurId: producteur_ross_bethio_2.id,
      activiteId: 1,
    },
  })

  const producteur_ross_bethio_2_2 = await prisma.producteurActivite.create({
    data: {
      producteurId: producteur_ross_bethio_2.id,
      activiteId: 2,
    },
  })

  console.log(' ----------- TYPE SOCIETE  -----------')
  console.log(' add  type societe: BANQUE')
  const type_service_banque = await prisma.typeSociete.create({
    data: {
      name: 'BANQUE',
    },
  })
  console.log(' add  type societe: FOURNISSEUR')
  const type_service_fournisseur = await prisma.typeSociete.create({
    data: {
      name: 'FOURNISSEUR',
    },
  })

  console.log(' ----------- SOCIETE  -----------')
  console.log(' add  societe: lba')
  const societe_lba = await prisma.societe.create({
    data: {
      name: 'La Banque Agricole',
      sigle: 'LBA',
      email: 'lba@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'agrofitex@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_banque.id,
    },
  })

  console.log(' add  societe: bnde')
  const societe_bnde = await prisma.societe.create({
    data: {
      name: 'La Banque Nationale de Development',
      sigle: 'BNDE',
      email: 'bnde@example.com',
      telephone: '776563111',
      adresse: 'Rue de la bnde, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'agrofitex@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_banque.id,
    },
  })

  console.log(' add  societe: agrofitex')
  const societe_agrofitex = await prisma.societe.create({
    data: {
      name: 'AGOFITEX',
      sigle: 'AGOFITEX',
      email: 'agrofitex@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'agrofitex@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })

  console.log(' add  societe: top mountain')
  const societe_topmountain = await prisma.societe.create({
    data: {
      name: 'Top Mountain',
      sigle: 'TM',
      email: 'topmountain@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'topmountain@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })
  console.log(' add  societe: fiaya')
  const societe_fiaya = await prisma.societe.create({
    data: {
      name: 'Fiaya-Agricole',
      sigle: 'FA',
      email: 'fiaya@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'fiaya@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })
  console.log(' add  societe: emc')
  const societe_emc = await prisma.societe.create({
    data: {
      name: 'EMC',
      sigle: 'EMC',
      email: 'emc@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'emc@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })
  console.log(' add  societe: dioubo')
  const societe_dioubo = await prisma.societe.create({
    data: {
      name: 'Dioubo Sarl',
      sigle: 'DIOUBO',
      email: 'dioubo@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'dioubo@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })

  console.log(' add  societe: dioubo')
  const societe_cigogne = await prisma.societe.create({
    data: {
      name: 'La Cigogne',
      sigle: 'LC',
      email: 'cigogne@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'cigogne@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })

  console.log(' add  societe: amafrique')
  const societe_amafrique = await prisma.societe.create({
    data: {
      name: 'Amafrique',
      sigle: 'AF',
      email: 'amafrique@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'amafrique@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })

  console.log(' add  societe: rgs')
  const societe_rgs = await prisma.societe.create({
    data: {
      name: 'Regard Global Services',
      sigle: 'RGS',
      email: 'rgs@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'rgs@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })

  console.log(' add  societe: dioubo')
  const societe_spia = await prisma.societe.create({
    data: {
      name: 'Société de produits industriels et agricoles',
      sigle: 'SPIA',
      email: 'spia@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'spia@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })

  console.log(' add  societe: rmg')
  const societe_rmg = await prisma.societe.create({
    data: {
      name: 'RMG Sénégal SA',
      sigle: 'RMA',
      email: 'rma@example.com',
      telephone: '776563111',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'rma@gmx.fr',
      telephoneContact: '776563111',
      formeJuridiqueId: forme_sarl.id,
      typeSocieteId: type_service_fournisseur.id,
    },
  })

  // ADD AGENCE

  console.log(' add agence: LBA SAINT LOUIS')
  const agence_lba_saint_louis = await prisma.agence.create({
    data: {
      name: 'LBA Saint-Louis',
      sigle: 'LBASL',
      email: 'lbasl@example.com',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'lbasl@gmx.fr',
      telephoneContact: '776563111',
      societeId: societe_lba.id,
    },
  })

  console.log(' add agence : LBA ROSS BETHIO')
  const agence_lba_ross_bethio = await prisma.agence.create({
    data: {
      name: 'LBA Ross Bethio',
      sigle: 'LBARB',
      email: 'lbarb@example.com',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'lbasl@gmx.fr',
      telephoneContact: '776563111',
      societeId: societe_lba.id,
    },
  })

  console.log(' add agence: LBA RICHARD TOLL')
  const agence_lba_richard_toll = await prisma.agence.create({
    data: {
      name: 'LBA Richard Toll',
      sigle: 'LBART',
      email: 'lbart@example.com',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'lbasl@gmx.fr',
      telephoneContact: '776563111',
      societeId: societe_lba.id,
    },
  })

  console.log(' add agence: LBA PODOR')
  const agence_lba_podor = await prisma.agence.create({
    data: {
      name: 'LBA PODOR',
      sigle: 'LBAPO',
      email: 'lbapo@example.com',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'lbasl@gmx.fr',
      telephoneContact: '776563111',
      societeId: societe_lba.id,
    },
  })

  console.log(' add agence : LBA OUROSSOGUY')
  const agence_lba_ourossoguy = await prisma.agence.create({
    data: {
      name: 'LBA OUROSSOGUY',
      sigle: 'LBAOR',
      email: 'lbaor@example.com',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'lbasl@gmx.fr',
      telephoneContact: '776563111',
      societeId: societe_lba.id,
    },
  })

  console.log(' add agence : LBA MATAM')
  const agence_lba_matam = await prisma.agence.create({
    data: {
      name: 'LBA Matam',
      sigle: 'LBAMT',
      email: 'lbamt@example.com',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      latitude: 14.3625,
      longitude: -16.0533,
      prenomContact: 'Ibrahima',
      nomContact: 'CAMARA',
      emailContact: 'lbasl@gmx.fr',
      telephoneContact: '776563111',
      societeId: societe_lba.id,
    },
  })

  // ADD POINT COLLECTE

  console.log(' add point: pc_ndelle')
  const point_ndelle = await prisma.point.create({
    data: {
      name: 'PC NDELLE',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      email: 'pc_ndelle@example.com',
      latitude: 16.3564,
      longitude: -16.1809,
      isActive: true,
      isService: false,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 1,
      societeId: societe_lba.id,
    },
  })

  console.log(' add point: pc_tilene')
  const point_tilene = await prisma.point.create({
    data: {
      name: 'PC TILENE',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      email: 'pc_tilene@example.com',
      latitude: 16.3564,
      longitude: -16.1809,
      isActive: true,
      isService: false,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 1,
      societeId: societe_lba.id,
    },
  })

  console.log(' add point: point_pont_gendarme')
  const point_pont_gendarme = await prisma.point.create({
    data: {
      name: 'PC PONT GENDARME',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      email: 'pc_tilene@example.com',
      latitude: 16.3564,
      longitude: -16.1809,
      isActive: true,
      isService: false,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 1,
      societeId: societe_lba.id,
    },
  })

  console.log(' add point: pc_debi_tiguette')
  const point_debi_tiguette = await prisma.point.create({
    data: {
      name: 'PC DEBI TIGUETTE',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      email: 'pc_ndelle@example.com',
      latitude: 16.3564,
      longitude: -16.1809,
      isActive: true,
      isService: false,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 1,
      societeId: societe_lba.id,
    },
  })

  console.log(' add point: pc_3prd')
  const point_3prd = await prisma.point.create({
    data: {
      name: 'PC 3PRO',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      email: 'pc_ndelle@example.com',
      latitude: 16.3564,
      longitude: -16.1809,
      isActive: true,
      isService: false,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 1,
      societeId: societe_lba.id,
    },
  })

  console.log(' add point: agrophitex_saint_louis')
  const point_agrophitex_saint_louis = await prisma.point.create({
    data: {
      name: 'Agrophitex Saint-Louis',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      telephone: '776563111',
      email: 'ags@example.com',
      latitude: 16.3564,
      longitude: -16.1809,
      isActive: true,
      isService: true,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 1,
      societeId: societe_amafrique.id,
    },
  })
  const point_agrophitex_saint_louis_agriculture =
    await prisma.pointActivite.create({
      data: {
        pointId: point_agrophitex_saint_louis.id,
        activiteId: 1,
      },
    })

  const point_agrophitex_saint_louis_elevage =
    await prisma.pointActivite.create({
      data: {
        pointId: point_agrophitex_saint_louis.id,
        activiteId: 2,
      },
    })

  // ADD POINT AGROPHITEX ROSS-BETHIO
  console.log(' add point: agrophitex_ross_bethio')
  const point_agrophitex_ross_bethio = await prisma.point.create({
    data: {
      name: 'Agrophitex Ross-Bethio',
      adresse: 'Rue de la Banque Agricole, Ross-Bethio',
      telephone: '776563111',
      email: 'ags@example.com',
      latitude: 16.2774313,
      longitude: -16.1389809,
      isActive: true,
      isService: true,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 2,
      societeId: societe_emc.id,
    },
  })
  const point_agrophitex_ross_bethio_agriculture =
    await prisma.pointActivite.create({
      data: {
        pointId: point_agrophitex_ross_bethio.id,
        activiteId: 1,
      },
    })
  const point_agrophitex_ross_bethio_elevage =
    await prisma.pointActivite.create({
      data: {
        pointId: point_agrophitex_ross_bethio.id,
        activiteId: 2,
      },
    })

  // ADD POINT AGROPHITEX RICHERD-TOLL
  console.log(' add point: agrophitex_richerd_toll')
  const point_agrophitex_richerd_toll = await prisma.point.create({
    data: {
      name: 'Agrophitex Richerd-Toll',
      adresse: 'Rue de la Banque Agricole, Richerd-Toll',
      telephone: '776563111',
      email: 'ags@example.com',
      latitude: 14.3625,
      longitude: -16.0533,
      isActive: true,
      isService: true,
      isCollecte: true,
      isTransformation: true,
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: 3,
      societeId: societe_spia.id,
    },
  })
  const point_agrophitex_richerd_toll_agriculture =
    await prisma.pointActivite.create({
      data: {
        pointId: point_agrophitex_richerd_toll.id,
        activiteId: 1,
      },
    })
  const point_agrophitex_richerd_toll_elevage =
    await prisma.pointActivite.create({
      data: {
        pointId: point_agrophitex_richerd_toll.id,
        activiteId: 2,
      },
    })

  console.log(' ---------> add Point  Agence:NDELLE - SAINT LOUIS')
  const point_agence_ndelle_saint_louis = await prisma.pointAgence.create({
    data: {
      pointId: point_ndelle.id,
      agenceId: 1,
    },
  })

  console.log(' ---------> add Point  Agence: SAINT LOUIS')
  const point_agence_tilene_saint_louis = await prisma.pointAgence.create({
    data: {
      pointId: point_tilene.id,
      agenceId: 1,
    },
  })

  console.log(' ---------> add Point  Agence: PONT GENDARME')
  const point_agence_pont_gendarme_saint_louis =
    await prisma.pointAgence.create({
      data: {
        pointId: point_pont_gendarme.id,
        agenceId: 1,
      },
    })

  console.log(' ---------> add Point  Agence: 3PRD')
  const point_agence_point_3prd_saint_louis = await prisma.pointAgence.create({
    data: {
      pointId: point_3prd.id,
      agenceId: 1,
    },
  })

  console.log(' ---------> add Point  Agence: 3PRD')
  const point_agence_point_debi_tiguette_saint_louis =
    await prisma.pointAgence.create({
      data: {
        pointId: point_debi_tiguette.id,
        agenceId: 1,
      },
    })
}

async function addEmballage() {
  console.log(' ----------- ADD TYPE EMBALLAGE -----------')
  console.log(' add type emballage: SAC')
  const type_emballage_sac = await prisma.typeEmballage.create({
    data: {
      name: 'SAC',
    },
  })

  console.log(' add type emballage: SACHET')
  const type_emballage_sachet = await prisma.typeEmballage.create({
    data: {
      name: 'SACHET',
    },
  })

  console.log(' add type emballage: BIDON')
  const type_emballage_bidon = await prisma.typeEmballage.create({
    data: {
      name: 'BIDON',
    },
  })

  console.log(' add type emballage: POT')
  const type_emballage_pot = await prisma.typeEmballage.create({
    data: {
      name: 'POT',
    },
  })

  console.log(' add type emballage: BOITE')
  const type_emballage_boite = await prisma.typeEmballage.create({
    data: {
      name: 'BOITE',
    },
  })

  console.log(' add type emballage: CAISSE')
  const type_emballage_caisse = await prisma.typeEmballage.create({
    data: {
      name: 'CAISSE',
    },
  })
  console.log(' add type emballage: SEAU')
  const type_emballage_seau = await prisma.typeEmballage.create({
    data: {
      name: 'SEAU',
    },
  })
  console.log(' ----------- ADD TYPE UNITE GRANDEUR -----------')
  console.log(' add type unite grandeur: POIDS')
  const type_unite_grandeur_poids = await prisma.typeUniteGrandeur.create({
    data: {
      name: 'POIDS',
    },
  })

  console.log(' add type unite grandeur: VOLUME')
  const type_unite_grandeur_volume = await prisma.typeUniteGrandeur.create({
    data: {
      name: 'VOLUME',
    },
  })

  console.log(' ----------- ADD UNITE GRANDEUR -----------')
  console.log(' add unite grandeur: T')
  const unite_grandeur_t = await prisma.uniteGrandeur.create({
    data: {
      name: 'Tonnes',
      sigle: 't',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })
  console.log(' add unite grandeur: Q')
  const unite_grandeur_q = await prisma.uniteGrandeur.create({
    data: {
      name: 'Quintal',
      sigle: 'q',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })

  console.log(' add unite grandeur: kg')
  const unite_grandeur_kg = await prisma.uniteGrandeur.create({
    data: {
      name: 'Kilogramme',
      sigle: 'kg',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })
  console.log(' add unite grandeur: HG')
  const unite_grandeur_hg = await prisma.uniteGrandeur.create({
    data: {
      name: 'Hectogramme',
      sigle: 'hg',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })
  console.log(' add unite grandeur: dag')
  const unite_grandeur_dag = await prisma.uniteGrandeur.create({
    data: {
      name: 'Decagramme',
      sigle: 'dag',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })

  console.log(' add unite grandeur: G')
  const unite_grandeur_g = await prisma.uniteGrandeur.create({
    data: {
      name: 'Gramme',
      sigle: 'g',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })
  console.log(' add unite grandeur: dg')
  const unite_grandeur_dg = await prisma.uniteGrandeur.create({
    data: {
      name: 'Decigramme',
      sigle: 'dg',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })
  console.log(' add unite grandeur: cg')
  const unite_grandeur_cg = await prisma.uniteGrandeur.create({
    data: {
      name: 'Centigramme',
      sigle: 'cg',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })
  console.log(' add unite grandeur: mg')
  const unite_grandeur_mg = await prisma.uniteGrandeur.create({
    data: {
      name: 'Milligramme',
      sigle: 'mg',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  })

  console.log(' add unite grandeur: LITRE')
  const unite_grandeur_LITRE = await prisma.uniteGrandeur.create({
    data: {
      name: 'Litre',
      sigle: 'l',
      typeUniteGrandeurId: type_unite_grandeur_volume.id,
    },
  })
  console.log(' add unite grandeur: DL')
  const unite_grandeur_DL = await prisma.uniteGrandeur.create({
    data: {
      name: 'Déci-litre',
      sigle: 'dl',
      typeUniteGrandeurId: type_unite_grandeur_volume.id,
    },
  })

  console.log(' add unite grandeur: CL')
  const unite_grandeur_CL = await prisma.uniteGrandeur.create({
    data: {
      name: 'Centi-litre',
      sigle: 'cl',
      typeUniteGrandeurId: type_unite_grandeur_volume.id,
    },
  })
  console.log(' add unite grandeur: ML')
  const unite_grandeur_ML = await prisma.uniteGrandeur.create({
    data: {
      name: 'Milli-litre',
      sigle: 'ml',
      typeUniteGrandeurId: type_unite_grandeur_volume.id,
    },
  })
}

async function addConstants() {
  console.log(' -----> add activite -------')
  // ADD AGRICULTURE
  console.log(' add activite: agriculture')
  const agriculture = await prisma.activite.create({
    data: {
      name: 'Agriculture',
    },
  })
  // ADD ELEVAGE
  console.log(' add activite: elevage')
  const elevage = await prisma.activite.create({
    data: {
      name: 'Elevage',
    },
  })
  // ADD PECHE
  console.log(' add activite: peche')
  const peche = await prisma.activite.create({
    data: {
      name: 'Pêche',
    },
  })
  // ADD TRANSFORMATION
  console.log(' add activite: transformation')
  const transformation = await prisma.activite.create({
    data: {
      name: 'Transformation',
    },
  })
  console.log(' ----------- FAMILLE EMPLACEMENT -----------')
  console.log(' add famile emplacement: BRUT')
  const famille_emplacement_brut = await prisma.familleEmplacement.create({
    data: {
      name: 'BRUT',
    },
  })
  console.log(' add famile emplacement: TRANSFORME')
  const famille_emplacement_transforme = await prisma.familleEmplacement.create(
    {
      data: {
        name: 'TRANSFORME',
      },
    },
  )
  console.log(' add famile emplacement: INTRANT')
  const famille_emplacement_intrant = await prisma.familleEmplacement.create({
    data: {
      name: 'INTRANT',
    },
  })
  console.log(' ----------- ADD ANNEES -----------')

  let valeur = 2020
  const duree = 21
  for (let i = 0; i < duree; i++) {
    await prisma.annee.create({
      data: {
        id: i + 20,
        name: valeur.toString(),
        valeur: valeur,
      },
    })
    valeur++
  }
  console.log(' -----> add annee: ' + (duree - 1).toString())
  console.log(' ----------- ADD SAISON -----------')

  console.log(' add saison: Hivernage')
  await prisma.saison.create({
    data: {
      name: 'HIV',
      description: 'Hivernage',
    },
  })

  console.log(' add saison: Contre Saison Chaude ')
  await prisma.saison.create({
    data: {
      name: 'CSC',
      description: 'Contre Saison Chaude',
    },
  })

  console.log(' add saison: Contre Saison Froide ')
  await prisma.saison.create({
    data: {
      name: 'CSF',
      description: 'Contre Saison Froide',
    },
  })

  console.log(' add campagne: 2020 || HIV ')
  await prisma.campagne.create({
    data: {
      anneeId: 24,
      saisonId: 1,
    },
  })
}
async function addFiliere() {
  console.log(' ----------- ADD FILIERE -----------')
  console.log(' add filiere: RIZ')
  const filiere_riz = await prisma.filiere.create({
    data: {
      name: 'RIZ',
      activiteId: 1,
    },
  })
  console.log(' add produit: RIZ PADDY')
  const produit_riz_paddy = await prisma.produit.create({
    data: {
      name: 'RIZ PADDY',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_riz.id,
      familleEmplacementId: 1,
    },
  })
  console.log(' add variete: SAHEL 108')
  const variete_sahel_108 = await prisma.variete.create({
    data: {
      name: 'SAHEL 108',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 125,
      rendement_unite: 10,
      isActive: true,
      produitId: produit_riz_paddy.id,
    },
  })
  console.log(' add variete: SAHEL 134')
  const variete_sahel_134 = await prisma.variete.create({
    data: {
      name: 'SAHEL 134',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 130,
      rendement_unite: 8,
      isActive: true,
      produitId: produit_riz_paddy.id,
    },
  })
  console.log(' add variete: SAHEL 177')
  const variete_sahel_177 = await prisma.variete.create({
    data: {
      name: 'SAHEL 177',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 135,
      rendement_unite: 6,
      isActive: true,
      produitId: produit_riz_paddy.id,
    },
  })

  console.log(' add produit: RIZ BLANC')
  const produit_riz_blanc = await prisma.produit.create({
    data: {
      name: 'RIZ BLANC',
      //"isRecolte": false,
      isDerive: true,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_riz.id,
      familleEmplacementId: 2,
    },
  })

  console.log(' add filiere: ARACHIDE')
  const filiere_arachide = await prisma.filiere.create({
    data: {
      name: 'ARACHIDE',
      activiteId: 1,
    },
  })
  console.log(' add produit: ARACHIDE COQUE')
  const produit_arachide_coque = await prisma.produit.create({
    data: {
      name: 'ARACHIDE COQUE',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_arachide.id,
      familleEmplacementId: 1,
    },
  })
  console.log(' add variete: 55-437')
  const variete_55_437 = await prisma.variete.create({
    data: {
      name: '55-437',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 250,
      rendement_unite: 6,
      isActive: true,
      produitId: produit_arachide_coque.id,
    },
  })
  console.log(' add variete: GC 8-35')
  const variete_gc_8_35 = await prisma.variete.create({
    data: {
      name: 'GC 8-35',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 280,
      rendement_unite: 8,
      isActive: true,
      produitId: produit_arachide_coque.id,
    },
  })
  console.log(' add variete: 73-33')
  const variete_73_33 = await prisma.variete.create({
    data: {
      name: '73-33',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 255,
      rendement_unite: 8,
      isActive: true,
      produitId: produit_arachide_coque.id,
    },
  })
  console.log(' add produit: ARACHIDE TRANSFORME')
  const produit_arachide_transforme = await prisma.produit.create({
    data: {
      name: 'ARACHIDE TRANSFORME',
      //"isRecolte": false,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_arachide.id,
      familleEmplacementId: 2,
    },
  })

  console.log(' add filiere: HORTICULTURE')
  const filiere_horticulture = await prisma.filiere.create({
    data: {
      name: 'HORTICULTURE',
      activiteId: 1,
    },
  })
  console.log(' add produit: OIGON')
  const produit_oigon = await prisma.produit.create({
    data: {
      name: 'OIGON',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_horticulture.id,
      familleEmplacementId: 1,
    },
  })
  console.log(' add produit: POMME DE TERRE')
  const produit_pomme_terre = await prisma.produit.create({
    data: {
      name: 'POMME DE TERRE',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_horticulture.id,
      familleEmplacementId: 1,
    },
  })
  console.log(' ----------- ADD FILIERE -----------')
  console.log(' add filiere: MAIS')
  const filiere_mais = await prisma.filiere.create({
    data: {
      name: 'MAIS',
      activiteId: 1,
    },
  })
  console.log(' ----------- ADD FILIERE -----------')
  console.log(' add filiere: NIEBE')
  const filiere_niebe = await prisma.filiere.create({
    data: {
      name: 'NIEBE',
      activiteId: 1,
    },
  })
  console.log(' ----------- ADD FILIERE -----------')
  console.log(' add filiere: SESAME')
  const filiere_sesame = await prisma.filiere.create({
    data: {
      name: 'SESAME',
      activiteId: 1,
    },
  })
  console.log(' ----------- ADD FILIERE -----------')
  console.log(' add filiere: SORGHO')
  const filiere_sorgho = await prisma.filiere.create({
    data: {
      name: 'SORGHO',
      activiteId: 1,
    },
  })
  console.log(' ----------- ADD FILIERE -----------')
  console.log(' add filiere: FONIO')
  const filiere_fonio = await prisma.filiere.create({
    data: {
      name: 'FONIO',
      activiteId: 1,
    },
  })
}
async function addLocalite() {
  console.log(' ----------- ADD PAYS -----------')
  console.log(' add pays: SENEGAL')
  const pays_senegal = await prisma.pays.create({
    data: {
      name: 'Sénégal',
      sigle: 'SEN',
    },
  })

  console.log(' -----> add region: Saint-Louis')
  const region_saint_louis = await prisma.region.create({
    data: {
      name: 'Saint-Louis',
      paysId: pays_senegal.id,
    },
  })

  console.log(' -----> add region: Kaolack')
  const region_kaolack = await prisma.region.create({
    data: {
      name: 'Kaolack',
      paysId: pays_senegal.id,
    },
  })

  console.log(' -----> add region: Matam')
  const region_matam = await prisma.region.create({
    data: {
      name: 'Matam',
      paysId: pays_senegal.id,
    },
  })

  console.log(' -----> add departement: Saint-Louis')
  const departement_saint_louis = await prisma.departement.create({
    data: {
      name: 'Saint-Louis',
      regionId: region_saint_louis.id,
    },
  })
  console.log(' -----> add departement: Dagana')
  const departement_dagana = await prisma.departement.create({
    data: {
      name: 'Dagana',
      regionId: region_saint_louis.id,
    },
  })
  console.log(' -----> add departement: Podor')
  const departement_podor = await prisma.departement.create({
    data: {
      name: 'Podor',
      regionId: region_saint_louis.id,
    },
  })

  console.log(' -----> add departement: Matam')
  const departement_matam = await prisma.departement.create({
    data: {
      name: 'Matam',
      regionId: region_matam.id,
    },
  })

  console.log(' -----> add departement: Ranérou')
  const departement_ranerou = await prisma.departement.create({
    data: {
      name: 'Ranérou',
      regionId: region_matam.id,
    },
  })
  console.log(' -----> add departement: Kanel')
  const departement_kanel = await prisma.departement.create({
    data: {
      name: 'Kanel',
      regionId: region_matam.id,
    },
  })

  console.log(' -----> add departement: Kaolack')

  console.log(' -----> add zone: VFS')
  const zone_vfs = await prisma.zone.create({
    data: {
      name: 'VFS',
      paysId: pays_senegal.id,
    },
  })
  console.log(' -----> add zone: CENTRE')
  const zone_centre = await prisma.zone.create({
    data: {
      name: 'CENTRE',
      paysId: pays_senegal.id,
    },
  })

  console.log(' -----> add zone: NIAYES')
  const zone_niayes = await prisma.zone.create({
    data: {
      name: 'NIAYES',
      paysId: pays_senegal.id,
    },
  })

  console.log(' -----> add zone: ARACHIDIER')
  const zone_arachidier = await prisma.zone.create({
    data: {
      name: 'ARACHIDIER',
      paysId: pays_senegal.id,
    },
  })

  console.log(' -----> add zone: SAHELIEN')
  const zone_sahelien = await prisma.zone.create({
    data: {
      name: 'SAHELIEN',
      paysId: pays_senegal.id,
    },
  })

  console.log(' -----> add zone: SYLVO-PASTORALE')
  const zone_sylvopastorale = await prisma.zone.create({
    data: {
      name: 'SYLVO-PASTORALE',
      paysId: pays_senegal.id,
    },
  })

  console.log(' ---------> add sous zone: SAINT LOUIS')
  const sous_zone_saint_louis = await prisma.sousZone.create({
    data: {
      name: 'SAINT LOUIS',
      zoneId: zone_vfs.id,
    },
  })
  console.log(' ---------> add sous zone: ROSS BETHIO')
  const sous_zone_ross_bethio = await prisma.sousZone.create({
    data: {
      name: 'ROSS BETHIO',
      zoneId: zone_vfs.id,
    },
  })

  console.log(' ---------> add localite: SAINT LOUIS')
  const localite_saint_louis = await prisma.localite.create({
    data: {
      name: 'SAINT LOUIS',
      sousZoneId: sous_zone_saint_louis.id,
      departementId: departement_saint_louis.id,
    },
  })

  console.log(' ---------> add localite: PONT GENDARME')
  const localite_pont_gendarme = await prisma.localite.create({
    data: {
      name: 'PONT GENDARME',
      sousZoneId: sous_zone_saint_louis.id,
      departementId: departement_saint_louis.id,
    },
  })

  console.log(' ---------> add localite: DEBI TIGUETTE')
  const localite_debi_tiguette = await prisma.localite.create({
    data: {
      name: 'DEBI TIGUETTE',
      sousZoneId: sous_zone_saint_louis.id,
      departementId: departement_saint_louis.id,
    },
  })
  console.log(' ---------> add localite: TILENE')
  const localite_tilene = await prisma.localite.create({
    data: {
      name: 'TILENE',
      sousZoneId: sous_zone_saint_louis.id,
      departementId: departement_saint_louis.id,
    },
  })

  console.log(' ---------> add localite: ROSS BETHIO')
  const localite_ross_bethio = await prisma.localite.create({
    data: {
      name: 'ROSS BETHIO',
      sousZoneId: sous_zone_ross_bethio.id,
      departementId: departement_saint_louis.id,
    },
  })
  console.log(' ---------> add localite: KASSACK NORD')
  const localite_kassack_nord = await prisma.localite.create({
    data: {
      name: 'KASSACK NORD',
      sousZoneId: sous_zone_ross_bethio.id,
      departementId: departement_saint_louis.id,
    },
  })
  console.log(' ---------> add localite: KASSACK SUD')
  const localite_kassack_sud = await prisma.localite.create({
    data: {
      name: 'KASSACK SUD',
      sousZoneId: sous_zone_ross_bethio.id,
      departementId: departement_saint_louis.id,
    },
  })
  console.log(' ---------> add localite: RONK')
  const localite_ronk = await prisma.localite.create({
    data: {
      name: 'RONK',
      sousZoneId: sous_zone_ross_bethio.id,
      departementId: departement_saint_louis.id,
    },
  })

  console.log(' ---------> add sous zone: RICHARD TOLL')
  const sous_zone_richard_toll = await prisma.sousZone.create({
    data: {
      name: 'RICHARD TOLL',
      zoneId: zone_vfs.id,
    },
  })
  console.log(' ---------> add localite: RICHARD TOLL')
  const localite_richard_toll = await prisma.localite.create({
    data: {
      name: 'RICHARD TOLL',
      sousZoneId: sous_zone_richard_toll.id,
      departementId: departement_dagana.id,
    },
  })
  console.log(' ---------> add sous zone: PODOR')
  const sous_zone_podor = await prisma.sousZone.create({
    data: {
      name: 'PODOR',
      zoneId: zone_vfs.id,
    },
  })
  console.log(' ---------> add localite: PODOR')
  const localite_podor = await prisma.localite.create({
    data: {
      name: 'PODOR',
      sousZoneId: sous_zone_podor.id,
      departementId: departement_podor.id,
    },
  })
  console.log(' ---------> add sous zone: MATAM')
  const sous_zone_matam = await prisma.sousZone.create({
    data: {
      name: 'MATAM',
      zoneId: zone_vfs.id,
    },
  })
  console.log(' ---------> add localite: MATAM')
  const localite_matam = await prisma.localite.create({
    data: {
      name: 'MATAM',
      sousZoneId: sous_zone_matam.id,
      departementId: departement_matam.id,
    },
  })
  console.log(' ---------> add localite: KANEL')
  const localite_kanel = await prisma.localite.create({
    data: {
      name: 'KANEL',
      sousZoneId: sous_zone_matam.id,
      departementId: departement_kanel.id,
    },
  })

  console.log(" add pays: COTE D'IVOIRE")
  const pays_cote_ivoire = await prisma.pays.create({
    data: {
      name: "COTE D'IVOIRE",
      sigle: 'CIV',
    },
  })
  console.log(' add pays: MALI')
  const pays_mali = await prisma.pays.create({
    data: {
      name: 'MALI',
      sigle: 'MAL',
    },
  })
  console.log(' add pays: MAURITANIE')
  const pays_mauritanie = await prisma.pays.create({
    data: {
      name: 'Mauritanie',
      sigle: 'MAU',
    },
  })
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    void prisma.$disconnect()
  })
