import { Module } from '@nestjs/common'
import { ActiviteController } from './activite.controller'
import { ActiviteService } from './activite.service'

@Module({
  controllers: [ActiviteController],
  providers: [ActiviteService],
})
export class ActiviteModule {}
