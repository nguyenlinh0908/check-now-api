import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req, payload): Promise<any> {
    const token = req.headers?.authorization?.split(' ')[1];
    const isAccessToken = await this.authService.isAccessTokenLoggedOut(token);
    if (isAccessToken)
      throw new ConflictException({
        errorCode: 'ACCESS_TOKEN_INVALID',
        message: 'Access Token Logged Out',
      });

    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
