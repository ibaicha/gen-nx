import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { CreateAnneeDto, UpdateAnneeDto } from '@shared-models'

@Injectable()
export class AnneeService {
  constructor(
    private readonly prismaService: PrismaService, //private eventsGateway: EventsGateway,
  ) {}

  async getAll() {
    return this.prismaService.annee.findMany()
  }

  async getOne(anneeId: number) {
    const annee = await this.prismaService.annee.findUnique({
      where: { id: anneeId },
    })
    if (!annee) throw new NotFoundException('Post not found')
    return annee
  }
  async create(createAnneeDto: CreateAnneeDto) {
    const { name, valeur } = createAnneeDto
    const annee = await this.prismaService.annee.create({
      data: { name, valeur },
    })
    //this.eventsGateway.notifyRecordAdded(annee);
    return { data: annee }
  }

  async update(anneeId: number, updateAnneeDto: UpdateAnneeDto) {
    const annee = await this.prismaService.annee.findUnique({
      where: { id: anneeId },
    })
    if (!annee) throw new NotFoundException('Annee not found')
    await this.prismaService.annee.update({
      where: { id: anneeId },
      data: { ...updateAnneeDto },
    })
    return { data: 'Annee updeted!' }
  }

  async delete(anneeId: number) {
    const annee = await this.prismaService.annee.findUnique({
      where: { id: anneeId },
    })
    if (!annee) throw new NotFoundException('Post not found')
    await this.prismaService.annee.delete({ where: { id: anneeId } })
    return { data: 'Annee deleted' }
  }
}
