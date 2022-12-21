import { randomUUID } from "crypto";

import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

@Injectable()
export class UsersRepository {
	private readonly dynamoDB: DocumentClient;

	private readonly usersTableName = process.env.USERS_TABLE_NAME;
	private readonly uniquesTableName = process.env.UNIQUES_TABLE_NAME;

	constructor() {
		if (process.env.IS_OFFLINE === "true") {
			this.dynamoDB = new DynamoDB.DocumentClient({
				region: "localhost",
				endpoint: process.env.DYNAMODB_ENDPOINT,
			});
		} else {
			this.dynamoDB = new DynamoDB.DocumentClient();
		}
	}

	public async create(dto: { email: string }) {
		const user = {
			id: randomUUID(),
			email: dto.email,
			createdAt: new Date().toISOString(),
		};

		try {
			await this.dynamoDB
				.transactWrite({
					TransactItems: [
						{
							Put: {
								// Email duplication check
								TableName: this.uniquesTableName,
								ConditionExpression: "attribute_not_exists(#pk)",
								ExpressionAttributeNames: {
									"#pk": "value",
								},
								Item: {
									value: dto.email,
									type: "email",
								},
							},
						},
						{
							Put: {
								TableName: this.usersTableName,
								Item: user,
							},
						},
					],
				})
				.promise();
		} catch (err) {
			const error = err as Error;

			if (error.name === "TransactionCanceledException")
				throw new ConflictException("Duplicate email");

			throw new InternalServerErrorException(err);
		}

		return user;
	}

	public async getOneById(id: string) {
		try {
			const result = await this.dynamoDB
				.get({
					TableName: this.usersTableName,
					Key: { id },
				})
				.promise();

			if (!result.Item) {
				throw new NotFoundException("User not found");
			}

			return result.Item;
		} catch (err) {
			if (err instanceof NotFoundException) throw err;

			throw new InternalServerErrorException(err);
		}
	}
}
