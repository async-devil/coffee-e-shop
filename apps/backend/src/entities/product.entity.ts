import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { CategoryEntity } from "./category.entity";
import { ProductEditionEntity } from "./product-edition.entity";
import { ProductImageEntity } from "./product-image.entity";
import { ProductTagEntity } from "./product-tag.entity";
import { ProductTranslationEntity } from "./product-translation.entity";

@Entity({ name: "product" })
export class ProductEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int" })
	public category_id: number;

	@OneToOne(() => CategoryEntity)
	@JoinColumn({ name: "category_id" })
	public category: CategoryEntity;

	@OneToMany(() => ProductEditionEntity, (productEdition) => productEdition.product)
	public editions: ProductEditionEntity[];

	@OneToMany(() => ProductImageEntity, (productImage) => productImage.product)
	public images: ProductImageEntity[];

	@OneToMany(() => ProductTranslationEntity, (productTranslation) => productTranslation.product)
	public translations: ProductTranslationEntity[];

	@OneToMany(() => ProductTagEntity, (productTag) => productTag.product)
	public tags: ProductTagEntity[];

	/** @example false */
	@Column({ type: "bool" })
	public archived: boolean;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public created_at: Date;
}
