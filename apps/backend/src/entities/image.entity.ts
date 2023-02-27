import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "image" })
export class ImageEntity {
	/** @example "1"*/
	@PrimaryGeneratedColumn("increment")
	public id: string;

	/** @example "https://coffee-e-shop-images.s3.amazonaws.com/78dca846-4239-4e95-8930-f53fa35721f0.png" */
	@Column({ type: "text", nullable: false, unique: true })
	public url: string;

	/** @example "ethiopia-beans-1" */
	@Column({ type: "text", nullable: false })
	public name: string;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public created_at: Date;
}
