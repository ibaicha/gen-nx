import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { CreateSocieteDto, UpdateSocieteDto } from '@shared-models'

@Injectable()
export class SocieteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.societe.findMany({
      select: {
        id: true,
        name: true,
        sigle: true,
        email: true,
        telephone: true,
        adresse: true,
        latitude: true,
        longitude: true,
        prenomContact: true,
        nomContact: true,
        emailContact: true,
        telephoneContact: true,
        typeSociete: {
          select: {
            id: true,
            name: true,
          },
        },
        formeJuridique: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  async getOne(societeId: number) {
    const societe = await this.prismaService.societe.findUnique({
      where: { id: societeId },
    })
    if (!societe) throw new NotFoundException('Post not found')
    return societe
  }
  async create(createSocieteDto: CreateSocieteDto) {
    const {
      name,
      sigle,
      email,
      telephone,
      adresse,
      latitude,
      longitude,
      prenomContact,
      nomContact,
      emailContact,
      telephoneContact,

      formeJuridiqueId,
      typeSocieteId,
    } = createSocieteDto
    await this.prismaService.societe.create({
      data: {
        name,
        sigle,
        email,
        telephone,
        adresse,
        latitude,
        longitude,
        prenomContact,
        nomContact,
        emailContact,
        telephoneContact,
        formeJuridiqueId,
        typeSocieteId,
      },
    })
    return { data: 'Societe created' }
  }

  async update(societeId: number, updateSocieteDto: UpdateSocieteDto) {
    const societe = await this.prismaService.societe.findUnique({
      where: { id: societeId },
    })
    if (!societe) throw new NotFoundException('Societe not found')
    await this.prismaService.societe.update({
      where: { id: societeId },
      data: { ...updateSocieteDto },
    })
    return { data: 'Societe updeted!' }
  }

  async delete(societeId: number) {
    const societe = await this.prismaService.societe.findUnique({
      where: { id: societeId },
    })
    if (!societe) throw new NotFoundException('Post not found')
    await this.prismaService.societe.delete({
      where: { id: societeId },
    })
    return { data: 'Societe deleted' }
  }
}
