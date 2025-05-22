import { SocieteOp } from '@prisma/client'
import { CreateSocieteOpDto, SocieteOpDto } from '../dtos/societe_op.dto'
 

export class SocieteOpMapper {
  static toDto(societeOp: SocieteOp): SocieteOpDto {
    const { id, compte, numRegistre, ninea, societeId, opId } = societeOp

    return {
      id,
      compte,
      numRegistre,
      ninea,
      societeId: societeId ?? undefined,
      opId: opId ?? undefined,
    }
  }

  static toEntity(dto: Partial<CreateSocieteOpDto>): any {
    const { compte, numRegistre, ninea, societeId, opId } = dto

    return {
      compte,
      numRegistre,
      ninea,
      societeId: societeId ?? undefined,
      opId: opId ?? undefined,
    }
  }
}
