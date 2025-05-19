import { IsNotEmpty } from 'class-validator'

export class CreateVarianteServiceDto {
  @IsNotEmpty()
  readonly name!: string
  readonly conditionnement!: string
  readonly quantite!: number
  readonly pu!: number
  readonly valeur!: number
  readonly isActive!: boolean
  readonly isDefault!: boolean

  @IsNotEmpty()
  readonly serviceId!: number
  @IsNotEmpty()
  readonly typeEmballageId!: number
  @IsNotEmpty()
  readonly uniteGrandeurId!: number
  readonly varieteId!: number
}

export class UpdateVarianteServiceDto {
  @IsNotEmpty()
  readonly name!: string
  readonly conditionnement!: string
  readonly quantite!: number
  readonly pu!: number
  readonly valeur!: number
  readonly isActive!: boolean
  readonly isDefault!: boolean

  @IsNotEmpty()
  readonly serviceId!: number
  @IsNotEmpty()
  readonly typeEmballageId!: number
  @IsNotEmpty()
  readonly uniteGrandeurId!: number
  readonly varieteId!: number
}
