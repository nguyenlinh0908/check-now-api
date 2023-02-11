import { UserLogoutDto } from './../dto/user-logout.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/services';
import { Token } from '../models';
import { ICurrentUser, IJwtPayload, ILoginToken } from '../interfaces';
import { GenAccessTokenDto, UserLoginDto } from '../dto';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AuthService {
  private readonly redis: Redis;
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userService.findOne({
      username: userLoginDto.username,
    });

    if (!user) {
      throw new Error(
        `Don't exist user with username: ${userLoginDto.username}`,
      );
    }

    const isMatch = this.comparePassword(userLoginDto.password, user.password);

    if (!isMatch) {
      throw new Error('password is not compare');
    }

    const loginTokens = await this.genTokenJwt(user);

    delete user?.password;
    return {
      ...loginTokens,
      user: user,
    };
  }

  async logout(user: ICurrentUser, userLogoutDto: UserLogoutDto) {
    let payloadAccessToken;
    let payloadRefreshToken;

    if (userLogoutDto.accessToken)
      payloadRefreshToken = await this.jwtService.verify(
        userLogoutDto.accessToken,
      );
    if (userLogoutDto.refreshToken)
      payloadAccessToken = await this.jwtService.verify(
        userLogoutDto.refreshToken,
      );

    if (
      (payloadRefreshToken && payloadRefreshToken?.id !== user?.id) ||
      (payloadAccessToken && payloadAccessToken?.id !== user?.id)
    )
      return false;

    await this.tokenRepository.delete({ token: userLogoutDto.refreshToken });
    if (userLogoutDto.accessToken) {
      this.refuseAccessToken(userLogoutDto.accessToken);
    }

    return true;
  }

  hashPassword(string): String {
    const saltRounds = +this.configService.get<number>('SALT_ROUNDS');
    return bcrypt.hashSync(string, saltRounds);
  }

  comparePassword(passwordCandidate, password): boolean {
    return bcrypt.compareSync(passwordCandidate, password);
  }

  async genTokenJwt(user) {
    const { id, username, role } = user;

    const payload: IJwtPayload = {
      id: id,
      username: username,
      role: role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_MINUTES'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_DAYS'),
    });

    const accessTokenDecoded = this.jwtService.verify(accessToken);
    const refreshTokenDecoded = this.jwtService.verify(refreshToken);

    this.tokenRepository.insert({
      token: refreshToken,
      userID: id,
      expires: refreshTokenDecoded.exp,
    });

    const tokenGroup: ILoginToken = {
      accessToken: accessToken,
      accessTokenExpires: accessTokenDecoded.exp,
      refreshToken: refreshToken,
      refreshTokenExpires: refreshTokenDecoded.exp,
    };

    return tokenGroup;
  }

  async refuseAccessToken(accessToken: string) {
    const user: ICurrentUser = await this.jwtService.verify(accessToken);
    const key = `rfs:${user.id}:accesstoken:${accessToken}`;
    const rf = await this.redis.set(
      key,
      '1',
      'EX',
      parseInt(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_MINUTES')),
    );

    return;
  }

  async createAccessToken(genAccessTokenDto: GenAccessTokenDto) {
    const token = await this.tokenRepository.findOne({
      where: { token: genAccessTokenDto.refreshToken },
    });

    if (!token) return false;

    const { id } = this.jwtService.verify(genAccessTokenDto.refreshToken);

    const user = await this.userService.findOne({ id: id });

    if (!user) return false;

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        username: user.username,
        role: user.role,
      }),
    };
  }

  async isAccessTokenLoggedOut(accessToken: string) {
    const user: ICurrentUser = await this.jwtService.verify(accessToken);
    const key = `rfs:${user.id}:accesstoken:${accessToken}`;

    const value = await this.redis.get(key);

    if (!value) return false;
    return true;
  }
}
