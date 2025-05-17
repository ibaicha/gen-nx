import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

export class CreateFormeJuridiqueDto {
  @IsString()
  @IsNotEmpty()
  name!: string
}

export class UpdateFormeJuridiqueDto {
  @IsString()
  @IsOptional()
  name?: string
}

export class FormeJuridiqueDto {
  @IsNumber()
  id!: number

  @IsString()
  name!: string
}
/*
import { IsNotEmpty } from 'class-validator'

export class CreateFormeJuridiqueDto {
  @IsNotEmpty()
  readonly name!: string
}

export class UpdateFormeJuridiqueDto {
  @IsNotEmpty()
  readonly name!: string
}

export interface IFormeJuridiique {
  id: number
  name: string
}
*/
