import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";

import { ProductEditionsRepository } from "./product-editions.repository";

@ApiTags("product-editions")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductEditionsController {
	constructor(private readonly repository: ProductEditionsRepository) {}
}
