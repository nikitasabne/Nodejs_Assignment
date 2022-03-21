import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { CatModel } from './cat.model';
import { ResourceOwnerVerifier } from 'src/resource-owner-verifier/entities/resource-owner-verifier.entity';

@Module({
  controllers: [CatController],
  providers: [CatService, CatModel],
  exports: [CatService],
})
export class CatModule {}
