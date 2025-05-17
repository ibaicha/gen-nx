import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateLocaliteDto {
  @IsString() name!: string
  @IsOptional() @IsNumber() sousZoneId?: number
  @IsOptional() @IsNumber() departementId?: number
}

export class UpdateLocaliteDto {
  @IsOptional() @IsString() name?: string
  @IsOptional() @IsNumber() sousZoneId?: number
  @IsOptional() @IsNumber() departementId?: number
}

export class LocaliteDto {
  id!: number
  name!: string
  sousZoneId?: number
  departementId?: number
}

/*
import { IsNotEmpty } from 'class-validator'

export class CreateLocaliteDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly sousZoneId!: number
}

export class UpdateLocaliteDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly sousZoneId!: number
}
*/
