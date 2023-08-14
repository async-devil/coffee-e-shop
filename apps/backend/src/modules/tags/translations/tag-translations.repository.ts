import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { TagTranslationEntity } from "src/entities/tag-translation.entity";

import { CreateTagTranslationDto } from "./dtos/create-tag-translation.dto";
import { UpdateTagTranslationDto } from "./dtos/update-tag-translation.dto";

@Injectable()
export class TagTranslationsRepository extends EntityRepository<TagTranslationEntity> {
	constructor(
		@InjectRepository(TagTranslationEntity)
		protected readonly repository: Repository<TagTranslationEntity>
	) {
		super();
	}

	public async create(dto: CreateTagTranslationDto) {
		const entity = new TagTranslationEntity();

		Object.assign(entity, dto);

		return await this.repository.save(entity);
	}

	public async update(dto: UpdateTagTranslationDto) {
		const entity = await this.getOneWhere({ tagId: dto.tagId, language: dto.language });

		const updatedEntity = Object.assign(entity, dto);

		return await this.repository.save(updatedEntity);
	}
}
