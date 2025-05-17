import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateVarianteServiceDto,
  UpdateVarianteServiceDto,
} from './dto/variante_service.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VarianteServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.varianteService.findMany({
      select: {
        id: true,
        name: true,
        conditionnement: true,
        quantite: true,
        pu: true,
        valeur: true,
        isActive: true,
        isDefault: true,
        service: {
          select: {
            id: true,
            name: true,
          },
        },
        typeEmballage: {
          select: {
            id: true,
            name: true,
          },
        },
        uniteGrandeur: {
          select: {
            id: true,
            name: true,
          },
        },
        variete: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(varianteServiceId: number) {
    const varianteService = await this.prismaService.varianteService.findUnique(
      {
        where: { id: varianteServiceId },
      },
    );
    if (!varianteService) throw new NotFoundException('Post not found');
    return varianteService;
  }
  async create(createVarianteServiceDto: CreateVarianteServiceDto) {
    const {
      name,
      conditionnement,
      quantite,
      pu,
      valeur,
      isActive,
      isDefault,
      serviceId,
      typeEmballageId,
      uniteGrandeurId,
    } = createVarianteServiceDto;
    await this.prismaService.varianteService.create({
      data: {
        name,
        conditionnement,
        quantite,
        pu,
        valeur,
        isActive,
        isDefault,
        serviceId,
        typeEmballageId,
        uniteGrandeurId,
      },
    });
    return { data: 'VarianteService created' };
  }

  async update(
    varianteServiceId: number,
    updateVarianteServiceDto: UpdateVarianteServiceDto,
  ) {
    const varianteService = await this.prismaService.varianteService.findUnique(
      {
        where: { id: varianteServiceId },
      },
    );
    if (!varianteService)
      throw new NotFoundException('VarianteService not found');
    await this.prismaService.varianteService.update({
      where: { id: varianteServiceId },
      data: { ...updateVarianteServiceDto },
    });
    return { data: 'VarianteService updeted!' };
  }

  async delete(varianteServiceId: number) {
    const varianteService = await this.prismaService.varianteService.findUnique(
      {
        where: { id: varianteServiceId },
      },
    );
    if (!varianteService) throw new NotFoundException('Post not found');
    await this.prismaService.varianteService.delete({
      where: { id: varianteServiceId },
    });
    return { data: 'VarianteService deleted' };
  }
}
