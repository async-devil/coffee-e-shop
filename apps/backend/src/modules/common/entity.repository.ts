import { NotFoundException } from "@nestjs/common";
import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

export abstract class EntityRepository<T extends ObjectLiteral> {
	protected abstract readonly repository: Repository<T>;

	public async save(entity: T) {
		return await this.repository.save(entity);
	}

	public async getOneByProperty(property: FindOptionsWhere<T>) {
		const entity = await this.repository.findOne({
			where: property,
		});

		if (!entity) throw new NotFoundException();
		return entity;
	}

	public async deleteOneByProperty(property: FindOptionsWhere<T>) {
		await this.repository.delete(property);

		return {};
	}
}
