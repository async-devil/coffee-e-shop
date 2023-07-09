import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { OrderItemEntity } from "./order-item.entity";

export enum OrderState {
	CREATED = "created",
	PROCESSED = "processed",
	SENT = "sent",
	SUSPENDED = "suspended",
}

@Entity({ name: "order" })
export class OrderEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example "created" */
	@Column({ type: "enum", enum: OrderState, enumName: "order_state" })
	public state: OrderState;

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
	public orderItems: OrderItemEntity[];

	/** @example "example@mail.com" */
	@Column({ type: "text" })
	public email: string;

	/** @example "+380631234567" */
	@Column({ type: "text" })
	public phone_number: string;

	/** @example "John" */
	@Column({ type: "text" })
	public first_name: string;

	/** @example "Doe" */
	@Column({ type: "text" })
	public last_name: string;

	/** @example "Johnson" */
	@Column({ type: "text" })
	public middle_name: string;

	/** ISO 639-1 @example "uk" */
	@Column({ type: "char", length: 2 })
	public language: string;

	/** @example 1032 */
	@Column({ type: "numeric", precision: 7, scale: 2 })
	public price: number;

	/** ISO 3166-2 @example "ua" */
	@Column({ type: "char", length: 2 })
	public country: string;

	/** @example "Lviv Oblast" */
	@Column({ type: "text" })
	public region: string;

	/** @example "Lviv" */
	@Column({ type: "text" })
	public city: string;

	/** @example "Nalyvaika St" */
	@Column({ type: "text" })
	public address: string;

	/** @example "79000" */
	@Column({ type: "text" })
	public zip_code: string;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public created_at: Date;
}
