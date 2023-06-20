import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "image" })
export class ImageEntity {
	/** @example "ethiopia-beans-1" */
	@PrimaryColumn({ type: "text", nullable: false, unique: true })
	public name: string;

	/** @example "https://coffee-e-shop-images.s3.amazonaws.com/ethiopia-beans-1.png" */
	@Column({ type: "text", nullable: false, unique: true })
	public url: string;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public created_at: Date;
}
