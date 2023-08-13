import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { TagTranslationEntity } from "src/entities/tag-translation.entity";

@Injectable()
export class TagTranslationsRepository extends EntityRepository<TagTranslationEntity> {
	constructor(
		@InjectRepository(TagTranslationEntity)
		protected readonly repository: Repository<TagTranslationEntity>
	) {
		super();
	}
}
