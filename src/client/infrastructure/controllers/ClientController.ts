import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {ApiOkSearchResponse} from '@steroidsjs/nest/src/infrastructure/decorators/ApiOkSearchResponse';
import {ClientService} from '../../domain/services/ClientService';
import {ClientSearchDto} from '../../domain/dtos/ClientSearchDto';
import {ClientModel} from '../../domain/models/ClientModel';
import {ClientSaveDto} from '../../domain/dtos/ClientSaveDto';

@ApiTags('Клиент')
@Controller('/client')
export class ClientController {
    constructor(
        private clientService: ClientService,
    ) {
    }

    @Get()
    @ApiQuery({type: ClientSearchDto})
    @ApiOkSearchResponse({type: ClientModel})
    async getAll(
        @Query() dto: ClientSearchDto,
    ) {
        return this.clientService.search(dto);
    }

    @Get('/:id')
    @ApiOkSearchResponse({type: ClientModel})
    async get(
        @Param('id') id: number,
    ) {
        return this.clientService.findById(id);
    }

    @Post()
    @ApiBody({type: ClientSaveDto})
    @ApiOkResponse({type: ClientModel})
    async create(
        @Body() dto: ClientSaveDto,
    ) {
        return this.clientService.create(dto);
    }
}
