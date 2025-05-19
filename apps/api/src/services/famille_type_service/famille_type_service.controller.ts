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
import { FamilleTypeServiceService } from './famille_type_service.service'
import { AuthGuard } from '@nestjs/passport'
import {
  CreateFamilleTypeServiceDto,
  UpdateFamilleTypeServiceDto,
} from './dto/famille_type_service.dto'

import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('FamilleTypeService')
@Controller('familleTypeServices')
export class FamilleTypeServiceController {
  constructor(
    private readonly familleTypeServiceService: FamilleTypeServiceService,
  ) {}

  @Get()
  getAll() {
    return this.familleTypeServiceService.getAll()
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) familleTypeServiceId: number,
    createFamilleTypeServiceDto: CreateFamilleTypeServiceDto,
  ) {
    return this.familleTypeServiceService.getOne(familleTypeServiceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createFamilleTypeServiceDto: CreateFamilleTypeServiceDto) {
    return this.familleTypeServiceService.create(createFamilleTypeServiceDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) familleTypeServiceId: number,
    createFamilleTypeServiceDto: CreateFamilleTypeServiceDto,
    @Req() request: Request,
  ) {
    return this.familleTypeServiceService.delete(familleTypeServiceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) familleTypeServiceId: number,
    @Body() updateFamilleTypeServiceDto: UpdateFamilleTypeServiceDto,
  ) {
    return this.familleTypeServiceService.update(
      familleTypeServiceId,
      updateFamilleTypeServiceDto,
    )
  }
}
