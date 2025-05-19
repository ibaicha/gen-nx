import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateFamilleTypeServiceDto,
  UpdateFamilleTypeServiceDto,
} from './dto/famille_type_service.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class FamilleTypeServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.familleTypeService.findMany({
      select: {
        id: true,
        name: true,
        activite: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  async getOne(familleTypeServiceId: number) {
    const familleTypeService =
      await this.prismaService.familleTypeService.findUnique({
        where: { id: familleTypeServiceId },
      })
    if (!familleTypeService) throw new NotFoundException('Post not found')
    return familleTypeService
  }
  async create(createFamilleTypeServiceDto: CreateFamilleTypeServiceDto) {
    const { name, activiteId } = createFamilleTypeServiceDto
    await this.prismaService.familleTypeService.create({
      data: { name, activiteId },
    })
    return { data: 'FamilleTypeService created' }
  }

  async update(
    familleTypeServiceId: number,
    updateFamilleTypeServiceDto: UpdateFamilleTypeServiceDto,
  ) {
    const familleTypeService =
      await this.prismaService.familleTypeService.findUnique({
        where: { id: familleTypeServiceId },
      })
    if (!familleTypeService)
      throw new NotFoundException('FamilleTypeService not found')
    await this.prismaService.familleTypeService.update({
      where: { id: familleTypeServiceId },
      data: { ...updateFamilleTypeServiceDto },
    })
    return { data: 'FamilleTypeService updeted!' }
  }

  async delete(familleTypeServiceId: number) {
    const familleTypeService =
      await this.prismaService.familleTypeService.findUnique({
        where: { id: familleTypeServiceId },
      })
    if (!familleTypeService) throw new NotFoundException('Post not found')
    await this.prismaService.familleTypeService.delete({
      where: { id: familleTypeServiceId },
    })
    return { data: 'FamilleTypeService deleted' }
  }
}
