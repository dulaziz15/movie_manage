import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable, Body } from '@nestjs/common';
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

  async getAll(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return {
      status: 200,
      message: 'success',
      data: user,
    };
  }

  async update(@Body() updateUserDto: UpdateUserDto, id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.avatar = updateUserDto.avatar;
    user.is_admin = updateUserDto.is_admin;
    user.updated_at = new Date();

    await this.userRepository.save(user);

    return {
      status: 200,
      message: 'updated successfully',
      data: user,
    };
  }

  async check(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }
}
