import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductImageEntity } from "src/entities/product-image.entity";

import { OperateProductImageDto } from "./dtos/operate-product-image.dto";

@Injectable()
export class ProductImagesRepository extends EntityRepository<ProductImageEntity> {
	constructor(
		@InjectRepository(ProductImageEntity)
		protected readonly repository: Repository<ProductImageEntity>
	) {
		super();
	}

	public async link(dto: OperateProductImageDto) {
		return await this.repository.save(dto);
	}

	public async unlink(dto: OperateProductImageDto) {
		return await this.deleteOneWhere(dto);
	}
}
