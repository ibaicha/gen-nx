import { Module } from '@nestjs/common'
import { VarianteServiceController } from './variante_service.controller'
import { VarianteServiceService } from './variante_service.service'

@Module({
  controllers: [VarianteServiceController],
  providers: [VarianteServiceService],
})
export class VarianteServiceModule {}
