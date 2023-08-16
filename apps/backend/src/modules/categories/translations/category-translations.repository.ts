import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { CategoryTranslationEntity } from "src/entities/category-translation.entity";

import { CreateCategoryTranslationDto } from "./dtos/create-category-translation.dto";
import { UpdateCategoryTranslationDto } from "./dtos/update-category-translation.dto";

@Injectable()
export class CategoryTranslationsRepository extends EntityRepository<CategoryTranslationEntity> {
	constructor(
		@InjectRepository(CategoryTranslationEntity)
		protected readonly repository: Repository<CategoryTranslationEntity>
	) {
		super();
	}

	public async create(dto: CreateCategoryTranslationDto) {
		const entity = new CategoryTranslationEntity();

		Object.assign(entity, dto);

		return await this.repository.save(entity);
	}

	public async update(dto: UpdateCategoryTranslationDto) {
		const entity = await this.getOneWhere({ categoryId: dto.categoryId, language: dto.language });

		const updatedEntity = Object.assign(entity, dto);

		return await this.repository.save(updatedEntity);
	}
}
