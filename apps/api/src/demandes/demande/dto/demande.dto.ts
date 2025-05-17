import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateDemandeDto {
  @IsNotEmpty()
  readonly date!: Date
  @IsNotEmpty()
  readonly anneeId!: number
  @IsNotEmpty()
  readonly saisonId!: number
  @IsNotEmpty()
  readonly activiteId!: number
  @IsNotEmpty()
  readonly pointId!: number
  readonly producteurId!: number
  readonly opId!: number
}

export class UpdateDemandeDto {
  @IsNotEmpty()
  readonly date!: Date
  @IsNotEmpty()
  readonly anneeId!: number
  @IsNotEmpty()
  readonly saisonId!: number
  @IsNotEmpty()
  readonly activiteId!: number
  @IsNotEmpty()
  readonly pointId!: number
  readonly producteurId!: number
  readonly opId!: number
}

export class GetDemandeParamsDTO {
  @IsOptional()
  pointId?: number

  @IsOptional()
  producteurId?: number

  @IsOptional()
  opId?: number

  @IsOptional()
  activiteId?: number
}

export interface IDemande {
  id: number
  date: Date
  activiteId: number
  activiteName: string
  anneeId: number
  anneeName: string
  saisonId: number
  saisonName: string
  pointId: number
  pointName: string
  producteurId?: number
  producteurPrenom: string
  producteurNom: string
  opId: number
  opName: string
  demandeDetails: IDemandeDetail[]
}
export interface IDemandeDetail {
  id: number
  demandeId: number
  pu: number
  quantiteDemandee: number
  quantiteLivree: number
  quantiteRecue: number
  valeurDemandee: number
  valeurLivree: number
  valeurRecue: number
  unite: string
  observation: string
  reference: string
  varianteId: number
  varianteName: string
  varianteConditionnement: string
}
