import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { OrderItemEntity } from "src/entities/order-item.entity";
import { AuthModule } from "src/modules/auth/auth.module";
import { ProductsModule } from "src/modules/products/products.module";

import { OrderItemsController } from "./order-items.controller";
import { OrderItemsRepository } from "./order-items.repository";
import { OrderItemsService } from "./order-items.service";
import { OrdersModule } from "../orders.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([OrderItemEntity]),
		AuthModule,
		ProductsModule,
		forwardRef(() => OrdersModule),
	],
	controllers: [OrderItemsController],
	providers: [OrderItemsRepository, OrderItemsService],
	exports: [OrderItemsRepository, OrderItemsService],
})
export class OrderItemsModule {}
