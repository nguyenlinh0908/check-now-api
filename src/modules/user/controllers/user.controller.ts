import { FilterUserDto } from './../dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';
import { UserService } from '../services';
import { pick } from 'lodash';
import { pickRegex } from 'src/helpers';
import { ICurrentUser } from 'src/modules/auth/interfaces';

@ApiTags('User')
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
  @Get('list')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'users' })
  async users(@Query() filterUser: FilterUserDto) {
    const options = pick(filterUser, ['page', 'limit']);
    const filter = pickRegex(filterUser, ['username']);
    const orderBy = pick(filterUser, ['order_by']);
    return await this.userService.find(options, filter, orderBy);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'profile' })
  @Roles(Role.ADMIN, Role.HOST, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  async profile(@CurrentUser() user: ICurrentUser) {
    return await this.userService.findById(Number(user.id));
  }
}
