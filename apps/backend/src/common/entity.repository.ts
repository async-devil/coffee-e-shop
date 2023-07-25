import { NotFoundException } from "@nestjs/common";
import { FindOptionsRelations, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

export abstract class EntityRepository<T extends ObjectLiteral> {
	protected abstract readonly repository: Repository<T>;

	/**
	 * Finds first entity by a given find options. If entity was not found in the database - throws
	 * @throws {NotFoundException}
	 */
	public async getOneWhere(where: FindOptionsWhere<T>, relations?: FindOptionsRelations<T>) {
		const entity = await this.repository.findOne({
			where,
			relations,
		});

		if (!entity) throw new NotFoundException();
		return entity;
	}

	/**
	 * Deletes entities by a given criteria. Does not check if entity exist in the database
	 */
	public async deleteOneWhere(where: FindOptionsWhere<T>) {
		await this.repository.delete(where);

		return {};
	}
}
