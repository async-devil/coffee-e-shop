import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityRepository } from "src/common/entity.repository";
import { ImageEntity } from "src/entities/image.entity";

import { CreateImageRecordDto } from "./dtos/create-image-record.dto";
import { OperateImageRecordByNameDto } from "./dtos/operate-image-record-by-name.dto";
import { UpdateImageRecordByName } from "./dtos/update-image-record-by-name.dto";

@Injectable()
export class ImageRecordsRepository extends EntityRepository<ImageEntity> {
	constructor(
		@InjectRepository(ImageEntity) protected readonly repository: Repository<ImageEntity>
	) {
		super();
	}

	public async create(dto: CreateImageRecordDto) {
		const entity = new ImageEntity();

		return await this.repository.save(Object.assign(entity, dto));
	}

	public async getByName(dto: OperateImageRecordByNameDto) {
		return await this.getOneWhere(dto);
	}

	public async updateByName(dto: UpdateImageRecordByName) {
		const entity = await this.getByName({ name: dto.name });

		entity.name = dto.updatedName;

		return await this.repository.save(entity);
	}

	public async deleteByName(dto: OperateImageRecordByNameDto) {
		return await this.deleteOneWhere(dto);
	}
}
