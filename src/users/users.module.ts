import { Module } from "@nestjs/common";

import { ImagesRepository } from "./images.repository";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, ImagesRepository],
})
export class UsersModule {}
