import { IOp } from '@shared-models'
import { OpDto, CreateOpDto } from '../dtos/op.dto'

//mport { Op } from '@prisma/client'

export class OpMapper {
  static toDto(op: IOp): OpDto {
    const {
      id,
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
      isActive,
      formeJuridiqueId,
      localiteId,
      pointId,
    } = op

    return {
      id,
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
      isActive,
      formeJuridiqueId: formeJuridiqueId ?? undefined,
      localiteId: localiteId ?? undefined,
      pointId: pointId ?? undefined,
    }
  }

  static toEntity(dto: Partial<CreateOpDto>): any {
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
      isActive,
      formeJuridiqueId,
      localiteId,
      pointId,
    } = dto

    return {
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
      isActive,
      formeJuridiqueId,
      localiteId,
      pointId,
    }
  }
}
