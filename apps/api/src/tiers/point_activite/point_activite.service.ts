import { Injectable, NotFoundException } from '@nestjs/common'

import {
  CreatePointActiviteDto,
  UpdatePointActiviteDto,
} from './dto/point_activite.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class PointActiviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.pointActivite.findMany({
      select: {
        id: true,
        point: {
          include: {},
        },
        activite: {
          include: {},
        },
      },
    })
  }

  async getOne(pointActiviteId: number) {
    const pointActivite = await this.prismaService.pointActivite.findUnique({
      where: { id: pointActiviteId },
    })
    if (!pointActivite) throw new NotFoundException('Post not found')
    return pointActivite
  }
  async create(createPointActiviteDto: CreatePointActiviteDto) {
    const { pointId, activiteId } = createPointActiviteDto
    await this.prismaService.pointActivite.create({
      data: { pointId, activiteId },
    })
    return { data: 'PointActivite created' }
  }

  async update(
    pointActiviteId: number,
    updatePointActiviteDto: UpdatePointActiviteDto,
  ) {
    const pointActivite = await this.prismaService.pointActivite.findUnique({
      where: { id: pointActiviteId },
    })
    if (!pointActivite) throw new NotFoundException('PointActivite not found')
    await this.prismaService.pointActivite.update({
      where: { id: pointActiviteId },
      data: { ...updatePointActiviteDto },
    })
    return { data: 'PointActivite updeted!' }
  }

  async delete(pointActiviteId: number) {
    const pointActivite = await this.prismaService.pointActivite.findUnique({
      where: { id: pointActiviteId },
    })
    if (!pointActivite) throw new NotFoundException('Post not found')
    await this.prismaService.pointActivite.delete({
      where: { id: pointActiviteId },
    })
    return { data: 'PointActivite deleted' }
  }
}
