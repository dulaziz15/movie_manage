import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createStudioDto: CreateStudioDto) {
    return this.studiosService.create(createStudioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studiosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studiosService.update(+id, updateStudioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studiosService.remove(+id);
  }
}
