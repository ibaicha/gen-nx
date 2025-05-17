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
import {
  CreateOpDto,
  CreateOpPortefeuilleDto,
  GetOpParamsDTO,
  UpdateOpDto,
} from '@shared-models'
import { OpService } from './op.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'
@Controller('op')
export class OpController {
  constructor(private readonly opService: OpService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  create(@Body() dto: CreateOpDto) {
    return this.opService.create(dto)
  }

  @Post('porte-feuille')
  createPorteFeuille(@Body() dto: CreateOpPortefeuilleDto) {
    return this.opService.createPorteFeuille(dto)
  }

  @Get('')
  getOpsWithFiltersPaginationExtended(@Query() filtersInput: GetOpParamsDTO) {
    const page = filtersInput.page ? Number(filtersInput.page) : 1
    const limit = filtersInput.limit ? Number(filtersInput.limit) : 10000

    // Mise à jour des paramètres avec pagination
    return this.opService.getOpsWithFiltersPaginationExtended({
      ...filtersInput,
      page,
      limit,
    })

    //return this.opService.getOpsWithFiltersPagination(query)
  }

  @Get('/filtered')
  getOpsWithFiltersPagination(@Query() filtersInput: GetOpParamsDTO) {
    const page = filtersInput.page ? Number(filtersInput.page) : 1
    const limit = filtersInput.limit ? Number(filtersInput.limit) : 10000

    // Mise à jour des paramètres avec pagination
    return this.opService.getOpsWithFiltersPagination({
      ...filtersInput,
      page,
      limit,
    })
  }

  @Get('/all')
  findAll() {
    return this.opService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opService.findOne(+id)
  }

  //@ApiBearerAuth()
  //@UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateOpDto) {
    return this.opService.update(+id, dto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.opService.remove(+id)
  }
}

/*
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
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'

import { AuthGuard } from '@nestjs/passport'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { OpService } from './op.service'
import { CreateOpDto, GetOpParamsDTO, UpdateOpDto } from '@shared-models'

@ApiTags('Op')
@Controller('ops')
export class OpController {
  constructor(private readonly opService: OpService) {}

  @Get('/all')
  getAll() {
    return this.opService.getAll()
  }

  @Get()
  async getOpsWithFiltersPagination(@Query() filtersInput: GetOpParamsDTO) {
    // Ajout de valeurs par défaut pour la pagination si elles ne sont pas fournies

    const page = filtersInput.page ? Number(filtersInput.page) : 1
    const limit = filtersInput.limit ? Number(filtersInput.limit) : 10000

    // Mise à jour des paramètres avec pagination
    return this.opService.getOpsWithFiltersPagination({
      ...filtersInput,
      page,
      limit,
    })
  }


  @Get('/:id')
  get(@Param('id', ParseIntPipe) opId: number) {
    return this.opService.getOne(opId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createOpDto: CreateOpDto) {
    return this.opService.create(createOpDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('insert-multiple')
  insertMultipleOps() {
    return this.opService.insertMultipleOps()
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) opId: number) {
    return this.opService.delete(opId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) opId: number,
    @Body() updateOpDto: UpdateOpDto,
  ) {
    return this.opService.update(opId, updateOpDto)
  }
}
*/
