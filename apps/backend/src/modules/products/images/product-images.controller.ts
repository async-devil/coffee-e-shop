import { Controller, Delete, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { OperateProductImageDto } from "./dtos/operate-product-image.dto";
import { ProductImagesRepository } from "./product-images.repository";

@ApiTags("product-images")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductImagesController {
	constructor(private readonly repository: ProductImagesRepository) {}

	@ApiBearerAuth()
	@Post("/:productId/images/:imageId")
	@UseGuards(AccessTokenGuard)
	public async linkImageToProduct(@Param() params: OperateProductImageDto) {
		return await this.repository.link(params);
	}

	@ApiBearerAuth()
	@Delete("/:productId/images/:imageId")
	@UseGuards(AccessTokenGuard)
	public async unlinkImageFromProduct(@Param() params: OperateProductImageDto) {
		return await this.repository.unlink(params);
	}
}
