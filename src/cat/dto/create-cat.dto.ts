import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsString()
  color: string;

  // @IsMongoId()
  // owner_id: string;
}
