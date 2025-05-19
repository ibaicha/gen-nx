//import { Localite } from "@prisma/client"
import { ILocalite } from "@shared-models"
import { CreateLocaliteDto, LocaliteDto } from "../dtos/localite.dto"



export class LocaliteMapper {
  static toDto(localite: ILocalite): LocaliteDto {
    const { id, name, sousZoneId, departementId } = localite

    return {
      id,
      name,
      sousZoneId: sousZoneId ?? undefined,
      departementId: departementId ?? undefined,
    }
  }

  static toEntity(dto: Partial<CreateLocaliteDto>): any {
    const { name, sousZoneId, departementId } = dto

    return {
      name,
      sousZoneId: sousZoneId ?? undefined,
      departementId: departementId ?? undefined,
    }
  }
}
