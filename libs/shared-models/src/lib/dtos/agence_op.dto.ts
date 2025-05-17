import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAgenceOpDto {
  @IsNotEmpty()
  @IsNumber()
  agenceId!: number

  @IsNotEmpty()
  @IsNumber()
  opId!: number

  @IsOptional()
  @IsNumber()
  pointId?: number
}

export class UpdateAgenceOpDto {
  @IsOptional()
  @IsNumber()
  agenceId?: number

  @IsOptional()
  @IsNumber()
  opId?: number

  @IsOptional()
  @IsNumber()
  pointId?: number
}

export class AgenceOpDto {
  id!: number
  agenceId!: number
  opId!: number
  pointId?: number
}

export class GetAgenceOpParamsDTO {
  agenceId?: number[]
  opId?: number[]
  pointId?: number[]
  page?: number // Ajout du champ page
  limit?: number // Ajout du champ limit
}
