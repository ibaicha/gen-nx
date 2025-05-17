import { Module } from '@nestjs/common';
import { FormeJuridiqueController } from './forme_juridique.controller';
import { FormeJuridiqueService } from './forme_juridique.service';

@Module({
  controllers: [FormeJuridiqueController],
  providers: [FormeJuridiqueService],
})
export class FormeJuridiqueModule {}
