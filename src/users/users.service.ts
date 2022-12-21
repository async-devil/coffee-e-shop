import { Injectable } from "@nestjs/common";

import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	public async createUser(dto: { email: string }) {
		return await this.usersRepository.create(dto);
	}

	public async getUserById(id: string) {
		return await this.usersRepository.getOneById(id);
	}
}
