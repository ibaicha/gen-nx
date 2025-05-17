import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  CreateTypeMouvementStockDto,
  UpdateTypeMouvementStockDto,
} from './type_mouvement_stock.dto'

@Injectable()
export class TypeMouvementStockService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.typeMouvementStock.findMany()
  }

  async getOne(typeMouvementStockId: number) {
    const typeMouvementStock =
      await this.prismaService.typeMouvementStock.findUnique({
        where: { id: typeMouvementStockId },
      })
    if (!typeMouvementStock) throw new NotFoundException('Post not found')
    return typeMouvementStock
  }
  async create(createTypeMouvementStockDto: CreateTypeMouvementStockDto) {
    const { name } = createTypeMouvementStockDto
    await this.prismaService.typeMouvementStock.create({ data: { name } })
    return { data: 'TypeMouvementStock created' }
  }

  async update(
    typeMouvementStockId: number,
    updateTypeMouvementStockDto: UpdateTypeMouvementStockDto,
  ) {
    const typeMouvementStock =
      await this.prismaService.typeMouvementStock.findUnique({
        where: { id: typeMouvementStockId },
      })
    if (!typeMouvementStock)
      throw new NotFoundException('TypeMouvementStock not found')
    await this.prismaService.typeMouvementStock.update({
      where: { id: typeMouvementStockId },
      data: { ...updateTypeMouvementStockDto },
    })
    return { data: 'TypeMouvementStock updeted!' }
  }

  async delete(typeMouvementStockId: number) {
    const typeMouvementStock =
      await this.prismaService.typeMouvementStock.findUnique({
        where: { id: typeMouvementStockId },
      })
    if (!typeMouvementStock) throw new NotFoundException('Post not found')
    await this.prismaService.typeMouvementStock.delete({
      where: { id: typeMouvementStockId },
    })
    return { data: 'TypeMouvementStock deleted' }
  }
}
