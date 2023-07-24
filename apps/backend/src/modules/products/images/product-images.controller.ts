import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";

import { ProductImagesRepository } from "./product-images.repository";

@ApiTags("product-images")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductImagesController {
	constructor(private readonly repository: ProductImagesRepository) {}
}
