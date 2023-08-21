import { Controller, Delete, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { CategoriesRepository } from "./categories.repository";
import { OperateCategoryByIdDto } from "./operate-category-by-id.dto";

@ApiTags("categories")
@Controller("categories")
@UseFilters(TypeORMErrorFilter)
export class CategoriesController {
	constructor(private readonly repository: CategoriesRepository) {}

	@ApiBearerAuth()
	@Post("/")
	@UseGuards(AccessTokenGuard)
	public async createCategory() {
		return await this.repository.create();
	}

	@ApiBearerAuth()
	@Post("/:id/sub")
	@UseGuards(AccessTokenGuard)
	public async createSubCategoryByParentId(@Param() parameters: OperateCategoryByIdDto) {
		return await this.repository.createSubByParentId(parameters);
	}

	@Get("/tree")
	public async getTagsTree() {
		return await this.repository.getTree();
	}

	@Get("/:id")
	public async getCategoryById(@Param() parameters: OperateCategoryByIdDto) {
		return await this.repository.getById(parameters);
	}

	@ApiBearerAuth()
	@Delete("/:id")
	@UseGuards(AccessTokenGuard)
	public async deleteCategoryById(@Param() parameters: OperateCategoryByIdDto) {
		return await this.repository.deleteOneWhere(parameters);
	}
}
