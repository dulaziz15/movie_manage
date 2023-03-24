import { User } from './../users/entities/user.entity';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validate(authLoginDto);

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
