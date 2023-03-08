import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "image" })
export class ImageEntity {
	/** @example 4 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example "https://coffee-e-shop-images.s3.amazonaws.com/ddb3b075-17e7-4f72-8f45-a48b84005ef1.png" */
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
