import { ForbiddenException, Injectable } from '@nestjs/common'
import {
  AgenceOpMapper,
  CreateAgenceOpDto,
  CreateOpDto,
  CreateOpPortefeuilleDto,
  CreateSocieteOpDto,
  GetOpParamsDTO,
  OpMapper,
  SocieteOpMapper,
  UpdateOpDto,
} from '@shared-models'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class OpService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOpDto) {
    const data = OpMapper.toEntity(dto)
    const created = await this.prisma.op.create({ data })
    return OpMapper.toDto(created)
  }

  async createPorteFeuille(dto: CreateOpPortefeuilleDto) {
    const dtoCreateOp: CreateOpPortefeuilleDto = {
      name: dto.name,
      sigle: dto.sigle,
      email: dto.email,
      telephone: dto.telephone,
      adresse: dto.adresse,
      latitude: dto.latitude,
      longitude: dto.longitude,
      prenomContact: dto.prenomContact,
      nomContact: dto.nomContact,
      emailContact: dto.email,
      telephoneContact: dto.telephoneContact,
      isActive: dto.isActive,
      formeJuridiqueId: dto.formeJuridiqueId,
      localiteId: dto.localiteId,
      pointId: dto.pointId,

      agencePortefeuilleId: dto.agencePortefeuilleId,
      societePortefeuilleId: dto.societePortefeuilleId,
      pointPortefeuilleId: dto.pointPortefeuilleId,
      compte: dto.compte,
      numRegistre: dto.numRegistre,
      ninea: dto.ninea,
    }

    const entityOp = OpMapper.toEntity(dtoCreateOp)
    const createdOp = await this.prisma.op.create({
      data: entityOp,
    })
    //return CreditAgenceMapper.toDto(createdCreditAgence)
    console.log('⭐ ⭐ ⭐ OpMapper.toDto(createdOp)', OpMapper.toDto(createdOp))
    if (dto.agencePortefeuilleId) {
      console.log('⭐ ⭐ ⭐ dto.agencePortefeuilleId', dto.agencePortefeuilleId)

      const dtoCreateSocieteOp: CreateSocieteOpDto = {
        compte: dto.compte ?? '',
        numRegistre: dto.numRegistre ?? '',
        ninea: dto.ninea ?? '',
        societeId: dto.societePortefeuilleId ?? 0,
        opId: OpMapper.toDto(createdOp).id,
      }

      const entityCreateSocieteOp = SocieteOpMapper.toEntity(dtoCreateSocieteOp)

      const createdSocieteOp = await this.prisma.societeOp.create({
        data: entityCreateSocieteOp,
      })

      console.log(
        '⭐ ⭐ ⭐ SocieteOpMapper.toDto(createdSocieteOp)',
        SocieteOpMapper.toDto(createdSocieteOp),
      )

      const dtoCreateAgenceOp: CreateAgenceOpDto = {
        agenceId: dto.agencePortefeuilleId ?? 0,
        opId: OpMapper.toDto(createdOp).id,
        pointId: dto.pointPortefeuilleId ?? 0,
      }

      const entityCreateAgenceOp = AgenceOpMapper.toEntity(dtoCreateAgenceOp)

      const createdAgenceOp = await this.prisma.agenceOp.create({
        data: entityCreateAgenceOp,
      })

      console.log(
        '⭐ ⭐ ⭐ AgenceOpMapper.toDto(createdAgenceOp)',
        AgenceOpMapper.toDto(createdAgenceOp),
      )
    }

    console.log('⭐ ⭐ ⭐ FINISHED')
  }

  async findAll() {
    const list = await this.prisma.op.findMany()
    return list.map(OpMapper.toDto)
  }

  async findOne(id: number) {
    const op = await this.prisma.op.findUnique({ where: { id } })
    return op ? OpMapper.toDto(op) : null
  }

  async update(id: number, dto: UpdateOpDto) {
    const data = OpMapper.toEntity(dto)
    const updated = await this.prisma.op.update({ where: { id }, data })
    return OpMapper.toDto(updated)
  }

  async remove(id: number) {
    await this.prisma.op.delete({ where: { id } })
    return { deleted: true }
  }
  async getOpsWithFiltersPaginationExtended(filtersInput: GetOpParamsDTO) {
    try {
      const where: any = {}

      if (filtersInput.opId) {
        const opIds = Array.isArray(filtersInput.opId)
          ? filtersInput.opId.map(Number)
          : [Number(filtersInput.opId)]
        where.id = { in: opIds }
      }
      if (filtersInput.formeJuridiqueId) {
        const formeJuridiqueIds = Array.isArray(filtersInput.formeJuridiqueId)
          ? filtersInput.formeJuridiqueId.map(Number)
          : [Number(filtersInput.formeJuridiqueId)]
        where.formeJuridiqueId = { in: formeJuridiqueIds }
      }
      if (filtersInput.localiteId) {
        const localiteIds = Array.isArray(filtersInput.localiteId)
          ? filtersInput.localiteId.map(Number)
          : [Number(filtersInput.localiteId)]
        where.localiteId = { in: localiteIds }
      }
      if (filtersInput.societeOpId?.length) {
        const societeIds = Array.isArray(filtersInput.societeOpId)
          ? filtersInput.societeOpId.map(Number)
          : [Number(filtersInput.societeOpId)]

        where.SocieteOp = {
          some: {
            societeId: { in: societeIds },
          },
        }
      }
      if (filtersInput.agenceOpId?.length) {
        const agenceOpIds = Array.isArray(filtersInput.agenceOpId)
          ? filtersInput.agenceOpId.map(Number)
          : [Number(filtersInput.agenceOpId)]

        where.AgenceOp = {
          some: {
            agenceId: { in: agenceOpIds }, // Filtre sur les agences liées
          },
        }
      }
      if (filtersInput.pointId?.length) {
        const pointIds = Array.isArray(filtersInput.pointId)
          ? filtersInput.pointId.map(Number)
          : [Number(filtersInput.pointId)]

        where.AgenceOp = {
          some: {
            point: {
              id: { in: pointIds }, // Filtre sur les agences liées
            },
          },
        }
      }

      // Ajout de la pagination
      const page = filtersInput.page || 1
      const limit = filtersInput.limit || 10000
      const skip = (page - 1) * limit
      const take = limit

      const opWithFilters = await this.prisma.op.findMany({
        where,
        skip,
        take,
        include: {
          formeJuridique: true,
          localite: true,
          point: true,
          SocieteOp: true,
          AgenceOp: {
            include: {
              agence: true,
              point: true,
            },
          },
        },
      })

      return opWithFilters
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
  async getOpsWithFiltersPagination(filtersInput: GetOpParamsDTO) {
    try {
      const where: any = {}

      if (filtersInput.opId) {
        const opIds = Array.isArray(filtersInput.opId)
          ? filtersInput.opId.map(Number)
          : [Number(filtersInput.opId)]
        where.id = { in: opIds }
      }

      if (filtersInput.formeJuridiqueId) {
        const formeJuridiqueIds = Array.isArray(filtersInput.formeJuridiqueId)
          ? filtersInput.formeJuridiqueId.map(Number)
          : [Number(filtersInput.formeJuridiqueId)]
        where.formeJuridiqueId = { in: formeJuridiqueIds }
      }
      if (filtersInput.localiteId) {
        const localiteIds = Array.isArray(filtersInput.localiteId)
          ? filtersInput.localiteId.map(Number)
          : [Number(filtersInput.localiteId)]
        where.localiteId = { in: localiteIds }
      }
      if (filtersInput.societeOpId?.length) {
        const societeIds = Array.isArray(filtersInput.societeOpId)
          ? filtersInput.societeOpId.map(Number)
          : [Number(filtersInput.societeOpId)]

        where.SocieteOp = {
          some: {
            societeId: { in: societeIds },
          },
        }
      }
      if (filtersInput.agenceOpId?.length) {
        const agenceOpIds = Array.isArray(filtersInput.agenceOpId)
          ? filtersInput.agenceOpId.map(Number)
          : [Number(filtersInput.agenceOpId)]

        where.AgenceOp = {
          some: {
            agenceId: { in: agenceOpIds }, // Filtre sur les agences liées
          },
        }
      }
      if (filtersInput.pointId?.length) {
        const pointIds = Array.isArray(filtersInput.pointId)
          ? filtersInput.pointId.map(Number)
          : [Number(filtersInput.pointId)]

        where.AgenceOp = {
          some: {
            point: {
              id: { in: pointIds }, // Filtre sur les agences liées
            },
          },
        }
      }

      // Ajout de la pagination

      const page = filtersInput.page || 1
      const limit = filtersInput.limit || 10000
      const skip = (page - 1) * limit
      const take = limit

      const opWithFilters = await this.prisma.op.findMany({
        where,
        skip,
        take,
        include: {
          formeJuridique: true,
          localite: true,
          point: true,
          SocieteOp: true,
          AgenceOp: {
            include: {
              agence: true,
              point: true,
            },
          },
        },
      })

      return opWithFilters.map(OpMapper.toDto)
    } catch (error) {
      throw new ForbiddenException(error)
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
  CreateOpDto,
  GetOpParamsDTO,
  IAgenceOp,
  IFormeJuridique,
  ILocalite,
  IOp,
  ISocieteOp,
  UpdateOpDto,
} from '@shared-models'

@Injectable()
export class OpService {
  constructor(private readonly prismaService: PrismaService) {}

  async insertMultipleOps(): Promise<any> {
    const ops = []

    // Générer 50 enregistrements aléatoires
    for (let i = 0; i < 500; i++) {
      ops.push({
        name: `Op_${Math.floor(Math.random() * 10000)}`, // ID unique
        sigle: `Sigle_${Math.floor(Math.random() * 10000)}`,
        email: `contact${Math.floor(Math.random() * 10000)}@example.com`,
        telephone: `06${Math.floor(Math.random() * 1000000000)}`,
        adresse: `Adresse_${Math.floor(Math.random() * 10000)}`,
        latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)), // Latitude aléatoire
        longitude: parseFloat((Math.random() * 360 - 180).toFixed(6)), // Longitude aléatoire
        prenomContact: `Prenom_${Math.floor(Math.random() * 10000)}`,
        nomContact: `Nom_${Math.floor(Math.random() * 10000)}`,
        emailContact: `contact${Math.floor(Math.random() * 10000)}@example.com`,
        telephoneContact: `06${Math.floor(Math.random() * 1000000000)}`,
        isActive: true,
        formeJuridiqueId: Math.floor(Math.random() * 4) + 1, // Forme juridique aléatoire entre 1 et 4
        localiteId: Math.floor(Math.random() * 12) + 1, // Localité aléatoire entre 1 et 12
        pointId: null, // Ou une valeur valide si vous avez un autre ID de point
      })
    }
    // Utiliser Prisma pour insérer ces 50 enregistrements
    return await this.prismaService.op.createMany({
      data: ops,
    })
  }
  async getAll() {
    return this.prismaService.op.findMany({
      include: {
        point: {
          include: {},
        },

        formeJuridique: {
          include: {},
        },
        localite: {
          include: {
            sousZone: {
              include: {
                zone: {
                  include: {
                    pays: {},
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async getOpsWithFiltersPagination(filtersInput: GetOpParamsDTO) {
    try {
      interface FilterWhere {
        opId?: { in: number[] }
        societeOpId?: { in: number[] }
        societeAgenceOpId?: { in: number[] }
        agenceOpId?: { in: number[] }
        pointId?: { in: number[] }
        formeJuridiqueId?: { in: number[] }
        localiteId?: { in: number[] }
      }
      const where: any = {}

      // Ajout des filtres existants
      if (filtersInput.opId) {
        const opIds = Array.isArray(filtersInput.opId)
          ? filtersInput.opId.map(Number)
          : [Number(filtersInput.opId)]
        where.id = { in: opIds }
      }

      if (filtersInput.formeJuridiqueId) {
        const formeJuridiqueIds = Array.isArray(filtersInput.formeJuridiqueId)
          ? filtersInput.formeJuridiqueId.map(Number)
          : [Number(filtersInput.formeJuridiqueId)]
        where.formeJuridiqueId = { in: formeJuridiqueIds }
      }
      if (filtersInput.localiteId) {
        const localiteIds = Array.isArray(filtersInput.localiteId)
          ? filtersInput.localiteId.map(Number)
          : [Number(filtersInput.localiteId)]
        where.localiteId = { in: localiteIds }
      }
      if (filtersInput.societeOpId?.length) {
        const societeIds = Array.isArray(filtersInput.societeOpId)
          ? filtersInput.societeOpId.map(Number)
          : [Number(filtersInput.societeOpId)]

        where.SocieteOp = {
          some: {
            societeId: { in: societeIds },
          },
        }
      }
      if (filtersInput.agenceOpId?.length) {
        const agenceOpIds = Array.isArray(filtersInput.agenceOpId)
          ? filtersInput.agenceOpId.map(Number)
          : [Number(filtersInput.agenceOpId)]

        where.AgenceOp = {
          some: {
            agenceId: { in: agenceOpIds }, // Filtre sur les agences liées
          },
        }
      }
      if (filtersInput.pointId?.length) {
        const pointIds = Array.isArray(filtersInput.pointId)
          ? filtersInput.pointId.map(Number)
          : [Number(filtersInput.pointId)]

        where.AgenceOp = {
          some: {
            point: {
              id: { in: pointIds }, // Filtre sur les agences liées
            },
          },
        }
      }

      // Ajout de la pagination
      const page = filtersInput.page || 1 // Page par défaut : 1
      const limit = filtersInput.limit || 10000 // Limite par défaut : 10
      const skip = (page - 1) * limit
      const take = limit

      console.log('where: ', where)
      const opWithFilters = await this.prismaService.op.findMany({
        where,
        skip, // Pagination : nombre d'éléments à ignorer
        take,
        include: {
          SocieteOp: {
            include: {},
          },
          AgenceOp: {
            include: {
              agence: {
                include: {},
              },
              point: {
                include: {},
              },
            },
          },

          formeJuridique: {
            include: {},
          },
          localite: {
            include: {},
          },
          point: {
            include: {},
          },
        },
      })
      // console.log('✅ ✅ ✅ opWithFilters: ', opWithFilters)
      const ops: IOp[] = []

      for (const myOp of opWithFilters) {
        const op: IOp = {
          id: myOp.id,
          name: myOp.name,
          sigle: myOp.sigle,
          email: myOp.email,
          telephone: myOp.telephone,
          adresse: myOp.adresse,
          latitude: myOp.latitude,
          longitude: myOp.longitude,
          prenomContact: myOp.prenomContact,
          nomContact: myOp.nomContact,
          emailContact: myOp.emailContact,
          telephoneContact: myOp.telephoneContact,
          isActive: myOp.isActive,
          formeJuridiqueId: myOp.formeJuridique?.id || 0,
          localiteId: myOp.localite?.id || 0,
          pointId: myOp.pointId || 0,
          formeJuridique: myOp.formeJuridique as IFormeJuridique,
          localite: myOp.localite as ILocalite,
          SocieteOp: myOp.SocieteOp as ISocieteOp[],
          AgenceOp: myOp.AgenceOp as IAgenceOp[],

          
        }
        ops.push(op)
      }

      return ops
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async getOne(opId: number) {
    const op = await this.prismaService.op.findUnique({
      where: { id: opId },
    })
    if (!op) throw new NotFoundException('Post not found')
    return op
  }
  async create(createOpDto: CreateOpDto) {
    const {
      name,
      sigle,
      email,
      telephone,
      adresse,
      latitude,
      longitude,
      prenomContact,
      nomContact,
      emailContact,
      telephoneContact,

      isActive,
      formeJuridiqueId,
      localiteId,
    } = createOpDto
    await this.prismaService.op.create({
      data: {
        name,
        sigle,
        email,
        telephone,
        adresse,
        latitude,
        longitude,
        prenomContact,
        nomContact,
        emailContact,
        telephoneContact,
        isActive,
        formeJuridiqueId,
        localiteId,
      },
    })
    return { data: 'Op created' }
  }

  async update(opId: number, updateOpDto: UpdateOpDto) {
    const op = await this.prismaService.op.findUnique({
      where: { id: opId },
    })
    if (!op) throw new NotFoundException('Op not found')
    await this.prismaService.op.update({
      where: { id: opId },
      data: { ...updateOpDto },
    })
    return { data: 'Op updeted!' }
  }

  async delete(opId: number) {
    const op = await this.prismaService.op.findUnique({
      where: { id: opId },
    })
    if (!op) throw new NotFoundException('Post not found')
    await this.prismaService.op.delete({
      where: { id: opId },
    })
    return { data: 'Op deleted' }
  }
}
*/
