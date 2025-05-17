import { Module } from '@nestjs/common'
import { RemboursementAgenceController } from './remboursement_agence.controller'
import { RemboursementAgenceService } from './remboursement_agence.service'

@Module({
  controllers: [RemboursementAgenceController],
  providers: [RemboursementAgenceService],
})
export class RemboursementAgenceModule {}
