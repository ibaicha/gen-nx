import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateCampagneDto, UpdateCampagneDto } from './campagne.dto'

@Injectable()
export class CampagneService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.campagne.findMany({
      include: {
        annee: true,
        saison: true,
      },
    })
  }

  async getOne(campagneId: number) {
    const campagne = await this.prismaService.campagne.findUnique({
      where: { id: campagneId },
    })
    if (!campagne) throw new NotFoundException('Post not found')
    return campagne
  }
  async create(createCampagneDto: CreateCampagneDto) {
    const { anneeId, saisonId } = createCampagneDto
    await this.prismaService.campagne.create({ data: { anneeId, saisonId } })
    return { data: 'Campagne created' }
  }

  async update(campagneId: number, updateCampagneDto: UpdateCampagneDto) {
    const campagne = await this.prismaService.campagne.findUnique({
      where: { id: campagneId },
    })
    if (!campagne) throw new NotFoundException('Campagne not found')
    await this.prismaService.campagne.update({
      where: { id: campagneId },
      data: { ...updateCampagneDto },
    })
    return { data: 'Campagne updeted!' }
  }

  async delete(campagneId: number) {
    const campagne = await this.prismaService.campagne.findUnique({
      where: { id: campagneId },
    })
    if (!campagne) throw new NotFoundException('Post not found')
    await this.prismaService.campagne.delete({ where: { id: campagneId } })
    return { data: 'Campagne deleted' }
  }
}
