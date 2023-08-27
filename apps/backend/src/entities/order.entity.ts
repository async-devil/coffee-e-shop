import {
	Check,
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import { OrderItemEntity } from "./order-item.entity";

export enum OrderState {
	CREATED = "created",
	PROCESSED = "processed",
	SENT = "sent",
	SUSPENDED = "suspended",
}

@Entity({ name: "order" })
@Check(`"total_price" >= 0`)
export class OrderEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("identity")
	public id: number;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Generated("uuid")
	@Column({ type: "uuid" })
	public key: string;

	/** @example "created" */
	@Column({ type: "enum", enum: OrderState, enumName: "order_state", default: "created" })
	public state: OrderState;

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
	public orderItems: OrderItemEntity[];

	/** @example "example@mail.com" */
	@Column({ type: "text" })
	public email: string;

	/** @example "+380631234567" */
	@Column({ type: "text", name: "phone_number" })
	public phoneNumber: string;

	/** @example "John" */
	@Column({ type: "text", name: "first_name" })
	public firstName: string;

	/** @example "Doe" */
	@Column({ type: "text", name: "last_name" })
	public lastName: string;

	/** @example "Johnson" */
	@Column({ type: "text", name: "middle_name" })
	public middleName: string;

	/** ISO 639-1 @example "uk" */
	@Column({ type: "char", length: 2 })
	public language: string;

	/** @example 1032 */
	@Column({
		type: "numeric",
		name: "total_price",
		precision: 7,
		scale: 2,
		default: 0,
	})
	public totalPrice: number;

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
	@Column({ type: "text", name: "zip_code" })
	public zipCode: string;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
		name: "created_at",
	})
	public createdAt: Date;
}
