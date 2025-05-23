import { IsNotEmpty } from 'class-validator'

export class CreateRemboursementAgenceDto {
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
  readonly creditAgenceId!: number
  @IsNotEmpty()
  readonly emballageId!: number
  @IsNotEmpty()
  emplacementId!: number
  @IsNotEmpty()
  readonly exploitationId!: number
}

export class UpdateRemboursementAgenceDto {
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
  readonly creditAgenceId!: number
  @IsNotEmpty()
  readonly emballageId!: number
  @IsNotEmpty()
  readonly emplacementId!: number
  @IsNotEmpty()
  readonly exploitationId!: number
}
