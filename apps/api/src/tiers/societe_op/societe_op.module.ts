import { Module } from '@nestjs/common'
import { SocieteOpService } from './societe_op.service'
import { SocieteOpController } from './societe_op.controller'

@Module({
  controllers: [SocieteOpController],
  providers: [SocieteOpService],
})
export class SocieteOpModule {}
