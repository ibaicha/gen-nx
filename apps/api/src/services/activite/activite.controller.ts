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
import { ActiviteService } from './activite.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateActiviteDto, UpdateActiviteDto } from './dto/activite.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Activite')
@Controller('activites')
export class ActiviteController {
  constructor(private readonly activiteService: ActiviteService) {}

  @Get()
  getAll() {
    return this.activiteService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) activiteId: number,
    createActiviteDto: CreateActiviteDto,
  ) {
    return this.activiteService.getOne(activiteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createActiviteDto: CreateActiviteDto) {
    return this.activiteService.create(createActiviteDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) activiteId: number,
    @Body() updateActiviteDto: UpdateActiviteDto,
  ) {
    return this.activiteService.update(activiteId, updateActiviteDto);
  }
}
