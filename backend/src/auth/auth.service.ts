import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { logger } from 'src/logger';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      logger.info(`User with email ${email} successfully logged in`);
      return user;
    }
    throw new NotFoundException(
      'We could not find a user with this email and password',
    );
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
