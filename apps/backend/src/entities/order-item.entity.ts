import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: "order_item" })
export class OrderItemEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int", name: "order_id", unsigned: true })
	public orderId: number;

	@ManyToOne(() => OrderEntity, { onDelete: "CASCADE" })
	@JoinColumn({ name: "order_id" })
	public order: OrderEntity;

	/** @example 1 */
	@Column({ type: "int", name: "product_id", unsigned: true })
	public productId: number;

	@ManyToOne(() => ProductEntity)
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** Consistent name @example "coffee" */
	@Column({ type: "text" })
	public name: string;

	/** Consistent name @example "filter one" */
	@Column({ type: "text", name: "edition_name" })
	public editionName: string;

	/** Consistent price @example 259 */
	@Column({ type: "numeric", precision: 7, scale: 2 })
	public price: number;

	/** @example 2 */
	@Column({ type: "int" })
	public amount: number;

	/** @example 518 */
	@Column({ type: "numeric", name: "total_price", precision: 7, scale: 2 })
	public totalPrice: number;
}
