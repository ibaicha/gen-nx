import { IsNotEmpty } from 'class-validator'

export class CreateProducteurActiviteDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly producteurId!: number
  @IsNotEmpty()
  readonly activiteId!: number
}

export class UpdateProducteurActiviteDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly producteurId!: number
  @IsNotEmpty()
  readonly activiteId!: number
}
