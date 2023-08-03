import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ProductEntity } from "./product.entity";

@Entity({ name: "product_translation" })
export class ProductTranslationEntity {
	/** @example 1 */
	@PrimaryGeneratedColumn("increment")
	public id: number;

	/** @example 1 */
	@Column({ type: "int", name: "product_id", unsigned: true })
	public productId: number;

	@ManyToOne(() => ProductEntity, (product) => product.translations)
	@JoinColumn({ name: "product_id" })
	public product: ProductEntity;

	/** ISO 639-1 @example "en" */
	@Column({ type: "char", length: 2, unique: true })
	public language: string;

	/** @example "coffee" */
	@Column({ type: "text" })
	public name: string;

	/** @example "coffee-beans" */
	@Column({ type: "text" })
	public description: string;

	/** @example "coffee-beans" */
	@Column({ type: "text", name: "preview_description" })
	public previewDescription: string;

	/** @example "this is coffee" */
	@Column({ type: "text" })
	public text: string;
}
