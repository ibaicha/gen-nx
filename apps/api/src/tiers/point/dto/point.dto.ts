import { IsNotEmpty } from 'class-validator'

export class CreatePointDto {
  @IsNotEmpty()
  readonly name!: string
  readonly adresse!: string
  readonly telephone!: string
  readonly email!: string
  readonly latitude!: number
  readonly longitude!: number
  readonly isActive!: boolean
  readonly isService!: boolean
  readonly isCollecte!: boolean
  readonly isTransformation!: boolean
  readonly isProduit!: boolean
  readonly isIntrant!: boolean
  readonly isVirtuel!: boolean

  @IsNotEmpty()
  localiteId!: number
  @IsNotEmpty()
  societeId!: number
}

export class UpdatePointDto {
  @IsNotEmpty()
  readonly name!: string
  readonly adresse!: string
  readonly telephone!: string
  readonly email!: string
  readonly latitude!: number
  readonly longitude!: number
  readonly isActive!: boolean
  readonly isService!: boolean
  readonly isCollecte!: boolean
  readonly isTransformation!: boolean
  readonly isProduit!: boolean
  readonly isIntrant!: boolean
  readonly isVirtuel!: boolean

  @IsNotEmpty()
  localiteId!: number
  @IsNotEmpty()
  societeId!: number
}
