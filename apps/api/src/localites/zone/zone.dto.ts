import { IsNotEmpty } from 'class-validator'

export class CreateZoneDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly paysId!: number
}
export class UpdateZoneDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly paysId!: number
}
