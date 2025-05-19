import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { OpActiviteService } from './op_activite.service'
import { AuthGuard } from '@nestjs/passport'
import { CreateOpActiviteDto, UpdateOpActiviteDto } from './dto/op_activite.dto'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('OpActivite')
@Controller('opActivites')
export class OpActiviteController {
  constructor(private readonly opActiviteService: OpActiviteService) {}

  @Get()
  getAll() {
    return this.opActiviteService.getAll()
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) opActiviteId: number) {
    return this.opActiviteService.getOne(opActiviteId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createOpActiviteDto: CreateOpActiviteDto) {
    return this.opActiviteService.create(createOpActiviteDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) opActiviteId: number) {
    return this.opActiviteService.delete(opActiviteId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) opActiviteId: number,
    @Body() updateOpActiviteDto: UpdateOpActiviteDto,
  ) {
    return this.opActiviteService.update(opActiviteId, updateOpActiviteDto)
  }
}
