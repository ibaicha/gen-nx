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
import { SocieteOpService } from './societe_op.service'
import { CreateSocieteOpDto, UpdateSocieteOpDto } from '@shared-models'


@ApiTags('SocieteOp')
@Controller('societeOps')
export class SocieteOpController {
  constructor(private readonly societeOpService: SocieteOpService) {}

  @Get('/custom')
  getCustomAll() {
    return this.societeOpService.getCustomAll()
  }

  @Get('/custom/agenceFinancier/:id')
  getOpsFromAgenceFinancier(@Param('id', ParseIntPipe) agenceId: number) {
    return this.societeOpService.getOpsFromSocieteFinancier(agenceId)
  }

  @Get()
  getAll() {
    return this.societeOpService.getAll()
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe)
    societeOpId: number,
    createSocieteOpDto: CreateSocieteOpDto,
  ) {
    return this.societeOpService.getOne(societeOpId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @Body()
    createSocieteOpDto: CreateSocieteOpDto,
  ) {
    return this.societeOpService.create(createSocieteOpDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe)
    societeOpId: number,
    createSocieteOpDto: CreateSocieteOpDto,
    @Req() request: Request,
  ) {
    return this.societeOpService.delete(societeOpId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe)
    societeOpId: number,
    @Body()
    updateSocieteOpDto: UpdateSocieteOpDto,
  ) {
    return this.societeOpService.update(societeOpId, updateSocieteOpDto)
  }
}
