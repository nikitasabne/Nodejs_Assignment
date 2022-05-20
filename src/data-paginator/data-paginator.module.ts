import { Global, Module } from '@nestjs/common';
import { DataPaginatorService } from './data-paginator.service';

@Global()
@Module({
  providers: [DataPaginatorService],
  exports: [DataPaginatorService],
})
export class DataPaginatorModule {}
