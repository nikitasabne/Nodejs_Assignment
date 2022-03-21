import { Inject, Injectable } from '@nestjs/common';
import { CAT_MODEL } from 'src/constants';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatDocument } from './entities/cat.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatService {
  constructor(
    @Inject(CAT_MODEL) private readonly catModel: Model<CatDocument>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<CatDocument> {
    return await this.catModel.create(createCatDto);
  }

  async findAll(): Promise<CatDocument[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<CatDocument> {
    return await this.catModel.findById(id).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<CatDocument> {
    return await this.catModel.findByIdAndUpdate(id, updateCatDto).exec();
  }

  async remove(id: string) {
    return await this.catModel.findByIdAndDelete(id).exec();
  }

  async findCatByOwnerId(user_id: string, cat_id: string) {
    return await this.catModel
      .findOne({ _id: cat_id, owner_id: user_id })
      .exec();
  }
}
