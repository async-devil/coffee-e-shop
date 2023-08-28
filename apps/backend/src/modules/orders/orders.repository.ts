import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { OrderItemEntity } from "src/entities/order-item.entity";
import { OrderEntity } from "src/entities/order.entity";

import { CreateOrderDto } from "./dtos/create-order.dto";
import { UpdateOrderByIdDto } from "./dtos/update-order-info-by-id.dto";
import { OrderItemsRepository } from "./items/order-items.repository";

@Injectable()
export class OrdersRepository extends EntityRepository<OrderEntity> {
	constructor(
		@InjectRepository(OrderEntity)
		protected readonly repository: Repository<OrderEntity>,
		private readonly itemsRepository: OrderItemsRepository
	) {
		super();
	}

	public async create(dto: CreateOrderDto) {
		const entity = new OrderEntity();

		const data = { ...dto.contact, ...dto.delivery, language: dto.language };
		Object.assign(entity, data);

		return await this.repository.save(entity);
	}

	/** @param items To get items from DB pass empty array */
	public async calculateTotalPrice(items: OrderItemEntity[], orderId?: number) {
		if (items.length === 0) items = await this.itemsRepository.getManyByOrderId(orderId);

		let totalPrice = 0;

		for (const item of items) {
			totalPrice += +item.totalPrice;
		}

		return totalPrice;
	}

	public async calculateTotalPriceAndSet(orderId: number) {
		const entity = await this.getOneWhere({ id: orderId });

		const totalPrice = await this.calculateTotalPrice([], orderId);
		entity.totalPrice = totalPrice;

		return await this.repository.save(entity);
	}

	public async assemble(dto: CreateOrderDto) {
		const order = await this.create(dto);

		const orderItems: OrderItemEntity[] = [];

		try {
			for (const itemInfo of dto.orderItems) {
				const item = await this.itemsRepository.create({
					...itemInfo,
					orderId: order.id,
					language: dto.language,
				});

				orderItems.push(item);
			}
		} catch (error) {
			await this.deleteOneWhere({ id: order.id });

			throw error;
		}

		order.totalPrice = await this.calculateTotalPrice(orderItems);

		return await this.repository.save(order);
	}

	public async updateById(dto: UpdateOrderByIdDto) {
		const entity = await this.getOneWhere({ id: dto.id });

		const data = { ...dto.contact, ...dto.delivery, state: dto.state };
		Object.assign(entity, data);

		return await this.repository.save(entity);
	}
}
