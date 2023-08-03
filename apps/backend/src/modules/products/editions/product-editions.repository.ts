import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductEditionEntity } from "src/entities/product-edition.entity";

import { CreateProductEditionDto } from "./dtos/create-product-edition.dto";
import { GetProductEditionByIdDto } from "./dtos/get-product-edition-by-id.dto";
import { UpdateProductEditionByIdDto } from "./dtos/update-product-edition-by-id.dto";

@Injectable()
export class ProductEditionsRepository extends EntityRepository<ProductEditionEntity> {
	constructor(
		@InjectRepository(ProductEditionEntity)
		protected readonly repository: Repository<ProductEditionEntity>
	) {
		super();
	}

	/** @throws {TypeORMError} */
	public async create(dto: CreateProductEditionDto) {
		const entity = new ProductEditionEntity();

		return await this.repository.save(Object.assign(entity, dto));
	}

	/**
	 * Finds edition by id and product linked to it. If not found - throws
	 * @throws {NotFoundException}
	 */
	public async getById(dto: GetProductEditionByIdDto) {
		return await this.getOneWhere(dto);
	}

	/**
	 * Updates edition by id and product linked to it. If not found - throws
	 * @throws {NotFoundException}
	 * @throws {TypeORMError}
	 */
	public async updateById(dto: UpdateProductEditionByIdDto) {
		const entity = await this.getById({
			productId: dto.productId,
			id: dto.id,
		});

		// only updates if id is the same, does not work on the string equivalent
		dto.id = entity.id;

		const updatedEntity = Object.assign(entity, dto);

		return await this.repository.save(updatedEntity);
	}
}
