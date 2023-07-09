import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ProductEntity } from "./product.entity";
import { TagEntity } from "./tag.entity";

@Entity({ name: "product_tag" })
export class ProductTagEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int" })
	public product_id: number;

	@ManyToOne(() => ProductEntity, (product) => product.tags)
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** @example 1 */
	@Column({ type: "int" })
	public tag_id: number;

	@ManyToOne(() => TagEntity)
	@JoinColumn({ name: "tag_id" })
	public tag: TagEntity;
}
