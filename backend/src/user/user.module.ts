import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { CreateUserHandler } from './commands/create-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './User.controller';
import { LoginUserHandler } from './queries/login-user.handler';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserHandler,
    LoginUserHandler,
    AuthService,
    JwtService,
    JwtStrategy,
  ],
  exports: [UserService, AuthService, JwtService],
})
export class UserModule {}
