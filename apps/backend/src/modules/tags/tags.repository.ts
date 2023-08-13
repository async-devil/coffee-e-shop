import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { TagEntity } from "src/entities/tag.entity";

@Injectable()
export class TagsRepository extends EntityRepository<TagEntity> {
	constructor(
		@InjectRepository(TagEntity)
		protected readonly repository: Repository<TagEntity>
	) {
		super();
	}
}
