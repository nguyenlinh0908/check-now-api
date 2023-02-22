import { FilterUserDto } from './../dto/filter-user.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'all users' })
  async allUsers() {
    return await this.userService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'users' })
  async users(@Param() filterUser: FilterUserDto) {
    return await this.userService.find(filterUser);
  }
}
