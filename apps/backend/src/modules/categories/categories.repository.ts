import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { CategoryEntity } from "src/entities/category.entity";

import { OperateCategoryByIdDto } from "./operate-category-by-id.dto";

@Injectable()
export class CategoriesRepository extends EntityRepository<CategoryEntity> {
	constructor(
		@InjectRepository(CategoryEntity)
		protected readonly repository: Repository<CategoryEntity>
	) {
		super();
	}

	public async create() {
		const entity = new CategoryEntity();

		return await this.repository.save(entity);
	}

	public async getById(dto: OperateCategoryByIdDto) {
		return await this.getOneWhere(dto, { translations: true });
	}
}
