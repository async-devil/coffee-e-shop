import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ImageEntity } from "src/entities/image.entity";

@Injectable()
export class ImageRecordsRepository {
	constructor(
		@InjectRepository(ImageEntity) private readonly imageRepository: Repository<ImageEntity>
	) {}

	public async putRecord(key: string, name: string) {
		return await this.imageRepository.save({
			key,
			name,
		});
	}

	public async getRecord(key: string) {
		return await this.imageRepository.findOne({ where: { key } });
	}

	public async deleteRecord(key: string) {
		return await this.imageRepository.delete({ key });
	}
}
