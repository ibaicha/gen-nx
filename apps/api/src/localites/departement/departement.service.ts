import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateDepartementDto,
  UpdateDepartementDto,
} from './dto/departement.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class DepartementService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.departement.findMany({
      select: {
        id: true,
        name: true,
        region: {
          include: {
            pays: {
              include: {},
            },
          },
        },
      },
    })
  }

  async getOne(departementId: number) {
    const departement = await this.prismaService.departement.findUnique({
      where: { id: departementId },
    })
    if (!departement) throw new NotFoundException('Post not found')
    return departement
  }
  async create(createDepartementDto: CreateDepartementDto) {
    const { name, regionId } = createDepartementDto
    await this.prismaService.departement.create({ data: { name, regionId } })
    return { data: 'Departement created' }
  }

  async update(
    departementId: number,
    updateDepartementDto: UpdateDepartementDto,
  ) {
    const departement = await this.prismaService.departement.findUnique({
      where: { id: departementId },
    })
    if (!departement) throw new NotFoundException('Departement not found')
    await this.prismaService.departement.update({
      where: { id: departementId },
      data: { ...updateDepartementDto },
    })
    return { data: 'Departement updeted!' }
  }

  async delete(departementId: number) {
    const departement = await this.prismaService.departement.findUnique({
      where: { id: departementId },
    })
    if (!departement) throw new NotFoundException('Post not found')
    await this.prismaService.departement.delete({
      where: { id: departementId },
    })
    return { data: 'Departement deleted' }
  }
}
