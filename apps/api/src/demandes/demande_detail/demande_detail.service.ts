import { Injectable, NotFoundException } from '@nestjs/common'

import {
  CreateDemandeDetailDto,
  UpdateDemandeDetailDto,
} from './dto/demande_detail.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class DemandeDetailService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.demandeDetail.findMany({
      include: {
        pointService: {
          include: {},
        },
        demande: {
          include: {},
        },
      },
    })
  }

  async getOne(demandeDetailId: number) {
    const demandeDetail = await this.prismaService.demandeDetail.findUnique({
      where: { id: demandeDetailId },
    })
    if (!demandeDetail) throw new NotFoundException('Post not found')
    return demandeDetail
  }
  async create(createDemandeDetailDto: CreateDemandeDetailDto) {
    const {
      pu,
      unite,
      observation,
      quantiteDemandee,
      quantiteLivree,
      quantiteRecue,
      valeurDemandee,
      valeurLivree,
      valeurRecue,
      pointServiceId,
      demandeId,
    } = createDemandeDetailDto
    const demandeDetail = await this.prismaService.demandeDetail.create({
      data: {
        pu,
        unite,
        observation,
        quantiteDemandee,
        quantiteLivree,
        quantiteRecue,
        valeurDemandee,
        valeurLivree,
        valeurRecue,
        pointServiceId,
        demandeId,
      },
    })
    // Retourner l'ID de la demande créée
    return { data: 'DemandeDetail created', id: demandeDetail.id }
  }

  async update(
    demandeDetailId: number,
    updateDemandeDetailDto: UpdateDemandeDetailDto,
  ) {
    const demandeDetail = await this.prismaService.demandeDetail.findUnique({
      where: { id: demandeDetailId },
    })
    if (!demandeDetail) throw new NotFoundException('DemandeDetail not found')
    await this.prismaService.demandeDetail.update({
      where: { id: demandeDetailId },
      data: { ...updateDemandeDetailDto },
    })
    return { data: 'DemandeDetail updeted!' }
  }

  async delete(demandeDetailId: number) {
    const demandeDetail = await this.prismaService.demandeDetail.findUnique({
      where: { id: demandeDetailId },
    })
    if (!demandeDetail) throw new NotFoundException('Post not found')
    await this.prismaService.demandeDetail.delete({
      where: { id: demandeDetailId },
    })
    return { data: 'DemandeDetail deleted' }
  }
}
