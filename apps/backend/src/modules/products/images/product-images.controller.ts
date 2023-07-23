import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TypeORMErrorFilter } from "src/common/typeorm-error.filter";

@ApiTags("product-images")
@Controller("products")
@UseFilters(TypeORMErrorFilter)
export class ProductImagesController {}
