import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ProductEntity } from "./product.entity";

@Entity({ name: "product_edition" })
export class ProductEditionEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int" })
	public product_id: number;

	@ManyToOne(() => ProductEntity, (product) => product.editions)
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** @example "250g" */
	@Column({ type: "text" })
	public name: string;

	/** @example 259 */
	@Column({ type: "numeric", precision: 7, scale: 2 })
	public price: number;

	/** @example true */
	@Column({ type: "bool" })
	public available: boolean;
}
