import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "image" })
export class ImageEntity {
	/** @example "78dca846-4239-4e95-8930-f53fa35721f0.png" */
	@PrimaryColumn({ type: "text", nullable: false, unique: true })
	public key: string;

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
