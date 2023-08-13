import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductEntity } from "src/entities/product.entity";

import { OperateProductByIdDto } from "./operate-product-by-id.dto";

@Injectable()
export class ProductsRepository extends EntityRepository<ProductEntity> {
	constructor(
		@InjectRepository(ProductEntity)
		protected readonly repository: Repository<ProductEntity>
	) {
		super();
	}

	public async create() {
		const product = new ProductEntity();

		return await this.repository.save(product);
	}

	public async linkCategory(productId: number, categoryId: number) {
		const product = await this.getById({ id: productId });

		product.categoryId = categoryId;

		return await this.repository.save(product);
	}

	public async getById(dto: OperateProductByIdDto) {
		return await this.getOneWhere(dto, {
			translations: true,
			editions: true,
			images: true,
		});
	}
}
