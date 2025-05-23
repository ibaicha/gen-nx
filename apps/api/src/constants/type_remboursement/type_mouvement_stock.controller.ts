import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { TypeMouvementStockService } from './type_mouvement_stock.service'
import { AuthGuard } from '@nestjs/passport'
import {
  CreateTypeMouvementStockDto,
  UpdateTypeMouvementStockDto,
} from './type_mouvement_stock.dto'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('TypeMouvementStock')
@Controller('typeMouvementStocks')
export class TypeMouvementStockController {
  constructor(
    private readonly typeMouvementStockService: TypeMouvementStockService,
  ) {}

  @Get()
  getAll() {
    return this.typeMouvementStockService.getAll()
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) typeMouvementStockId: number) {
    return this.typeMouvementStockService.getOne(typeMouvementStockId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createTypeMouvementStockDto: CreateTypeMouvementStockDto) {
    return this.typeMouvementStockService.create(createTypeMouvementStockDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) typeMouvementStockId: number) {
    return this.typeMouvementStockService.delete(typeMouvementStockId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) typeMouvementStockId: number,
    @Body() updateTypeMouvementStockDto: UpdateTypeMouvementStockDto,
  ) {
    return this.typeMouvementStockService.update(
      typeMouvementStockId,
      updateTypeMouvementStockDto,
    )
  }
}
