import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { CreateUserDto } from './../../user/dto';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/modules/user/services';
import { CreateUserValidator } from '../validators';
import { AuthService } from '../services';
import { GenAccessTokenDto, UserLoginDto, UserLogoutDto } from '../dto';
import { responseFormat } from 'src/modules/helpers';
import { CurrentUser } from '../decorators';
import { ICurrentUser } from '../interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body(CreateUserValidator) body: CreateUserDto) {
    const data = await this.userService.create(body);
    return responseFormat(HttpStatus.CREATED, 'user created', data);
  }

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const data = await this.authService.login(body);
    return responseFormat(HttpStatus.OK, 'login success', data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: ICurrentUser, @Body() body: UserLogoutDto) {
    const logoutStatus = await this.authService.logout(user, body);
    if (!logoutStatus)
      return responseFormat(HttpStatus.BAD_REQUEST, 'logout fail');
    return responseFormat(HttpStatus.OK, 'logout success');
  }

  @Post('gen/access')
  async getAccessToken(@Body() genAccessTokenDto: GenAccessTokenDto) {
    const accessToken = await this.authService.createAccessToken(
      genAccessTokenDto,
    );
    return responseFormat(HttpStatus.OK, 'new access token', accessToken);
  }
}
