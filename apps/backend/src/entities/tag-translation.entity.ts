import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { TagEntity } from "./tag.entity";

@Entity({ name: "tag_translation" })
@Unique(["tag", "language"])
export class TagTranslationEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("identity")
	public id: number;

	/** ISO 639-1 @example "en" */
	@Column({ type: "char", length: 2 })
	public language: string;

	/** @example 1 */
	@Column({ type: "int", name: "tag_id", unsigned: true })
	public tagId: number;

	@ManyToOne(() => TagEntity, (tag) => tag.translations, { onDelete: "CASCADE" })
	@JoinColumn({ name: "tag_id" })
	public tag: TagEntity;

	/** @example "coffee" */
	@Column({ type: "text" })
	public name: string;
}
