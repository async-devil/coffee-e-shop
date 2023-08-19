import { Controller, Delete, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { OperateTagByIdDto } from "./operate-tag-by-id.dto";
import { TagsRepository } from "./tags.repository";

@ApiTags("tags")
@Controller("tags")
@UseFilters(TypeORMErrorFilter)
export class TagsController {
	constructor(private readonly repository: TagsRepository) {}

	@Get("/tree")
	public async getTagsTree() {
		return await this.repository.getTree();
	}

	@ApiBearerAuth()
	@Post("/")
	@UseGuards(AccessTokenGuard)
	public async createTag() {
		return await this.repository.create();
	}

	@Get("/:id")
	public async getById(@Param() params: OperateTagByIdDto) {
		return await this.repository.getById(params);
	}

	@ApiBearerAuth()
	@Delete("/:id")
	@UseGuards(AccessTokenGuard)
	public async deleteById(@Param() params: OperateTagByIdDto) {
		return await this.repository.deleteOneWhere(params);
	}

	@ApiBearerAuth()
	@Post("/:id/sub")
	@UseGuards(AccessTokenGuard)
	public async createSubTagByParentId(@Param() params: OperateTagByIdDto) {
		return await this.repository.createSubByParentId(params);
	}
}
