import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductModule, ProductModel],
})
export class ProductModule {}
