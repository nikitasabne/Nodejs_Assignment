import { filterDto, TYPE_MONGO_FIELD_NAME } from 'nestjs-keyset-paginator';
import { ProductSchema } from '../Schema/product.schema';
import { IsValidMongoFilterValue } from 'nestjs-keyset-paginator/dist/decorators/is-valid-mongo-filter-value';
import { getMatchedTypePathsFromSchema } from '../../common/functions/get-matched-type-paths-from-schema';
import { AllowedMongoFields } from '../../common/decorators/allowed-mongo-fields';

export class ProductPaginationFilterDto extends filterDto {
  @AllowedMongoFields(Object.keys(ProductSchema.paths))
  name: TYPE_MONGO_FIELD_NAME;

  @IsValidMongoFilterValue(
    getMatchedTypePathsFromSchema(ProductSchema, 'ObjectID'),
  )
  value;
}
