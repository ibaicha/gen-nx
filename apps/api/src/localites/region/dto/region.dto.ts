import { IsNotEmpty } from 'class-validator'

export class CreateRegionDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly paysId!: number
}

export class UpdateRegionDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly paysId!: number
}
