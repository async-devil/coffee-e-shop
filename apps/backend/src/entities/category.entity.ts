import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "category" })
export class CategoryEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example "2023-02-22T20:48:40.253Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public created_at: Date;
}
