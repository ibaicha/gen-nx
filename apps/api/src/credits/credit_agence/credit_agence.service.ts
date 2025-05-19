import { ForbiddenException, Injectable } from '@nestjs/common'
import {
  CreateCreditAgenceDto,
  CreditAgenceMapper,
  GetCreditAgenceParamsDTO,
  UpdateCreditAgenceDto,
} from '@shared-models'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class CreditAgenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCreditAgenceDto) {
    const entity = CreditAgenceMapper.toEntity(dto)
    const created = await this.prisma.creditAgence.create({ data: entity })
    return CreditAgenceMapper.toDto(created)
  }

  async findAll() {
    const all = await this.prisma.creditAgence.findMany()
    return all.map(CreditAgenceMapper.toDto)
  }

  async findOne(id: number) {
    const found = await this.prisma.creditAgence.findUnique({ where: { id } })
    return found ? CreditAgenceMapper.toDto(found) : null
  }

  async update(id: number, dto: UpdateCreditAgenceDto) {
    const updated = await this.prisma.creditAgence.update({
      where: { id },
      data: CreditAgenceMapper.toEntity(dto),
    })
    return CreditAgenceMapper.toDto(updated)
  }

  async remove(id: number) {
    await this.prisma.creditAgence.delete({ where: { id } })
  }

  async getCreditsAgenceWithFiltersPagination(
    filtersInput: GetCreditAgenceParamsDTO,
  ) {
    try {
      const where: Record<string, unknown> = {}

      if (filtersInput.creditAgenceId) {
        const ids = Array.isArray(filtersInput.creditAgenceId)
          ? filtersInput.creditAgenceId.map(Number)
          : [Number(filtersInput.creditAgenceId)]
        where.id = { in: ids }
      }
      if (filtersInput.opId) {
        const ids = Array.isArray(filtersInput.opId)
          ? filtersInput.opId.map(Number)
          : [Number(filtersInput.opId)]
        where.opId = { in: ids }
      }
      if (filtersInput.agenceId) {
        const ids = Array.isArray(filtersInput.agenceId)
          ? filtersInput.agenceId.map(Number)
          : [Number(filtersInput.agenceId)]
        where.agenceId = { in: ids }
      }
      if (filtersInput.societeId) {
        const ids = Array.isArray(filtersInput.societeId)
          ? filtersInput.societeId.map(Number)
          : [Number(filtersInput.societeId)]
        where.agenceOp = { agence: { societeId: { in: ids } } }
      }
      if (filtersInput.agenceOpId) {
        const ids = Array.isArray(filtersInput.agenceOpId)
          ? filtersInput.agenceOpId.map(Number)
          : [Number(filtersInput.agenceOpId)]
        where.agenceOpId = { in: ids }
      }
      if (filtersInput.varieteId) {
        const ids = Array.isArray(filtersInput.varieteId)
          ? filtersInput.varieteId.map(Number)
          : [Number(filtersInput.varieteId)]
        where.varieteId = { in: ids }
      }
      if (filtersInput.produitId) {
        const ids = Array.isArray(filtersInput.produitId)
          ? filtersInput.produitId.map(Number)
          : [Number(filtersInput.produitId)]
        where.variete = { produitId: { in: ids } }
      }
      if (filtersInput.anneeId) {
        const ids = Array.isArray(filtersInput.anneeId)
          ? filtersInput.anneeId.map(Number)
          : [Number(filtersInput.anneeId)]
        where.anneeId = { in: ids }
      }
      if (filtersInput.saisonId) {
        const ids = Array.isArray(filtersInput.saisonId)
          ? filtersInput.saisonId.map(Number)
          : [Number(filtersInput.saisonId)]
        where.saisonId = { in: ids }
      }

      const page = filtersInput.page || 1
      const limit = filtersInput.limit || 10000
      const skip = (page - 1) * limit

      const creditsAgenceWithFilters = await this.prisma.creditAgence.findMany({
        where,
        skip,
        take: limit,
        include: {
          variete: { include: { produit: { include: { filiere: true } } } },
          annee: true,
          saison: true,
          agence: true,
          agenceOp: {
            include: {
              agence: true,
              point: true,
              op: {
                include: {
                  formeJuridique: true,
                  localite: true,
                },
              },
            },
          },
          op: {
            include: {
              formeJuridique: true,
              SocieteOp: true,
              localite: true,
            },
          },
          RemboursementAgence: true,
        },
      })

      return creditsAgenceWithFilters.map(CreditAgenceMapper.toDto)
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async getCreditsAgenceWithFiltersPaginationExtended(
    filtersInput: GetCreditAgenceParamsDTO,
  ) {
    try {
      const where: Record<string, unknown> = {}
      // Ajout des filtres existants

      if (filtersInput.creditAgenceId) {
        const creditAgenceIds = Array.isArray(filtersInput.creditAgenceId)
          ? filtersInput.creditAgenceId.map(Number)
          : [Number(filtersInput.creditAgenceId)]
        where.id = { in: creditAgenceIds }
      }
      if (filtersInput.opId) {
        const opIds = Array.isArray(filtersInput.opId)
          ? filtersInput.opId.map(Number)
          : [Number(filtersInput.opId)]
        where.id = { in: opIds }
      }

      if (filtersInput.agenceId) {
        const agenceIds = Array.isArray(filtersInput.agenceId)
          ? filtersInput.agenceId.map(Number)
          : [Number(filtersInput.agenceId)]
        where.agenceId = { in: agenceIds }
      }

      if (filtersInput.societeId) {
        const societeIds = Array.isArray(filtersInput.societeId)
          ? filtersInput.societeId.map(Number)
          : [Number(filtersInput.societeId)]

        where.agenceOp = {
          agence: {
            societeId: {
              in: societeIds,
            },
          },
        }
      }

      if (filtersInput.agenceOpId) {
        const agenceOpIds = Array.isArray(filtersInput.agenceOpId)
          ? filtersInput.agenceOpId.map(Number)
          : [Number(filtersInput.agenceOpId)]
        where.agenceOpId = { in: agenceOpIds }
      }

      if (filtersInput.varieteId) {
        const varieteIds = Array.isArray(filtersInput.varieteId)
          ? filtersInput.varieteId.map(Number)
          : [Number(filtersInput.varieteId)]
        where.varieteId = { in: varieteIds }
      }
      if (filtersInput.produitId) {
        const produitIds = Array.isArray(filtersInput.produitId)
          ? filtersInput.produitId.map(Number)
          : [Number(filtersInput.produitId)]

        where.variete = {
          produitId: {
            in: produitIds,
          },
        }
      }
      if (filtersInput.anneeId) {
        const anneeIds = Array.isArray(filtersInput.anneeId)
          ? filtersInput.anneeId.map(Number)
          : [Number(filtersInput.anneeId)]
        where.anneeId = { in: anneeIds }
      }
      if (filtersInput.saisonId) {
        const saisonIds = Array.isArray(filtersInput.saisonId)
          ? filtersInput.saisonId.map(Number)
          : [Number(filtersInput.saisonId)]
        where.saisonId = { in: saisonIds }
      }
      const page = filtersInput.page || 1
      const limit = filtersInput.limit || 10000
      const skip = (page - 1) * limit

      const creditsAgenceWithFilters = await this.prisma.creditAgence.findMany({
        where,
        skip,
        take: limit,
        include: {
          variete: { include: { produit: { include: { filiere: true } } } },
          annee: true,
          saison: true,
          agence: true,
          agenceOp: {
            include: {
              agence: true,
              point: true,
              op: {
                include: {
                  formeJuridique: true,
                  localite: true,
                },
              },
            },
          },
          op: {
            include: {
              formeJuridique: true,
              SocieteOp: true,
              localite: true,
            },
          },
          RemboursementAgence: true,
        },
      })

      return creditsAgenceWithFilters //.map(CreditAgenceMapper.toDto)
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prisma.$disconnect()
    }
  }
}

/*

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

import {
  CreateCreditAgenceDto,
  GetCreditAgenceParamsDTO,
  IAgenceOp,
  ICreditAgence,
  IOp,
  IRemboursement,
  IVariete,
  UpdateCreditAgenceDto,
} from '@shared-models'

//import { ExploitationChargeExploitationController } from 'src/exploitations/exploitation_charge_exploitation/exploitation_charge_exploitation.controller';

@Injectable()
export class CreditAgenceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.creditAgence.findMany({
      include: {
        variete: {
          include: {},
        },
        annee: {
          include: {},
        },
        saison: {
          include: {},
        },
        agence: {
          include: {},
        },
        agenceOp: {
          include: {},
        },
        op: {
          include: {},
        },
        RemboursementAgence: {
          include: {},
        },
      },
    })
  }

  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA'
  }

  async getCreditsAgenceWithFiltersPagination(
    filtersInput: GetCreditAgenceParamsDTO,
  ) {
    try {
      interface FilterWhere {
        societeId?: number | number[]
        agenceId?: number | number[]
        agenceOpId?: number | number[]
        varieteId?: number | number[]
        anneeId?: number | number[]
        saisonId?: number | number[]
        opId?: number | number[]
      }

      const where: any = {}
      // Ajout des filtres existants

      if (filtersInput.creditAgenceId) {
        const creditAgenceIds = Array.isArray(filtersInput.creditAgenceId)
          ? filtersInput.creditAgenceId.map(Number)
          : [Number(filtersInput.creditAgenceId)]
        where.id = { in: creditAgenceIds }
      }
      if (filtersInput.opId) {
        const opIds = Array.isArray(filtersInput.opId)
          ? filtersInput.opId.map(Number)
          : [Number(filtersInput.opId)]
        where.id = { in: opIds }
      }

      if (filtersInput.agenceId) {
        const agenceIds = Array.isArray(filtersInput.agenceId)
          ? filtersInput.agenceId.map(Number)
          : [Number(filtersInput.agenceId)]
        where.agenceId = { in: agenceIds }
      }

      if (filtersInput.societeId) {
        const societeIds = Array.isArray(filtersInput.societeId)
          ? filtersInput.societeId.map(Number)
          : [Number(filtersInput.societeId)]

        where.agenceOp = {
          agence: {
            societeId: {
              in: societeIds,
            },
          },
        }
      }

      if (filtersInput.agenceOpId) {
        const agenceOpIds = Array.isArray(filtersInput.agenceOpId)
          ? filtersInput.agenceOpId.map(Number)
          : [Number(filtersInput.agenceOpId)]
        where.agenceOpId = { in: agenceOpIds }
      }

      if (filtersInput.varieteId) {
        const varieteIds = Array.isArray(filtersInput.varieteId)
          ? filtersInput.varieteId.map(Number)
          : [Number(filtersInput.varieteId)]
        where.varieteId = { in: varieteIds }
      }
      if (filtersInput.produitId) {
        const produitIds = Array.isArray(filtersInput.produitId)
          ? filtersInput.produitId.map(Number)
          : [Number(filtersInput.produitId)]

        where.variete = {
          produitId: {
            in: produitIds,
          },
        }
      }
      if (filtersInput.anneeId) {
        const anneeIds = Array.isArray(filtersInput.anneeId)
          ? filtersInput.anneeId.map(Number)
          : [Number(filtersInput.anneeId)]
        where.anneeId = { in: anneeIds }
      }
      if (filtersInput.saisonId) {
        const saisonIds = Array.isArray(filtersInput.saisonId)
          ? filtersInput.saisonId.map(Number)
          : [Number(filtersInput.saisonId)]
        where.saisonId = { in: saisonIds }
      }
      // Ajout de la pagination
      const page = filtersInput.page || 1 // Page par défaut : 1
      const limit = filtersInput.limit || 10000 // Limite par défaut : 10
      const skip = (page - 1) * limit
      const take = limit

      console.log('where: ', where)
      const creditsAgenceWithFilters =
        await this.prismaService.creditAgence.findMany({
          where,
          skip, // Pagination : nombre d'éléments à ignorer
          take,
          include: {
            variete: {
              include: {
                produit: {
                  include: {
                    filiere: {
                      include: {},
                    },
                  },
                },
              },
            },
            annee: true,
            saison: true,
            agence: {
              include: {},
            },
            agenceOp: {
              include: {
                agence: true,
                point: true,
                op: {
                  include: {
                    formeJuridique: true,
                    localite: true,
                  },
                },
              },
            },

            op: {
              include: {
                formeJuridique: true,
                SocieteOp: true,
                localite: true,
              },
            },
            RemboursementAgence: {
              include: {},
            },
          },
        })
      const creditAgences: ICreditAgence[] = []
      for (const myCreditAgence of creditsAgenceWithFilters) {
        //console.log('creditAgence: ', myCreditAgence)
        const creditAgence: ICreditAgence = {
          id: myCreditAgence.id,
          date: myCreditAgence.date,
          capital: myCreditAgence.capital,
          interet: myCreditAgence.interet,
          moratoire: myCreditAgence.moratoire,
          autres_engagements: myCreditAgence.autres_engagements,
          varieteId: myCreditAgence.varieteId ?? undefined,
          anneeId: myCreditAgence.anneeId ?? undefined,
          saisonId: myCreditAgence.saisonId ?? undefined,
          agenceOpId: myCreditAgence.agenceOpId ?? undefined,
          agenceId: myCreditAgence.agenceId ?? undefined,
          opId: myCreditAgence.opId ?? undefined,
          variete: myCreditAgence.variete as IVariete,
          annee: myCreditAgence.annee ?? undefined,
          saison: myCreditAgence.saison ?? undefined,
          agence: myCreditAgence.agence ?? undefined,
          agenceOp: myCreditAgence.agenceOp as IAgenceOp,

          op: myCreditAgence.op as IOp,
          RemboursementAgence:
            myCreditAgence.RemboursementAgence as IRemboursement[],
        }
        creditAgences.push(creditAgence)
      }

      return creditAgences
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async getOne(creditAgenceId: number) {
    const creditAgence = await this.prismaService.creditAgence.findUnique({
      where: { id: creditAgenceId },
    })
    if (!creditAgence) throw new NotFoundException('Post not found')
    return creditAgence
  }
  async create(createCreditAgenceDto: CreateCreditAgenceDto) {
    const {
      date,
      capital,
      interet,
      moratoire,
      autres_engagements,
      agenceOpId,
      agenceId,
      varieteId,
      anneeId,
      saisonId,
      opId,
    } = createCreditAgenceDto
    await this.prismaService.creditAgence.create({
      data: {
        date,
        capital,
        interet,
        moratoire,
        autres_engagements,
        agenceOpId,
        agenceId,
        varieteId,
        anneeId,
        saisonId,
        opId,
      },
    })
    return { data: 'CreditAgence created' }
  }

  async update(
    creditAgenceId: number,
    updateCreditAgenceDto: UpdateCreditAgenceDto,
  ) {
    const creditAgence = await this.prismaService.creditAgence.findUnique({
      where: { id: creditAgenceId },
    })
    if (!creditAgence) throw new NotFoundException('CreditAgence not found')
    await this.prismaService.creditAgence.update({
      where: { id: creditAgenceId },
      data: { ...updateCreditAgenceDto },
    })
    return { data: 'CreditAgence updeted!' }
  }

  async delete(creditAgenceId: number) {
    const creditAgence = await this.prismaService.creditAgence.findUnique({
      where: { id: creditAgenceId },
    })
    if (!creditAgence) throw new NotFoundException('Post not found')
    await this.prismaService.creditAgence.delete({
      where: { id: creditAgenceId },
    })
    return { data: 'CreditAgence deleted' }
  }
}
*/
