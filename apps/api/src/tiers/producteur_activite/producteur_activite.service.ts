import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateProducteurActiviteDto,
  UpdateProducteurActiviteDto,
} from './dto/producteur_activite.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ProducteurActiviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.producteurActivite.findMany({
      select: {
        id: true,
        producteur: {
          include: {},
        },
        activite: {
          include: {},
        },
      },
    })
  }

  async getOne(producteurActiviteId: number) {
    const producteurActivite =
      await this.prismaService.producteurActivite.findUnique({
        where: { id: producteurActiviteId },
      })
    if (!producteurActivite) throw new NotFoundException('Post not found')
    return producteurActivite
  }
  async create(createProducteurActiviteDto: CreateProducteurActiviteDto) {
    const { producteurId, activiteId } = createProducteurActiviteDto
    await this.prismaService.producteurActivite.create({
      data: { producteurId, activiteId },
    })
    return { data: 'ProducteurActivite created' }
  }

  async update(
    producteurActiviteId: number,
    updateProducteurActiviteDto: UpdateProducteurActiviteDto,
  ) {
    const producteurActivite =
      await this.prismaService.producteurActivite.findUnique({
        where: { id: producteurActiviteId },
      })
    if (!producteurActivite)
      throw new NotFoundException('ProducteurActivite not found')
    await this.prismaService.producteurActivite.update({
      where: { id: producteurActiviteId },
      data: { ...updateProducteurActiviteDto },
    })
    return { data: 'ProducteurActivite updeted!' }
  }

  async delete(producteurActiviteId: number) {
    const producteurActivite =
      await this.prismaService.producteurActivite.findUnique({
        where: { id: producteurActiviteId },
      })
    if (!producteurActivite) throw new NotFoundException('Post not found')
    await this.prismaService.producteurActivite.delete({
      where: { id: producteurActiviteId },
    })
    return { data: 'ProducteurActivite deleted' }
  }
}
