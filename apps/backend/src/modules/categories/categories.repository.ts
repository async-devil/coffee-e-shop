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

	public async createSubByParentId(dto: OperateCategoryByIdDto) {
		const parent = await this.getOneWhere(dto);

		const entity = new CategoryEntity();
		entity.parentId = parent.id;

		return await this.repository.save(entity);
	}

	public async getTree() {
		const entities = await this.repository.find({
			relations: { children: true, translations: true },
		});

		const roots = entities.filter((entity) => entity.parentId === null);

		const buildTree = (leaves: CategoryEntity[]): CategoryEntity[] => {
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
