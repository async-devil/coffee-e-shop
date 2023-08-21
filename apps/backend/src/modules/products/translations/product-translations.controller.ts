import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseFilters,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import {
	CreateProductTranslationParametersDto,
	CreateProductTranslationBodyDto,
} from "./dtos/create-product-translation.dto";
import { DeleteProductTranslationByLanguageDto } from "./dtos/delete-product-translation-by-language.dto";
import { GetProductTranslationByLanguageDto } from "./dtos/get-product-translation-by-language.dto";
import {
	UpdateProductTranslationByLanguageParametersDto,
	UpdateProductTranslationByLanguageBodyDto,
} from "./dtos/update-product-translation-by-language.dto";
import { ProductTranslationsRepository } from "./product-translations.repository";

@ApiTags("product-translations")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductTranslationsController {
	constructor(private readonly repository: ProductTranslationsRepository) {}

	@ApiBearerAuth()
	@Post("/:productId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async createProductTranslation(
		@Param() parameters: CreateProductTranslationParametersDto,
		@Body() dto: CreateProductTranslationBodyDto
	) {
		const entityData = Object.assign(dto, parameters);

		return await this.repository.create(entityData);
	}

	@Get("/:productId/translations/:language")
	public async getProductTranslationByLanguage(
		@Param() parameters: GetProductTranslationByLanguageDto
	) {
		return await this.repository.getByLanguage(parameters);
	}

	@ApiBearerAuth()
	@Put("/:productId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async updateProductTranslationByLanguage(
		@Param() parameters: UpdateProductTranslationByLanguageParametersDto,
		@Body() dto: UpdateProductTranslationByLanguageBodyDto
	) {
		const updateInfo = Object.assign(dto, parameters);

		return await this.repository.updateByLanguage(updateInfo);
	}

	@ApiBearerAuth()
	@Delete("/:productId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async deleteProductTranslationByLanguage(
		@Param() parameters: DeleteProductTranslationByLanguageDto
	) {
		return await this.repository.deleteOneWhere(parameters);
	}
}
