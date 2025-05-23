import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  CreateUniteTransformationDto,
  UpdateUniteTransformationDto,
} from './unite_transformation.dto'

@Injectable()
export class UniteTansformationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.uniteTransformation.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  }

  async getOne(uniteTransformationId: number) {
    const uniteTransformation =
      await this.prismaService.uniteTransformation.findUnique({
        where: { id: uniteTransformationId },
      })
    if (!uniteTransformation) throw new NotFoundException('Post not found')
    return uniteTransformation
  }
  async create(createUniteTransformationDto: CreateUniteTransformationDto) {
    const { name, pointId } = createUniteTransformationDto
    await this.prismaService.uniteTransformation.create({
      data: { name, pointId },
    })
    return { data: 'UniteTransformation created' }
  }

  async update(
    uniteTransformationId: number,
    updateUniteTransformationDto: UpdateUniteTransformationDto,
  ) {
    const uniteTransformation =
      await this.prismaService.uniteTransformation.findUnique({
        where: { id: uniteTransformationId },
      })
    if (!uniteTransformation)
      throw new NotFoundException('UniteTransformation not found')
    await this.prismaService.uniteTransformation.update({
      where: { id: uniteTransformationId },
      data: { ...updateUniteTransformationDto },
    })
    return { data: 'UniteTransformation updeted!' }
  }

  async delete(uniteTransformationId: number) {
    const uniteTransformation =
      await this.prismaService.uniteTransformation.findUnique({
        where: { id: uniteTransformationId },
      })
    if (!uniteTransformation) throw new NotFoundException('Post not found')
    await this.prismaService.uniteTransformation.delete({
      where: { id: uniteTransformationId },
    })
    return { data: 'UniteTransformation deleted' }
  }
}
