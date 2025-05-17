import { IsNotEmpty } from 'class-validator'

export class CreateDemandeDetailDto {
  @IsNotEmpty()
  readonly pu!: number
  @IsNotEmpty()
  readonly unite!: string
  @IsNotEmpty()
  readonly observation!: string
  @IsNotEmpty()
  readonly quantiteDemandee!: number
  @IsNotEmpty()
  readonly quantiteLivree!: number
  @IsNotEmpty()
  readonly quantiteRecue!: number
  @IsNotEmpty()
  readonly valeurDemandee!: number
  @IsNotEmpty()
  readonly valeurLivree!: number
  @IsNotEmpty()
  readonly valeurRecue!: number
  @IsNotEmpty()
  readonly pointServiceId!: number
  @IsNotEmpty()
  readonly demandeId!: number
}

export class UpdateDemandeDetailDto {
  @IsNotEmpty()
  readonly pu!: number
  @IsNotEmpty()
  readonly unite!: string
  @IsNotEmpty()
  readonly observation!: string
  @IsNotEmpty()
  readonly quantiteDemandee!: number
  @IsNotEmpty()
  readonly quantiteLivree!: number
  @IsNotEmpty()
  readonly quantiteRecue!: number
  @IsNotEmpty()
  readonly valeurDemandee!: number
  @IsNotEmpty()
  readonly valeurLivree!: number
  @IsNotEmpty()
  readonly valeurRecue!: number
  @IsNotEmpty()
  readonly pointServiceId!: number
  @IsNotEmpty()
  readonly demandeId!: number
}
