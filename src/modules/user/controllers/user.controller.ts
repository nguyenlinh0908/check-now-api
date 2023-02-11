import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';
import { ICurrentUser } from 'src/modules/auth/interfaces';
import { responseFormat } from 'src/modules/helpers';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async allUsers() {
    const allUsers = await this.userService.findAll();
    return responseFormat(HttpStatus.OK, 'all users', allUsers);
  }
}
