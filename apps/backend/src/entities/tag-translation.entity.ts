import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TagEntity } from "./tag.entity";

@Entity({ name: "tag_translation" })
export class TagTranslationEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int", name: "tag_id", unsigned: true })
	public tagId: number;

	@ManyToOne(() => TagEntity, (tag) => tag.translations, { onDelete: "CASCADE" })
	@JoinColumn({ name: "tag_id" })
	public tag: TagEntity;

	/** ISO 639-1 @example "en" */
	@Column({ type: "char", length: 2, unique: true })
	public language: string;

	/** @example "coffee" */
	@Column({ type: "text" })
	public name: string;
}
