import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator'

export class CreateOpDto {
  @IsString() name!: string
  @IsString() sigle!: string
  @IsEmail() email!: string
  @IsString() telephone!: string
  @IsString() adresse!: string

  @IsNumber() latitude!: number
  @IsNumber() longitude!: number

  @IsString() prenomContact!: string
  @IsString() nomContact!: string
  @IsEmail() emailContact!: string
  @IsString() telephoneContact!: string

  @IsOptional() @IsBoolean() isActive?: boolean
  @IsOptional() @IsNumber() formeJuridiqueId?: number
  @IsOptional() @IsNumber() localiteId?: number
  @IsOptional() @IsNumber() pointId?: number
}

export class UpdateOpDto {
  @IsOptional() @IsString() name?: string
  @IsOptional() @IsString() sigle?: string
  @IsOptional() @IsEmail() email?: string
  @IsOptional() @IsString() telephone?: string
  @IsOptional() @IsString() adresse?: string

  @IsOptional() @IsNumber() latitude?: number
  @IsOptional() @IsNumber() longitude?: number

  @IsOptional() @IsString() prenomContact?: string
  @IsOptional() @IsString() nomContact?: string
  @IsOptional() @IsEmail() emailContact?: string
  @IsOptional() @IsString() telephoneContact?: string

  @IsOptional() @IsBoolean() isActive?: boolean
  @IsOptional() @IsNumber() formeJuridiqueId?: number
  @IsOptional() @IsNumber() localiteId?: number
  @IsOptional() @IsNumber() pointId?: number
}

export class OpDto {
  id!: number
  name!: string
  sigle!: string
  email!: string
  telephone!: string
  adresse!: string
  latitude!: number
  longitude!: number
  prenomContact!: string
  nomContact!: string
  emailContact!: string
  telephoneContact!: string
  isActive!: boolean
  formeJuridiqueId?: number
  localiteId?: number
  pointId?: number
}

export class CreateOpPortefeuilleDto {
  @IsString() name!: string
  @IsString() sigle!: string
  @IsEmail() email!: string
  @IsString() telephone!: string
  @IsString() adresse!: string

  @IsNumber() latitude!: number
  @IsNumber() longitude!: number

  @IsString() prenomContact!: string
  @IsString() nomContact!: string
  @IsEmail() emailContact!: string
  @IsString() telephoneContact!: string

  @IsOptional() @IsBoolean() isActive?: boolean
  @IsOptional() @IsNumber() formeJuridiqueId?: number
  @IsOptional() @IsNumber() localiteId?: number
  @IsOptional() @IsNumber() pointId?: number

  @IsOptional() @IsNumber() agencePortefeuilleId?: number
  @IsOptional() @IsNumber() societePortefeuilleId?: number
  @IsOptional() @IsNumber() pointPortefeuilleId?: number
  @IsOptional() @IsString() compte?: string
  @IsOptional() @IsString() numRegistre?: string
  @IsOptional() @IsString() ninea?: string
}
export class OpPortefeuilleDto {
  id!: number
  name!: string
  sigle!: string
  email!: string
  telephone!: string
  adresse!: string
  latitude!: number
  longitude!: number
  prenomContact!: string
  nomContact!: string
  emailContact!: string
  telephoneContact!: string
  isActive!: boolean
  formeJuridiqueId?: number
  localiteId?: number
  pointId?: number
  agencePortefeuilleId!: number
  societePortefeuilleId!: number
  pointPortefeuilleId!: number
  compte!: string
  numRegistre!: string
  ninea!: string
}

export class GetOpParamsDTO {
  @IsOptional() opId?: number[]
  @IsOptional() formeJuridiqueId?: number[]
  @IsOptional() localiteId?: number[]
  @IsOptional() societeOpId?: number[]
  @IsOptional() agenceOpId?: number[]
  @IsOptional() pointId?: number[]
  @IsOptional() page?: number
  @IsOptional() limit?: number
}
/*

import { IsNotEmpty } from 'class-validator'
export class CreateOpDto {
  @IsNotEmpty()
  readonly name!: string
  readonly sigle!: string
  readonly email!: string
  readonly telephone!: string
  readonly adresse!: string
  readonly latitude!: number
  readonly longitude!: number
  readonly prenomContact!: string
  readonly nomContact!: string
  readonly emailContact!: string
  readonly telephoneContact!: string
  readonly isActive!: boolean

  @IsNotEmpty()
  formeJuridiqueId!: number
  @IsNotEmpty()
  localiteId!: number
  @IsNotEmpty()
  pointId!: number
}

export class UpdateOpDto {
  @IsNotEmpty()
  readonly name!: string
  readonly sigle!: string
  readonly email!: string
  readonly telephone!: string
  readonly adresse!: string
  readonly latitude!: number
  readonly longitude!: number
  readonly prenomContact!: string
  readonly nomContact!: string
  readonly emailContact!: string
  readonly telephoneContact!: string
  readonly isActive!: boolean

  @IsNotEmpty()
  formeJuridiqueId!: number
  @IsNotEmpty()
  localiteId!: number
  @IsNotEmpty()
  pointId!: number
}


export class GetOpParamsDTO {
  opId?: number[]
  societeOpId?: number[]
  societeAgenceOpId?: number[]
  agenceOpId?: number[]
  pointId?: number[]
  formeJuridiqueId?: number[]
  localiteId?: number[]
  page?: number // Ajout du champ page
  limit?: number // Ajout du champ limit
}
*/
