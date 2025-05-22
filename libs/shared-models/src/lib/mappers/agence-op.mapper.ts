import { AgenceOp } from '@prisma/client'
import { AgenceOpDto, CreateAgenceOpDto } from '../dtos/agence_op.dto'
 

export class AgenceOpMapper {
  static toDto(agenceOp: AgenceOp): AgenceOpDto {
    const { id, agenceId, opId, pointId } = agenceOp

    return {
      id,
      agenceId: agenceId ?? undefined,
      opId: opId ?? undefined,
      pointId: pointId ?? undefined,
    }
  }

  static toEntity(dto: Partial<CreateAgenceOpDto>): any {
    const { agenceId, opId, pointId } = dto

    return {
      agenceId: agenceId ?? undefined,
      opId: opId ?? undefined,
      pointId: pointId ?? undefined,
    }
  }
}
