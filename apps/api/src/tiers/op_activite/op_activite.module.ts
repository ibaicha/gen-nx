import { Module } from '@nestjs/common'
import { OpActiviteController } from './op_activite.controller'
import { OpActiviteService } from './op_activite.service'

@Module({
  controllers: [OpActiviteController],
  providers: [OpActiviteService],
})
export class OpActiviteModule {}
