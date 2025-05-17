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
import { RegionService } from './region.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRegionDto, UpdateRegionDto } from './dto/region.dto';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Region')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  getAll() {
    return this.regionService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) regionId: number,
    createRegionDto: CreateRegionDto,
  ) {
    return this.regionService.getOne(regionId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) regionId: number,
    createRegionDto: CreateRegionDto,
    @Req() request: Request,
  ) {
    return this.regionService.delete(regionId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) regionId: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.update(regionId, updateRegionDto);
  }
}
