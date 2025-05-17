import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateSocieteOpDto, UpdateSocieteOpDto } from '@shared-models'


@Injectable()
export class SocieteOpService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.societeOp.findMany({
      include: {
        societe: {
          include: {
            formeJuridique: {},
            typeSociete: {},
          },
        },
        op: {
          include: {},
        },
      },
    })
  }

  async getCustomAll() {
    return this.prismaService.societeOp.findMany({
      include: {
        societe: {
          include: {
            formeJuridique: {},
            typeSociete: {},
          },
        },
        op: {
          include: {},
        },
      },
    })
  }

  async getOpsFromSocieteFinancier(societeId: number) {
    return this.prismaService.societeOp.findMany({
      include: {
        societe: {
          include: {
            formeJuridique: {},
            typeSociete: {},
          },
        },
        op: {
          include: {},
        },
      },
      where: {
        societeId: societeId,
      },
    })
  }

  async getOne(societeOpId: number) {
    const societeOp = await this.prismaService.societeOp.findUnique({
      where: { id: societeOpId },
    })
    if (!societeOp) throw new NotFoundException('Post not found')
    return societeOp
  }
  async create(createSocieteOpDto: CreateSocieteOpDto) {
    const { compte, numRegistre, ninea, societeId, opId } = createSocieteOpDto
    await this.prismaService.societeOp.create({
      data: { compte, numRegistre, ninea, societeId, opId },
    })
    return { data: 'SocieteOp created' }
  }

  async update(societeOpId: number, updateSocieteOpDto: UpdateSocieteOpDto) {
    const societeOp = await this.prismaService.societeOp.findUnique({
      where: { id: societeOpId },
    })
    if (!societeOp) throw new NotFoundException('SocieteOp not found')
    await this.prismaService.societeOp.update({
      where: { id: societeOpId },
      data: { ...updateSocieteOpDto },
    })
    return { data: 'SocieteOp updeted!' }
  }

  async delete(societeOpId: number) {
    const societeOp = await this.prismaService.societeOp.findUnique({
      where: { id: societeOpId },
    })
    if (!societeOp) throw new NotFoundException('Post not found')
    await this.prismaService.societeOp.delete({
      where: { id: societeOpId },
    })
    return { data: 'SocieteOp deleted' }
  }
}
