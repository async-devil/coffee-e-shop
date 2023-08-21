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

import { CreateTagTranslationBodyDto } from "./dtos/create-tag-translation.dto";
import { OperateTagTranslationDto } from "./dtos/operate-tag-translation.dto";
import { UpdateTagTranslationBodyDto } from "./dtos/update-tag-translation.dto";
import { TagTranslationsRepository } from "./tag-translations.repository";

@ApiTags("tag-translations")
@Controller("tags")
@UseFilters(TypeORMErrorFilter)
export class TagTranslationsController {
	constructor(private readonly repository: TagTranslationsRepository) {}

	@ApiBearerAuth()
	@Post("/:tagId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async createTagTranslation(
		@Param() parameters: OperateTagTranslationDto,
		@Body() body: CreateTagTranslationBodyDto
	) {
		const dto = Object.assign(parameters, body);

		return await this.repository.create(dto);
	}

	@Get("/:tagId/translations/:language")
	public async getTagTranslation(@Param() parameters: OperateTagTranslationDto) {
		return await this.repository.getOneWhere(parameters);
	}

	@ApiBearerAuth()
	@Put("/:tagId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async updateTagTranslation(
		@Param() parameters: OperateTagTranslationDto,
		@Body() body: UpdateTagTranslationBodyDto
	) {
		const dto = Object.assign(parameters, body);

		return await this.repository.update(dto);
	}

	@ApiBearerAuth()
	@Delete("/:tagId/translations/:language")
	@UseGuards(AccessTokenGuard)
	public async deleteTagTranslation(@Param() parameters: OperateTagTranslationDto) {
		return await this.repository.deleteOneWhere(parameters);
	}
}
