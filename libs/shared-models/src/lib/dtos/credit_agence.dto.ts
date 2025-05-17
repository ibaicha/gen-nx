import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCreditAgenceDto {
  @IsDateString() date!: string
  @IsNumber() capital!: number
  @IsNumber() interet!: number
  @IsNumber() moratoire!: number
  @IsNumber() autres_engagements!: number
  @IsOptional() @IsNumber() varieteId?: number
  @IsOptional() @IsNumber() anneeId?: number
  @IsOptional() @IsNumber() saisonId?: number
  @IsOptional() @IsNumber() agenceOpId?: number
  @IsOptional() @IsNumber() agenceId?: number
  @IsOptional() @IsNumber() opId?: number
}

export class UpdateCreditAgenceDto {
  @IsOptional() @IsDateString() date?: string
  @IsOptional() @IsNumber() capital?: number
  @IsOptional() @IsNumber() interet?: number
  @IsOptional() @IsNumber() moratoire?: number
  @IsOptional() @IsNumber() autres_engagements?: number
  @IsOptional() @IsNumber() varieteId?: number
  @IsOptional() @IsNumber() anneeId?: number
  @IsOptional() @IsNumber() saisonId?: number
  @IsOptional() @IsNumber() agenceOpId?: number
  @IsOptional() @IsNumber() agenceId?: number
  @IsOptional() @IsNumber() opId?: number
}

export class CreditAgenceDto {
  id!: number
  date!: Date
  capital!: number
  interet!: number
  moratoire!: number
  autres_engagements!: number
  varieteId?: number
  anneeId?: number
  saisonId?: number
  agenceOpId?: number
  agenceId?: number
  opId?: number
}


export class GetCreditAgenceParamsDTO {
  @IsOptional() creditAgenceId?: number[]
  @IsOptional() societeId?: number[]
  @IsOptional() agenceId?: number[]
  @IsOptional() agenceOpId?: number[]
  @IsOptional() pointId?: number[]
  @IsOptional() varieteId?: number[]
  @IsOptional() produitId?: number[]
  @IsOptional() anneeId?: number[]
  @IsOptional() saisonId?: number[]
  @IsOptional() opId?: number[]
  @IsOptional() page?: number // Ajout du champ page
  @IsOptional() limit?: number // Ajout du champ limit
}
/*
import { IsNotEmpty } from 'class-validator'

export class CreateCreditAgenceDto {
  @IsNotEmpty()
  readonly date!: Date
  @IsNotEmpty()
  readonly capital!: number
  @IsNotEmpty()
  readonly interet!: number
  @IsNotEmpty()
  readonly moratoire!: number
  @IsNotEmpty()
  readonly autres_engagements!: number

  @IsNotEmpty()
  readonly agenceOpId!: number
  @IsNotEmpty()
  readonly agenceId!: number
  @IsNotEmpty()
  readonly varieteId!: number
  @IsNotEmpty()
  readonly anneeId!: number
  @IsNotEmpty()
  readonly saisonId!: number
  @IsNotEmpty()
  readonly opId!: number
}

export class UpdateCreditAgenceDto {
  @IsNotEmpty()
  readonly date!: Date
  @IsNotEmpty()
  readonly capital!: number
  @IsNotEmpty()
  readonly interet!: number
  @IsNotEmpty()
  readonly moratoire!: number
  @IsNotEmpty()
  readonly autres_engagements!: number

  @IsNotEmpty()
  readonly agenceOpId!: number
  @IsNotEmpty()
  readonly agenceId!: number
  @IsNotEmpty()
  readonly varieteId!: number
  @IsNotEmpty()
  readonly anneeId!: number
  @IsNotEmpty()
  readonly saisonId!: number
  @IsNotEmpty()
  readonly opId!: number
}

export class CreateExploitationCreditAgenceDto {
  @IsNotEmpty()
  date!: Date
  @IsNotEmpty()
  capital!: number
  @IsNotEmpty()
  interet!: number
  @IsNotEmpty()
  moratoire!: number
  @IsNotEmpty()
  autres_engagements!: number
  @IsNotEmpty()
  exploitationId!: number


  compte!: number
  @IsNotEmpty()
  dateExploitation!: Date
  @IsNotEmpty()
  unite!: string
  @IsNotEmpty()
  surface!: number
  @IsNotEmpty()
  readonly agenceId!: number
  @IsNotEmpty()
  varieteId!: number
  @IsNotEmpty()
  anneeId!: number
  @IsNotEmpty()
  saisonId!: number
  producteurId!: number
  opId!: number
}

export class GetCreditAgenceParamsDTO {
  creditAgenceId?: number[]
  societeId?: number[]
  agenceId?: number[]
  agenceOpId?: number[]
  pointId?: number[]
  varieteId?: number[]
  produitId?: number[]
  anneeId?: number[]
  saisonId?: number[]
  opId?: number[]
  page?: number // Ajout du champ page
  limit?: number // Ajout du champ limit
}
*/
