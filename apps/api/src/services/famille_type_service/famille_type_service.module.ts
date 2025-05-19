import { Module } from '@nestjs/common'
import { FamilleTypeServiceController } from './famille_type_service.controller'
import { FamilleTypeServiceService } from './famille_type_service.service'

@Module({
  controllers: [FamilleTypeServiceController],
  providers: [FamilleTypeServiceService],
})
export class FamilleTypeServiceModule {}
