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
import { VarianteServiceService } from './variante_service.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateVarianteServiceDto,
  UpdateVarianteServiceDto,
} from './dto/variante_service.dto';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('VarianteService')
@Controller('varianteServices')
export class VarianteServiceController {
  constructor(
    private readonly varianteServiceService: VarianteServiceService,
  ) {}

  @Get()
  getAll() {
    return this.varianteServiceService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) varianteServiceId: number,
    createVarianteServiceDto: CreateVarianteServiceDto,
  ) {
    return this.varianteServiceService.getOne(varianteServiceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createVarianteServiceDto: CreateVarianteServiceDto) {
    return this.varianteServiceService.create(createVarianteServiceDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) varianteServiceId: number,
    createVarianteServiceDto: CreateVarianteServiceDto,
    @Req() request: Request,
  ) {
    return this.varianteServiceService.delete(varianteServiceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) varianteServiceId: number,
    @Body() updateVarianteServiceDto: UpdateVarianteServiceDto,
  ) {
    return this.varianteServiceService.update(
      varianteServiceId,
      updateVarianteServiceDto,
    );
  }
}
