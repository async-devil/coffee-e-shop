import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: "Create user" })
	@Post("/")
	public async createUser(@Body() dto: { email: string }) {
		return await this.usersService.createUser(dto);
	}

	@ApiOperation({ summary: "Create user" })
	@Get("/:id")
	public async getUserById(@Param("id") id: string) {
		return await this.usersService.getUserById(id);
	}
}
