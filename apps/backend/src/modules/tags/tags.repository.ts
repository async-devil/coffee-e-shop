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

	public async createSubByParentId(dto: OperateTagByIdDto) {
		const parent = await this.getOneWhere(dto);

		const entity = new TagEntity();
		entity.parentId = parent.id;

		return await this.repository.save(entity);
	}

	public async getTree() {
		const entities = await this.repository.find({
			relations: { children: true, translations: true },
		});

		const roots = entities.filter((entity) => entity.parentId === null);

		const buildTree = (leaves: TagEntity[]): TagEntity[] => {
			return leaves.map((leaf) => {
				if (leaf.children === undefined) {
					leaf = entities.find((entity) => entity.id === leaf.id);
				}

				if (leaf.children.length === 0) return leaf;

				return Object.assign(leaf, { children: buildTree(leaf.children) });
			});
		};

		return buildTree(roots);
	}
}
