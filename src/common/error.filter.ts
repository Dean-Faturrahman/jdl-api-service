import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ZodError } from "zod";

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        const response = host.switchToHttp().getResponse()
        const errorResponse = exception.getResponse();

        const errorMessage =
            typeof errorResponse === 'object' && (errorResponse as any).message
                ? (errorResponse as any).message
                : errorResponse;

        if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json({
                status_code: exception.getStatus(),
                errors: errorMessage
            })
        } else {
            response.status(500).json({
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                errors: exception.message
            })
        }
    }
}