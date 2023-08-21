import { Controller, Delete, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { OperateProductTagDto } from "./dtos/operate-product-tag.dto";
import { ProductTagsRepository } from "./product-tags.repository";

@ApiTags("product-tags")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductTagsController {
	constructor(private readonly repository: ProductTagsRepository) {}

	@ApiBearerAuth()
	@Post("/:productId/tags/:tagId")
	@UseGuards(AccessTokenGuard)
	public async linkTagToProduct(@Param() parameters: OperateProductTagDto) {
		return await this.repository.link(parameters);
	}

	@ApiBearerAuth()
	@Delete("/:productId/tags/:tagId")
	@UseGuards(AccessTokenGuard)
	public async unlinkTagFromProduct(@Param() parameters: OperateProductTagDto) {
		return await this.repository.unlink(parameters);
	}
}
