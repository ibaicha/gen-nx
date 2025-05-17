import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateOpActiviteDto,
  UpdateOpActiviteDto,
} from './dto/op_activite.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OpActiviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.opActivite.findMany({
      select: {
        id: true,
        op: {
          include: {},
        },
        activite: {
          include: {},
        },
      },
    });
  }

  async getOne(opActiviteId: number) {
    const opActivite = await this.prismaService.opActivite.findUnique({
      where: { id: opActiviteId },
    });
    if (!opActivite) throw new NotFoundException('Post not found');
    return opActivite;
  }
  async create(createOpActiviteDto: CreateOpActiviteDto) {
    const { opId, activiteId } = createOpActiviteDto;
    await this.prismaService.opActivite.create({
      data: { opId, activiteId },
    });
    return { data: 'OpActivite created' };
  }

  async update(opActiviteId: number, updateOpActiviteDto: UpdateOpActiviteDto) {
    const opActivite = await this.prismaService.opActivite.findUnique({
      where: { id: opActiviteId },
    });
    if (!opActivite) throw new NotFoundException('OpActivite not found');
    await this.prismaService.opActivite.update({
      where: { id: opActiviteId },
      data: { ...updateOpActiviteDto },
    });
    return { data: 'OpActivite updeted!' };
  }

  async delete(opActiviteId: number) {
    const opActivite = await this.prismaService.opActivite.findUnique({
      where: { id: opActiviteId },
    });
    if (!opActivite) throw new NotFoundException('Post not found');
    await this.prismaService.opActivite.delete({
      where: { id: opActiviteId },
    });
    return { data: 'OpActivite deleted' };
  }
}
