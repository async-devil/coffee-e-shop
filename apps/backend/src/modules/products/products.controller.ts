import { Controller, Delete, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { OperateProductByIdDto } from "./operate-product-by-id.dto";
import { ProductsRepository } from "./products.repository";

@ApiTags("products")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductsController {
	constructor(private readonly productsService: ProductsRepository) {}

	@ApiBearerAuth()
	@Post("/")
	@UseGuards(AccessTokenGuard)
	public async createProduct() {
		return await this.productsService.create();
	}

	@Get("/:id")
	public async getProductById(@Param() params: OperateProductByIdDto) {
		return await this.productsService.getById(params);
	}

	@ApiBearerAuth()
	@Delete("/:id")
	@UseGuards(AccessTokenGuard)
	public async deleteProductById(@Param() params: OperateProductByIdDto) {
		return await this.productsService.deleteOneWhere(params);
	}
}
