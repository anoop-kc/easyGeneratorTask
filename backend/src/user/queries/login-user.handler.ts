import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../user.schema';
import { AuthService } from 'src/auth/auth.service';

export class LoginUserQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(private readonly authService: AuthService) {}

  async execute(query: LoginUserQuery): Promise<any | null> {
    const validUser = await this.authService.validateUser(
      query.email,
      query.password,
    );

    if (validUser) {
      validUser.password = 'string';
      const jwtToken = await this.authService.login(validUser);
      return { user: validUser, token: jwtToken };
    } else {
      return null;
    }
  }
}
