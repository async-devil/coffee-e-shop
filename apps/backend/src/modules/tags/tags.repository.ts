import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { TagEntity } from "src/entities/tag.entity";

import { OperateTagByIdDto } from "./operate-tag-by-id.dto";

@Injectable()
export class TagsRepository extends EntityRepository<TagEntity> {
	constructor(
		@InjectRepository(TagEntity)
		protected readonly repository: Repository<TagEntity>
	) {
		super();
	}

	public async create() {
		const entity = new TagEntity();

		return await this.repository.save(entity);
	}

	public async getById(dto: OperateTagByIdDto) {
		return await this.getOneWhere(dto, { translations: true });
	}
}