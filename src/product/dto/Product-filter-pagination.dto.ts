import { filterDto } from 'nestjs-keyset-paginator';
import { ProductSchema } from '../Schema/product.schema';

export class ProductPaginationFilterDto extends filterDto {
  @AllowedMongoFields(Object.keys(ProductSchema.paths))
  name: TYPE_MONGO_FIELD_NAME;

  @IsValidMongoFilterValue(
    getMatchedTypePathsFromSchema(ProductSchema, 'ObjectID'),
  )
  value;
}
