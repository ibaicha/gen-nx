import { IsNotEmpty } from 'class-validator'

export class CreateAgenceDto {
  @IsNotEmpty()
  readonly name!: string
  readonly sigle!: string
  readonly email!: string
  readonly adresse!: string
  readonly telephone!: string

  readonly latitude!: number
  readonly longitude!: number
  readonly prenomContact!: string
  readonly nomContact!: string
  readonly emailContact!: string
  readonly telephoneContact!: string

  @IsNotEmpty()
  societeId!: number
}

export class UpdateAgenceDto {
  @IsNotEmpty()
  readonly name!: string
  readonly sigle!: string
  readonly email!: string
  readonly adresse!: string
  readonly telephone!: string

  readonly latitude!: number
  readonly longitude!: number
  readonly prenomContact!: string
  readonly nomContact!: string
  readonly emailContact!: string
  readonly telephoneContact!: string
  @IsNotEmpty()
  societeId!: number
}
