import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ProductEntity } from "./product.entity";

@Entity({ name: "product_edition" })
export class ProductEditionEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int", name: "product_id", unsigned: true })
	public productId: number;

	@ManyToOne(() => ProductEntity, (product) => product.editions, { onDelete: "CASCADE" })
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** @example "250g" */
	@Column({ type: "text" })
	public name: string;

	/** @example 259 */
	@Column({ type: "numeric", precision: 7, scale: 2 })
	public price: number;

	/** @example true */
	@Column({ type: "bool", default: true })
	public available: boolean;
}
