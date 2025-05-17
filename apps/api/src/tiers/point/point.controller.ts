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

import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePointDto, UpdatePointDto } from './dto/point.dto';
import { PointService } from './point.service';

@ApiTags('Point')
@Controller('Points')
export class PointController {
  constructor(private readonly PointService: PointService) {}

  @Get()
  getAll() {
    return this.PointService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) PointId: number,
    createPointDto: CreatePointDto,
  ) {
    return this.PointService.getOne(PointId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createPointDto: CreatePointDto) {
    return this.PointService.create(createPointDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) PointId: number,
    createPointDto: CreatePointDto,
    @Req() request: Request,
  ) {
    return this.PointService.delete(PointId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) PointId: number,
    @Body() updatePointDto: UpdatePointDto,
  ) {
    return this.PointService.update(PointId, updatePointDto);
  }
}
