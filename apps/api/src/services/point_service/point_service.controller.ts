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
import { PointServiceService } from './point_service.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreatePointServiceDto,
  UpdatePointServiceDto,
} from './dto/point_service.dto';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('PointService')
@Controller('pointServices')
export class PointServiceController {
  constructor(private readonly pointServiceService: PointServiceService) {}

  @Get()
  getAll() {
    return this.pointServiceService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) pointServiceId: number,
    createPointServiceDto: CreatePointServiceDto,
  ) {
    return this.pointServiceService.getOne(pointServiceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createPointServiceDto: CreatePointServiceDto) {
    return this.pointServiceService.create(createPointServiceDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) pointServiceId: number,
    createPointServiceDto: CreatePointServiceDto,
    @Req() request: Request,
  ) {
    return this.pointServiceService.delete(pointServiceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) pointServiceId: number,
    @Body() updatePointServiceDto: UpdatePointServiceDto,
  ) {
    return this.pointServiceService.update(
      pointServiceId,
      updatePointServiceDto,
    );
  }
}
