import { ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';
import { ICurrentUser } from 'src/modules/auth/interfaces';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @ApiOkResponse({ description: 'all users' })
  async allUsers() {
    return await this.userService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  @ApiOkResponse({ description: 'users' })
  async users() {
    return await this.userService.find({ limit: 10, page: 1 });
  }
}
