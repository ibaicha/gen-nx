import { Module } from '@nestjs/common';
import { ProducteurActiviteController } from './producteur_activite.controller';
import { ProducteurActiviteService } from './producteur_activite.service';

@Module({
  controllers: [ProducteurActiviteController],
  providers: [ProducteurActiviteService],
})
export class ProducteurActiviteModule {}
