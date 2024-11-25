import { IsNotEmpty } from "class-validator";

export class CreateTypeMouvementStockDto {
    @IsNotEmpty()
  readonly name!: string;
}



export class UpdateTypeMouvementStockDto {
  @IsNotEmpty()
  readonly name!: string;
}
