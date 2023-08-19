import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { TagTranslationEntity } from "./tag-translation.entity";

@Entity({ name: "tag" })
export class TagEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("identity")
	public id: number;

	/** @example 1 */
	@Column({ type: "int", name: "parent_id", unsigned: true, nullable: true })
	public parentId: number | null;

	@ManyToOne(() => TagEntity, { onDelete: "SET NULL" })
	@JoinColumn({ name: "parent_id" })
	public parent: TagEntity;

	@OneToMany(() => TagEntity, (tag) => tag.parent)
	public children: TagEntity[];

	@OneToMany(() => TagTranslationEntity, (tagTranslation) => tagTranslation.tag)
	public translations: TagTranslationEntity[];
}
