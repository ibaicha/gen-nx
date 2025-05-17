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
import { DemandeDetailService } from './demande_detail.service';
import { CreateDemandeDetailDto } from './dto/demande_detail.dto';

@ApiTags('DemandeDetail')
@Controller('demandeDetails')
export class DemandeDetailController {
  constructor(private readonly demandeDetailService: DemandeDetailService) {}

  @Get('/')
  getAll() {
    return this.demandeDetailService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) demandeDetailId: number,
    createDemandeDetailDto: CreateDemandeDetailDto,
  ) {
    return this.demandeDetailService.getOne(demandeDetailId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createDemandeDetailDto: CreateDemandeDetailDto) {
    return this.demandeDetailService.create(createDemandeDetailDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) demandeDetailId: number,
    createDemandeDetailDto: CreateDemandeDetailDto,
    @Req() request: Request,
  ) {
    return this.demandeDetailService.delete(demandeDetailId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) demandeDetailId: number,
    @Body() updateDemandeDetailDto: CreateDemandeDetailDto,
  ) {
    return this.demandeDetailService.update(
      demandeDetailId,
      updateDemandeDetailDto,
    );
  }
}
