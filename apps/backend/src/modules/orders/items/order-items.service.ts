import { Injectable } from "@nestjs/common";

import { CreateOrderItemDto } from "./dtos/create-order-item.dto";
import { OperateOrderItemByIdDto } from "./dtos/operate-order-item-by-id.dto";
import { OrderItemsRepository } from "./order-items.repository";
import { OrdersRepository } from "../orders.repository";

@Injectable()
export class OrderItemsService {
	constructor(
		private readonly repository: OrderItemsRepository,
		private readonly ordersRepository: OrdersRepository
	) {}

	public async addOrderItem(dto: CreateOrderItemDto) {
		const item = await this.repository.create(dto);

		await this.ordersRepository.calculateTotalPriceAndSet(dto.orderId);

		return item;
	}

	public async deleteOrderItem(dto: OperateOrderItemByIdDto) {
		await this.repository.deleteOneWhere(dto);

		await this.ordersRepository.calculateTotalPriceAndSet(dto.orderId);

		return {};
	}
}
