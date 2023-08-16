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

import { CategoryTranslationsRepository } from "./category-translations.repository";
import { CreateCategoryTranslationBodyDto } from "./dtos/create-category-translation.dto";
import { OperateCategoryTranslationDto } from "./dtos/operate-category-translation.dto";
import { UpdateCategoryTranslationBodyDto } from "./dtos/update-category-translation.dto";

@ApiTags("category-translations")
@Controller("categories")
@UseFilters(TypeORMErrorFilter)
export class CategoryTranslationsController {
	constructor(private readonly repository: CategoryTranslationsRepository) {}

	@ApiBearerAuth()
	@Post("/:categoryId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async createTagTranslation(
		@Param() params: OperateCategoryTranslationDto,
		@Body() body: CreateCategoryTranslationBodyDto
	) {
		const dto = Object.assign(params, body);

		return await this.repository.create(dto);
	}

	@Get("/:categoryId/translations/:language")
	public async getTagTranslation(@Param() params: OperateCategoryTranslationDto) {
		return await this.repository.getOneWhere(params);
	}

	@ApiBearerAuth()
	@Put("/:categoryId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async updateTagTranslation(
		@Param() params: OperateCategoryTranslationDto,
		@Body() body: UpdateCategoryTranslationBodyDto
	) {
		const dto = Object.assign(params, body);

		return await this.repository.update(dto);
	}

	@ApiBearerAuth()
	@Delete("/:categoryId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async deleteTagTranslation(@Param() params: OperateCategoryTranslationDto) {
		return await this.repository.deleteOneWhere(params);
	}
}
