import { Test, TestingModule } from '@nestjs/testing';
import { DataPaginatorService } from './data-paginator.service';

describe('DataPaginatorService', () => {
  let service: DataPaginatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataPaginatorService],
    }).compile();

    service = module.get<DataPaginatorService>(DataPaginatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
