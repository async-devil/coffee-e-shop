import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseFilters,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { CreateOrderDto } from "./dtos/create-order.dto";
import { OperateOrderByIdDto } from "./dtos/operate-order-by-id.dto";
import { OperateOrderByKeyDto } from "./dtos/operate-order-by-key.dto";
import { UpdateOrderByIdBodyDto } from "./dtos/update-order-info-by-id.dto";
import { OrdersRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";

@ApiTags("orders")
@Controller("orders")
@UseFilters(TypeORMErrorFilter)
export class OrdersController {
	constructor(
		private readonly repository: OrdersRepository,
		private readonly service: OrdersService
	) {}

	@Post("/new")
	public async createOrder(@Body() dto: CreateOrderDto) {
		return await this.repository.assemble(dto);
	}

	@Get("/browse/:key")
	public async getOwnOrder(@Param() parameters: OperateOrderByKeyDto) {
		return await this.repository.getOneWhere(parameters, { orderItems: true });
	}

	@ApiBearerAuth()
	@Get("/:id")
	@UseGuards(AccessTokenGuard)
	public async getOrder(@Param() parameters: OperateOrderByIdDto) {
		return await this.repository.getOneWhere(parameters, { orderItems: true });
	}

	@ApiBearerAuth()
	@Put("/:id")
	@UseGuards(AccessTokenGuard)
	public async updateOrder(
		@Param() parameters: OperateOrderByIdDto,
		@Body() body: UpdateOrderByIdBodyDto
	) {
		const dto = Object.assign(body, parameters);

		return await this.repository.updateById(dto);
	}

	@Delete("/suspend/:key")
	public async suspendOwnOrder(@Param() parameters: OperateOrderByKeyDto) {
		return await this.service.suspendOwnOrder(parameters);
	}

	@ApiBearerAuth()
	@Delete("/:id")
	@UseGuards(AccessTokenGuard)
	public async deleteOrder(@Param() parameters: OperateOrderByIdDto) {
		return await this.repository.deleteOneWhere(parameters);
	}
}
