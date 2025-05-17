import { Module } from '@nestjs/common';
import { PointActiviteController } from './point_activite.controller';
import { PointActiviteService } from './point_activite.service';

@Module({
  controllers: [PointActiviteController],
  providers: [PointActiviteService],
})
export class PointActiviteModule {}
