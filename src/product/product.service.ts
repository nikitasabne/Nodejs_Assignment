import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_MODEL } from 'src/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './Schema/product.schema';
import { Model } from 'mongoose';
import { ProductIdDto } from './dto/product-id.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_MODEL)
    private readonly ProductModel: Model<ProductDocument>,
    private readonly dataPaginatorService: DataPaginatorService,
  ) {}

  async create(createProductDto: CreateProductDto, save_options?: SaveOptions) {
    const newProduct = new this.ProductModel(createProductDto);
    return await newProduct.save(save_options);
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
    return await this.ProductModel
      .findById(productIdDto.id, null, query_options)
      .exec();
  }
  }

  async update(productIdDto: ProductIdDto, updateProductDto: UpdateProductDto, query_options?: QueryOptions) {
    let options = { new: true };
    query_options && (options = { ...options, ...query_options });
    return await this.ProductModel
      .findByIdAndUpdate(productIdDto.id, updateProductDto, options)
      .exec();
  }

  async remove(productIdDto: ProductIdDto, query_options?: QueryOptions) {
    return await this.ProductModel
      .findByIdAndDelete(productIdDto.id, query_options)
      .exec();
  }
}
