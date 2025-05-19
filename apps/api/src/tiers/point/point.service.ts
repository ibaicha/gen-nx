import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePointDto, UpdatePointDto } from './dto/point.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class PointService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.point.findMany({
      select: {
        id: true,
        name: true,
        adresse: true,
        telephone: true,
        email: true,
        latitude: true,
        longitude: true,
        isActive: true,
        isService: true,
        isCollecte: true,
        isTransformation: true,
        isProduit: true,
        isIntrant: true,
        isVirtuel: true,

        societe: {
          include: {},
        },
        localite: {
          include: {
            sousZone: {
              include: {
                zone: {
                  include: {
                    pays: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }
  async getOne(PointId: number) {
    const Point = await this.prismaService.point.findUnique({
      where: { id: PointId },
    })
    if (!Point) throw new NotFoundException('Post not found')
    return Point
  }
  async create(createPointDto: CreatePointDto) {
    const {
      name,
      adresse,
      telephone,
      email,
      latitude,
      longitude,
      isActive,
      isService,
      isCollecte,
      isTransformation,
      isProduit,
      isIntrant,
      isVirtuel,
      localiteId,
      societeId,
    } = createPointDto
    await this.prismaService.point.create({
      data: {
        name,
        adresse,
        telephone,
        email,
        latitude,
        longitude,
        isActive,
        isService,
        isCollecte,
        isTransformation,
        isProduit,
        isIntrant,
        isVirtuel,
        localiteId,
        societeId,
      },
    })
    return { data: 'Point created' }
  }

  async update(PointId: number, updatePointDto: UpdatePointDto) {
    const Point = await this.prismaService.point.findUnique({
      where: { id: PointId },
    })
    if (!Point) throw new NotFoundException('Point not found')
    await this.prismaService.point.update({
      where: { id: PointId },
      data: { ...updatePointDto },
    })
    return { data: 'Point updeted!' }
  }

  async delete(PointId: number) {
    const Point = await this.prismaService.point.findUnique({
      where: { id: PointId },
    })
    if (!Point) throw new NotFoundException('Post not found')
    await this.prismaService.point.delete({
      where: { id: PointId },
    })
    return { data: 'Point deleted' }
  }
}
