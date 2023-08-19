import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { CategoryEntity } from "./category.entity";

@Entity({ name: "category_translation" })
@Unique(["category", "language"])
export class CategoryTranslationEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("identity")
	public id: number;

	@Column({ type: "int", name: "category_id", unsigned: true })
	public categoryId: number;

	@ManyToOne(() => CategoryEntity, { onDelete: "CASCADE" })
	@JoinColumn({ name: "category_id" })
	public category: CategoryEntity;

	/** ISO 639-1 @example "en" */
	@Column({ type: "char", length: 2 })
	public language: string;

	/** @example "coffee" */
	@Column({ type: "text" })
	public name: string;

	/** @example "this is coffee" */
	@Column({ type: "text" })
	public text: string;
}
