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
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AgenceOpService } from './agence_op.service'
import {
  CreateAgenceOpDto,
  GetOpParamsDTO,
  UpdateAgenceOpDto,
} from '@shared-models'

@ApiTags('AgenceOp')
@Controller('agenceOps')
export class AgenceOpController {
  constructor(private readonly agenceOpService: AgenceOpService) {}
  @Get('/all')
  getAll() {
    return this.agenceOpService.getAll()
  }

  @Get()
  async getAgencesOpsWithFiltersPagination(
    @Query() filtersInput: GetOpParamsDTO,
  ) {
    // Ajout de valeurs par défaut pour la pagination si elles ne sont pas fournies

    const page = filtersInput.page ? Number(filtersInput.page) : 1
    const limit = filtersInput.limit ? Number(filtersInput.limit) : 10000

    // Mise à jour des paramètres avec pagination
    return this.agenceOpService.getAgencesOpWithFiltersPagination({
      ...filtersInput,
      page,
      limit,
    })
  }

  @Get('/custom')
  getCustomAll() {
    return this.agenceOpService.getCustomAll()
  }

  @Get('/custom/agenceFinancier/:id')
  getOpsFromAgenceFinancier(@Param('id', ParseIntPipe) agenceId: number) {
    return this.agenceOpService.getOpsFromAgenceFinancier(agenceId)
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe)
    agenceOpId: number,
    createAgenceOpDto: CreateAgenceOpDto,
  ) {
    return this.agenceOpService.getOne(agenceOpId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @Body()
    createAgenceOpDto: CreateAgenceOpDto,
  ) {
    return this.agenceOpService.create(createAgenceOpDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe)
    agenceOpId: number,
    createAgenceOpDto: CreateAgenceOpDto,
    @Req() request: Request,
  ) {
    return this.agenceOpService.delete(agenceOpId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe)
    agenceOpId: number,
    @Body()
    updateAgenceOpDto: UpdateAgenceOpDto,
  ) {
    return this.agenceOpService.update(agenceOpId, updateAgenceOpDto)
  }
}
