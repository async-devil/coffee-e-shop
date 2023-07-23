import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";

import { ProductTagsRepository } from "./product-tags.repository";

@ApiTags("product-tags")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductTagsController {
	constructor(private readonly repository: ProductTagsRepository) {}
}
