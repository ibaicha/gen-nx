import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateProducteurDto, UpdateProducteurDto } from './dto/producteur.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ProducteurService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.producteur.findMany({
      select: {
        id: true,
        prenom: true,
        nom: true,
        cni: true,
        email: true,
        telephone: true,
        adresse: true,
        latitude: true,
        longitude: true,
        isActive: true,
        localite: {
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
          },
        },
      },
    })
  }

  async getOne(producteurId: number) {
    const producteur = await this.prismaService.producteur.findUnique({
      where: { id: producteurId },
    })
    if (!producteur) throw new NotFoundException('Post not found')
    return producteur
  }
  async create(createProducteurDto: CreateProducteurDto) {
    const {
      compte,
      prenom,
      nom,
      cni,
      email,
      telephone,
      adresse,
      latitude,
      longitude,
      isActive,
      genreId,
      localiteId,
    } = createProducteurDto
    await this.prismaService.producteur.create({
      data: {
        compte,
        prenom,
        nom,
        cni,
        email,
        telephone,
        adresse,
        latitude,
        longitude,
        isActive,
        genreId,
        localiteId,
      },
    })
    return { data: 'Producteur created' }
  }

  async update(producteurId: number, updateProducteurDto: UpdateProducteurDto) {
    const producteur = await this.prismaService.producteur.findUnique({
      where: { id: producteurId },
    })
    if (!producteur) throw new NotFoundException('Producteur not found')
    await this.prismaService.producteur.update({
      where: { id: producteurId },
      data: { ...updateProducteurDto },
    })
    return { data: 'Producteur updeted!' }
  }

  async delete(producteurId: number) {
    const producteur = await this.prismaService.producteur.findUnique({
      where: { id: producteurId },
    })
    if (!producteur) throw new NotFoundException('Post not found')
    await this.prismaService.producteur.delete({
      where: { id: producteurId },
    })
    return { data: 'Producteur deleted' }
  }
}
