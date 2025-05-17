import { Module } from '@nestjs/common';
import { PointServiceController } from './point_service.controller';
import { PointServiceService } from './point_service.service';

@Module({
  controllers: [PointServiceController],
  providers: [PointServiceService],
})
export class PointServiceModule {}
