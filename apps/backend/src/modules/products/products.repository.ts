import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductEntity } from "src/entities/product.entity";

@Injectable()
export class ProductsRepository extends EntityRepository<ProductEntity> {
	constructor(
		@InjectRepository(ProductEntity)
		protected readonly repository: Repository<ProductEntity>
	) {
		super();
	}

	public async createProduct() {
		const product = new ProductEntity();

		product.category_id = 0;
		product.archived = false;

		return await this.save(product);
	}

	public async linkCategoryToProduct(product_id: number, category_id: number) {
		const product = await this.getProductById(product_id);

		product.category_id = category_id;

		return await this.save(product);
	}

	public async getProductById(id: number) {
		return await this.getOneWhere(
			{ id },
			{
				translations: true,
				editions: true,
			}
		);
	}
}
