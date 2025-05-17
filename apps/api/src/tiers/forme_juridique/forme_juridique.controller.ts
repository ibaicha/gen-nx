import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'
import {
  CreateFormeJuridiqueDto,
  UpdateFormeJuridiqueDto,
} from '@shared-models'
import { FormeJuridiqueService } from './forme_juridique.service'
@Controller('forme-juridique')
export class FormeJuridiqueController {
  constructor(private readonly formeJuridiqueService: FormeJuridiqueService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() dto: CreateFormeJuridiqueDto) {
    return this.formeJuridiqueService.create(dto)
  }

  @Get('')
  findAll() {
    return this.formeJuridiqueService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formeJuridiqueService.findOne(+id)
  }

  //@ApiBearerAuth()
  //@UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateFormeJuridiqueDto) {
    return this.formeJuridiqueService.update(+id, dto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.formeJuridiqueService.remove(+id)
  }
}

/*
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { FormeJuridiqueService } from './forme_juridique.service';
import { AuthGuard } from '@nestjs/passport';

import { CreateFormeJuridiqueDto, UpdateFormeJuridiqueDto } from '@shared-models';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('FormeJuridique')
@Controller('formeJuridiques')
export class FormeJuridiqueController {
  constructor(private readonly formeJuridiqueService: FormeJuridiqueService) {}

  @Get()
  getAll() {
    return this.formeJuridiqueService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) formeJuridiqueId: number,
    createFormeJuridiqueDto: CreateFormeJuridiqueDto,
  ) {
    return this.formeJuridiqueService.getOne(formeJuridiqueId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createFormeJuridiqueDto: CreateFormeJuridiqueDto) {
    return this.formeJuridiqueService.create(createFormeJuridiqueDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) formeJuridiqueId: number,
    @Body() updateFormeJuridiqueDto: UpdateFormeJuridiqueDto,
  ) {
    return this.formeJuridiqueService.update(
      formeJuridiqueId,
      updateFormeJuridiqueDto,
    );
  }
}
*/
