import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { ProductEntity } from "./product.entity";
import { TagEntity } from "./tag.entity";

@Entity({ name: "product_tag" })
export class ProductTagEntity {
	/** @example 1 */
	@PrimaryColumn({ type: "int", name: "product_id", unsigned: true })
	public productId: number;

	@ManyToOne(() => ProductEntity, (product) => product.tags)
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** @example 1 */
	@PrimaryColumn({ type: "int", name: "tag_id", unsigned: true })
	public tagId: number;

	@ManyToOne(() => TagEntity)
	@JoinColumn({ name: "tag_id" })
	public tag: TagEntity;
}
