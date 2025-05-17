import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  CreateRemboursementAgenceDto,
  UpdateRemboursementAgenceDto,
} from './remboursement_agence.dto'

@Injectable()
export class RemboursementAgenceService {
  constructor(private readonly prismaService: PrismaService) {}

  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  async getAll() {
    return this.prismaService.remboursementAgence.findMany({
      include: {
        creditAgence: true,
        emballage: true,
        emplacement: true,
        Exploitation: true,
      },
    })
  }

  async getOne(remboursementAgenceId: number) {
    const remboursementAgence =
      await this.prismaService.remboursementAgence.findUnique({
        where: { id: remboursementAgenceId },
      })
    if (!remboursementAgence) throw new NotFoundException('Post not found')
    return remboursementAgence
  }

  async create(createRemboursementAgenceDto: CreateRemboursementAgenceDto) {
    const {
      date,
      pu,
      nombre_unite,
      nombre_emballage,
      valeur,
      typeRemboursementId,
      creditAgenceId,
      emballageId,
      exploitationId,
    } = createRemboursementAgenceDto
    await this.prismaService.remboursementAgence.create({
      data: {
        date,
        pu,
        nombre_unite,
        nombre_emballage,
        valeur,
        typeRemboursementId,
        creditAgenceId,
        emballageId,
        exploitationId,
      },
    })
    return { data: 'RemboursementAgence created' }
  }

  async update(
    remboursementAgenceId: number,
    updateRemboursementAgenceDto: UpdateRemboursementAgenceDto,
  ) {
    const remboursementAgence =
      await this.prismaService.remboursementAgence.findUnique({
        where: { id: remboursementAgenceId },
      })
    if (!remboursementAgence)
      throw new NotFoundException('RemboursementAgence not found')
    await this.prismaService.remboursementAgence.update({
      where: { id: remboursementAgenceId },
      data: { ...updateRemboursementAgenceDto },
    })
    return { data: 'RemboursementAgence updeted!' }
  }

  async delete(remboursementAgenceId: number) {
    const remboursementAgence =
      await this.prismaService.remboursementAgence.findUnique({
        where: { id: remboursementAgenceId },
      })
    if (!remboursementAgence) throw new NotFoundException('Post not found')
    await this.prismaService.remboursementAgence.delete({
      where: { id: remboursementAgenceId },
    })
    return { data: 'RemboursementAgence deleted' }
  }
}
