import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  CreateAgenceOpDto,
  GetAgenceOpParamsDTO,
  IAgenceOp,
  IOp,
  IPoint,
  UpdateAgenceOpDto,
} from '@shared-models'

@Injectable()
export class AgenceOpService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.agenceOp.findMany({
      include: {
        op: {
          include: {},
        },
        agence: {
          include: {
            societe: {
              include: {
                formeJuridique: {},
                typeSociete: {},
              },
            },
          },
        },
      },
    })
  }

  async getCustomAll() {
    return this.prismaService.agenceOp.findMany({
      include: {
        op: {
          include: {},
        },
        agence: {
          include: {
            societe: {
              include: {
                formeJuridique: {},
                typeSociete: {},
              },
            },
          },
        },
      },
    })
  }

  async getAgencesOpWithFiltersPagination(filtersInput: GetAgenceOpParamsDTO) {
    try {
      // Vérification des paramètres de filtre
      const where: any = {}
      // Ajout des filtres existants
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
      if (filtersInput.pointId) {
        const pointIds = Array.isArray(filtersInput.pointId)
          ? filtersInput.pointId.map(Number)
          : [Number(filtersInput.pointId)]
        where.pointId = { in: pointIds }
      }

      // Ajout de la pagination
      const page = filtersInput.page || 1 // Page par défaut : 1
      const limit = filtersInput.limit || 10000 // Limite par défaut : 10
      const skip = (page - 1) * limit
      const take = limit

      console.log('where: ', where)
      const agencesOpWithFilters = await this.prismaService.agenceOp.findMany({
        where,
        skip, // Pagination : nombre d'éléments à ignorer
        take,
        include: {
          agence: {
            include: {},
          },
          op: {
            include: {},
          },
          point: {
            include: {},
          },
        },
      })
      console.log('agencesOpWithFilters: ', agencesOpWithFilters)

      const agenceOps: IAgenceOp[] = []
      for (const myAgenceOp of agencesOpWithFilters) {
        console.log('agenceOp: ', myAgenceOp)
        const agenceOp: IAgenceOp = {
          id: myAgenceOp.id,
          agenceId: myAgenceOp.agenceId,
          opId: myAgenceOp.opId,
          pointId: myAgenceOp.pointId,
          agence: myAgenceOp.agence,
          op: myAgenceOp.op as IOp,
          point: myAgenceOp.point as IPoint,
        }
        agenceOps.push(agenceOp)
      }
      return agenceOps
    } catch (error) {
      throw new ForbiddenException(error)
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async getOpsFromAgenceFinancier(agenceId: number) {
    return this.prismaService.agenceOp.findMany({
      include: {
        op: {
          include: {},
        },
        agence: {
          include: {
            societe: {
              include: {
                formeJuridique: {},
                typeSociete: {},
              },
            },
          },
        },
      },
      where: {
        agenceId: agenceId,
      },
    })
  }

  async getOne(agenceOpId: number) {
    const agenceOp = await this.prismaService.agenceOp.findUnique({
      where: { id: agenceOpId },
    })
    if (!agenceOp) throw new NotFoundException('Post not found')
    return agenceOp
  }
  async create(createAgenceOpDto: CreateAgenceOpDto) {
    const { agenceId, opId, pointId } = createAgenceOpDto
    await this.prismaService.agenceOp.create({
      data: { agenceId, opId, pointId },
    })
    return { data: 'AgenceOp created' }
  }

  async update(agenceOpId: number, updateAgenceOpDto: UpdateAgenceOpDto) {
    const agenceOp = await this.prismaService.agenceOp.findUnique({
      where: { id: agenceOpId },
    })
    if (!agenceOp) throw new NotFoundException('AgenceOp not found')
    await this.prismaService.agenceOp.update({
      where: { id: agenceOpId },
      data: { ...updateAgenceOpDto },
    })
    return { data: 'AgenceOp updeted!' }
  }

  async delete(agenceOpId: number) {
    const agenceOp = await this.prismaService.agenceOp.findUnique({
      where: { id: agenceOpId },
    })
    if (!agenceOp) throw new NotFoundException('Post not found')
    await this.prismaService.agenceOp.delete({
      where: { id: agenceOpId },
    })
    return { data: 'AgenceOp deleted' }
  }
}
