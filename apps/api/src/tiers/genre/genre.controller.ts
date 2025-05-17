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
import { GenreService } from './genre.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateGenreDto, UpdateGenreDto } from './dto/genre.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('forme_juridiques')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getAll() {
    return this.genreService.getAll();
  }

  @Get('/:id')
  get(
    @Param('id', ParseIntPipe) genreId: number,
    createGenreDto: CreateGenreDto,
  ) {
    return this.genreService.getOne(genreId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) genreId: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genreService.update(genreId, updateGenreDto);
  }
}
