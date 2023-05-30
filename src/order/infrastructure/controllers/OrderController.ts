import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {ApiOkSearchResponse} from '@steroidsjs/nest/src/infrastructure/decorators/ApiOkSearchResponse';
import {OrderService} from '../../domain/services/OrderService';
import {OrderSearchDto} from '../../domain/dtos/OrderSearchDto';
import {OrderModel} from '../../domain/models/OrderModel';
import {OrderSaveDto} from '../../domain/dtos/OrderSaveDto';

@ApiTags('Заказы')
@Controller('/order')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) {
    }

    @Get()
    @ApiQuery({type: OrderSearchDto})
    @ApiOkSearchResponse({type: OrderModel})
    async get(
        @Query() dto: OrderSearchDto,
    ) {
        return this.orderService.search(dto);
    }

    @Get('/:id')
    @ApiOkResponse({type: OrderModel})
    async getOne(
        @Param('id') id: number,
    ) {
        return this.orderService.findById(id);
    }

    @Post()
    @ApiBody({type: OrderSaveDto})
    @ApiOkResponse({type: OrderModel})
    async create(
        @Body() dto: OrderSaveDto,
    ) {
        return this.orderService.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: OrderSaveDto})
    @ApiOkResponse({type: OrderModel})
    async update(
        @Param('id') id: number,
        @Body() dto: OrderSaveDto,
    ) {
        return this.orderService.update(id, dto);
    }
}
