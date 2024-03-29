import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import { CategoryEntity } from "./category.entity";
import { ImageEntity } from "./image.entity";
import { ProductEditionEntity } from "./product-edition.entity";
import { ProductTagEntity } from "./product-tag.entity";
import { ProductTranslationEntity } from "./product-translation.entity";
import { TagEntity } from "./tag.entity";

@Entity({ name: "product" })
export class ProductEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("identity")
	public id: number;

	/** @example 1 */
	@Column({ type: "int", name: "category_id", unsigned: true, nullable: true })
	public categoryId: number | null;

	@ManyToOne(() => CategoryEntity, { onDelete: "SET NULL" })
	@JoinColumn({ name: "category_id" })
	public category: CategoryEntity;

	@OneToMany(() => ProductEditionEntity, (productEdition) => productEdition.product)
	public editions: ProductEditionEntity[];

	@OneToMany(() => ProductTranslationEntity, (productTranslation) => productTranslation.product)
	public translations: ProductTranslationEntity[];

	@ManyToMany(() => ImageEntity, { eager: true, cascade: true })
	@JoinTable({
		name: "product_image",
		joinColumn: { name: "product_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "image_id", referencedColumnName: "id" },
	})
	public images: ImageEntity[];

	@ManyToMany(() => TagEntity, { eager: true, cascade: true })
	@JoinTable({
		name: "product_tag",
		joinColumn: { name: "product_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" },
	})
	public tags: ProductTagEntity[];

	/** @example false */
	@Column({ type: "bool", default: false })
	public archived: boolean;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
		name: "created_at",
	})
	public createdAt: Date;
}
