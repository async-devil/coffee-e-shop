import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductImageEntity } from "src/entities/product-image.entity";

@Injectable()
export class ProductImagesRepository extends EntityRepository<ProductImageEntity> {
	constructor(
		@InjectRepository(ProductImageEntity)
		protected readonly repository: Repository<ProductImageEntity>
	) {
		super();
	}
}
