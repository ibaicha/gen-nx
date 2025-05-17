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
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { PointActiviteService } from './point_activite.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreatePointActiviteDto,
  UpdatePointActiviteDto,
} from './dto/point_activite.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('PointActivite')
@Controller('pointActivites')
export class PointActiviteController {
  constructor(private readonly pointActiviteService: PointActiviteService) {}

  @Get()
  getAll() {
    return this.pointActiviteService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) pointActiviteId: number,
    createPointActiviteDto: CreatePointActiviteDto,
  ) {
    return this.pointActiviteService.getOne(pointActiviteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createPointActiviteDto: CreatePointActiviteDto) {
    return this.pointActiviteService.create(createPointActiviteDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) pointActiviteId: number,
    createPointActiviteDto: CreatePointActiviteDto,
    @Req() request: Request,
  ) {
    return this.pointActiviteService.delete(pointActiviteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) pointActiviteId: number,
    @Body() updatePointActiviteDto: UpdatePointActiviteDto,
  ) {
    return this.pointActiviteService.update(
      pointActiviteId,
      updatePointActiviteDto,
    );
  }
}
