import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ProductTranslationEntity } from "src/entities/product-translation.entity";

import { CreateProductTranslationDto } from "./dtos/create-product-translation.dto";
import { GetProductTranslationByLanguageDto } from "./dtos/get-product-translation-by-language.dto";
import { UpdateProductTranslationByLanguageDto } from "./dtos/update-product-translation-by-language.dto";

@Injectable()
export class ProductTranslationsRepository extends EntityRepository<ProductTranslationEntity> {
	constructor(
		@InjectRepository(ProductTranslationEntity)
		protected readonly repository: Repository<ProductTranslationEntity>
	) {
		super();
	}

	/** @throws {TypeORMError} */
	public async create(dto: CreateProductTranslationDto) {
		const entity = new ProductTranslationEntity();

		return await this.save(Object.assign(entity, dto));
	}

	/**
	 * Finds translation by language and product linked to it. If not found - throws
	 * @throws {NotFoundException}
	 */
	public async getByLanguage(dto: GetProductTranslationByLanguageDto) {
		return await this.getOneWhere(dto);
	}

	/**
	 * Updates translation by language and product linked to it. If not found - throws
	 * @throws {NotFoundException}
	 * @throws {TypeORMError}
	 */
	public async updateByLanguage(dto: UpdateProductTranslationByLanguageDto) {
		const entity = await this.getByLanguage({
			product_id: dto.product_id,
			language: dto.language,
		});

		const updatedEntity = Object.assign(entity, dto);

		return await this.save(updatedEntity);
	}
}
