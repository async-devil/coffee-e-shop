import { ConflictException, Injectable } from "@nestjs/common";

import { OrderState } from "src/entities/order.entity";

import { OperateOrderByKeyDto } from "./dtos/operate-order-by-key.dto";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
	constructor(private readonly repository: OrdersRepository) {}

	public async suspendOwnOrder(dto: OperateOrderByKeyDto) {
		const order = await this.repository.getOneWhere(dto);

		if (order.state !== OrderState.CREATED)
			throw new ConflictException("Order has been processed or already suspended");

		return await this.repository.updateById({ id: order.id, state: OrderState.SUSPENDED });
	}
}
