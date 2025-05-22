 
import {
  CreateFormeJuridiqueDto,
  FormeJuridiqueDto,
} from '../dtos/forme_juridique.dto'
 


export class FormeJuridiqueMapper {
  static toDto(formeJuridique: any): FormeJuridiqueDto {
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
