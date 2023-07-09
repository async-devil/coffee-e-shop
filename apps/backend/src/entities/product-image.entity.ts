import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ImageEntity } from "./image.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: "product_image" })
export class ProductImageEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int" })
	public product_id: number;

	@ManyToOne(() => ProductEntity, (product) => product.images)
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** @example 1 */
	@Column({ type: "int" })
	public image_id: number;

	@ManyToOne(() => ImageEntity)
	@JoinColumn({ name: "image_id" })
	public image: ImageEntity;
}
