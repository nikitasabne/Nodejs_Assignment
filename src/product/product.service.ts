import { Inject, Injectable } from '@nestjs/common';
import { ENUM_AUTH_ROLES, PRODUCT_MODEL } from 'src/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './Schema/product.schema';
import { Model, QueryOptions, SaveOptions } from 'mongoose';
import { ProductIdDto } from './dto/product-id.dto';
import {
  ENUM_FILTER_OPERATOR_TYPE,
  filterDto,
  projectionDto,
} from 'nestjs-keyset-paginator';
import { DataPaginatorService } from '../data-paginator/data-paginator.service';
import { UserDocument } from '../user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_MODEL)
    private readonly ProductModel: Model<ProductDocument>,
    private readonly dataPaginatorService: DataPaginatorService,
  ) {}

  async create(createProductDto: CreateProductDto, save_options?: SaveOptions) {
    const newProduct = new this.ProductModel({
      ...createProductDto,
      published: false,
    });
    return await newProduct.save(save_options);
  }

  async findAll(
    user: UserDocument,
    skip = PAGINATION_SKIP,
    limit = PAGINATION_LIMIT,
    start_key?,
    sort_field?: string,
    sort_order?: number,
    filter?: filterDto[],
    projection?: projectionDto[],
  ) {
    !filter && (filter = []);
    user.role === ENUM_AUTH_ROLES.NORMAL &&
      filter.push({
        arr_value: undefined,
        mode: undefined,
        operator: ENUM_FILTER_OPERATOR_TYPE.eq,
        name: 'published',
        value: true,
      });
    return await this.dataPaginatorService.paginator.paginate(
      this.ProductModel,
      skip,
      limit,
      start_key,
      sort_field,
      sort_order,
      filter,
      projection,
    );
  }

  async findOne(productIdDto: ProductIdDto, query_options?: QueryOptions) {
    return await this.ProductModel.findById(
      productIdDto.id,
      null,
      query_options,
    ).exec();
  }

  async update(
    productIdDto: ProductIdDto,
    updateProductDto: UpdateProductDto,
    user_role: ENUM_AUTH_ROLES,
    query_options?: QueryOptions,
  ) {
    let options = { new: true };
    user_role === ENUM_AUTH_ROLES.NORMAL && delete updateProductDto.published;
    query_options && (options = { ...options, ...query_options });
    return await this.ProductModel.findByIdAndUpdate(
      productIdDto.id,
      updateProductDto,
      options,
    ).exec();
  }

  async remove(productIdDto: ProductIdDto, query_options?: QueryOptions) {
    return await this.ProductModel.findByIdAndDelete(
      productIdDto.id,
      query_options,
    ).exec();
  }
}
