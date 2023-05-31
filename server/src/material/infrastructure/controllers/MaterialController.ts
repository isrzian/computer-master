import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {ApiOkSearchResponse} from '@steroidsjs/nest/src/infrastructure/decorators/ApiOkSearchResponse';
import {MaterialService} from '../../domain/services/MaterialService';
import {MaterialSearchDto} from '../../domain/dtos/MaterialSearchDto';
import {MaterialModel} from '../../domain/models/MaterialModel';
import {MaterialSaveDto} from '../../domain/dtos/MaterialSaveDto';

@ApiTags('Материалы')
@Controller('/material')
export class MaterialController {
    constructor(
        private materialService: MaterialService,
    ) {
    }

    @Get()
    @ApiQuery({type: MaterialSearchDto})
    @ApiOkSearchResponse({type: MaterialModel})
    async getAll(
        @Query() dto: MaterialSearchDto,
    ) {
        return this.materialService.search(dto);
    }

    @Get('/:id')
    @ApiOkSearchResponse({type: MaterialModel})
    async get(
        @Param('id') id: number,
    ) {
        return this.materialService.findById(id);
    }

    @Post()
    @ApiBody({type: MaterialSaveDto})
    @ApiOkResponse({type: MaterialModel})
    async create(
        @Body() dto: MaterialSaveDto,
    ) {
        return this.materialService.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: MaterialSaveDto})
    @ApiOkResponse({type: MaterialModel})
    async update(
        @Param('id') id: number,
        @Body() dto: MaterialSaveDto,
    ) {
        return this.materialService.update(id, dto);
    }
}
