import { AuthLoginDto } from './../auth/dto/auth-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.userRepository.save(createUserDto);
    return 'data berhasil dibuat';
  }

  async findByEmail(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email, password: password },
    });
    return user;
  }

  async getAll() {
    const user = await this.userRepository.find();
    return {
      message: 200,
      status: 'success',
      data: user,
    };
  }
}
