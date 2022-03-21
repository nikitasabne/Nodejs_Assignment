import { IsMongoId, IsString } from 'class-validator';

export class CatIdDto {
  @IsMongoId()
  id: string;
}
