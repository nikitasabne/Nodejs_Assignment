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
import { Roles } from '../common/decorators/roles.decorator';
import { ENUM_AUTH_ROLES } from '../constants';
import { UserDocument } from '../user/entities/user.entity';
import { AuthUser } from '../common/decorators/auth-user.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(ENUM_AUTH_ROLES.ADMIN, ENUM_AUTH_ROLES.NORMAL)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN, ENUM_AUTH_ROLES.NORMAL)
  @Get()
  findAll(
    @Body() params: ProductPaginationDto,
    @AuthUser() user: UserDocument,
  ) {
    return this.productService.findAll(
      user,
      params?.skip,
      params?.limit,
      params?.start_key,
      params?.sort?.field,
      params?.sort?.order,
      params?.filter,
      params?.projection,
    );
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN, ENUM_AUTH_ROLES.NORMAL)
  @Get(':id')
  findOne(@Param() id: ProductIdDto) {
    return this.productService.findOne(id);
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN, ENUM_AUTH_ROLES.NORMAL)
  @Patch(':id')
  update(
    @Param() id: ProductIdDto,
    @Body() updateProductDto: UpdateProductDto,
    @AuthUser() user: UserDocument,
  ) {
    return this.productService.update(id, updateProductDto, user.role);
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN, ENUM_AUTH_ROLES.NORMAL)
  @Delete(':id')
  remove(@Param() id: ProductIdDto) {
    return this.productService.remove(id);
  }
}
