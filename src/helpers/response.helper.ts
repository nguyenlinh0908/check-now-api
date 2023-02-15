import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpAdapterHost } from '@nestjs/core';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: 200,
        messages: ['Success'],
        success: true,
        data: data || {},
      })),
    );
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException | unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string[] = ['Internal server error!'];

    console.log(exception);
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const exceptionResponse = exception.getResponse() || exception.message;

      if (
        exceptionResponse &&
        exceptionResponse['message'] &&
        exceptionResponse['message'] instanceof Array
      ) {
        message = exceptionResponse['message'];
      } else {
        message = [
          (exceptionResponse &&
            (exceptionResponse['message'] || exceptionResponse.toString())) ||
            'Internal server error!',
        ];
      }
    }

    if (exception && exception['code'] && exception['code'] == 'ENOENT') {
      httpStatus = 404;
      message = ['Not found!'];
    }

    const responseBody = {
      statusCode: httpStatus,
      messages: message,
      success: false,
      data: null,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
