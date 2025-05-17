import { ForbiddenException, Injectable } from '@nestjs/common'
import {
  CreateFormeJuridiqueDto,
  FormeJuridiqueMapper,
  UpdateFormeJuridiqueDto,
} from '@shared-models'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class FormeJuridiqueService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFormeJuridiqueDto) {
    const data = FormeJuridiqueMapper.toEntity(dto)
    const created = await this.prisma.formeJuridique.create({ data })
    return FormeJuridiqueMapper.toDto(created)
  }

  async findAll() {
    const list = await this.prisma.formeJuridique.findMany()
    return list.map(FormeJuridiqueMapper.toDto)
  }

  async findOne(id: number) {
    const formeJuridique = await this.prisma.formeJuridique.findUnique({
      where: { id },
    })
    return formeJuridique ? FormeJuridiqueMapper.toDto(formeJuridique) : null
  }

  async update(id: number, dto: UpdateFormeJuridiqueDto) {
    const data = FormeJuridiqueMapper.toEntity(dto)
    const updated = await this.prisma.formeJuridique.update({
      where: { id },
      data,
    })
    return FormeJuridiqueMapper.toDto(updated)
  }

  async remove(id: number) {
    await this.prisma.formeJuridique.delete({ where: { id } })
    return { deleted: true }
  }
}

/*
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFormeJuridiqueDto, UpdateFormeJuridiqueDto } from '@shared-models';

@Injectable()
export class FormeJuridiqueService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.formeJuridique.findMany();
  }

  async getOne(formeJuridiqueId: number) {
    const formeJuridique = await this.prismaService.formeJuridique.findUnique({
      where: { id: formeJuridiqueId },
    });
    if (!formeJuridique) throw new NotFoundException('Post not found');
    return formeJuridique;
  }
  async create(createFormeJuridiqueDto: CreateFormeJuridiqueDto) {
    const { name } = createFormeJuridiqueDto;
    await this.prismaService.formeJuridique.create({ data: { name } });
    return { data: 'FormeJuridique created' };
  }



  
  async update(
    formeJuridiqueId: number,
    updateFormeJuridiqueDto: UpdateFormeJuridiqueDto,
  ) {
    const formeJuridique = await this.prismaService.formeJuridique.findUnique({
      where: { id: formeJuridiqueId },
    });
    if (!formeJuridique)
      throw new NotFoundException('FormeJuridique not found');
    await this.prismaService.formeJuridique.update({
      where: { id: formeJuridiqueId },
      data: { ...updateFormeJuridiqueDto },
    });
    return { data: 'FormeJuridique updeted!' };
  }

  async delete(formeJuridiqueId: number) {
    const formeJuridique = await this.prismaService.formeJuridique.findUnique({
      where: { id: formeJuridiqueId },
    });
    if (!formeJuridique) throw new NotFoundException('Post not found');
    await this.prismaService.formeJuridique.delete({
      where: { id: formeJuridiqueId },
    });
    return { data: 'FormeJuridique deleted' };
  }
}
*/
