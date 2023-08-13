import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductEntity } from "src/entities/product.entity";

import { OperateProductDto } from "./operate-product.dto";

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

		return await this.repository.save(product);
	}

	public async linkCategoryToProduct(productId: number, categoryId: number) {
		const product = await this.getProductById({ id: productId });

		product.categoryId = categoryId;

		return await this.repository.save(product);
	}

	public async getProductById(dto: OperateProductDto) {
		return await this.getOneWhere(dto, {
			translations: true,
			editions: true,
			images: true,
		});
	}
}
