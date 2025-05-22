 
import { CreditAgence } from '@prisma/client'
import {
  CreateCreditAgenceDto,
  CreditAgenceDto,
} from '../dtos/credit_agence.dto'
 
 
 

export class CreditAgenceMapper {
  static toDto(creditAgence: CreditAgence): CreditAgenceDto {
    const {
      id,
      date,
      capital,
      interet,
      moratoire,
      autres_engagements,
      varieteId,
      anneeId,
      saisonId,
      agenceOpId,
      agenceId,
      opId,
    } = creditAgence

    return {
      id,
      date,
      capital,
      interet,
      moratoire,
      autres_engagements,
      varieteId: varieteId ?? undefined,
      anneeId: anneeId ?? undefined,
      saisonId: saisonId ?? undefined,
      agenceOpId: agenceOpId ?? undefined,
      agenceId: agenceId ?? undefined,
      opId: opId ?? undefined,
    }
  }

  static toEntity(dto: Partial<CreateCreditAgenceDto>): any {
    const {
      date,
      capital,
      interet,
      moratoire,
      autres_engagements,
      varieteId,
      anneeId,
      saisonId,
      agenceOpId,
      agenceId,
      opId,
    } = dto

    return {
      date,
      capital,
      interet,
      moratoire,
      autres_engagements,
      varieteId: varieteId ?? undefined,
      anneeId: anneeId ?? undefined,
      saisonId: saisonId ?? undefined,
      agenceOpId: agenceOpId ?? undefined,
      agenceId: agenceId ?? undefined,
      opId: opId ?? undefined,
    }
  }
}
