import { IsNotEmpty } from 'class-validator'

export class CreateUniteGrandeurDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly sigle!: string
  @IsNotEmpty()
  typeUniteGrandeurId!: number
}

export class UpdateUniteGrandeurDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly sigle!: string
  @IsNotEmpty()
  typeUniteGrandeurId!: number
}
