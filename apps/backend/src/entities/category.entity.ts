import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CategoryTranslationEntity } from "./category-translation.entity";

@Entity({ name: "category" })
export class CategoryEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("identity")
	public id: number;

	@OneToMany(() => CategoryTranslationEntity, (translation) => translation.category)
	public translations: CategoryTranslationEntity[];

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
		name: "created_at",
	})
	public createdAt: Date;
}
