import { IsNotEmpty } from 'class-validator'

export class CreateModeEntreeSortieStockDto {
  @IsNotEmpty()
  readonly code!: string
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly typeMouvementStockId!: number
}
export class UpdateModeEntreeSortieStockDto {
  @IsNotEmpty()
  readonly code!: string
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly typeMouvementStockId!: number
}
