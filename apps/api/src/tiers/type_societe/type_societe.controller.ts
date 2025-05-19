import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { AuthGuard } from '@nestjs/passport'
import {
  CreateTypeSocieteDto,
  UpdateTypeSocieteDto,
} from './dto/type_societe.dto'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { TypeSocieteService } from './type_societe.service'

@ApiTags('TypeSociete')
@Controller('typeSocietes')
export class TypeSocieteController {
  constructor(private readonly typeSocieteService: TypeSocieteService) {}

  @Get()
  getAll() {
    return this.typeSocieteService.getAll()
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) typeSocieteId: number) {
    return this.typeSocieteService.getOne(typeSocieteId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createTypeSocieteDto: CreateTypeSocieteDto) {
    return this.typeSocieteService.create(createTypeSocieteDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) typeSocieteId: number,
    @Body() updateTypeSocieteDto: UpdateTypeSocieteDto,
  ) {
    return this.typeSocieteService.update(typeSocieteId, updateTypeSocieteDto)
  }
}
