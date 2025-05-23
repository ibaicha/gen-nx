import { Module } from '@nestjs/common'
import { PointController } from './point.controller'
import { PointService } from './point.service'

@Module({
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}
