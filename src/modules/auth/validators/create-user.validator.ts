import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto';
import { UserService } from 'src/modules/user/services';
import { AuthService } from '../services';

@Injectable()
export class CreateUserValidator implements PipeTransform {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async transform(createUserDto: CreateUserDto, metadata: ArgumentMetadata) {
    const isExist = await this.userService.isExistUser({
      username: createUserDto.username,
    });
    if (isExist) {
      throw new HttpException(
        'user is be existed in system',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { password: passwordCandidate } = createUserDto;
    const password = this.authService.hashPassword(passwordCandidate);

    return { ...createUserDto, password };
  }
}
