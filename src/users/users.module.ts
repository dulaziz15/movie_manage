import { MoviesService } from './../movies/movies.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from './../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MoviesService],
  controllers: [UsersController],
  providers: [UsersService, JwtService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
