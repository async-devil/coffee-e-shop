import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { OrderItemEntity } from "src/entities/order-item.entity";
import { ProductEntity } from "src/entities/product.entity";
import { ProductsRepository } from "src/modules/products/products.repository";

import { CreateOrderItemDto } from "./dtos/create-order-item.dto";

@Injectable()
export class OrderItemsRepository extends EntityRepository<OrderItemEntity> {
	private readonly DEFAULT_LANGUAGE = "en";

	constructor(
		@InjectRepository(OrderItemEntity)
		protected readonly repository: Repository<OrderItemEntity>,
		private readonly productsRepository: ProductsRepository
	) {
		super();
	}

	public async create(dto: CreateOrderItemDto) {
		const product = await this.productsRepository.getById({ id: dto.productId });

		const edition = this.getProductEdition(product, dto.productEditionId);
		const translation = this.getProductTranslation(product, dto.language);
		const totalPrice = edition.price * dto.amount;

		const entity = new OrderItemEntity();

		const data = {
			orderId: dto.orderId,
			productId: dto.productId,
			name: translation.name,
			editionName: edition.name,
			price: edition.price,
			amount: dto.amount,
			totalPrice: totalPrice,
		};
		Object.assign(entity, data);

		return await this.repository.save(entity);
	}

	private getProductEdition(product: ProductEntity, editionId: number) {
		const edition = product.editions.find((edition) => edition.id === editionId);

		if (!edition) throw new NotFoundException("Product edition is not found");

		if (!edition.available) throw new BadRequestException("Product edition is not available");

		return edition;
	}

	private getProductTranslation(product: ProductEntity, language: string) {
		let translation = product.translations.find((translation) => translation.language === language);

		if (!translation) {
			translation = product.translations.find(
				(translation) => translation.language === this.DEFAULT_LANGUAGE
			);
		}
		if (!translation) throw new NotFoundException("Product translation is not found");

		return translation;
	}

	public async getManyByOrderId(orderId: number) {
		return await this.repository.find({ where: { orderId } });
	}
}
