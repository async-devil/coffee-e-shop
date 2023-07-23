import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductTagEntity } from "src/entities/product-tag.entity";

@Injectable()
export class ProductTagsRepository extends EntityRepository<ProductTagEntity> {
	constructor(
		@InjectRepository(ProductTagEntity)
		protected readonly repository: Repository<ProductTagEntity>
	) {
		super();
	}
}
