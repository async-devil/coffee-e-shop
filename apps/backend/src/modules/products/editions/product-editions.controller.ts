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

import {
	CreateProductEditionBodyDto,
	CreateProductEditionParamsDto,
} from "./dtos/create-product-edition.dto";
import { DeleteProductEditionByIdDto } from "./dtos/delete-product-edition-by-id.dto";
import { GetProductEditionByIdDto } from "./dtos/get-product-edition-by-id.dto";
import {
	UpdateProductEditionByIdBodyDto,
	UpdateProductEditionByIdParamsDto,
} from "./dtos/update-product-edition-by-id.dto";
import { ProductEditionsRepository } from "./product-editions.repository";

@ApiTags("product-editions")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductEditionsController {
	constructor(private readonly repository: ProductEditionsRepository) {}

	@ApiBearerAuth()
	@Post("/:productId/editions")
	@UseGuards(AccessTokenGuard)
	public async createProductEdition(
		@Param() params: CreateProductEditionParamsDto,
		@Body() body: CreateProductEditionBodyDto
	) {
		const dto = Object.assign(body, params);

		return await this.repository.create(dto);
	}

	@Get("/:productId/editions/:id")
	public async getProductEditionById(@Param() params: GetProductEditionByIdDto) {
		return await this.repository.getById(params);
	}

	@ApiBearerAuth()
	@Put("/:productId/editions/:id")
	@UseGuards(AccessTokenGuard)
	public async updateProductEditionById(
		@Param() params: UpdateProductEditionByIdParamsDto,
		@Body() body: UpdateProductEditionByIdBodyDto
	) {
		const dto = Object.assign(body, params);

		return await this.repository.updateById(dto);
	}

	@ApiBearerAuth()
	@Delete("/:productId/editions/:id")
	@UseGuards(AccessTokenGuard)
	public async deleteProductEditionById(@Param() params: DeleteProductEditionByIdDto) {
		return await this.repository.deleteOneWhere(params);
	}
}
