import { Module } from '@nestjs/common'
import { AgenceOpService } from './agence_op.service'
import { AgenceOpController } from './agence_op.controller'

@Module({
  controllers: [AgenceOpController],
  providers: [AgenceOpService],
})
export class AgenceOpModule {}
