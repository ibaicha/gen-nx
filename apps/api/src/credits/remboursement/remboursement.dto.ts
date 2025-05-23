import { IsNotEmpty } from 'class-validator'

export class CreateRemboursementDto {
  @IsNotEmpty()
  readonly date!: Date
  readonly pu!: number
  @IsNotEmpty()
  readonly nombre_unite!: number
  @IsNotEmpty()
  readonly nombre_emballage!: number
  @IsNotEmpty()
  readonly valeur!: number
  @IsNotEmpty()
  readonly typeRemboursementId!: number
  @IsNotEmpty()
  readonly creditId!: number
  @IsNotEmpty()
  readonly emballageId!: number
  @IsNotEmpty()
  readonly emplacementId!: number
}

export class UpdateRemboursementDto {
  @IsNotEmpty()
  readonly date!: Date
  readonly pu!: number
  @IsNotEmpty()
  readonly nombre_unite!: number
  @IsNotEmpty()
  readonly nombre_emballage!: number
  @IsNotEmpty()
  readonly valeur!: number
  @IsNotEmpty()
  readonly typeRemboursementId!: number
  @IsNotEmpty()
  readonly creditId!: number
  @IsNotEmpty()
  readonly emballageId!: number
  @IsNotEmpty()
  readonly emplacementId!: number
}
