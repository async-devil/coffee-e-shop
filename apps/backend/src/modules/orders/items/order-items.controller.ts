import { Body, Controller, Delete, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { AddOrderItemDto } from "./dtos/add-order-item.dto";
import { OperateOrderItemByIdDto } from "./dtos/operate-order-item-by-id.dto";
import { OrderItemsService } from "./order-items.service";
import { OperateOrderByIdDto } from "../dtos/operate-order-by-id.dto";

@ApiTags("order-items")
@Controller("orders")
@UseFilters(TypeORMErrorFilter)
export class OrderItemsController {
	constructor(private readonly service: OrderItemsService) {}

	@ApiBearerAuth()
	@Post("/:id/items")
	@UseGuards(AccessTokenGuard)
	public async addOrderItem(
		@Param() parameters: OperateOrderByIdDto,
		@Body() body: AddOrderItemDto
	) {
		const dto = Object.assign(body, { orderId: parameters.id });

		return await this.service.addOrderItem(dto);
	}

	@ApiBearerAuth()
	@Delete("/:orderId/items/:id")
	@UseGuards(AccessTokenGuard)
	public async deleteOrderItem(@Param() parameters: OperateOrderItemByIdDto) {
		return await this.service.deleteOrderItem(parameters);
	}
}
