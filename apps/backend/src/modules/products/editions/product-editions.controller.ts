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
	CreateProductEditionParametersDto,
} from "./dtos/create-product-edition.dto";
import { DeleteProductEditionByIdDto } from "./dtos/delete-product-edition-by-id.dto";
import { GetProductEditionByIdDto } from "./dtos/get-product-edition-by-id.dto";
import {
	UpdateProductEditionByIdBodyDto,
	UpdateProductEditionByIdParametersDto,
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
		@Param() parameters: CreateProductEditionParametersDto,
		@Body() body: CreateProductEditionBodyDto
	) {
		const dto = Object.assign(body, parameters);

		return await this.repository.create(dto);
	}

	@Get("/:productId/editions/:id")
	public async getProductEditionById(@Param() parameters: GetProductEditionByIdDto) {
		return await this.repository.getById(parameters);
	}

	@ApiBearerAuth()
	@Put("/:productId/editions/:id")
	@UseGuards(AccessTokenGuard)
	public async updateProductEditionById(
		@Param() parameters: UpdateProductEditionByIdParametersDto,
		@Body() body: UpdateProductEditionByIdBodyDto
	) {
		const dto = Object.assign(body, parameters);

		return await this.repository.updateById(dto);
	}

	@ApiBearerAuth()
	@Delete("/:productId/editions/:id")
	@UseGuards(AccessTokenGuard)
	public async deleteProductEditionById(@Param() parameters: DeleteProductEditionByIdDto) {
		return await this.repository.deleteOneWhere(parameters);
	}
}
