import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductEditionEntity } from "src/entities/product-edition.entity";

@Injectable()
export class ProductEditionsRepository extends EntityRepository<ProductEditionEntity> {
	constructor(
		@InjectRepository(ProductEditionEntity)
		protected readonly repository: Repository<ProductEditionEntity>
	) {
		super();
	}
}
