import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { CreateUserDto } from './../../user/dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateUserValidator } from '../validators';
import { AuthService } from '../services';
import { GenAccessTokenDto, UserLoginDto, UserLogoutDto } from '../dto';
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
    return await this.userService.create(body);
  }

  @ApiOkResponse({ description: 'Login successfully.' })
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return await this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: ICurrentUser, @Body() body: UserLogoutDto) {
    return await this.authService.logout(user, body);
  }

  @Post('gen/access')
  async getAccessToken(@Body() genAccessTokenDto: GenAccessTokenDto) {
    return await this.authService.createAccessToken(genAccessTokenDto);
  }
}
