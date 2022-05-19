import { IsMongoId } from 'class-validator';

export class ClassroomIdDto {
  @IsMongoId()
  id: string;
}
