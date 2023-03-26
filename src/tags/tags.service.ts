import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const data = await this.tagRepository.create(createTagDto);
    await this.tagRepository.save(data);
    return {
      status: 201,
      message: 'success to create',
      data: data,
    };
  }

  async findAll() {
    const data = await this.tagRepository.find();

    if (data.length === 0) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'success to find all',
      data: data,
    };
  }

  async findOne(id: number) {
    const data = await this.tagRepository.findOne({ where: { id: id } });

    if (!data) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'success to find one',
      data: data,
    };
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const data = await this.tagRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    data.name = updateTagDto.name;
    data.update_at = new Date();
    await this.tagRepository.save(data);
    return {
      status: 200,
      message: 'success to update',
      data: data,
    };
  }

  async remove(id: number) {
    const data = await this.tagRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    await this.tagRepository.remove(data);
    return {
      status: 200,
      message: 'success to remove',
      data: data,
    };
  }

  async checkTag(singleTag: number) {
    const data = await this.tagRepository.findOne({ where: { id: singleTag } });
    return data;
  }
}
