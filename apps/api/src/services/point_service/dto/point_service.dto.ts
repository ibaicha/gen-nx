import { IsNotEmpty } from 'class-validator'

export class CreatePointServiceDto {
  @IsNotEmpty()
  readonly pu!: number
  readonly reference!: string
  readonly quantiteStock!: number
  @IsNotEmpty()
  readonly pointId!: number
  @IsNotEmpty()
  readonly varianteServiceId!: number
}

export class UpdatePointServiceDto {
  @IsNotEmpty()
  readonly pu!: number
  readonly reference!: string
  readonly quantiteStock!: number
  @IsNotEmpty()
  readonly pointId!: number
  @IsNotEmpty()
  readonly varianteServiceId!: number
}
