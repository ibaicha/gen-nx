import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.service.findMany({
      select: {
        id: true,
        name: true,
        typeService: {
          select: {
            id: true,
            name: true,
          },
        },
        activite: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(serviceId: number) {
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Post not found');
    return service;
  }
  async create(createServiceDto: CreateServiceDto) {
    const { name, typeServiceId } = createServiceDto;
    await this.prismaService.service.create({
      data: { name, typeServiceId, activiteId: 1 },
    });
    return { data: 'Service created' };
  }

  async update(serviceId: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');
    await this.prismaService.service.update({
      where: { id: serviceId },
      data: { ...updateServiceDto },
    });
    return { data: 'Service updeted!' };
  }

  async delete(serviceId: number) {
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Post not found');
    await this.prismaService.service.delete({
      where: { id: serviceId },
    });
    return { data: 'Service deleted' };
  }
}
