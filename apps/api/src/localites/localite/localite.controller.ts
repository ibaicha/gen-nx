import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { LocaliteService } from './localite.service';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLocaliteDto, UpdateLocaliteDto } from './localite.dto';


@ApiTags('Localite')
@Controller('localites')
export class LocaliteController {
    constructor(private readonly localiteService: LocaliteService) {}

    @Get()
    getAll() {
        return this.localiteService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) localiteId : number, createLocaliteDto: CreateLocaliteDto) {
        return this.localiteService.getOne(localiteId);
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createLocaliteDto: CreateLocaliteDto) {
        return this.localiteService.create(createLocaliteDto);

    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) localiteId : number, createLocaliteDto: CreateLocaliteDto, @Req() request : Request) {
        return this.localiteService.delete(localiteId);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) localiteId : number,
        @Body() updateLocaliteDto: UpdateLocaliteDto,
        ) {
        return this.localiteService.update(localiteId, updateLocaliteDto);
    }



}
