import { IsNotEmpty } from 'class-validator'

export class CreateModeEntreeSortieIntrantDto {
  @IsNotEmpty()
  readonly code!: string
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly typeMouvementIntrantId!: number
}

export class UpdateModeEntreeSortieIntrantDto {
  @IsNotEmpty()
  readonly code!: string
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly typeMouvementIntrantId!: number
}
