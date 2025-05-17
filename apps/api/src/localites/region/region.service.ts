import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto, UpdateRegionDto } from './dto/region.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.region.findMany({
      select: {
        id: true,
        name: true,
        pays: {
          select: {
            id: true,
            name: true,
            sigle: true,
          },
        },
      },
    });
  }

  async getOne(regionId: number) {
    const region = await this.prismaService.region.findUnique({
      where: { id: regionId },
    });
    if (!region) throw new NotFoundException('Post not found');
    return region;
  }
  async create(createRegionDto: CreateRegionDto) {
    const { name, paysId } = createRegionDto;
    await this.prismaService.region.create({ data: { name, paysId } });
    return { data: 'Region created' };
  }

  async update(regionId: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.prismaService.region.findUnique({
      where: { id: regionId },
    });
    if (!region) throw new NotFoundException('Region not found');
    await this.prismaService.region.update({
      where: { id: regionId },
      data: { ...updateRegionDto },
    });
    return { data: 'Region updeted!' };
  }

  async delete(regionId: number) {
    const region = await this.prismaService.region.findUnique({
      where: { id: regionId },
    });
    if (!region) throw new NotFoundException('Post not found');
    await this.prismaService.region.delete({ where: { id: regionId } });
    return { data: 'Region deleted' };
  }
}
