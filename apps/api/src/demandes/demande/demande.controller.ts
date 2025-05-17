import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { DemandeService } from './demande.service';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateDemandeDto,
  GetDemandeParamsDTO,
  IDemande,
  UpdateDemandeDto,
} from './dto/demande.dto';

@ApiTags('Demande')
@Controller('demandes')
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}

  @Get('/all')
  getAll() {
    return this.demandeService.getAll();
  }

  @Get()
  async getAllDemandesWithFilters(
    @Query() params: GetDemandeParamsDTO,
  ): Promise<IDemande[]> {
    return this.demandeService.getAllDemandesWithFilters(params);
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) demandeId: number,
    createDemandeDto: CreateDemandeDto,
  ) {
    return this.demandeService.getOne(demandeId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandeService.create(createDemandeDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) demandeId: number,
    createDemandeDto: CreateDemandeDto,
    @Req() request: Request,
  ) {
    return this.demandeService.delete(demandeId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) demandeId: number,
    @Body() updateDemandeDto: UpdateDemandeDto,
  ) {
    return this.demandeService.update(demandeId, updateDemandeDto);
  }
}
