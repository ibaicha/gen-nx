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
import { ServiceService } from './service.service'
import { AuthGuard } from '@nestjs/passport'
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto'

import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Service')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getAll() {
    return this.serviceService.getAll()
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) serviceId: number,
    createServiceDto: CreateServiceDto,
  ) {
    return this.serviceService.getOne(serviceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) serviceId: number,
    createServiceDto: CreateServiceDto,
    @Req() request: Request,
  ) {
    return this.serviceService.delete(serviceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) serviceId: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(serviceId, updateServiceDto)
  }
}
