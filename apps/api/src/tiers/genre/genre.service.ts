import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateGenreDto, UpdateGenreDto } from './dto/genre.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.genre.findMany();
  }

  async getOne(genreId: number) {
    const genre = await this.prismaService.genre.findUnique({
      where: { id: genreId },
    });
    if (!genre) throw new NotFoundException('Post not found');
    return genre;
  }
  async create(createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;
    await this.prismaService.genre.create({ data: { name } });
    return { data: 'Genre created' };
  }

  async update(genreId: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.prismaService.genre.findUnique({
      where: { id: genreId },
    });
    if (!genre) throw new NotFoundException('Genre not found');
    await this.prismaService.genre.update({
      where: { id: genreId },
      data: { ...updateGenreDto },
    });
    return { data: 'Genre updeted!' };
  }

  async delete(genreId: number) {
    const genre = await this.prismaService.genre.findUnique({
      where: { id: genreId },
    });
    if (!genre) throw new NotFoundException('Post not found');
    await this.prismaService.genre.delete({
      where: { id: genreId },
    });
    return { data: 'Genre deleted' };
  }
}
