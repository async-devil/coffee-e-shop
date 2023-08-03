import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { ImageEntity } from "./image.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: "product_image" })
export class ProductImageEntity {
	/** @example 1 */
	@PrimaryColumn({ type: "int", name: "product_id", unsigned: true })
	public productId: number;

	@ManyToOne(() => ProductEntity, (product) => product.images)
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** @example 1 */
	@PrimaryColumn({ type: "int", name: "image_id", unsigned: true })
	public imageId: number;

	@ManyToOne(() => ImageEntity)
	@JoinColumn({ name: "image_id" })
	public image: ImageEntity;
}
