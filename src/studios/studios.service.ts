import { Studio } from './entities/studio.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(Studio)
    private studioRepository: Repository<Studio>,
  ) {}

  async create(createStudioDto: CreateStudioDto) {
    const data = await this.studioRepository.save(createStudioDto);
    return {
      status: 201,
      message: 'success create data',
      data: data,
    };
  }

  async findAll() {
    const data = await this.studioRepository.find();
    if (data.length === 0) {
      throw new NotFoundException();
    }
    return {
      status: 200,
      message: 'success get data',
      data: data,
    };
  }

  async findOne(id: number) {
    const data = await this.studioRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    return {
      status: 200,
      message: 'success get data',
      data: data,
    };
  }

  async update(id: number, updateStudioDto: UpdateStudioDto) {
    const data = await this.studioRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    data.studio_number = updateStudioDto.studio_number;
    data.seat_capacity = updateStudioDto.seat_capacity;
    data.updated_at = new Date();
    await this.studioRepository.save(data);
    return {
      status: 200,
      message: 'success update data',
      data: data,
    };
  }

  async remove(id: number) {
    const data = await this.studioRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    data.deleted_at = new Date();
    const datas = await this.studioRepository.remove(data);
    return {
      status: 200,
      message: 'success remove data',
      data: datas,
    };
  }
}
