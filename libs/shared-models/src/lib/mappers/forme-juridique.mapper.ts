 
import { IFormeJuridique } from '@shared-models'
import {
  CreateFormeJuridiqueDto,
  FormeJuridiqueDto,
} from '../dtos/forme_juridique.dto'
import { FormeJuridique } from '@prisma/client'

export class FormeJuridiqueMapper {
  static toDto(formeJuridique: IFormeJuridique):IFormeJuridique {
    const { id, name } = formeJuridique

    return {
      id,
      name,
    }
  }

  static toEntity(dto: Partial<CreateFormeJuridiqueDto>): any {
    const { name } = dto

    return {
      name,
    }
  }
}
