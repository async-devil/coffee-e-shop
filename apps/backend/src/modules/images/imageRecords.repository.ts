import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ImageEntity } from "src/entities/image.entity";

@Injectable()
export class ImageRecordsRepository {
	constructor(
		@InjectRepository(ImageEntity) private readonly imageRepository: Repository<ImageEntity>
	) {}

	public async putRecord(name: string) {
		return await this.imageRepository.save({
			name,
		});
	}

	public async getRecord(name: string) {
		return await this.imageRepository.findOne({ where: { name } });
	}

	public async deleteRecord(name: string) {
		return await this.imageRepository.delete({ name });
	}
}
