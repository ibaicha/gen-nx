import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActiviteDto, UpdateActiviteDto } from './dto/activite.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ActiviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.activite.findMany();
  }

  async getOne(activiteId: number) {
    const activite = await this.prismaService.activite.findUnique({
      where: { id: activiteId },
    });
    if (!activite) throw new NotFoundException('Post not found');
    return activite;
  }
  async create(createActiviteDto: CreateActiviteDto) {
    const { name } = createActiviteDto;
    await this.prismaService.activite.create({ data: { name } });
    return { data: 'Activite created' };
  }

  async update(activiteId: number, updateActiviteDto: UpdateActiviteDto) {
    const activite = await this.prismaService.activite.findUnique({
      where: { id: activiteId },
    });
    if (!activite) throw new NotFoundException('Activite not found');
    await this.prismaService.activite.update({
      where: { id: activiteId },
      data: { ...updateActiviteDto },
    });
    return { data: 'Activite updeted!' };
  }

  async delete(activiteId: number) {
    const activite = await this.prismaService.activite.findUnique({
      where: { id: activiteId },
    });
    if (!activite) throw new NotFoundException('Post not found');
    await this.prismaService.activite.delete({
      where: { id: activiteId },
    });
    return { data: 'Activite deleted' };
  }
}
