import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";

import { TagTranslationsRepository } from "./tag-translations.repository";

@ApiTags("tag-translations")
@Controller("tags")
@UseFilters(TypeORMErrorFilter)
export class TagTranslationsController {
	constructor(private readonly repository: TagTranslationsRepository) {}
}
