import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

import { Prisma } from '@prisma/client'
import {
  CreateMouvementIntrantDto,
  GetMouvementIntrantParamsDTO,
  IMouvementIntrant,
  UpdateMouvementIntrantDto,
} from './mouvement_intrant.dto'
import { isNumber } from 'class-validator'
import { applyFilters } from '../../utils/filters'

@Injectable()
export class MouvementIntrantService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.mouvementIntrant.findMany({
      select: {
        id: true,
        date: true,
        pu: true,
        quantiteEntreeEmballage: true,
        quantiteSortieEmballage: true,
        nombreUnite: true,
        valeur: true,
        chargeExploitation: {
          select: {
            id: true,
            name: true,
          },
        },
        annee: {
          select: {
            id: true,
            name: true,
            valeur: true,
          },
        },
        saison: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        /*
                    emballage: {
                        select: {
                            name: true,
                            conditionnement: true,
                            quantite: true,
                            pu: true,
                            valeur: true,
                            isActive: true,
                            isDefault: true
                        }
                    },
                    */

        op: {
          select: {
            id: true,
            name: true,
          },
        },
        societe: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacement: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacementSource: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacementDestination: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }
  async getAllMouvementIntrantCampagneOpFournisseur(
    anneeId: number,
    saisonId: number,
    chargeExploitationId?: number,
    opId?: number,
    societeId?: number,
  ) {
    return this.prismaService.mouvementIntrant.findMany({
      select: {
        id: true,
        date: true,
        pu: true,
        quantiteEntreeEmballage: true,
        quantiteSortieEmballage: true,
        nombreUnite: true,
        valeur: true,

        chargeExploitation: {
          select: {
            id: true,
            name: true,
          },
        },
        modeEntreeSortieIntrant: {
          select: {
            id: true,
            name: true,
          },
        },
        annee: {
          select: {
            id: true,
            name: true,
            valeur: true,
          },
        },
        saison: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },

        emballageIntrant: {
          select: {
            id: true,
            name: true,
            conditionnement: true,
            quantite: true,
            pu: true,
            valeur: true,
            isActive: true,
            isDefault: true,
          },
        },

        op: {
          select: {
            id: true,
            name: true,
          },
        },
        societe: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacement: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        anneeId: anneeId,
        saisonId: saisonId,
        chargeExploitationId: chargeExploitationId,
        opId: opId,
        societeId: societeId,
      },
    })
  }

  /*
  arrayToString(arr: any[], delimiter: string = ','): string {
    return arr.join(delimiter);
  }
  */

  removeFirstAndLastCharacter(str: string): string {
    if (str.length <= 2) {
      return ''
    }
    return str.substring(1, str.length - 1)
  }

  async getAllMouvementIntrantWithFilters(
    filtersInput: GetMouvementIntrantParamsDTO,
  ) {
    try {
      const filters: {
        opId?: { in: number[] }
        societeId?: { in: number[] }
        anneeId?: { in: number[] }
        saisonId?: { in: number[] }
        emplacementId?: { in: number[] }
        chargeExploitationId?: { in: number[] }
        lot?: { in: string[] }
      } = {}

      // Helper function to convert string to number array
      const toNumberArray = (value: number | string) =>
        value.toString().split(',').map(Number)

      // Build filters object based on input parameters
      if (filtersInput.opId) {
        filters.opId = { in: toNumberArray(filtersInput.opId) }
      }

      if (filtersInput.societeId) {
        filters.societeId = {
          in: toNumberArray(filtersInput.societeId),
        }
      }

      if (filtersInput.anneeId) {
        filters.anneeId = { in: toNumberArray(filtersInput.anneeId) }
      }

      if (filtersInput.saisonId) {
        filters.saisonId = { in: toNumberArray(filtersInput.saisonId) }
      }

      if (filtersInput.emplacementId) {
        filters.emplacementId = {
          in: toNumberArray(filtersInput.emplacementId),
        }
      }

      if (filtersInput.chargeExploitationId) {
        filters.chargeExploitationId = {
          in: toNumberArray(filtersInput.chargeExploitationId),
        }
      }

      if (filtersInput.lot) {
        filters.lot = { in: filtersInput.lot.toString().split(',') }
      }

      const mouvementIntrantWithFilters =
        await this.prismaService.mouvementIntrant.findMany({
          select: {
            id: true,
            date: true,
            pu: true,
            quantiteEntreeEmballage: true,
            quantiteSortieEmballage: true,
            nombreUnite: true,
            valeur: true,
            lot: true,
            anneeId: true,
            saisonId: true,
            emballageIntrantId: true,
            modeEntreeSortieIntrantId: true,
            chargeExploitationId: true,
            opId: true,
            societeId: true,
            emplacementId: true,
            emplacementSourceId: true,
            emplacementDestinationId: true,

            annee: {
              select: {
                id: true,
                name: true,
                valeur: true,
              },
            },
            saison: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            emballageIntrant: {
              select: {
                id: true,
                name: true,
                conditionnement: true,
                quantite: true,
                pu: true,
                valeur: true,
                isActive: true,
                isDefault: true,
              },
            },
            modeEntreeSortieIntrant: {
              select: {
                id: true,
                name: true,
              },
            },
            chargeExploitation: {
              select: {
                id: true,
                name: true,
                uniteGrandeur: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            op: {
              select: {
                id: true,
                name: true,
                sigle: true,
              },
            },
            societe: {
              select: {
                id: true,
                name: true,
                sigle: true,
              },
            },
            emplacement: {
              select: {
                id: true,
                name: true,
                entrepot: {
                  select: {
                    id: true,
                    name: true,
                    point: {
                      select: {
                        id: true,
                        name: true,
                        isProduit: true,
                        isIntrant: true,
                        isVirtuel: true,
                      },
                    },
                  },
                },
              },
            },
            emplacementSource: {
              select: {
                id: true,
                name: true,
                entrepot: {
                  select: {
                    id: true,
                    name: true,
                    point: {
                      select: {
                        id: true,
                        name: true,
                        isProduit: true,
                        isIntrant: true,
                        isVirtuel: true,
                      },
                    },
                  },
                },
              },
            },
            emplacementDestination: {
              select: {
                id: true,
                name: true,
                entrepot: {
                  select: {
                    id: true,
                    name: true,
                    point: {
                      select: {
                        id: true,
                        name: true,
                        isProduit: true,
                        isIntrant: true,
                        isVirtuel: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })

      // Tableau pour stocker les mouvements d'intrants formatés
      const mouvementIntrants: IMouvementIntrant[] = []

      // Parcourir tous les mouvements et les formater
      for (const myMouvement of mouvementIntrantWithFilters) {
        // Formater la date en format français
        const dateObjectMouvementIntrant = new Date(myMouvement.date)
        const formattedDateMouvementIntrant =
          dateObjectMouvementIntrant.toLocaleDateString('fr-FR')

        // Déterminer la quantité entrée/sortie
        const quantiteEntreeSortieEmballage =
          myMouvement.quantiteEntreeEmballage !== 0
            ? myMouvement.quantiteEntreeEmballage
            : myMouvement.quantiteSortieEmballage

        // Déterminer les informations du partenaire (OP ou societe)
        const partenaireInfo = {
          id: 0,
          name: '',
          sigle: '',
        }

        if (myMouvement.societeId && !myMouvement.opId) {
          partenaireInfo.id = myMouvement.societeId
          partenaireInfo.name = myMouvement.societe?.name || ''
          partenaireInfo.sigle = myMouvement.societe?.sigle || ''
        } else if (!myMouvement.societeId && myMouvement.opId) {
          partenaireInfo.id = myMouvement.opId
          partenaireInfo.name = myMouvement.op?.name || ''
          partenaireInfo.sigle = myMouvement.op?.sigle || ''
        }

        // Construire l'objet mouvement formaté
        mouvementIntrants.push({
          // Informations de base
          id: myMouvement.id,
          date: formattedDateMouvementIntrant,
          pu: myMouvement.pu,
          quantiteEntreeEmballage: myMouvement.quantiteEntreeEmballage,
          quantiteSortieEmballage: myMouvement.quantiteSortieEmballage,
          quantiteEntreeSortieEmballage,
          nombreUnite: myMouvement.nombreUnite,
          valeur: myMouvement.valeur,
          lot: myMouvement.lot,

          // Mode d'entrée/sortie et charge d'exploitation
          modeEntreeSortieIntrantId: myMouvement.modeEntreeSortieIntrant.id,
          modeEntreeSortieIntrantName: myMouvement.modeEntreeSortieIntrant.name,
          chargeExploitationId: myMouvement.chargeExploitation?.id || 0,
          chargeExploitationName: myMouvement.chargeExploitation?.name || '',
          chargeExploitationUniteGrandeurId:
            myMouvement.chargeExploitation?.uniteGrandeur?.id || 0,
          chargeExploitationUniteGrandeurName:
            myMouvement.chargeExploitation?.uniteGrandeur?.name || '',

          // Année et saison
          anneeId: myMouvement.annee.id,
          anneeName: myMouvement.annee.name,
          anneeValeur: myMouvement.annee.valeur,
          saisonId: myMouvement.saison.id,
          saisonName: myMouvement.saison.name,
          saisonDescription: myMouvement.saison.description,

          // Emballage
          emballageIntrantId: myMouvement.emballageIntrant.id,
          emballageIntrantName: myMouvement.emballageIntrant.name,

          // OP
          opId: myMouvement.opId || 0,
          opName: myMouvement.op?.name || '',
          opSigle: myMouvement.op?.sigle || '',

          // Fournisseur
          societeId: myMouvement.societeId || 0,
          societeName: myMouvement.societe?.name || '',
          societeSigle: myMouvement.societe?.sigle || '',

          // Partenaire (OP ou societe)
          partenaireId: partenaireInfo.id,
          partenaireName: partenaireInfo.name,
          partenaireSigle: partenaireInfo.sigle,

          // Emplacement principal
          emplacementId: myMouvement.emplacementId || 0,
          emplacementName: myMouvement.emplacement?.name || '',
          entrepotId: myMouvement.emplacement?.entrepot?.id || 0,
          entrepotName: myMouvement.emplacement?.entrepot?.name || '',
          pointId: myMouvement.emplacement?.entrepot?.point?.id || 0,
          pointName: myMouvement.emplacement?.entrepot?.point?.name || '',

          // Emplacement source
          emplacementSourceId: myMouvement.emplacementSourceId ?? 0,
          emplacementSourceName: myMouvement.emplacementSource?.name ?? '',
          entrepotSourceId: myMouvement.emplacementSource?.entrepot?.id ?? 0,
          entrepotSourceName:
            myMouvement.emplacementSource?.entrepot?.name ?? '',
          pointSourceId:
            myMouvement.emplacementSource?.entrepot?.point?.id ?? 0,
          pointSourceName:
            myMouvement.emplacementSource?.entrepot?.point?.name ?? '',

          // Emplacement destination
          emplacementDestinationId: myMouvement.emplacementDestinationId ?? 0,
          emplacementDestinationName:
            myMouvement.emplacementDestination?.name ?? '',
          entrepotDestinationId:
            myMouvement.emplacementDestination?.entrepot?.id ?? 0,
          entrepotDestinationName:
            myMouvement.emplacementDestination?.entrepot?.name ?? '',
          pointDestinationId:
            myMouvement.emplacementDestination?.entrepot?.point?.id ?? 0,
          pointDestinationName:
            myMouvement.emplacementDestination?.entrepot?.point?.name ?? '',
        })
      }

      return mouvementIntrants
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async getOne(mouvementIntrantId: number) {
    return this.prismaService.mouvementIntrant.findMany({
      select: {
        id: true,
        date: true,
        pu: true,
        quantiteEntreeEmballage: true,
        quantiteSortieEmballage: true,
        nombreUnite: true,
        valeur: true,

        emballageIntrant: {
          select: {
            name: true,
            conditionnement: true,
            quantite: true,
            pu: true,
            valeur: true,
            isActive: true,
            isDefault: true,
          },
        },

        chargeExploitation: {
          select: {
            id: true,
            name: true,
          },
        },
        op: {
          select: {
            id: true,
            name: true,
          },
        },
        societe: {
          select: {
            id: true,
            name: true,
          },
        },
        emplacement: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: { id: mouvementIntrantId },
    })
  }

  async create(createMouvementIntrantDto: CreateMouvementIntrantDto) {
    const {
      date,
      pu,
      quantiteEntreeEmballage,
      quantiteSortieEmballage,
      nombreUnite,
      valeur,
      lot,
      opId,
      societeId,
      chargeExploitationId,
      modeEntreeSortieIntrantId,
      emplacementId,
      emplacementSourceId,
      emplacementDestinationId,
      emballageIntrantId,
      anneeId,
      saisonId,
    } = createMouvementIntrantDto
    await this.prismaService.mouvementIntrant.create({
      data: {
        date,
        pu,
        quantiteEntreeEmballage,
        quantiteSortieEmballage,
        nombreUnite,
        valeur,
        lot,
        opId,
        societeId,
        chargeExploitationId,
        modeEntreeSortieIntrantId,
        emplacementId,
        emplacementSourceId,
        emplacementDestinationId,
        emballageIntrantId,
        anneeId,
        saisonId,
      },
    })
    return { data: 'MouvementIntrant created' }
  }

  async update(
    mouvementIntrantId: number,
    updateMouvementIntrantDto: UpdateMouvementIntrantDto,
  ) {
    const mouvementIntrant =
      await this.prismaService.mouvementIntrant.findUnique({
        where: { id: mouvementIntrantId },
      })
    if (!mouvementIntrant)
      throw new NotFoundException('MouvementIntrant not found')
    await this.prismaService.mouvementIntrant.update({
      where: { id: mouvementIntrantId },
      data: { ...updateMouvementIntrantDto },
    })
    return { data: 'MouvementIntrant updeted!' }
  }

  async delete(mouvementIntrantId: number) {
    const mouvementIntrant =
      await this.prismaService.mouvementIntrant.findUnique({
        where: { id: mouvementIntrantId },
      })
    if (!mouvementIntrant) throw new NotFoundException('Post not found')
    await this.prismaService.mouvementIntrant.delete({
      where: { id: mouvementIntrantId },
    })
    return { data: 'MouvementIntrant deleted' }
  }
}
