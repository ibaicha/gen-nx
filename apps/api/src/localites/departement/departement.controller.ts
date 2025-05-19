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
import { DepartementService } from './departement.service'
import { AuthGuard } from '@nestjs/passport'
import {
  CreateDepartementDto,
  UpdateDepartementDto,
} from './dto/departement.dto'
import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Departement')
@Controller('departements')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Get()
  getAll() {
    return this.departementService.getAll()
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) departementId: number,
    createDepartementDto: CreateDepartementDto,
  ) {
    return this.departementService.getOne(departementId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createDepartementDto: CreateDepartementDto) {
    return this.departementService.create(createDepartementDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) departementId: number,
    createDepartementDto: CreateDepartementDto,
    @Req() request: Request,
  ) {
    return this.departementService.delete(departementId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) departementId: number,
    @Body() updateDepartementDto: UpdateDepartementDto,
  ) {
    return this.departementService.update(departementId, updateDepartementDto)
  }
}
