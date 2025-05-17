import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateSocieteOpDto {
  @IsString()
  @IsNotEmpty()
  compte!: string

  @IsString()
  @IsNotEmpty()
  numRegistre!: string

  @IsString()
  @IsNotEmpty()
  ninea!: string

  @IsNotEmpty()
  @IsNumber()
  societeId!: number

  @IsNotEmpty()
  @IsNumber()
  opId!: number
}

// === Update DTO ===

export class UpdateSocieteOpDto {
  @IsOptional()
  @IsString()
  compte?: string

  @IsOptional()
  @IsString()
  numRegistre?: string

  @IsOptional()
  @IsString()
  ninea?: string

  @IsOptional()
  @IsNumber()
  societeId?: number

  @IsOptional()
  @IsNumber()
  opId?: number
}

// === Read/Full DTO ===

export class SocieteOpDto {
  id!: number
  compte!: string
  numRegistre!: string
  ninea!: string

  societeId?: number
  opId?: number
}

/*
import { IsNotEmpty } from 'class-validator'

export class CreateSocieteOpDto {
  compte!: string
  numRegistre!: string
  ninea!: string
  @IsNotEmpty()
  readonly societeId!: number
  @IsNotEmpty()
  readonly opId!: number
}

export class UpdateSocieteOpDto {
  compte!: string
  numRegistre!: string
  ninea!: string
  @IsNotEmpty()
  readonly societeId!: number
  @IsNotEmpty()
  readonly opId!: number
}

export interface ISocieteOp {
  id: number
  societeId: number
  societeName: string
  compte: string
  numRegistre: string
  ninea: string
  opId: number
  opName: string
}
*/
