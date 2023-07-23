import { Controller, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";
import { AccessTokenGuard } from "src/guards/access-token.guard";

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
		return await this.productsService.createProduct();
	}

	@Get("/:id")
	public async getProductById(@Param("id") id: number) {
		return await this.productsService.getProductById(id);
	}
}
