import { IsNotEmpty } from 'class-validator'

export class CreateDepartementDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly regionId!: number
}

export class UpdateDepartementDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly regionId!: number
}
