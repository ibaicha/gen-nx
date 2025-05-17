import { IsNotEmpty } from 'class-validator'

export class CreateUniteTransformationDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly pointId!: number
}

export class UpdateUniteTransformationDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly pointId!: number
}
