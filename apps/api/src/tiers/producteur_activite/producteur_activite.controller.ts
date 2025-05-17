import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ProducteurActiviteService } from './producteur_activite.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateProducteurActiviteDto,
  UpdateProducteurActiviteDto,
} from './dto/producteur_activite.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('ProducteurActivite')
@Controller('producteurActivites')
export class ProducteurActiviteController {
  constructor(
    private readonly producteurActiviteService: ProducteurActiviteService,
  ) {}

  @Get()
  getAll() {
    return this.producteurActiviteService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) producteurActiviteId: number,
    createProducteurActiviteDto: CreateProducteurActiviteDto,
  ) {
    return this.producteurActiviteService.getOne(producteurActiviteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createProducteurActiviteDto: CreateProducteurActiviteDto) {
    return this.producteurActiviteService.create(
      createProducteurActiviteDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) producteurActiviteId: number,
    createProducteurActiviteDto: CreateProducteurActiviteDto,
    @Req() request: Request,
  ) {
    return this.producteurActiviteService.delete(producteurActiviteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) producteurActiviteId: number,
    @Body() updateProducteurActiviteDto: UpdateProducteurActiviteDto,
  ) {
    return this.producteurActiviteService.update(
      producteurActiviteId,
      updateProducteurActiviteDto,
    );
  }
}
