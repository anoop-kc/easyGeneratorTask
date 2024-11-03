import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

export class CreateUserCommand {
  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: CreateUserCommand) {
    const hashedPassword = await bcrypt.hash(command.password, 10);

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(command.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.userService.createUser({
      name: command.name,
      email: command.email,
      password: hashedPassword,
    });

    if (user) {
      const jwtToken = await this.authService.login(user);
      return { user: user, token: jwtToken };
    }
  }
}
