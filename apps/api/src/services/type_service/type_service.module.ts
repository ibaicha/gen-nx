import { Module } from '@nestjs/common';
import { TypeServiceController } from './type_service.controller';
import { TypeServiceService } from './type_service.service';

@Module({
  controllers: [TypeServiceController],
  providers: [TypeServiceService],
})
export class TypeServiceModule {}
