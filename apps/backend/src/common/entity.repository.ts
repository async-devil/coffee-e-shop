import { NotFoundException } from "@nestjs/common";
import { FindOptionsRelations, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

export abstract class EntityRepository<T extends ObjectLiteral> {
	protected abstract readonly repository: Repository<T>;

	/**
	 * Saves a given entity in the database. If entity does not exist in the database then inserts, otherwise updates.
	 * @throws {TypeORMError}
	 */
	public async save(entity: T) {
		return await this.repository.save(entity);
	}

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
