import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CategoryEntity } from "./category.entity";

@Entity({ name: "category_translation" })
export class CategoryTranslationEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	@Column({ type: "int" })
	public category_id: number;

	@ManyToOne(() => CategoryEntity)
	@JoinColumn({ name: "category_id" })
	public category: CategoryEntity;

	/** ISO 639-1 @example "en" */
	@Column({ type: "char", length: 2, unique: true })
	public language: string;

	/** @example "coffee" */
	@Column({ type: "text" })
	public name: string;

	/** @example "this is coffee" */
	@Column({ type: "text" })
	public text: string;
}
