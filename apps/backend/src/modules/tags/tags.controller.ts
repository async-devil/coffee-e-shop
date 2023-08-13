import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";

import { TagsRepository } from "./tags.repository";

@ApiTags("tags")
@Controller("tags")
@UseFilters(TypeORMErrorFilter)
export class TagsController {
	constructor(private readonly repository: TagsRepository) {}
}
