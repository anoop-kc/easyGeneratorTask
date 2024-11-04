import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service'; // r AuthService that handles user retrieval
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from the Authorization header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use the same secret used to sign the JWT
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findById(payload.sub); // Assumes r payload has a 'sub' field with user ID
    if (!user) {
      throw new UnauthorizedException(); // If user is not found, throw an exception
    }
    return user; // Return the user object or any other value  want
  }
}
