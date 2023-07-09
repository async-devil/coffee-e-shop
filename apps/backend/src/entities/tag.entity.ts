import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { TagTranslationEntity } from "./tag-translation.entity";

@Entity({ name: "tag" })
export class TagEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	@OneToMany(() => TagTranslationEntity, (tagTranslation) => tagTranslation.tag)
	public translations: TagTranslationEntity[];
}
