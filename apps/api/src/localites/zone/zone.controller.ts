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
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { ZoneService } from './zone.service'
import { AuthGuard } from '@nestjs/passport'

import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateZoneDto, UpdateZoneDto } from './zone.dto'

@ApiTags('Zone')
@Controller('zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get()
  getAll() {
    return this.zoneService.getAll()
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) zoneId: number, createZoneDto: CreateZoneDto) {
    return this.zoneService.getOne(zoneId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) zoneId: number,
    createZoneDto: CreateZoneDto,
    @Req() request: Request,
  ) {
    return this.zoneService.delete(zoneId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) zoneId: number,
    @Body() updateZoneDto: UpdateZoneDto,
  ) {
    return this.zoneService.update(zoneId, updateZoneDto)
  }
}
