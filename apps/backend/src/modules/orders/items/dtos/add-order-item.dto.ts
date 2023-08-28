import { OmitType } from "@nestjs/swagger";

import { CreateOrderItemDto } from "./create-order-item.dto";

export class AddOrderItemDto extends OmitType(CreateOrderItemDto, ["orderId"]) {}
