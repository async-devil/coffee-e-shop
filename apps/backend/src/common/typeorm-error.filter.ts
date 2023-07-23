import {
	ArgumentsHost,
	Catch,
	ConflictException,
	ExceptionFilter,
	HttpException,
	InternalServerErrorException,
} from "@nestjs/common";
import { Response } from "express";
import { TypeORMError } from "typeorm";

@Catch(TypeORMError)
export class TypeORMErrorFilter implements ExceptionFilter {
	/** PostgreSQL error code for "duplicate key value violates unique constraint" exception */
	public static readonly UniqueConstraintViolationErrorCode = "23505";

	public catch(exception: TypeORMError, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();

		const message = exception.message;
		const code = (exception as unknown as { code: string }).code;

		const responseException = this.match(message, code);

		const status = responseException.getStatus();
		const body = responseException.getResponse();

		response.status(status).json(body);
	}

	public match(message: string, code: string): HttpException {
		if (code === TypeORMErrorFilter.UniqueConstraintViolationErrorCode) {
			return new ConflictException();
		}

		return new InternalServerErrorException(message);
	}
}
