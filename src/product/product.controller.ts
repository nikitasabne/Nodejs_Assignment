import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductPaginationDto } from './dto/Product-pagination.dto';
import { ProductIdDto } from './dto/product-id.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Body() params: ProductPaginationDto) {
    return this.productService.findAll(
      params?.skip,
      params?.limit,
      params?.start_key,
      params?.sort?.field,
      params?.sort?.order,
      params?.filter,
      params?.projection,
    );
  }

  @Get(':id')
  findOne(@Param() id: ProductIdDto) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param() id: ProductIdDto) {
    return this.productService.remove(id);
  }
}
