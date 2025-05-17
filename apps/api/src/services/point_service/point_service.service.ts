import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreatePointServiceDto,
  UpdatePointServiceDto,
} from './dto/point_service.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class PointServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.pointService.findMany({
      include: {
        point: {
          include: {},
        },
        varianteService: {
          include: {},
        },
      },
    })
  }

  async getOne(pointServiceId: number) {
    const pointService = await this.prismaService.pointService.findUnique({
      where: { id: pointServiceId },
    })
    if (!pointService) throw new NotFoundException('Post not found')
    return pointService
  }
  async create(createPointServiceDto: CreatePointServiceDto) {
    const { pu, reference, quantiteStock, pointId, varianteServiceId } =
      createPointServiceDto
    await this.prismaService.pointService.create({
      data: { pu, reference, quantiteStock, pointId, varianteServiceId },
    })
    return { data: 'PointService created' }
  }

  async update(
    pointServiceId: number,
    updatePointServiceDto: UpdatePointServiceDto,
  ) {
    const pointService = await this.prismaService.pointService.findUnique({
      where: { id: pointServiceId },
    })
    if (!pointService) throw new NotFoundException('PointService not found')
    await this.prismaService.pointService.update({
      where: { id: pointServiceId },
      data: { ...updatePointServiceDto },
    })
    return { data: 'PointService updeted!' }
  }

  async delete(pointServiceId: number) {
    const pointService = await this.prismaService.pointService.findUnique({
      where: { id: pointServiceId },
    })
    if (!pointService) throw new NotFoundException('Post not found')
    await this.prismaService.pointService.delete({
      where: { id: pointServiceId },
    })
    return { data: 'PointService deleted' }
  }
}
