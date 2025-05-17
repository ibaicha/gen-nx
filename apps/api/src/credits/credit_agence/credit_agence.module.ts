import { Module } from '@nestjs/common'
import { CreditAgenceController } from './credit_agence.controller';
import { CreditAgenceService } from './credit_agence.service';

@Module({
  controllers: [CreditAgenceController],
  providers: [CreditAgenceService],
})
export class CreditAgenceModule {}
