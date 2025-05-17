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
import { TypeServiceService } from './type_service.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateTypeServiceDto,
  UpdateTypeServiceDto,
} from './dto/type_service.dto';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('TypeService')
@Controller('typeServices')
export class TypeServiceController {
  constructor(private readonly typeServiceService: TypeServiceService) {}

  @Get()
  getAll() {
    return this.typeServiceService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) typeServiceId: number,
    createTypeServiceDto: CreateTypeServiceDto,
  ) {
    return this.typeServiceService.getOne(typeServiceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createTypeServiceDto: CreateTypeServiceDto) {
    return this.typeServiceService.create(createTypeServiceDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) typeServiceId: number,
    createTypeServiceDto: CreateTypeServiceDto,
    @Req() request: Request,
  ) {
    return this.typeServiceService.delete(typeServiceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) typeServiceId: number,
    @Body() updateTypeServiceDto: UpdateTypeServiceDto,
  ) {
    return this.typeServiceService.update(typeServiceId, updateTypeServiceDto);
  }
}
