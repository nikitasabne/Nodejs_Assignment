import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { USER_MODEL } from 'src/constants';
import { filterDto, projectionDto } from 'nestjs-keyset-paginator';
import { DataPaginatorService } from '../data-paginator/data-paginator.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private readonly dataPaginatorService: DataPaginatorService,
  ) {}

  async getUserByEmail(email: string) {
    return await this.userModel
      .findOne({ email: email }, null, { lean: true })
      .exec();
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll(
    skip = PAGINATION_SKIP,
    limit = PAGINATION_LIMIT,
    start_key?,
    sort_field?: string,
    sort_order?: number,
    filter?: filterDto[],
    projection?: projectionDto[],
  ) {
    return await this.dataPaginatorService.paginator.paginate(
      this.userModel,
      skip,
      limit,
      start_key,
      sort_field,
      sort_order,
      filter,
      projection,
    );
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
