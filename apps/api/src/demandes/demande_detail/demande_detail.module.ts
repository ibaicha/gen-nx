import { Module } from '@nestjs/common';
import { DemandeDetailController } from './demande_detail.controller';
import { DemandeDetailService } from './demande_detail.service';

@Module({
  controllers: [DemandeDetailController],
  providers: [DemandeDetailService],
})
export class DemandeDetailModule {}
