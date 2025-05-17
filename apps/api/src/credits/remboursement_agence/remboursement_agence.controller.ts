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

import { AuthGuard } from '@nestjs/passport'

import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
  CreateRemboursementAgenceDto,
  UpdateRemboursementAgenceDto,
} from './remboursement_agence.dto'
import { RemboursementAgenceService } from './remboursement_agence.service'

@ApiTags('RemboursementAgence')
@Controller('remboursementAgences')
export class RemboursementAgenceController {
  constructor(
    private readonly remboursementAgenceService: RemboursementAgenceService,
  ) {}

  @Get()
  getAll() {
    return this.remboursementAgenceService.getAll()
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) remboursementAgenceId: number,
    createRemboursementAgenceDto: CreateRemboursementAgenceDto,
  ) {
    return this.remboursementAgenceService.getOne(remboursementAgenceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createRemboursementAgenceDto: CreateRemboursementAgenceDto) {
    return this.remboursementAgenceService.create(createRemboursementAgenceDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) remboursementAgenceId: number,
    createRemboursementAgenceDto: CreateRemboursementAgenceDto,
    @Req() request: Request,
  ) {
    return this.remboursementAgenceService.delete(remboursementAgenceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) remboursementAgenceId: number,
    @Body() updateRemboursementAgenceDto: UpdateRemboursementAgenceDto,
  ) {
    return this.remboursementAgenceService.update(
      remboursementAgenceId,
      updateRemboursementAgenceDto,
    )
  }
}
