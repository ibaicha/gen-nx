import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {
  CreateCreditAgenceDto,
  GetCreditAgenceParamsDTO,
  UpdateCreditAgenceDto,
} from '@shared-models'
import { CreditAgenceService } from './credit_agence.service'

@Controller('credit-agence')
export class CreditAgenceController {
  constructor(private readonly creditAgenceService: CreditAgenceService) {}

  @Post()
  create(@Body() dto: CreateCreditAgenceDto) {
    return this.creditAgenceService.create(dto)
  }



  @Get('/all')
  findAll() {
    return this.creditAgenceService.findAll()
  }

  @Get('')
  getCreditsAgenceWithFiltersPaginationExtended(
    @Query() filtersInput: GetCreditAgenceParamsDTO,
  ) {
    const page = filtersInput.page ? Number(filtersInput.page) : 1
    const limit = filtersInput.limit ? Number(filtersInput.limit) : 10000

    // Mise à jour des paramètres avec pagination
    return this.creditAgenceService.getCreditsAgenceWithFiltersPaginationExtended(
      {
        ...filtersInput,
        page,
        limit,
      },
    )
  }

  @Get('/filters')
  getCreditsAgenceWithFiltersPagination(
    @Query() filtersInput: GetCreditAgenceParamsDTO,
  ) {
    const page = filtersInput.page ? Number(filtersInput.page) : 1
    const limit = filtersInput.limit ? Number(filtersInput.limit) : 10000

    // Mise à jour des paramètres avec pagination
    return this.creditAgenceService.getCreditsAgenceWithFiltersPagination({
      ...filtersInput,
      page,
      limit,
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditAgenceService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCreditAgenceDto) {
    return this.creditAgenceService.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditAgenceService.remove(+id)
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
import { CreditAgenceService } from './credit_agence.service'
import {
  CreateCreditAgenceDto,
  GetCreditAgenceParamsDTO,
  UpdateCreditAgenceDto,
} from '@shared-models'

@ApiTags('CreditAgence')
@Controller('creditAgences')
export class CreditAgenceController {
  constructor(private readonly creditAgenceService: CreditAgenceService) {}

  @Get('/all')
  getAll() {
    return this.creditAgenceService.getAll()
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCreditsAgenceWithFiltersPagination(
    @Query() filtersInput: GetCreditAgenceParamsDTO,
  ) {
    // Ajout de valeurs par défaut pour la pagination si elles ne sont pas fournies

    const page = filtersInput.page ? Number(filtersInput.page) : 1
    const limit = filtersInput.limit ? Number(filtersInput.limit) : 10000

    // Mise à jour des paramètres avec pagination
    return this.creditAgenceService.getCreditsAgenceWithFiltersPagination({
      ...filtersInput,
      page,
      limit,
    })
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) creditAgenceId: number) {
    return this.creditAgenceService.getOne(creditAgenceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createCreditAgenceDto: CreateCreditAgenceDto) {
    return this.creditAgenceService.create(createCreditAgenceDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) creditAgenceId: number) {
    return this.creditAgenceService.delete(creditAgenceId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) creditAgenceId: number,
    @Body() updateCreditAgenceDto: UpdateCreditAgenceDto,
  ) {
    return this.creditAgenceService.update(
      creditAgenceId,
      updateCreditAgenceDto,
    )
  }
}
*/
