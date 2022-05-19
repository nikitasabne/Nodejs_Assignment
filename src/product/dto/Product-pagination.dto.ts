import { Type } from 'class-transformer';
import { PaginationDto } from 'nestjs-keyset-paginator/dist';
import { ProductPaginationFilterDto } from './Product-filter-pagination.dto';

export class ProductPaginationDto extends PaginationDto {
  @Type(() => ProductPaginationFilterDto)
  filter: ProductPaginationFilterDto[];
}
