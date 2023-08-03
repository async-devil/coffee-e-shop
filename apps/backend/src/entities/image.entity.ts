import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "image" })
export class ImageEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example "ethiopia-beans-1" */
	@Column({ type: "text", unique: true })
	public name: string;

	/** @example "https://coffee-e-shop-images.s3.amazonaws.com/ethiopia-beans-1.png" */
	@Column({ type: "text", unique: true })
	public url: string;

	/**
	 * Shows if the image is hosted on CDN or only a record
	 * @example true
	 */
	@Column({ type: "bool", name: "is_owned", default: false })
	public isOwned: boolean;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
		name: "created_at",
	})
	public createdAt: Date;
}
