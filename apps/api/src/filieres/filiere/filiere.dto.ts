import { IsNotEmpty } from 'class-validator'

export class CreateFiliereDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly activiteId!: number
}
export class UpdateFiliereDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly activiteId!: number
}
