import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { OrderEntity } from "src/entities/order.entity";

import { OrderItemsModule } from "./items/order-items.module";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([OrderEntity]),
		AuthModule,
		forwardRef(() => OrderItemsModule),
	],
	controllers: [OrdersController],
	providers: [OrdersRepository, OrdersService],
	exports: [OrdersRepository, OrdersService],
})
export class OrdersModule {}
