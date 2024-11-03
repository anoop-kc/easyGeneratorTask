import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.quard';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { User, UserSchema } from './user.schema';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.handler';
import { LoginUserQuery } from './queries/login-user.handler';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('createUser')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async register(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const createdUser = await this.commandBus.execute(
      new CreateUserCommand(name, email, password),
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      userObj: createdUser,
    };
  }

  @Post('loginUser')
  //   @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'User found.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'We could not find a user with this email and password',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getUserProfile(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const validUser = await this.queryBus.execute(
      new LoginUserQuery(email, password),
    );

    return {
      statusCode: HttpStatus.FOUND,
      message: 'User created successfully',
      userObj: validUser,
    };
  }
}
