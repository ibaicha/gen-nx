import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import {
  CreateDemandeDto,
  GetDemandeParamsDTO,
  IDemande,
  IDemandeDetail,
  UpdateDemandeDto,
} from './dto/demande.dto'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../../prisma/prisma.service'
import { applyFilters } from '../../utils/filters'

@Injectable()
export class DemandeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.demande.findMany({
      include: {
        activite: {
          include: {},
        },
        annee: {
          include: {},
        },
        saison: {
          include: {},
        },
        point: {
          include: {},
        },
        producteur: {
          include: {},
        },
        op: {
          include: {},
        },
      },
    })
  }
  /*
  async getAllDemandesWithFilters(
    params: GetDemandeParamsDTO,
  ): Promise<IDemande[]> {
    try {
      const { whereBuilder } = await applyFilters<Prisma.DemandeWhereInput>({
        appliedFiltersInput: params,
        availableFilters: {
          pointId: async ({ filter }) => {
            return Promise.resolve({
              where: {
                pointId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            });
          },
          organisationId: async ({ filter }) => {
            return Promise.resolve({
              where: {
                organisationId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            });
          },
          producteurId: async ({ filter }) => {
            return Promise.resolve({
              where: {
                producteurId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            });
          },
        },
      });

      const demandeWithFilters = await this.prismaService.demande.findMany({
        where: whereBuilder,
      });

      const demandes: IDemande[] = [];

      for (const myDemande of demandeWithFilters) {
       
        const myAnnee = await this.prismaService.annee.findFirst({
          where: { id: myDemande.anneeId },
        });

        demandes.push({
          id: myDemande.id,
          date: myDemande.date!,
          anneeId: myAnnee!.id,
          anneeName: myAnnee!.name,
        });
      }

      return demandes;
    } catch (error) {
      throw new ForbiddenException(error);
    } finally {
      await this.prismaService.$disconnect();
    }
  }
*/

  async getAllDemandesWithFilters(
    params: GetDemandeParamsDTO,
  ): Promise<IDemande[]> {
    try {
     

      const demandes: IDemande[] = []

    
      return demandes
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prismaService.$disconnect()
    }
  }
/*
  async getAllDemandesWithFiltersXX(
    params: GetDemandeParamsDTO,
  ): Promise<IDemande[]> {
    try {
      const { whereBuilder } = await applyFilters<Prisma.DemandeWhereInput>({
        appliedFiltersInput: params,
        availableFilters: {
          activiteId: async ({ filter }) => {
            return Promise.resolve({
              where: {
                activiteId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            })
          },
          pointId: async ({ filter }) => {
            return Promise.resolve({
              where: {
                pointId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            })
          },
          opId: async ({ filter }) => {
            return Promise.resolve({
              where: {
                opId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            })
          },
          producteurId: async ({ filter }) => {
            return Promise.resolve({
              where: {
                producteurId: {
                  in: (filter as string).split(',').map(Number),
                },
              },
            })
          },
        },
      })

      const demandeWithFilters = await this.prismaService.demande.findMany({
        where: whereBuilder,
      })

      const demandes: IDemande[] = []

      for (const myDemande of demandeWithFilters) {
   
        const myActivite = await this.prismaService.activite.findFirst({
          where: { id: myDemande.activiteId },
        })
        const myAnnee = await this.prismaService.annee.findFirst({
          where: { id: myDemande.anneeId },
        })
        const mySaison = await this.prismaService.saison.findFirst({
          where: { id: myDemande.saisonId },
        })
        const myPoint = await this.prismaService.point.findFirst({
          where: { id: myDemande.pointId },
        })
        const myOrganisation = await this.prismaService.op.findFirst({
          where: {
            id: myDemande.opId != null ? myDemande.opId : 0,
          },
        })

        const myProducteur = await this.prismaService.producteur.findFirst({
          where: {
            id: myDemande.producteurId != null ? myDemande.producteurId : 0,
          },
        })

        const demandeDetails: IDemandeDetail[] = []

        const myDemandeDetails =
          await this.prismaService.demandeDetail.findMany({
            where: { demandeId: myDemande.id },
          })

        for (const myDemandeDetail of myDemandeDetails) {
          const myPointService =
            await this.prismaService.pointService.findFirst({
              where: { id: myDemandeDetail.pointServiceId },
            })

          const myVarianteService =
            await this.prismaService.varianteService.findFirst({
              where: { id: myPointService!.varianteServiceId },
            })

          demandeDetails.push({
            id: myDemandeDetail.id,
            demandeId: myDemandeDetail.demandeId,
            pu: myDemandeDetail.pu,
            quantiteDemandee: myDemandeDetail.quantiteDemandee,
            quantiteLivree: myDemandeDetail.quantiteLivree,
            quantiteRecue: myDemandeDetail.quantiteRecue,
            valeurDemandee: myDemandeDetail.valeurDemandee,
            valeurLivree: myDemandeDetail.valeurLivree,
            valeurRecue: myDemandeDetail.valeurRecue,
            unite: myDemandeDetail.unite,
            observation: myDemandeDetail.observation,
            reference: myPointService!.reference,
            varianteId: myVarianteService!.id,
            varianteName: myVarianteService!.name,
            varianteConditionnement: myVarianteService!.conditionnement,
          })
        }

        demandes.push({
          id: myDemande.id,
          date: myDemande.date!,
          activiteId: myActivite!.id,
          activiteName: myActivite!.name,
          anneeId: myAnnee!.id,
          anneeName: myAnnee!.name,
          saisonId: mySaison!.id,
          saisonName: mySaison!.name,
          pointId: myPoint!.id,
          pointName: myPoint!.name,
          opId: myOrganisation?.id || 0,
          opName: myOrganisation?.name || '',
          producteurId: myProducteur?.id || 0,
          producteurPrenom: myProducteur?.prenom || '',
          producteurNom: myProducteur?.nom || '',
          demandeDetails: demandeDetails,
        })
      }

      return demandes
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prismaService.$disconnect()
    }
  }
*/
  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA'
  }

  async getOne(demandeId: number) {
    return this.prismaService.demande.findMany({
      include: {
        activite: {
          include: {},
        },
        annee: {
          include: {},
        },
        saison: {
          include: {},
        },
        point: {
          include: {},
        },
        producteur: {
          include: {},
        },
        op: {
          include: {},
        },
      },
      where: { id: demandeId },
    })
  }

  async create(createDemandeDto: CreateDemandeDto) {
    const { date, activiteId, anneeId, saisonId, pointId, producteurId, opId } =
      createDemandeDto
    const demande = await this.prismaService.demande.create({
      data: {
        date,
        activiteId,
        anneeId,
        saisonId,
        pointId,
        producteurId,
        opId,
      },
    })

    // Retourner l'ID de la demande créée
    return { data: 'Demande created', id: demande.id }
  }

  async update(demandeId: number, updateDemandeDto: UpdateDemandeDto) {
    const demande = await this.prismaService.demande.findUnique({
      where: { id: demandeId },
    })
    if (!demande) throw new NotFoundException('Demande not found')
    await this.prismaService.demande.update({
      where: { id: demandeId },
      data: { ...updateDemandeDto },
    })
    return { data: 'Demande updeted!' }
  }

  async delete(demandeId: number) {
    const demande = await this.prismaService.demande.findUnique({
      where: { id: demandeId },
    })
    if (!demande) throw new NotFoundException('Post not found')
    await this.prismaService.demande.delete({
      where: { id: demandeId },
    })
    return { data: 'Demande deleted' }
  }
}
