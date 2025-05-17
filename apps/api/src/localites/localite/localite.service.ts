import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import {
  CreateLocaliteDto,
  LocaliteMapper,
  UpdateLocaliteDto,
} from '@shared-models'

@Injectable()
export class LocaliteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLocaliteDto) {
    const entity = LocaliteMapper.toEntity(dto)
    const created = await this.prisma.localite.create({ data: entity })
    return LocaliteMapper.toDto(created)
  }

  async findAllMapper() {
    const all = await this.prisma.localite.findMany()
    return all.map(LocaliteMapper.toDto)
  }

  async findAll() {
    const all = await this.prisma.localite.findMany({
      include: {
        sousZone: true,
        departement: true,
      },
    })
    return all //.map(LocaliteMapper.toDto)
  }

  async findOne(id: number) {
    const found = await this.prisma.localite.findUnique({ where: { id } })
    return found ? LocaliteMapper.toDto(found) : null
  }

  async update(id: number, dto: UpdateLocaliteDto) {
    const updated = await this.prisma.localite.update({
      where: { id },
      data: LocaliteMapper.toEntity(dto),
    })
    return LocaliteMapper.toDto(updated)
  }

  async remove(id: number) {
    await this.prisma.localite.delete({ where: { id } })
  }
}

/*
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateLocaliteDto, UpdateLocaliteDto } from './localite.dto'

@Injectable()
export class LocaliteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.localite.findMany({
      include: {
        sousZone: {
          include: {
            zone: {
              include: {
                pays: true,
              },
            },
          },
        },
        departement: {
          include: {},
        },
      },
    })
  }

  async getOne(localiteId: number) {
    const localite = await this.prismaService.localite.findUnique({
      where: { id: localiteId },
    })
    if (!localite) throw new NotFoundException('Post not found')
    return localite
  }
  async create(createLocaliteDto: CreateLocaliteDto) {
    const { name, sousZoneId } = createLocaliteDto
    await this.prismaService.localite.create({ data: { name, sousZoneId } })
    return { data: 'Localite created' }
  }

  async update(localiteId: number, updateLocaliteDto: UpdateLocaliteDto) {
    const localite = await this.prismaService.localite.findUnique({
      where: { id: localiteId },
    })
    if (!localite) throw new NotFoundException('Localite not found')
    await this.prismaService.localite.update({
      where: { id: localiteId },
      data: { ...updateLocaliteDto },
    })
    return { data: 'Localite updeted!' }
  }

  async delete(localiteId: number) {
    const localite = await this.prismaService.localite.findUnique({
      where: { id: localiteId },
    })
    if (!localite) throw new NotFoundException('Post not found')
    await this.prismaService.localite.delete({ where: { id: localiteId } })
    return { data: 'Localite deleted' }
  }
}
*/
