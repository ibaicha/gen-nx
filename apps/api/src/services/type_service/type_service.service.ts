import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTypeServiceDto,
  UpdateTypeServiceDto,
} from './dto/type_service.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TypeServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.typeService.findMany({
      select: {
        id: true,
        name: true,
        familleTypeService: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(typeServiceId: number) {
    const typeService = await this.prismaService.typeService.findUnique({
      where: { id: typeServiceId },
    });
    if (!typeService) throw new NotFoundException('Post not found');
    return typeService;
  }
  async create(createTypeServiceDto: CreateTypeServiceDto) {
    const { name, familleTypeServiceId } = createTypeServiceDto;
    await this.prismaService.typeService.create({
      data: { name, familleTypeServiceId },
    });
    return { data: 'TypeService created' };
  }

  async update(
    typeServiceId: number,
    updateTypeServiceDto: UpdateTypeServiceDto,
  ) {
    const typeService = await this.prismaService.typeService.findUnique({
      where: { id: typeServiceId },
    });
    if (!typeService) throw new NotFoundException('TypeService not found');
    await this.prismaService.typeService.update({
      where: { id: typeServiceId },
      data: { ...updateTypeServiceDto },
    });
    return { data: 'TypeService updeted!' };
  }

  async delete(typeServiceId: number) {
    const typeService = await this.prismaService.typeService.findUnique({
      where: { id: typeServiceId },
    });
    if (!typeService) throw new NotFoundException('Post not found');
    await this.prismaService.typeService.delete({
      where: { id: typeServiceId },
    });
    return { data: 'TypeService deleted' };
  }
}
